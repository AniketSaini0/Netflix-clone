import React, { useState, useEffect } from 'react';
import './PlanScreen.css';
import db from '../firebase';
import { onSnapshot, addDoc, query, where, collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/counter/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlanScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState([null]);

  const fetchProductsAndPrices = async () => {
    try {
      //Query the 'products' collection where active is true
      const productQuery = query(collection(db, "products"), where("active", "==", true));
      const querySnapshot = await getDocs(productQuery);
      const products = {};
      for (const productDoc of querySnapshot.docs) {
        //Add product data
        products[productDoc.id] = productDoc.data();

        //Fetch the 'prices' subcollection for ecah product
        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      }
      setProducts(products);
      console.log(products);
    } catch (error) {
      console.error("Error fetching products and prices: ", error);
    }
  }

  useEffect(() => {
    fetchProductsAndPrices();
  }, []);


  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user?.uid) return; // Ensure user is authenticated
      try {
        // Get the document reference
        const subscriptionsRef = collection(db, "customers", user.uid, 'subscriptions');

        // Fetch the document snapshot
        const querySnapshot = await getDocs(subscriptionsRef);

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          // Process the subscription data
          console.log("step 1");

          if (data.role && data.current_period_end && data.current_period_start) {
            console.log(data.role);
            setSubscription({
              role: data.role,
              current_period_end: data.current_period_end.seconds,
              current_period_start: data.current_period_start.seconds,
            });
          } else {
            console.warn("Some fields are missing in the document:", data);
          }
        });
        // If no documents are found, reset the subscription state
        if (querySnapshot.empty) {
          console.warn("No subscription documents found.");
          setSubscription(null);
        }
      }
      catch (error) {
        console.error("Error fetching subscription:", error);
      }
    };

    fetchSubscription();
  }, [user?.uid]); // Dependency array ensures this runs when the user ID changes


  const loadCheckout = async (priceId) => {
    console.log("Current User UID:", user.uid);
    try {
      // Reference to the "checkout_session" collection for the current user
      const docRef = await addDoc(
        collection(db, "customers", user.uid, "checkout_sessions"),
        {
          price: priceId,
          success_url: window.location.origin,
          cancel_url: window.location.origin,
        },
      );
      console.log("STEP 1,docRef:", docRef);
      // Listen for changes to the newly created document
      onSnapshot(docRef, async (snap) => {
        console.log("STEP 2");
        const { error, sessionId } = snap.data();
        console.log("STEP 3")
        if (error) {
          // Show an error to your custpmer and
          // inspect your Cloud FUnction logs in the Firebase console.
          alert(`An error occured: ${error.message}`);
          return;
        }

        if (sessionId) {
          // We have a session, ;et's redirect to Checkout
          // Init Stripe
          const stripe = await loadStripe(
            'pk_test_51QPMdSCtGgWFh9PKlrtRAXB1Ztcjkws3MbCv1k0axWQRvJbf6gbXEy3TYaEWBN9ytDvB53un2QpJxDFyZd5qjVeW002t6utPNs'
          );
          stripe.redirectToCheckout({ sessionId });
        }
      });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("An error occured. Please try again.");
    }

  };

  return (
    <div className='PlanScreen'>
      <br />
      {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
      {Object.entries(products).map(([productId, productData]) => {
        //TODO: add some logic to check the user suscription is active...
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role.toLowerCase());
        return (
          <div key={productId} className={`${isCurrentPackage && "planScreen__plan--disabled"} || planScreen__plan`}>
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button 
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)}
              >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      }
      )}
    </div>
  );
}

export default PlanScreen

import React, { useState, useEffect } from 'react';
import './PlanScreen.css';
import db from '../firebase';
import { getFirestore,onSnapshot ,addDoc ,query, where, collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/counter/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlanScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  // useEffect(() => {
  //   db.collection("products")
  //     .where("active", "==", true)
  //     .get()
  //     .then((querySnapshot) =>{
  //       const products = {};
  //       querySnapshot.forEach(async (productDoc) => {
  //         products[productDoc.id] = productDoc.data();
  //         const priceSnap = await productDoc.ref.collection
  //         ("prices").get();
  //         priceSnap.docs.forEach(price => {
  //           products[productDoc.id].prices = {
  //             priceId: price.id,
  //             priceData: price.data()
  //           }
  //         })
  //       });
  //       setProducts(products);
  //     });
  // }, []);

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

  const loadCheckout = async (priceId) => {

    try {
      // Reference to the "checkout_session" collection for the current user
      const docRef = await addDoc(
        collection(db, "customers", user.uid, "checkout_session"),
        {
          price: priceId,
          success_url: window.location.origin,
          cancel_url: window.location.origin,
        }
      );

      // Listen for changes tot he newly created document
      onSnapshot(docRef, async (snap) => {
        const { error, sessionId } = snap.data();
  
        if (error) {
          // Show an error to your custpmer and
          // inspect your Cloud FUnction logs in the Firebase console.
          alert(`An error occured: ${error.message}`);
          return ;
        }
  
        if (sessionId) {
          // We have a session, ;et's redirect to Checkout
          // Init Stripe
          const stripe = await loadStripe(
            'pk_test_51QPMdSCtGgWFh9PKlrtRAXB1Ztcjkws3MbCv1k0axWQRvJbf6gbXEy3TYaEWBN9ytDvB53un2QpJxDFyZd5qjVeW002t6utPNs'
          );
          stripe.redirectToCheckout( { sessionId});
        }
      });
    } catch (error) {
      console.error("Error creating checkout sessi0on:", error);
      alert("An error occured. Please try again.");
    }
    
  };

  return (
    <div className='PlanScreen'>
      {Object.entries(products).map(([productId, productData]) => {
        //TODO: add some logic to check the user suscription is active...
        return (
          <div className="planScreen__plan">
            <div className="planScreen__info">
              <h4>{productData.name}</h4>
              <h6>{productData.description}</h6>
            </div> 
            <button onClick={() => loadCheckout(productData.prices.priceId)}>Subscribe</button>
          </div>
        );
        }
      )}
    </div>
  );
}

export default PlanScreen

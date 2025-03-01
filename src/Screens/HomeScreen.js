import React from "react";
import "./HomeScreen.css";
import Navbar from "../Navbar";
import Banner from "../Banner";
import requests, { metaData } from "../Requests";
import Row from "../Row";
import { FixedSizeList as List } from "react-window";

function HomeScreen() {
  const viewWidth = window.innerWidth;
  const viewHeight = window.innerHeight;

  const row = () => (
    <div>
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row
        title={metaData[0].title}
        fetchUrl={metaData[0].url}
      />
      <Row
        title={metaData[1].title}
        fetchUrl={metaData[1].url}
      />
      <Row
        title={metaData[2].title}
        fetchUrl={metaData[2].url}
      />
      <Row
        title={metaData[3].title}
        fetchUrl={metaData[3].url}
      />
      <Row
        title={metaData[4].title}
        fetchUrl={metaData[4].url}
      />
      <Row
        title={metaData[5].title}
        fetchUrl={metaData[5].url}
      />
      <Row
        title={metaData[6].title}
        fetchUrl={metaData[6].url}
      />
    </div>
  );

  return (
    <div className="homeScreen">
      <Navbar />

      <Banner />

      <List
        // className="row__poster"
        height={viewHeight}
        itemCount={1}
        itemSize={viewHeight}
        // layout="horizontal"
        width={viewWidth}
      >
        {row}
      </List>
    </div>
  );
}

export default HomeScreen;

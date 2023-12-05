import React from 'react';
import { useState, useEffect } from "react";
import './App.css';
import {venueConfig} from './seatsConfig.js'
import { Venue } from './model.js'
import { redrawCanvas } from './Boundary.js'
import sold from './sold.png'

function App() {
  //const updatedVenueConfig = window.updatedVenueConfig;

  const updatedVenueConfig = JSON.parse(localStorage.getItem('updatedVenueConfig'));

  console.log(updatedVenueConfig);

  const lambdaARN = "arn:aws:execute-api:us-east-1:347853088179:lus8hhd6fi/*/POST/showAvailableSeats";

  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  function getInputValue() {
    // Get the input element by its id
    const seatsList = document.getElementByID("showNameID").value;
    console.log(seatsList);
    return seatsList;
  }
  let payload = {
    "showName": getInputValue(),
  };
  
  postData(lambdaARN, payload).then((payload) => {
    console.log(payload); // JSON data parsed by `data.json()` call
    updatedVenueConfig = payload;
  });
  // This is a function format from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

  const [venue, setModel] = React.useState(new Venue(updatedVenueConfig));
  const [redraw, forceRedraw] = React.useState(0);       // used to conveniently request redraw after model change
  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);   // need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  useEffect (() => {
    redrawCanvas(venue, canvasRef.current, appRef.current)
    }, [venue, redraw])   // arguments that determine when to refresh

  return ( 
    <div className="App">
      <canvas tabIndex="1"  
        className="App-canvas"
        ref={canvasRef}
        width  = "1200"
        height = "800"/>
      <header className="App-header">
      <input id="showNameID">Enter Show Name Again</input>
      <img id="sold" src={sold} alt="hidden" hidden></img>
      <button onclick="getInputValue()">Get Value</button>
      </header>
    </div>
  );
}
export default App;
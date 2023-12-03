import React from 'react';
import './App.css';
import { venueConfig, venueConfig_big} from './seatsConfig.js'
import { Venue } from './model.js'
import { redrawCanvas } from './Boundary.js'
import sold from './sold.png'

function App() {
  const [venue, setModel] = React.useState(new Venue(venueConfig));
  const [redraw, forceRedraw] = React.useState(0);       // used to conveniently request redraw after model change
  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);   // need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect (() => {
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
      <img id="sold" src={sold} alt="hidden" hidden></img>
      </header>
    </div>
  );
}
export default App;
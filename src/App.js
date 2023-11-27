import './App.css';
import { layout } from './Layout.js'
import { CreateVenue } from './controller/CreateVenue.js'
import { DeleteVenue } from './controller/DeleteVenue.js'
import { ListVenues } from './controller/ListVenues.js'
import { CreateShow } from './controller/CreateShow.js'
import './model.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <label style={layout.seats4u}>Seats4u</label>

        <div style={layout.formContainer}>
          
          <div style={layout.formColumn}>
            <div style={layout.formRow}>
              <label style={layout.label}>Name:</label>
              <input id = "venuecreatename" style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Location:</label>
              <input id = "venuelocation" style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Side Left:</label>
              <input id = "sideleft" style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Center:</label>
              <input id = "center" style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Side Right:</label>
              <input id = "sideright" style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Password:</label>
              <input id = "managerpass" style={layout.input} />
            </div>

            <button style={layout.createVenueButton} onClick={(e) => CreateVenue()}>Create Venue</button>
            <div style={layout.formRow}>
              <label style={layout.label}>Name:</label>
              <input id = "venuedeletename" style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Password:</label>
              <input id = "managerpass" style={layout.input} />
            </div>
            <button style={layout.deleteVenueButton} onClick={(e) => DeleteVenue()}>Delete Venue</button>
          </div>
          <div style={layout.buttonsColumn}>
            <div style={layout.formRow}>
              <label style={layout.label}>Venue Name:</label>
              <input id = "venuenamecreateshow" style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Show Name:</label>
              <input id = "showname" style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Date:</label>
              <input id = "date" style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Time:</label>
              <input id = "time" style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Price:</label>
              <input id = "price" style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Password:</label>
              <input id = "showcreatepass" style={layout.input} />
            </div>
            <button style={layout.createShowButton} onClick={(e) => CreateShow()}>Create Show</button>
          </div>
          <div style={layout.AdminColumn}>
            <div style={layout.formRow}>
              <label style={layout.label}>Password:</label>
              <input id = "adminpass" style={layout.input} />
            </div>
            <button style={layout.listVenuesButton} onClick={(e) => ListVenues()}>List Venues</button>


          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

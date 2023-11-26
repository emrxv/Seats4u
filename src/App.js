import './App.css';
import { layout } from './Layout.js'
import { CreateVenue } from './controller/CreateVenue.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <label style={layout.seats4u}>Seats4u</label>

        <div style={layout.formContainer}>
          
          <div style={layout.formColumn}>
            <div style={layout.formRow}>
              <label style={layout.label}>Name:</label>
              <input style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Location:</label>
              <input style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Side Left:</label>
              <input style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Center:</label>
              <input style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Side Right:</label>
              <input style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Password:</label>
              <input style={layout.input} />
            </div>

            <button style={layout.createVenueButton} onClick={(e) => CreateVenue()}>Create Venue</button>
            <div style={layout.formRow}>
              <label style={layout.label}>Name:</label>
              <input style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Password:</label>
              <input style={layout.input} />
            </div>
            <button style={layout.deleteVenueButton}>Delete Venue</button>
          </div>
          <div style={layout.buttonsColumn}>
            <div style={layout.formRow}>
              <label style={layout.label}>Venue Name:</label>
              <input style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Show Name:</label>
              <input style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Date:</label>
              <input style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Time:</label>
              <input style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Price:</label>
              <input style={layout.input} />
            </div>
            <div style={layout.formRow}>
              <label style={layout.label}>Password:</label>
              <input style={layout.input} />
            </div>
            <button style={layout.createShowButton}>Create Show</button>
          </div>
          <div style={layout.AdminColumn}>
            <div style={layout.formRow}>
              <label style={layout.label}>Password:</label>
              <input style={layout.input} />
            </div>
            <button style={layout.listVenuesButton}>List Venues</button>


          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

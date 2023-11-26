export const layout = {

seats4u : {
        position: "absolute",
        top:30,
        color:"white",
        textShadow: `
        -2px -2px 0 #000,  
         2px -2px 0 #000,
         -2px 2px 0 #000,
          2px 2px 0 #000,
        -3px 0 0 #000,
         3px 0 0 #000,
         0 -3px 0 #000,
         0 3px 0 #000`,
        fontSize: '100px',
},

formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '10px',
    marginBottom: '15px',
    alignItems: 'flex-center',
  },
  
  label: {
    color: 'black',
    fontSize: '15px',
    textAlign: 'right',
    padding: '5px',
  },
  
  input: {
    fontSize: '15px',
    padding: '5px',
  },

  createVenueButton: {
    color: 'black',
    fontSize: '15px',
    marginTop: '15px',
    marginBottom: "30px",
    alignItems: 'flex-center',
  },

  listVenuesButton: {
    color: 'black',
    fontSize: '15px',
    marginTop: '10px',
 },

 deleteVenueButton: {
    color: 'black',
    fontSize: '15px',
    marginTop: '10px',
 },

 createShowButton: {
    color: 'black',
    fontSize: '15px',
    marginTop: '10px',
 },

 formContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '20px',
    alignItems: 'flex-center',
  },
  
 formColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-center',
  },

  buttonsColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-center',
  },

  AdminColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-center',
  },
}

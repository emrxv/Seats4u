function CreateVenue() {
    let venuename = document.getElementById("venuecreatename").value;
    let location = document.getElementById("venuelocation").value;
    let sideleft = document.getElementById("sideleft").value;
    let center = document.getElementById("center").value;
    let sideright = document.getElementById("sideright").value;
    let managerpass = document.getElementById("managerpass").value;

    let payload = {
        "venuecreatename": venuename,
        "venuelocation": location,
        "sideleft": sideleft,
        "center": center,
        "sideright": sideright,
        "managerpass": managerpass
    }
    const response = fetch("https://lus8hhd6fi.execute-api.us-east-1.amazonaws.com/seats4uSTAGE/venue",
        {
            method: "POST",
            body: JSON.stringify(payload)
        }).then((response) => response)

    const fetchResult = async () => {
        let val = await response
        let result = await val.json()
        document.getElementById("result").value = result.body
    }
    

    fetchResult()
}
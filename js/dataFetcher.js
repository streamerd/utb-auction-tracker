var events = [];

function auctionEvents() {
    try {
        const response = fetch('https://api.thegraph.com/subgraphs/name/knownorigin/known-origin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
              {
                  auctionEvents(first:10){
                      id
                      name
                      caller
                      bidder
                    }  
              }
           `

            }),
          }).then((res) => res.json())
            // .then((result) => console.log(result.data['auctionEvents'][0]));
            .then((result) => fixData(result.data));

} catch (error) {
       console.log(error)
}
}


function fixData(fetchedEvent) {
    events = fetchedEvent['auctionEvents']
    console.log("Returning events from fixData")
    // return events[0];
    document.getElementById("results").innerHTML= JSON.stringify(events);
    //console.log(`first auction event => ${JSON.stringify(events[0])}`)
}


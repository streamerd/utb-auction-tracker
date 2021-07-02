var events = [];

function auctionEvents() {
    try {
        fetch('https://api.thegraph.com/subgraphs/name/knownorigin/known-origin', {
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

function getBiddingHistory(editionId) {
   try {
        fetch('https://api.thegraph.com/subgraphs/name/knownorigin/known-origin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
              {
                edition(id: ${editionId}){
                  id
                  metadataName
                  metadataArtist
                  metadataArtistAccount
                  totalAvailable
                  totalSold
                  artist{
                    id
                  }
                  biddingHistory{
                    name
                    timestamp
                    transactionHash
                    caller
                    bidder
                    ethValue
                  }
                  transfers{
                    timestamp
                    transactionHash
                  }
                  activeBid{
                    timestamp
                  }
                }
              }
           `

            }),
          }).then((res) => res.json())
            // .then((result) => console.log(result.data['auctionEvents'][0]));
            .then((result) => {
              writeArtworkDetails(result.data);
              writeBiddindHistory(result.data);
            });

} catch (error) {
       console.log(error)
}
}

function writeArtworkDetails(edition) {
  editionData = edition["edition"];
  editionId = editionData["id"];
  artworkName = editionData["metadataName"];
  artistName = editionData["metadataArtist"];

  console.log(`
  edition id: ${editionId} \n
  artwork name: ${artworkName} \n
  artist name: ${artistName} \n
  `);

  document.getElementById("artwork-name").innerHTML = artworkName

}
function writeBiddindHistory(edition) {
  editionData = edition['edition']
  biddings = editionData["biddingHistory"]

  firstBidding = biddings[0]

  bidName = firstBidding["name"]
  bidder = firstBidding["bidder"];
  timestamp = epochToLocalDatetime(firstBidding["timestamp"]); // convert from epoch
  ethValue = firstBidding["ethValue"]

  // console.log(`first bidding: ${JSON.stringify(firstBidding)}`);

  document.getElementById("bid-name").innerHTML = bidName;
  document.getElementById("bidder-address").innerHTML = bidder;
  document.getElementById("bid-timestamp").innerHTML = timestamp;
  document.getElementById("bid-value-eth").innerHTML = ethValue + " ETH";

}

function epochToLocalDatetime(timestamp) {
  var date = new Date(0);
  date.setUTCSeconds(timestamp);
  return date;
}


function fixData(fetchedEvent) {
    events = fetchedEvent['auctionEvents']
    firstEvent = events[0]
  
    document.getElementById("auction-event-name").innerHTML= "auction event name: <br>" + JSON.stringify(firstEvent["name"]);
    document.getElementById("auction-event-caller").innerHTML= "auction event caller:  <br>" + JSON.stringify(firstEvent["caller"]);
    document.getElementById("auction-event-bidder").innerHTML= "auction event bidder:  <br>" + JSON.stringify(firstEvent["bidder"]);



    //console.log(`first auction event => ${JSON.stringify(events[0])}`)
}


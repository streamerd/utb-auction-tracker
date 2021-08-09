function fetchAndForwardArtworkData(editionId) {
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
  
  
  
    console.log(` writing artwork details for: 
    edition id: ${editionId} \n
    artwork name: ${artworkName} \n
    artist name: ${artistName} \n
    `);
  
  
    console.log(`writing to element: utb-" + ${editionId} + "-results"`);
    //artwork name 
    document.getElementById(editionId + "-results").innerHTML = artworkName;
    
  // just call getBiddingHistory

  getBiddingHistory(editionId);
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
                console.log(
                    `biddingHistory result for ${editionId}.data >> \n 
                    ${JSON.stringify(result.data)}
                    `);

                if(result.data["edition"]["biddingHistory"].length == 0) {
                    console.log("there is no bid yet for " + editionId);
                } else {
                        writeBiddindHistory(result.data);
                    }
                

               
              //writeArtworkDetails(result.data);
            });



} catch (error) {
       console.log(error)
}
}

function epochToLocalDatetime(timestamp) {
    var date = new Date(0);
    date.setUTCSeconds(timestamp);
    return date;
  }

function writeBiddindHistory(edition) {
    editionData = edition['edition']
    biddings = editionData["biddingHistory"]
    var biddingIndex = 0;

    biddings.forEach(bid => {
        bidName = bid["name"]
        bidder = bid["bidder"];
        timestamp = epochToLocalDatetime(bid["timestamp"]); // convert from epoch
        ethValue = bid["ethValue"]
        transactionHash = bid["transactionHash"]

        document.getElementById("592200-last-bid-timestamp").innerHTML =  "@ " + timestamp;
        document.getElementById("592200-last-bid-eth-value").innerHTML = "highest amount:  <br>" + ethValue + " ETH";

        
        document.getElementById("592200-last-bidder-addr").innerHTML =  " <br>last bidder: <br> " +bidder;
        document.getElementById("592200-last-transaction-hash").innerHTML =  " <br>TX:  " + "<a href=\"https://etherscan.io/tx/" + transactionHash + "\" target=\"blank\" style=\"cursor:pointer;\">" + transactionHash+ "</a>";

        console.log(
            `
            bidName = ${bid["name"]} \n
            bidder = ${bid["bidder"]} \n
            timestamp = ${epochToLocalDatetime(bid["timestamp"])};\n // convert from epoch
            ethValue = ${bid["ethValue"]}\n
            transactionHash = ${bid["transactionHash"]}\n
            `
        )
        });

        biddingIndex ++;
 
    //
//   firstBidding = biddings[0];
    // bidName = firstBidding["name"]
    // bidder = firstBidding["bidder"];
    // timestamp = epochToLocalDatetime(firstBidding["timestamp"]); // convert from epoch
    // ethValue = firstBidding["ethValue"]
    
  
    // console.log(`first bidding: ${JSON.stringify(firstBidding)}`);
  

    // document.getElementById("bid-name").innerHTML = bidName;
    // document.getElementById("bidder-address").innerHTML = bidder;
    // document.getElementById("bid-timestamp").innerHTML = timestamp;
    // document.getElementById("bid-value-eth").innerHTML = ethValue + " ETH";
  
  
  }
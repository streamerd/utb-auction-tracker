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
            fetchAndForwardBiddingHistory(editionId);
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
  
  
    //artwork name 
    document.getElementById(editionId + "-results").innerHTML = artworkName;
  
  }

function fetchAndForwardBiddingHistory(editionId) {
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


function maskString(text) {
  return text.substr(0,5) + "..." + text.substr(text.length - 5, text.length - 1)
}

function writeBiddindHistory(edition) {
    editionData = edition['edition']
    biddings = editionData["biddingHistory"]

    biddings.forEach(bid => {
        bidName = bid["name"]
        bidder = bid["bidder"];
        timestamp = epochToLocalDatetime(bid["timestamp"]); // convert from epoch
        ethValue = bid["ethValue"]
        transactionHash = bid["transactionHash"]

        document.getElementById("592200-last-bid-timestamp").innerHTML =  "@ " + String(timestamp).substr(0, 32); // display first half of the date string
        document.getElementById("592200-last-bid-eth-value").innerHTML = ethValue + " ETH";

        bidder = maskString(bidder);

        document.getElementById("592200-last-bidder-addr").innerHTML =  " <br>last bidder: <br> " + bidder;
        document.getElementById("592200-last-transaction-hash").innerHTML =  " <br>transaction hash:  " + "<a href=\"https://etherscan.io/tx/" + transactionHash + "\" target=\"blank\" style=\"cursor:pointer;\">" + maskString(transactionHash) + "</a>";
        });

  
  }

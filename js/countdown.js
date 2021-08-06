function counter() {
    var countDownDate = new Date("August 5, 2021 12:00:00")
    // countDownDate.toLocaleDateString("en-US", {timeZone: "America/Los_Angeles"})
    

    setInterval(function() {
        // var now = new Date()
        var now = new Date();
        console.log(`timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`)
        now.toLocaleString("en-US",Intl.DateTimeFormat().resolvedOptions().timeZone)
        countDownDate.toLocaleString("en-US", Intl.DateTimeFormat().resolvedOptions().timeZone)
        // now.toLocaleDateString("en-US", {timeZone: "America/Los_Angeles"})
        countDownDate = countDownDate.getTime();

        now = now.getTime();
        console.log(`now: ${now}`);

        var timeleft = countDownDate - now;
            
        var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        
        var countdown = document.getElementById("tiles"); // get tag element
        countdown.innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span> <span>" + seconds + "</span>"; 
        }, 1000)
     
}


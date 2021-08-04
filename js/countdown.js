function counter() {
    var countDownDate = new Date("August 5, 2021 21:00:00")
    countDownDate.toLocaleDateString("en-US", {timeZone: "America/Los_Angeles"})
    countDownDate = countDownDate.getTime();
    

    setInterval(function() {
        var now = new Date()
        now.toLocaleDateString("en-US", {timeZone: "America/Los_Angeles"})
        now = now.getTime();

        var timeleft = countDownDate - now;
            
        var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        
        var countdown = document.getElementById("tiles"); // get tag element
        countdown.innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span> <span>" + seconds + "</span>"; 
        }, 1000)
     
}


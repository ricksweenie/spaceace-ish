// Time function - uses clock
var foo = null,
    timerison = 0;
    
var startTime = function(el) {
    var today = new Date(),
            h = today.getHours(),
            m = today.getMinutes(),
            s = today.getSeconds(),
            mm = today.getMilliseconds();

    m = checkTime(m);
    s = checkTime(s);
    mm = checkTime(Number(mm.toString().slice(0, 2)));
    el.innerHTML = s + ":" + mm;
    //el.innerHTML = h + ":" + m + ":" + s + ":" + mm;
    foo = setTimeout(function() { startTime(el); }, 1);
};

// function to pad 0 to single digit time increments
var checkTime = function(i) {
    if (i < 10) { i = "0" + i; };
    return i;
};

var countdownTimer = (function(x) {
    var doCountdown = null,
        temp = x;

    return {
        doTimer: function() {
            $('#time').text(--x);
            if (x !== 0) {
                doCountdown = setTimeout(function() { countdownTimer.doTimer(); }, 100);
            } else {
                x = temp; // or 0;
                this.stopTimer();
            }
        },

        stopTimer: function() {
            clearTimeout(doCountdown);
        }
    };
})(100);


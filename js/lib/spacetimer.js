//SpaceTimer class
var SpaceTimer = function(elId) {
    this.$c = 0;
    this.$t;
    this.$timer_is_on = 0;
    
    if (elId !== null) {
        this.$elId = $(elId);
    }
};

// SpaceTimer prototype section
SpaceTimer.prototype = {

    countup: function() {
        if (this.$elId !== null) {
            this.$elId.text(this.$c);
        }

        this.$c = this.$c + 1;

        var that = this;
        this.$t = setTimeout(function() { that.countup(); }, 1000);
    },

    countdown: function() {

        this.$c = this.$c - 1;

        if (this.$elId !== null) {
            this.$elId.text(this.$c);
        }

        if (this.$c === 0) {
            this.stop();
        } else {
            var that = this;
            this.$t = setTimeout(function() { that.countdown(); }, 1000);
        }

    },

    start: function() {

        if (!this.$timer_is_on) {
            this.$timer_is_on = 1;

            if (this.$c > 0) {
                this.countdown();
            } else {
                this.countup();
            }
        }

    },

    stop: function() {
        clearTimeout(this.$t);
        this.$timer_is_on = 0;
    },

    reset: function() {
        this.$c = 0;
        this.$timer_is_on = 0;
        clearTimeout(this.$t);
    }

};

// draggable thing - leverage this later - perhaps
var initDraggable = function() {
    var $start_counter = $("#event-start"),
        $drag_counter = $("#event-drag"),
        $stop_counter = $("#event-stop"),
        counts = [0, 0, 0];

    $("#cmapping").draggable({
        start: function() {
            counts[0]++;
            updateCounterStatus($start_counter, counts[0]);
        },
        drag: function() {
            counts[1]++;
            updateCounterStatus($drag_counter, counts[1]);
        },
        stop: function() {
            counts[2]++;
            updateCounterStatus($stop_counter, counts[2]);
        }
    });

    function updateCounterStatus($event_counter, new_count) {
        if (!$event_counter.hasClass("ui-state-hover")) {
            $event_counter.addClass("ui-state-hover")
                    .siblings().removeClass("ui-state-hover");
        }

        $("span.count", $event_counter).text(new_count);
    }

    $("#cmapping").fadeIn(1000);
};

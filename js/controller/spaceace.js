var trackActiveSats = {},
    quest = [],			// loaded with questions based on active satellite listing in accordion control
    qTracker = 1,		// tracks the question to show
    matchLevel = 1,		// current match Level - could set this based on a database setting if user returned to activity later
    nMatchLevels = 3,	// configure the total number of Levels - there are three possible badges
    matchNum = 1,		// current match Level
    nMatchNums = 0,		// configured in the model section dependent on how many groups are created
    score = 0,			// dependent on number of alien cadets saved
    wrongSatAns = [],	// not currently used - could be used to create a review mode at end of activity
    alienCadet = 5,		// should be dependent on how many questions in a group
    nSatGroups = 0;		// not currently used - future development if number of satellites are increased
    /*endings = {
        goodEnding: playGoodEding,
        badEding: playBadEnding,
        incomplete: playIncompleteEnding
    };*/

// should only be built when getting the next sattellite group
var loadQuestions = function() {
    var satlist = $('.activeQuiz h3'),
        x = satlist.length;

    RandomizeArray(satlist);

    for (var i = 0; i < x; i++) {
        id = satlist[i].id.split("a-")[1];
        quest.unshift({ q: satellites[id].questions[matchLevel - 1], a: "q-" + id });

        if (quest.length > 5) {
            quest.pop();
        }
    }
};

var showQuestion = function() {
    var question = quest[qTracker - 1];

    if (typeof question == 'undefined') {
        // load the next set of questions and satellites
        matchNum += 1;
        qTracker = 1;
        updateActiveSatellites();
        $('#questionboard').hide();
        $('.activeQuiz').hide('slide', { easing: 'easeOutElastic', direction: 'right' }, 400, function() {
            $(this).removeClass('activeQuiz');
            $($('.satList')[matchNum - 1]).addClass('activeQuiz');
            $('.activeQuiz').show('slide', { easing: 'easeOutElastic', direction: 'left' }, 400, function() {
                var startNextMatch = startMatch;
                startNextMatch();
            });
        });
    } else {
        $('#questionboard p').html(question.q);
        $('#questionboard p')[0].id = question.a;
        $('#questionboard').show();
        //$('#questionboard p').pan({ fps: 12, speed: 20, dir: 'right' });
        qTracker++;
    }
};

var getCurSelectedTopPos = function(id) {

    if (typeof $('div.' + id).css('background-position') === 'undefined') {
        return $('div.' + id).css('background-position-y');
    } else {
        return $('div.' + id).css('background-position').split(' ')[1].split('px')[0];
    }
};

var gameOver = function() {
    $('#game').html("<h1>Game over!<br />Thanks for playing</h1>");
    
};

var restoreCadets = function() {
	var currentCadets = $('.alien_explode');
	
	currentCadets.each(function() {
	    $(this).removeAttr('style');
	    $(this).find('span').hide();
	    $(this).switchClass('alien_explode', this.id, 0);
	    alienCadet++;
	});
};

var explodeCadet = function() {
    var cadet = null; 
    
    if (alienCadet > 0) {
        cadet = $('.cadetalien')[alienCadet-1].id;
   		$('#' + cadet).switchClass(cadet, 'alien_explode', 0, 'auto', function() {
   			var that = $(this);
			setTimeout(function() {
				that
				.css('background-position', '0 0')
				.sprite({
					fps: 12,
					no_of_frames: 3,
					play_frames: 3,
					on_first_frame: function(obj) {
						obj.find('span').delay(500).show('pulsate', {}, 300);
					}
				});
			}, 200);
   		});
        
        alienCadet--;
    }
};

var explodeAllAliens = function() {
	$('.cadetalien').each(function() {
		explodeCadet();
	});
};

var indicateWrongAnswer = function(id) {
    $('#msg p').text("Wrong! (-100 points)").css('color', '#f00');
    $('#msg p').append('<br />Can continue in');
    $('div.' + id).css('background-position', '-666px ' + getCurSelectedTopPos(id) + 'px');
    $('#infograph').css('background-position', '-436px 0');
    wrongSatAns.push(id);
    updateScore(-1);
    explodeCadet();
};

var indicateCorrectAnswer = function(id) {
    $('#msg p').text("Correct!").css('color', '#28b428');
    $('#msg p').append('<br />Can continue in');
    $('div.' + id).css('background-position', '-444px ' + getCurSelectedTopPos(id) + 'px');
    $('#infograph').css('background-position', '-218px 0');
};

var updateScore = function(val) {
    var temp = Number($('#score').text().split('x')[1]),
        adjusted = temp + val;
        
    $('#score').text('x' + adjusted);
};

// return true or false
var checkAnswer = function(e) {
    var isAnswerCorrect = false,
        selAnswerId = this.id.split('a-')[1],                       // get the selected answer id minus 'a-'
        questionId = $('#questionboard p')[0].id.split('q-')[1];    // look up id of the question minus 'q-'

    e.stopImmediatePropagation();
    
    SpaceAce.TimerBar.stopTimer();

    $('.activeQuiz h3').off(answerHoverFx);
    $('.activeQuiz h3').off('click', checkAnswer);

    $('.activeQuiz').accordion("option", "disabled", true);

    // compare the scrubbed id and return true or false
    if (selAnswerId === questionId) {
        indicateCorrectAnswer(selAnswerId);
        isAnswerCorrect = true;
        //return true;
    } else {
        indicateWrongAnswer(selAnswerId);
        isAnswerCorrect = false;
        //return false;
    }

    $('#scoreboard table').hide();
    $('#msg h3').hide();
    $('#msg').show();

    var showNextQuestion = showQuestion;

    $('#msg h1').hide();
    $('#msg p').text("Continue?").css('color', '#ead900');

    score = Math.round((alienCadet / getSats().getSatArray().length) * 100);
    $('#msg h3').button().one('click', { isAnswerCorrect: isAnswerCorrect }, function(e) {
        // enable the accordion
        $('.activeQuiz').accordion("option", "disabled", false);
        // close the according
        $('.activeQuiz').accordion("option", "active", false);
        // remove the halo around the chosen satellite
        $('div.' + selAnswerId).css('background-position', '0 ' + getCurSelectedTopPos(selAnswerId) + 'px');
        
        // restore initial background color to infograph
        $('#infograph').css('background-position', '0 0');

        if (e.data.isAnswerCorrect) {
            $('#questionboard p').destroy(); // destroy
            //showNextQuestion();	// use if your forcing them to get it correct before they move on
        }
        
        $('#msg').hide();
        $('#msg h1').show();
        $('#scoreboard table').show();

        SpaceAce.TimerBar.startTimer();
        
        if (score === 0) {
            setReviewMode();
            doReview();
        } else {
            // return extra event behavior to accordion headers
            $('.activeQuiz h3').on(answerHoverFx);
            $('.activeQuiz h3').on('click', checkAnswer);
	        showNextQuestion();  // show the next question even if they get it wrong
        }
    }).show();

};

var setGameMode = function() {
    
};

var answerHoverFx = {
    mouseenter: function(e) {
        e.stopImmediatePropagation();

        var sId = this.id.split("a-")[1];
        $('div.' + sId).css('background-position', '-222px ' + getCurSelectedTopPos(sId) + 'px');
    },

    mouseleave: function(e) {
        e.stopImmediatePropagation();

        var sId = this.id.split("a-")[1];
        $('div.' + sId).css('background-position', '0 ' + getCurSelectedTopPos(sId) + 'px');
    }
};

var startMatch = function() {
	SpaceAce.TimerBar.initTimer();
    SpaceAce.TimerBar.startTimer();
    updateScore(5);
    restoreCadets();

    countdownTimer.doTimer();
    $(".activeQuiz").accordion('enable');
    $(".activeQuiz h3").on(answerHoverFx);

    // look up a question in the current group
    $(".activeQuiz h3").on('click', checkAnswer);

    loadQuestions();
    showQuestion(); // show first question to get things started.

};

var setReviewMode = function() {
    qTracker = 1;
    SpaceAce.TimerBar.stopTimer();
    // enable the accordion
    $('.activeQuiz').accordion("option", "disabled", false);
    // close the according
    $('.activeQuiz').accordion("option", "active", false);
    // return extra event behavior to accordion headers
    $('.activeQuiz h3').on(answerHoverFx);
    $('.activeQuiz h3').off('click', checkAnswer);
};

var doReview = function(msg) {
    msg = msg || "Your killing off space cadets left and right! You need help! Review each satellite answer on the right and try the mission again";
    $('#questionboard').html("<p>"+msg+"<br /><br /><span id='buttonDone' style='color: yellow'>Done</span></p>");
    $('#scoreboard table').hide();
    $('#reviewMsg').show();
	SpaceAce.TimerBar.stopTimer();
    
    $('#buttonDone').button().click(function() {
        // close any open accordions
        $('.activeQuiz').accordion("option", "active", false);
//        alienCadet = alienCadet - $('.alien_explode').length;
		$('#scoreboard table').show();
		$('#reviewMsg').hide();
        startMatch();
        restoreCadets();
        handleTimer();
    });
};

var handleTimer = function() {
    var curBarVal = Math.floor(document.getElementById('timer-container').style.width.split('%')[0]);
    
    if (curBarVal > 0) {
        resumeTimer();
    } else {
        refreshTimer();
    }
};

var refreshTimer = function() {
    SpaceAce.TimerBar.initTimer();
    SpaceAce.TimerBar.startTimer();
};

var resumeTimer = function() {
    SpaceAce.TimerBar.startTimer();
};

var updateActiveSatellites = function() {
    var newActiveSat = $('.satImages')[matchNum - 1],
        as = $('.activeSats div'),
        nSats = as.length,
        nCount = 0;

    for (var x in trackActiveSats) {
        trackActiveSats[x].stopMoving();
    }

    //$('.activeSats div').clearQueue().stop().hide('explode', function() {
    $('.activeSats div').hide('explode', function() {
        var n = $(this).queue("fx"),
            theSats = n.length;

        if (n.length === 1) {
            nCount += 1;
        }

        //$('.activeSats').children().removeAttr('style');
        $(this).prev().removeAttr('style');
        $(this).removeAttr('style');
        
        if (nSats === nCount) {
            $('#satImages').find('.activeSats').toggleClass('activeSats');
            $(newActiveSat).toggleClass('activeSats');
            moveActiveSatellites();
        }
    });
};

var moveActiveSatellites = function() {
    // make active satellites go
    var activeSats = $('.activeSats div'),
        as_len = activeSats.length,
        eachSat = {};

    for (var i = 0; i < as_len; i++) {
        eachSat["go_" + i] = moveSat(activeSats[i].className.split(" ")[0]);
    }

    trackActiveSats = eachSat;
    $(".activeSats img").delay(800).show('scale', { easing: 'easeOutBack' }, 1000, function() {

        $(".activeSats img").hide();
        $(".activeSats div").show();
        //$(".activeQuiz").show('slide', { easing: 'easeOutElastic', direction: 'left' }, 400);

        for (var x in eachSat) {
            eachSat[x].startMoving();
        }
    });
};

var showInfoPanels = function() {

    $("#infograph").delay(100).show('pulsate', {}, 200, function() {
        $(".activeQuiz").show('slide', { easing: 'easeOutElastic', direction: 'left' }, 400);
        moveActiveSatellites();
    });

    $("#scoreboard").show('pulsate', {}, 200);
    $('.aliens').delay(1000).show();
    $("#pov").show('pulsate', {}, 600, function() {

        $("#begin-message").show('slide', { direction: 'down' }, 1000, function() {
            var sptr = new SpaceTimer('#countdownBegin');
            sptr.$c = 5;
            sptr.start();

            var checkTimer = (function() {
                var t = null;

                return {
                    doCountdown: function() {
                        if (sptr.$c === 0) {

                            $("#begin-message").hide('slide', { direction: 'up' }, 600, function() {
                                startMatch();
                            });

                            clearTimeout(t);
                            sptr = null;
                        } else {
                            t = setTimeout(function() { checkTimer.doCountdown(); }, 500);
                        }
                    }
                };
            })();

            checkTimer.doCountdown();
        });
    });
};

var doIntroAnims = function() {

    $("#game-arena").fadeIn("slow", function() {
        $("#title-splash").fadeIn(1000, function() {
            $("#title-logo img").show("slide", { direction: "up" }, 100).effect("bounce", { times: 3 }, 200);
            $("#title-text img").show("slide", { direction: "up" }, 100).effect("bounce", { times: 3 }, 200);
            $("#title").animate({ left: 200 }, { duration: 'slow', easing: 'easeOutBack' }).animate({ left: 184 }, { duration: 'slow', easing: 'easeOutBack' });
            $("#introalien img").show("scale", {}, 900); //master alien comes in stage right
            $("#introalien").animate({ left: 640 }, 700)//starting position is left 850 px
            .animate({ left: 700 }, 200, '', function() {
                $('#introalien img').hide();
                $('#introalien_flyin')
                .show()
                .sprite({
                    fps: 12,
                    no_of_frames: 6,
                    on_last_frame: function(obj) {
                        obj.spStop();
                        obj.hide();
                        $('#introalien_blink')
                        .show()
                        .sprite({
                            fps: 12,
                            no_of_frames: 21,
                            /*play_frames: 48,*/
                            on_first_frame: function() {
                                $('#introalien_flyin').destroy(); // has to be destroyed because of too many recursive calls by previous animation
                            }
                        });
                    }
                });

            })//.delay(500)
            .animate({ top: 180 }, 2000)//hover blink
            .animate({ top: 200 }, 2000, '', function() {
				$('#introalien_blink').spStop().hide();
                $('#introalien_settle')
                .show()
                .animate({ top: 32 }, 200)
                .sprite({
                    fps: 12,
                    no_of_frames: 6,
                    //play_frames: 8,
                    on_first_frame: function() {
                        $('#introalien img').hide();
                        $('#introalien_blink').destroy();
                    },
                    on_last_frame: function(obj) {
                        obj.spStop();
                        obj.hide();
                        $('#introalien_solute')
                        .css('top', '32px')
                        .show()
                        .sprite({
                            fps: 12,
                            no_of_frames: 8,
                            play_frames: 8,
                        });
                    }
                });
            }).delay(2000)//solutes
            .animate({ left: 700 }, 0, '', function() {// anticipation action before flying away
                $('#introalien_solute').hide();
                $('#introalien_takeoff')
                .css('top', '32px')
                .show()
                .sprite({
                    fps: 12,
                    no_of_frames: 12,
                    on_frame: {
                        7: function(obj) {
                            obj.animate({ top: 0 }, 200);
                        }
                    },
                    on_last_frame: function(obj) {
                        obj.spStop().hide();
                        $('#introalien_blink')
                        .show()
                        .sprite({
                            fps: 12,
                            no_of_frames: 21,
                            on_frame: {
                                8: function(obj) {
                                    $("#introalien").animate({ left: -255 }, 1000);
                                }
                            },
                            on_last_frame: function(obj) {
                                // make sure all animations are destroyed
                                obj.hide();
                                $('#introalien_solute').destroy();
                                $('#introalien_flyin').destroy();
                                $('#introalien_settle').destroy();
                                $('#introalien_takeoff').destroy();
                            }
                        });
                    }
                });
                
                $("#title-splash").fadeOut(1000, function() {
                	$('#intro').toggle();
                	$('#game').toggle().pan({fps: 24, speed: 24, direction: 'left'});
                    /*$('#game-arena').switchClass('splash-screen', 'in_game', 100, '', function() {
                        $(this).pan({ fps: 24, speed: 24, direction: 'left' });
                    });*/
                });
                $('#title').animate({
                    left: 25,
                    top: 8
                });
                $('#title #title-text').animate({
                    left: 81,
                    margin: 0,
                    padding: 0,
                    top: 33
                });
                $('#title-logo img').animate({
                    width: 91,
                    height: 90
                }, {
                    easing: 'easeOutBack'
                });
                $('#title-text img').animate({
                    position: 'relative',
                    width: 208,
                    height: 38
                }, {
                    easing: 'easeOutBack'
                });
                $("#title-logo").appendTo("#small-title").show();
                $("#title-text").appendTo("#small-title").show();
                $("#small-title").show();
                $("#title").hide();
                $("#titlebgglass").show('slide', { direction: "left" }, 1000);
                $("#dashboardpart-ul").show("fold", {}, 2000);
                $("#earth").animate({
                    left: 312,
                    top: 308
                }, 4000, function() {$('#game').fps(12).spSpeed(1);});
                $("#earth img").animate({
                    height: 116,
                    width: 116
                }, 4000, showInfoPanels);

                initQuiz();
            });
        });
    });
};

// closure for each satellite to move to a sequence of targets specified by a css classes
// each satellite has its own starting position.
var moveSat = function(satelliteName) {
    var duration = 10000,
        classNames = $('.activeSats').find('.' + satelliteName).attr('class').split(" "),
        startingPos = Number(classNames[2].split("coord")[1]),
        savePos = 'coord' + startingPos,
        nextPos = startingPos + 1,
        o = $(".activeSats ." + satelliteName),
        that = null;

    if (startingPos === 9) {
        nextPos = 0;
    }

    return {
        startMoving: function() {
            that = this;
            o.switchClass("coord" + startingPos, "coord" + nextPos, duration, "linear", function() {

                startingPos = nextPos;
                nextPos = nextPos + 1;

                if (nextPos === 10) { nextPos = 0; }

                that.startMoving();
            });
        },

        stopMoving: function() {
            o.clearQueue().stop();
            o.removeClass(o.attr('class').split(" ")[2]);
            // o.addClass(o.prev()attr('class').split(" ")[1]);
            o.addClass(savePos);
        }
    };
};

var RandomizeArray = function(arrRand) {
    var intRand, temp,
        intElement = arrRand.length - 1;

    for (intElement; intElement > 0; intElement--) {
        intRand = Math.floor(Math.random() * (intElement + 1));
        temp = arrRand[intElement];
        arrRand[intElement] = arrRand[intRand];
        arrRand[intRand] = temp;
    }
};

var isCurMatch = function(x) {
    if (x === (matchNum - 1)) {
        return true;
    } else {
        return false;
    }
};

var initQuiz = function() {

    var $info = $("#satList"),
        $satImages = $("#satImages"),
        accordionOptions = {
            heightStyle: "content",
            active: false,
            collapsible: true,
            disabled: true
        };

    var sats = getSats(),
        satGroups = sats.getGrouped();
        
    nSatGroups = satGroups.length; // store global setting for incrementing matchLevel
    for (var x = 0; x < nSatGroups; x++) {
        var sg = satGroups[x],
            accdiv = document.createElement('div'),     // new accordion div
            imgWraps = document.createElement('div');

        accdiv.setAttribute('class', 'satList');
        imgWraps.setAttribute('class', 'satImages');

        if (isCurMatch(x)) {
            $(accdiv).addClass('activeQuiz');
            $(imgWraps).addClass('activeSats');
        }

        $info.append(accdiv);
        $satImages.append(imgWraps);

        var sgLen = sg.item.length;
        for (var i = 0; i < sgLen; i++) {
            //console.log(sats[i].acronym + " ");
            $(accdiv).append("<h3 id='a-" + sg.item[i].id + "'>" + sg.item[i].acronym + "</h3>");
            $(accdiv).append("<div><p>" + sg.item[i].description + "</p></div>");

            var imgClone = $('img[alt="' + sg.item[i].id + '"]').first().clone();
            imgClone.addClass('sats').attr('class', ('sats ' + sg.coord[i]));

            $(imgWraps).append(imgClone);

            var imgDiv = document.createElement('div');
            imgDiv.className += sg.item[i].id;
            imgDiv.className += " sats ";
            imgDiv.className += sg.coord[i];

            $(imgWraps).append(imgDiv);
        }

        $(accdiv).accordion(accordionOptions);
        /*$(accdiv).accordion({
            activate: function(e, ui) {
                var activeContent = $('.activeQuiz .ui-accordion-content-active p').text();
                
                $('#largerText').html('<p>' + activeContent + '</p>');
                $('.activeQuiz').toggle();
            }
        });*/
    }
};

var doEndGame = function() {
    $('#questionboard').hide();
    $('#dashboardpart-ul').hide();
};

var init = function() {
    doIntroAnims();
};

// timer bar section
var SpaceAce = SpaceAce || {};
	
SpaceAce.TimerBar = (function() {
	var roundTime, gameTimeOut,	timerOn, 
		timeLeft, barWidth, savedBarWidth, endTime, startTime, 
		countDownElem, timer, _that = this;
		
		
	return {
		initTimer: function() {
			roundTime = 60000;
			gameTimeOut = null;
			barWidth = 100;
			savedBarWidth = 0;
			timerOn = 0;
			countDownElem = document.getElementById('countdownBegin');
			timer = document.getElementById('timer-container');
		},
		
		update: function() {
			timeLeft = endTime - new Date().getTime();

		    if (timeLeft > 0) {
		        savedBarWidth = (timeLeft / roundTime) * barWidth;
		        timer.style.width = savedBarWidth + "%";
		    }
		
		    if (timeLeft / roundTime > 0) {
		    	var foo = this;
		        gameTimeOut = setTimeout(function() { 
		        	if (timerOn) { 
		        		foo.update(); 
					}
				}, 20);
		    } else {
		        //document.body.innerHTML = "<h1>Game Over!<h1>";
		        var message = "Your time ran out. Take time to review the satellite answers on the right.";
		        updateScore(-alienCadet);
		        setReviewMode();
		        doReview(message);
		    }
		},
		
		startTimer: function() {
		    if(!timerOn) {
		        timerOn = 1;
		        
                startTime = new Date().getTime();
                endTime = startTime + roundTime;
                //timeLeft = new Date().getTime() - startTime;

		        this.update();
		    }   
		},
		
		stopTimer: function() {
		    clearTimeout(gameTimeOut);
		    barWidth = savedBarWidth;
		    roundTime = timeLeft;
		    timerOn = 0;
		}
	};
})(); 

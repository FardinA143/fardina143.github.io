var audioPlayer = {
    idPlayer: 'music-player',
    urlBase: 'https://www.ecasals.net',
    state: 'stop', // stop, playing, paused
    audio: null,
    duration: null,
    durationControl: null,
    secondsElapsed: 0,
    currentSliderPosition: 1,
    blockAudioPosition: false,
    offline: false,

    setUpAudio: function(data, callback) {
        var fileNameArray = data.url.split('/');
        var fileName = fileNameArray[fileNameArray.length - 1];

        var audioInfo = "";
        if (data.copyright && data.copyright.length > 0 && data.copyright != "") {
            audioInfo = data.copyright;
        } else if (data.credits && data.credits.length > 0 && data.credits != "") {
            audioInfo = data.credits;
        } else if (data.autor && data.autor.length > 0 && data.autor != "") {
            audioInfo = data.autor;
        }

        // $('#' + audioPlayer.idPlayer + ' .file-name').text(data.descripcio);
        // $('#' + audioPlayer.idPlayer + ' .copyright').text(audioInfo);

        audioPlayer.audio = new Audio();
        audioPlayer.loop = false;
        if (audioPlayer.offline) {
            audioPlayer.audio.src = data.url;
        } else {
            audioPlayer.audio.src = audioPlayer.urlBase + '/' + data.url;
        }
        
        audioPlayer.audio.onloadedmetadata = function() {
            audioPlayer.duration = audioPlayer.audio.duration;
            var durationHTML = '';
            if (audioPlayer.duration < 60) {
                if (audioPlayer.duration < 10) {
                    durationHTML = '0:0' + parseInt(audioPlayer.duration);
                } else {
                    durationHTML = '0:' + parseInt(audioPlayer.duration);
                }
            } else {
                var minutes = parseInt(audioPlayer.duration / 60);
                var seconds = parseInt(audioPlayer.duration % 60);
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }

                durationHTML = minutes + ':' + seconds;
            }
            $('#' + audioPlayer.idPlayer + ' .time').text(durationHTML);            
            audioPlayer.state = 'stop';

        };

        audioPlayer.audio.onended = function() {
            audioPlayer.cancelAudio();
        };


        if (typeof callback !== "undefined") {
            callback(callbackData);
        }
    },
    cancelAudio: function() {
        if (audioPlayer.state != 'stop') {
        	console.log('Audio cancel');
            audioPlayer.audio.pause();
            audioPlayer.audio.currentTime = 0.0;
            audioPlayer.state = 'stop';

            clearInterval(audioPlayer.durationControl);
            audioPlayer.secondsElapsed = 0;

            var durationHTML = '';
            if (audioPlayer.duration < 60) {
                if (audioPlayer.duration < 10) {
                    durationHTML = '0:0' + parseInt(audioPlayer.duration);
                } else {
                    durationHTML = '0:' + parseInt(audioPlayer.duration);
                }
            } else {
                var minutes = parseInt(audioPlayer.duration / 60);
                var seconds = parseInt(audioPlayer.duration % 60);
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                durationHTML = minutes + ':' + seconds;
            }
            $('#' + audioPlayer.idPlayer + ' .time').text(durationHTML);

            $('#music-player-slider').slider('value', 1);
            audioPlayer.currentSliderPosition = 1;

            $('#music-player-play').show();
            $('#music-player-stop').hide();
        }
    },
    playAudio: function() {
    	if( audioPlayer.state != 'playing' || audioPlayer.audio.paused) {
    		console.log('audio start playing');
    		audioPlayer.state = 'playing';
    		audioPlayer.audio.play();    		

    		audioPlayer.durationControl = setInterval(function() { audioPlayer.moveAudioPosition(); }, 1000); //
    	}
    },
    pauseAudio: function() {
    	if( audioPlayer.state != 'paused' || !audioPlayer.audio.paused) {
    		console.log('audio pause');
    		audioPlayer.state = 'paused';
    		audioPlayer.audio.pause();    		

    		clearInterval(audioPlayer.durationControl);
    	}
    },
    moveAudioPosition: function() {
        // NewValue = (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin
        audioPlayer.secondsElapsed += 1;

        if (!audioPlayer.blockAudioPosition) {
            var newValue = (((audioPlayer.secondsElapsed - 1) * (100 - 1)) / (audioPlayer.duration - 1)) + 1;
            //console.log(newValue);

            audioPlayer.drawAudioTime();
            $('#music-player-slider').slider('value', newValue);
            audioPlayer.currentSliderPosition = newValue;
        }
    },
    onMoveAudioPosition: function() {
        audioPlayer.blockAudioPosition = false;
        var newSliderPosition = $('#music-player-slider').slider('value');
        //console.log(newSliderPosition);
        // audioPlayer.currentSliderPosition -> audioPlayer.audio.currentTime
        // newSliderPosition -> ?
        var audioNewTime = (audioPlayer.audio.currentTime * newSliderPosition) / audioPlayer.currentSliderPosition;
        //console.log("audioNewTime: " + audioNewTime)
        audioPlayer.audio.currentTime = audioNewTime;
        audioPlayer.secondsElapsed = audioNewTime;
        audioPlayer.currentSliderPosition = newSliderPosition;
    },
    drawAudioTime: function() {
        var minutes = 0;
        var seconds = 0;
        var durationHTML = '';

        if (this.audio.duration != 0) {
            currentTime = this.audio.currentTime;
            var durationHTML = '';
            if (currentTime < 60) {
                if (currentTime < 10) {
                    durationHTML = '0:0' + parseInt(currentTime);
                } else {
                    durationHTML = '0:' + parseInt(currentTime);
                }
            } else {
                var minutes = parseInt(currentTime/ 60);
                var seconds = parseInt(currentTime % 60);
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }

                durationHTML = minutes + ':' + seconds;
            }
            $('#' + audioPlayer.idPlayer + ' .time').text(durationHTML);
        }
    },
    onSlide: function() {
        var sliderPosition = $('#music-player-slider').slider('value');
        audioPlayer.drawAudioTimeOnSliderPosition(sliderPosition);
    },
    drawAudioTimeOnSliderPosition: function(sliderPosition) {
        //console.log('sliderPosition: ' + sliderPosition);
        // 100 -> audioPlayer.duration
        // sliderPosition -> ?
        var newDuration = (audioPlayer.duration * sliderPosition) / 100;
        //console.log(newDuration);

        if (newDuration < 60) {
            if (newDuration < 10) {
                durationHTML = '0:0' + parseInt(newDuration);
            } else {
                durationHTML = '0:' + parseInt(newDuration);
            }
        } else {
            var minutes = parseInt(newDuration / 60);
            var seconds = parseInt(newDuration % 60);
            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            durationHTML = minutes + ':' + seconds;
        }

        $('#' + audioPlayer.idPlayer + ' .time').text(durationHTML);
    },
    onBlockAudioPosition: function() {
        audioPlayer.blockAudioPosition = true;
    }
};
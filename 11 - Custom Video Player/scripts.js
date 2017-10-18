const APP = {
    video: null,
    controls: null,
    progressBar: null,
    playBtn: null,
    sliders: null,
    skipBtns: null,

    initialize: function() {
        this.video = document.querySelector('video');
        this.controls = document.querySelector('.player__controls');
        this.progressBar = this.controls.querySelector('.progress__filled');
        this.playBtn = this.controls.querySelector('.player__button');
        this.sliders = this.controls.querySelectorAll('.player__slider');
        this.skipBtns = this.controls.querySelectorAll('.player__button[data-skip]');

        this.setEventListeners();
    },

    setEventListeners: function() {
        this.playBtn.addEventListener('click', APP.togglePlay);

        this.video.addEventListener('timeupdate', APP.updateProgress);

        this.sliders.forEach( function(slider) {
            slider.addEventListener('change', APP.sliderHandler);
        });

        this.skipBtns.forEach( function(button) {
            button.addEventListener('click', APP.skipHandler);
        });

    },

    togglePlay: function() {

        if(APP.video.paused) {
            APP.video.play();
            this.innerHTML = "►";
        } else {
            APP.video.pause();
            this.innerHTML = "❚ ❚";
        }
    },

    updateProgress: function() {
        const progress = (APP.video.currentTime / APP.video.duration) * 100 ;
        APP.progressBar.style.flexBasis = `${progress}%`;
    },

    sliderHandler: function(e) {
        console.log("triggered");
        switch(e.target.name) {
            case "volume":
                APP.video.volume = e.target.value;
            break;

            case "playbackRate":
                APP.video.playbackRate = e.target.value;
            break;
        }

    },

    skipHandler: function(e) {
        APP.video.currentTime += parseFloat(e.target.dataset.skip);
    },



};

(function(){

    APP.initialize();

})();
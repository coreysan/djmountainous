
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video

$(function(){

  const progressMilestones = [1, 2, 4, 8, 10, 25, 50, 75, 95];

  var audioPlayer = function($audioPlayer){

    this.$audioPlayer = $audioPlayer;
    this.stub = this.$audioPlayer.attr('id');
    this.rating = this.$audioPlayer.data('rating');

    this.$playPauseBtn = this.$audioPlayer.find('.play-pause').eq(0);
    this.$track = this.$audioPlayer.find('audio').eq(0);
    this.track = this.$track.get(0);

    this.isPastMilestone = {}; //eventually populated with progress Milestones as listed in progressMilestones array
    this.constructMilestones();

    this.$progressBar = this.$audioPlayer.find('.progress-bar').eq(0);
    this.$buffer      = this.$progressBar.find('.buffer').eq(0);
    this.$played      = this.$progressBar.find('.played').eq(0);

    this.$currentTime = this.$audioPlayer.find('.current-time').eq(0);
    this.$mixLength   = this.$audioPlayer.find('.mix-length').eq(0);
    this.$divider     = this.$audioPlayer.find('.divider').eq(0);

    this.trackRefreshTimer = null;
  }

  audioPlayer.prototype.constructMilestones = function(){
    progressMilestones.forEach((milestone) => {
      this.isPastMilestone[milestone] = false;
    });
  }

  /*

    Keep checking if progress is past the next milestone

    If it is, log a progress event and ensure 
    no more progress events are sent for this mix

  */
  audioPlayer.prototype.sendProgressEvents = function(){

    let progress = (this.track.currentTime / this.track.duration) * 100;

    progressMilestones.forEach((milestone) => {
      if(progress > milestone){
        if(!this.isPastMilestone[milestone]){  //past it for the first time
          this.isPastMilestone[milestone] = true;
          ga('send', 'event', 'Mix', 'progress', this.stub, milestone);
        }
      }
    }); 
  }

  //Pause all tracks on the page other than 'this' one
  audioPlayer.prototype.pauseAllOthers = function(){

    $('.audio-player').not(this.$audioPlayer).each(function(){
      var playr = new audioPlayer($(this));
      playr.pauseTrack();
    });
  }

  //check if this player is paused
  audioPlayer.prototype.isPaused = function(){
    return this.track.paused;
  }

  audioPlayer.prototype.pauseTrack = function($audioPlayer){
    this.track.pause();
    this.$audioPlayer.removeClass('playing');
    this.$progressBar.removeClass('expanded');
  }
  audioPlayer.prototype.playTrack = function($audioPlayer){

    ga('send', 'event', 'Mix', 'play', 
      this.stub, this.rating);

    this.pauseAllOthers();
    this.track.play();
    this.$audioPlayer.addClass('playing');
    this.$progressBar.addClass('expanded');

    this.startInterval();

    this.$currentTime.text(this.currentTimeString());
    this.$divider.show();
    this.$mixLength.text(this.durationString());
  }

  audioPlayer.prototype.startInterval = function(){
    this.trackRefreshTimer = setInterval(this.tick.bind(this), 100);
  }
  audioPlayer.prototype.clearInterval = function(){
    clearInterval(this.trackRefreshTimer);
  }

  // One tick of the song rolls by and the time is update
  audioPlayer.prototype.tick = function(){
    this.$currentTime.text(this.currentTimeString());
    this.updateProgressBar();
    this.sendProgressEvents();
  }

  audioPlayer.prototype.updateProgressBar = function(){
    var playPercentage = (this.track.currentTime / this.track.duration) * 100;
    this.$played.css('width', playPercentage+'%');
  }

  audioPlayer.prototype.currentTimeString = function(){
    return this.timeString(this.track.currentTime);
  }

  audioPlayer.prototype.durationString = function(){
    return this.timeString(this.track.duration);
  }

  // Returns a time like MM:SS
  audioPlayer.prototype.timeString = function(time){

    if(isNaN(time))
    { //eek, try again. Hard to reproduce
      if(isNaN(this.track.duration)){
        return '';
      }else {
        this.track.duration;
      }
    }

    var seconds = "0" + Math.round(time%60);
    seconds = seconds.substr(seconds.length-2);

    return  Math.round(time/60)+':'+seconds;
  }

  // Play if paused, pause if playing
  audioPlayer.prototype.togglePlayPause = function(){
    this.isPaused() ? this.playTrack() : this.pauseTrack();
  }

  audioPlayer.prototype.seek = function(event){

    var playPercentage = event.offsetX / $(event.target).width();
    this.track.currentTime = playPercentage * this.track.duration;
    this.updateProgressBar();
  }  

  $('body').on('click', '.play-pause', function(){
    var player = new audioPlayer($(this).closest('.audio-player').eq(0));
    player.togglePlayPause();
  });

  $('body').on('click', '.progress-bar', function(event){
    var player = new audioPlayer($(this).closest('.audio-player').eq(0));
    player.seek(event);
  });

  //send google-analytics stats for a mix download
  $('body').on('click', '.download', function(event){
    ga('send', 'event', 'Mix', 'download', 
      $(this).closest('.audio-player').attr('id'), 
      $(this).closest('.audio-player').data('rating'));
  });

}); 
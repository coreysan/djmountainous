/*!
 * DJ Mountainous - Dj Mountainous v1.1.1 (djmountainous.com)
 * Copyright 2016-2016 Corey Sanford
 */

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video

$(function(){

  var audioPlayer = function($audioPlayer){

    this.$audioPlayer = $audioPlayer;

    this.$playPauseBtn = this.$audioPlayer.find('.play-pause').eq(0);
    this.$track = this.$audioPlayer.find('audio').eq(0);
    this.track = this.$track.get(0);

    this.$progressBar = this.$audioPlayer.find('.progress-bar').eq(0);
    this.$buffer      = this.$progressBar.find('.buffer').eq(0);
    this.$played      = this.$progressBar.find('.played').eq(0);

    this.$currentTime = this.$audioPlayer.find('.current-time').eq(0);
    this.$mixLength   = this.$audioPlayer.find('.mix-length').eq(0);
    this.$divider     = this.$audioPlayer.find('.divider').eq(0);

    this.trackRefreshTimer = null;
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
      this.$audioPlayer.attr('id'), this.$audioPlayer.data('rating'));

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
  audioPlayer.prototype.tick = function(){
    this.$currentTime.text(this.currentTimeString());
    this.updateProgressBar();
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
/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
function collapseNavbar() {
    if ($(".navbar").offset().top > $("#waves").offset().top - 150) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}
 
$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        // $('html, body').stop().animate({
        //     scrollTop: $($anchor.attr('href')).offset().top
        // }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
    $('.navbar-toggle:visible').click();
  }
});

  
/* 
  Animate ratings bar by changing opacity of several blocks
  */
$(function(){
  
  //  60s/125bpm = 480ms
  var ANIMATION_PERIOD = (60.0/125)*1000;
  var DEFAULT_OPACITY = '0.4';
  var INCREASED_OPACITY = '0.5';
  var $rating_blocks = $('.bottom-bar .rating-block');
  var num_ratings = $rating_blocks.length;
  var original_block_height = $rating_blocks.eq(0).height();

  if(num_ratings === 0){
    return;
  }

  // Every x ms, do...
  //  reset all opacities
  //  choose x random rating blocks to darken
  //  choose a random block from that group to darken, overlap ok
  // setInterval(function() {
  setInterval(() => {

    //each time, a different number of blocks are chosen
    var blocks_to_blank = Math.floor(Math.random()*num_ratings)+1;
    
    $rating_blocks.not('.active').css('opacity', DEFAULT_OPACITY);
                  // .css('height', original_block_height+'px');

    for (var i = 0; i < blocks_to_blank; i++) {
      var rand_block_index = Math.floor(Math.random()*num_ratings)+1;

      if(!$rating_blocks.eq(rand_block_index).hasClass('active')){
        $rating_blocks.eq(rand_block_index)
                      .css('opacity', INCREASED_OPACITY);
      }
    }
  }, ANIMATION_PERIOD);


  // control showing V-rating descriptions on hover of V-color button
  $('.bottom-bar > div').on('click', function(){
    var rating = $(this).find('.rating-block').data('rating');
    showAndHighlightRating(rating);
  });


  function showAndHighlightRating(rating){
    
    //hide all other descriptions
    $('.v-descriptions > p')
      .not('.v-descriptions > p[data-rating="'+rating+'"]')
      .hide();

    //remove other active opacities
    $('.bottom-bar > div .rating-block')
      .not('.bottom-bar > div .rating-block[data-rating="'+rating+'"]')
      .css('opacity', DEFAULT_OPACITY)
      .removeClass('active');

    $('.bottom-bar > div .rating-block[data-rating="'+rating+'"]')
      .css('opacity', 1)
      .addClass('active');

    $('.v-descriptions > p[data-rating="'+rating+'"]').show();
  }
});


$(function(){

  //get the stub from the url, like djmountainous.com?blueprint-19-warmup
  var search = window.location.search.replace("?", "");
 
  //scroll that element's top  
  // setTimeout(function(){ 

  //   // $('html, body').scrollTop($('.'+search).offset().top-300);
  //   // $('.mix').not('.'+search).css('opacity', 0.6);
  //   // $('.mix-group__title, .group-description').css('opacity', 0.6);
  // }, 1800); 

  //when anything is clicked, set the opacity of the mixes back to 1
  $('*').on('click', () => {
    $('.mix').css('opacity', 1);
  }); 
    
  $('#mixes').on('click', '.mix__details .rating', function(){
    $('.rating-block[data-rating="'+$(this).data('rating')+'"]').closest('div').trigger('hover');
    $('.rating-block[data-rating="'+$(this).data('rating')+'"]').closest('div').trigger('click');
    $('html, body').scrollTop($('.bottom-bar').offset().top-130);
  });
  
});  
$(function  () {

  var MIX_PATH = "http://djmountainous.com/mixes/dj-mountainous-";
  // mixes MUST be named dj-moutainous-{slug}.(mp3/m4a)
  // i.e. dj-mountainous-va-tech-house

  var calm_mixes = {
    mixes: [
      //new mix goes here
      {
        title: "The Eiger",
        genres: "Tech House",
        date: "Sept 2016",
        slug: "va-tech-house",
        rating: 3
      },
      {
        title: "Garibaldi",
        genres: "Deep House",
        date: "June 2016",
        slug: "va-deep-house-v2",
        rating: 2
      },
    ]
  };

  var intense_mixes = {
    mixes: [
      //new mix goes here
      {
        title: "Blueprint 19th Warmup",
        genres: "Rezz Griz Grime W.S.N DFrancis",
        date: "October 2016",
        slug: "blueprint-19-warmup",
        rating: 9
      },{
        title: "Live @ BirthRave 2016",
        genres: "Bass Funk, Trap, Dub",
        date: "Sept 24, 2016",
        slug: "live-birthrave-2016-bass-funk-dub",
        rating: 8
      },{ 
        title: "Black Tusk",
        genres: "Trap & Dubstep",
        date: "August 2016",
        slug: "va-dubtrap",
        rating: 9
      },{
        title: "Seven Lions warmup",
        genres: "Dreamstep",
        date: "October 2016",
        slug: "seven-lions-warm-up-mix",
        rating: 7
      }
    ]
  };// intense mixes

  // //inject handlebars templates with mix data
  injectTemplates(intense_mixes,  'intense'); 
  injectTemplates(calm_mixes,     'calm');
  
  function injectTemplates(data, type){

    var html = MyApp.templates.mixes(data);
    $('#mixes-tmpl-'+type).html(html);
  }  


});
  

 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1ZGlvLXBsYXllci5qcyIsImdyYXlzY2FsZS5qcyIsImhvbWVwYWdlLWFuaW1hdGlvbnMuanMiLCJzaXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLW1pbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hUTUxNZWRpYUVsZW1lbnRcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0d1aWRlL0hUTUwvVXNpbmdfSFRNTDVfYXVkaW9fYW5kX3ZpZGVvXG5cbiQoZnVuY3Rpb24oKXtcblxuICB2YXIgYXVkaW9QbGF5ZXIgPSBmdW5jdGlvbigkYXVkaW9QbGF5ZXIpe1xuXG4gICAgdGhpcy4kYXVkaW9QbGF5ZXIgPSAkYXVkaW9QbGF5ZXI7XG5cbiAgICB0aGlzLiRwbGF5UGF1c2VCdG4gPSB0aGlzLiRhdWRpb1BsYXllci5maW5kKCcucGxheS1wYXVzZScpLmVxKDApO1xuICAgIHRoaXMuJHRyYWNrID0gdGhpcy4kYXVkaW9QbGF5ZXIuZmluZCgnYXVkaW8nKS5lcSgwKTtcbiAgICB0aGlzLnRyYWNrID0gdGhpcy4kdHJhY2suZ2V0KDApO1xuXG4gICAgdGhpcy4kcHJvZ3Jlc3NCYXIgPSB0aGlzLiRhdWRpb1BsYXllci5maW5kKCcucHJvZ3Jlc3MtYmFyJykuZXEoMCk7XG4gICAgdGhpcy4kYnVmZmVyICAgICAgPSB0aGlzLiRwcm9ncmVzc0Jhci5maW5kKCcuYnVmZmVyJykuZXEoMCk7XG4gICAgdGhpcy4kcGxheWVkICAgICAgPSB0aGlzLiRwcm9ncmVzc0Jhci5maW5kKCcucGxheWVkJykuZXEoMCk7XG5cbiAgICB0aGlzLiRjdXJyZW50VGltZSA9IHRoaXMuJGF1ZGlvUGxheWVyLmZpbmQoJy5jdXJyZW50LXRpbWUnKS5lcSgwKTtcbiAgICB0aGlzLiRtaXhMZW5ndGggICA9IHRoaXMuJGF1ZGlvUGxheWVyLmZpbmQoJy5taXgtbGVuZ3RoJykuZXEoMCk7XG4gICAgdGhpcy4kZGl2aWRlciAgICAgPSB0aGlzLiRhdWRpb1BsYXllci5maW5kKCcuZGl2aWRlcicpLmVxKDApO1xuXG4gICAgdGhpcy50cmFja1JlZnJlc2hUaW1lciA9IG51bGw7XG4gIH1cblxuICAvL1BhdXNlIGFsbCB0cmFja3Mgb24gdGhlIHBhZ2Ugb3RoZXIgdGhhbiAndGhpcycgb25lXG4gIGF1ZGlvUGxheWVyLnByb3RvdHlwZS5wYXVzZUFsbE90aGVycyA9IGZ1bmN0aW9uKCl7XG5cbiAgICAkKCcuYXVkaW8tcGxheWVyJykubm90KHRoaXMuJGF1ZGlvUGxheWVyKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICBcbiAgICAgIHZhciBwbGF5ciA9IG5ldyBhdWRpb1BsYXllcigkKHRoaXMpKTtcbiAgICAgIHBsYXlyLnBhdXNlVHJhY2soKTtcblxuICAgIH0pO1xuICB9XG5cbiAgLy9jaGVjayBpZiB0aGlzIHBsYXllciBpcyBwYXVzZWRcbiAgYXVkaW9QbGF5ZXIucHJvdG90eXBlLmlzUGF1c2VkID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gdGhpcy50cmFjay5wYXVzZWQ7XG4gIH1cblxuICBhdWRpb1BsYXllci5wcm90b3R5cGUucGF1c2VUcmFjayA9IGZ1bmN0aW9uKCRhdWRpb1BsYXllcil7XG4gICAgdGhpcy50cmFjay5wYXVzZSgpO1xuICAgIHRoaXMuJGF1ZGlvUGxheWVyLnJlbW92ZUNsYXNzKCdwbGF5aW5nJyk7XG4gICAgdGhpcy4kcHJvZ3Jlc3NCYXIucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gIH1cbiAgYXVkaW9QbGF5ZXIucHJvdG90eXBlLnBsYXlUcmFjayA9IGZ1bmN0aW9uKCRhdWRpb1BsYXllcil7XG5cbiAgICBnYSgnc2VuZCcsICdldmVudCcsICdNaXgnLCAncGxheScsIFxuICAgICAgdGhpcy4kYXVkaW9QbGF5ZXIuYXR0cignaWQnKSwgdGhpcy4kYXVkaW9QbGF5ZXIuZGF0YSgncmF0aW5nJykpO1xuXG4gICAgdGhpcy5wYXVzZUFsbE90aGVycygpO1xuICAgIHRoaXMudHJhY2sucGxheSgpO1xuICAgIHRoaXMuJGF1ZGlvUGxheWVyLmFkZENsYXNzKCdwbGF5aW5nJyk7XG4gICAgdGhpcy4kcHJvZ3Jlc3NCYXIuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG5cbiAgICB0aGlzLnN0YXJ0SW50ZXJ2YWwoKTtcblxuICAgIHRoaXMuJGN1cnJlbnRUaW1lLnRleHQodGhpcy5jdXJyZW50VGltZVN0cmluZygpKTtcbiAgICB0aGlzLiRkaXZpZGVyLnNob3coKTtcbiAgICB0aGlzLiRtaXhMZW5ndGgudGV4dCh0aGlzLmR1cmF0aW9uU3RyaW5nKCkpO1xuICB9XG5cbiAgYXVkaW9QbGF5ZXIucHJvdG90eXBlLnN0YXJ0SW50ZXJ2YWwgPSBmdW5jdGlvbigpe1xuICAgIHRoaXMudHJhY2tSZWZyZXNoVGltZXIgPSBzZXRJbnRlcnZhbCh0aGlzLnRpY2suYmluZCh0aGlzKSwgMTAwKTtcbiAgfVxuICBhdWRpb1BsYXllci5wcm90b3R5cGUuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKCl7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRyYWNrUmVmcmVzaFRpbWVyKTtcbiAgfVxuICBhdWRpb1BsYXllci5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy4kY3VycmVudFRpbWUudGV4dCh0aGlzLmN1cnJlbnRUaW1lU3RyaW5nKCkpO1xuICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIoKTtcbiAgfVxuXG4gIGF1ZGlvUGxheWVyLnByb3RvdHlwZS51cGRhdGVQcm9ncmVzc0JhciA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHBsYXlQZXJjZW50YWdlID0gKHRoaXMudHJhY2suY3VycmVudFRpbWUgLyB0aGlzLnRyYWNrLmR1cmF0aW9uKSAqIDEwMDtcbiAgICB0aGlzLiRwbGF5ZWQuY3NzKCd3aWR0aCcsIHBsYXlQZXJjZW50YWdlKyclJyk7XG4gIH1cblxuICBhdWRpb1BsYXllci5wcm90b3R5cGUuY3VycmVudFRpbWVTdHJpbmcgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiB0aGlzLnRpbWVTdHJpbmcodGhpcy50cmFjay5jdXJyZW50VGltZSk7XG4gIH1cblxuICBhdWRpb1BsYXllci5wcm90b3R5cGUuZHVyYXRpb25TdHJpbmcgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiB0aGlzLnRpbWVTdHJpbmcodGhpcy50cmFjay5kdXJhdGlvbik7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgdGltZSBsaWtlIE1NOlNTXG4gIGF1ZGlvUGxheWVyLnByb3RvdHlwZS50aW1lU3RyaW5nID0gZnVuY3Rpb24odGltZSl7XG5cbiAgICBpZihpc05hTih0aW1lKSlcbiAgICB7IC8vZWVrLCB0cnkgYWdhaW4uIEhhcmQgdG8gcmVwcm9kdWNlXG4gICAgICBpZihpc05hTih0aGlzLnRyYWNrLmR1cmF0aW9uKSl7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1lbHNlIHtcbiAgICAgICAgdGhpcy50cmFjay5kdXJhdGlvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2Vjb25kcyA9IFwiMFwiICsgTWF0aC5yb3VuZCh0aW1lJTYwKTtcbiAgICBzZWNvbmRzID0gc2Vjb25kcy5zdWJzdHIoc2Vjb25kcy5sZW5ndGgtMik7XG5cbiAgICByZXR1cm4gIE1hdGgucm91bmQodGltZS82MCkrJzonK3NlY29uZHM7XG4gIH1cblxuICAvLyBQbGF5IGlmIHBhdXNlZCwgcGF1c2UgaWYgcGxheWluZ1xuICBhdWRpb1BsYXllci5wcm90b3R5cGUudG9nZ2xlUGxheVBhdXNlID0gZnVuY3Rpb24oKXtcbiAgICB0aGlzLmlzUGF1c2VkKCkgPyB0aGlzLnBsYXlUcmFjaygpIDogdGhpcy5wYXVzZVRyYWNrKCk7XG4gIH1cblxuICBhdWRpb1BsYXllci5wcm90b3R5cGUuc2VlayA9IGZ1bmN0aW9uKGV2ZW50KXtcblxuICAgIHZhciBwbGF5UGVyY2VudGFnZSA9IGV2ZW50Lm9mZnNldFggLyAkKGV2ZW50LnRhcmdldCkud2lkdGgoKTtcbiAgICB0aGlzLnRyYWNrLmN1cnJlbnRUaW1lID0gcGxheVBlcmNlbnRhZ2UgKiB0aGlzLnRyYWNrLmR1cmF0aW9uO1xuICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIoKTtcbiAgfSAgXG5cbiAgJCgnYm9keScpLm9uKCdjbGljaycsICcucGxheS1wYXVzZScsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIHBsYXllciA9IG5ldyBhdWRpb1BsYXllcigkKHRoaXMpLmNsb3Nlc3QoJy5hdWRpby1wbGF5ZXInKS5lcSgwKSk7XG4gICAgcGxheWVyLnRvZ2dsZVBsYXlQYXVzZSgpO1xuICB9KTtcblxuICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5wcm9ncmVzcy1iYXInLCBmdW5jdGlvbihldmVudCl7XG4gICAgdmFyIHBsYXllciA9IG5ldyBhdWRpb1BsYXllcigkKHRoaXMpLmNsb3Nlc3QoJy5hdWRpby1wbGF5ZXInKS5lcSgwKSk7XG4gICAgcGxheWVyLnNlZWsoZXZlbnQpO1xuICB9KTtcblxuICAvL3NlbmQgZ29vZ2xlLWFuYWx5dGljcyBzdGF0cyBmb3IgYSBtaXggZG93bmxvYWRcbiAgJCgnYm9keScpLm9uKCdjbGljaycsICcuZG93bmxvYWQnLCBmdW5jdGlvbihldmVudCl7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAnTWl4JywgJ2Rvd25sb2FkJywgXG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5hdWRpby1wbGF5ZXInKS5hdHRyKCdpZCcpLCBcbiAgICAgICQodGhpcykuY2xvc2VzdCgnLmF1ZGlvLXBsYXllcicpLmRhdGEoJ3JhdGluZycpKTtcbiAgfSk7XG5cbn0pOyAiLCIvKiFcbiAqIFN0YXJ0IEJvb3RzdHJhcCAtIEdyYXlzY2FsZSBCb290c3RyYXAgVGhlbWUgKGh0dHA6Ly9zdGFydGJvb3RzdHJhcC5jb20pXG4gKiBDb2RlIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSB2Mi4wLlxuICogRm9yIGRldGFpbHMsIHNlZSBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjAuXG4gKi9cblxuLy8galF1ZXJ5IHRvIGNvbGxhcHNlIHRoZSBuYXZiYXIgb24gc2Nyb2xsXG5mdW5jdGlvbiBjb2xsYXBzZU5hdmJhcigpIHtcbiAgICBpZiAoJChcIi5uYXZiYXJcIikub2Zmc2V0KCkudG9wID4gJChcIiN3YXZlc1wiKS5vZmZzZXQoKS50b3AgLSAxNTApIHtcbiAgICAgICAgJChcIi5uYXZiYXItZml4ZWQtdG9wXCIpLmFkZENsYXNzKFwidG9wLW5hdi1jb2xsYXBzZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKFwiLm5hdmJhci1maXhlZC10b3BcIikucmVtb3ZlQ2xhc3MoXCJ0b3AtbmF2LWNvbGxhcHNlXCIpO1xuICAgIH1cbn1cbiBcbiQod2luZG93KS5zY3JvbGwoY29sbGFwc2VOYXZiYXIpO1xuJChkb2N1bWVudCkucmVhZHkoY29sbGFwc2VOYXZiYXIpO1xuXG4vLyBqUXVlcnkgZm9yIHBhZ2Ugc2Nyb2xsaW5nIGZlYXR1cmUgLSByZXF1aXJlcyBqUXVlcnkgRWFzaW5nIHBsdWdpblxuJChmdW5jdGlvbigpIHtcbiAgICAkKCdhLnBhZ2Utc2Nyb2xsJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgJGFuY2hvciA9ICQodGhpcyk7XG4gICAgICAgIC8vICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7XG4gICAgICAgIC8vICAgICBzY3JvbGxUb3A6ICQoJGFuY2hvci5hdHRyKCdocmVmJykpLm9mZnNldCgpLnRvcFxuICAgICAgICAvLyB9LCAxNTAwLCAnZWFzZUluT3V0RXhwbycpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xufSk7XG5cbi8vIENsb3NlcyB0aGUgUmVzcG9uc2l2ZSBNZW51IG9uIE1lbnUgSXRlbSBDbGlja1xuJCgnLm5hdmJhci1jb2xsYXBzZSB1bCBsaSBhJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gIGlmICgkKHRoaXMpLmF0dHIoJ2NsYXNzJykgIT0gJ2Ryb3Bkb3duLXRvZ2dsZSBhY3RpdmUnICYmICQodGhpcykuYXR0cignY2xhc3MnKSAhPSAnZHJvcGRvd24tdG9nZ2xlJykge1xuICAgICQoJy5uYXZiYXItdG9nZ2xlOnZpc2libGUnKS5jbGljaygpO1xuICB9XG59KTtcbiIsIiAgXG4vKiBcbiAgQW5pbWF0ZSByYXRpbmdzIGJhciBieSBjaGFuZ2luZyBvcGFjaXR5IG9mIHNldmVyYWwgYmxvY2tzXG4gICovXG4kKGZ1bmN0aW9uKCl7XG4gIFxuICAvLyAgNjBzLzEyNWJwbSA9IDQ4MG1zXG4gIHZhciBBTklNQVRJT05fUEVSSU9EID0gKDYwLjAvMTI1KSoxMDAwO1xuICB2YXIgREVGQVVMVF9PUEFDSVRZID0gJzAuNCc7XG4gIHZhciBJTkNSRUFTRURfT1BBQ0lUWSA9ICcwLjUnO1xuICB2YXIgJHJhdGluZ19ibG9ja3MgPSAkKCcuYm90dG9tLWJhciAucmF0aW5nLWJsb2NrJyk7XG4gIHZhciBudW1fcmF0aW5ncyA9ICRyYXRpbmdfYmxvY2tzLmxlbmd0aDtcbiAgdmFyIG9yaWdpbmFsX2Jsb2NrX2hlaWdodCA9ICRyYXRpbmdfYmxvY2tzLmVxKDApLmhlaWdodCgpO1xuXG4gIGlmKG51bV9yYXRpbmdzID09PSAwKXtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBFdmVyeSB4IG1zLCBkby4uLlxuICAvLyAgcmVzZXQgYWxsIG9wYWNpdGllc1xuICAvLyAgY2hvb3NlIHggcmFuZG9tIHJhdGluZyBibG9ja3MgdG8gZGFya2VuXG4gIC8vICBjaG9vc2UgYSByYW5kb20gYmxvY2sgZnJvbSB0aGF0IGdyb3VwIHRvIGRhcmtlbiwgb3ZlcmxhcCBva1xuICAvLyBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG4gICAgLy9lYWNoIHRpbWUsIGEgZGlmZmVyZW50IG51bWJlciBvZiBibG9ja3MgYXJlIGNob3NlblxuICAgIHZhciBibG9ja3NfdG9fYmxhbmsgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqbnVtX3JhdGluZ3MpKzE7XG4gICAgXG4gICAgJHJhdGluZ19ibG9ja3Mubm90KCcuYWN0aXZlJykuY3NzKCdvcGFjaXR5JywgREVGQVVMVF9PUEFDSVRZKTtcbiAgICAgICAgICAgICAgICAgIC8vIC5jc3MoJ2hlaWdodCcsIG9yaWdpbmFsX2Jsb2NrX2hlaWdodCsncHgnKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmxvY2tzX3RvX2JsYW5rOyBpKyspIHtcbiAgICAgIHZhciByYW5kX2Jsb2NrX2luZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm51bV9yYXRpbmdzKSsxO1xuXG4gICAgICBpZighJHJhdGluZ19ibG9ja3MuZXEocmFuZF9ibG9ja19pbmRleCkuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcbiAgICAgICAgJHJhdGluZ19ibG9ja3MuZXEocmFuZF9ibG9ja19pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAuY3NzKCdvcGFjaXR5JywgSU5DUkVBU0VEX09QQUNJVFkpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgQU5JTUFUSU9OX1BFUklPRCk7XG5cblxuICAvLyBjb250cm9sIHNob3dpbmcgVi1yYXRpbmcgZGVzY3JpcHRpb25zIG9uIGhvdmVyIG9mIFYtY29sb3IgYnV0dG9uXG4gICQoJy5ib3R0b20tYmFyID4gZGl2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICB2YXIgcmF0aW5nID0gJCh0aGlzKS5maW5kKCcucmF0aW5nLWJsb2NrJykuZGF0YSgncmF0aW5nJyk7XG4gICAgc2hvd0FuZEhpZ2hsaWdodFJhdGluZyhyYXRpbmcpO1xuICB9KTtcblxuXG4gIGZ1bmN0aW9uIHNob3dBbmRIaWdobGlnaHRSYXRpbmcocmF0aW5nKXtcbiAgICBcbiAgICAvL2hpZGUgYWxsIG90aGVyIGRlc2NyaXB0aW9uc1xuICAgICQoJy52LWRlc2NyaXB0aW9ucyA+IHAnKVxuICAgICAgLm5vdCgnLnYtZGVzY3JpcHRpb25zID4gcFtkYXRhLXJhdGluZz1cIicrcmF0aW5nKydcIl0nKVxuICAgICAgLmhpZGUoKTtcblxuICAgIC8vcmVtb3ZlIG90aGVyIGFjdGl2ZSBvcGFjaXRpZXNcbiAgICAkKCcuYm90dG9tLWJhciA+IGRpdiAucmF0aW5nLWJsb2NrJylcbiAgICAgIC5ub3QoJy5ib3R0b20tYmFyID4gZGl2IC5yYXRpbmctYmxvY2tbZGF0YS1yYXRpbmc9XCInK3JhdGluZysnXCJdJylcbiAgICAgIC5jc3MoJ29wYWNpdHknLCBERUZBVUxUX09QQUNJVFkpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgJCgnLmJvdHRvbS1iYXIgPiBkaXYgLnJhdGluZy1ibG9ja1tkYXRhLXJhdGluZz1cIicrcmF0aW5nKydcIl0nKVxuICAgICAgLmNzcygnb3BhY2l0eScsIDEpXG4gICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgJCgnLnYtZGVzY3JpcHRpb25zID4gcFtkYXRhLXJhdGluZz1cIicrcmF0aW5nKydcIl0nKS5zaG93KCk7XG4gIH1cbn0pO1xuXG5cbiQoZnVuY3Rpb24oKXtcblxuICAvL2dldCB0aGUgc3R1YiBmcm9tIHRoZSB1cmwsIGxpa2UgZGptb3VudGFpbm91cy5jb20/Ymx1ZXByaW50LTE5LXdhcm11cFxuICB2YXIgc2VhcmNoID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5yZXBsYWNlKFwiP1wiLCBcIlwiKTtcbiBcbiAgLy9zY3JvbGwgdGhhdCBlbGVtZW50J3MgdG9wICBcbiAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpeyBcblxuICAvLyAgIC8vICQoJ2h0bWwsIGJvZHknKS5zY3JvbGxUb3AoJCgnLicrc2VhcmNoKS5vZmZzZXQoKS50b3AtMzAwKTtcbiAgLy8gICAvLyAkKCcubWl4Jykubm90KCcuJytzZWFyY2gpLmNzcygnb3BhY2l0eScsIDAuNik7XG4gIC8vICAgLy8gJCgnLm1peC1ncm91cF9fdGl0bGUsIC5ncm91cC1kZXNjcmlwdGlvbicpLmNzcygnb3BhY2l0eScsIDAuNik7XG4gIC8vIH0sIDE4MDApOyBcblxuICAvL3doZW4gYW55dGhpbmcgaXMgY2xpY2tlZCwgc2V0IHRoZSBvcGFjaXR5IG9mIHRoZSBtaXhlcyBiYWNrIHRvIDFcbiAgJCgnKicpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAkKCcubWl4JykuY3NzKCdvcGFjaXR5JywgMSk7XG4gIH0pOyBcbiAgICBcbiAgJCgnI21peGVzJykub24oJ2NsaWNrJywgJy5taXhfX2RldGFpbHMgLnJhdGluZycsIGZ1bmN0aW9uKCl7XG4gICAgJCgnLnJhdGluZy1ibG9ja1tkYXRhLXJhdGluZz1cIicrJCh0aGlzKS5kYXRhKCdyYXRpbmcnKSsnXCJdJykuY2xvc2VzdCgnZGl2JykudHJpZ2dlcignaG92ZXInKTtcbiAgICAkKCcucmF0aW5nLWJsb2NrW2RhdGEtcmF0aW5nPVwiJyskKHRoaXMpLmRhdGEoJ3JhdGluZycpKydcIl0nKS5jbG9zZXN0KCdkaXYnKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICQoJ2h0bWwsIGJvZHknKS5zY3JvbGxUb3AoJCgnLmJvdHRvbS1iYXInKS5vZmZzZXQoKS50b3AtMTMwKTtcbiAgfSk7XG4gIFxufSk7ICAiLCIkKGZ1bmN0aW9uICAoKSB7XG5cbiAgdmFyIE1JWF9QQVRIID0gXCJodHRwOi8vZGptb3VudGFpbm91cy5jb20vbWl4ZXMvZGotbW91bnRhaW5vdXMtXCI7XG4gIC8vIG1peGVzIE1VU1QgYmUgbmFtZWQgZGotbW91dGFpbm91cy17c2x1Z30uKG1wMy9tNGEpXG4gIC8vIGkuZS4gZGotbW91bnRhaW5vdXMtdmEtdGVjaC1ob3VzZVxuXG4gIHZhciBjYWxtX21peGVzID0ge1xuICAgIG1peGVzOiBbXG4gICAgICAvL25ldyBtaXggZ29lcyBoZXJlXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiBcIlRoZSBFaWdlclwiLFxuICAgICAgICBnZW5yZXM6IFwiVGVjaCBIb3VzZVwiLFxuICAgICAgICBkYXRlOiBcIlNlcHQgMjAxNlwiLFxuICAgICAgICBzbHVnOiBcInZhLXRlY2gtaG91c2VcIixcbiAgICAgICAgcmF0aW5nOiAzXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogXCJHYXJpYmFsZGlcIixcbiAgICAgICAgZ2VucmVzOiBcIkRlZXAgSG91c2VcIixcbiAgICAgICAgZGF0ZTogXCJKdW5lIDIwMTZcIixcbiAgICAgICAgc2x1ZzogXCJ2YS1kZWVwLWhvdXNlLXYyXCIsXG4gICAgICAgIHJhdGluZzogMlxuICAgICAgfSxcbiAgICBdXG4gIH07XG5cbiAgdmFyIGludGVuc2VfbWl4ZXMgPSB7XG4gICAgbWl4ZXM6IFtcbiAgICAgIC8vbmV3IG1peCBnb2VzIGhlcmVcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6IFwiQmx1ZXByaW50IDE5dGggV2FybXVwXCIsXG4gICAgICAgIGdlbnJlczogXCJSZXp6IEdyaXogR3JpbWUgVy5TLk4gREZyYW5jaXNcIixcbiAgICAgICAgZGF0ZTogXCJPY3RvYmVyIDIwMTZcIixcbiAgICAgICAgc2x1ZzogXCJibHVlcHJpbnQtMTktd2FybXVwXCIsXG4gICAgICAgIHJhdGluZzogOVxuICAgICAgfSx7XG4gICAgICAgIHRpdGxlOiBcIkxpdmUgQCBCaXJ0aFJhdmUgMjAxNlwiLFxuICAgICAgICBnZW5yZXM6IFwiQmFzcyBGdW5rLCBUcmFwLCBEdWJcIixcbiAgICAgICAgZGF0ZTogXCJTZXB0IDI0LCAyMDE2XCIsXG4gICAgICAgIHNsdWc6IFwibGl2ZS1iaXJ0aHJhdmUtMjAxNi1iYXNzLWZ1bmstZHViXCIsXG4gICAgICAgIHJhdGluZzogOFxuICAgICAgfSx7IFxuICAgICAgICB0aXRsZTogXCJCbGFjayBUdXNrXCIsXG4gICAgICAgIGdlbnJlczogXCJUcmFwICYgRHVic3RlcFwiLFxuICAgICAgICBkYXRlOiBcIkF1Z3VzdCAyMDE2XCIsXG4gICAgICAgIHNsdWc6IFwidmEtZHVidHJhcFwiLFxuICAgICAgICByYXRpbmc6IDlcbiAgICAgIH0se1xuICAgICAgICB0aXRsZTogXCJTZXZlbiBMaW9ucyB3YXJtdXBcIixcbiAgICAgICAgZ2VucmVzOiBcIkRyZWFtc3RlcFwiLFxuICAgICAgICBkYXRlOiBcIk9jdG9iZXIgMjAxNlwiLFxuICAgICAgICBzbHVnOiBcInNldmVuLWxpb25zLXdhcm0tdXAtbWl4XCIsXG4gICAgICAgIHJhdGluZzogN1xuICAgICAgfVxuICAgIF1cbiAgfTsvLyBpbnRlbnNlIG1peGVzXG5cbiAgLy8gLy9pbmplY3QgaGFuZGxlYmFycyB0ZW1wbGF0ZXMgd2l0aCBtaXggZGF0YVxuICBpbmplY3RUZW1wbGF0ZXMoaW50ZW5zZV9taXhlcywgICdpbnRlbnNlJyk7IFxuICBpbmplY3RUZW1wbGF0ZXMoY2FsbV9taXhlcywgICAgICdjYWxtJyk7XG4gIFxuICBmdW5jdGlvbiBpbmplY3RUZW1wbGF0ZXMoZGF0YSwgdHlwZSl7XG5cbiAgICB2YXIgaHRtbCA9IE15QXBwLnRlbXBsYXRlcy5taXhlcyhkYXRhKTtcbiAgICAkKCcjbWl4ZXMtdG1wbC0nK3R5cGUpLmh0bWwoaHRtbCk7XG4gIH0gIFxuXG5cbn0pO1xuICBcblxuICJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

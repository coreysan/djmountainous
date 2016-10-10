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

  // Every x ms, do:
  //  reset all opacities
  //  choose x random rating blocks to darken
  //  choose a random block from that group to darken, overlap ok
  setInterval(function() {

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

    //
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
  setTimeout(function(){ 

    // $('html, body').scrollTop($('.'+search).offset().top-300);
    // $('.mix').not('.'+search).css('opacity', 0.6);
    // $('.mix-group__title, .group-description').css('opacity', 0.6);
  }, 1800); 

  //when anything is clicked, set the opacity of the mixes back to 1
  $('*').on('click', function(){
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
  

 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1ZGlvLXBsYXllci5qcyIsImdyYXlzY2FsZS5qcyIsImhvbWVwYWdlLWFuaW1hdGlvbnMuanMiLCJzaXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFsbC1taW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IVE1MTWVkaWFFbGVtZW50XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9HdWlkZS9IVE1ML1VzaW5nX0hUTUw1X2F1ZGlvX2FuZF92aWRlb1xuXG4kKGZ1bmN0aW9uKCl7XG5cbiAgdmFyIGF1ZGlvUGxheWVyID0gZnVuY3Rpb24oJGF1ZGlvUGxheWVyKXtcblxuICAgIHRoaXMuJGF1ZGlvUGxheWVyID0gJGF1ZGlvUGxheWVyO1xuXG4gICAgdGhpcy4kcGxheVBhdXNlQnRuID0gdGhpcy4kYXVkaW9QbGF5ZXIuZmluZCgnLnBsYXktcGF1c2UnKS5lcSgwKTtcbiAgICB0aGlzLiR0cmFjayA9IHRoaXMuJGF1ZGlvUGxheWVyLmZpbmQoJ2F1ZGlvJykuZXEoMCk7XG4gICAgdGhpcy50cmFjayA9IHRoaXMuJHRyYWNrLmdldCgwKTtcblxuICAgIHRoaXMuJHByb2dyZXNzQmFyID0gdGhpcy4kYXVkaW9QbGF5ZXIuZmluZCgnLnByb2dyZXNzLWJhcicpLmVxKDApO1xuICAgIHRoaXMuJGJ1ZmZlciAgICAgID0gdGhpcy4kcHJvZ3Jlc3NCYXIuZmluZCgnLmJ1ZmZlcicpLmVxKDApO1xuICAgIHRoaXMuJHBsYXllZCAgICAgID0gdGhpcy4kcHJvZ3Jlc3NCYXIuZmluZCgnLnBsYXllZCcpLmVxKDApO1xuXG4gICAgdGhpcy4kY3VycmVudFRpbWUgPSB0aGlzLiRhdWRpb1BsYXllci5maW5kKCcuY3VycmVudC10aW1lJykuZXEoMCk7XG4gICAgdGhpcy4kbWl4TGVuZ3RoICAgPSB0aGlzLiRhdWRpb1BsYXllci5maW5kKCcubWl4LWxlbmd0aCcpLmVxKDApO1xuICAgIHRoaXMuJGRpdmlkZXIgICAgID0gdGhpcy4kYXVkaW9QbGF5ZXIuZmluZCgnLmRpdmlkZXInKS5lcSgwKTtcblxuICAgIHRoaXMudHJhY2tSZWZyZXNoVGltZXIgPSBudWxsO1xuICB9XG5cbiAgLy9QYXVzZSBhbGwgdHJhY2tzIG9uIHRoZSBwYWdlIG90aGVyIHRoYW4gJ3RoaXMnIG9uZVxuICBhdWRpb1BsYXllci5wcm90b3R5cGUucGF1c2VBbGxPdGhlcnMgPSBmdW5jdGlvbigpe1xuXG4gICAgJCgnLmF1ZGlvLXBsYXllcicpLm5vdCh0aGlzLiRhdWRpb1BsYXllcikuZWFjaChmdW5jdGlvbigpe1xuICAgICAgXG4gICAgICB2YXIgcGxheXIgPSBuZXcgYXVkaW9QbGF5ZXIoJCh0aGlzKSk7XG4gICAgICBwbGF5ci5wYXVzZVRyYWNrKCk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIC8vY2hlY2sgaWYgdGhpcyBwbGF5ZXIgaXMgcGF1c2VkXG4gIGF1ZGlvUGxheWVyLnByb3RvdHlwZS5pc1BhdXNlZCA9IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoaXMudHJhY2sucGF1c2VkO1xuICB9XG5cbiAgYXVkaW9QbGF5ZXIucHJvdG90eXBlLnBhdXNlVHJhY2sgPSBmdW5jdGlvbigkYXVkaW9QbGF5ZXIpe1xuICAgIHRoaXMudHJhY2sucGF1c2UoKTtcbiAgICB0aGlzLiRhdWRpb1BsYXllci5yZW1vdmVDbGFzcygncGxheWluZycpO1xuICAgIHRoaXMuJHByb2dyZXNzQmFyLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuICB9XG4gIGF1ZGlvUGxheWVyLnByb3RvdHlwZS5wbGF5VHJhY2sgPSBmdW5jdGlvbigkYXVkaW9QbGF5ZXIpe1xuXG4gICAgdGhpcy5wYXVzZUFsbE90aGVycygpO1xuICAgIHRoaXMudHJhY2sucGxheSgpO1xuICAgIHRoaXMuJGF1ZGlvUGxheWVyLmFkZENsYXNzKCdwbGF5aW5nJyk7XG4gICAgdGhpcy4kcHJvZ3Jlc3NCYXIuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG5cbiAgICB0aGlzLnN0YXJ0SW50ZXJ2YWwoKTtcblxuICAgIHRoaXMuJGN1cnJlbnRUaW1lLnRleHQodGhpcy5jdXJyZW50VGltZVN0cmluZygpKTtcbiAgICB0aGlzLiRkaXZpZGVyLnNob3coKTtcbiAgICB0aGlzLiRtaXhMZW5ndGgudGV4dCh0aGlzLmR1cmF0aW9uU3RyaW5nKCkpO1xuICB9XG5cbiAgYXVkaW9QbGF5ZXIucHJvdG90eXBlLnN0YXJ0SW50ZXJ2YWwgPSBmdW5jdGlvbigpe1xuICAgIHRoaXMudHJhY2tSZWZyZXNoVGltZXIgPSBzZXRJbnRlcnZhbCh0aGlzLnRpY2suYmluZCh0aGlzKSwgMTAwKTtcbiAgfVxuICBhdWRpb1BsYXllci5wcm90b3R5cGUuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKCl7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRyYWNrUmVmcmVzaFRpbWVyKTtcbiAgfVxuICBhdWRpb1BsYXllci5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy4kY3VycmVudFRpbWUudGV4dCh0aGlzLmN1cnJlbnRUaW1lU3RyaW5nKCkpO1xuICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIoKTtcbiAgfVxuXG4gIGF1ZGlvUGxheWVyLnByb3RvdHlwZS51cGRhdGVQcm9ncmVzc0JhciA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHBsYXlQZXJjZW50YWdlID0gKHRoaXMudHJhY2suY3VycmVudFRpbWUgLyB0aGlzLnRyYWNrLmR1cmF0aW9uKSAqIDEwMDtcbiAgICB0aGlzLiRwbGF5ZWQuY3NzKCd3aWR0aCcsIHBsYXlQZXJjZW50YWdlKyclJyk7XG4gIH1cblxuICBhdWRpb1BsYXllci5wcm90b3R5cGUuY3VycmVudFRpbWVTdHJpbmcgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiB0aGlzLnRpbWVTdHJpbmcodGhpcy50cmFjay5jdXJyZW50VGltZSk7XG4gIH1cblxuICBhdWRpb1BsYXllci5wcm90b3R5cGUuZHVyYXRpb25TdHJpbmcgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiB0aGlzLnRpbWVTdHJpbmcodGhpcy50cmFjay5kdXJhdGlvbik7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgdGltZSBsaWtlIE1NOlNTXG4gIGF1ZGlvUGxheWVyLnByb3RvdHlwZS50aW1lU3RyaW5nID0gZnVuY3Rpb24odGltZSl7XG5cbiAgICBpZihpc05hTih0aW1lKSlcbiAgICB7IC8vZWVrLCB0cnkgYWdhaW4uIEhhcmQgdG8gcmVwcm9kdWNlXG4gICAgICBpZihpc05hTih0aGlzLnRyYWNrLmR1cmF0aW9uKSl7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1lbHNlIHtcbiAgICAgICAgdGhpcy50cmFjay5kdXJhdGlvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2Vjb25kcyA9IFwiMFwiICsgTWF0aC5yb3VuZCh0aW1lJTYwKTtcbiAgICBzZWNvbmRzID0gc2Vjb25kcy5zdWJzdHIoc2Vjb25kcy5sZW5ndGgtMik7XG5cbiAgICByZXR1cm4gIE1hdGgucm91bmQodGltZS82MCkrJzonK3NlY29uZHM7XG4gIH1cblxuICAvLyBQbGF5IGlmIHBhdXNlZCwgcGF1c2UgaWYgcGxheWluZ1xuICBhdWRpb1BsYXllci5wcm90b3R5cGUudG9nZ2xlUGxheVBhdXNlID0gZnVuY3Rpb24oKXtcbiAgICB0aGlzLmlzUGF1c2VkKCkgPyB0aGlzLnBsYXlUcmFjaygpIDogdGhpcy5wYXVzZVRyYWNrKCk7XG4gIH1cblxuICBhdWRpb1BsYXllci5wcm90b3R5cGUuc2VlayA9IGZ1bmN0aW9uKGV2ZW50KXtcblxuICAgIHZhciBwbGF5UGVyY2VudGFnZSA9IGV2ZW50Lm9mZnNldFggLyAkKGV2ZW50LnRhcmdldCkud2lkdGgoKTtcbiAgICB0aGlzLnRyYWNrLmN1cnJlbnRUaW1lID0gcGxheVBlcmNlbnRhZ2UgKiB0aGlzLnRyYWNrLmR1cmF0aW9uO1xuICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIoKTtcbiAgfSAgXG5cbiAgJCgnYm9keScpLm9uKCdjbGljaycsICcucGxheS1wYXVzZScsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIHBsYXllciA9IG5ldyBhdWRpb1BsYXllcigkKHRoaXMpLmNsb3Nlc3QoJy5hdWRpby1wbGF5ZXInKS5lcSgwKSk7XG4gICAgcGxheWVyLnRvZ2dsZVBsYXlQYXVzZSgpO1xuICB9KTtcblxuICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5wcm9ncmVzcy1iYXInLCBmdW5jdGlvbihldmVudCl7XG4gICAgdmFyIHBsYXllciA9IG5ldyBhdWRpb1BsYXllcigkKHRoaXMpLmNsb3Nlc3QoJy5hdWRpby1wbGF5ZXInKS5lcSgwKSk7XG4gICAgcGxheWVyLnNlZWsoZXZlbnQpO1xuICB9KTtcblxuXG5cblxuXG5cbn0pOyAiLCIvKiFcbiAqIFN0YXJ0IEJvb3RzdHJhcCAtIEdyYXlzY2FsZSBCb290c3RyYXAgVGhlbWUgKGh0dHA6Ly9zdGFydGJvb3RzdHJhcC5jb20pXG4gKiBDb2RlIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSB2Mi4wLlxuICogRm9yIGRldGFpbHMsIHNlZSBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjAuXG4gKi9cblxuLy8galF1ZXJ5IHRvIGNvbGxhcHNlIHRoZSBuYXZiYXIgb24gc2Nyb2xsXG5mdW5jdGlvbiBjb2xsYXBzZU5hdmJhcigpIHtcbiAgICBpZiAoJChcIi5uYXZiYXJcIikub2Zmc2V0KCkudG9wID4gJChcIiN3YXZlc1wiKS5vZmZzZXQoKS50b3AgLSAxNTApIHtcbiAgICAgICAgJChcIi5uYXZiYXItZml4ZWQtdG9wXCIpLmFkZENsYXNzKFwidG9wLW5hdi1jb2xsYXBzZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKFwiLm5hdmJhci1maXhlZC10b3BcIikucmVtb3ZlQ2xhc3MoXCJ0b3AtbmF2LWNvbGxhcHNlXCIpO1xuICAgIH1cbn1cbiBcbiQod2luZG93KS5zY3JvbGwoY29sbGFwc2VOYXZiYXIpO1xuJChkb2N1bWVudCkucmVhZHkoY29sbGFwc2VOYXZiYXIpO1xuXG4vLyBqUXVlcnkgZm9yIHBhZ2Ugc2Nyb2xsaW5nIGZlYXR1cmUgLSByZXF1aXJlcyBqUXVlcnkgRWFzaW5nIHBsdWdpblxuJChmdW5jdGlvbigpIHtcbiAgICAkKCdhLnBhZ2Utc2Nyb2xsJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgJGFuY2hvciA9ICQodGhpcyk7XG4gICAgICAgIC8vICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7XG4gICAgICAgIC8vICAgICBzY3JvbGxUb3A6ICQoJGFuY2hvci5hdHRyKCdocmVmJykpLm9mZnNldCgpLnRvcFxuICAgICAgICAvLyB9LCAxNTAwLCAnZWFzZUluT3V0RXhwbycpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xufSk7XG5cbi8vIENsb3NlcyB0aGUgUmVzcG9uc2l2ZSBNZW51IG9uIE1lbnUgSXRlbSBDbGlja1xuJCgnLm5hdmJhci1jb2xsYXBzZSB1bCBsaSBhJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gIGlmICgkKHRoaXMpLmF0dHIoJ2NsYXNzJykgIT0gJ2Ryb3Bkb3duLXRvZ2dsZSBhY3RpdmUnICYmICQodGhpcykuYXR0cignY2xhc3MnKSAhPSAnZHJvcGRvd24tdG9nZ2xlJykge1xuICAgICQoJy5uYXZiYXItdG9nZ2xlOnZpc2libGUnKS5jbGljaygpO1xuICB9XG59KTtcbiIsIiAgXG4vKiBcbiAgQW5pbWF0ZSByYXRpbmdzIGJhciBieSBjaGFuZ2luZyBvcGFjaXR5IG9mIHNldmVyYWwgYmxvY2tzXG4gICovXG4kKGZ1bmN0aW9uKCl7XG4gIFxuICAvLyAgNjBzLzEyNWJwbSA9IDQ4MG1zXG4gIHZhciBBTklNQVRJT05fUEVSSU9EID0gKDYwLjAvMTI1KSoxMDAwO1xuICB2YXIgREVGQVVMVF9PUEFDSVRZID0gJzAuNCc7XG4gIHZhciBJTkNSRUFTRURfT1BBQ0lUWSA9ICcwLjUnO1xuICB2YXIgJHJhdGluZ19ibG9ja3MgPSAkKCcuYm90dG9tLWJhciAucmF0aW5nLWJsb2NrJyk7XG4gIHZhciBudW1fcmF0aW5ncyA9ICRyYXRpbmdfYmxvY2tzLmxlbmd0aDtcbiAgdmFyIG9yaWdpbmFsX2Jsb2NrX2hlaWdodCA9ICRyYXRpbmdfYmxvY2tzLmVxKDApLmhlaWdodCgpO1xuXG4gIGlmKG51bV9yYXRpbmdzID09PSAwKXtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBFdmVyeSB4IG1zLCBkbzpcbiAgLy8gIHJlc2V0IGFsbCBvcGFjaXRpZXNcbiAgLy8gIGNob29zZSB4IHJhbmRvbSByYXRpbmcgYmxvY2tzIHRvIGRhcmtlblxuICAvLyAgY2hvb3NlIGEgcmFuZG9tIGJsb2NrIGZyb20gdGhhdCBncm91cCB0byBkYXJrZW4sIG92ZXJsYXAgb2tcbiAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cbiAgICAvL2VhY2ggdGltZSwgYSBkaWZmZXJlbnQgbnVtYmVyIG9mIGJsb2NrcyBhcmUgY2hvc2VuXG4gICAgdmFyIGJsb2Nrc190b19ibGFuayA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpudW1fcmF0aW5ncykrMTtcbiAgICBcbiAgICAkcmF0aW5nX2Jsb2Nrcy5ub3QoJy5hY3RpdmUnKS5jc3MoJ29wYWNpdHknLCBERUZBVUxUX09QQUNJVFkpO1xuICAgICAgICAgICAgICAgICAgLy8gLmNzcygnaGVpZ2h0Jywgb3JpZ2luYWxfYmxvY2tfaGVpZ2h0KydweCcpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBibG9ja3NfdG9fYmxhbms7IGkrKykge1xuICAgICAgdmFyIHJhbmRfYmxvY2tfaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqbnVtX3JhdGluZ3MpKzE7XG5cbiAgICAgIGlmKCEkcmF0aW5nX2Jsb2Nrcy5lcShyYW5kX2Jsb2NrX2luZGV4KS5oYXNDbGFzcygnYWN0aXZlJykpe1xuICAgICAgICAkcmF0aW5nX2Jsb2Nrcy5lcShyYW5kX2Jsb2NrX2luZGV4KVxuICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ29wYWNpdHknLCBJTkNSRUFTRURfT1BBQ0lUWSk7XG4gICAgICB9XG4gICAgfVxuICB9LCBBTklNQVRJT05fUEVSSU9EKTtcblxuXG5cbiAgLy8gY29udHJvbCBzaG93aW5nIFYtcmF0aW5nIGRlc2NyaXB0aW9ucyBvbiBob3ZlciBvZiBWLWNvbG9yIGJ1dHRvblxuICAkKCcuYm90dG9tLWJhciA+IGRpdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIHJhdGluZyA9ICQodGhpcykuZmluZCgnLnJhdGluZy1ibG9jaycpLmRhdGEoJ3JhdGluZycpO1xuICAgIHNob3dBbmRIaWdobGlnaHRSYXRpbmcocmF0aW5nKTtcbiAgfSk7XG5cblxuICBmdW5jdGlvbiBzaG93QW5kSGlnaGxpZ2h0UmF0aW5nKHJhdGluZyl7XG4gICAgXG4gICAgLy9oaWRlIGFsbCBvdGhlciBkZXNjcmlwdGlvbnNcbiAgICAkKCcudi1kZXNjcmlwdGlvbnMgPiBwJylcbiAgICAgIC5ub3QoJy52LWRlc2NyaXB0aW9ucyA+IHBbZGF0YS1yYXRpbmc9XCInK3JhdGluZysnXCJdJylcbiAgICAgIC5oaWRlKCk7XG5cbiAgICAvL3JlbW92ZSBvdGhlciBhY3RpdmUgb3BhY2l0aWVzXG4gICAgJCgnLmJvdHRvbS1iYXIgPiBkaXYgLnJhdGluZy1ibG9jaycpXG4gICAgICAubm90KCcuYm90dG9tLWJhciA+IGRpdiAucmF0aW5nLWJsb2NrW2RhdGEtcmF0aW5nPVwiJytyYXRpbmcrJ1wiXScpXG4gICAgICAuY3NzKCdvcGFjaXR5JywgREVGQVVMVF9PUEFDSVRZKVxuICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuICAgIC8vXG4gICAgJCgnLmJvdHRvbS1iYXIgPiBkaXYgLnJhdGluZy1ibG9ja1tkYXRhLXJhdGluZz1cIicrcmF0aW5nKydcIl0nKVxuICAgICAgLmNzcygnb3BhY2l0eScsIDEpXG4gICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgJCgnLnYtZGVzY3JpcHRpb25zID4gcFtkYXRhLXJhdGluZz1cIicrcmF0aW5nKydcIl0nKS5zaG93KCk7XG4gIH1cbn0pO1xuXG5cbiQoZnVuY3Rpb24oKXtcblxuICAvL2dldCB0aGUgc3R1YiBmcm9tIHRoZSB1cmwsIGxpa2UgZGptb3VudGFpbm91cy5jb20/Ymx1ZXByaW50LTE5LXdhcm11cFxuICB2YXIgc2VhcmNoID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5yZXBsYWNlKFwiP1wiLCBcIlwiKTtcbiBcbiAgLy9zY3JvbGwgdGhhdCBlbGVtZW50J3MgdG9wICBcbiAgc2V0VGltZW91dChmdW5jdGlvbigpeyBcblxuICAgIC8vICQoJ2h0bWwsIGJvZHknKS5zY3JvbGxUb3AoJCgnLicrc2VhcmNoKS5vZmZzZXQoKS50b3AtMzAwKTtcbiAgICAvLyAkKCcubWl4Jykubm90KCcuJytzZWFyY2gpLmNzcygnb3BhY2l0eScsIDAuNik7XG4gICAgLy8gJCgnLm1peC1ncm91cF9fdGl0bGUsIC5ncm91cC1kZXNjcmlwdGlvbicpLmNzcygnb3BhY2l0eScsIDAuNik7XG4gIH0sIDE4MDApOyBcblxuICAvL3doZW4gYW55dGhpbmcgaXMgY2xpY2tlZCwgc2V0IHRoZSBvcGFjaXR5IG9mIHRoZSBtaXhlcyBiYWNrIHRvIDFcbiAgJCgnKicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCgnLm1peCcpLmNzcygnb3BhY2l0eScsIDEpO1xuICB9KTsgXG4gICAgXG4gICQoJyNtaXhlcycpLm9uKCdjbGljaycsICcubWl4X19kZXRhaWxzIC5yYXRpbmcnLCBmdW5jdGlvbigpe1xuICAgICQoJy5yYXRpbmctYmxvY2tbZGF0YS1yYXRpbmc9XCInKyQodGhpcykuZGF0YSgncmF0aW5nJykrJ1wiXScpLmNsb3Nlc3QoJ2RpdicpLnRyaWdnZXIoJ2hvdmVyJyk7XG4gICAgJCgnLnJhdGluZy1ibG9ja1tkYXRhLXJhdGluZz1cIicrJCh0aGlzKS5kYXRhKCdyYXRpbmcnKSsnXCJdJykuY2xvc2VzdCgnZGl2JykudHJpZ2dlcignY2xpY2snKTtcbiAgICAkKCdodG1sLCBib2R5Jykuc2Nyb2xsVG9wKCQoJy5ib3R0b20tYmFyJykub2Zmc2V0KCkudG9wLTEzMCk7XG4gIH0pO1xuICBcbn0pOyAgIiwiJChmdW5jdGlvbiAgKCkge1xuXG4gIHZhciBNSVhfUEFUSCA9IFwiaHR0cDovL2RqbW91bnRhaW5vdXMuY29tL21peGVzL2RqLW1vdW50YWlub3VzLVwiO1xuICAvLyBtaXhlcyBNVVNUIGJlIG5hbWVkIGRqLW1vdXRhaW5vdXMte3NsdWd9LihtcDMvbTRhKVxuICAvLyBpLmUuIGRqLW1vdW50YWlub3VzLXZhLXRlY2gtaG91c2VcblxuICB2YXIgY2FsbV9taXhlcyA9IHtcbiAgICBtaXhlczogW1xuICAgICAgLy9uZXcgbWl4IGdvZXMgaGVyZVxuICAgICAge1xuICAgICAgICB0aXRsZTogXCJUaGUgRWlnZXJcIixcbiAgICAgICAgZ2VucmVzOiBcIlRlY2ggSG91c2VcIixcbiAgICAgICAgZGF0ZTogXCJTZXB0IDIwMTZcIixcbiAgICAgICAgc2x1ZzogXCJ2YS10ZWNoLWhvdXNlXCIsXG4gICAgICAgIHJhdGluZzogM1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6IFwiR2FyaWJhbGRpXCIsXG4gICAgICAgIGdlbnJlczogXCJEZWVwIEhvdXNlXCIsXG4gICAgICAgIGRhdGU6IFwiSnVuZSAyMDE2XCIsXG4gICAgICAgIHNsdWc6IFwidmEtZGVlcC1ob3VzZS12MlwiLFxuICAgICAgICByYXRpbmc6IDJcbiAgICAgIH0sXG4gICAgXVxuICB9O1xuXG4gIHZhciBpbnRlbnNlX21peGVzID0ge1xuICAgIG1peGVzOiBbXG4gICAgICAvL25ldyBtaXggZ29lcyBoZXJlXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiBcIkJsdWVwcmludCAxOXRoIFdhcm11cFwiLFxuICAgICAgICBnZW5yZXM6IFwiUmV6eiBHcml6IEdyaW1lIFcuUy5OIERGcmFuY2lzXCIsXG4gICAgICAgIGRhdGU6IFwiT2N0b2JlciAyMDE2XCIsXG4gICAgICAgIHNsdWc6IFwiYmx1ZXByaW50LTE5LXdhcm11cFwiLFxuICAgICAgICByYXRpbmc6IDlcbiAgICAgIH0se1xuICAgICAgICB0aXRsZTogXCJMaXZlIEAgQmlydGhSYXZlIDIwMTZcIixcbiAgICAgICAgZ2VucmVzOiBcIkJhc3MgRnVuaywgVHJhcCwgRHViXCIsXG4gICAgICAgIGRhdGU6IFwiU2VwdCAyNCwgMjAxNlwiLFxuICAgICAgICBzbHVnOiBcImxpdmUtYmlydGhyYXZlLTIwMTYtYmFzcy1mdW5rLWR1YlwiLFxuICAgICAgICByYXRpbmc6IDhcbiAgICAgIH0seyBcbiAgICAgICAgdGl0bGU6IFwiQmxhY2sgVHVza1wiLFxuICAgICAgICBnZW5yZXM6IFwiVHJhcCAmIER1YnN0ZXBcIixcbiAgICAgICAgZGF0ZTogXCJBdWd1c3QgMjAxNlwiLFxuICAgICAgICBzbHVnOiBcInZhLWR1YnRyYXBcIixcbiAgICAgICAgcmF0aW5nOiA5XG4gICAgICB9LHtcbiAgICAgICAgdGl0bGU6IFwiU2V2ZW4gTGlvbnMgd2FybXVwXCIsXG4gICAgICAgIGdlbnJlczogXCJEcmVhbXN0ZXBcIixcbiAgICAgICAgZGF0ZTogXCJPY3RvYmVyIDIwMTZcIixcbiAgICAgICAgc2x1ZzogXCJzZXZlbi1saW9ucy13YXJtLXVwLW1peFwiLFxuICAgICAgICByYXRpbmc6IDdcbiAgICAgIH1cbiAgICBdXG4gIH07Ly8gaW50ZW5zZSBtaXhlc1xuXG4gIC8vIC8vaW5qZWN0IGhhbmRsZWJhcnMgdGVtcGxhdGVzIHdpdGggbWl4IGRhdGFcbiAgaW5qZWN0VGVtcGxhdGVzKGludGVuc2VfbWl4ZXMsICAnaW50ZW5zZScpOyBcbiAgaW5qZWN0VGVtcGxhdGVzKGNhbG1fbWl4ZXMsICAgICAnY2FsbScpO1xuICBcbiAgZnVuY3Rpb24gaW5qZWN0VGVtcGxhdGVzKGRhdGEsIHR5cGUpe1xuXG4gICAgdmFyIGh0bWwgPSBNeUFwcC50ZW1wbGF0ZXMubWl4ZXMoZGF0YSk7XG4gICAgJCgnI21peGVzLXRtcGwtJyt0eXBlKS5odG1sKGh0bWwpO1xuICB9ICBcblxuXG59KTtcbiAgXG5cbiAiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

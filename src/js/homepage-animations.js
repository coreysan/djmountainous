  
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



/* 
  Handle direct-link via query string. 
  get the stub from the url, like djmountainous.com?blueprint-19-warmup

  Link like above is input, 
*/
$(function(){

  var search = window.location.search.replace("?", "");
 
  if(search.length === 0)
  {
    return;
  }

  // set other mixes to nothing
  setTimeout(function(){  
    $('.mix').not('.'+search).css('opacity', 0.5);
    $('.mix-group__title, .group-description').css('opacity', 0.5);
  }, 0); 

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

/* 
  Fade play button in
*/
$(function(){

  //   // //scroll that element's top  
  setTimeout(function(){  
    $('.audio-controls__background').removeClass('start-position');
  }, 10); 

});   


/* 
  stabilize videos by restarting them every X seconds (legnth of video)
*/
$(function(){

  setInterval(function(){  
    ['video-left', 'video-right'].forEach((videoId) => {
      console.log("Restarting video-left");
      mediaElement = document.getElementById(videoId); 
      mediaElement.pause(); 
      mediaElement.currentTime = 0;
      mediaElement.play(); 
    })
  }, 34000);//video length is 34 seconds 

});  
  
/* 
  Animate ratings bar by changing opacity of several blocks
  */
$(function(){
  
  //  60s/125bpm = 480ms
  var ANIMATION_PERIOD = (60.0/125)*1000;
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
    
    $rating_blocks.css('opacity', '0.4');
                  // .css('height', original_block_height+'px');

    for (var i = 0; i < blocks_to_blank; i++) {
      var rand_block_index = Math.floor(Math.random()*num_ratings)+1;
      $rating_blocks.eq(rand_block_index)
                    .css('opacity', '0.5');
    } 
  }, ANIMATION_PERIOD);

  // control showing V-rating descriptions on hover of V-color button
  $('.bottom-bar > div').on('mouseenter', function(){
    var rating = $(this).find('.rating-block').data('rating');
    $('.v-descriptions > p')
      .not('.v-descriptions > p[data-rating="'+rating+'"]')
      .hide();

    $('.v-descriptions > p[data-rating="'+rating+'"]').show();
  });


});
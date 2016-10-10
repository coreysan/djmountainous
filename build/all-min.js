/*!
 * DJ Mountainous - Dj Mountainous v1.1.1 (djmountainous.com)
 * Copyright 2016-2016 Corey Sanford
 */
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

    $('html, body').scrollTop($('.'+search).offset().top-300);
    $('.mix').not('.'+search).css('opacity', 0.6);
    $('.mix-group__title, .group-description').css('opacity', 0.6);
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
        title: "Blueprint 19th Warm-up",
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
      }
    ]
  };// intense mixes

  //inject handlebars templates with mix data
  injectTemplates(intense_mixes,  'intense'); 
  injectTemplates(calm_mixes,     'calm');

  //set up the audio players
  initCirclePlayers(calm_mixes.mixes); 
  initCirclePlayers(intense_mixes.mixes);
  
  function injectTemplates(data, type){

    var html = MyApp.templates.mixes(data);
    $('#mixes-tmpl-'+type).html(html);
   
    html = MyApp.templates.jplayers(data);
    $('#jplayers-tmpl-'+type).html(html);
  }  
 
  function initCirclePlayers(mix_list){

    mix_list.forEach(function(mix){
      new CirclePlayer(
        "#jquery_jplayer_"+mix.slug,
        {
          mp3: MIX_PATH+mix.slug+".mp3",
          m4a: MIX_PATH+mix.slug+".m4a"
        }, {
          cssSelectorAncestor: "#cp_container_"+mix.slug
        }
      );
    });
  }

});
  

 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYXlzY2FsZS5qcyIsImhvbWVwYWdlLWFuaW1hdGlvbnMuanMiLCJzaXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLW1pbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogU3RhcnQgQm9vdHN0cmFwIC0gR3JheXNjYWxlIEJvb3RzdHJhcCBUaGVtZSAoaHR0cDovL3N0YXJ0Ym9vdHN0cmFwLmNvbSlcbiAqIENvZGUgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlIHYyLjAuXG4gKiBGb3IgZGV0YWlscywgc2VlIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMC5cbiAqL1xuXG4vLyBqUXVlcnkgdG8gY29sbGFwc2UgdGhlIG5hdmJhciBvbiBzY3JvbGxcbmZ1bmN0aW9uIGNvbGxhcHNlTmF2YmFyKCkge1xuICAgIGlmICgkKFwiLm5hdmJhclwiKS5vZmZzZXQoKS50b3AgPiAkKFwiI3dhdmVzXCIpLm9mZnNldCgpLnRvcCAtIDE1MCkge1xuICAgICAgICAkKFwiLm5hdmJhci1maXhlZC10b3BcIikuYWRkQ2xhc3MoXCJ0b3AtbmF2LWNvbGxhcHNlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoXCIubmF2YmFyLWZpeGVkLXRvcFwiKS5yZW1vdmVDbGFzcyhcInRvcC1uYXYtY29sbGFwc2VcIik7XG4gICAgfVxufVxuIFxuJCh3aW5kb3cpLnNjcm9sbChjb2xsYXBzZU5hdmJhcik7XG4kKGRvY3VtZW50KS5yZWFkeShjb2xsYXBzZU5hdmJhcik7XG5cbi8vIGpRdWVyeSBmb3IgcGFnZSBzY3JvbGxpbmcgZmVhdHVyZSAtIHJlcXVpcmVzIGpRdWVyeSBFYXNpbmcgcGx1Z2luXG4kKGZ1bmN0aW9uKCkge1xuICAgICQoJ2EucGFnZS1zY3JvbGwnKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciAkYW5jaG9yID0gJCh0aGlzKTtcbiAgICAgICAgLy8gJCgnaHRtbCwgYm9keScpLnN0b3AoKS5hbmltYXRlKHtcbiAgICAgICAgLy8gICAgIHNjcm9sbFRvcDogJCgkYW5jaG9yLmF0dHIoJ2hyZWYnKSkub2Zmc2V0KCkudG9wXG4gICAgICAgIC8vIH0sIDE1MDAsICdlYXNlSW5PdXRFeHBvJyk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG59KTtcblxuLy8gQ2xvc2VzIHRoZSBSZXNwb25zaXZlIE1lbnUgb24gTWVudSBJdGVtIENsaWNrXG4kKCcubmF2YmFyLWNvbGxhcHNlIHVsIGxpIGEnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgaWYgKCQodGhpcykuYXR0cignY2xhc3MnKSAhPSAnZHJvcGRvd24tdG9nZ2xlIGFjdGl2ZScgJiYgJCh0aGlzKS5hdHRyKCdjbGFzcycpICE9ICdkcm9wZG93bi10b2dnbGUnKSB7XG4gICAgJCgnLm5hdmJhci10b2dnbGU6dmlzaWJsZScpLmNsaWNrKCk7XG4gIH1cbn0pO1xuIiwiICBcbi8qIFxuICBBbmltYXRlIHJhdGluZ3MgYmFyIGJ5IGNoYW5naW5nIG9wYWNpdHkgb2Ygc2V2ZXJhbCBibG9ja3NcbiAgKi9cbiQoZnVuY3Rpb24oKXtcbiAgXG4gIC8vICA2MHMvMTI1YnBtID0gNDgwbXNcbiAgdmFyIEFOSU1BVElPTl9QRVJJT0QgPSAoNjAuMC8xMjUpKjEwMDA7XG4gIHZhciBERUZBVUxUX09QQUNJVFkgPSAnMC40JztcbiAgdmFyIElOQ1JFQVNFRF9PUEFDSVRZID0gJzAuNSc7XG4gIHZhciAkcmF0aW5nX2Jsb2NrcyA9ICQoJy5ib3R0b20tYmFyIC5yYXRpbmctYmxvY2snKTtcbiAgdmFyIG51bV9yYXRpbmdzID0gJHJhdGluZ19ibG9ja3MubGVuZ3RoO1xuICB2YXIgb3JpZ2luYWxfYmxvY2tfaGVpZ2h0ID0gJHJhdGluZ19ibG9ja3MuZXEoMCkuaGVpZ2h0KCk7XG5cbiAgaWYobnVtX3JhdGluZ3MgPT09IDApe1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEV2ZXJ5IHggbXMsIGRvOlxuICAvLyAgcmVzZXQgYWxsIG9wYWNpdGllc1xuICAvLyAgY2hvb3NlIHggcmFuZG9tIHJhdGluZyBibG9ja3MgdG8gZGFya2VuXG4gIC8vICBjaG9vc2UgYSByYW5kb20gYmxvY2sgZnJvbSB0aGF0IGdyb3VwIHRvIGRhcmtlbiwgb3ZlcmxhcCBva1xuICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblxuICAgIC8vZWFjaCB0aW1lLCBhIGRpZmZlcmVudCBudW1iZXIgb2YgYmxvY2tzIGFyZSBjaG9zZW5cbiAgICB2YXIgYmxvY2tzX3RvX2JsYW5rID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm51bV9yYXRpbmdzKSsxO1xuICAgIFxuICAgICRyYXRpbmdfYmxvY2tzLm5vdCgnLmFjdGl2ZScpLmNzcygnb3BhY2l0eScsIERFRkFVTFRfT1BBQ0lUWSk7XG4gICAgICAgICAgICAgICAgICAvLyAuY3NzKCdoZWlnaHQnLCBvcmlnaW5hbF9ibG9ja19oZWlnaHQrJ3B4Jyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2Nrc190b19ibGFuazsgaSsrKSB7XG4gICAgICB2YXIgcmFuZF9ibG9ja19pbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpudW1fcmF0aW5ncykrMTtcblxuICAgICAgaWYoISRyYXRpbmdfYmxvY2tzLmVxKHJhbmRfYmxvY2tfaW5kZXgpLmhhc0NsYXNzKCdhY3RpdmUnKSl7XG4gICAgICAgICRyYXRpbmdfYmxvY2tzLmVxKHJhbmRfYmxvY2tfaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgLmNzcygnb3BhY2l0eScsIElOQ1JFQVNFRF9PUEFDSVRZKTtcbiAgICAgIH1cbiAgICB9IFxuICB9LCBBTklNQVRJT05fUEVSSU9EKTtcblxuXG5cbiAgLy8gY29udHJvbCBzaG93aW5nIFYtcmF0aW5nIGRlc2NyaXB0aW9ucyBvbiBob3ZlciBvZiBWLWNvbG9yIGJ1dHRvblxuICAkKCcuYm90dG9tLWJhciA+IGRpdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIHJhdGluZyA9ICQodGhpcykuZmluZCgnLnJhdGluZy1ibG9jaycpLmRhdGEoJ3JhdGluZycpO1xuICAgIHNob3dBbmRIaWdobGlnaHRSYXRpbmcocmF0aW5nKTtcbiAgfSk7XG5cblxuICBmdW5jdGlvbiBzaG93QW5kSGlnaGxpZ2h0UmF0aW5nKHJhdGluZyl7XG4gICAgXG4gICAgLy9oaWRlIGFsbCBvdGhlciBkZXNjcmlwdGlvbnNcbiAgICAkKCcudi1kZXNjcmlwdGlvbnMgPiBwJylcbiAgICAgIC5ub3QoJy52LWRlc2NyaXB0aW9ucyA+IHBbZGF0YS1yYXRpbmc9XCInK3JhdGluZysnXCJdJylcbiAgICAgIC5oaWRlKCk7XG5cbiAgICAvL3JlbW92ZSBvdGhlciBhY3RpdmUgb3BhY2l0aWVzXG4gICAgJCgnLmJvdHRvbS1iYXIgPiBkaXYgLnJhdGluZy1ibG9jaycpXG4gICAgICAubm90KCcuYm90dG9tLWJhciA+IGRpdiAucmF0aW5nLWJsb2NrW2RhdGEtcmF0aW5nPVwiJytyYXRpbmcrJ1wiXScpXG4gICAgICAuY3NzKCdvcGFjaXR5JywgREVGQVVMVF9PUEFDSVRZKVxuICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuICAgIC8vXG4gICAgJCgnLmJvdHRvbS1iYXIgPiBkaXYgLnJhdGluZy1ibG9ja1tkYXRhLXJhdGluZz1cIicrcmF0aW5nKydcIl0nKVxuICAgICAgLmNzcygnb3BhY2l0eScsIDEpXG4gICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgJCgnLnYtZGVzY3JpcHRpb25zID4gcFtkYXRhLXJhdGluZz1cIicrcmF0aW5nKydcIl0nKS5zaG93KCk7XG4gIH1cbn0pO1xuXG5cblxuJChmdW5jdGlvbigpe1xuXG4gIC8vZ2V0IHRoZSBzdHViIGZyb20gdGhlIHVybCwgbGlrZSBkam1vdW50YWlub3VzLmNvbT9ibHVlcHJpbnQtMTktd2FybXVwXG4gIHZhciBzZWFyY2ggPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnJlcGxhY2UoXCI/XCIsIFwiXCIpO1xuXG4gIC8vc2Nyb2xsIHRoYXQgZWxlbWVudCdzIHRvcCAgXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgXG5cbiAgICAkKCdodG1sLCBib2R5Jykuc2Nyb2xsVG9wKCQoJy4nK3NlYXJjaCkub2Zmc2V0KCkudG9wLTMwMCk7XG4gICAgJCgnLm1peCcpLm5vdCgnLicrc2VhcmNoKS5jc3MoJ29wYWNpdHknLCAwLjYpO1xuICAgICQoJy5taXgtZ3JvdXBfX3RpdGxlLCAuZ3JvdXAtZGVzY3JpcHRpb24nKS5jc3MoJ29wYWNpdHknLCAwLjYpO1xuICB9LCAxODAwKTtcblxuICAvL3doZW4gYW55dGhpbmcgaXMgY2xpY2tlZCwgc2V0IHRoZSBvcGFjaXR5IG9mIHRoZSBtaXhlcyBiYWNrIHRvIDFcbiAgJCgnKicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCgnLm1peCcpLmNzcygnb3BhY2l0eScsIDEpO1xuICB9KTtcbiAgIFxuICAkKCcjbWl4ZXMnKS5vbignY2xpY2snLCAnLm1peF9fZGV0YWlscyAucmF0aW5nJywgZnVuY3Rpb24oKXtcbiAgICAkKCcucmF0aW5nLWJsb2NrW2RhdGEtcmF0aW5nPVwiJyskKHRoaXMpLmRhdGEoJ3JhdGluZycpKydcIl0nKS5jbG9zZXN0KCdkaXYnKS50cmlnZ2VyKCdob3ZlcicpO1xuICAgICQoJy5yYXRpbmctYmxvY2tbZGF0YS1yYXRpbmc9XCInKyQodGhpcykuZGF0YSgncmF0aW5nJykrJ1wiXScpLmNsb3Nlc3QoJ2RpdicpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgJCgnaHRtbCwgYm9keScpLnNjcm9sbFRvcCgkKCcuYm90dG9tLWJhcicpLm9mZnNldCgpLnRvcC0xMzApO1xuICB9KTtcblxufSk7ICAiLCIkKGZ1bmN0aW9uICAoKSB7XG5cbiAgdmFyIE1JWF9QQVRIID0gXCJodHRwOi8vZGptb3VudGFpbm91cy5jb20vbWl4ZXMvZGotbW91bnRhaW5vdXMtXCI7XG4gIC8vIG1peGVzIE1VU1QgYmUgbmFtZWQgZGotbW91dGFpbm91cy17c2x1Z30uKG1wMy9tNGEpXG4gIC8vIGkuZS4gZGotbW91bnRhaW5vdXMtdmEtdGVjaC1ob3VzZVxuXG4gIHZhciBjYWxtX21peGVzID0ge1xuICAgIG1peGVzOiBbXG4gICAgICAvL25ldyBtaXggZ29lcyBoZXJlXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiBcIlRoZSBFaWdlclwiLFxuICAgICAgICBnZW5yZXM6IFwiVGVjaCBIb3VzZVwiLFxuICAgICAgICBkYXRlOiBcIlNlcHQgMjAxNlwiLFxuICAgICAgICBzbHVnOiBcInZhLXRlY2gtaG91c2VcIixcbiAgICAgICAgcmF0aW5nOiAzXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogXCJHYXJpYmFsZGlcIixcbiAgICAgICAgZ2VucmVzOiBcIkRlZXAgSG91c2VcIixcbiAgICAgICAgZGF0ZTogXCJKdW5lIDIwMTZcIixcbiAgICAgICAgc2x1ZzogXCJ2YS1kZWVwLWhvdXNlLXYyXCIsXG4gICAgICAgIHJhdGluZzogMlxuICAgICAgfSxcbiAgICBdXG4gIH07XG5cbiAgdmFyIGludGVuc2VfbWl4ZXMgPSB7XG4gICAgbWl4ZXM6IFtcbiAgICAgIC8vbmV3IG1peCBnb2VzIGhlcmVcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6IFwiQmx1ZXByaW50IDE5dGggV2FybS11cFwiLFxuICAgICAgICBnZW5yZXM6IFwiUmV6eiBHcml6IEdyaW1lIFcuUy5OIERGcmFuY2lzXCIsXG4gICAgICAgIGRhdGU6IFwiT2N0b2JlciAyMDE2XCIsXG4gICAgICAgIHNsdWc6IFwiYmx1ZXByaW50LTE5LXdhcm11cFwiLFxuICAgICAgICByYXRpbmc6IDlcbiAgICAgIH0se1xuICAgICAgICB0aXRsZTogXCJMaXZlIEAgQmlydGhSYXZlIDIwMTZcIixcbiAgICAgICAgZ2VucmVzOiBcIkJhc3MgRnVuaywgVHJhcCwgRHViXCIsXG4gICAgICAgIGRhdGU6IFwiU2VwdCAyNCwgMjAxNlwiLFxuICAgICAgICBzbHVnOiBcImxpdmUtYmlydGhyYXZlLTIwMTYtYmFzcy1mdW5rLWR1YlwiLFxuICAgICAgICByYXRpbmc6IDhcbiAgICAgIH0seyBcbiAgICAgICAgdGl0bGU6IFwiQmxhY2sgVHVza1wiLFxuICAgICAgICBnZW5yZXM6IFwiVHJhcCAmIER1YnN0ZXBcIixcbiAgICAgICAgZGF0ZTogXCJBdWd1c3QgMjAxNlwiLFxuICAgICAgICBzbHVnOiBcInZhLWR1YnRyYXBcIixcbiAgICAgICAgcmF0aW5nOiA5XG4gICAgICB9XG4gICAgXVxuICB9Oy8vIGludGVuc2UgbWl4ZXNcblxuICAvL2luamVjdCBoYW5kbGViYXJzIHRlbXBsYXRlcyB3aXRoIG1peCBkYXRhXG4gIGluamVjdFRlbXBsYXRlcyhpbnRlbnNlX21peGVzLCAgJ2ludGVuc2UnKTsgXG4gIGluamVjdFRlbXBsYXRlcyhjYWxtX21peGVzLCAgICAgJ2NhbG0nKTtcblxuICAvL3NldCB1cCB0aGUgYXVkaW8gcGxheWVyc1xuICBpbml0Q2lyY2xlUGxheWVycyhjYWxtX21peGVzLm1peGVzKTsgXG4gIGluaXRDaXJjbGVQbGF5ZXJzKGludGVuc2VfbWl4ZXMubWl4ZXMpO1xuICBcbiAgZnVuY3Rpb24gaW5qZWN0VGVtcGxhdGVzKGRhdGEsIHR5cGUpe1xuXG4gICAgdmFyIGh0bWwgPSBNeUFwcC50ZW1wbGF0ZXMubWl4ZXMoZGF0YSk7XG4gICAgJCgnI21peGVzLXRtcGwtJyt0eXBlKS5odG1sKGh0bWwpO1xuICAgXG4gICAgaHRtbCA9IE15QXBwLnRlbXBsYXRlcy5qcGxheWVycyhkYXRhKTtcbiAgICAkKCcjanBsYXllcnMtdG1wbC0nK3R5cGUpLmh0bWwoaHRtbCk7XG4gIH0gIFxuIFxuICBmdW5jdGlvbiBpbml0Q2lyY2xlUGxheWVycyhtaXhfbGlzdCl7XG5cbiAgICBtaXhfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKG1peCl7XG4gICAgICBuZXcgQ2lyY2xlUGxheWVyKFxuICAgICAgICBcIiNqcXVlcnlfanBsYXllcl9cIittaXguc2x1ZyxcbiAgICAgICAge1xuICAgICAgICAgIG1wMzogTUlYX1BBVEgrbWl4LnNsdWcrXCIubXAzXCIsXG4gICAgICAgICAgbTRhOiBNSVhfUEFUSCttaXguc2x1ZytcIi5tNGFcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgY3NzU2VsZWN0b3JBbmNlc3RvcjogXCIjY3BfY29udGFpbmVyX1wiK21peC5zbHVnXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxufSk7XG4gIFxuXG4gIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

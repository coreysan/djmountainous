$(function  () {

  var MIX_PATH = "http://djmountainous.com/mixes/";

  var calm_mixes = {
    mixes: [
      //new mix goes here
      {
        title: "The Eiger",
        genres: "Tech House",
        date: "Sept 2016",
        slug: "dj-mountainous-va-tech-house",
        rating: 3
      },
      {
        title: "Garibaldi",
        genres: "Deep House",
        date: "June 2016",
        slug: "dj-mountainous-va-deep-house-v2",
        rating: 2
      },
    ]
  };

  var intense_mixes = {
    mixes: [
      //new mix goes here
      {
        title: "Seven Lions Warm-up",
        genres: "Dreamstep",
        date: "October 2016",
        slug: "djmountainous-seven-lions-warm-up-mix",
        rating: 7
      },{
        title: "Live @ BirthRave 2016",
        genres: "Bass Funk, Trap, Dub",
        date: "Sept 24, 2016",
        slug: "dj-mountainous-live-birthrave-2016-bass-funk-dub",
        rating: 8
      },{ 
        title: "Black Tusk",
        genres: "Trap & Dubstep",
        date: "August 2016",
        slug: "dj-mountainous-va-dubtrap",
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
  
  console.log("Mixes outside func: " + mixes);

  function injectTemplates(data, type){

    var html = MyApp.templates.mixes(data);
    $('#mixes-tmpl-'+type).html(html);
   
    html = MyApp.templates.jplayers(data);
    $('#jplayers-tmpl-'+type).html(html);
  } 

  function initCirclePlayers(mix_list){
    console.log("mix_list INSIDE func: " + mix_list);
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
  

 
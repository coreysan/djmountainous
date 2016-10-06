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
  injectTemplates(calm_mixes,     'calm-mixes-tmpl');
  injectTemplates(intense_mixes,  'intense-mixes-tmpl'); 

  //set up the audio players
  initCirclePlayers(calm_mixes);
  initCirclePlayers(intense_mixes);

  function injectTemplates(data, mix_template_id){

    var html = MyApp.templates.mixes(data);
    // var html = Handlebars.templates.mixes(data);
    $('#'+mix_template_id).html(html);
   
    html = MyApp.templates.jplayers(data);
    // html = Handlebars.templates.jplayers(data);
    $('#jplayers-tmpl').html(html);
  } 

  function initCirclePlayers(mixes){
    // mixes.forEach(function(mix){
    //   new CirclePlayer(
    //     "#jquery_jplayer_"+mix.slug,
    //     {
    //       mp3: MIX_PATH+mix.slug+".mp3",
    //       m4a: MIX_PATH+mix.slug+".m4a"
    //     }, {
    //       cssSelectorAncestor: "#cp_container_"+mix.slug
    //     }
    //   );
    // });
  }

});
  
// debugger;


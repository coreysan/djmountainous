$(function  () {

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
  

 
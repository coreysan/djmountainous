$(function  () {

  var MIX_PATH = "http://djmountainous.com/mixes/";

  var data = {
    mixes: [
      //new mix goes here
      {
        title: "Live @ BirthRave 2016",
        genres: "Bass Funk, Trap, Dub",
        date: "Sept 24, 2016",
        slug: "dj-mountainous-live-birthrave-2016-bass-funk-dub"
      },{
        title: "The Eiger",
        genres: "Tech House",
        date: "Sept 2016",
        slug: "dj-mountainous-va-tech-house"
      },
      {
        title: "Black Tusk",
        genres: "Trap & Dubstep",
        date: "August 2016",
        slug: "dj-mountainous-va-dubtrap"
      },
      {
        title: "Garibaldi",
        genres: "Deep House",
        date: "June 2016",
        slug: "dj-mountainous-va-deep-house-v2"
      },
      
    ]
  };

  //inject handlebars templates with mix data 
  injectTemplates(data); 

  //set up the audio players
  initCirclePlayers(data.mixes);


  function injectTemplates(data){

    var html = Handlebars.templates.mixes(data);
    $('#mixes-tmpl').html(html);
   
    html = Handlebars.templates.jplayers(data);
    $('#jplayers-tmpl').html(html);
  }

  function initCirclePlayers(mixes){
    mixes.forEach(function(mix){
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
  
// debugger;


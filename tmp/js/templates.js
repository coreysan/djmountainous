this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};
this["MyApp"]["templates"]["mixes"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n<section id=\""
    + alias4(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"slug","hash":{},"data":data}) : helper)))
    + "\" class=\"mix audio-player "
    + alias4(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"slug","hash":{},"data":data}) : helper)))
    + "\" data-rating=\""
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data}) : helper)))
    + "\">\n  <h3>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\n\n  <div class=\"row no-gutter\">\n    <div class=\"col-xs-2 intense-only\"></div>\n    <div class=\"col-xs-10\">\n      <div class=\"progress-bar rating-bg\">\n        <div class=\"buffer\">\n        </div>\n        <div class=\"played\">\n        </div>\n      </div> \n    </div>\n  </div>\n  <div class=\"times\">\n    <span class=\"current-time\"></span>\n    <span class=\"divider\">/</span>\n    <span class=\"mix-length\"></span>\n  </div>\n\n  <div class=\"audio-controls\">\n    <div class=\"audio-controls__background\">\n    </div>\n    <div class=\"play-pause\">\n    </div>\n  </div>\n\n  <div class=\"mix__details\"\n    <h5>\n      <div class=\"genres progressive\"> \n        <span class=\"rating\" data-rating=\""
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data}) : helper)))
    + "\">\n          V"
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data}) : helper)))
    + "\n        </span>\n        "
    + alias4(((helper = (helper = helpers.genres || (depth0 != null ? depth0.genres : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"genres","hash":{},"data":data}) : helper)))
    + "\n      </div> \n       <div class=\"date way-subdued\">\n        "
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "\n      </div>\n    </h5>\n    \n    <div class=\"downloads\">\n      <a class=\"download\" href=\"https://djmountainous.com/mixes/dj-mountainous-"
    + alias4(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"slug","hash":{},"data":data}) : helper)))
    + ".mp3\" download>mp3 dl</a>\n    </div>  \n  </div> <!-- .mix__details -->\n\n  <audio id=\"audio-va-tech-house\">\n    <source src=\"https://djmountainous.com/mixes/dj-mountainous-"
    + alias4(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"slug","hash":{},"data":data}) : helper)))
    + ".m4a\" type=\"audio/m4a\">\n    </source>\n    <source src=\"https://djmountainous.com/mixes/dj-mountainous-"
    + alias4(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"slug","hash":{},"data":data}) : helper)))
    + ".mp3\" type=\"audio/mpeg\"></source>\n  </audio>\n</section><!-- .mix -->\n\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.mixes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
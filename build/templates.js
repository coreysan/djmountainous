(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['jplayers'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "  <div id=\"jquery_jplayer_"
    + container.escapeExpression(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"slug","hash":{},"data":data}) : helper)))
    + "\" class=\"cp-jplayer\"></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<!-- The jPlayer div must not be hidden. Keep it at the root of the body element to avoid any such problems. -->\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.mixes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['mixes'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div class=\"col-sm-6 col-xs-12\">\n    <div class=\"mix\">\n      <h3>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\n      <h5>\n        <span class=\"genres progressive\">\n          "
    + alias4(((helper = (helper = helpers.genres || (depth0 != null ? depth0.genres : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"genres","hash":{},"data":data}) : helper)))
    + "\n        </span> \n           \n         <span class=\"date way-subdued\">"
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</span>\n      </h5>\n\n      <div id=\"cp_container_"
    + alias4(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"slug","hash":{},"data":data}) : helper)))
    + "\" class=\"cp-container\">\n        <div class=\"cp-buffer-holder\"> \n          <!-- .cp-gt50 only needed when buffer is > than 50% -->\n          <div class=\"cp-buffer-1\"></div>\n          <div class=\"cp-buffer-2\"></div>\n        </div>\n        <div class=\"cp-progress-holder\"> \n          <!-- .cp-gt50 only needed when progress is > than 50% -->\n          <div class=\"cp-progress-1\"></div>\n          <div class=\"cp-progress-2\"></div>\n        </div>\n        <div class=\"cp-circle-control\"></div>\n        <ul class=\"cp-controls\">\n          <li><a class=\"cp-play\" tabindex=\"1\">play</a></li>\n          <li><a class=\"cp-pause\" style=\"display:none;\" tabindex=\"1\">pause</a></li> \n          <!-- Needs the inline style here, or jQuery.show() uses display:inline instead of display:block -->\n        </ul>\n      </div>\n      <div class=\"downloads\">\n        <a href=\"http://djmountainous.com/mixes/"
    + alias4(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"slug","hash":{},"data":data}) : helper)))
    + ".mp3\">mp3</a>\n        <!-- <br><span class=\"more-subdued\">(Right-click &gt; save as...)</span> -->\n      </div>  \n    </div><!-- .mix -->\n  </div><!-- .col -->\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.mixes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();

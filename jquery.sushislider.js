
/*
jQuery SushiSlider Plugin

http://github.com/johnrees/jquery.sushislider

Authored by @john_rees
Copyright 2012, John Rees

Free for all to use, abuse and improve under the MIT license.
http://www.opensource.org/licenses/mit-license.php

Usage:

  jQuery(function() {
    $('.sushi-slider').sushiSlider({
      debug: true
    });
  });
*/

(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    sushiSlider: function(options) {
      var addButtonEventListeners, addKeyboardNavigation, addMenu, current, log, settings, showNext, showPrevious, slider, total, updateNav,
        _this = this;
      settings = {
        debug: false,
        keyboardNavigation: true,
        showMenu: true,
        transition: 'fade',
        speed: 100
      };
      settings = $.extend(settings, options);
      slider = $(this);
      total = slider.find('> .frame > li').length;
      current = 0;
      log = function(msg) {
        if (settings.debug) {
          return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
        }
      };
      updateNav = function() {
        slider.find('> ol.menu > li').removeClass('active');
        return slider.find("> ol.menu > li:eq(" + current + ")").addClass('active');
      };
      showNext = function() {
        log("next");
        return slider.stop().find("> .frame li:eq(" + current + ")").fadeOut(settings.speed, function() {
          current = current < (total - 1) ? current + 1 : 0;
          slider.find("> .frame li:eq(" + current + ")").fadeIn(settings.speed);
          return updateNav();
        });
      };
      showPrevious = function() {
        log("previous");
        return slider.stop().find("> .frame > li:eq(" + current + ")").fadeOut(settings.speed, function() {
          current = current > 0 ? current - 1 : total - 1;
          slider.find("> .frame > li:eq(" + current + ")").fadeIn(settings.speed);
          return updateNav();
        });
      };
      addMenu = function() {
        var counter, frame, menu, _i, _len, _ref;
        menu = $('<ol class="menu"/>');
        counter = 1;
        _ref = slider.find('> .frame > li');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          frame = _ref[_i];
          menu.append("<li>" + (counter++));
        }
        return slider.append(menu);
      };
      addKeyboardNavigation = function() {
        return $(document).keyup(function(event) {
          log("" + event.which + " pressed");
          switch (event.which) {
            case 39:
              return showNext();
            case 37:
              return showPrevious();
          }
        });
      };
      addButtonEventListeners = function() {
        slider.find('> a.next').click(function(e) {
          e.preventDefault();
          return showNext();
        });
        return slider.find('> a.previous').click(function(e) {
          e.preventDefault();
          return showPrevious();
        });
      };
      return this.each(function() {
        addButtonEventListeners();
        if (settings.keyboardNavigation) addKeyboardNavigation();
        if (settings.showMenu) addMenu();
        slider.find("> .frame > li:gt(0)").hide();
        return slider.find('> ol.menu > li:first').addClass('active');
      });
    }
  });

}).call(this);

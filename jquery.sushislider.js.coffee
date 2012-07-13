###
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

###

$ = jQuery
$.fn.extend
  sushiSlider: (options) ->
    # Default settings
    settings =
      debug: false
      keyboardNavigation: true
      showMenu: true
      transition: 'fade'
      speed: 100
      # delay: 1000

    settings = $.extend settings, options

    slider = $(this)
    total = slider.find('> .frame > li').length
    current = 0

    # Simple logger.
    log = (msg) ->
      console?.log msg if settings.debug

    updateNav = ->
      slider.find('> ol.menu > li').removeClass('active')
      slider.find("> ol.menu > li:eq(#{current})").addClass('active')

    showNext = =>
      log "next"
      slider.stop().find("> .frame li:eq(#{current})").fadeOut settings.speed, ->
        current = if current < (total-1) then current+1 else 0
        slider.find("> .frame li:eq(#{current})").fadeIn(settings.speed)
        updateNav()

    showPrevious = =>
      log "previous"
      slider.stop().find("> .frame > li:eq(#{current})").fadeOut settings.speed, ->
        current = if current > 0 then current-1 else (total-1)
        slider.find("> .frame > li:eq(#{current})").fadeIn(settings.speed)
        updateNav()

    addMenu = ->
      menu = $('<ol class="menu"/>')
      counter = 1
      for frame in slider.find('> .frame > li')
        menu.append("<li>#{counter++}")
      slider.append menu

    addKeyboardNavigation = ->
      $(document).keyup (event) ->
        log "#{event.which} pressed"
        switch event.which
          when 39 then showNext()
          when 37 then showPrevious()

    addButtonEventListeners = ->
      slider.find('> a.next').click (e) ->
        e.preventDefault()
        showNext()

      slider.find('> a.previous').click (e) ->
        e.preventDefault()
        showPrevious()

    return @each ()->
      addButtonEventListeners()
      addKeyboardNavigation() if settings.keyboardNavigation
      addMenu() if settings.showMenu

      slider.find("> .frame > li:gt(0)").hide()
      slider.find('> ol.menu > li:first').addClass('active')

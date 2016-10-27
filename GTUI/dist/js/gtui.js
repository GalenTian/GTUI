/* Packaged at 14:36 Oct 27, 2016. Version: None */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// Core
	__webpack_require__(2);

	// Util-ish widgets
	__webpack_require__(3);

	// Widget Base
	__webpack_require__(4);
	__webpack_require__(5);

	// Widgets
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);

	// Angular
	__webpack_require__(13);

/***/ },
/* 2 */
/***/ function(module, exports) {

	(function ($) {
	    var _gtui = {};

	    var getClosestEementByNodeName = function (element, nodeName) {
	        if (!(element instanceof jQuery)) {
	            element = $(element);
	        }

	        if (element[0].nodeName === nodeName.toUpperCase()) {
	            return element;
	        }
	        else {
	            return element.closest(nodeName);
	        }
	    };

	    $.extend(_gtui, {
	        utils: {
	            getClosestEementByNodeName: getClosestEementByNodeName,
	            KeyCode: {
	                BACKSPACE: 8,
	                TAB: 9,

	                ENTER: 13,

	                ESC: 27,

	                SPACE: 32,
	                PAGE_UP: 33,
	                PAGE_DOWN: 34,
	                END: 35,
	                HOME: 36,
	                LEFT: 37,
	                UP: 38,
	                RIGHT: 39,
	                DOWN: 40,

	                DELETE: 46,

	                NUM_0: 48,
	                NUM_1: 49,
	                NUM_2: 50,
	                NUM_3: 51,
	                NUM_4: 52,
	                NUM_5: 53,
	                NUM_6: 54,
	                NUM_7: 55,
	                NUM_8: 56,
	                NUM_9: 57,

	                KEY_A: 65,
	                KEY_B: 66,
	                KEY_C: 67,
	                KEY_D: 68,
	                KEY_E: 69,
	                KEY_F: 70,
	                KEY_G: 71,
	                KEY_H: 72,
	                KEY_I: 73,
	                KEY_J: 74,
	                KEY_K: 75,
	                KEY_L: 76,
	                KEY_M: 77,
	                KEY_N: 78,
	                KEY_O: 79,
	                KEY_P: 80,
	                KEY_Q: 81,
	                KEY_R: 82,
	                KEY_S: 83,
	                KEY_T: 84,
	                KEY_U: 85,
	                KEY_V: 86,
	                KEY_W: 87,
	                KEY_X: 88,
	                KEY_Y: 89,
	                KEY_Z: 90,

	                SMALL_KEY_BOARD_0: 96,
	                SMALL_KEY_BOARD_1: 97,
	                SMALL_KEY_BOARD_2: 98,
	                SMALL_KEY_BOARD_3: 99,
	                SMALL_KEY_BOARD_4: 100,
	                SMALL_KEY_BOARD_5: 101,
	                SMALL_KEY_BOARD_6: 102,
	                SMALL_KEY_BOARD_7: 103,
	                SMALL_KEY_BOARD_8: 104,
	                SMALL_KEY_BOARD_9: 105,
	                SMALL_KEY_BOARD_MUL: 106,
	                SMALL_KEY_BOARD_ADD: 107,

	                SMALL_KEY_BOARD_SUB: 109,
	                SMALL_KEY_BOARD_DOT: 110,
	                SMALL_KEY_BOARD_DEV: 111,

	                SEMICOLON: 186,
	                KEY_ADD: 187,
	                COMMA: 188,
	                KEY_SUB: 189,
	                DOT: 190,
	                BEVEL: 191,
	                KEY_DRIP: 192,

	                LEFT_BRACKETS: 219,
	                TURN_BEVEL: 220,
	                RIGHT_BRACKETS: 221,
	                UP_COMMA: 222
	            }
	        }
	    });

	    window.gtui = _gtui;
	})(jQuery);

/***/ },
/* 3 */
/***/ function(module, exports) {

	(function ($) {
	    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
	        toBind = ('onwheel' in document || document.documentMode >= 9) ?
	                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
	        slice = Array.prototype.slice,
	        nullLowestDeltaTimeout, lowestDelta;

	    if ($.event.fixHooks) {
	        for (var i = toFix.length; i;) {
	            $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
	        }
	    }

	    var special = $.event.special.mousewheel = {
	        setup: function () {
	            if (this.addEventListener) {
	                for (var i = toBind.length; i;) {
	                    this.addEventListener(toBind[--i], handler, false);
	                }
	            } else {
	                this.onmousewheel = handler;
	            }
	            // Store the line height and page height for this particular element
	            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
	            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
	        },

	        teardown: function () {
	            if (this.removeEventListener) {
	                for (var i = toBind.length; i;) {
	                    this.removeEventListener(toBind[--i], handler, false);
	                }
	            } else {
	                this.onmousewheel = null;
	            }
	            // Clean up the data we added to the element
	            $.removeData(this, 'mousewheel-line-height');
	            $.removeData(this, 'mousewheel-page-height');
	        },

	        getLineHeight: function (elem) {
	            var $elem = $(elem),
	                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
	            if (!$parent.length) {
	                $parent = $('body');
	            }
	            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
	        },

	        getPageHeight: function (elem) {
	            return $(elem).height();
	        },

	        settings: {
	            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
	            normalizeOffset: true  // calls getBoundingClientRect for each event
	        }
	    };

	    $.fn.extend({
	        mousewheel: function (fn) {
	            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
	        },

	        unmousewheel: function (fn) {
	            return this.unbind('mousewheel', fn);
	        }
	    });


	    function handler(event) {
	        var orgEvent = event || window.event,
	            args = slice.call(arguments, 1),
	            delta = 0,
	            deltaX = 0,
	            deltaY = 0,
	            absDelta = 0,
	            offsetX = 0,
	            offsetY = 0;
	        event = $.event.fix(orgEvent);
	        event.type = 'mousewheel';

	        // Old school scrollwheel delta
	        if ('detail' in orgEvent) { deltaY = orgEvent.detail * -1; }
	        if ('wheelDelta' in orgEvent) { deltaY = orgEvent.wheelDelta; }
	        if ('wheelDeltaY' in orgEvent) { deltaY = orgEvent.wheelDeltaY; }
	        if ('wheelDeltaX' in orgEvent) { deltaX = orgEvent.wheelDeltaX * -1; }

	        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
	        if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
	            deltaX = deltaY * -1;
	            deltaY = 0;
	        }

	        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
	        delta = deltaY === 0 ? deltaX : deltaY;

	        // New school wheel delta (wheel event)
	        if ('deltaY' in orgEvent) {
	            deltaY = orgEvent.deltaY * -1;
	            delta = deltaY;
	        }
	        if ('deltaX' in orgEvent) {
	            deltaX = orgEvent.deltaX;
	            if (deltaY === 0) { delta = deltaX * -1; }
	        }

	        // No change actually happened, no reason to go any further
	        if (deltaY === 0 && deltaX === 0) { return; }

	        // Need to convert lines and pages to pixels if we aren't already in pixels
	        // There are three delta modes:
	        //   * deltaMode 0 is by pixels, nothing to do
	        //   * deltaMode 1 is by lines
	        //   * deltaMode 2 is by pages
	        if (orgEvent.deltaMode === 1) {
	            var lineHeight = $.data(this, 'mousewheel-line-height');
	            delta *= lineHeight;
	            deltaY *= lineHeight;
	            deltaX *= lineHeight;
	        } else if (orgEvent.deltaMode === 2) {
	            var pageHeight = $.data(this, 'mousewheel-page-height');
	            delta *= pageHeight;
	            deltaY *= pageHeight;
	            deltaX *= pageHeight;
	        }

	        // Store lowest absolute delta to normalize the delta values
	        absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

	        if (!lowestDelta || absDelta < lowestDelta) {
	            lowestDelta = absDelta;

	            // Adjust older deltas if necessary
	            if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
	                lowestDelta /= 40;
	            }
	        }

	        // Adjust older deltas if necessary
	        if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
	            // Divide all the things by 40!
	            delta /= 40;
	            deltaX /= 40;
	            deltaY /= 40;
	        }

	        // Get a whole, normalized value for the deltas
	        delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
	        deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
	        deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);

	        // Normalise offsetX and offsetY properties
	        if (special.settings.normalizeOffset && this.getBoundingClientRect) {
	            var boundingRect = this.getBoundingClientRect();
	            offsetX = event.clientX - boundingRect.left;
	            offsetY = event.clientY - boundingRect.top;
	        }

	        // Add information to the event object
	        event.deltaX = deltaX;
	        event.deltaY = deltaY;
	        event.deltaFactor = lowestDelta;
	        event.offsetX = offsetX;
	        event.offsetY = offsetY;
	        // Go ahead and set deltaMode to 0 since we converted to pixels
	        // Although this is a little odd since we overwrite the deltaX/Y
	        // properties with normalized deltas.
	        event.deltaMode = 0;

	        // Add event and delta to the front of the arguments
	        args.unshift(event, delta, deltaX, deltaY);

	        // Clearout lowestDelta after sometime to better
	        // handle multiple device types that give different
	        // a different lowestDelta
	        // Ex: trackpad = 3 and mouse wheel = 120
	        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
	        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

	        return ($.event.dispatch || $.event.handle).apply(this, args);
	    }

	    function nullLowestDelta() {
	        lowestDelta = null;
	    }

	    function shouldAdjustOldDeltas(orgEvent, absDelta) {
	        // If this is an older event and the delta is divisable by 120,
	        // then we are assuming that the browser is treating this as an
	        // older mouse wheel event and that we should divide the deltas
	        // by 40 to try and get a more usable deltaFactor.
	        // Side note, this actually impacts the reported scroll distance
	        // in older browsers and can cause scrolling to be slower than native.
	        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
	        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
	    }
	})(jQuery);

/***/ },
/* 4 */
/***/ function(module, exports) {

	(function ($) {

	    $.widget("gtui.tabbase", {
	        options: {

	        },
	        selectPrev: function () {
	            var prev = this._getPrevLi(this._currentSelectedItem);
	            this._changeSelectedItem(prev);
	        },
	        selectNext: function () {
	            var next = this._getNextLi(this._currentSelectedItem);
	            this._changeSelectedItem(next);
	        },
	        selectFirst: function () {
	            this._changeSelectedItem(this._firstLi[0]);
	        },
	        selectLast: function () {
	            this._changeSelectedItem(this._lastLi[0]);
	        },

	        _create: function () {
	            this._dealWithUl();
	            this._dealWithLi();
	            this._dealWithContent();
	        },
	        _setOption: function (key, value) {
	            var _oldValue = this.options[key],
	                _doIt = this._setExtendOption.apply(this, arguments);

	            if (_doIt) {
	                $.Widget.prototype._setOption.apply(this, arguments);
	                this._optionChanged(key, { element: this.element, newValue: value, oldValue: _oldValue });
	            }
	        },
	        _dealWithContent: function () {
	            this.element.off('keydown' + this.eventNamespace)
	                .on('keydown' + this.eventNamespace, 'div[role="tabpanel"]', this, function (e) {
	                    switch (e.keyCode) {
	                        case gtui.utils.KeyCode.UP:
	                        case gtui.utils.KeyCode.LEFT:
	                            if (e.ctrlKey) {
	                                e.preventDefault();

	                                e.data._currentSelectedItem.focus();
	                            }
	                            break;
	                        case gtui.utils.KeyCode.PAGE_UP:
	                            if (e.ctrlKey) {
	                                e.preventDefault();

	                                e.data.selectPrev();
	                            }
	                            break;
	                        case gtui.utils.KeyCode.PAGE_DOWN:
	                            if (e.ctrlKey) {
	                                e.preventDefault();

	                                e.data.selectNext();
	                            }
	                            break;
	                    }
	                });
	        },
	        _dealWithLi: function () {
	            this._li = this._ul.find('li[aria-controls]');

	            this._currentSelectedItem = this._li.filter('.select:not([aria-controls^="javascript:"])');
	            if (this._currentSelectedItem.length > 1) this._currentSelectedItem = $(this._currentSelectedItem[this._currentSelectedItem.length - 1]);
	            this._currentSelectedContent = $('#' + this._currentSelectedItem.attr('aria-controls')).attr('aria-hidden', 'false');
	            this._firstLi = this._li.filter(':first');
	            this._lastLi = this._li.filter(':last');
	        },
	        _dealWithUl: function () {
	            var _self = this,
	                _$el = _self.element,
	                _$ul = _self._ul = _$el.children('ul');

	            _$ul.off('click' + _self.eventNamespace)
	                .on('click' + _self.eventNamespace, 'li:not(li:has(ul>li))', _self, function (e) {
	                    if ($(this).attr('aria-selected') === 'true') return;

	                    var _tb = e.data;

	                    _tb._changeSelectedItem(this);
	                })
	                .off('keydown' + _self.eventNamespace)
	                .on('keydown' + _self.eventNamespace, 'li:not(li:has(ul))', _self, function (e) {
	                    switch (e.keyCode) {
	                        case gtui.utils.KeyCode.UP:
	                        case gtui.utils.KeyCode.LEFT:
	                            e.preventDefault();

	                            e.data.selectPrev();
	                            break;
	                        case gtui.utils.KeyCode.DOWN:
	                        case gtui.utils.KeyCode.RIGHT:
	                            e.preventDefault();

	                            e.data.selectNext();
	                            break;
	                        case gtui.utils.KeyCode.HOME:
	                            e.preventDefault();

	                            e.data.selectFirst();
	                            break;
	                        case gtui.utils.KeyCode.END:
	                            e.preventDefault();

	                            e.data.selectLast();
	                            break;
	                    }
	                });
	        },
	        _changeSelectedItem: function (el, old, autoChange) {
	            if (this._currentSelectedItem[0] === el) return;

	            var _oldItem = old ? old : this._currentSelectedItem,
	                _passChange = this._selectedItemChanging(_oldItem, el);

	            if (!_passChange) return;

	            this._unselectItem(_oldItem);
	            this._selectItem(el);

	            if (!autoChange) {
	                this._currentSelectedItem.focus();
	            }

	            this._selectedItemChanged(_oldItem, el);
	        },
	        _selectItem: function (el) {
	            var _$el = (this._currentSelectedItem = $(el).addClass('select')
	                .attr({
	                    'aria-selected': 'true',
	                    'tabindex': 0
	                }));

	            _$el.parent().closest('li').addClass('select')
	                .attr({
	                    'aria-selected': 'true',
	                    'tabindex': 0
	                });

	            this._currentSelectedContent = $('#' + _$el.attr('aria-controls')).show().attr('aria-hidden', 'false');//控制显隐添加属性
	        },
	        _unselectItem: function (el) {
	            if (!el || el.length === 0) return;

	            var _$el = $(el).removeClass('select').attr({
	                'aria-selected': 'false',
	                'tabindex': -1
	            });
	            _$el.parent().closest('li').removeClass('select').attr({
	                'aria-selected': 'false',
	                'tabindex': -1
	            });

	            $('#' + _$el.attr('aria-controls')).hide().attr('aria-hidden', 'true');
	        },
	        _getPrevLi: function (li) {
	            var index = this._li.index(li),
	                prev = this._li[index - 1];
	            if (!prev) {
	                prev = this._lastLi[0];
	            }
	            return prev.getAttribute('aria-controls') ? prev : this._getPrevLi(prev);
	        },
	        _getNextLi: function (li) {
	            var index = this._li.index(li),
	                next = this._li[index + 1];

	            if (!next) {
	                next = this._firstLi[0];
	            }
	            return next.getAttribute('aria-controls') ? next : this._getNextLi(next);

	        },
	        _selectedItemChanging: function (oldItem, newItem) {
	            return true;
	        },
	        _selectedItemChanged: function (oldItem, newItem) {

	        },
	        _setExtendOption: function (key, value) {
	            return true;
	        },
	        _optionChanged: function (key, data) {

	        }
	    });
	}(jQuery));

/***/ },
/* 5 */
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: transition.js v3.3.5
	 * http://getbootstrap.com/javascript/#transitions
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	    'use strict';

	    // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
	    // ============================================================

	    function transitionEnd() {
	        var el = document.createElement('bootstrap')

	        var transEndEventNames = {
	            WebkitTransition: 'webkitTransitionEnd',
	            MozTransition: 'transitionend',
	            OTransition: 'oTransitionEnd otransitionend',
	            transition: 'transitionend'
	        }

	        for (var name in transEndEventNames) {
	            if (el.style[name] !== undefined) {
	                return { end: transEndEventNames[name] }
	            }
	        }

	        return false // explicit for ie8 (  ._.)
	    }

	    // http://blog.alexmaccaw.com/css-transitions
	    $.fn.emulateTransitionEnd = function (duration) {
	        var called = false
	        var $el = this
	        $(this).one('bsTransitionEnd', function () { called = true })
	        var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
	        setTimeout(callback, duration)
	        return this
	    }

	    $(function () {
	        $.support.transition = transitionEnd()

	        if (!$.support.transition) return

	        $.event.special.bsTransitionEnd = {
	            bindType: $.support.transition.end,
	            delegateType: $.support.transition.end,
	            handle: function (e) {
	                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
	            }
	        }
	    })

	}(jQuery);


/***/ },
/* 6 */
/***/ function(module, exports) {

	(function ($) {
	    function UTCDate() {
	        return new Date(Date.UTC.apply(Date, arguments));
	    }
	    function UTCToday() {
	        var today = new Date();
	        return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
	    }
	    function isUTCEquals(date1, date2) {
	        return (
				date1.getUTCFullYear() === date2.getUTCFullYear() &&
				date1.getUTCMonth() === date2.getUTCMonth() &&
				date1.getUTCDate() === date2.getUTCDate()
			);
	    }
	    function alias(method) {
	        return function () {
	            return this[method].apply(this, arguments);
	        };
	    }
	    function isValidDate(d) {
	        return d && !isNaN(d.getTime());
	    }

	    var DateArray = (function () {
	        var extras = {
	            get: function (i) {
	                return this.slice(i)[0];
	            },
	            contains: function (d) {
	                // Array.indexOf is not cross-browser;
	                // $.inArray doesn't work with Dates
	                var val = d && d.valueOf();
	                for (var i = 0, l = this.length; i < l; i++)
	                    if (this[i].valueOf() === val)
	                        return i;
	                return -1;
	            },
	            remove: function (i) {
	                this.splice(i, 1);
	            },
	            replace: function (new_array) {
	                if (!new_array)
	                    return;
	                if (!$.isArray(new_array))
	                    new_array = [new_array];
	                this.clear();
	                this.push.apply(this, new_array);
	            },
	            clear: function () {
	                this.length = 0;
	            },
	            copy: function () {
	                var a = new DateArray();
	                a.replace(this);
	                return a;
	            }
	        };

	        return function () {
	            var a = [];
	            a.push.apply(a, arguments);
	            $.extend(a, extras);
	            return a;
	        };
	    })();


	    // Picker object

	    var Datepicker = function (element, options) {
	        $(element).data('datepicker', this);
	        this._process_options(options);

	        this.dates = new DateArray();
	        this.viewDate = this.o.defaultViewDate;
	        this.focusDate = null;

	        this.element = $(element);
	        this.isInput = this.element.is('input');
	        this.inputField = this.isInput ? this.element : this.element.find('input');
	        this.component = this.element.hasClass('date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
	        this.hasInput = this.component && this.inputField.length;
	        if (this.component && this.component.length === 0)
	            this.component = false;
	        this.isInline = !this.component && this.element.is('div');

	        this.picker = $(DPGlobal.template);

	        // Checking templates and inserting
	        if (this._check_template(this.o.templates.leftArrow)) {
	            this.picker.find('.prev').html(this.o.templates.leftArrow);
	        }
	        if (this._check_template(this.o.templates.rightArrow)) {
	            this.picker.find('.next').html(this.o.templates.rightArrow);
	        }

	        this._buildEvents();
	        this._attachEvents();

	        if (this.isInline) {
	            this.picker.addClass('datepicker-inline').appendTo(this.element);
	        }
	        else {
	            this.picker.addClass('datepicker-dropdown dropdown-menu');
	        }

	        if (this.o.rtl) {
	            this.picker.addClass('datepicker-rtl');
	        }

	        this.viewMode = this.o.startView;

	        if (this.o.calendarWeeks)
	            this.picker.find('thead .datepicker-title, tfoot .today, tfoot .clear')
							.attr('colspan', function (i, val) {
							    return parseInt(val) + 1;
							});

	        this._allow_update = false;

	        this.setStartDate(this._o.startDate);
	        this.setEndDate(this._o.endDate);
	        this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);
	        this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted);
	        this.setDatesDisabled(this.o.datesDisabled);

	        this.fillDow();
	        this.fillMonths();

	        this._allow_update = true;

	        this.update();
	        this.showMode();

	        if (this.isInline) {
	            this.show();
	        }
	    };

	    Datepicker.prototype = {
	        constructor: Datepicker,

	        _resolveViewName: function (view, default_value) {
	            if (view === 0 || view === 'days' || view === 'month') {
	                return 0;
	            }
	            if (view === 1 || view === 'months' || view === 'year') {
	                return 1;
	            }
	            if (view === 2 || view === 'years' || view === 'decade') {
	                return 2;
	            }
	            if (view === 3 || view === 'decades' || view === 'century') {
	                return 3;
	            }
	            if (view === 4 || view === 'centuries' || view === 'millennium') {
	                return 4;
	            }
	            return default_value === undefined ? false : default_value;
	        },

	        _check_template: function (tmp) {
	            try {
	                // If empty
	                if (tmp === undefined || tmp === "") {
	                    return false;
	                }
	                // If no html, everything ok
	                if ((tmp.match(/[<>]/g) || []).length <= 0) {
	                    return true;
	                }
	                // Checking if html is fine
	                var jDom = $(tmp);
	                return jDom.length > 0;
	            }
	            catch (ex) {
	                return false;
	            }
	        },

	        _process_options: function (opts) {
	            // Store raw options for reference
	            this._o = $.extend({}, this._o, opts);
	            // Processed options
	            var o = this.o = $.extend({}, this._o);

	            // Check if "de-DE" style date is available, if not language should
	            // fallback to 2 letter code eg "de"
	            var lang = o.language;
	            if (!dates[lang]) {
	                lang = lang.split('-')[0];
	                if (!dates[lang])
	                    lang = defaults.language;
	            }
	            o.language = lang;

	            // Retrieve view index from any aliases
	            o.startView = this._resolveViewName(o.startView, 0);
	            o.minViewMode = this._resolveViewName(o.minViewMode, 0);
	            o.maxViewMode = this._resolveViewName(o.maxViewMode, 4);

	            // Check that the start view is between min and max
	            o.startView = Math.min(o.startView, o.maxViewMode);
	            o.startView = Math.max(o.startView, o.minViewMode);

	            // true, false, or Number > 0
	            if (o.multidate !== true) {
	                o.multidate = Number(o.multidate) || false;
	                if (o.multidate !== false)
	                    o.multidate = Math.max(0, o.multidate);
	            }
	            o.multidateSeparator = String(o.multidateSeparator);

	            o.weekStart %= 7;
	            o.weekEnd = (o.weekStart + 6) % 7;

	            var format = DPGlobal.parseFormat(o.format);
	            if (o.startDate !== -Infinity) {
	                if (!!o.startDate) {
	                    if (o.startDate instanceof Date)
	                        o.startDate = this._local_to_utc(this._zero_time(o.startDate));
	                    else
	                        o.startDate = DPGlobal.parseDate(o.startDate, format, o.language, o.assumeNearbyYear);
	                }
	                else {
	                    o.startDate = -Infinity;
	                }
	            }
	            if (o.endDate !== Infinity) {
	                if (!!o.endDate) {
	                    if (o.endDate instanceof Date)
	                        o.endDate = this._local_to_utc(this._zero_time(o.endDate));
	                    else
	                        o.endDate = DPGlobal.parseDate(o.endDate, format, o.language, o.assumeNearbyYear);
	                }
	                else {
	                    o.endDate = Infinity;
	                }
	            }

	            o.daysOfWeekDisabled = o.daysOfWeekDisabled || [];
	            if (!$.isArray(o.daysOfWeekDisabled))
	                o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
	            o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function (d) {
	                return parseInt(d, 10);
	            });

	            o.daysOfWeekHighlighted = o.daysOfWeekHighlighted || [];
	            if (!$.isArray(o.daysOfWeekHighlighted))
	                o.daysOfWeekHighlighted = o.daysOfWeekHighlighted.split(/[,\s]*/);
	            o.daysOfWeekHighlighted = $.map(o.daysOfWeekHighlighted, function (d) {
	                return parseInt(d, 10);
	            });

	            o.datesDisabled = o.datesDisabled || [];
	            if (!$.isArray(o.datesDisabled)) {
	                o.datesDisabled = [
						o.datesDisabled
	                ];
	            }
	            o.datesDisabled = $.map(o.datesDisabled, function (d) {
	                return DPGlobal.parseDate(d, format, o.language, o.assumeNearbyYear);
	            });

	            var plc = String(o.orientation).toLowerCase().split(/\s+/g),
					_plc = o.orientation.toLowerCase();
	            plc = $.grep(plc, function (word) {
	                return /^auto|left|right|top|bottom$/.test(word);
	            });
	            o.orientation = { x: 'auto', y: 'auto' };
	            if (!_plc || _plc === 'auto')
	                ; // no action
	            else if (plc.length === 1) {
	                switch (plc[0]) {
	                    case 'top':
	                    case 'bottom':
	                        o.orientation.y = plc[0];
	                        break;
	                    case 'left':
	                    case 'right':
	                        o.orientation.x = plc[0];
	                        break;
	                }
	            }
	            else {
	                _plc = $.grep(plc, function (word) {
	                    return /^left|right$/.test(word);
	                });
	                o.orientation.x = _plc[0] || 'auto';

	                _plc = $.grep(plc, function (word) {
	                    return /^top|bottom$/.test(word);
	                });
	                o.orientation.y = _plc[0] || 'auto';
	            }
	            if (o.defaultViewDate) {
	                var year = o.defaultViewDate.year || new Date().getFullYear();
	                var month = o.defaultViewDate.month || 0;
	                var day = o.defaultViewDate.day || 1;
	                o.defaultViewDate = UTCDate(year, month, day);
	            } else {
	                o.defaultViewDate = UTCToday();
	            }
	        },
	        _events: [],
	        _secondaryEvents: [],
	        _applyEvents: function (evs) {
	            for (var i = 0, el, ch, ev; i < evs.length; i++) {
	                el = evs[i][0];
	                if (evs[i].length === 2) {
	                    ch = undefined;
	                    ev = evs[i][1];
	                }
	                else if (evs[i].length === 3) {
	                    ch = evs[i][1];
	                    ev = evs[i][2];
	                }
	                el.on(ev, ch);
	            }
	        },
	        _unapplyEvents: function (evs) {
	            for (var i = 0, el, ev, ch; i < evs.length; i++) {
	                el = evs[i][0];
	                if (evs[i].length === 2) {
	                    ch = undefined;
	                    ev = evs[i][1];
	                }
	                else if (evs[i].length === 3) {
	                    ch = evs[i][1];
	                    ev = evs[i][2];
	                }
	                el.off(ev, ch);
	            }
	        },
	        _buildEvents: function () {
	            var events = {
	                keyup: $.proxy(function (e) {
	                    if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
	                        this.update();
	                }, this),
	                keydown: $.proxy(this.keydown, this),
	                paste: $.proxy(this.paste, this)
	            };

	            if (this.o.showOnFocus === true) {
	                events.focus = $.proxy(this.show, this);
	            }

	            if (this.isInput) { // single input
	                this._events = [
	                    [this.element, events]
	                ];
	            }
	            else if (this.component && this.hasInput) { // component: input + button
	                this._events = [
	                    // For components that are not readonly, allow keyboard nav
	                    [this.inputField, events],
	                    [this.component, {
	                        click: $.proxy(this.show, this)
	                    }]
	                ];
	            }
	            else {
	                this._events = [
						[this.element, {
						    click: $.proxy(this.show, this),
						    keydown: $.proxy(this.keydown, this)
						}]
	                ];
	            }
	            this._events.push(
					// Component: listen for blur on element descendants
					[this.element, '*', {
					    blur: $.proxy(function (e) {
					        this._focused_from = e.target;
					    }, this)
					}],
					// Input: listen for blur on element
					[this.element, {
					    blur: $.proxy(function (e) {
					        this._focused_from = e.target;
					    }, this)
					}]
				);

	            if (this.o.immediateUpdates) {
	                // Trigger input updates immediately on changed year/month
	                this._events.push([this.element, {
	                    'changeYear changeMonth': $.proxy(function (e) {
	                        this.update(e.date);
	                    }, this)
	                }]);
	            }

	            this._secondaryEvents = [
					[this.picker, {
					    click: $.proxy(this.click, this)
					}],
					[$(window), {
					    resize: $.proxy(this.place, this)
					}],
					[$(document), {
					    mousedown: $.proxy(function (e) {
					        // Clicked outside the datepicker, hide it
					        if (!(
								this.element.is(e.target) ||
								this.element.find(e.target).length ||
								this.picker.is(e.target) ||
								this.picker.find(e.target).length ||
								this.isInline
							)) {
					            this.hide();
					        }
					    }, this)
					}]
	            ];
	        },
	        _attachEvents: function () {
	            this._detachEvents();
	            this._applyEvents(this._events);
	        },
	        _detachEvents: function () {
	            this._unapplyEvents(this._events);
	        },
	        _attachSecondaryEvents: function () {
	            this._detachSecondaryEvents();
	            this._applyEvents(this._secondaryEvents);
	        },
	        _detachSecondaryEvents: function () {
	            this._unapplyEvents(this._secondaryEvents);
	        },
	        _trigger: function (event, altdate) {
	            var date = altdate || this.dates.get(-1),
					local_date = this._utc_to_local(date);

	            this.element.trigger({
	                type: event,
	                date: local_date,
	                dates: $.map(this.dates, this._utc_to_local),
	                format: $.proxy(function (ix, format) {
	                    if (arguments.length === 0) {
	                        ix = this.dates.length - 1;
	                        format = this.o.format;
	                    }
	                    else if (typeof ix === 'string') {
	                        format = ix;
	                        ix = this.dates.length - 1;
	                    }
	                    format = format || this.o.format;
	                    var date = this.dates.get(ix);
	                    return DPGlobal.formatDate(date, format, this.o.language);
	                }, this)
	            });
	        },

	        show: function () {
	            if (this.inputField.prop('disabled') || (this.inputField.prop('readonly') && this.o.enableOnReadonly === false))
	                return;
	            if (!this.isInline)
	                this.picker.appendTo(this.o.container);
	            this.place();
	            this.picker.show();
	            this._attachSecondaryEvents();
	            this._trigger('show');
	            if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && this.o.disableTouchKeyboard) {
	                $(this.element).blur();
	            }
	            return this;
	        },

	        hide: function () {
	            if (this.isInline || !this.picker.is(':visible'))
	                return this;
	            this.focusDate = null;
	            this.picker.hide().detach();
	            this._detachSecondaryEvents();
	            this.viewMode = this.o.startView;
	            this.showMode();

	            if (this.o.forceParse && this.inputField.val())
	                this.setValue();
	            this._trigger('hide');
	            return this;
	        },

	        destroy: function () {
	            this.hide();
	            this._detachEvents();
	            this._detachSecondaryEvents();
	            this.picker.remove();
	            delete this.element.data().datepicker;
	            if (!this.isInput) {
	                delete this.element.data().date;
	            }
	            return this;
	        },

	        paste: function (evt) {
	            var dateString;
	            if (evt.originalEvent.clipboardData && evt.originalEvent.clipboardData.types
					&& $.inArray('text/plain', evt.originalEvent.clipboardData.types) !== -1) {
	                dateString = evt.originalEvent.clipboardData.getData('text/plain');
	            }
	            else if (window.clipboardData) {
	                dateString = window.clipboardData.getData('Text');
	            }
	            else {
	                return;
	            }
	            this.setDate(dateString);
	            this.update();
	            evt.preventDefault();
	        },

	        _utc_to_local: function (utc) {
	            return utc && new Date(utc.getTime() + (utc.getTimezoneOffset() * 60000));
	        },
	        _local_to_utc: function (local) {
	            return local && new Date(local.getTime() - (local.getTimezoneOffset() * 60000));
	        },
	        _zero_time: function (local) {
	            return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
	        },
	        _zero_utc_time: function (utc) {
	            return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
	        },

	        getDates: function () {
	            return $.map(this.dates, this._utc_to_local);
	        },

	        getUTCDates: function () {
	            return $.map(this.dates, function (d) {
	                return new Date(d);
	            });
	        },

	        getDate: function () {
	            return this._utc_to_local(this.getUTCDate());
	        },

	        getUTCDate: function () {
	            var selected_date = this.dates.get(-1);
	            if (typeof selected_date !== 'undefined') {
	                return new Date(selected_date);
	            } else {
	                return null;
	            }
	        },

	        clearDates: function () {
	            if (this.inputField) {
	                this.inputField.val('');
	            }

	            this.update();
	            this._trigger('changeDate');

	            if (this.o.autoclose) {
	                this.hide();
	            }
	        },
	        setDates: function () {
	            var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
	            this.update.apply(this, args);
	            this._trigger('changeDate');
	            this.setValue();
	            return this;
	        },

	        setUTCDates: function () {
	            var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
	            this.update.apply(this, $.map(args, this._utc_to_local));
	            this._trigger('changeDate');
	            this.setValue();
	            return this;
	        },

	        setDate: alias('setDates'),
	        setUTCDate: alias('setUTCDates'),
	        remove: alias('destroy'),

	        setValue: function () {
	            var formatted = this.getFormattedDate();
	            this.inputField.val(formatted);
	            return this;
	        },

	        getFormattedDate: function (format) {
	            if (format === undefined)
	                format = this.o.format;

	            var lang = this.o.language;
	            return $.map(this.dates, function (d) {
	                return DPGlobal.formatDate(d, format, lang);
	            }).join(this.o.multidateSeparator);
	        },

	        getStartDate: function () {
	            return this.o.startDate;
	        },

	        setStartDate: function (startDate) {
	            this._process_options({ startDate: startDate });
	            this.update();
	            this.updateNavArrows();
	            return this;
	        },

	        getEndDate: function () {
	            return this.o.endDate;
	        },

	        setEndDate: function (endDate) {
	            this._process_options({ endDate: endDate });
	            this.update();
	            this.updateNavArrows();
	            return this;
	        },

	        setDaysOfWeekDisabled: function (daysOfWeekDisabled) {
	            this._process_options({ daysOfWeekDisabled: daysOfWeekDisabled });
	            this.update();
	            this.updateNavArrows();
	            return this;
	        },

	        setDaysOfWeekHighlighted: function (daysOfWeekHighlighted) {
	            this._process_options({ daysOfWeekHighlighted: daysOfWeekHighlighted });
	            this.update();
	            return this;
	        },

	        setDatesDisabled: function (datesDisabled) {
	            this._process_options({ datesDisabled: datesDisabled });
	            this.update();
	            this.updateNavArrows();
	        },

	        place: function () {
	            if (this.isInline)
	                return this;
	            var calendarWidth = this.picker.outerWidth(),
					calendarHeight = this.picker.outerHeight(),
					visualPadding = 10,
					container = $(this.o.container),
					windowWidth = container.width(),
					scrollTop = this.o.container === 'body' ? $(document).scrollTop() : container.scrollTop(),
					appendOffset = container.offset();

	            var parentsZindex = [];
	            this.element.parents().each(function () {
	                var itemZIndex = $(this).css('z-index');
	                if (itemZIndex !== 'auto' && itemZIndex !== 0) parentsZindex.push(parseInt(itemZIndex));
	            });
	            var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset;
	            var offset = this.component ? this.component.parent().offset() : this.element.offset();
	            var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
	            var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
	            var left = offset.left - appendOffset.left,
					top = offset.top - appendOffset.top;

	            if (this.o.container !== 'body') {
	                top += scrollTop;
	            }

	            this.picker.removeClass(
					'datepicker-orient-top datepicker-orient-bottom ' +
					'datepicker-orient-right datepicker-orient-left'
				);

	            if (this.o.orientation.x !== 'auto') {
	                this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
	                if (this.o.orientation.x === 'right')
	                    left -= calendarWidth - width;
	            }
	                // auto x orientation is best-placement: if it crosses a window
	                // edge, fudge it sideways
	            else {
	                if (offset.left < 0) {
	                    // component is outside the window on the left side. Move it into visible range
	                    this.picker.addClass('datepicker-orient-left');
	                    left -= offset.left - visualPadding;
	                } else if (left + calendarWidth > windowWidth) {
	                    // the calendar passes the widow right edge. Align it to component right side
	                    this.picker.addClass('datepicker-orient-right');
	                    left += width - calendarWidth;
	                } else {
	                    // Default to left
	                    this.picker.addClass('datepicker-orient-left');
	                }
	            }

	            // auto y orientation is best-situation: top or bottom, no fudging,
	            // decision based on which shows more of the calendar
	            var yorient = this.o.orientation.y,
					top_overflow;
	            if (yorient === 'auto') {
	                top_overflow = -scrollTop + top - calendarHeight;
	                yorient = top_overflow < 0 ? 'bottom' : 'top';
	            }

	            this.picker.addClass('datepicker-orient-' + yorient);
	            if (yorient === 'top')
	                top -= calendarHeight + parseInt(this.picker.css('padding-top'));
	            else
	                top += height;

	            if (this.o.rtl) {
	                var right = windowWidth - (left + width);
	                this.picker.css({
	                    top: top,
	                    right: right,
	                    zIndex: zIndex
	                });
	            } else {
	                this.picker.css({
	                    top: top,
	                    left: left,
	                    zIndex: zIndex
	                });
	            }
	            return this;
	        },

	        _allow_update: true,
	        update: function () {
	            if (!this._allow_update)
	                return this;

	            var oldDates = this.dates.copy(),
					dates = [],
					fromArgs = false;
	            if (arguments.length) {
	                $.each(arguments, $.proxy(function (i, date) {
	                    if (date instanceof Date)
	                        date = this._local_to_utc(date);
	                    dates.push(date);
	                }, this));
	                fromArgs = true;
	            }
	            else {
	                dates = this.isInput
							? this.element.val()
							: this.element.data('date') || this.inputField.val();
	                if (dates && this.o.multidate)
	                    dates = dates.split(this.o.multidateSeparator);
	                else
	                    dates = [dates];
	                delete this.element.data().date;
	            }

	            dates = $.map(dates, $.proxy(function (date) {
	                return DPGlobal.parseDate(date, this.o.format, this.o.language, this.o.assumeNearbyYear);
	            }, this));
	            dates = $.grep(dates, $.proxy(function (date) {
	                return (
						!this.dateWithinRange(date) ||
						!date
					);
	            }, this), true);
	            this.dates.replace(dates);

	            if (this.dates.length)
	                this.viewDate = new Date(this.dates.get(-1));
	            else if (this.viewDate < this.o.startDate)
	                this.viewDate = new Date(this.o.startDate);
	            else if (this.viewDate > this.o.endDate)
	                this.viewDate = new Date(this.o.endDate);
	            else
	                this.viewDate = this.o.defaultViewDate;

	            if (fromArgs) {
	                // setting date by clicking
	                this.setValue();
	            }
	            else if (dates.length) {
	                // setting date by typing
	                if (String(oldDates) !== String(this.dates))
	                    this._trigger('changeDate');
	            }
	            if (!this.dates.length && oldDates.length)
	                this._trigger('clearDate');

	            this.fill();
	            this.element.change();
	            return this;
	        },

	        fillDow: function () {
	            var dowCnt = this.o.weekStart,
					html = '<tr>';
	            if (this.o.calendarWeeks) {
	                this.picker.find('.datepicker-days .datepicker-switch')
						.attr('colspan', function (i, val) {
						    return parseInt(val) + 1;
						});
	                html += '<th class="cw">&#160;</th>';
	            }
	            while (dowCnt < this.o.weekStart + 7) {
	                html += '<th class="dow';
	                if ($.inArray(dowCnt, this.o.daysOfWeekDisabled) > -1)
	                    html += ' disabled';
	                html += '">' + dates[this.o.language].daysMin[(dowCnt++) % 7] + '</th>';
	            }
	            html += '</tr>';
	            this.picker.find('.datepicker-days thead').append(html);
	        },

	        fillMonths: function () {
	            var localDate = this._utc_to_local(this.viewDate);
	            var html = '',
				i = 0;
	            while (i < 12) {
	                var focused = localDate && localDate.getMonth() === i ? ' focused' : '';
	                html += '<span class="month' + focused + '">' + dates[this.o.language].monthsShort[i++] + '</span>';
	            }
	            this.picker.find('.datepicker-months td').html(html);
	        },

	        setRange: function (range) {
	            if (!range || !range.length)
	                delete this.range;
	            else
	                this.range = $.map(range, function (d) {
	                    return d.valueOf();
	                });
	            this.fill();
	        },

	        getClassNames: function (date) {
	            var cls = [],
					year = this.viewDate.getUTCFullYear(),
					month = this.viewDate.getUTCMonth(),
					today = new Date();
	            if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)) {
	                cls.push('old');
	            }
	            else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)) {
	                cls.push('new');
	            }
	            if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
	                cls.push('focused');
	            // Compare internal UTC date with local today, not UTC today
	            if (this.o.todayHighlight &&
					date.getUTCFullYear() === today.getFullYear() &&
					date.getUTCMonth() === today.getMonth() &&
					date.getUTCDate() === today.getDate()) {
	                cls.push('today');
	            }
	            if (this.dates.contains(date) !== -1)
	                cls.push('active');
	            if (!this.dateWithinRange(date)) {
	                cls.push('disabled');
	            }
	            if (this.dateIsDisabled(date)) {
	                cls.push('disabled', 'disabled-date');
	            }
	            if ($.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1) {
	                cls.push('highlighted');
	            }

	            if (this.range) {
	                if (date > this.range[0] && date < this.range[this.range.length - 1]) {
	                    cls.push('range');
	                }
	                if ($.inArray(date.valueOf(), this.range) !== -1) {
	                    cls.push('selected');
	                }
	                if (date.valueOf() === this.range[0]) {
	                    cls.push('range-start');
	                }
	                if (date.valueOf() === this.range[this.range.length - 1]) {
	                    cls.push('range-end');
	                }
	            }
	            return cls;
	        },

	        _fill_yearsView: function (selector, cssClass, factor, step, currentYear, startYear, endYear, callback) {
	            var html, view, year, steps, startStep, endStep, thisYear, i, classes, tooltip, before;

	            html = '';
	            view = this.picker.find(selector);
	            year = parseInt(currentYear / factor, 10) * factor;
	            startStep = parseInt(startYear / step, 10) * step;
	            endStep = parseInt(endYear / step, 10) * step;
	            steps = $.map(this.dates, function (d) {
	                return parseInt(d.getUTCFullYear() / step, 10) * step;
	            });

	            view.find('.datepicker-switch').text(year + '-' + (year + step * 9));

	            thisYear = year - step;
	            for (i = -1; i < 11; i += 1) {
	                classes = [cssClass];
	                tooltip = null;

	                if (i === -1) {
	                    classes.push('old');
	                } else if (i === 10) {
	                    classes.push('new');
	                }
	                if ($.inArray(thisYear, steps) !== -1) {
	                    classes.push('active');
	                }
	                if (thisYear < startStep || thisYear > endStep) {
	                    classes.push('disabled');
	                }
	                if (thisYear === this.viewDate.getFullYear()) {
	                    classes.push('focused');
	                }

	                if (callback !== $.noop) {
	                    before = callback(new Date(thisYear, 0, 1));
	                    if (before === undefined) {
	                        before = {};
	                    } else if (typeof (before) === 'boolean') {
	                        before = { enabled: before };
	                    } else if (typeof (before) === 'string') {
	                        before = { classes: before };
	                    }
	                    if (before.enabled === false) {
	                        classes.push('disabled');
	                    }
	                    if (before.classes) {
	                        classes = classes.concat(before.classes.split(/\s+/));
	                    }
	                    if (before.tooltip) {
	                        tooltip = before.tooltip;
	                    }
	                }

	                html += '<span class="' + classes.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + thisYear + '</span>';
	                thisYear += step;
	            }
	            view.find('td').html(html);
	        },

	        fill: function () {
	            var d = new Date(this.viewDate),
					year = d.getUTCFullYear(),
					month = d.getUTCMonth(),
					startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
					startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
					endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
					endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
					todaytxt = dates[this.o.language].today || dates['en'].today || '',
					cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
					titleFormat = dates[this.o.language].titleFormat || dates['en'].titleFormat,
					tooltip,
					before;
	            if (isNaN(year) || isNaN(month))
	                return;
	            this.picker.find('.datepicker-days .datepicker-switch')
							.text(DPGlobal.formatDate(d, titleFormat, this.o.language));
	            this.picker.find('tfoot .today')
							.text(todaytxt)
							.toggle(this.o.todayBtn !== false);
	            this.picker.find('tfoot .clear')
							.text(cleartxt)
							.toggle(this.o.clearBtn !== false);
	            this.picker.find('thead .datepicker-title')
							.text(this.o.title)
							.toggle(this.o.title !== '');
	            this.updateNavArrows();
	            this.fillMonths();
	            var prevMonth = UTCDate(year, month - 1, 28),
					day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
	            prevMonth.setUTCDate(day);
	            prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7) % 7);
	            var nextMonth = new Date(prevMonth);
	            if (prevMonth.getUTCFullYear() < 100) {
	                nextMonth.setUTCFullYear(prevMonth.getUTCFullYear());
	            }
	            nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
	            nextMonth = nextMonth.valueOf();
	            var html = [];
	            var clsName;
	            while (prevMonth.valueOf() < nextMonth) {
	                if (prevMonth.getUTCDay() === this.o.weekStart) {
	                    html.push('<tr>');
	                    if (this.o.calendarWeeks) {
	                        // ISO 8601: First week contains first thursday.
	                        // ISO also states week starts on Monday, but we can be more abstract here.
	                        var
								// Start of current week: based on weekstart/current date
								ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
								// Thursday of this week
								th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
								// First Thursday of year, year from thursday
								yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay()) % 7 * 864e5),
								// Calendar week: ms between thursdays, div ms per day, div 7 days
								calWeek = (th - yth) / 864e5 / 7 + 1;
	                        html.push('<td class="cw">' + calWeek + '</td>');
	                    }
	                }
	                clsName = this.getClassNames(prevMonth);
	                clsName.push('day');

	                if (this.o.beforeShowDay !== $.noop) {
	                    before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
	                    if (before === undefined)
	                        before = {};
	                    else if (typeof (before) === 'boolean')
	                        before = { enabled: before };
	                    else if (typeof (before) === 'string')
	                        before = { classes: before };
	                    if (before.enabled === false)
	                        clsName.push('disabled');
	                    if (before.classes)
	                        clsName = clsName.concat(before.classes.split(/\s+/));
	                    if (before.tooltip)
	                        tooltip = before.tooltip;
	                }

	                clsName = $.unique(clsName);
	                html.push('<td class="' + clsName.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + prevMonth.getUTCDate() + '</td>');
	                tooltip = null;
	                if (prevMonth.getUTCDay() === this.o.weekEnd) {
	                    html.push('</tr>');
	                }
	                prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
	            }
	            this.picker.find('.datepicker-days tbody').empty().append(html.join(''));

	            var monthsTitle = dates[this.o.language].monthsTitle || dates['en'].monthsTitle || 'Months';
	            var months = this.picker.find('.datepicker-months')
							.find('.datepicker-switch')
								.text(this.o.maxViewMode < 2 ? monthsTitle : year)
								.end()
							.find('span').removeClass('active');

	            $.each(this.dates, function (i, d) {
	                if (d.getUTCFullYear() === year)
	                    months.eq(d.getUTCMonth()).addClass('active');
	            });

	            if (year < startYear || year > endYear) {
	                months.addClass('disabled');
	            }
	            if (year === startYear) {
	                months.slice(0, startMonth).addClass('disabled');
	            }
	            if (year === endYear) {
	                months.slice(endMonth + 1).addClass('disabled');
	            }

	            if (this.o.beforeShowMonth !== $.noop) {
	                var that = this;
	                $.each(months, function (i, month) {
	                    var moDate = new Date(year, i, 1);
	                    var before = that.o.beforeShowMonth(moDate);
	                    if (before === undefined)
	                        before = {};
	                    else if (typeof (before) === 'boolean')
	                        before = { enabled: before };
	                    else if (typeof (before) === 'string')
	                        before = { classes: before };
	                    if (before.enabled === false && !$(month).hasClass('disabled'))
	                        $(month).addClass('disabled');
	                    if (before.classes)
	                        $(month).addClass(before.classes);
	                    if (before.tooltip)
	                        $(month).prop('title', before.tooltip);
	                });
	            }

	            // Generating decade/years picker
	            this._fill_yearsView(
					'.datepicker-years',
					'year',
					10,
					1,
					year,
					startYear,
					endYear,
					this.o.beforeShowYear
				);

	            // Generating century/decades picker
	            this._fill_yearsView(
					'.datepicker-decades',
					'decade',
					100,
					10,
					year,
					startYear,
					endYear,
					this.o.beforeShowDecade
				);

	            // Generating millennium/centuries picker
	            this._fill_yearsView(
					'.datepicker-centuries',
					'century',
					1000,
					100,
					year,
					startYear,
					endYear,
					this.o.beforeShowCentury
				);
	        },

	        updateNavArrows: function () {
	            if (!this._allow_update)
	                return;

	            var d = new Date(this.viewDate),
					year = d.getUTCFullYear(),
					month = d.getUTCMonth();
	            switch (this.viewMode) {
	                case 0:
	                    if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()) {
	                        this.picker.find('.prev').css({ visibility: 'hidden' });
	                    }
	                    else {
	                        this.picker.find('.prev').css({ visibility: 'visible' });
	                    }
	                    if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()) {
	                        this.picker.find('.next').css({ visibility: 'hidden' });
	                    }
	                    else {
	                        this.picker.find('.next').css({ visibility: 'visible' });
	                    }
	                    break;
	                case 1:
	                case 2:
	                case 3:
	                case 4:
	                    if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2) {
	                        this.picker.find('.prev').css({ visibility: 'hidden' });
	                    }
	                    else {
	                        this.picker.find('.prev').css({ visibility: 'visible' });
	                    }
	                    if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2) {
	                        this.picker.find('.next').css({ visibility: 'hidden' });
	                    }
	                    else {
	                        this.picker.find('.next').css({ visibility: 'visible' });
	                    }
	                    break;
	            }
	        },

	        click: function (e) {
	            e.preventDefault();
	            e.stopPropagation();

	            var target, dir, day, year, month, monthChanged, yearChanged;
	            target = $(e.target);

	            // Clicked on the switch
	            if (target.hasClass('datepicker-switch')) {
	                this.showMode(1);
	            }

	            // Clicked on prev or next
	            var navArrow = target.closest('.prev, .next');
	            if (navArrow.length > 0) {
	                dir = DPGlobal.modes[this.viewMode].navStep * (navArrow.hasClass('prev') ? -1 : 1);
	                if (this.viewMode === 0) {
	                    this.viewDate = this.moveMonth(this.viewDate, dir);
	                    this._trigger('changeMonth', this.viewDate);
	                } else {
	                    this.viewDate = this.moveYear(this.viewDate, dir);
	                    if (this.viewMode === 1) {
	                        this._trigger('changeYear', this.viewDate);
	                    }
	                }
	                this.fill();
	            }

	            // Clicked on today button
	            if (target.hasClass('today') && !target.hasClass('day')) {
	                this.showMode(-2);
	                this._setDate(UTCToday(), this.o.todayBtn === 'linked' ? null : 'view');
	            }

	            // Clicked on clear button
	            if (target.hasClass('clear')) {
	                this.clearDates();
	            }

	            if (!target.hasClass('disabled')) {
	                // Clicked on a day
	                if (target.hasClass('day')) {
	                    day = parseInt(target.text(), 10) || 1;
	                    year = this.viewDate.getUTCFullYear();
	                    month = this.viewDate.getUTCMonth();

	                    // From last month
	                    if (target.hasClass('old')) {
	                        if (month === 0) {
	                            month = 11;
	                            year = year - 1;
	                            monthChanged = true;
	                            yearChanged = true;
	                        } else {
	                            month = month - 1;
	                            monthChanged = true;
	                        }
	                    }

	                    // From next month
	                    if (target.hasClass('new')) {
	                        if (month === 11) {
	                            month = 0;
	                            year = year + 1;
	                            monthChanged = true;
	                            yearChanged = true;
	                        } else {
	                            month = month + 1;
	                            monthChanged = true;
	                        }
	                    }
	                    this._setDate(UTCDate(year, month, day));
	                    if (yearChanged) {
	                        this._trigger('changeYear', this.viewDate);
	                    }
	                    if (monthChanged) {
	                        this._trigger('changeMonth', this.viewDate);
	                    }
	                }

	                // Clicked on a month
	                if (target.hasClass('month')) {
	                    this.viewDate.setUTCDate(1);
	                    day = 1;
	                    month = target.parent().find('span').index(target);
	                    year = this.viewDate.getUTCFullYear();
	                    this.viewDate.setUTCMonth(month);
	                    this._trigger('changeMonth', this.viewDate);
	                    if (this.o.minViewMode === 1) {
	                        this._setDate(UTCDate(year, month, day));
	                        this.showMode();
	                    } else {
	                        this.showMode(-1);
	                    }
	                    this.fill();
	                }

	                // Clicked on a year
	                if (target.hasClass('year')
							|| target.hasClass('decade')
							|| target.hasClass('century')) {
	                    this.viewDate.setUTCDate(1);

	                    day = 1;
	                    month = 0;
	                    year = parseInt(target.text(), 10) || 0;
	                    this.viewDate.setUTCFullYear(year);

	                    if (target.hasClass('year')) {
	                        this._trigger('changeYear', this.viewDate);
	                        if (this.o.minViewMode === 2) {
	                            this._setDate(UTCDate(year, month, day));
	                        }
	                    }
	                    if (target.hasClass('decade')) {
	                        this._trigger('changeDecade', this.viewDate);
	                        if (this.o.minViewMode === 3) {
	                            this._setDate(UTCDate(year, month, day));
	                        }
	                    }
	                    if (target.hasClass('century')) {
	                        this._trigger('changeCentury', this.viewDate);
	                        if (this.o.minViewMode === 4) {
	                            this._setDate(UTCDate(year, month, day));
	                        }
	                    }

	                    this.showMode(-1);
	                    this.fill();
	                }
	            }

	            if (this.picker.is(':visible') && this._focused_from) {
	                $(this._focused_from).focus();
	            }
	            delete this._focused_from;
	        },

	        _toggle_multidate: function (date) {
	            var ix = this.dates.contains(date);
	            if (!date) {
	                this.dates.clear();
	            }

	            if (ix !== -1) {
	                if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive) {
	                    this.dates.remove(ix);
	                }
	            } else if (this.o.multidate === false) {
	                this.dates.clear();
	                this.dates.push(date);
	            }
	            else {
	                this.dates.push(date);
	            }

	            if (typeof this.o.multidate === 'number')
	                while (this.dates.length > this.o.multidate)
	                    this.dates.remove(0);
	        },

	        _setDate: function (date, which) {
	            if (!which || which === 'date')
	                this._toggle_multidate(date && new Date(date));
	            if (!which || which === 'view')
	                this.viewDate = date && new Date(date);

	            this.fill();
	            this.setValue();
	            if (!which || which !== 'view') {
	                this._trigger('changeDate');
	            }
	            if (this.inputField) {
	                this.inputField.change();
	            }
	            if (this.o.autoclose && (!which || which === 'date')) {
	                this.hide();
	            }
	        },

	        moveDay: function (date, dir) {
	            var newDate = new Date(date);
	            newDate.setUTCDate(date.getUTCDate() + dir);

	            return newDate;
	        },

	        moveWeek: function (date, dir) {
	            return this.moveDay(date, dir * 7);
	        },

	        moveMonth: function (date, dir) {
	            if (!isValidDate(date))
	                return this.o.defaultViewDate;
	            if (!dir)
	                return date;
	            var new_date = new Date(date.valueOf()),
					day = new_date.getUTCDate(),
					month = new_date.getUTCMonth(),
					mag = Math.abs(dir),
					new_month, test;
	            dir = dir > 0 ? 1 : -1;
	            if (mag === 1) {
	                test = dir === -1
						// If going back one month, make sure month is not current month
						// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
						? function () {
						    return new_date.getUTCMonth() === month;
						}
						// If going forward one month, make sure month is as expected
						// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
						: function () {
						    return new_date.getUTCMonth() !== new_month;
						};
	                new_month = month + dir;
	                new_date.setUTCMonth(new_month);
	                // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
	                if (new_month < 0 || new_month > 11)
	                    new_month = (new_month + 12) % 12;
	            }
	            else {
	                // For magnitudes >1, move one month at a time...
	                for (var i = 0; i < mag; i++)
	                    // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
	                    new_date = this.moveMonth(new_date, dir);
	                // ...then reset the day, keeping it in the new month
	                new_month = new_date.getUTCMonth();
	                new_date.setUTCDate(day);
	                test = function () {
	                    return new_month !== new_date.getUTCMonth();
	                };
	            }
	            // Common date-resetting loop -- if date is beyond end of month, make it
	            // end of month
	            while (test()) {
	                new_date.setUTCDate(--day);
	                new_date.setUTCMonth(new_month);
	            }
	            return new_date;
	        },

	        moveYear: function (date, dir) {
	            return this.moveMonth(date, dir * 12);
	        },

	        moveAvailableDate: function (date, dir, fn) {
	            do {
	                date = this[fn](date, dir);

	                if (!this.dateWithinRange(date))
	                    return false;

	                fn = 'moveDay';
	            }
	            while (this.dateIsDisabled(date));

	            return date;
	        },

	        weekOfDateIsDisabled: function (date) {
	            return $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1;
	        },

	        dateIsDisabled: function (date) {
	            return (
					this.weekOfDateIsDisabled(date) ||
					$.grep(this.o.datesDisabled, function (d) {
					    return isUTCEquals(date, d);
					}).length > 0
				);
	        },

	        dateWithinRange: function (date) {
	            return date >= this.o.startDate && date <= this.o.endDate;
	        },

	        keydown: function (e) {
	            if (!this.picker.is(':visible')) {
	                if (e.keyCode === 40 || e.keyCode === 27) { // allow down to re-show picker
	                    this.show();
	                    e.stopPropagation();
	                }
	                return;
	            }
	            var dateChanged = false,
					dir, newViewDate,
					focusDate = this.focusDate || this.viewDate;
	            switch (e.keyCode) {
	                case 27: // escape
	                    if (this.focusDate) {
	                        this.focusDate = null;
	                        this.viewDate = this.dates.get(-1) || this.viewDate;
	                        this.fill();
	                    }
	                    else
	                        this.hide();
	                    e.preventDefault();
	                    e.stopPropagation();
	                    break;
	                case 37: // left
	                case 38: // up
	                case 39: // right
	                case 40: // down
	                    if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7)
	                        break;
	                    dir = e.keyCode === 37 || e.keyCode === 38 ? -1 : 1;
	                    if (this.viewMode === 0) {
	                        if (e.ctrlKey) {
	                            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');

	                            if (newViewDate)
	                                this._trigger('changeYear', this.viewDate);
	                        }
	                        else if (e.shiftKey) {
	                            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');

	                            if (newViewDate)
	                                this._trigger('changeMonth', this.viewDate);
	                        }
	                        else if (e.keyCode === 37 || e.keyCode === 39) {
	                            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveDay');
	                        }
	                        else if (!this.weekOfDateIsDisabled(focusDate)) {
	                            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveWeek');
	                        }
	                    } else if (this.viewMode === 1) {
	                        if (e.keyCode === 38 || e.keyCode === 40) {
	                            dir = dir * 4;
	                        }
	                        newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
	                    } else if (this.viewMode === 2) {
	                        if (e.keyCode === 38 || e.keyCode === 40) {
	                            dir = dir * 4;
	                        }
	                        newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
	                    }
	                    if (newViewDate) {
	                        this.focusDate = this.viewDate = newViewDate;
	                        this.setValue();
	                        this.fill();
	                        e.preventDefault();
	                    }
	                    break;
	                case 13: // enter
	                    if (!this.o.forceParse)
	                        break;
	                    focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
	                    if (this.o.keyboardNavigation) {
	                        this._toggle_multidate(focusDate);
	                        dateChanged = true;
	                    }
	                    this.focusDate = null;
	                    this.viewDate = this.dates.get(-1) || this.viewDate;
	                    this.setValue();
	                    this.fill();
	                    if (this.picker.is(':visible')) {
	                        e.preventDefault();
	                        e.stopPropagation();
	                        if (this.o.autoclose)
	                            this.hide();
	                    }
	                    break;
	                case 9: // tab
	                    this.focusDate = null;
	                    this.viewDate = this.dates.get(-1) || this.viewDate;
	                    this.fill();
	                    this.hide();
	                    break;
	            }
	            if (dateChanged) {
	                if (this.dates.length)
	                    this._trigger('changeDate');
	                else
	                    this._trigger('clearDate');
	                if (this.inputField) {
	                    this.inputField.change();
	                }
	            }
	        },

	        showMode: function (dir) {
	            if (dir) {
	                this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + dir));
	            }
	            this.picker
					.children('div')
					.hide()
					.filter('.datepicker-' + DPGlobal.modes[this.viewMode].clsName)
						.show();
	            this.updateNavArrows();
	        }
	    };

	    var DateRangePicker = function (element, options) {
	        $(element).data('datepicker', this);
	        this.element = $(element);
	        this.inputs = $.map(options.inputs, function (i) {
	            return i.jquery ? i[0] : i;
	        });
	        delete options.inputs;

	        datepickerPlugin.call($(this.inputs), options)
				.on('changeDate', $.proxy(this.dateUpdated, this));

	        this.pickers = $.map(this.inputs, function (i) {
	            return $(i).data('datepicker');
	        });
	        this.updateDates();
	    };
	    DateRangePicker.prototype = {
	        updateDates: function () {
	            this.dates = $.map(this.pickers, function (i) {
	                return i.getUTCDate();
	            });
	            this.updateRanges();
	        },
	        updateRanges: function () {
	            var range = $.map(this.dates, function (d) {
	                return d.valueOf();
	            });
	            $.each(this.pickers, function (i, p) {
	                p.setRange(range);
	            });
	        },
	        dateUpdated: function (e) {
	            // `this.updating` is a workaround for preventing infinite recursion
	            // between `changeDate` triggering and `setUTCDate` calling.  Until
	            // there is a better mechanism.
	            if (this.updating)
	                return;
	            this.updating = true;

	            var dp = $(e.target).data('datepicker');

	            if (typeof (dp) === "undefined") {
	                return;
	            }

	            var new_date = dp.getUTCDate(),
					i = $.inArray(e.target, this.inputs),
					j = i - 1,
					k = i + 1,
					l = this.inputs.length;
	            if (i === -1)
	                return;

	            $.each(this.pickers, function (i, p) {
	                if (!p.getUTCDate())
	                    p.setUTCDate(new_date);
	            });

	            if (new_date < this.dates[j]) {
	                // Date being moved earlier/left
	                while (j >= 0 && new_date < this.dates[j]) {
	                    this.pickers[j--].setUTCDate(new_date);
	                }
	            }
	            else if (new_date > this.dates[k]) {
	                // Date being moved later/right
	                while (k < l && new_date > this.dates[k]) {
	                    this.pickers[k++].setUTCDate(new_date);
	                }
	            }
	            this.updateDates();

	            delete this.updating;
	        },
	        remove: function () {
	            $.map(this.pickers, function (p) { p.remove(); });
	            delete this.element.data().datepicker;
	        }
	    };

	    function opts_from_el(el, prefix) {
	        // Derive options from element data-attrs
	        var data = $(el).data(),
				out = {}, inkey,
				replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
	        prefix = new RegExp('^' + prefix.toLowerCase());
	        function re_lower(_, a) {
	            return a.toLowerCase();
	        }
	        for (var key in data)
	            if (prefix.test(key)) {
	                inkey = key.replace(replace, re_lower);
	                out[inkey] = data[key];
	            }
	        return out;
	    }

	    function opts_from_locale(lang) {
	        // Derive options from locale plugins
	        var out = {};
	        // Check if "de-DE" style date is available, if not language should
	        // fallback to 2 letter code eg "de"
	        if (!dates[lang]) {
	            lang = lang.split('-')[0];
	            if (!dates[lang])
	                return;
	        }
	        var d = dates[lang];
	        $.each(locale_opts, function (i, k) {
	            if (k in d)
	                out[k] = d[k];
	        });
	        return out;
	    }

	    var old = $.fn.datepicker;
	    var datepickerPlugin = function (option) {
	        var args = Array.apply(null, arguments);
	        args.shift();
	        var internal_return;
	        this.each(function () {
	            var $this = $(this),
					data = $this.data('datepicker'),
					options = typeof option === 'object' && option;
	            if (!data) {
	                var elopts = opts_from_el(this, 'date'),
						// Preliminary otions
						xopts = $.extend({}, defaults, elopts, options),
						locopts = opts_from_locale(xopts.language),
						// Options priority: js args, data-attrs, locales, defaults
						opts = $.extend({}, defaults, locopts, elopts, options);
	                if ($this.hasClass('input-daterange') || opts.inputs) {
	                    $.extend(opts, {
	                        inputs: opts.inputs || $this.find('input').toArray()
	                    });
	                    data = new DateRangePicker(this, opts);
	                }
	                else {
	                    data = new Datepicker(this, opts);
	                }
	                $this.data('datepicker', data);
	            }
	            if (typeof option === 'string' && typeof data[option] === 'function') {
	                internal_return = data[option].apply(data, args);
	            }
	        });

	        if (
				internal_return === undefined ||
				internal_return instanceof Datepicker ||
				internal_return instanceof DateRangePicker
			)
	            return this;

	        if (this.length > 1)
	            throw new Error('Using only allowed for the collection of a single element (' + option + ' function)');
	        else
	            return internal_return;
	    };
	    $.fn.datepicker = datepickerPlugin;

	    var defaults = $.fn.datepicker.defaults = {
	        assumeNearbyYear: false,
	        autoclose: false,
	        beforeShowDay: $.noop,
	        beforeShowMonth: $.noop,
	        beforeShowYear: $.noop,
	        beforeShowDecade: $.noop,
	        beforeShowCentury: $.noop,
	        calendarWeeks: false,
	        clearBtn: false,
	        toggleActive: false,
	        daysOfWeekDisabled: [],
	        daysOfWeekHighlighted: [],
	        datesDisabled: [],
	        endDate: Infinity,
	        forceParse: true,
	        format: 'mm/dd/yyyy',
	        keyboardNavigation: true,
	        language: 'en',
	        minViewMode: 0,
	        maxViewMode: 4,
	        multidate: false,
	        multidateSeparator: ',',
	        orientation: "auto",
	        rtl: false,
	        startDate: -Infinity,
	        startView: 0,
	        todayBtn: false,
	        todayHighlight: false,
	        weekStart: 0,
	        disableTouchKeyboard: false,
	        enableOnReadonly: true,
	        showOnFocus: true,
	        zIndexOffset: 10,
	        container: 'body',
	        immediateUpdates: false,
	        title: '',
	        templates: {
	            leftArrow: '&laquo;',
	            rightArrow: '&raquo;'
	        }
	    };
	    var locale_opts = $.fn.datepicker.locale_opts = [
			'format',
			'rtl',
			'weekStart'
	    ];
	    $.fn.datepicker.Constructor = Datepicker;
	    var dates = $.fn.datepicker.dates = {
	        en: {
	            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
	            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	            today: "Today",
	            clear: "Clear",
	            titleFormat: "MM yyyy"
	        }
	    };

	    var DPGlobal = {
	        modes: [
				{
				    clsName: 'days',
				    navFnc: 'Month',
				    navStep: 1
				},
				{
				    clsName: 'months',
				    navFnc: 'FullYear',
				    navStep: 1
				},
				{
				    clsName: 'years',
				    navFnc: 'FullYear',
				    navStep: 10
				},
				{
				    clsName: 'decades',
				    navFnc: 'FullDecade',
				    navStep: 100
				},
				{
				    clsName: 'centuries',
				    navFnc: 'FullCentury',
				    navStep: 1000
				}],
	        isLeapYear: function (year) {
	            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
	        },
	        getDaysInMonth: function (year, month) {
	            return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	        },
	        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
	        nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
	        parseFormat: function (format) {
	            if (typeof format.toValue === 'function' && typeof format.toDisplay === 'function')
	                return format;
	            // IE treats \0 as a string end in inputs (truncating the value),
	            // so it's a bad format delimiter, anyway
	            var separators = format.replace(this.validParts, '\0').split('\0'),
					parts = format.match(this.validParts);
	            if (!separators || !separators.length || !parts || parts.length === 0) {
	                throw new Error("Invalid date format.");
	            }
	            return { separators: separators, parts: parts };
	        },
	        parseDate: function (date, format, language, assumeNearby) {
	            if (!date)
	                return undefined;
	            if (date instanceof Date)
	                return date;
	            if (typeof format === 'string')
	                format = DPGlobal.parseFormat(format);
	            if (format.toValue)
	                return format.toValue(date, format, language);
	            var part_re = /([\-+]\d+)([dmwy])/,
					parts = date.match(/([\-+]\d+)([dmwy])/g),
					fn_map = {
					    d: 'moveDay',
					    m: 'moveMonth',
					    w: 'moveWeek',
					    y: 'moveYear'
					},
					dateAliases = {
					    yesterday: '-1d',
					    today: '+0d',
					    tomorrow: '+1d'
					},
					part, dir, i, fn;
	            if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
	                date = new Date();
	                for (i = 0; i < parts.length; i++) {
	                    part = part_re.exec(parts[i]);
	                    dir = parseInt(part[1]);
	                    fn = fn_map[part[2]];
	                    date = Datepicker.prototype[fn](date, dir);
	                }
	                return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
	            }

	            if (typeof dateAliases[date] !== 'undefined') {
	                date = dateAliases[date];
	                parts = date.match(/([\-+]\d+)([dmwy])/g);

	                if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
	                    date = new Date();
	                    for (i = 0; i < parts.length; i++) {
	                        part = part_re.exec(parts[i]);
	                        dir = parseInt(part[1]);
	                        fn = fn_map[part[2]];
	                        date = Datepicker.prototype[fn](date, dir);
	                    }

	                    return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
	                }
	            }

	            parts = date && date.match(this.nonpunctuation) || [];
	            date = new Date();

	            function applyNearbyYear(year, threshold) {
	                if (threshold === true)
	                    threshold = 10;

	                // if year is 2 digits or less, than the user most likely is trying to get a recent century
	                if (year < 100) {
	                    year += 2000;
	                    // if the new year is more than threshold years in advance, use last century
	                    if (year > ((new Date()).getFullYear() + threshold)) {
	                        year -= 100;
	                    }
	                }

	                return year;
	            }

	            var parsed = {},
					setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
					setters_map = {
					    yyyy: function (d, v) {
					        return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
					    },
					    yy: function (d, v) {
					        return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
					    },
					    m: function (d, v) {
					        if (isNaN(d))
					            return d;
					        v -= 1;
					        while (v < 0) v += 12;
					        v %= 12;
					        d.setUTCMonth(v);
					        while (d.getUTCMonth() !== v)
					            d.setUTCDate(d.getUTCDate() - 1);
					        return d;
					    },
					    d: function (d, v) {
					        return d.setUTCDate(v);
					    }
					},
					val, filtered;
	            setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
	            setters_map['dd'] = setters_map['d'];
	            date = UTCToday();
	            var fparts = format.parts.slice();
	            // Remove noop parts
	            if (parts.length !== fparts.length) {
	                fparts = $(fparts).filter(function (i, p) {
	                    return $.inArray(p, setters_order) !== -1;
	                }).toArray();
	            }
	            // Process remainder
	            function match_part() {
	                var m = this.slice(0, parts[i].length),
						p = parts[i].slice(0, m.length);
	                return m.toLowerCase() === p.toLowerCase();
	            }
	            if (parts.length === fparts.length) {
	                var cnt;
	                for (i = 0, cnt = fparts.length; i < cnt; i++) {
	                    val = parseInt(parts[i], 10);
	                    part = fparts[i];
	                    if (isNaN(val)) {
	                        switch (part) {
	                            case 'MM':
	                                filtered = $(dates[language].months).filter(match_part);
	                                val = $.inArray(filtered[0], dates[language].months) + 1;
	                                break;
	                            case 'M':
	                                filtered = $(dates[language].monthsShort).filter(match_part);
	                                val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
	                                break;
	                        }
	                    }
	                    parsed[part] = val;
	                }
	                var _date, s;
	                for (i = 0; i < setters_order.length; i++) {
	                    s = setters_order[i];
	                    if (s in parsed && !isNaN(parsed[s])) {
	                        _date = new Date(date);
	                        setters_map[s](_date, parsed[s]);
	                        if (!isNaN(_date))
	                            date = _date;
	                    }
	                }
	            }
	            return date;
	        },
	        formatDate: function (date, format, language) {
	            if (!date)
	                return '';
	            if (typeof format === 'string')
	                format = DPGlobal.parseFormat(format);
	            if (format.toDisplay)
	                return format.toDisplay(date, format, language);
	            var val = {
	                d: date.getUTCDate(),
	                D: dates[language].daysShort[date.getUTCDay()],
	                DD: dates[language].days[date.getUTCDay()],
	                m: date.getUTCMonth() + 1,
	                M: dates[language].monthsShort[date.getUTCMonth()],
	                MM: dates[language].months[date.getUTCMonth()],
	                yy: date.getUTCFullYear().toString().substring(2),
	                yyyy: date.getUTCFullYear()
	            };
	            val.dd = (val.d < 10 ? '0' : '') + val.d;
	            val.mm = (val.m < 10 ? '0' : '') + val.m;
	            date = [];
	            var seps = $.extend([], format.separators);
	            for (var i = 0, cnt = format.parts.length; i <= cnt; i++) {
	                if (seps.length)
	                    date.push(seps.shift());
	                date.push(val[format.parts[i]]);
	            }
	            return date.join('');
	        },
	        headTemplate: '<thead>' +
				              '<tr>' +
				                '<th colspan="7" class="datepicker-title"></th>' +
				              '</tr>' +
								'<tr>' +
									'<th class="prev">&laquo;</th>' +
									'<th colspan="5" class="datepicker-switch"></th>' +
									'<th class="next">&raquo;</th>' +
								'</tr>' +
							'</thead>',
	        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
	        footTemplate: '<tfoot>' +
								'<tr>' +
									'<th colspan="7" class="today"></th>' +
								'</tr>' +
								'<tr>' +
									'<th colspan="7" class="clear"></th>' +
								'</tr>' +
							'</tfoot>'
	    };
	    DPGlobal.template = '<div class="datepicker">' +
								'<div class="datepicker-days">' +
									'<table class="table-condensed">' +
										DPGlobal.headTemplate +
										'<tbody></tbody>' +
										DPGlobal.footTemplate +
									'</table>' +
								'</div>' +
								'<div class="datepicker-months">' +
									'<table class="table-condensed">' +
										DPGlobal.headTemplate +
										DPGlobal.contTemplate +
										DPGlobal.footTemplate +
									'</table>' +
								'</div>' +
								'<div class="datepicker-years">' +
									'<table class="table-condensed">' +
										DPGlobal.headTemplate +
										DPGlobal.contTemplate +
										DPGlobal.footTemplate +
									'</table>' +
								'</div>' +
								'<div class="datepicker-decades">' +
									'<table class="table-condensed">' +
										DPGlobal.headTemplate +
										DPGlobal.contTemplate +
										DPGlobal.footTemplate +
									'</table>' +
								'</div>' +
								'<div class="datepicker-centuries">' +
									'<table class="table-condensed">' +
										DPGlobal.headTemplate +
										DPGlobal.contTemplate +
										DPGlobal.footTemplate +
									'</table>' +
								'</div>' +
							'</div>';

	    $.fn.datepicker.DPGlobal = DPGlobal;


	    /* DATEPICKER NO CONFLICT
		* =================== */

	    $.fn.datepicker.noConflict = function () {
	        $.fn.datepicker = old;
	        return this;
	    };

	    /* DATEPICKER VERSION
		 * =================== */
	    $.fn.datepicker.version = '1.6.1';

	    /* DATEPICKER DATA-API
		* ================== */

	    $(document).on(
			'focus.datepicker.data-api click.datepicker.data-api',
			'[data-provide="datepicker"]',
			function (e) {
			    var $this = $(this);
			    if ($this.data('datepicker'))
			        return;
			    e.preventDefault();
			    // component click requires us to explicitly show it
			    datepickerPlugin.call($this, 'show');
			}
		);
	    $(function () {
	        datepickerPlugin.call($('[data-provide="datepicker-inline"]'));
	    });

	    $.fn.datepicker.dates["zh-CN"] = {
	        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
	        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
	        daysMin: ["日", "一", "二", "三", "四", "五", "六"],
	        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	        monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	        today: "今日",
	        clear: "清除",
	        format: "yyyy年mm月dd日",
	        titleFormat: "yyyy年mm月",
	        weekStart: 0
	    }
	})(jQuery);

/***/ },
/* 7 */
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: dropdown.js v3.3.5
	 * http://getbootstrap.com/javascript/#dropdowns
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	    'use strict';

	    // DROPDOWN CLASS DEFINITION
	    // =========================

	    var backdrop = '.dropdown-backdrop'
	    var toggle = '[data-toggle="dropdown"]'
	    var Dropdown = function (element) {
	        $(element).on('click.bs.dropdown', this.toggle)
	    }

	    Dropdown.VERSION = '3.3.5'

	    function getParent($this) {
	        var selector = $this.attr('data-target')

	        if (!selector) {
	            selector = $this.attr('href')
	            selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	        }

	        var $parent = selector && $(selector)

	        return $parent && $parent.length ? $parent : $this.parent()
	    }

	    function clearMenus(e) {
	        if (e && e.which === 3) return
	        $(backdrop).remove()
	        $(toggle).each(function () {
	            var $this = $(this)
	            var $parent = getParent($this)
	            var relatedTarget = { relatedTarget: this }

	            if (!$parent.hasClass('open')) return

	            if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

	            if (e && e.type == 'click' && /label/i.test(e.target.tagName) && $(e.target).children('input[type=checkbox]').length > 0) return;

	            $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

	            if (e.isDefaultPrevented()) return

	            $this.attr('aria-expanded', 'false')
	            $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
	        })
	    }

	    Dropdown.prototype.toggle = function (e) {
	        var $this = $(this)

	        if ($this.is('.disabled, :disabled')) return

	        var $parent = getParent($this)
	        var isActive = $parent.hasClass('open')

	        clearMenus()

	        if (!isActive) {
	            if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
	                // if mobile we use a backdrop because click events don't delegate
	                $(document.createElement('div'))
	                  .addClass('dropdown-backdrop')
	                  .insertAfter($(this))
	                  .on('click', clearMenus)
	            }

	            var relatedTarget = { relatedTarget: this }
	            $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

	            if (e.isDefaultPrevented()) return

	            $this
	              .trigger('focus')
	              .attr('aria-expanded', 'true')

	            $parent
	              .toggleClass('open')
	              .trigger('shown.bs.dropdown', relatedTarget)
	        }

	        return false
	    }

	    Dropdown.prototype.keydown = function (e) {
	        if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

	        var $this = $(this)

	        e.preventDefault()
	        e.stopPropagation()

	        if ($this.is('.disabled, :disabled')) return

	        var $parent = getParent($this)
	        var isActive = $parent.hasClass('open')

	        if (!isActive && e.which != 27 || isActive && e.which == 27) {
	            if (e.which == 27) $parent.find(toggle).trigger('focus')
	            return $this.trigger('click')
	        }

	        var desc = ' li:not(.disabled):visible a'
	        var $items = $parent.find('.dropdown-menu' + desc)

	        if (!$items.length) return

	        var index = $items.index(e.target)

	        if (e.which == 38 && index > 0) index--         // up
	        if (e.which == 40 && index < $items.length - 1) index++         // down
	        if (!~index) index = 0

	        $items.eq(index).trigger('focus')
	    }


	    // DROPDOWN PLUGIN DEFINITION
	    // ==========================

	    function Plugin(option) {
	        return this.each(function () {
	            var $this = $(this)
	            var data = $this.data('bs.dropdown')

	            if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
	            if (typeof option == 'string') data[option].call($this)
	        })
	    }

	    var old = $.fn.dropdown

	    $.fn.dropdown = Plugin
	    $.fn.dropdown.Constructor = Dropdown


	    // DROPDOWN NO CONFLICT
	    // ====================

	    $.fn.dropdown.noConflict = function () {
	        $.fn.dropdown = old
	        return this
	    }


	    // APPLY TO STANDARD DROPDOWN ELEMENTS
	    // ===================================

	    $(document)
	      .on('click.bs.dropdown.data-api', clearMenus)
	      .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
	      .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
	      .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
	      .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

	}(jQuery);


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: modal.js v3.3.5
	 * http://getbootstrap.com/javascript/#modals
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	    'use strict';

	    // MODAL CLASS DEFINITION
	    // ======================

	    var Modal = function (element, options) {
	        this.options = options
	        this.$body = $(document.body)
	        this.$element = $(element)
	        this.$dialog = this.$element.find('.modal-dialog')
	        this.$backdrop = null
	        this.isShown = null
	        this.originalBodyPad = null
	        this.scrollbarWidth = 0
	        this.ignoreBackdropClick = false

	        if (this.options.remote) {
	            this.$element
	              .find('.modal-content')
	              .load(this.options.remote, $.proxy(function () {
	                  this.$element.trigger('loaded.bs.modal')
	              }, this))
	        }
	    }

	    Modal.VERSION = '3.3.5'

	    Modal.TRANSITION_DURATION = 300
	    Modal.BACKDROP_TRANSITION_DURATION = 150

	    Modal.DEFAULTS = {
	        backdrop: true,
	        keyboard: true,
	        show: true
	    }

	    Modal.prototype.toggle = function (_relatedTarget) {
	        return this.isShown ? this.hide() : this.show(_relatedTarget)
	    }

	    Modal.prototype.show = function (_relatedTarget) {
	        var that = this
	        var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

	        this.$element.trigger(e)

	        if (this.isShown || e.isDefaultPrevented()) return

	        this.isShown = true

	        this.checkScrollbar()
	        this.setScrollbar()
	        this.$body.addClass('modal-open')

	        this.escape()
	        this.resize()

	        this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

	        this.$dialog.on('mousedown.dismiss.bs.modal', function () {
	            that.$element.one('mouseup.dismiss.bs.modal', function (e) {
	                if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
	            })
	        })

	        this.backdrop(function () {
	            var transition = $.support.transition && that.$element.hasClass('fade')

	            if (!that.$element.parent().length) {
	                that.$element.appendTo(that.$body) // don't move modals dom position
	            }

	            that.$element
	              .show()
	              .scrollTop(0)

	            that.adjustDialog()

	            if (transition) {
	                that.$element[0].offsetWidth // force reflow
	            }

	            that.$element.addClass('in')

	            that.enforceFocus()

	            var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

	            transition ?
	              that.$dialog // wait for modal to slide in
	                .one('bsTransitionEnd', function () {
	                    that.$element.trigger('focus').trigger(e)
	                })
	                .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
	              that.$element.trigger('focus').trigger(e)
	        })
	    }

	    Modal.prototype.hide = function (e) {
	        if (e) e.preventDefault()

	        e = $.Event('hide.bs.modal')

	        this.$element.trigger(e)

	        if (!this.isShown || e.isDefaultPrevented()) return

	        this.isShown = false

	        this.escape()
	        this.resize()

	        $(document).off('focusin.bs.modal')

	        this.$element
	          .removeClass('in')
	          .off('click.dismiss.bs.modal')
	          .off('mouseup.dismiss.bs.modal')

	        this.$dialog.off('mousedown.dismiss.bs.modal')

	        $.support.transition && this.$element.hasClass('fade') ?
	          this.$element
	            .one('bsTransitionEnd', $.proxy(this.hideModal, this))
	            .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
	          this.hideModal()
	    }

	    Modal.prototype.enforceFocus = function () {
	        $(document)
	          .off('focusin.bs.modal') // guard against infinite focus loop
	          .on('focusin.bs.modal', $.proxy(function (e) {
	              if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
	                  this.$element.trigger('focus')
	              }
	          }, this))
	    }

	    Modal.prototype.escape = function () {
	        if (this.isShown && this.options.keyboard) {
	            this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
	                e.which == 27 && this.hide()
	            }, this))
	        } else if (!this.isShown) {
	            this.$element.off('keydown.dismiss.bs.modal')
	        }
	    }

	    Modal.prototype.resize = function () {
	        if (this.isShown) {
	            $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
	        } else {
	            $(window).off('resize.bs.modal')
	        }
	    }

	    Modal.prototype.hideModal = function () {
	        var that = this
	        this.$element.hide()
	        this.backdrop(function () {
	            that.$body.removeClass('modal-open')
	            that.resetAdjustments()
	            that.resetScrollbar()
	            that.$element.trigger('hidden.bs.modal')
	        })
	    }

	    Modal.prototype.removeBackdrop = function () {
	        this.$backdrop && this.$backdrop.remove()
	        this.$backdrop = null
	    }

	    Modal.prototype.backdrop = function (callback) {
	        var that = this
	        var animate = this.$element.hasClass('fade') ? 'fade' : ''

	        if (this.isShown && this.options.backdrop) {
	            var doAnimate = $.support.transition && animate

	            this.$backdrop = $(document.createElement('div'))
	              .addClass('modal-backdrop ' + animate)
	              .appendTo(this.$body)

	            this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
	                if (this.ignoreBackdropClick) {
	                    this.ignoreBackdropClick = false
	                    return
	                }
	                if (e.target !== e.currentTarget) return
	                this.options.backdrop == 'static'
	                  ? this.$element[0].focus()
	                  : this.hide()
	            }, this))

	            if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

	            this.$backdrop.addClass('in')

	            if (!callback) return

	            doAnimate ?
	              this.$backdrop
	                .one('bsTransitionEnd', callback)
	                .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
	              callback()

	        } else if (!this.isShown && this.$backdrop) {
	            this.$backdrop.removeClass('in')

	            var callbackRemove = function () {
	                that.removeBackdrop()
	                callback && callback()
	            }
	            $.support.transition && this.$element.hasClass('fade') ?
	              this.$backdrop
	                .one('bsTransitionEnd', callbackRemove)
	                .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
	              callbackRemove()

	        } else if (callback) {
	            callback()
	        }
	    }

	    // these following methods are used to handle overflowing modals

	    Modal.prototype.handleUpdate = function () {
	        this.adjustDialog()
	    }

	    Modal.prototype.adjustDialog = function () {
	        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

	        this.$element.css({
	            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
	            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
	        })
	    }

	    Modal.prototype.resetAdjustments = function () {
	        this.$element.css({
	            paddingLeft: '',
	            paddingRight: ''
	        })
	    }

	    Modal.prototype.checkScrollbar = function () {
	        var fullWindowWidth = window.innerWidth
	        if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
	            var documentElementRect = document.documentElement.getBoundingClientRect()
	            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
	        }
	        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
	        this.scrollbarWidth = this.measureScrollbar()
	    }

	    Modal.prototype.setScrollbar = function () {
	        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
	        this.originalBodyPad = document.body.style.paddingRight || ''
	        if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
	    }

	    Modal.prototype.resetScrollbar = function () {
	        this.$body.css('padding-right', this.originalBodyPad)
	    }

	    Modal.prototype.measureScrollbar = function () { // thx walsh
	        var scrollDiv = document.createElement('div')
	        scrollDiv.className = 'modal-scrollbar-measure'
	        this.$body.append(scrollDiv)
	        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
	        this.$body[0].removeChild(scrollDiv)
	        return scrollbarWidth
	    }


	    // MODAL PLUGIN DEFINITION
	    // =======================

	    function Plugin(option, _relatedTarget) {
	        return this.each(function () {
	            var $this = $(this)
	            var data = $this.data('bs.modal')
	            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

	            if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
	            if (typeof option == 'string') data[option](_relatedTarget)
	            else if (options.show) data.show(_relatedTarget)
	        })
	    }

	    var old = $.fn.modal

	    $.fn.modal = Plugin
	    $.fn.modal.Constructor = Modal


	    // MODAL NO CONFLICT
	    // =================

	    $.fn.modal.noConflict = function () {
	        $.fn.modal = old
	        return this
	    }


	    // MODAL DATA-API
	    // ==============

	    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
	        var $this = $(this)
	        var href = $this.attr('href')
	        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
	        var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

	        if ($this.is('a')) e.preventDefault()

	        $target.one('show.bs.modal', function (showEvent) {
	            if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
	            $target.one('hidden.bs.modal', function () {
	                $this.is(':visible') && $this.trigger('focus')
	            })
	        })
	        Plugin.call($target, option, this)
	    })

	}(jQuery);


/***/ },
/* 9 */
/***/ function(module, exports) {

	(function ($) {
	    "use strict";

	    $.widget("gtui.tab", $.gtui.tabbase, {
	        options: {
	            tabcontrolClass: 'tabs',
	            
	            selectedIndex: 0,

	            selectedIndexChanged: $.noop
	        },
	        resetElement: function () {
	            this._dealWithLi();
	        },

	        _create: function () {
	            $(this.element.children('ul').find('li')[this.options.selectedIndex]).addClass('active');

	            this._super();

	            this._initElement();
	            this._initUl();
	            this._initLi();

	            this._selectItem(this._li[this.options.selectedIndex]);
	        },
	        _initElement: function () {
	            this.element.addClass(this.options.tabcontrolClass);
	        },
	        _initUl: function () {
	            if (this._ul && this._ul.length > 0) {
	                this._ul.attr('role', 'tablist').on('click', 'a', function (e) {
	                    var $link = $(e.target);
	                    // Prevent link routing the url
	                    if ($link.closest('a') && $link.closest('a').attr('href')
	                        && $link.closest('a').attr('href').indexOf('#') === 0) {
	                        e.preventDefault();
	                    }
	                });
	            }
	        },
	        _initLi: function () {
	            var _self = this;
	            if (_self._li && _self._li.length > 0) {
	                _self._li.each(function (index, el) {
	                    var _selected = false,
	                        _$el = $(el);
	                    if (index === _self.options.selectedIndex) {
	                        _selected = true;
	                        _$el.addClass('select');
	                    }

	                    _$el.attr({
	                        'role': 'tab',
	                        'tabindex': _selected  ? 0 : -1,
	                        'aria-selected': _selected
	                    });
	                });
	            }
	        },
	        _getSelectedIndexByItem: function (li) {
	            return this._li.index(li);
	        },
	        _selectedItemChanged: function (oldItem, newItem) {
	            this.option('selectedIndex', this._getSelectedIndexByItem(newItem));
	        },
	        _setExtendOption: function (key, value) {
	            var _doIt = this._super(key, value);

	            var _self = this;
	            if (key === 'selectedIndex') {
	                if (_self.options[key] !== value) {
	                    return _doIt && true;
	                }
	                else return false;
	            }

	            return _doIt;
	        },
	        _optionChanged: function (key, param) {
	            this._super(key, param);

	            if (key === 'selectedIndex') {
	                this._changeSelectedItem(this._li[param.newValue], this._li[param.oldValue]);
	                this.element.trigger('selectedIndexChanged', param);
	                this.options.selectedIndexChanged.apply(this.element, [{}, param]);
	            }
	        }
	    });
	}(jQuery));

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Table
	 */

	(function ($) {

	    $.extend(gtui, {
	        table: {
	            constant: {
	                TABLE_CONTAINER_CLASS: 'table-container',

	                TABLE_CLASS: 'table',
	                TABLE_BORDERED_CLASS: 'table-bordered',
	                TABLE_CELL_HORIZONTAL_BORDERED_CLASS: 'table-cell-horizontal-bordered',
	                TABLE_CELL_VERTICAL_BORDERED_CLASS: 'table-cell-vertical-bordered',

	                TABLE_STRIPED: 'table-striped',
	                TABLE_STRIPED_ODD: 'table-striped-odd',
	                TABLE_STRIPED_EVEN: 'table-striped-even',

	                ORIGIN_TABLE_CONTAINER_CLASS: 'table-content',
	                FROZEN_HEADER_TABLE_CONTAINER_CLASS: 'table-frozen-header',
	                FROZEN_COLUMNS_TABLE_CONTAINER_CLASS: 'table-frozen-columns',
	                FROZEN_COLUMNS_TABLE_HEADER_CONTAINER_CLASS: 'table-frozen-columns-header',

	                columnType: {
	                    TEXT: 0,
	                    CHECKBOX: 100,
	                    LINK: 200,
	                    BUTTON_GROUP: 300
	                }
	            }
	        }
	    });

	    $.widget("gtui.table", {
	        options: {
	            fillSpanClass: 'fill-span',

	            frozenColumnsCount: 0
	        },

	        _create: function () {
	            var _self = this,
	                _el = _self.element;

	            _self._getContainers();

	            _self._getTables();

	            _self.updateLayout();

	            _self._initEvents();
	        },
	        _getContainers: function () {
	            var _self = this,
	                _el = _self.element,
	                _constants = gtui.table.constant;

	            _self._originTableContainer = _el.children('.' + _constants.ORIGIN_TABLE_CONTAINER_CLASS);
	            _self._frozenHeaderContainer = _el.children('.' + _constants.FROZEN_HEADER_TABLE_CONTAINER_CLASS);
	            _self._frozenColumnsContainer = _el.children('.' + _constants.FROZEN_COLUMNS_TABLE_CONTAINER_CLASS);
	            _self._frozenColumnsHeaderContainer = _el.children('.' + _constants.FROZEN_COLUMNS_TABLE_HEADER_CONTAINER_CLASS);
	        },
	        _getTables: function () {
	            var _self = this;

	            _self._originTable = _self._originTableContainer.children('table');
	            _self._originTableHeaders = _self._originTable.find('> thead > tr > th');
	            _self._originTableRows = _self._originTable.find('> tbody > tr');
	            _self._frozenHeaderTable = _self._frozenHeaderContainer.children('table');
	            _self._frozenColumnsTable = _self._frozenColumnsContainer.children('table');
	            _self._frozenColumnsHeaderTable = _self._frozenColumnsHeaderContainer.children('table');
	        },
	        _initEvents: function () {
	            var _self = this,
	                _eventNamespace = _self.eventNamespace;
	            
	            // Do scroll when origin table is scrolled.
	            _self._originTableContainer
	                .off(_eventNamespace)
	                .on('scroll' + _eventNamespace, _self, function (e) {
	                    e.data._frozenHeaderContainer.scrollLeft(e.data._originTableContainer.scrollLeft());
	                    e.data._frozenColumnsContainer.scrollTop(e.data._originTableContainer.scrollTop());
	                })

	            // Reset layout when window is resized.
	            _self.element.on('resize' + _eventNamespace, _self, function (e) {
	                e.data.updateLayout();
	            })
	            .on('click' + _eventNamespace, 'th', _self, function (e) {
	                var _target = $(e.target).closest('th');

	                var _position = _target.index(),
	                    _event = $.Event('sort.gtui.table', { index: _position });

	                _target.trigger($.extend(e, _event));
	            })
	            .on('click' + _eventNamespace, 'a', _self, function (e) {
	                var _target = $(e.target).closest('a');

	                var _buttonGroupIndex = _target.index(),
	                    _columnIndex = _target.closest('td').index(),
	                    _rowIndex = _target.closest('tr').index();

	                var _event = $.Event('linkClick.gtui.table', {
	                    buttonGroupIndex: _buttonGroupIndex,
	                    columnIndex: _columnIndex,
	                    rowIndex: _rowIndex
	                });

	                _target.trigger(_event);
	            })
	            .on('click' + _eventNamespace, 'button', _self, function (e) {
	                var _target = $(e.target).closest('button');

	                var _buttonGroupIndex = _target.index(),
	                    _columnIndex = _target.closest('td').index(),
	                    _rowIndex = _target.closest('tr').index();

	                var _event = $.Event('buttonClick.gtui.table', {
	                    buttonGroupIndex: _buttonGroupIndex,
	                    columnIndex: _columnIndex,
	                    rowIndex: _rowIndex
	                });

	                _target.trigger(_event);
	            });

	            // Scroll origin table when table holds the frozen columns is scrolled.
	            _self._frozenColumnsTable.on('mousewheel' + _eventNamespace, _self, function (e) {
	                e.data._originTableContainer.scrollTop(e.data._originTableContainer.scrollTop() + e.deltaY * -1);
	            });
	        },
	        _dealWithFrozenColumnsHeader: function () {
	            var _self = this,
	                    _oth = _self._originTableHeaders;

	            _self._frozenColumnsHeaderTable.find('> thead > tr > th').map(function (i, th) {
	                $(th).outerWidth(_oth[i].offsetWidth).outerHeight(_oth[i].offsetHeight);
	            });

	            _self._frozenColumnsHeaderContainer.outerWidth(_self._frozenColumnsContainer.width());
	        },
	        _dealWithFrozenColumns: function () {
	            var _self = this,
	                _oth = _self._originTableHeaders,
	                _otr = _self._originTableRows,
	                _width = 0;

	            _self._frozenColumnsTable.find('> thead > tr > th').map(function (i, th) {
	                if (i < _self._getFrozenColumnsCount()) {
	                    _width += _oth[i].offsetWidth;
	                    $(th).outerWidth(_oth[i].offsetWidth).outerHeight(_oth[i].offsetHeight);
	                }
	            });
	            _self._frozenColumnsTable.find('> tbody > tr').map(function (i, tr) {
	                $(tr).outerHeight(tr.offsetHeight);
	            });

	            _self._frozenColumnsContainer
	                .outerHeight(_self._originTableContainer[0].clientHeight +
	                    _self._originTable.find('thead').outerHeight())
	                .outerWidth(_width + 2);
	        },
	        _dealWithFrozenHeader: function () {
	            var _self = this,
	                _oth = _self._originTableHeaders;

	            _self._frozenHeaderTable.find('> thead > tr > th').map(function (i, th) {
	                $(th).outerWidth(_oth[i].offsetWidth).outerHeight(_oth[i].offsetHeight);
	            });

	            _self._frozenHeaderContainer.outerWidth(_self._originTableContainer[0].clientWidth);
	        },
	        _dealWithOriginHeader: function () {
	            var _marginTop = this._originTable.find('thead').outerHeight();
	            this._originTable.css({ 'margin-top': _marginTop * -1 });

	            this.element.css({ 'padding-top': _marginTop });

	            this._originTable.find('> tbody > tr').map(function (i, tr) {
	                $(tr).outerHeight(tr.offsetHeight);
	            });
	        },
	        _getFrozenColumnsCount: function () {
	            var count = parseInt(this.options.frozenColumnsCount);
	            return count ? count : 0;
	        },
	        _hideRedundancy: function () {
	            var _self = this,
	                _frozenColumnCount = _self.options.frozenColumnsCount;

	            // Hide unfrozen columns of _frozenColumnsTable.
	            _self._frozenColumnsTable.find('> thead > tr > th').map(function (i, th) {
	                if (i >= _frozenColumnCount) {
	                    th.style.display = 'none';
	                }
	            });
	            _self._frozenColumnsTable.find('> tbody > tr').map(function (i, tr) {
	                $(tr).find('> td').map(function (j, td) {
	                    if (j >= _frozenColumnCount) {
	                        td.style.display = 'none';
	                    }
	                });
	            });
	            // Hide unfrozen columns of _frozenColumnsHeaderTable.
	            _self._frozenColumnsHeaderTable.find('> thead > tr > th').map(function (i, th) {
	                if (i >= _frozenColumnCount) {
	                    th.style.display = 'none';
	                }
	            });
	        },
	        _destroy: function () {

	        },

	        updateLayout: function () {
	            var _self = this;

	            _self._dealWithOriginHeader();
	            _self._dealWithFrozenHeader();
	            _self._dealWithFrozenColumns();
	            _self._dealWithFrozenColumnsHeader();

	            _self._hideRedundancy();
	        },
	        updateItemsSource: function () {
	            var _self = this;

	            _self._getTables();

	            _self.updateLayout();
	        }
	    });
	})(jQuery);

/***/ },
/* 11 */
/***/ function(module, exports) {

	/* =========================================================
	 * bootstrap-treeview.js v1.2.0
	 * =========================================================
	 * Copyright 2013 Jonathan Miles
	 * Project URL : http://www.jondmiles.com/bootstrap-treeview
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 * ========================================================= */

	;(function ($, window, document, undefined) {

		/*global jQuery, console*/

		'use strict';

		var pluginName = 'treeview';

		var _default = {};

		_default.settings = {

			injectStyle: true,

			levels: 2,

			expandIcon: 'glyphicon glyphicon-plus',
			collapseIcon: 'glyphicon glyphicon-minus',
			emptyIcon: 'glyphicon',
			nodeIcon: '',
			selectedIcon: '',
			checkedIcon: 'glyphicon glyphicon-check',
			uncheckedIcon: 'glyphicon glyphicon-unchecked',

			color: undefined, // '#000000',
			backColor: undefined, // '#FFFFFF',
			borderColor: undefined, // '#dddddd',
			onhoverColor: '#F5F5F5',
			selectedColor: '#FFFFFF',
			selectedBackColor: '#428bca',
			searchResultColor: '#D9534F',
			searchResultBackColor: undefined, //'#FFFFFF',

			enableLinks: false,
			highlightSelected: true,
			highlightSearchResults: true,
			showBorder: true,
			showIcon: true,
			showCheckbox: false,
			showTags: false,
			multiSelect: false,

			// Event handlers
			onNodeChecked: undefined,
			onNodeCollapsed: undefined,
			onNodeDisabled: undefined,
			onNodeEnabled: undefined,
			onNodeExpanded: undefined,
			onNodeSelected: undefined,
			onNodeUnchecked: undefined,
			onNodeUnselected: undefined,
			onSearchComplete: undefined,
			onSearchCleared: undefined
		};

		_default.options = {
			silent: false,
			ignoreChildren: false
		};

		_default.searchOptions = {
			ignoreCase: true,
			exactMatch: false,
			revealResults: true
		};

		var Tree = function (element, options) {

			this.$element = $(element);
			this.elementId = element.id;
			this.styleId = this.elementId + '-style';

			this.init(options);

			return {

				// Options (public access)
				options: this.options,

				// Initialize / destroy methods
				init: $.proxy(this.init, this),
				remove: $.proxy(this.remove, this),

				// Get methods
				getNode: $.proxy(this.getNode, this),
				getParent: $.proxy(this.getParent, this),
				getSiblings: $.proxy(this.getSiblings, this),
				getSelected: $.proxy(this.getSelected, this),
				getUnselected: $.proxy(this.getUnselected, this),
				getExpanded: $.proxy(this.getExpanded, this),
				getCollapsed: $.proxy(this.getCollapsed, this),
				getChecked: $.proxy(this.getChecked, this),
				getUnchecked: $.proxy(this.getUnchecked, this),
				getDisabled: $.proxy(this.getDisabled, this),
				getEnabled: $.proxy(this.getEnabled, this),

				// Select methods
				selectNode: $.proxy(this.selectNode, this),
				unselectNode: $.proxy(this.unselectNode, this),
				toggleNodeSelected: $.proxy(this.toggleNodeSelected, this),

				// Expand / collapse methods
				collapseAll: $.proxy(this.collapseAll, this),
				collapseNode: $.proxy(this.collapseNode, this),
				expandAll: $.proxy(this.expandAll, this),
				expandNode: $.proxy(this.expandNode, this),
				toggleNodeExpanded: $.proxy(this.toggleNodeExpanded, this),
				revealNode: $.proxy(this.revealNode, this),

				// Expand / collapse methods
				checkAll: $.proxy(this.checkAll, this),
				checkNode: $.proxy(this.checkNode, this),
				uncheckAll: $.proxy(this.uncheckAll, this),
				uncheckNode: $.proxy(this.uncheckNode, this),
				toggleNodeChecked: $.proxy(this.toggleNodeChecked, this),

				// Disable / enable methods
				disableAll: $.proxy(this.disableAll, this),
				disableNode: $.proxy(this.disableNode, this),
				enableAll: $.proxy(this.enableAll, this),
				enableNode: $.proxy(this.enableNode, this),
				toggleNodeDisabled: $.proxy(this.toggleNodeDisabled, this),

				// Search methods
				search: $.proxy(this.search, this),
				clearSearch: $.proxy(this.clearSearch, this)
			};
		};

		Tree.prototype.init = function (options) {

			this.tree = [];
			this.nodes = [];

			if (options.data) {
				if (typeof options.data === 'string') {
					options.data = $.parseJSON(options.data);
				}
				this.tree = $.extend(true, [], options.data);
				delete options.data;
			}
			this.options = $.extend({}, _default.settings, options);

			this.destroy();
			this.subscribeEvents();
			this.setInitialStates({ nodes: this.tree }, 0);
			this.render();
		};

		Tree.prototype.remove = function () {
			this.destroy();
			$.removeData(this, pluginName);
			$('#' + this.styleId).remove();
		};

		Tree.prototype.destroy = function () {

			if (!this.initialized) return;

			this.$wrapper.remove();
			this.$wrapper = null;

			// Switch off events
			this.unsubscribeEvents();

			// Reset this.initialized flag
			this.initialized = false;
		};

		Tree.prototype.unsubscribeEvents = function () {

			this.$element.off('click');
			this.$element.off('nodeChecked');
			this.$element.off('nodeCollapsed');
			this.$element.off('nodeDisabled');
			this.$element.off('nodeEnabled');
			this.$element.off('nodeExpanded');
			this.$element.off('nodeSelected');
			this.$element.off('nodeUnchecked');
			this.$element.off('nodeUnselected');
			this.$element.off('searchComplete');
			this.$element.off('searchCleared');
		};

		Tree.prototype.subscribeEvents = function () {

			this.unsubscribeEvents();

			this.$element.on('click', $.proxy(this.clickHandler, this));

			if (typeof (this.options.onNodeChecked) === 'function') {
				this.$element.on('nodeChecked', this.options.onNodeChecked);
			}

			if (typeof (this.options.onNodeCollapsed) === 'function') {
				this.$element.on('nodeCollapsed', this.options.onNodeCollapsed);
			}

			if (typeof (this.options.onNodeDisabled) === 'function') {
				this.$element.on('nodeDisabled', this.options.onNodeDisabled);
			}

			if (typeof (this.options.onNodeEnabled) === 'function') {
				this.$element.on('nodeEnabled', this.options.onNodeEnabled);
			}

			if (typeof (this.options.onNodeExpanded) === 'function') {
				this.$element.on('nodeExpanded', this.options.onNodeExpanded);
			}

			if (typeof (this.options.onNodeSelected) === 'function') {
				this.$element.on('nodeSelected', this.options.onNodeSelected);
			}

			if (typeof (this.options.onNodeUnchecked) === 'function') {
				this.$element.on('nodeUnchecked', this.options.onNodeUnchecked);
			}

			if (typeof (this.options.onNodeUnselected) === 'function') {
				this.$element.on('nodeUnselected', this.options.onNodeUnselected);
			}

			if (typeof (this.options.onSearchComplete) === 'function') {
				this.$element.on('searchComplete', this.options.onSearchComplete);
			}

			if (typeof (this.options.onSearchCleared) === 'function') {
				this.$element.on('searchCleared', this.options.onSearchCleared);
			}
		};

		/*
			Recurse the tree structure and ensure all nodes have
			valid initial states.  User defined states will be preserved.
			For performance we also take this opportunity to
			index nodes in a flattened structure
		*/
		Tree.prototype.setInitialStates = function (node, level) {

			if (!node.nodes) return;
			level += 1;

			var parent = node;
			var _this = this;
			$.each(node.nodes, function checkStates(index, node) {

				// nodeId : unique, incremental identifier
				node.nodeId = _this.nodes.length;

				// parentId : transversing up the tree
				node.parentId = parent.nodeId;

				// if not provided set selectable default value
				if (!node.hasOwnProperty('selectable')) {
					node.selectable = true;
				}

				// where provided we should preserve states
				node.state = node.state || {};

				// set checked state; unless set always false
				if (!node.state.hasOwnProperty('checked')) {
					node.state.checked = false;
				}

				// set enabled state; unless set always false
				if (!node.state.hasOwnProperty('disabled')) {
					node.state.disabled = false;
				}

				// set expanded state; if not provided based on levels
				if (!node.state.hasOwnProperty('expanded')) {
					if (!node.state.disabled &&
							(level < _this.options.levels) &&
							(node.nodes && node.nodes.length > 0)) {
						node.state.expanded = true;
					}
					else {
						node.state.expanded = false;
					}
				}

				// set selected state; unless set always false
				if (!node.state.hasOwnProperty('selected')) {
					node.state.selected = false;
				}

				// index nodes in a flattened structure for use later
				_this.nodes.push(node);

				// recurse child nodes and transverse the tree
				if (node.nodes) {
					_this.setInitialStates(node, level);
				}
			});
		};

		Tree.prototype.clickHandler = function (event) {

			if (!this.options.enableLinks) event.preventDefault();

			var target = $(event.target);
			var node = this.findNode(target);
			if (!node || node.state.disabled) return;
			
			var classList = target.attr('class') ? target.attr('class').split(' ') : [];
			if ((classList.indexOf('expand-icon') !== -1)) {

				this.toggleExpandedState(node, _default.options);
				this.render();
			}
			else if ((classList.indexOf('check-icon') !== -1)) {
				
				this.toggleCheckedState(node, _default.options);
				this.render();
			}
			else {
				
				if (node.selectable) {
					this.toggleSelectedState(node, _default.options);
				} else {
					this.toggleExpandedState(node, _default.options);
				}

				this.render();
			}
		};

		// Looks up the DOM for the closest parent list item to retrieve the
		// data attribute nodeid, which is used to lookup the node in the flattened structure.
		Tree.prototype.findNode = function (target) {

			var nodeId = target.closest('li.list-group-item').attr('data-nodeid');
			var node = this.nodes[nodeId];

			if (!node) {
				console.log('Error: node does not exist');
			}
			return node;
		};

		Tree.prototype.toggleExpandedState = function (node, options) {
			if (!node) return;
			this.setExpandedState(node, !node.state.expanded, options);
		};

		Tree.prototype.setExpandedState = function (node, state, options) {

			if (state === node.state.expanded) return;

			if (state && node.nodes) {

				// Expand a node
				node.state.expanded = true;
				if (!options.silent) {
					this.$element.trigger('nodeExpanded', $.extend(true, {}, node));
				}
			}
			else if (!state) {

				// Collapse a node
				node.state.expanded = false;
				if (!options.silent) {
					this.$element.trigger('nodeCollapsed', $.extend(true, {}, node));
				}

				// Collapse child nodes
				if (node.nodes && !options.ignoreChildren) {
					$.each(node.nodes, $.proxy(function (index, node) {
						this.setExpandedState(node, false, options);
					}, this));
				}
			}
		};

		Tree.prototype.toggleSelectedState = function (node, options) {
			if (!node) return;
			this.setSelectedState(node, !node.state.selected, options);
		};

		Tree.prototype.setSelectedState = function (node, state, options) {

			if (state === node.state.selected) return;

			if (state) {

				// If multiSelect false, unselect previously selected
				if (!this.options.multiSelect) {
					$.each(this.findNodes('true', 'g', 'state.selected'), $.proxy(function (index, node) {
						this.setSelectedState(node, false, options);
					}, this));
				}

				// Continue selecting node
				node.state.selected = true;
				if (!options.silent) {
					this.$element.trigger('nodeSelected', $.extend(true, {}, node));
				}
			}
			else {

				// Unselect node
				node.state.selected = false;
				if (!options.silent) {
					this.$element.trigger('nodeUnselected', $.extend(true, {}, node));
				}
			}
		};

		Tree.prototype.toggleCheckedState = function (node, options) {
			if (!node) return;
			this.setCheckedState(node, !node.state.checked, options);
		};

		Tree.prototype.setCheckedState = function (node, state, options) {

			if (state === node.state.checked) return;

			if (state) {

				// Check node
				node.state.checked = true;

				if (!options.silent) {
					this.$element.trigger('nodeChecked', $.extend(true, {}, node));
				}
			}
			else {

				// Uncheck node
				node.state.checked = false;
				if (!options.silent) {
					this.$element.trigger('nodeUnchecked', $.extend(true, {}, node));
				}
			}
		};

		Tree.prototype.setDisabledState = function (node, state, options) {

			if (state === node.state.disabled) return;

			if (state) {

				// Disable node
				node.state.disabled = true;

				// Disable all other states
				this.setExpandedState(node, false, options);
				this.setSelectedState(node, false, options);
				this.setCheckedState(node, false, options);

				if (!options.silent) {
					this.$element.trigger('nodeDisabled', $.extend(true, {}, node));
				}
			}
			else {

				// Enabled node
				node.state.disabled = false;
				if (!options.silent) {
					this.$element.trigger('nodeEnabled', $.extend(true, {}, node));
				}
			}
		};

		Tree.prototype.render = function () {

			if (!this.initialized) {

				// Setup first time only components
				this.$element.addClass(pluginName);
				this.$wrapper = $(this.template.list);

				this.injectStyle();

				this.initialized = true;
			}

			this.$element.empty().append(this.$wrapper.empty());

			// Build tree
			this.buildTree(this.tree, 0);
		};

		// Starting from the root node, and recursing down the
		// structure we build the tree one node at a time
		Tree.prototype.buildTree = function (nodes, level) {

			if (!nodes) return;
			level += 1;

			var _this = this;
			$.each(nodes, function addNodes(id, node) {

				var treeItem = $(_this.template.item)
					.addClass('node-' + _this.elementId)
					.addClass(node.state.checked ? 'node-checked' : '')
					.addClass(node.state.disabled ? 'node-disabled': '')
					.addClass(node.state.selected ? 'node-selected' : '')
					.addClass(node.searchResult ? 'search-result' : '') 
					.attr('data-nodeid', node.nodeId)
					.attr('style', _this.buildStyleOverride(node));

				// Add indent/spacer to mimic tree structure
				for (var i = 0; i < (level - 1); i++) {
					treeItem.append(_this.template.indent);
				}

				// Add expand, collapse or empty spacer icons
				var classList = [];
				if (node.nodes) {
					classList.push('expand-icon');
					if (node.state.expanded) {
						classList.push(_this.options.collapseIcon);
					}
					else {
						classList.push(_this.options.expandIcon);
					}
				}
				else {
					classList.push(_this.options.emptyIcon);
				}

				treeItem
					.append($(_this.template.icon)
						.addClass(classList.join(' '))
					);


				// Add node icon
				if (_this.options.showIcon) {
					
					var classList = ['node-icon'];

					classList.push(node.icon || _this.options.nodeIcon);
					if (node.state.selected) {
						classList.pop();
						classList.push(node.selectedIcon || _this.options.selectedIcon || 
										node.icon || _this.options.nodeIcon);
					}

					treeItem
						.append($(_this.template.icon)
							.addClass(classList.join(' '))
						);
				}

				// Add check / unchecked icon
				if (_this.options.showCheckbox) {

					var classList = ['check-icon'];
					if (node.state.checked) {
						classList.push(_this.options.checkedIcon); 
					}
					else {
						classList.push(_this.options.uncheckedIcon);
					}

					treeItem
						.append($(_this.template.icon)
							.addClass(classList.join(' '))
						);
				}

				// Add text
				if (_this.options.enableLinks) {
					// Add hyperlink
					treeItem
						.append($(_this.template.link)
							.attr('href', node.href)
							.append(node.text)
						);
				}
				else {
					// otherwise just text
					treeItem
						.append(node.text);
				}

				// Add tags as badges
				if (_this.options.showTags && node.tags) {
					$.each(node.tags, function addTag(id, tag) {
						treeItem
							.append($(_this.template.badge)
								.append(tag)
							);
					});
				}

				// Add item to the tree
				_this.$wrapper.append(treeItem);

				// Recursively add child ndoes
				if (node.nodes && node.state.expanded && !node.state.disabled) {
					return _this.buildTree(node.nodes, level);
				}
			});
		};

		// Define any node level style override for
		// 1. selectedNode
		// 2. node|data assigned color overrides
		Tree.prototype.buildStyleOverride = function (node) {

			if (node.state.disabled) return '';

			var color = node.color;
			var backColor = node.backColor;

			if (this.options.highlightSelected && node.state.selected) {
				if (this.options.selectedColor) {
					color = this.options.selectedColor;
				}
				if (this.options.selectedBackColor) {
					backColor = this.options.selectedBackColor;
				}
			}

			if (this.options.highlightSearchResults && node.searchResult && !node.state.disabled) {
				if (this.options.searchResultColor) {
					color = this.options.searchResultColor;
				}
				if (this.options.searchResultBackColor) {
					backColor = this.options.searchResultBackColor;
				}
			}

			return 'color:' + color +
				';background-color:' + backColor + ';';
		};

		// Add inline style into head
		Tree.prototype.injectStyle = function () {

			if (this.options.injectStyle && !document.getElementById(this.styleId)) {
				$('<style type="text/css" id="' + this.styleId + '"> ' + this.buildStyle() + ' </style>').appendTo('head');
			}
		};

		// Construct trees style based on user options
		Tree.prototype.buildStyle = function () {

			var style = '.node-' + this.elementId + '{';

			if (this.options.color) {
				style += 'color:' + this.options.color + ';';
			}

			if (this.options.backColor) {
				style += 'background-color:' + this.options.backColor + ';';
			}

			if (!this.options.showBorder) {
				style += 'border:none;';
			}
			else if (this.options.borderColor) {
				style += 'border:1px solid ' + this.options.borderColor + ';';
			}
			style += '}';

			if (this.options.onhoverColor) {
				style += '.node-' + this.elementId + ':not(.node-disabled):hover{' +
					'background-color:' + this.options.onhoverColor + ';' +
				'}';
			}

			return this.css + style;
		};

		Tree.prototype.template = {
			list: '<ul class="list-group"></ul>',
			item: '<li class="list-group-item"></li>',
			indent: '<span class="indent"></span>',
			icon: '<span class="icon"></span>',
			link: '<a href="#" style="color:inherit;"></a>',
			badge: '<span class="badge"></span>'
		};

		Tree.prototype.css = '.treeview .list-group-item{cursor:pointer}.treeview span.indent{margin-left:10px;margin-right:10px}.treeview span.icon{width:12px;margin-right:5px}.treeview .node-disabled{color:silver;cursor:not-allowed}'


		/**
			Returns a single node object that matches the given node id.
			@param {Number} nodeId - A node's unique identifier
			@return {Object} node - Matching node
		*/
		Tree.prototype.getNode = function (nodeId) {
			return this.nodes[nodeId];
		};

		/**
			Returns the parent node of a given node, if valid otherwise returns undefined.
			@param {Object|Number} identifier - A valid node or node id
			@returns {Object} node - The parent node
		*/
		Tree.prototype.getParent = function (identifier) {
			var node = this.identifyNode(identifier);
			return this.nodes[node.parentId];
		};

		/**
			Returns an array of sibling nodes for a given node, if valid otherwise returns undefined.
			@param {Object|Number} identifier - A valid node or node id
			@returns {Array} nodes - Sibling nodes
		*/
		Tree.prototype.getSiblings = function (identifier) {
			var node = this.identifyNode(identifier);
			var parent = this.getParent(node);
			var nodes = parent ? parent.nodes : this.tree;
			return nodes.filter(function (obj) {
					return obj.nodeId !== node.nodeId;
				});
		};

		/**
			Returns an array of selected nodes.
			@returns {Array} nodes - Selected nodes
		*/
		Tree.prototype.getSelected = function () {
			return this.findNodes('true', 'g', 'state.selected');
		};

		/**
			Returns an array of unselected nodes.
			@returns {Array} nodes - Unselected nodes
		*/
		Tree.prototype.getUnselected = function () {
			return this.findNodes('false', 'g', 'state.selected');
		};

		/**
			Returns an array of expanded nodes.
			@returns {Array} nodes - Expanded nodes
		*/
		Tree.prototype.getExpanded = function () {
			return this.findNodes('true', 'g', 'state.expanded');
		};

		/**
			Returns an array of collapsed nodes.
			@returns {Array} nodes - Collapsed nodes
		*/
		Tree.prototype.getCollapsed = function () {
			return this.findNodes('false', 'g', 'state.expanded');
		};

		/**
			Returns an array of checked nodes.
			@returns {Array} nodes - Checked nodes
		*/
		Tree.prototype.getChecked = function () {
			return this.findNodes('true', 'g', 'state.checked');
		};

		/**
			Returns an array of unchecked nodes.
			@returns {Array} nodes - Unchecked nodes
		*/
		Tree.prototype.getUnchecked = function () {
			return this.findNodes('false', 'g', 'state.checked');
		};

		/**
			Returns an array of disabled nodes.
			@returns {Array} nodes - Disabled nodes
		*/
		Tree.prototype.getDisabled = function () {
			return this.findNodes('true', 'g', 'state.disabled');
		};

		/**
			Returns an array of enabled nodes.
			@returns {Array} nodes - Enabled nodes
		*/
		Tree.prototype.getEnabled = function () {
			return this.findNodes('false', 'g', 'state.disabled');
		};


		/**
			Set a node state to selected
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.selectNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setSelectedState(node, true, options);
			}, this));

			this.render();
		};

		/**
			Set a node state to unselected
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.unselectNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setSelectedState(node, false, options);
			}, this));

			this.render();
		};

		/**
			Toggles a node selected state; selecting if unselected, unselecting if selected.
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.toggleNodeSelected = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.toggleSelectedState(node, options);
			}, this));

			this.render();
		};


		/**
			Collapse all tree nodes
			@param {optional Object} options
		*/
		Tree.prototype.collapseAll = function (options) {
			var identifiers = this.findNodes('true', 'g', 'state.expanded');
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setExpandedState(node, false, options);
			}, this));

			this.render();
		};

		/**
			Collapse a given tree node
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.collapseNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setExpandedState(node, false, options);
			}, this));

			this.render();
		};

		/**
			Expand all tree nodes
			@param {optional Object} options
		*/
		Tree.prototype.expandAll = function (options) {
			options = $.extend({}, _default.options, options);

			if (options && options.levels) {
				this.expandLevels(this.tree, options.levels, options);
			}
			else {
				var identifiers = this.findNodes('false', 'g', 'state.expanded');
				this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
					this.setExpandedState(node, true, options);
				}, this));
			}

			this.render();
		};

		/**
			Expand a given tree node
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.expandNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setExpandedState(node, true, options);
				if (node.nodes && (options && options.levels)) {
					this.expandLevels(node.nodes, options.levels-1, options);
				}
			}, this));

			this.render();
		};

		Tree.prototype.expandLevels = function (nodes, level, options) {
			options = $.extend({}, _default.options, options);

			$.each(nodes, $.proxy(function (index, node) {
				this.setExpandedState(node, (level > 0) ? true : false, options);
				if (node.nodes) {
					this.expandLevels(node.nodes, level-1, options);
				}
			}, this));
		};

		/**
			Reveals a given tree node, expanding the tree from node to root.
			@param {Object|Number|Array} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.revealNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				var parentNode = this.getParent(node);
				while (parentNode) {
					this.setExpandedState(parentNode, true, options);
					parentNode = this.getParent(parentNode);
				};
			}, this));

			this.render();
		};

		/**
			Toggles a nodes expanded state; collapsing if expanded, expanding if collapsed.
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.toggleNodeExpanded = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.toggleExpandedState(node, options);
			}, this));
			
			this.render();
		};


		/**
			Check all tree nodes
			@param {optional Object} options
		*/
		Tree.prototype.checkAll = function (options) {
			var identifiers = this.findNodes('false', 'g', 'state.checked');
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setCheckedState(node, true, options);
			}, this));

			this.render();
		};

		/**
			Check a given tree node
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.checkNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setCheckedState(node, true, options);
			}, this));

			this.render();
		};

		/**
			Uncheck all tree nodes
			@param {optional Object} options
		*/
		Tree.prototype.uncheckAll = function (options) {
			var identifiers = this.findNodes('true', 'g', 'state.checked');
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setCheckedState(node, false, options);
			}, this));

			this.render();
		};

		/**
			Uncheck a given tree node
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.uncheckNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setCheckedState(node, false, options);
			}, this));

			this.render();
		};

		/**
			Toggles a nodes checked state; checking if unchecked, unchecking if checked.
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.toggleNodeChecked = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.toggleCheckedState(node, options);
			}, this));

			this.render();
		};


		/**
			Disable all tree nodes
			@param {optional Object} options
		*/
		Tree.prototype.disableAll = function (options) {
			var identifiers = this.findNodes('false', 'g', 'state.disabled');
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setDisabledState(node, true, options);
			}, this));

			this.render();
		};

		/**
			Disable a given tree node
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.disableNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setDisabledState(node, true, options);
			}, this));

			this.render();
		};

		/**
			Enable all tree nodes
			@param {optional Object} options
		*/
		Tree.prototype.enableAll = function (options) {
			var identifiers = this.findNodes('true', 'g', 'state.disabled');
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setDisabledState(node, false, options);
			}, this));

			this.render();
		};

		/**
			Enable a given tree node
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.enableNode = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setDisabledState(node, false, options);
			}, this));

			this.render();
		};

		/**
			Toggles a nodes disabled state; disabling is enabled, enabling if disabled.
			@param {Object|Number} identifiers - A valid node, node id or array of node identifiers
			@param {optional Object} options
		*/
		Tree.prototype.toggleNodeDisabled = function (identifiers, options) {
			this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
				this.setDisabledState(node, !node.state.disabled, options);
			}, this));

			this.render();
		};


		/**
			Common code for processing multiple identifiers
		*/
		Tree.prototype.forEachIdentifier = function (identifiers, options, callback) {

			options = $.extend({}, _default.options, options);

			if (!(identifiers instanceof Array)) {
				identifiers = [identifiers];
			}

			$.each(identifiers, $.proxy(function (index, identifier) {
				callback(this.identifyNode(identifier), options);
			}, this));	
		};

		/*
			Identifies a node from either a node id or object
		*/
		Tree.prototype.identifyNode = function (identifier) {
			return ((typeof identifier) === 'number') ?
							this.nodes[identifier] :
							identifier;
		};

		/**
			Searches the tree for nodes (text) that match given criteria
			@param {String} pattern - A given string to match against
			@param {optional Object} options - Search criteria options
			@return {Array} nodes - Matching nodes
		*/
		Tree.prototype.search = function (pattern, options) {
			options = $.extend({}, _default.searchOptions, options);

			this.clearSearch({ render: false });

			var results = [];
			if (pattern && pattern.length > 0) {

				if (options.exactMatch) {
					pattern = '^' + pattern + '$';
				}

				var modifier = 'g';
				if (options.ignoreCase) {
					modifier += 'i';
				}

				results = this.findNodes(pattern, modifier);

				// Add searchResult property to all matching nodes
				// This will be used to apply custom styles
				// and when identifying result to be cleared
				$.each(results, function (index, node) {
					node.searchResult = true;
				})
			}

			// If revealResults, then render is triggered from revealNode
			// otherwise we just call render.
			if (options.revealResults) {
				this.revealNode(results);
			}
			else {
				this.render();
			}

			this.$element.trigger('searchComplete', $.extend(true, {}, results));

			return results;
		};

		/**
			Clears previous search results
		*/
		Tree.prototype.clearSearch = function (options) {

			options = $.extend({}, { render: true }, options);

			var results = $.each(this.findNodes('true', 'g', 'searchResult'), function (index, node) {
				node.searchResult = false;
			});

			if (options.render) {
				this.render();	
			}
			
			this.$element.trigger('searchCleared', $.extend(true, {}, results));
		};

		/**
			Find nodes that match a given criteria
			@param {String} pattern - A given string to match against
			@param {optional String} modifier - Valid RegEx modifiers
			@param {optional String} attribute - Attribute to compare pattern against
			@return {Array} nodes - Nodes that match your criteria
		*/
		Tree.prototype.findNodes = function (pattern, modifier, attribute) {

			modifier = modifier || 'g';
			attribute = attribute || 'text';

			var _this = this;
			return $.grep(this.nodes, function (node) {
				var val = _this.getNodeValue(node, attribute);
				if (typeof val === 'string') {
					return val.match(new RegExp(pattern, modifier));
				}
			});
		};

		/**
			Recursive find for retrieving nested attributes values
			All values are return as strings, unless invalid
			@param {Object} obj - Typically a node, could be any object
			@param {String} attr - Identifies an object property using dot notation
			@return {String} value - Matching attributes string representation
		*/
		Tree.prototype.getNodeValue = function (obj, attr) {
			var index = attr.indexOf('.');
			if (index > 0) {
				var _obj = obj[attr.substring(0, index)];
				var _attr = attr.substring(index + 1, attr.length);
				return this.getNodeValue(_obj, _attr);
			}
			else {
				if (obj.hasOwnProperty(attr)) {
					return obj[attr].toString();
				}
				else {
					return undefined;
				}
			}
		};

		var logError = function (message) {
			if (window.console) {
				window.console.error(message);
			}
		};

		// Prevent against multiple instantiations,
		// handle updates and method calls
		$.fn[pluginName] = function (options, args) {

			var result;

			this.each(function () {
				var _this = $.data(this, pluginName);
				if (typeof options === 'string') {
					if (!_this) {
						logError('Not initialized, can not call method : ' + options);
					}
					else if (!$.isFunction(_this[options]) || options.charAt(0) === '_') {
						logError('No such method : ' + options);
					}
					else {
						if (!(args instanceof Array)) {
							args = [ args ];
						}
						result = _this[options].apply(_this, args);
					}
				}
				else if (typeof options === 'boolean') {
					result = _this;
				}
				else {
					$.data(this, pluginName, new Tree(this, $.extend(true, {}, options)));
				}
			});

			return result || this;
		};

	})(jQuery, window, document);


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Table
	 */

	(function ($) {

	    $.widget("gtui.verticaltile", {
	        options: {
	            
	        },
	        _create: function () {
	            this._updateHeight();

	            this._initEvents();
	        },
	        _updateHeight: function (e) {
	            var _self = this,
	                _el = _self.element,
	                _window = window;

	            var _top = _el.position().top,
	                _docHeight = document.documentElement.clientHeight,
	                _offsetBottom = Math.max(document.body.clientHeight, $('html').outerHeight()) - _top - _el.height();

	            if (_top >= _docHeight - _offsetBottom) { }
	            else {
	                _el.outerHeight(_docHeight - _offsetBottom - _top);
	                _self._docClientHeight = _docHeight;

	                _el.trigger('resize', e);
	            }
	        },
	        _initEvents: function () {
	            $(window)
	                .off('resize' + this.eventNamespace)
	                .on('resize' + this.eventNamespace, this, function (e) {
	                    if (e.data._docClientHeight !== document.documentElement.clientHeight)
	                        e.data._updateHeight(e);
	                    else if (e.data._docClientWidth !== document.documentElement.clientWidth) {
	                        e.data._docClientWidth = document.documentElement.clientWidth;
	                        e.data.element.trigger('resize', e);
	                    }
	                });
	        },
	        _destory: function e() {
	            $(window).off('resize' + this.eventNamespace);
	        }
	    });
	})(jQuery);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	if (window.angular) {
	    // This file is the first of the files of the angular supported files.
	    // So here module will be defined once.
	    var gta = angular.module('gtui', []);

	    __webpack_require__(14);
	    __webpack_require__(18);
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// Core
	__webpack_require__(15);

	// Directives
	__webpack_require__(16);
	__webpack_require__(17);

/***/ },
/* 15 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        var constants = function () {
	            return {
	                FIELD: 'Field',
	                CONVERT_AS: 'controllerAs'
	            };
	        }();

	        var _ajax = function (url, data, successCallback, errorCallback, isAsync) {
	            if (!errorCallback) {
	                errorCallback = function (data, status, config, statusText) {
	                    console.error(data);
	                };
	            }

	            $.ajax({
	                type: 'post',
	                url: url,
	                contentType: "application/x-www-form-urlencoded",
	                //contentType: "application/json",
	                //contentType: "text/json",
	                //contentType: "application/json; charset=utf-8",
	                data: 'jData=' + JSON.stringify(data),
	                async: isAsync,
	                dataType: 'json',
	                success: function (d, s, r) {
	                    d = angular.fromJson(d);
	                    successCallback.apply(this, arguments);
	                },
	                error: function (d, s, r) {
	                    d = angular.fromJson(d);
	                    errorCallback.apply(this, arguments);
	                }
	            });
	        };

	        gta.service('_$utils', function ($parse, $http) {
	            var _serv = {
	                getConfig: function (attrs, configAttr) {
	                    if (!configAttr) {
	                        configAttr = 'config';
	                    }

	                    return $parse(attrs[configAttr])();
	                },
	                getValueByName: function (scope, config, name) {
	                    return config[constants.CONVERT_AS] ?
	                        scope[config[constants.CONVERT_AS]][name] :
	                        scope[name];
	                },
	                getFieldValueByName: function (scope, config, name) {
	                    var targetFiled = name + constants.FIELD;

	                    return config[constants.CONVERT_AS] ?
	                        scope[config[constants.CONVERT_AS]][config[targetFiled]] :
	                        scope[config[targetFiled]];
	                },
	                getFieldStringByName: function (config, name) {
	                    var targetFiled = name + constants.FIELD;

	                    return config[constants.CONVERT_AS] ?
	                        (config[constants.CONVERT_AS] + '.' + config[targetFiled]) :
	                        config[targetFiled];
	                },
	                getPropertyValueByName: function (scope, config, name) {
	                    return config[constants.CONVERT_AS] ?
	                        scope[config[constants.CONVERT_AS]][config[name]] :
	                        scope[config[name]];
	                },

	                setPropertyValueByName: function (scope, config, name, value) {
	                    if (config[constants.CONVERT_AS])
	                        scope[config[constants.CONVERT_AS]][config[name]] = value;
	                    else
	                        scope[config[name]] = value;
	                },

	                uuid: function () {
	                    var s = [],
	                        hexDigits = "0123456789abcdef";

	                    for (var i = 0; i < 36; i++) {
	                        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	                    }

	                    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	                    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	                    s[8] = s[13] = s[18] = s[23] = "-";

	                    return s.join("");
	                },

	                post: function (url, data, successCallback, errorCallback) {
	                    _ajax(url, data, successCallback, errorCallback, true);
	                },
	                postSync: function (url, data, successCallback, errorCallback) {
	                    _ajax(url, data, successCallback, errorCallback, false);
	                }
	            }

	            return _serv;
	        });
	    }
	})(jQuery);

/***/ },
/* 16 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular && window.echarts) {
	        var gta = angular.module('gtui');

	        gta.service('_$echart', ['$parse', function ($parse) {
	            var _serv = {
	                
	            }

	            return _serv;
	        }]);
	    }
	})(jQuery);

/***/ },
/* 17 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        gta.service('_$pager', function ($parse) {
	            var _serv = {
	                getPageCount: function (itemsCount, displayCount) {
	                    return Math.ceil(itemsCount / displayCount);
	                }
	            }

	            return _serv;
	        });
	    }
	})(jQuery);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Core
	__webpack_require__(19);

	// Directives
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	__webpack_require__(28);
	__webpack_require__(29);
	__webpack_require__(30);
	__webpack_require__(31);
	__webpack_require__(32);
	__webpack_require__(33);
	__webpack_require__(34);
	__webpack_require__(35);

/***/ },
/* 19 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        // TODO: Here is some core functions.
	    }
	})(jQuery);

/***/ },
/* 20 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular && window.echarts) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiDatepicker', function (_$utils, _$echart) {
	            var DIV = '<div></div>',
	                INPUT = '<input />',
	                SPAN = '<span></span>';

	            var _getRangeTemplate = function (config) {
	                var _outerDiv = $(DIV).addClass('input-daterange input-group'),
	                    _startInput = $(INPUT).attr({ type: 'text', 'ng-module': _$utils.getFieldStringByName(config, 'start') }).addClass('form-control'),
	                    _addon = $(SPAN).addClass('input-group-addon').text('-'),
	                    _endInput = $(INPUT).attr({ type: 'text', 'ng-module': _$utils.getFieldStringByName(config, 'end') }).addClass('form-control');

	                _outerDiv
	                    .append(_startInput)
	                    .append(_addon)
	                    .append(_endInput);

	                return _outerDiv[0].outerHTML;
	            };
	            var _getDefaultTemplate = function (config) {
	                _getRangeTemplate();
	            };

	            return {
	                restrict: 'EA',
	                template: function (element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                    switch (_config.type) {
	                        case 'date-range':
	                            return _getRangeTemplate(_config);
	                        default:
	                            return _getDefaultTemplate(_config);
	                    }
	                },
	                replace: true,
	                link: function link(scope, element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                    $(document).ready(function () {
	                        element.datepicker({
	                            format: "yyyy-mm-dd",
	                            language: "zh-CN",
	                            autoclose: true,
	                            todayHighlight: true
	                        });
	                    });
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 21 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular && window.echarts) {
	        var gta = angular.module('gtui'),
	            CHART_THEME = 'macarons';

	        gta.directive('gtuiEchart', function (_$utils, _$echart) {

	            return {
	                restrict: 'EA',
	                link: function link(scope, element, attrs) {
	                    if (element.css('min-height') === '0px') {
	                        element.css({ 'min-height': 1 });
	                    }

	                    var _chart = echarts.init(element[0], CHART_THEME),
	                        _config = _$utils.getConfig(attrs);

	                    $(document).ready(function () {
	                        var _option = _$utils.getFieldValueByName(scope, _config, 'option');

	                        if (angular.isObject(_option)) {
	                            _chart.setOption(_option);
	                        }
	                    });

	                    element.closest('[gtui-vertical-tile]').on('resize', { element: element, config: _config, chart: _chart }, function (e) {
	                        e.data.chart.resize();
	                    });

	                    scope.$watch((_config.controllerAs ? (_config.controllerAs + '.') : '') + _config.optionField, function (n, o, scope) {
	                        if (n != o) {
	                            var _config = _$utils.getConfig(attrs),
	                                _option = _$utils.getFieldValueByName(scope, _config, 'option');

	                            _chart.setOption(_option);
	                        }
	                    }, true);

	                    $(window).on('resize', _chart, function (e) {
	                        e.data.resize();
	                    });
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 22 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular && window.echarts) {
	        var gta = angular.module('gtui'),
	            
	            DIV = '<div></div>',
	            
	            ROW_CLASS = 'row',
	            COLUMN_CLASS = 'col-lg-4 col-md-6 col-sm-6';

	        gta.directive('gtuiGrid', function (_$utils, _$echart) {

	            return {
	                restrict: 'EA',
	                template: function (element, attrs) {
	                    var _columns = element.children('[gtui-column], .gtui-column, gtui-column');

	                    var _row = $(DIV).addClass(ROW_CLASS);

	                    for (var i = 0, length = _columns.length; i < length; i++) {
	                        var _col = $(DIV).addClass(COLUMN_CLASS);

	                        _row.append(_col.append(_columns[i]));
	                    }

	                    return _row[0].outerHTML;
	                },
	                replace: true,
	                link: function link(scope, element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                    
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 23 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular && window.echarts) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiInput', function (_$utils, _$echart) {
	            var INPUT = '<input />';

	            var _getTemplate = function (config, attrs) {
	                var _input = $(INPUT).attr({ type: 'text' });

	                if (attrs.disalbed) {
	                    _input.attr('disabled', 'disabled');
	                }

	                return _input[0].outerHTML;
	            };

	            return {
	                restrict: 'EA',
	                template: function (element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                    return _getTemplate(_config, attrs);
	                },
	                replace: true,
	                link: function link(scope, element, attrs) {
	                    var _config = _$utils.getConfig(attrs);
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 24 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular && window.echarts) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiInputGroup', function (_$utils, _$echart) {
	            var DIV = '<div></div>',
	                INPUT = '<input />',
	                SPAN = '<span></span>';

	            var _getTemplate = function (config) {
	                var _outerDiv = $(DIV).addClass('input-group'),
	                    _startInput = $(INPUT).attr({ type: 'text' }).addClass('form-control'),
	                    _addon = $(SPAN).addClass('input-group-addon').text('-'),
	                    _endInput = $(INPUT).attr({ type: 'text' }).addClass('form-control');

	                _outerDiv
	                    .append(_startInput)
	                    .append(_addon)
	                    .append(_endInput);

	                return _outerDiv[0].outerHTML;
	            };

	            return {
	                restrict: 'EA',
	                template: function (element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                    return _getTemplate(_config);
	                },
	                replace: true,
	                link: function link(scope, element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 25 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiModal', function (_$utils) {
	            var _BUTTON_HTML = '<button></button>',
	                _DIV_HTML = '<div></div>';

	            var defaultConfig = function () {
	                return { };
	            }();

	            var _getTemplate = function (el, config) {
	                var _template = [],
	                    _modalId = _$utils.uuid(),
	                    _titleId = _$utils.uuid();

	                _template.push('<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog">');
	                _template.push('  <div class="modal-dialog" role="document">');
	                _template.push('    <div class="modal-content">');
	                _template.push('      <div class="modal-header">');
	                _template.push('        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
	                _template.push('        <div class="modal-title h4"></div>');
	                _template.push('      </div>');
	                _template.push('    <div class="modal-body">');
	                _template.push('    </div>');
	                _template.push('    <div class="modal-footer">');
	                //_template.push('      <button type="button" class="btn btn-sm" ></button>');
	                _template.push('    </div>');
	                _template.push('  </div>');
	                _template.push('</div>');

	                var _temp$ = $(_template.join('')).attr({ 'id': _modalId, 'aria-labelledby': _titleId });

	                _temp$.find('.modal-title').attr('id', _titleId).html(el.children('.modal-title').html());
	                _temp$.find('.modal-body').html(el.children('.modal-body').html());

	                return _temp$.prop('outerHTML');
	            };

	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                    $.extend(defaultConfig, _config, true);

	                    return _getTemplate(element, _config);
	                },
	                replace: true,
	                transclude: false,
	                link: function (scope, element, attrs) {
	                    var _config = _$utils.getConfig(attrs),
	                        _trigger = $(_config.trigger),
	                        _id = element.attr('id');

	                    _trigger.on('click', element, function (e) {
	                        e.data.modal('show')
	                    });

	                    $(document).ready(function () {
	                        element.modal({
	                            backdrop: 'static',
	                            show: false
	                        });
	                    });

	                    var _buttonConfig = _$utils.getFieldValueByName(scope, _config, 'actions'),
	                        _footer = element.find('.modal-footer');
	                    for (var i = 0, length = _buttonConfig.length; i < length; i++) {
	                        var _button = $(_BUTTON_HTML).addClass('btn btn-sm').attr('type', 'button').html(_buttonConfig[i].content);

	                        if (_buttonConfig[i].type === 'close') _button.attr('data-dismiss', 'modal');
	                        if (_buttonConfig[i].type === 'primary') _button.addClass('btn-primary');
	                        else _button.addClass('btn-default');

	                        _footer.append(_button);
	                    }

	                    element.on('click', '.modal-footer button', { config: _config, scope: scope, btnConfig: _buttonConfig, modal: element }, function (e) {
	                        var _target = $(e.target).closest('button'),
	                            _index = _target.index(),
	                            _btnConfig = e.data.btnConfig,
	                            _scope = e.data.scope,
	                            _config = e.data.config,
	                            _click = _btnConfig[_index].click;

	                        if (_click) {
	                            if (typeof (_click) !== 'function') {
	                                _click = _$utils.getValueByName(_scope, _config, _click);
	                            }

	                            var _closeFlag = _click.apply(this, [e]);

	                            if (_closeFlag) e.data.modal.modal('hide');
	                        }
	                    });
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 26 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui'),

	            _DIV_HTML = '<div></div>',
	            _UL_HTML = '<ul></ul>',
	            _LI_HTML = '<li></li>',
	            _A_HTML = '<a></a>',
	            _SPAN_HTML = '<span></span>',

	            ACTION_CLASS = 'action',

	            _FIRST_CLASS = ACTION_CLASS + ' first',
	            _PREVIOUS_GOUP_CLASS = ACTION_CLASS + ' prev-group',
	            _PREVIOUS_CLASS = ACTION_CLASS + ' previous',
	            _NEXT_CLASS = ACTION_CLASS + ' next',
	            _NEXT_GROUP_CLASS = ACTION_CLASS + ' next-group',
	            _LAST_CLASS = ACTION_CLASS + ' last',
	                
	            _MAX_PAGES = 9;

	        gta.directive('gtuiPager', function (_$utils) {

	            var _getTemplate = function (el, config) {
	                // Template outer element
	                var _div = $(_DIV_HTML);

	                var _ul = $(_UL_HTML).addClass('pagination');

	                var _firstLi = $(_LI_HTML).append($(_A_HTML).attr('href', 'javascript: void(0);').append($(_SPAN_HTML).text('首页').addClass(_FIRST_CLASS)));
	                var _prevGoupLi = $(_LI_HTML).append($(_A_HTML).attr('href', 'javascript: void(0);').append($(_SPAN_HTML).text('前一组').addClass(_PREVIOUS_GOUP_CLASS)));
	                var _prevLi = $(_LI_HTML).append($(_A_HTML).attr('href', 'javascript: void(0);').append($(_SPAN_HTML).text('前一页').addClass(_PREVIOUS_CLASS)));

	                var _itemsLi = $(_LI_HTML).attr({
	                    'ng-repeat': '__item__ in ' + (config.converAs ? config.converAs + '.__pager__.__items__' : '__pager__.__items__'),
	                    'ng-class': '{ active: __item__ === ' + config.controllerAs + '.' + config.selectedField + ' }'
	                })
	                    .append($(_A_HTML).attr({ 'ng-bind': '__item__', 'href': 'javascript: void(0);' }));

	                var _nextLi = $(_LI_HTML).append($(_A_HTML).attr('href', 'javascript: void(0);').append($(_SPAN_HTML).text('下一页').addClass(_NEXT_CLASS)));
	                var _nextGoupLi = $(_LI_HTML).append($(_A_HTML).attr('href', 'javascript: void(0);').append($(_SPAN_HTML).text('下一组').addClass(_NEXT_GROUP_CLASS)));
	                var _latLi = $(_LI_HTML).append($(_A_HTML).attr('href', 'javascript: void(0);').append($(_SPAN_HTML).text('末页').addClass(_LAST_CLASS)));

	                _div.append(
	                    _ul.append(_firstLi)
	                        .append(_prevGoupLi)
	                        .append(_prevLi)
	                        .append(_itemsLi)
	                        .append(_nextLi)
	                        .append(_nextGoupLi)
	                        .append(_latLi)
	                );

	                return _div.prop('outerHTML');
	            };

	            /**
	             * 根据selectedPage与totalPages两个参数生成能够显示的可选页集合。
	             * selectedPage: 当前选中页
	             * totalPages: 当前总页数
	             */
	            var _getPages = function (selectedPage, totalPages) {
	                if ((typeof (selectedPage) === 'undefined' || isNaN(selectedPage)) || (typeof (totalPages) === 'undefined' || isNaN(totalPages))) {
	                    console.error('gtui-pager: Make sure the selcted page and total pages are existed and they are numbers. ');
	                }

	                var _maxPage = _MAX_PAGES,
	                    _half = parseInt(_maxPage / 2),
	                    _startPage, _endPage,
	                    _items = [];

	                _endPage = selectedPage + _half > totalPages ? totalPages : selectedPage + _half;
	                _startPage = _endPage - _maxPage + 1;
	                _startPage = _startPage < 1 ? 1 : _startPage;
	                _endPage = _startPage + _maxPage - 1 > totalPages ? totalPages : _startPage + _maxPage - 1;

	                while (_startPage <= _endPage) {
	                    _items.push(_startPage);
	                    _startPage++;
	                }

	                return _items;
	            };

	            /**
	             * 该事件会在该控件中的a标签的click事件触发。
	             * 在该事件中，会更新当前的选中页。进而，会触发selectedField的$watch事件。
	             */
	            var _itemClick = function (e) {
	                var _$target = $(e.target),
	                    _el = _$target.closest('.' + ACTION_CLASS),
	                    _config = e.data.scope().$eval(e.data.attr('data-config')),
	                    _scope = e.data.scope(),
	                    _vm = _scope[_config.controllerAs];

	                _vm = _vm ? _vm : _scope;

	                if (!_el[0]) {
	                    _el = _$target.find('.' + ACTION_CLASS);

	                    if (!_el[0]) {
	                        _el = _$target.closest('a')
	                    }
	                }

	                if (_el.hasClass(_FIRST_CLASS)) {
	                    _vm[_config.selectedField] = 1;
	                }
	                else if (_el.hasClass(_PREVIOUS_GOUP_CLASS)) {
	                    if (_vm[_config.selectedField] > _MAX_PAGES) {
	                        _vm[_config.selectedField] = _vm[_config.selectedField] - _MAX_PAGES;
	                    }
	                    else {
	                        _vm[_config.selectedField] = 1;
	                    }
	                }
	                else if (_el.hasClass(_PREVIOUS_CLASS)) {
	                    if (_vm[_config.selectedField] !== 1) {
	                        _vm[_config.selectedField]--;
	                    }
	                }
	                else if (_el.hasClass(_NEXT_CLASS)) {
	                    if (_vm[_config.selectedField] !== _vm[_config.totalField]) {
	                        _vm[_config.selectedField]++;
	                    }
	                }
	                else if (_el.hasClass(_NEXT_GROUP_CLASS)) {
	                    if (_vm[_config.selectedField] <= _vm[_config.totalField] - _MAX_PAGES) {
	                        _vm[_config.selectedField] = _vm[_config.selectedField] + _MAX_PAGES;
	                    }
	                    else {
	                        _vm[_config.selectedField] = _vm[_config.totalField];
	                    }
	                }
	                else if (_el.hasClass(_LAST_CLASS)) {
	                    _vm[_config.selectedField] = _vm[_config.totalField];
	                }
	                else {
	                    _vm[_config.selectedField] = parseInt(_el.text());
	                }
	                _scope.$apply();
	            };

	            var _selectedPageChanged = function (config) {
	                return function (newValue, oldValue, scope) {
	                    if (newValue !== oldValue) {
	                        var _scope = config.converAs ? scope[config.converAs] : scope;

	                        _scope.__pager__.__items__ = _getPages(_$utils.getFieldValueByName(scope, config, 'selected'),
	                            _$utils.getFieldValueByName(scope, config, 'total'));

	                        _scope.$emit('change.gtui.pager', { newValue: newValue, oldValue: oldValue, scope: scope});
	                    }
	                }
	            };
	            var _pageCounChanged = function (config) {
	                return function (newValue, oldValue, scope) {
	                    if (newValue !== oldValue) {
	                        var _scope = config.converAs ? scope[config.converAs] : scope;

	                        _scope.__pager__.__items__ = _getPages(_$utils.getFieldValueByName(scope, config, 'selected'),
	                            _$utils.getFieldValueByName(scope, config, 'total'));
	                    }
	                }
	            };

	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    // Deal with data-config
	                    if (!attrs.config) {
	                        console.error('gtui-pager: "data-config" attribute is missing.');
	                        return _DIV_HTML;
	                    }
	                    else {
	                        var _config = _$utils.getConfig(attrs);
	                    }

	                    return _getTemplate(element, _config);
	                },
	                replace: true,
	                transclude: false,
	                link: function (scope, element, attrs) {
	                    var _config = _$utils.getConfig(attrs),
	                        _scope = scope;

	                    var _selectedIndex = _$utils.getFieldValueByName(scope, _config, 'selected');
	                    var _total = _$utils.getFieldValueByName(scope, _config, 'total');
	                    _scope.__pager__ = {};
	                    _scope.__pager__.__items__ = _getPages(_selectedIndex, _total);
	                    _scope.__pager__.__config__ = _config;

	                    element.on('click', 'a', element, _itemClick);

	                    scope.$watch(_$utils.getFieldStringByName( _config, 'selected'), _selectedPageChanged(_config));
	                    scope.$watch(_$utils.getFieldStringByName(_config, 'total'), _pageCounChanged(_config));
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 27 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui'),
	            _DIV = '<div></div>';

	        gta.directive('gtuiPanelSearch', function (_$utils) {
	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    // Deal with data-config
	                    var _config = _$utils.getConfig(attrs);

	                    var _template = [];

	                    _template.push('<div class="panel panel-primary">');
	                    _template.push('  <div class="panel-heading">');
	                    _template.push('    <span class="glyphicon glyphicon-chevron-up"></span>');
	                    _template.push('    {{' + _$utils.getFieldStringByName(_config, 'title') + '}}');
	                    _template.push('  </div>');
	                    _template.push('  <div class="panel-body" ng-transclude>');
	                    _template.push('  </div>');
	                    _template.push('</div>');

	                    return _template.join('');
	                },
	                replace: true,
	                transclude: true,
	                link: function (scope, element, attrs) {
	                    element.children('.panel-heading').css({ cursor: 'pointer' }).on('click.gtui.panelsearch', element, function (e) {
	                        //e.data.find('> .panel-heading > .glyphicon').toggleClass('glyphicon-chevron-down');
	                        //e.data.children('.panel-body').toggle();
	                    });
	                }
	            };
	        });

	        gta.directive('gtuiPanelContent', function (_$utils) {
	            var _getTemplate = function (element, config) {
	                var _div$ = $(_DIV).addClass('panel panel-primary'),
	                    _headerDiv$ = $(_DIV).addClass('panel-heading'),
	                    _contentDiv$ = $(_DIV).addClass('panel-body'),
	                    _tableDiv$ = $(_DIV).addClass('panel-table'),
	                    _footerDiv$ = $(_DIV).addClass('panel-footer');

	                var _headerTemplate = element.children('[gtui-panel-header]'),
	                    _contentTemplate = element.children('[gtui-panel-content]'),
	                    _tableTemplate = element.children('[gtui-panel-table]'),
	                    _footerTemplate = element.children('[gtui-panel-footer]');

	                _div$.append(
	                        _headerDiv$.append(_headerTemplate.html())
	                    )
	                if (_contentTemplate.length > 0) {
	                    _div$.append(
	                        _contentDiv$.append(_contentTemplate.html())
	                    )
	                }
	                if (_tableTemplate.length > 0) {
	                    _div$.append(
	                        _tableDiv$.append(_tableTemplate.html())
	                    );
	                }
	                if (_footerTemplate.length > 0) {
	                    _div$.append(
	                        _footerDiv$.append(_footerTemplate.html())
	                    );
	                }

	                return _div$.prop('outerHTML');
	            };

	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                    return _getTemplate(element, _config);
	                },
	                replace: true,
	                link: function (scope, element, attrs) {
	                    
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 28 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular && window.echarts) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiSelect', function (_$utils, _$echart) {
	            var _SELECT = '<select></select>';

	            var _getTemplate = function (config) {
	                var select = $(_SELECT)
	                    .addClass('form-control')
	                    .attr({
	                        'ng-model': _$utils.getFieldStringByName(config, 'selected'),
	                        'ng-options': config.displayField ? 
	                            'm.' + config.displayField + ' for m in ' + _$utils.getFieldStringByName(config, 'optionItems') :
	                            'm for m in ' + _$utils.getFieldStringByName(config, 'optionItems')
	                    });

	                return select[0].outerHTML;
	            };

	            return {
	                restrict: 'EA',
	                template: function (element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                    return _getTemplate(_config);
	                },
	                replace: true,
	                link: function link(scope, element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 29 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiTab', function (_$utils) {
	            var DIV = '<div></div>',
	                UL = '<ul></ul>',
	                LI = '<li></li>',
	                A = '<a></a>';

	            var TAB_CLASS = 'tabs',
	                UL_CLASS = 'nav nav-tabs';

	            var _getTemplate = function (el, config) {
	                var _div$ = $(DIV).addClass(TAB_CLASS),
	                    _ul$ = $(UL).addClass(UL_CLASS).attr({ role: 'tablist' }),
	                    _li$ = $(LI).attr({
	                        'ng-class': '{ active: $index === ' + _$utils.getFieldStringByName(config, 'selected') + ' }',
	                        'aria-selected': '$index === ' + _$utils.getFieldStringByName(config, 'selected'),
	                        'ng-repeat': 'item in ' + _$utils.getFieldStringByName(config, 'tabItems'),
	                        role: 'tab',
	                        tabindex: '{{$index === ' + _$utils.getFieldStringByName(config, 'selected') + ' ? 0 : -1}}',
	                        'aria-controls': '{{item.' + config.panelIdField + '}}'
	                    }),
	                    _a$ = $(A).attr({
	                        'ng-bind': 'item.' + config['headerContentField'],
	                        tabindex: -1,
	                        href: '#'
	                    });

	                return _div$.append(_ul$.append(_li$.append(_a$))).append(el.children());
	            };

	            return {
	                restrict: "AE",
	                template: function (element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                    return _getTemplate(element, _config).prop("outerHTML");
	                },
	                replace: true,
	                link: function (scope, element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                    $(document).ready(function () {
	                        element.tab({
	                            selectedIndex: _$utils.getFieldValueByName(_config, 'selected')
	                        });
	                    })

	                    element.on('selectedIndexChanged.gtui.tab', element, function (e, d) {
	                        _$utils.setPropertyValueByName(scope, _config, 'selectedField', d.newValue);
	                        scope.$apply();
	                    });
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 30 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiTabPanel', function (_$utils) {

	            return {
	                restrict: "AE",
	                link: function (scope, element, attrs) {
	                    element.attr('role', 'tabpanel');
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 31 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui'),

	            _dataConfigField = 'table-config',
	            _divHTML = '<div></div>',
	            _tbodyHTML = 'tbody',

	            _SORT_NONE = 'none',
	            _SORT_ASC = 'asc',
	            _SORT_DESC = 'desc',

	            _getTableClass = function (config) {
	                var _tableClass = [gtui.table.constant.TABLE_CLASS];

	                if (config.tableBordered) {
	                    _tableClass.push(gtui.table.constant.TABLE_BORDERED_CLASS);
	                }
	                if (config.tableStriped) {
	                    _tableClass.push(gtui.table.constant.TABLE_STRIPED);
	                }

	                return _tableClass.join(' ');
	            },
	            _getTemplate = function (el, config) {
	                // Template outer element
	                var _div = $(_divHTML).addClass(gtui.table.constant.TABLE_CONTAINER_CLASS),

	                    // tables
	                    _originTableTemplate = el.children('table'),
	                    _frozenHeaderTemplate,
	                    _frozenColumnsTemplate,
	                    _frozenColumnsHeaderTemplate,

	                    // table wrapers
	                    _originTableWrapper = $(_divHTML).addClass(gtui.table.constant.ORIGIN_TABLE_CONTAINER_CLASS),
	                    _frozenHeaderWrapper = $(_divHTML).addClass(gtui.table.constant.FROZEN_HEADER_TABLE_CONTAINER_CLASS),
	                    _frozenColumnsTableWrapper = $(_divHTML).addClass(gtui.table.constant.FROZEN_COLUMNS_TABLE_CONTAINER_CLASS),
	                    _frozenColumnsHeaderWrapper = $(_divHTML).addClass(gtui.table.constant.FROZEN_COLUMNS_TABLE_HEADER_CONTAINER_CLASS),

	                    _frozenColumnsCount = parseInt(config.frozenColumnsCount);

	                // Deal with frozenColumnsCount.
	                _frozenColumnsCount = _frozenColumnsCount ? _frozenColumnsCount : 0;

	                var _tableClass = _getTableClass(config);

	                // Add classes to original table template.
	                _originTableTemplate.addClass(_tableClass);

	                // Generate table which holds the frozen headers on top of this table-ish component based on the original table.
	                _frozenHeaderTemplate = _originTableTemplate.clone();
	                _frozenHeaderTemplate.children(_tbodyHTML).remove();

	                // Generate table which holds the frozen columns on left of this table-ish component based on the original table.
	                _frozenColumnsTemplate = _originTableTemplate.clone();

	                // Generate the table holds the headers of the table holds the frozen columns.
	                // This table is fixed on top, and fixed on left.
	                _frozenColumnsHeaderTemplate = _frozenColumnsTemplate.clone();
	                _frozenColumnsHeaderTemplate.children(_tbodyHTML).remove();

	                _div.append(_originTableWrapper.append(_originTableTemplate))
	                    .append(_frozenHeaderWrapper.append(_frozenHeaderTemplate))
	                    .append(_frozenColumnsTableWrapper.append(_frozenColumnsTemplate))
	                    .append(_frozenColumnsHeaderWrapper.append(_frozenColumnsHeaderTemplate));

	                return _div.prop("outerHTML");
	            };

	        gta.directive('gtuiTable', function (_$utils) {
	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                    return _getTemplate(element, _config);
	                },
	                replace: true,
	                transclude: false,
	                link: function (scope, element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                    _frozenCols = _config.frozenColumnsCount ? _config.frozenColumnsCount : 0;

	                    if (_config.controllerAs) {
	                        scope[_config.controllerAs].metaTable = element;
	                    }
	                    else {
	                        scope.metaTable = element;
	                    }

	                    scope.__sortBy__ = [];

	                    element.on('sort.gtui.table', { scope: scope, config: _config }, function (e) {
	                        var _scope = e.data.scope,
	                            _sortBy = _scope.__sortBy__,
	                            _config = e.data.config,
	                            _index = e.index,
	                            _cols = _$utils.getFieldValueByName(e.data.scope, _config, 'columns'),
	                            _col = _cols[_index];

	                        if (_col.sortable) {
	                            _col.sort = _col.sort === _SORT_NONE ? _SORT_ASC : (_col.sort === _SORT_ASC ? _SORT_DESC : _SORT_ASC);

	                            if (e.ctrlKey) {
	                                var position = -1;

	                                for (var i = 0, length = _sortBy.length; i < length; i++) {
	                                    if (_sortBy[i].columnField === _col.valueField) {
	                                        _sortBy[i].sort = _col.sort;
	                                        position = i;
	                                    }
	                                }

	                                if (position === -1) {
	                                    _sortBy.push({ columnField: _col.valueField, sort: _SORT_ASC });
	                                }
	                            }
	                            else {
	                                _sortBy = [];

	                                for (var i = 0, length = _cols.length; i < length; i++) {
	                                    if (i !== _index)
	                                        _cols[i].sort = _SORT_NONE;
	                                }

	                                _sortBy.push({ columnField: _col.valueField, sort: _col.sort });
	                            }
	                        }

	                        e.sortBy = _sortBy;

	                        _scope.$emit('sort.gtui.table', e);
	                    })
	                    .on('linkClick.gtui.table', scope, function (e) {
	                        e.data.$emit('linkClick.gtui.table', e);
	                    })
	                    .on('buttonClick.gtui.table', scope, function (e) {
	                        e.data.$emit('buttonClick.gtui.table', e);
	                    });

	                    $(document).ready(function () {
	                        element.table({
	                            frozenColumnsCount: _config.frozenColumnsCount
	                        });
	                    });
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 32 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiTableTd', function (_$utils) {
	            var TD_HTML = '<td></td>',
	                SPAN_HTML = '<span></span>',
	                LINK_HTML = '<a></a>',
	                BUTTON_HTML = '<button></button>',
	                
	                BUTTON_CLASS = 'btn btn-default btn-xs';

	            var defaultConfig = function () {
	                return {
	                    controllerAs: '',
	                    rowField: 'row',
	                    columnField: 'column',
	                    valueField: 'valueField',
	                    contentField: 'contentField',
	                    sortableField: 'sortable',
	                    visibleField: 'visible',
	                    sortField: 'sort',
	                    typeField: 'typeField'
	                };
	            }();
	            
	            var _getTemplate = function (el, config) {
	                // Template outer element
	                var _td = $(TD_HTML).attr({
	                    'ng-show': config.columnField + '[\'' + config.visibleField + '\']',
	                });
	                
	                var _text = $(SPAN_HTML).attr({
	                    'ng-bind': config.rowField + '[' + config.columnField + '[\'' + config.contentField + '\']]',
	                    'ng-if': config.columnField + '[\'' + config.typeField + '\'].toLowerCase() === \'text\''
	                });
	                var _link = $(LINK_HTML).attr({
	                    href: 'javascript: void(0)',
	                    'ng-bind': config.rowField + '[' + config.columnField + '[\'' + config.contentField + '\']]',
	                    'ng-if': config.columnField + '[\'' + config.typeField + '\'].toLowerCase() === \'link\''
	                });
	                var _btnGroup = $(BUTTON_HTML).addClass(BUTTON_CLASS).attr({
	                    type: 'button',
	                    'ng-repeat': '__btnItem__ in ' + config.rowField + '[' + config.columnField + '[\'' + config.contentField + '\']] track by $index',
	                    'ng-bind': '__btnItem__.displayContent',
	                    'ng-if': config.columnField + '[\'' + config.typeField + '\'].toLowerCase() === \'btn-group\''
	                });

	                _td.append(_text).append(_link).append(_btnGroup);

	                return _td;
	            };

	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                    $.extend(defaultConfig, _config, true);

	                    return _getTemplate(element, _config).prop("outerHTML");
	                },
	                replace: true,
	                transclude: false,
	                link: function (scope, element, attrs) {
	                    
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 33 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiTableTh', function (_$utils) {
	            var COLUMN_FIELD = '__column__',
	                TH_HTML = '<th></th>',
	                SPAN_HTML = '<span></span>',
	                
	                SORTABLE_CLASS = 'sortable';

	            var defaultConfig = function () {
	                return {
	                    controllerAs: 'vm',
	                    columnsField: 'columns',
	                    sortableField: 'sortable',
	                    visibleField: 'visible',
	                    sortField: 'sort',
	                    displayField: 'displayContent'
	                };
	            }();
	            
	            var _getTemplate = function (el, config) {
	                // Template outer element
	                var _th = $(TH_HTML).attr({
	                    'ng-repeat': COLUMN_FIELD + ' in ' + _$utils.getFieldStringByName(config, 'columns'),
	                    'ng-show': COLUMN_FIELD + '.' + config.visibleField,
	                    'ng-class': '{ \'' + SORTABLE_CLASS  + '\': ' + COLUMN_FIELD + '.' + config.sortableField + ' }'
	                });

	                var _spanContent = $(SPAN_HTML).attr({
	                    'ng-bind': COLUMN_FIELD + '.' + config.displayField
	                });

	                var _spanIcon = $(SPAN_HTML).attr({
	                    'ng-if': COLUMN_FIELD + '.' + config.sortableField,
	                    'ng-class': '{ \'glyphicon glyphicon-triangle-top\': ' + COLUMN_FIELD + '.' + config.sortField +
	                        ' === \'asc\', \'glyphicon glyphicon-triangle-bottom\': ' + COLUMN_FIELD + '.' + config.sortField + ' === \'desc\' }'
	                });

	                _th.append(_spanContent).append(' ').append(_spanIcon);

	                return _th;
	            };

	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                    $.extend(defaultConfig, _config, true);

	                    return _getTemplate(element, _config).prop("outerHTML");
	                },
	                replace: true,
	                transclude: false,
	                link: function (scope, element, attrs) {
	                    
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 34 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiTreeView', function (_$utils) {
	            var _BUTTON_HTML = '<button></button>',
	                _DIV_HTML = '<div></div>';

	            var defaultConfig = function () {
	                return {
	                    controllerAs: undefined,
	                    itemsField: 'items'
	                };
	            }();

	            var _getTemplate = function (el, config) {
	                return '<div></div>';
	            };

	            var _getChildNodesId = function (nodes) {
	                var _ids = [];

	                for (var i = 0, length = nodes.length; i < length; i++) {
	                    var node = nodes[i];

	                    _ids.push(node.nodeId);

	                    if (node.nodes) {
	                        _ids = _ids.concat(_getChildNodesId(node.nodes));
	                    }
	                }

	                return _ids;
	            };
	            var _getParentNodesId = function (node, el) {
	                var _ids = [],
	                    _id = node.parentId;

	                if (_id > -1) _ids.push(_id);

	                var parentNode = el.treeview('getNode', _id);

	                if (parentNode.parentId > -1) _ids = _ids.concat(_getParentNodesId(parentNode, el));

	                return _ids;
	            };
	            var _getSiblingsChecking = function (node, el) {
	                var _siblings = el.treeview('getSiblings', node.nodeId);

	                for (var i = 0, length = _siblings.length; i < length; i++) {
	                    if (!_siblings[i].state.checked) {
	                        return false;
	                    }
	                }

	                return true;
	            };
	            var _getAllCheckedParents = function (node, el) {
	                var _ids = [],
	                    _parentId = node.parentId;

	                if (_parentId > -1 && _getSiblingsChecking(node, el)) {
	                    _ids.push(_parentId);

	                    _ids = _ids.concat(_getAllCheckedParents(el.treeview('getNode', _parentId), el));
	                }

	                return _ids;
	            };

	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                    $.extend(defaultConfig, _config, true);

	                    return _getTemplate(element, _config);
	                },
	                replace: true,
	                transclude: false,
	                link: function (scope, element, attrs) {
	                    var _config = _$utils.getConfig(attrs);

	                    $(document).ready(function () {
	                        element.treeview({
	                            showIcon: false,
	                            showCheckbox: true,
	                            onNodeChecked: function (e, node) {
	                                if (node.nodes) {
	                                    $(e.target).treeview('checkNode', [_getChildNodesId(node.nodes), { silence: true }]);
	                                }
	                                if (node.parentId > -1) {
	                                    $(e.target).treeview('checkNode', [_getAllCheckedParents(node, $(e.target)), { silence: true }]);
	                                }
	                            },
	                            onNodeUnchecked: function (e, node) {
	                                if (node.nodes) {
	                                    $(e.target).treeview('uncheckNode', [_getChildNodesId(node.nodes), { silent: true }]);
	                                }
	                                if (node.parentId > -1) {
	                                    $(e.target).treeview('uncheckNode', [_getParentNodesId(node, $(e.target)), { silent: true }]);
	                                }
	                            },
	                            data: _$utils.getFieldValueByName(scope, _config, 'items')
	                        });
	                    });
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 35 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiVerticalTile', function () {
	            return {
	                restrict: "EA",
	                template: '',
	                link: function (scope, element, attrs) {
	                    $(document).ready(function () {
	                        element.verticaltile();
	                    });
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ }
/******/ ]);
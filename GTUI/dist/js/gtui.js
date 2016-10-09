/* Packaged at 10:51 Oct 8, 2016. Version: None */
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

	// Widgets
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);

	// Angular
	__webpack_require__(7);

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
	            getClosestEementByNodeName: getClosestEementByNodeName
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
/* 5 */
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

	            frozenColumnsCount: 3
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
	                var _target = $(e.target);
	                if (_target[0].nodeName !== 'TH') {
	                    _target = _target.closest('th');
	                }
	                var _position = _target.parent().children('th').index(e.target),
	                    _event = $.Event('sort', { index: _position });

	                e.data.element.trigger(_event);
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
/* 6 */
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
	                _offsetBottom = document.body.clientHeight - _top - _el.height();

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
	                });
	        },
	        _destory: function e() {
	            $(window).off('resize' + this.eventNamespace);
	        }
	    });
	})(jQuery);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	if (window.angular) {
	    // This file is the first of the files of the angular supported files.
	    // So here module will be defined once.
	    var gta = angular.module('gtui', []);

	    __webpack_require__(8);
	    __webpack_require__(11);
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// Core
	__webpack_require__(9);

	// Directives
	__webpack_require__(10);

/***/ },
/* 9 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        var constants = function () {
	            return {
	                FIELD: 'Field',
	                CONVERT_AS: 'convertAs'
	            };
	        }();

	        gta.service('_$utils', ['$parse', function ($parse) {
	            var _serv = {
	                getConfig: function (attrs, configAttr) {
	                    if (!configAttr) {
	                        configAttr = 'config'
	                    }

	                    return $parse(attrs[configAttr])();
	                },
	                getFiledValueByName: function (scope, config, name) {
	                    var targetFiled = name + constants.FIELD;

	                    return config[constants.CONVERT_AS] ?
	                        scope[config[constants.CONVERT_AS]][config[targetFiled]] :
	                        scope[config[targetFiled]];
	                },
	                getFiledStringByName: function (scope, config, name) {
	                    var targetFiled = name + constants.FIELD;

	                    return config[constants.CONVERT_AS] ?
	                        (config[constants.CONVERT_AS] + '.' + targetFiled) :
	                        targetFiled;
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
	                }
	            }

	            return _serv;
	        }]);
	    }
	})(jQuery);

/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// Core
	__webpack_require__(12);

	// Directives
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);

/***/ },
/* 12 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        // TODO: Here is some core functions.
	    }
	})(jQuery);

/***/ },
/* 13 */
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
	                    _startInput = $(INPUT).attr({ type: 'text' }).addClass('form-control'),
	                    _addon = $(SPAN).addClass('input-group-addon').text('-'),
	                    _endInput = $(INPUT).attr({ type: 'text' }).addClass('form-control');

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
	                        case 'datepicker-range':
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
/* 14 */
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
	                        var _option = _$utils.getFiledValueByName(scope, _config, 'option');

	                        if (angular.isObject(_option)) {
	                            _chart.setOption(_option);
	                        }
	                    });

	                    element.closest('[gtui-vertical-tile]').on('resize', { element: element, config: _config, chart: _chart }, function (e) {
	                        e.data.chart.resize();
	                    });

	                    scope.$watch((_config.convertAs ? (_config.convertAs + '.') : '') + _config.optionField, function (n, o, scope) {
	                        if (n != o) {
	                            var _config = _$utils.getConfig(attrs),
	                                _option = _$utils.getFiledValueByName(scope, _config, 'option');

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
/* 15 */
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
/* 16 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular && window.echarts) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiInput', function (_$utils, _$echart) {
	            var INPUT = '<input />';

	            var _getTemplate = function (config) {
	                var _input = $(INPUT).attr({ type: 'text' }).addClass('form-control');

	                return _input[0].outerHTML;
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
/* 17 */
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
/* 18 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui'),

	            _DIV_HTML = '<div></div>',
	            _UL_HTML = '<ul></ul>',
	            _LI_HTML = '<li></li>',
	            _A_HTML = '<a></a>',

	            _FIRST_CLASS = 'glyphicon glyphicon-step-backward',
	            _PREVIOUS_GOUP_CLASS = 'glyphicon glyphicon-backward',
	            _PREVIOUS_CLASS = 'glyphicon glyphicon-triangle-left',
	            _NEXT_CLASS = 'glyphicon glyphicon-triangle-right',
	            _NEXT_GROUP_CLASS = 'glyphicon glyphicon-forward',
	            _LAST_CLASS = 'glyphicon glyphicon-step-forward',
	                
	            _MAX_PAGES = 9;

	        var _getTemplate = function (el, config) {
	            // Template outer element
	            var _div = $(_DIV_HTML);

	            var _ul = $(_UL_HTML).addClass('pagination');

	            var _firstLi = $(_LI_HTML).append($(_A_HTML).addClass(_FIRST_CLASS).attr('href', 'javascript: void(0);'));
	            var _prevGoupLi = $(_LI_HTML).append($(_A_HTML).addClass(_PREVIOUS_GOUP_CLASS).attr('href', 'javascript: void(0);'));
	            var _prevLi = $(_LI_HTML).append($(_A_HTML).addClass(_PREVIOUS_CLASS).attr('href', 'javascript: void(0);'));

	            var _itemsLi = $(_LI_HTML).attr({
	                    'ng-repeat': '__item__ in ' + (config.vm ? config.vm + '.__pager__.__items__' : '__pager__.__items__'),
	                    'ng-class': '{ active: __item__ === ' + config.vm + '.' + config.selectedField + ' }'
	                })
	                .append($(_A_HTML).attr({ 'ng-bind': '__item__', 'href': 'javascript: void(0);' }));

	            var _nextLi = $(_LI_HTML).append($(_A_HTML).addClass(_NEXT_CLASS).attr('href', 'javascript: void(0);'));
	            var _nextGoupLi = $(_LI_HTML).append($(_A_HTML).addClass(_NEXT_GROUP_CLASS).attr('href', 'javascript: void(0);'));
	            var _latLi = $(_LI_HTML).append($(_A_HTML).addClass(_LAST_CLASS).attr('href', 'javascript: void(0);'));

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
	        var _getPages = function (selectedPage, totalPages) {
	            if ((typeof (selectedPage) === 'undefined' || isNaN(selectedPage)) || (typeof (totalPages) === 'undefined' || isNaN(totalPages))) {
	                console.error('Pager directive: Make sure the selcted page and total pages are existed and they are numbers. ');
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

	        var _itemClick = function (e) {
	            var _el = gtui.utils.getClosestEementByNodeName(e.target, 'a'),
	                _config = e.data.scope().$eval(e.data.attr('data-config')),
	                _scope = e.data.scope(),
	                _vm = _scope[_config.vm];

	            _vm = _vm ? _vm : _scope;

	            if (_el.hasClass(_FIRST_CLASS)) {
	                _vm[_config.selectedField] = 1;
	            }
	            else if (_el.hasClass(_PREVIOUS_GOUP_CLASS)) {
	                if (_vm[_config.selectedField] > _MAX_PAGES) {
	                    _vm[_config.selectedField] = _vm[_config.selectedField] - _MAX_PAGES;
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
	            }
	            else if (_el.hasClass(_LAST_CLASS)) {
	                _vm[_config.selectedField] = _vm[_config.totalField];
	            }
	            else {
	                _vm[_config.selectedField] = parseInt(_el.text());
	            }
	            _scope.$apply();
	        };
	        var _changed = function (config) {
	            return function (newValue, oldValue, scope) {
	                if (newValue !== oldValue) {
	                    var _scope = config.vm ? scope[config.vm] : scope;

	                    _scope.__pager__.__items__ = _getPages(_scope[config.selectedField], _scope[config.totalField]);
	                }
	            }
	        };

	        gta.directive('gtuiPager', function ($parse) {
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
	                        var _config = $parse(attrs.config)();
	                    }

	                    return _getTemplate(element, _config);
	                },
	                replace: true,
	                transclude: false,
	                link: function (scope, element, attrs) {
	                    var _config = scope.$eval(attrs.config),
	                        _scope = scope;

	                    if (_config.vm) {
	                        _scope = _scope[_config.vm];
	                    }

	                    var _selectedIndex = _scope[_config.selectedField];
	                    var _total = _scope[_config.totalField];
	                    _scope.__pager__ = {};
	                    _scope.__pager__.__items__ = _getPages(_selectedIndex, _total);
	                    _scope.__pager__.__config__ = _config;

	                    element.on('click', 'a', element, _itemClick);

	                    scope.$watch((_config.vm ? (_config.vm + '.') : '') + _config.selectedField + ' + ' +
	                        (_config.vm ? (_config.vm + '.') : '') + _config.totalField, _changed(_config));
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 19 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiPanelSearch', function ($parse) {
	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    // Deal with data-config
	                    if (!attrs.config) {
	                        console.error('gtui-table: "data-config" attribute is missing.');
	                        return _divHTML;
	                    }
	                    else {
	                        var _config = $parse(attrs.config)();
	                    }

	                    var _template = [];

	                    _template.push('<div class="panel panel-primary">');
	                    _template.push('  <div class="panel-heading">');
	                    _template.push('    <span class="glyphicon glyphicon-chevron-up"></span>');
	                    _template.push('    {{' + (_config.controllerAs ? _config.controllerAs + '.' : '') + _config.titleField + '}}');
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

	        gta.directive('gtuiPanelContent', function ($parse) {
	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    // Deal with data-config
	                    if (!attrs.config) {
	                        console.error('gtui-table: "data-config" attribute is missing.');
	                        return _divHTML;
	                    }
	                    else {
	                        var _config = $parse(attrs.config)();
	                    }

	                    var _template = [];

	                    _template.push('<div class="panel panel-primary">');
	                    _template.push('  <div class="panel-heading"></div>');
	                    _template.push('  <div class="panel-body" ng-transclude></div>');
	                    if (_config.hasFooter) {
	                        _template.push('  <div class="panel-footer"></div>');
	                    }
	                    _template.push('</div>');

	                    return _template.join('');
	                },
	                replace: true,
	                transclude: true,
	                link: function (scope, element, attrs) {
	                    
	                }
	            };
	        });

	        gta.directive('gtuiPanelTable', function ($parse) {
	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    // Deal with data-config
	                    if (!attrs.config) {
	                        console.error('gtui-table: "data-config" attribute is missing.');
	                        return _divHTML;
	                    }
	                    else {
	                        var _config = $parse(attrs.config)();
	                    }

	                    var _template = [];

	                    _template.push('<div class="panel panel-primary">');
	                    _template.push('  <div class="panel-heading"></div>');
	                    _template.push('  <div class="panel-table" ng-transclude></div>');
	                    _template.push('  <div class="panel-footer"></div>');
	                    _template.push('</div>');

	                    return _template.join('');
	                },
	                replace: true,
	                transclude: true,
	                link: function (scope, element, attrs) {

	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 20 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui'),

	            _dataConfigField = 'table-config',
	            _divHTML = '<div></div>',
	            _tbodyHTML = 'tbody',

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

	                return _div;
	            };

	        gta.directive('gtuiTable', function ($parse) {
	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    // Deal with data-config
	                    if (!attrs.config) {
	                        console.error('gtui-table: "data-config" attribute is missing.');
	                        return _divHTML;
	                    }
	                    else {
	                        var _config = $parse(attrs.config)();
	                    }

	                    return _getTemplate(element, _config).prop("outerHTML");
	                },
	                replace: true,
	                transclude: false,
	                link: function (scope, element, attrs) {
	                    var _frozenCols = parseInt(attrs.frozenColumnsCount),
	                        _config = scope.$eval(attrs.config);

	                    _frozenCols = _frozenCols ? _frozenCols : 0;

	                    if (_config.vm) {
	                        scope[_config.vm].metaTable = element;
	                    }
	                    else {
	                        scope.metaTable = element;
	                    }

	                    element.on('sort', scope, function (e) {
	                        e.data.$emit('sort', e);
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
/* 21 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiTableHead', function () {
	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    var _template = [],
	                        _config = gtui.utils.parseObj(element.closest('.table-container').attr('data-config'));

	                    _template.push('<thead>');
	                    _template.push('  <tr ng-repeat="row in ' + _config.as + '.' + _config.columnsField + '">');
	                    _template.push('    <th ng-repeat="item in row.' + _config.columnsField +
	                        '" colspan="{{item.' + _config.colspanField +
	                        '}}" rowspan="{{item.' + _config.rowspanField +
	                        '}}">{{item.' + _config.colDisplayField + '}}</th>');
	                    _template.push('  </tr>');
	                    _template.push('</thead>');

	                    return _template.join('');
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
/* 22 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui'),
	            inputCellTemplate = function (config) {

	            };

	        gta.directive('gtuiTableBody', function () {
	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    var _template = [],
	                        _config = gtui.utils.parseObj(element.closest('.table-container').attr('data-config'));

	                    _template.push('<tbody>');
	                    _template.push('  <tr ng-repeat="row in ' + _config.as + '.' + _config.itemsSourceField + '">');
	                    _template.push('    <td ng-repeat="cell in ' + _config.as + '.' + _config.rowsField + '">');
	                    _template.push('     ' + inputCellTemplate(_config));
	                    _template.push('    </td>');
	                    _template.push('  </tr>');
	                    _template.push('</tbody>');

	                    return _template.join('');
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
/* 23 */
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
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.nativeToast = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}

  	return Object(val);
  }

  function shouldUseNative() {
  	try {
  		if (!Object.assign) {
  			return false;
  		}

  		// Detect buggy property enumeration order in older V8 versions.

  		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
  		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
  		test1[5] = 'de';
  		if (Object.getOwnPropertyNames(test1)[0] === '5') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test2 = {};
  		for (var i = 0; i < 10; i++) {
  			test2['_' + String.fromCharCode(i)] = i;
  		}
  		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
  			return test2[n];
  		});
  		if (order2.join('') !== '0123456789') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test3 = {};
  		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
  			test3[letter] = letter;
  		});
  		if (Object.keys(Object.assign({}, test3)).join('') !==
  				'abcdefghijklmnopqrst') {
  			return false;
  		}

  		return true;
  	} catch (err) {
  		// We don't expect any of the above to throw, but better to be safe.
  		return false;
  	}
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;

  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);

  		for (var key in from) {
  			if (hasOwnProperty.call(from, key)) {
  				to[key] = from[key];
  			}
  		}

  		if (getOwnPropertySymbols) {
  			symbols = getOwnPropertySymbols(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}

  	return to;
  };

  var prevToast = null;
  var icons = {
    warning: "<svg viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"none\" stroke=\"currentcolor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"6.25%\"><path d=\"M8 17 C8 12 9 6 16 6 23 6 24 12 24 17 24 22 27 25 27 25 L5 25 C5 25 8 22 8 17 Z M20 25 C20 25 20 29 16 29 12 29 12 25 12 25 M16 3 L16 6\" /></svg>",
    success: "<svg viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"none\" stroke=\"currentcolor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"6.25%\"><path d=\"M2 20 L12 28 30 4\" /></svg>",
    info: "<svg viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"none\" stroke=\"currentcolor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"6.25%\"><path d=\"M16 14 L16 23 M16 8 L16 10\" /><circle cx=\"16\" cy=\"16\" r=\"14\" /></svg>",
    error: "<svg viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"none\" stroke=\"currentcolor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"6.25%\"><path d=\"M16 3 L30 29 2 29 Z M16 11 L16 19 M16 23 L16 25\" /></svg>"
  };

  var Toast =
  /*#__PURE__*/
  function () {
    function Toast() {
      var _this = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$message = _ref.message,
          message = _ref$message === void 0 ? '' : _ref$message,
          _ref$position = _ref.position,
          position = _ref$position === void 0 ? 'bottom' : _ref$position,
          _ref$timeout = _ref.timeout,
          timeout = _ref$timeout === void 0 ? 3000 : _ref$timeout,
          _ref$el = _ref.el,
          el = _ref$el === void 0 ? document.body : _ref$el,
          _ref$square = _ref.square,
          square = _ref$square === void 0 ? false : _ref$square,
          _ref$type = _ref.type,
          type = _ref$type === void 0 ? '' : _ref$type,
          _ref$debug = _ref.debug,
          debug = _ref$debug === void 0 ? false : _ref$debug,
          _ref$edge = _ref.edge,
          edge = _ref$edge === void 0 ? false : _ref$edge,
          _ref$icon = _ref.icon,
          icon = _ref$icon === void 0 ? true : _ref$icon,
          _ref$closeOnClick = _ref.closeOnClick,
          closeOnClick = _ref$closeOnClick === void 0 ? false : _ref$closeOnClick;

      _classCallCheck(this, Toast);

      if (prevToast) {
        prevToast.destroy();
      }

      this.message = message;
      this.position = position;
      this.el = el;
      this.timeout = timeout;
      this.closeOnClick = closeOnClick;
      this.toast = document.createElement('div');
      this.toast.className = "native-toast native-toast-".concat(this.position);

      if (type) {
        this.toast.className += " native-toast-".concat(type);

        if (icon) {
          this.message = "<span class=\"native-toast-icon-".concat(type, "\">").concat(icons[type] || '', "</span>").concat(this.message);
        }
      }

      this.toast.innerHTML = this.message;

      if (edge) {
        this.toast.className += ' native-toast-edge';
      } else if (square) {
        this.toast.style.borderRadius = '3px';
      }

      this.el.appendChild(this.toast);
      prevToast = this;
      this.show();

      if (!debug && timeout > 0) {
        this.hide();
      }

      if (this.closeOnClick) {
        this.toast.addEventListener('click', function () {
          _this.destroy();
        });
      }
    }

    _createClass(Toast, [{
      key: "show",
      value: function show() {
        var _this2 = this;

        setTimeout(function () {
          _this2.toast.classList.add('native-toast-shown');
        }, 300);
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this3 = this;

        setTimeout(function () {
          _this3.destroy();
        }, this.timeout);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var _this4 = this;

        if (!this.toast) return;
        this.toast.classList.remove('native-toast-shown');
        setTimeout(function () {
          if (_this4.toast) {
            _this4.el.removeChild(_this4.toast);

            _this4.toast = null;
          }
        }, 300);
      }
    }]);

    return Toast;
  }();

  function toast(options) {
    return new Toast(options);
  }

  var _arr = ['success', 'info', 'warning', 'error'];

  var _loop = function _loop() {
    var type = _arr[_i];

    toast[type] = function (options) {
      return toast(Object.assign({
        type: type
      }, options));
    };
  };

  for (var _i = 0; _i < _arr.length; _i++) {
    _loop();
  }

  return toast;

})));

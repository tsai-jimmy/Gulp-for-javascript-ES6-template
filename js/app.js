(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CanvasSet = require("./lib/CanvasSet");

var _CanvasSet2 = _interopRequireDefault(_CanvasSet);

var _Debug = require("./lib/Debug");

var _Debug2 = _interopRequireDefault(_Debug);

var _DOMquery = require("./lib/DOMquery");

var _DOMquery2 = _interopRequireDefault(_DOMquery);

var _FromCheck = require("./lib/FromCheck");

var _FromCheck2 = _interopRequireDefault(_FromCheck);

var _Orientation = require("./lib/Orientation");

var _Orientation2 = _interopRequireDefault(_Orientation);

var _SetInt = require("./lib/SetInt");

var _SetInt2 = _interopRequireDefault(_SetInt);

var _UrlGetSet = require("./lib/UrlGetSet");

var _UrlGetSet2 = _interopRequireDefault(_UrlGetSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    CanvasSet: _CanvasSet2.default,
    Debug: _Debug2.default,
    DOMquery: _DOMquery2.default,
    FromCheck: _FromCheck2.default,
    Orientation: _Orientation2.default,
    SetInt: _SetInt2.default,
    UrlGetSet: _UrlGetSet2.default
};

},{"./lib/CanvasSet":2,"./lib/DOMquery":3,"./lib/Debug":4,"./lib/FromCheck":5,"./lib/Orientation":6,"./lib/SetInt":7,"./lib/UrlGetSet":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/*
* --canvas 圖片寬高置中等比例
*
* Canvas 將圖片丟進去使用drawImage繪製時，等比例縮放還有置中參數
*
*   --使用說明
*	const dataImg = new CanvasSet.canvasSetDrawImg(imgData);
	dataImg.w     -> 寬
	dataImg.h     -> 高
	dataImg.tx    -> 座標 X
	dataImg.ty    -> 座標 Y
*
*
*/
function CanvasSetDrawImg(Drawimg, canvasWidth, canvasHeight) {
	var img = Drawimg,
	    w = img.width,
	    h = img.height,
	    ratio = Math.max(canvasWidth / w, canvasHeight / h);

	return {
		"w": w *= ratio,
		"h": h *= ratio,
		"tx": canvasWidth - w >> 1,
		"ty": canvasHeight - h >> 1
	};
}
exports.default = {
	CanvasSetDrawImg: CanvasSetDrawImg
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* 
* 獲取html元素在面上的座標
* 
* top - offsetTop
* left - offsetLeft
* 搭配 animated-scroll-to 使用
* 
*/
function GetOffset(el) {
    var box = el.getBoundingClientRect();
    return {
        top: box.top + window.pageYOffset - document.documentElement.clientTop,
        left: box.left + window.pageXOffset - document.documentElement.clientLeft
    };
}

exports.default = {
    GetOffset: GetOffset
};

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _UrlGetSet = require("./UrlGetSet");

var _UrlGetSet2 = _interopRequireDefault(_UrlGetSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*debug的console.log*/
function ConsoleLog(val) {
	var debug = _UrlGetSet2.default.UrlSearch();
	if (debug["debug"] == "true") {
		console.log("debug ->", val);
	}
};

exports.default = {
	ConsoleLog: ConsoleLog
};

},{"./UrlGetSet":8}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

/*檢查手機號碼*/
function Check_tel(input) {
	var phone = /^09[0-9]{2}[0-9]{6}$/;
	if (!phone.test(input)) {
		alert("手機電話格式錯誤");
		return false;
	}
	return true;
}

/* 檢查mail*/
function Check_email(input) {
	var email = input;
	if (email.search(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == -1) {
		alert("請輸入正確的mail格式");
		return false;
	}
	return true;
}

exports.default = {
	Check_tel: Check_tel,
	Check_email: Check_email
};

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

/*
* --判斷手機直橫
* portrait   直式
* landscape  橫式	
* 		
* 參數是傳入funciton callback	
* 		
* 判斷手機直橫
* 開發者模式測不出來，要實機測試 	
*/
function OrientationChange(portrait, landscape) {
	if (portrait && landscape) {
		window.addEventListener("orientationchange", onOrientationchange, false);
	}
	function onOrientationchange() {
		if (window.orientation === 180 || window.orientation === 0) {
			if (portrait) {
				portrait();
			}
		}
		if (window.orientation === 90 || window.orientation === -90) {
			if (landscape) {
				landscape();
			}
		}
	}
}
exports.default = {
	OrientationChange: OrientationChange
};

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/*取亂數值*/
function GetRandom(minNum, maxNum) {
	return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

exports.default = {
	GetRandom: GetRandom
};

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/*抓html get參數*/
function UrlSearch() {
	var strUrl = location.search;
	var getPara, ParaVal;
	var aryPara = [];
	if (strUrl.indexOf("?") != -1) {
		var getSearch = strUrl.split("?");
		getPara = getSearch[1].split("&");
		for (var i = 0; i < getPara.length; i++) {
			ParaVal = getPara[i].split("=");
			aryPara.push(ParaVal[0]);
			aryPara[ParaVal[0]] = ParaVal[1];
		}
	}
	return aryPara;
}

exports.default = {
	UrlSearch: UrlSearch
};

},{}],9:[function(require,module,exports){
"use strict";

var _page = require("./page.js");

var _page2 = _interopRequireDefault(_page);

var _PixG = require("./PixLib/PixG");

var _PixG2 = _interopRequireDefault(_PixG);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
    var m = new _page2.default();
    m.logFn();
    var i = _PixG2.default.SetInt.GetRandom(1, 9);
    console.log(i);
});

},{"./PixLib/PixG":1,"./page.js":10}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mike = function mike() {
    var _this = this;

    _classCallCheck(this, mike);

    this.mike = "mike";

    this.logFn = function () {
        console.log(_this.mike);
    };
};

exports.default = mike;

},{}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9lczYvUGl4TGliL1BpeEcuanMiLCJqcy9lczYvUGl4TGliL2xpYi9DYW52YXNTZXQuanMiLCJqcy9lczYvUGl4TGliL2xpYi9ET01xdWVyeS5qcyIsImpzL2VzNi9QaXhMaWIvbGliL0RlYnVnLmpzIiwianMvZXM2L1BpeExpYi9saWIvRnJvbUNoZWNrLmpzIiwianMvZXM2L1BpeExpYi9saWIvT3JpZW50YXRpb24uanMiLCJqcy9lczYvUGl4TGliL2xpYi9TZXRJbnQuanMiLCJqcy9lczYvUGl4TGliL2xpYi9VcmxHZXRTZXQuanMiLCJqcy9lczYvYXBwLmpzIiwianMvZXM2L3BhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O2tCQUVjO0FBQ1Ysa0NBRFU7QUFFViwwQkFGVTtBQUdWLGdDQUhVO0FBSVYsa0NBSlU7QUFLVixzQ0FMVTtBQU1WLDRCQU5VO0FBT1Y7QUFQVSxDOzs7Ozs7OztBQ1JkOzs7Ozs7Ozs7Ozs7OztBQWNBLFNBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBa0MsV0FBbEMsRUFBOEMsWUFBOUMsRUFBNEQ7QUFDM0QsS0FBSSxNQUFNLE9BQVY7QUFBQSxLQUNDLElBQUksSUFBSSxLQURUO0FBQUEsS0FFQyxJQUFJLElBQUksTUFGVDtBQUFBLEtBR0MsUUFBUSxLQUFLLEdBQUwsQ0FBUyxjQUFZLENBQXJCLEVBQXdCLGVBQWEsQ0FBckMsQ0FIVDs7QUFLQyxRQUFPO0FBQ04sT0FBSyxLQUFLLEtBREo7QUFFTixPQUFLLEtBQUssS0FGSjtBQUdOLFFBQU0sY0FBYyxDQUFkLElBQW1CLENBSG5CO0FBSU4sUUFBTSxlQUFlLENBQWYsSUFBb0I7QUFKcEIsRUFBUDtBQU1EO2tCQUNjO0FBQ2QsbUJBQW1CO0FBREwsQzs7Ozs7Ozs7QUMz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LENBQVIsQ0FBYjtBQUNBLFdBQVEsUUFBUSxDQUFSLENBQVIsSUFBc0IsUUFBUSxDQUFSLENBQXRCO0FBQ0Q7QUFDRDtBQUNELFFBQU8sT0FBUDtBQUNBOztrQkFFYTtBQUNiLFlBQVk7QUFEQyxDOzs7OztBQ2pCZDs7OztBQUNBOzs7Ozs7QUFDQSxFQUFFLFlBQVk7QUFDVixRQUFNLElBQUksb0JBQVY7QUFDQSxNQUFFLEtBQUY7QUFDQSxRQUFNLElBQUksZUFBSyxNQUFMLENBQVksU0FBWixDQUFzQixDQUF0QixFQUF5QixDQUF6QixDQUFWO0FBQ0EsWUFBUSxHQUFSLENBQVksQ0FBWjtBQUNILENBTEQ7Ozs7Ozs7Ozs7O0lDRnFCLEksR0FFakIsZ0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxTQURkLElBQ2MsR0FEUCxNQUNPOztBQUFBLFNBR2QsS0FIYyxHQUdOLFlBQUs7QUFDVCxnQkFBUSxHQUFSLENBQVksTUFBSyxJQUFqQjtBQUNILEtBTGE7QUFFYixDOztrQkFKZ0IsSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQ2FudmFzU2V0IGZyb20gXCIuL2xpYi9DYW52YXNTZXRcIjtcbmltcG9ydCBEZWJ1ZyBmcm9tIFwiLi9saWIvRGVidWdcIjtcbmltcG9ydCBET01xdWVyeSBmcm9tIFwiLi9saWIvRE9NcXVlcnlcIjtcbmltcG9ydCBGcm9tQ2hlY2sgZnJvbSBcIi4vbGliL0Zyb21DaGVja1wiO1xuaW1wb3J0IE9yaWVudGF0aW9uIGZyb20gXCIuL2xpYi9PcmllbnRhdGlvblwiO1xuaW1wb3J0IFNldEludCBmcm9tIFwiLi9saWIvU2V0SW50XCI7XG5pbXBvcnQgVXJsR2V0U2V0IGZyb20gXCIuL2xpYi9VcmxHZXRTZXRcIjtcblxuZXhwb3J0IGRlZmF1bHR7XG4gICAgQ2FudmFzU2V0LFxuICAgIERlYnVnLFxuICAgIERPTXF1ZXJ5LFxuICAgIEZyb21DaGVjayxcbiAgICBPcmllbnRhdGlvbixcbiAgICBTZXRJbnQsXG4gICAgVXJsR2V0U2V0LFxufSIsIi8qXG4qIC0tY2FudmFzIOWclueJh+WvrOmrmOe9ruS4reetieavlOS+i1xuKlxuKiBDYW52YXMg5bCH5ZyW54mH5Lif6YCy5Y675L2/55SoZHJhd0ltYWdl57mq6KO95pmC77yM562J5q+U5L6L57iu5pS+6YKE5pyJ572u5Lit5Y+D5pW4XG4qXG4qICAgLS3kvb/nlKjoqqrmmI5cbipcdGNvbnN0IGRhdGFJbWcgPSBuZXcgQ2FudmFzU2V0LmNhbnZhc1NldERyYXdJbWcoaW1nRGF0YSk7XG5cdGRhdGFJbWcudyAgICAgLT4g5a+sXG5cdGRhdGFJbWcuaCAgICAgLT4g6auYXG5cdGRhdGFJbWcudHggICAgLT4g5bqn5qiZIFhcblx0ZGF0YUltZy50eSAgICAtPiDluqfmqJkgWVxuKlxuKlxuKi8gXG5mdW5jdGlvbiBDYW52YXNTZXREcmF3SW1nKERyYXdpbWcsY2FudmFzV2lkdGgsY2FudmFzSGVpZ2h0KSB7XG5cdGxldCBpbWcgPSBEcmF3aW1nLFxuXHRcdHcgPSBpbWcud2lkdGgsXG5cdFx0aCA9IGltZy5oZWlnaHQsXG5cdFx0cmF0aW8gPSBNYXRoLm1heChjYW52YXNXaWR0aC93LCBjYW52YXNIZWlnaHQvaClcblxuXHRcdHJldHVybiB7XG5cdFx0XHRcIndcIjogdyAqPSByYXRpbyxcblx0XHRcdFwiaFwiOiBoICo9IHJhdGlvLFxuXHRcdFx0XCJ0eFwiOiBjYW52YXNXaWR0aCAtIHcgPj4gMSxcblx0XHRcdFwidHlcIjogY2FudmFzSGVpZ2h0IC0gaCA+PiAxXG5cdFx0fTtcbn1cbmV4cG9ydCBkZWZhdWx0IHtcblx0Q2FudmFzU2V0RHJhd0ltZyA6IENhbnZhc1NldERyYXdJbWcsXG59OyIsIi8qIFxuKiDnjbLlj5ZodG1s5YWD57Sg5Zyo6Z2i5LiK55qE5bqn5qiZXG4qIFxuKiB0b3AgLSBvZmZzZXRUb3BcbiogbGVmdCAtIG9mZnNldExlZnRcbiog5pCt6YWNIGFuaW1hdGVkLXNjcm9sbC10byDkvb/nlKhcbiogXG4qL1xuZnVuY3Rpb24gR2V0T2Zmc2V0KGVsKSB7XG4gICAgY29uc3QgYm94ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiBib3gudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFRvcCxcbiAgICAgICAgbGVmdDogYm94LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQgLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50TGVmdFxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgR2V0T2Zmc2V0OiBHZXRPZmZzZXRcbn0iLCJpbXBvcnQgVXJsR2V0U2V0IGZyb20gXCIuL1VybEdldFNldFwiO1xuLypkZWJ1Z+eahGNvbnNvbGUubG9nKi9cbmZ1bmN0aW9uIENvbnNvbGVMb2codmFsKSB7XG5cdGxldCBkZWJ1ZyA9IFVybEdldFNldC5VcmxTZWFyY2goKTtcblx0aWYoZGVidWdbXCJkZWJ1Z1wiXT09XCJ0cnVlXCIpe1xuXHRcdGNvbnNvbGUubG9nKFwiZGVidWcgLT5cIix2YWwpO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdHtcbiAgICBDb25zb2xlTG9nOiBDb25zb2xlTG9nLFxufSIsIlxuLyrmqqLmn6XmiYvmqZ/omZ/norwqL1xuZnVuY3Rpb24gQ2hlY2tfdGVsKGlucHV0KXtcblx0dmFyIHBob25lID0gL14wOVswLTldezJ9WzAtOV17Nn0kLztcblx0aWYgKCFwaG9uZS50ZXN0KGlucHV0KSl7XG5cdFx0XHRhbGVydChcIuaJi+apn+mbu+ipseagvOW8j+mMr+iqpFwiKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gdHJ1ZTtcdFx0XG59XG5cbi8qIOaqouafpW1haWwqL1xuZnVuY3Rpb24gQ2hlY2tfZW1haWwoaW5wdXQpe1xuXHR2YXIgZW1haWwgPSBpbnB1dDtcblx0aWYoZW1haWwuc2VhcmNoKC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvKT09LTEpe1xuXHRcdGFsZXJ0KFwi6KuL6Ly45YWl5q2j56K655qEbWFpbOagvOW8j1wiKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0Q2hlY2tfdGVsIDogQ2hlY2tfdGVsLFxuXHRDaGVja19lbWFpbCA6IENoZWNrX2VtYWlsXG59OyIsIlxuLypcbiogLS3liKTmlrfmiYvmqZ/nm7TmqatcbiogcG9ydHJhaXQgICDnm7TlvI9cbiogbGFuZHNjYXBlICDmqavlvI9cdFxuKiBcdFx0XG4qIOWPg+aVuOaYr+WCs+WFpWZ1bmNpdG9uIGNhbGxiYWNrXHRcbiogXHRcdFxuKiDliKTmlrfmiYvmqZ/nm7Tmqatcbiog6ZaL55m86ICF5qih5byP5ris5LiN5Ye65L6G77yM6KaB5a+m5qmf5ris6KmmIFx0XG4qL1xuZnVuY3Rpb24gT3JpZW50YXRpb25DaGFuZ2UocG9ydHJhaXQsbGFuZHNjYXBlKXtcblx0aWYocG9ydHJhaXQmJmxhbmRzY2FwZSl7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLG9uT3JpZW50YXRpb25jaGFuZ2UgLGZhbHNlKTtcblx0fVxuXHRmdW5jdGlvbiBvbk9yaWVudGF0aW9uY2hhbmdlKCkge1xuXHRcdGlmICh3aW5kb3cub3JpZW50YXRpb24gPT09IDE4MCB8fCB3aW5kb3cub3JpZW50YXRpb24gPT09IDApIHtcblx0XHRcdGlmKHBvcnRyYWl0KXtcblx0XHRcdFx0cG9ydHJhaXQoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHdpbmRvdy5vcmllbnRhdGlvbiA9PT0gOTAgfHwgd2luZG93Lm9yaWVudGF0aW9uID09PSAtOTAgKXtcblx0XHRcdGlmKGxhbmRzY2FwZSl7XG5cdFx0XHRcdGxhbmRzY2FwZSgpO1xuXHRcdFx0fVxuXHRcdH0gXG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0e1xuXHRPcmllbnRhdGlvbkNoYW5nZSA6IE9yaWVudGF0aW9uQ2hhbmdlLFxufSIsIi8q5Y+W5LqC5pW45YC8Ki9cbmZ1bmN0aW9uIEdldFJhbmRvbShtaW5OdW0sIG1heE51bSkge1xuXHRyZXR1cm4gTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIChtYXhOdW0gLSBtaW5OdW0gKyAxKSApICsgbWluTnVtO1xufVxuXG5leHBvcnQgZGVmYXVsdHtcblx0R2V0UmFuZG9tIDogR2V0UmFuZG9tLFxufSIsIi8q5oqTaHRtbCBnZXTlj4PmlbgqL1xuZnVuY3Rpb24gVXJsU2VhcmNoKCl7XG5cdHZhciBzdHJVcmwgPSBsb2NhdGlvbi5zZWFyY2g7XG5cdHZhciBnZXRQYXJhLCBQYXJhVmFsO1xuXHR2YXIgYXJ5UGFyYSA9IFtdO1xuXHRpZiAoc3RyVXJsLmluZGV4T2YoXCI/XCIpICE9IC0xKSB7XG5cdFx0dmFyIGdldFNlYXJjaCA9IHN0clVybC5zcGxpdChcIj9cIik7XG5cdFx0Z2V0UGFyYSA9IGdldFNlYXJjaFsxXS5zcGxpdChcIiZcIik7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBnZXRQYXJhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFBhcmFWYWwgPSBnZXRQYXJhW2ldLnNwbGl0KFwiPVwiKTtcblx0XHRcdFx0YXJ5UGFyYS5wdXNoKFBhcmFWYWxbMF0pO1xuXHRcdFx0XHRhcnlQYXJhW1BhcmFWYWxbMF1dID0gUGFyYVZhbFsxXTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGFyeVBhcmE7XG59XG5cbmV4cG9ydCBkZWZhdWx0e1xuXHRVcmxTZWFyY2ggOiBVcmxTZWFyY2gsXG59OyIsImltcG9ydCBvYmogZnJvbSBcIi4vcGFnZS5qc1wiO1xuaW1wb3J0IFBpeEcgZnJvbSBcIi4vUGl4TGliL1BpeEdcIjtcbiQoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IG0gPSBuZXcgb2JqKCk7XG4gICAgbS5sb2dGbigpO1xuICAgIGNvbnN0IGkgPSBQaXhHLlNldEludC5HZXRSYW5kb20oMSwgOSk7XG4gICAgY29uc29sZS5sb2coaSk7XG59KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIG1pa2V7XG4gICAgbWlrZSA9IFwibWlrZVwiO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBcbiAgICB9XG4gICAgbG9nRm4gPSAoKSA9PntcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5taWtlKTtcbiAgICB9XG59Il19

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

	var PLUS = '+'.charCodeAt(0);
	var SLASH = '/'.charCodeAt(0);
	var NUMBER = '0'.charCodeAt(0);
	var LOWER = 'a'.charCodeAt(0);
	var UPPER = 'A'.charCodeAt(0);
	var PLUS_URL_SAFE = '-'.charCodeAt(0);
	var SLASH_URL_SAFE = '_'.charCodeAt(0);

	function decode(elt) {
		var code = elt.charCodeAt(0);
		if (code === PLUS || code === PLUS_URL_SAFE) return 62; // '+'
		if (code === SLASH || code === SLASH_URL_SAFE) return 63; // '/'
		if (code < NUMBER) return -1; //no match
		if (code < NUMBER + 10) return code - NUMBER + 26 + 26;
		if (code < UPPER + 26) return code - UPPER;
		if (code < LOWER + 26) return code - LOWER + 26;
	}

	function b64ToByteArray(b64) {
		var i, j, l, tmp, placeHolders, arr;

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4');
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length;
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders);

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length;

		var L = 0;

		function push(v) {
			arr[L++] = v;
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
			push((tmp & 0xFF0000) >> 16);
			push((tmp & 0xFF00) >> 8);
			push(tmp & 0xFF);
		}

		if (placeHolders === 2) {
			tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
			push(tmp & 0xFF);
		} else if (placeHolders === 1) {
			tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
			push(tmp >> 8 & 0xFF);
			push(tmp & 0xFF);
		}

		return arr;
	}

	function uint8ToBase64(uint8) {
		var i,
		    extraBytes = uint8.length % 3,
		    // if we have 1 byte left, pad 2 bytes
		output = "",
		    temp,
		    length;

		function encode(num) {
			return lookup.charAt(num);
		}

		function tripletToBase64(num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
			output += tripletToBase64(temp);
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1];
				output += encode(temp >> 2);
				output += encode(temp << 4 & 0x3F);
				output += '==';
				break;
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
				output += encode(temp >> 10);
				output += encode(temp >> 4 & 0x3F);
				output += encode(temp << 2 & 0x3F);
				output += '=';
				break;
		}

		return output;
	}

	exports.toByteArray = b64ToByteArray;
	exports.fromByteArray = uint8ToBase64;
})(typeof exports === 'undefined' ? undefined.base64js = {} : exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImI2NC5qcyJdLCJuYW1lcyI6WyJsb29rdXAiLCJleHBvcnRzIiwiQXJyIiwiVWludDhBcnJheSIsIkFycmF5IiwiUExVUyIsImNoYXJDb2RlQXQiLCJTTEFTSCIsIk5VTUJFUiIsIkxPV0VSIiwiVVBQRVIiLCJQTFVTX1VSTF9TQUZFIiwiU0xBU0hfVVJMX1NBRkUiLCJkZWNvZGUiLCJlbHQiLCJjb2RlIiwiYjY0VG9CeXRlQXJyYXkiLCJiNjQiLCJpIiwiaiIsImwiLCJ0bXAiLCJwbGFjZUhvbGRlcnMiLCJhcnIiLCJsZW5ndGgiLCJFcnJvciIsImxlbiIsImNoYXJBdCIsIkwiLCJwdXNoIiwidiIsInVpbnQ4VG9CYXNlNjQiLCJ1aW50OCIsImV4dHJhQnl0ZXMiLCJvdXRwdXQiLCJ0ZW1wIiwiZW5jb2RlIiwibnVtIiwidHJpcGxldFRvQmFzZTY0IiwidG9CeXRlQXJyYXkiLCJmcm9tQnl0ZUFycmF5IiwiYmFzZTY0anMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsU0FBUyxrRUFBYjs7QUFFQSxDQUFFLFdBQVVDLE9BQVYsRUFBbUI7QUFDcEI7O0FBRUMsS0FBSUMsTUFBTyxPQUFPQyxVQUFQLEtBQXNCLFdBQXZCLEdBQ05BLFVBRE0sR0FFTkMsS0FGSjs7QUFJRCxLQUFJQyxPQUFTLElBQUlDLFVBQUosQ0FBZSxDQUFmLENBQWI7QUFDQSxLQUFJQyxRQUFTLElBQUlELFVBQUosQ0FBZSxDQUFmLENBQWI7QUFDQSxLQUFJRSxTQUFTLElBQUlGLFVBQUosQ0FBZSxDQUFmLENBQWI7QUFDQSxLQUFJRyxRQUFTLElBQUlILFVBQUosQ0FBZSxDQUFmLENBQWI7QUFDQSxLQUFJSSxRQUFTLElBQUlKLFVBQUosQ0FBZSxDQUFmLENBQWI7QUFDQSxLQUFJSyxnQkFBZ0IsSUFBSUwsVUFBSixDQUFlLENBQWYsQ0FBcEI7QUFDQSxLQUFJTSxpQkFBaUIsSUFBSU4sVUFBSixDQUFlLENBQWYsQ0FBckI7O0FBRUEsVUFBU08sTUFBVCxDQUFpQkMsR0FBakIsRUFB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QUFQO0FBQ0FVLGNBQVVFLE9BQU9ELFFBQVEsQ0FBZixDQUFWO0FBQ0FELGNBQVVFLE9BQVFELFFBQVEsQ0FBVCxHQUFjLElBQXJCLENBQVY7QUFDQUQsY0FBVSxJQUFWO0FBQ0E7QUFDRCxRQUFLLENBQUw7QUFDQ0MsV0FBTyxDQUFDSCxNQUFNQSxNQUFNUixNQUFOLEdBQWUsQ0FBckIsS0FBMkIsQ0FBNUIsSUFBa0NRLE1BQU1BLE1BQU1SLE1BQU4sR0FBZSxDQUFyQixDQUF6QztBQUNBVSxjQUFVRSxPQUFPRCxRQUFRLEVBQWYsQ0FBVjtBQUNBRCxjQUFVRSxPQUFRRCxRQUFRLENBQVQsR0FBYyxJQUFyQixDQUFWO0FBQ0FELGNBQVVFLE9BQVFELFFBQVEsQ0FBVCxHQUFjLElBQXJCLENBQVY7QUFDQUQsY0FBVSxHQUFWO0FBQ0E7QUFiRjs7QUFnQkEsU0FBT0EsTUFBUDtBQUNBOztBQUVEakMsU0FBUXNDLFdBQVIsR0FBc0J2QixjQUF0QjtBQUNBZixTQUFRdUMsYUFBUixHQUF3QlQsYUFBeEI7QUFDQSxDQXpIQyxFQXlIQSxPQUFPOUIsT0FBUCxLQUFtQixXQUFuQixHQUFrQyxVQUFLd0MsUUFBTCxHQUFnQixFQUFsRCxHQUF3RHhDLE9Bekh4RCxDQUFEIiwiZmlsZSI6ImI2NC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBsb29rdXAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cbjsoZnVuY3Rpb24gKGV4cG9ydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG4gIHZhciBBcnIgPSAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKVxuICAgID8gVWludDhBcnJheVxuICAgIDogQXJyYXlcblxuXHR2YXIgUExVUyAgID0gJysnLmNoYXJDb2RlQXQoMClcblx0dmFyIFNMQVNIICA9ICcvJy5jaGFyQ29kZUF0KDApXG5cdHZhciBOVU1CRVIgPSAnMCcuY2hhckNvZGVBdCgwKVxuXHR2YXIgTE9XRVIgID0gJ2EnLmNoYXJDb2RlQXQoMClcblx0dmFyIFVQUEVSICA9ICdBJy5jaGFyQ29kZUF0KDApXG5cdHZhciBQTFVTX1VSTF9TQUZFID0gJy0nLmNoYXJDb2RlQXQoMClcblx0dmFyIFNMQVNIX1VSTF9TQUZFID0gJ18nLmNoYXJDb2RlQXQoMClcblxuXHRmdW5jdGlvbiBkZWNvZGUgKGVsdCkge1xuXHRcdHZhciBjb2RlID0gZWx0LmNoYXJDb2RlQXQoMClcblx0XHRpZiAoY29kZSA9PT0gUExVUyB8fFxuXHRcdCAgICBjb2RlID09PSBQTFVTX1VSTF9TQUZFKVxuXHRcdFx0cmV0dXJuIDYyIC8vICcrJ1xuXHRcdGlmIChjb2RlID09PSBTTEFTSCB8fFxuXHRcdCAgICBjb2RlID09PSBTTEFTSF9VUkxfU0FGRSlcblx0XHRcdHJldHVybiA2MyAvLyAnLydcblx0XHRpZiAoY29kZSA8IE5VTUJFUilcblx0XHRcdHJldHVybiAtMSAvL25vIG1hdGNoXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIgKyAxMClcblx0XHRcdHJldHVybiBjb2RlIC0gTlVNQkVSICsgMjYgKyAyNlxuXHRcdGlmIChjb2RlIDwgVVBQRVIgKyAyNilcblx0XHRcdHJldHVybiBjb2RlIC0gVVBQRVJcblx0XHRpZiAoY29kZSA8IExPV0VSICsgMjYpXG5cdFx0XHRyZXR1cm4gY29kZSAtIExPV0VSICsgMjZcblx0fVxuXG5cdGZ1bmN0aW9uIGI2NFRvQnl0ZUFycmF5IChiNjQpIHtcblx0XHR2YXIgaSwgaiwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuXG5cdFx0aWYgKGI2NC5sZW5ndGggJSA0ID4gMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0Jylcblx0XHR9XG5cblx0XHQvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuXHRcdC8vIGlmIHRoZXJlIGFyZSB0d28gcGxhY2Vob2xkZXJzLCB0aGFuIHRoZSB0d28gY2hhcmFjdGVycyBiZWZvcmUgaXRcblx0XHQvLyByZXByZXNlbnQgb25lIGJ5dGVcblx0XHQvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcblx0XHQvLyB0aGlzIGlzIGp1c3QgYSBjaGVhcCBoYWNrIHRvIG5vdCBkbyBpbmRleE9mIHR3aWNlXG5cdFx0dmFyIGxlbiA9IGI2NC5sZW5ndGhcblx0XHRwbGFjZUhvbGRlcnMgPSAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMikgPyAyIDogJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDEpID8gMSA6IDBcblxuXHRcdC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuXHRcdGFyciA9IG5ldyBBcnIoYjY0Lmxlbmd0aCAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKVxuXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuXHRcdGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gYjY0Lmxlbmd0aCAtIDQgOiBiNjQubGVuZ3RoXG5cblx0XHR2YXIgTCA9IDBcblxuXHRcdGZ1bmN0aW9uIHB1c2ggKHYpIHtcblx0XHRcdGFycltMKytdID0gdlxuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGogPSAwOyBpIDwgbDsgaSArPSA0LCBqICs9IDMpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTgpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgMTIpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPDwgNikgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMykpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDAwMCkgPj4gMTYpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDApID4+IDgpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fVxuXG5cdFx0aWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAyKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpID4+IDQpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fSBlbHNlIGlmIChwbGFjZUhvbGRlcnMgPT09IDEpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTApIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgNCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA+PiAyKVxuXHRcdFx0cHVzaCgodG1wID4+IDgpICYgMHhGRilcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyXG5cdH1cblxuXHRmdW5jdGlvbiB1aW50OFRvQmFzZTY0ICh1aW50OCkge1xuXHRcdHZhciBpLFxuXHRcdFx0ZXh0cmFCeXRlcyA9IHVpbnQ4Lmxlbmd0aCAlIDMsIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG5cdFx0XHRvdXRwdXQgPSBcIlwiLFxuXHRcdFx0dGVtcCwgbGVuZ3RoXG5cblx0XHRmdW5jdGlvbiBlbmNvZGUgKG51bSkge1xuXHRcdFx0cmV0dXJuIGxvb2t1cC5jaGFyQXQobnVtKVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKG51bSA+PiAxOCAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiAxMiAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiA2ICYgMHgzRikgKyBlbmNvZGUobnVtICYgMHgzRilcblx0XHR9XG5cblx0XHQvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG5cdFx0Zm9yIChpID0gMCwgbGVuZ3RoID0gdWludDgubGVuZ3RoIC0gZXh0cmFCeXRlczsgaSA8IGxlbmd0aDsgaSArPSAzKSB7XG5cdFx0XHR0ZW1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuXHRcdFx0b3V0cHV0ICs9IHRyaXBsZXRUb0Jhc2U2NCh0ZW1wKVxuXHRcdH1cblxuXHRcdC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcblx0XHRzd2l0Y2ggKGV4dHJhQnl0ZXMpIHtcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0dGVtcCA9IHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAyKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wIDw8IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9ICc9PSdcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0dGVtcCA9ICh1aW50OFt1aW50OC5sZW5ndGggLSAyXSA8PCA4KSArICh1aW50OFt1aW50OC5sZW5ndGggLSAxXSlcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDEwKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wID4+IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA8PCAyKSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSAnPSdcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0XG5cdH1cblxuXHRleHBvcnRzLnRvQnl0ZUFycmF5ID0gYjY0VG9CeXRlQXJyYXlcblx0ZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gdWludDhUb0Jhc2U2NFxufSh0eXBlb2YgZXhwb3J0cyA9PT0gJ3VuZGVmaW5lZCcgPyAodGhpcy5iYXNlNjRqcyA9IHt9KSA6IGV4cG9ydHMpKVxuIl19
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\gulp-browserify\\node_modules\\base64-js\\lib\\b64.js","/..\\node_modules\\gulp-browserify\\node_modules\\base64-js\\lib")
},{"2ionoC":3,"buffer":2}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js');
var ieee754 = require('ieee754');

exports.Buffer = Buffer;
exports.SlowBuffer = Buffer;
exports.INSPECT_MAX_BYTES = 50;
Buffer.poolSize = 8192;

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0);
    var arr = new Uint8Array(buf);
    arr.foo = function () {
      return 42;
    };
    return 42 === arr.foo() && typeof arr.subarray === 'function'; // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false;
  }
}();

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer(subject, encoding, noZero) {
  if (!(this instanceof Buffer)) return new Buffer(subject, encoding, noZero);

  var type = typeof subject === 'undefined' ? 'undefined' : _typeof(subject);

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject);
    while (subject.length % 4 !== 0) {
      subject = subject + '=';
    }
  }

  // Find the length
  var length;
  if (type === 'number') length = coerce(subject);else if (type === 'string') length = Buffer.byteLength(subject, encoding);else if (type === 'object') length = coerce(subject.length); // assume that object is array-like
  else throw new Error('First argument needs to be a number, array or string.');

  var buf;
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length));
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this;
    buf.length = length;
    buf._isBuffer = true;
  }

  var i;
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject);
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject)) buf[i] = subject.readUInt8(i);else buf[i] = subject[i];
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding);
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0;
    }
  }

  return buf;
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;
    default:
      return false;
  }
};

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer);
};

Buffer.byteLength = function (str, encoding) {
  var ret;
  str = str + '';
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2;
      break;
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length;
      break;
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length;
      break;
    case 'base64':
      ret = base64ToBytes(str).length;
      break;
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2;
      break;
    default:
      throw new Error('Unknown encoding');
  }
  return ret;
};

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' + 'list should be an Array.');

  if (list.length === 0) {
    return new Buffer(0);
  } else if (list.length === 1) {
    return list[0];
  }

  var i;
  if (typeof totalLength !== 'number') {
    totalLength = 0;
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length;
    }
  }

  var buf = new Buffer(totalLength);
  var pos = 0;
  for (i = 0; i < list.length; i++) {
    var item = list[i];
    item.copy(buf, pos);
    pos += item.length;
  }
  return buf;
};

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  assert(strLen % 2 === 0, 'Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16);
    assert(!isNaN(byte), 'Invalid hex string');
    buf[offset + i] = byte;
  }
  Buffer._charsWritten = i * 2;
  return i;
}

function _utf8Write(buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length);
  return charsWritten;
}

function _asciiWrite(buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length);
  return charsWritten;
}

function _binaryWrite(buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length);
}

function _base64Write(buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length);
  return charsWritten;
}

function _utf16leWrite(buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length);
  return charsWritten;
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length;
      length = undefined;
    }
  } else {
    // legacy
    var swap = encoding;
    encoding = offset;
    offset = length;
    length = swap;
  }

  offset = Number(offset) || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase();

  var ret;
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length);
      break;
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length);
      break;
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length);
      break;
    case 'binary':
      ret = _binaryWrite(this, string, offset, length);
      break;
    case 'base64':
      ret = _base64Write(this, string, offset, length);
      break;
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length);
      break;
    default:
      throw new Error('Unknown encoding');
  }
  return ret;
};

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this;

  encoding = String(encoding || 'utf8').toLowerCase();
  start = Number(start) || 0;
  end = end !== undefined ? Number(end) : end = self.length;

  // Fastpath empty strings
  if (end === start) return '';

  var ret;
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end);
      break;
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end);
      break;
    case 'ascii':
      ret = _asciiSlice(self, start, end);
      break;
    case 'binary':
      ret = _binarySlice(self, start, end);
      break;
    case 'base64':
      ret = _base64Slice(self, start, end);
      break;
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end);
      break;
    default:
      throw new Error('Unknown encoding');
  }
  return ret;
};

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this;

  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (!target_start) target_start = 0;

  // Copy 0 bytes; we're done
  if (end === start) return;
  if (target.length === 0 || source.length === 0) return;

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart');
  assert(target_start >= 0 && target_start < target.length, 'targetStart out of bounds');
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds');
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds');

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - target_start < end - start) end = target.length - target_start + start;

  var len = end - start;

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++) {
      target[i + target_start] = this[i + start];
    }
  } else {
    target._set(this.subarray(start, start + len), target_start);
  }
};

function _base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function _utf8Slice(buf, start, end) {
  var res = '';
  var tmp = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i]);
      tmp = '';
    } else {
      tmp += '%' + buf[i].toString(16);
    }
  }

  return res + decodeUtf8Char(tmp);
}

function _asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i]);
  }return ret;
}

function _binarySlice(buf, start, end) {
  return _asciiSlice(buf, start, end);
}

function _hexSlice(buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; i++) {
    out += toHex(buf[i]);
  }
  return out;
}

function _utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length;
  start = clamp(start, len, 0);
  end = clamp(end, len, len);

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end));
  } else {
    var sliceLen = end - start;
    var newBuf = new Buffer(sliceLen, undefined, true);
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start];
    }
    return newBuf;
  }
};

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.');
  return this.readUInt8(offset);
};

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.');
  return this.writeUInt8(v, offset);
};

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset');
    assert(offset < this.length, 'Trying to read beyond buffer length');
  }

  if (offset >= this.length) return;

  return this[offset];
};

function _readUInt16(buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
    assert(offset !== undefined && offset !== null, 'missing offset');
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length');
  }

  var len = buf.length;
  if (offset >= len) return;

  var val;
  if (littleEndian) {
    val = buf[offset];
    if (offset + 1 < len) val |= buf[offset + 1] << 8;
  } else {
    val = buf[offset] << 8;
    if (offset + 1 < len) val |= buf[offset + 1];
  }
  return val;
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert);
};

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert);
};

function _readUInt32(buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
    assert(offset !== undefined && offset !== null, 'missing offset');
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
  }

  var len = buf.length;
  if (offset >= len) return;

  var val;
  if (littleEndian) {
    if (offset + 2 < len) val = buf[offset + 2] << 16;
    if (offset + 1 < len) val |= buf[offset + 1] << 8;
    val |= buf[offset];
    if (offset + 3 < len) val = val + (buf[offset + 3] << 24 >>> 0);
  } else {
    if (offset + 1 < len) val = buf[offset + 1] << 16;
    if (offset + 2 < len) val |= buf[offset + 2] << 8;
    if (offset + 3 < len) val |= buf[offset + 3];
    val = val + (buf[offset] << 24 >>> 0);
  }
  return val;
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert);
};

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert);
};

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset');
    assert(offset < this.length, 'Trying to read beyond buffer length');
  }

  if (offset >= this.length) return;

  var neg = this[offset] & 0x80;
  if (neg) return (0xff - this[offset] + 1) * -1;else return this[offset];
};

function _readInt16(buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
    assert(offset !== undefined && offset !== null, 'missing offset');
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length');
  }

  var len = buf.length;
  if (offset >= len) return;

  var val = _readUInt16(buf, offset, littleEndian, true);
  var neg = val & 0x8000;
  if (neg) return (0xffff - val + 1) * -1;else return val;
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert);
};

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert);
};

function _readInt32(buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
    assert(offset !== undefined && offset !== null, 'missing offset');
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
  }

  var len = buf.length;
  if (offset >= len) return;

  var val = _readUInt32(buf, offset, littleEndian, true);
  var neg = val & 0x80000000;
  if (neg) return (0xffffffff - val + 1) * -1;else return val;
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert);
};

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert);
};

function _readFloat(buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4);
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert);
};

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert);
};

function _readDouble(buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length');
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8);
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert);
};

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert);
};

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value');
    assert(offset !== undefined && offset !== null, 'missing offset');
    assert(offset < this.length, 'trying to write beyond buffer length');
    verifuint(value, 0xff);
  }

  if (offset >= this.length) return;

  this[offset] = value;
};

function _writeUInt16(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value');
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
    assert(offset !== undefined && offset !== null, 'missing offset');
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length');
    verifuint(value, 0xffff);
  }

  var len = buf.length;
  if (offset >= len) return;

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert);
};

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert);
};

function _writeUInt32(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value');
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
    assert(offset !== undefined && offset !== null, 'missing offset');
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length');
    verifuint(value, 0xffffffff);
  }

  var len = buf.length;
  if (offset >= len) return;

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert);
};

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert);
};

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value');
    assert(offset !== undefined && offset !== null, 'missing offset');
    assert(offset < this.length, 'Trying to write beyond buffer length');
    verifsint(value, 0x7f, -0x80);
  }

  if (offset >= this.length) return;

  if (value >= 0) this.writeUInt8(value, offset, noAssert);else this.writeUInt8(0xff + value + 1, offset, noAssert);
};

function _writeInt16(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value');
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
    assert(offset !== undefined && offset !== null, 'missing offset');
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length');
    verifsint(value, 0x7fff, -0x8000);
  }

  var len = buf.length;
  if (offset >= len) return;

  if (value >= 0) _writeUInt16(buf, value, offset, littleEndian, noAssert);else _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert);
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert);
};

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert);
};

function _writeInt32(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value');
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
    assert(offset !== undefined && offset !== null, 'missing offset');
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length');
    verifsint(value, 0x7fffffff, -0x80000000);
  }

  var len = buf.length;
  if (offset >= len) return;

  if (value >= 0) _writeUInt32(buf, value, offset, littleEndian, noAssert);else _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert);
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert);
};

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert);
};

function _writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value');
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
    assert(offset !== undefined && offset !== null, 'missing offset');
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length');
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }

  var len = buf.length;
  if (offset >= len) return;

  ieee754.write(buf, value, offset, littleEndian, 23, 4);
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert);
};

function _writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value');
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
    assert(offset !== undefined && offset !== null, 'missing offset');
    assert(offset + 7 < buf.length, 'Trying to write beyond buffer length');
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }

  var len = buf.length;
  if (offset >= len) return;

  ieee754.write(buf, value, offset, littleEndian, 52, 8);
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert);
};

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0;
  if (!start) start = 0;
  if (!end) end = this.length;

  if (typeof value === 'string') {
    value = value.charCodeAt(0);
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number');
  assert(end >= start, 'end < start');

  // Fill 0 bytes; we're done
  if (end === start) return;
  if (this.length === 0) return;

  assert(start >= 0 && start < this.length, 'start out of bounds');
  assert(end >= 0 && end <= this.length, 'end out of bounds');

  for (var i = start; i < end; i++) {
    this[i] = value;
  }
};

Buffer.prototype.inspect = function () {
  var out = [];
  var len = this.length;
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i]);
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...';
      break;
    }
  }
  return '<Buffer ' + out.join(' ') + '>';
};

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return new Buffer(this).buffer;
    } else {
      var buf = new Uint8Array(this.length);
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i];
      }return buf.buffer;
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser');
  }
};

// HELPER FUNCTIONS
// ================

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

var BP = Buffer.prototype;

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true;

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get;
  arr._set = arr.set;

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get;
  arr.set = BP.set;

  arr.write = BP.write;
  arr.toString = BP.toString;
  arr.toLocaleString = BP.toString;
  arr.toJSON = BP.toJSON;
  arr.copy = BP.copy;
  arr.slice = BP.slice;
  arr.readUInt8 = BP.readUInt8;
  arr.readUInt16LE = BP.readUInt16LE;
  arr.readUInt16BE = BP.readUInt16BE;
  arr.readUInt32LE = BP.readUInt32LE;
  arr.readUInt32BE = BP.readUInt32BE;
  arr.readInt8 = BP.readInt8;
  arr.readInt16LE = BP.readInt16LE;
  arr.readInt16BE = BP.readInt16BE;
  arr.readInt32LE = BP.readInt32LE;
  arr.readInt32BE = BP.readInt32BE;
  arr.readFloatLE = BP.readFloatLE;
  arr.readFloatBE = BP.readFloatBE;
  arr.readDoubleLE = BP.readDoubleLE;
  arr.readDoubleBE = BP.readDoubleBE;
  arr.writeUInt8 = BP.writeUInt8;
  arr.writeUInt16LE = BP.writeUInt16LE;
  arr.writeUInt16BE = BP.writeUInt16BE;
  arr.writeUInt32LE = BP.writeUInt32LE;
  arr.writeUInt32BE = BP.writeUInt32BE;
  arr.writeInt8 = BP.writeInt8;
  arr.writeInt16LE = BP.writeInt16LE;
  arr.writeInt16BE = BP.writeInt16BE;
  arr.writeInt32LE = BP.writeInt32LE;
  arr.writeInt32BE = BP.writeInt32BE;
  arr.writeFloatLE = BP.writeFloatLE;
  arr.writeFloatBE = BP.writeFloatBE;
  arr.writeDoubleLE = BP.writeDoubleLE;
  arr.writeDoubleBE = BP.writeDoubleBE;
  arr.fill = BP.fill;
  arr.inspect = BP.inspect;
  arr.toArrayBuffer = BP.toArrayBuffer;

  return arr;
};

// slice(start, end)
function clamp(index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue;
  index = ~~index; // Coerce to integer.
  if (index >= len) return len;
  if (index >= 0) return index;
  index += len;
  if (index >= 0) return index;
  return 0;
}

function coerce(length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length);
  return length < 0 ? 0 : length;
}

function isArray(subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]';
  })(subject);
}

function isArrayish(subject) {
  return isArray(subject) || Buffer.isBuffer(subject) || subject && (typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) === 'object' && typeof subject.length === 'number';
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i);
    if (b <= 0x7F) byteArray.push(str.charCodeAt(i));else {
      var start = i;
      if (b >= 0xD800 && b <= 0xDFFF) i++;
      var h = encodeURIComponent(str.slice(start, i + 1)).substr(1).split('%');
      for (var j = 0; j < h.length; j++) {
        byteArray.push(parseInt(h[j], 16));
      }
    }
  }
  return byteArray;
}

function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray;
}

function utf16leToBytes(str) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(str);
}

function blitBuffer(src, dst, offset, length) {
  var pos;
  for (var i = 0; i < length; i++) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}

function decodeUtf8Char(str) {
  try {
    return decodeURIComponent(str);
  } catch (err) {
    return String.fromCharCode(0xFFFD); // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint(value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number');
  assert(value >= 0, 'specified a negative value for writing an unsigned value');
  assert(value <= max, 'value is larger than maximum value for type');
  assert(Math.floor(value) === value, 'value has a fractional component');
}

function verifsint(value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number');
  assert(value <= max, 'value larger than maximum allowed value');
  assert(value >= min, 'value smaller than minimum allowed value');
  assert(Math.floor(value) === value, 'value has a fractional component');
}

function verifIEEE754(value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number');
  assert(value <= max, 'value larger than maximum allowed value');
  assert(value >= min, 'value smaller than minimum allowed value');
}

function assert(test, message) {
  if (!test) throw new Error(message || 'Failed assertion');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImJhc2U2NCIsInJlcXVpcmUiLCJpZWVlNzU0IiwiZXhwb3J0cyIsIkJ1ZmZlciIsIlNsb3dCdWZmZXIiLCJJTlNQRUNUX01BWF9CWVRFUyIsInBvb2xTaXplIiwiX3VzZVR5cGVkQXJyYXlzIiwiYnVmIiwiQXJyYXlCdWZmZXIiLCJhcnIiLCJVaW50OEFycmF5IiwiZm9vIiwic3ViYXJyYXkiLCJlIiwic3ViamVjdCIsImVuY29kaW5nIiwibm9aZXJvIiwidHlwZSIsInN0cmluZ3RyaW0iLCJsZW5ndGgiLCJjb2VyY2UiLCJieXRlTGVuZ3RoIiwiRXJyb3IiLCJfYXVnbWVudCIsIl9pc0J1ZmZlciIsImkiLCJfc2V0IiwiaXNBcnJheWlzaCIsImlzQnVmZmVyIiwicmVhZFVJbnQ4Iiwid3JpdGUiLCJpc0VuY29kaW5nIiwiU3RyaW5nIiwidG9Mb3dlckNhc2UiLCJiIiwidW5kZWZpbmVkIiwic3RyIiwicmV0IiwidXRmOFRvQnl0ZXMiLCJiYXNlNjRUb0J5dGVzIiwiY29uY2F0IiwibGlzdCIsInRvdGFsTGVuZ3RoIiwiYXNzZXJ0IiwiaXNBcnJheSIsInBvcyIsIml0ZW0iLCJjb3B5IiwiX2hleFdyaXRlIiwic3RyaW5nIiwib2Zmc2V0IiwiTnVtYmVyIiwicmVtYWluaW5nIiwic3RyTGVuIiwiYnl0ZSIsInBhcnNlSW50Iiwic3Vic3RyIiwiaXNOYU4iLCJfY2hhcnNXcml0dGVuIiwiX3V0ZjhXcml0ZSIsImNoYXJzV3JpdHRlbiIsImJsaXRCdWZmZXIiLCJfYXNjaWlXcml0ZSIsImFzY2lpVG9CeXRlcyIsIl9iaW5hcnlXcml0ZSIsIl9iYXNlNjRXcml0ZSIsIl91dGYxNmxlV3JpdGUiLCJ1dGYxNmxlVG9CeXRlcyIsInByb3RvdHlwZSIsImlzRmluaXRlIiwic3dhcCIsInRvU3RyaW5nIiwic3RhcnQiLCJlbmQiLCJzZWxmIiwiX2hleFNsaWNlIiwiX3V0ZjhTbGljZSIsIl9hc2NpaVNsaWNlIiwiX2JpbmFyeVNsaWNlIiwiX2Jhc2U2NFNsaWNlIiwiX3V0ZjE2bGVTbGljZSIsInRvSlNPTiIsImRhdGEiLCJBcnJheSIsInNsaWNlIiwiY2FsbCIsIl9hcnIiLCJ0YXJnZXQiLCJ0YXJnZXRfc3RhcnQiLCJzb3VyY2UiLCJsZW4iLCJmcm9tQnl0ZUFycmF5IiwicmVzIiwidG1wIiwiTWF0aCIsIm1pbiIsImRlY29kZVV0ZjhDaGFyIiwiZnJvbUNoYXJDb2RlIiwib3V0IiwidG9IZXgiLCJieXRlcyIsImNsYW1wIiwic2xpY2VMZW4iLCJuZXdCdWYiLCJnZXQiLCJjb25zb2xlIiwibG9nIiwic2V0IiwidiIsIndyaXRlVUludDgiLCJub0Fzc2VydCIsIl9yZWFkVUludDE2IiwibGl0dGxlRW5kaWFuIiwidmFsIiwicmVhZFVJbnQxNkxFIiwicmVhZFVJbnQxNkJFIiwiX3JlYWRVSW50MzIiLCJyZWFkVUludDMyTEUiLCJyZWFkVUludDMyQkUiLCJyZWFkSW50OCIsIm5lZyIsIl9yZWFkSW50MTYiLCJyZWFkSW50MTZMRSIsInJlYWRJbnQxNkJFIiwiX3JlYWRJbnQzMiIsInJlYWRJbnQzMkxFIiwicmVhZEludDMyQkUiLCJfcmVhZEZsb2F0IiwicmVhZCIsInJlYWRGbG9hdExFIiwicmVhZEZsb2F0QkUiLCJfcmVhZERvdWJsZSIsInJlYWREb3VibGVMRSIsInJlYWREb3VibGVCRSIsInZhbHVlIiwidmVyaWZ1aW50IiwiX3dyaXRlVUludDE2IiwiaiIsIndyaXRlVUludDE2TEUiLCJ3cml0ZVVJbnQxNkJFIiwiX3dyaXRlVUludDMyIiwid3JpdGVVSW50MzJMRSIsIndyaXRlVUludDMyQkUiLCJ3cml0ZUludDgiLCJ2ZXJpZnNpbnQiLCJfd3JpdGVJbnQxNiIsIndyaXRlSW50MTZMRSIsIndyaXRlSW50MTZCRSIsIl93cml0ZUludDMyIiwid3JpdGVJbnQzMkxFIiwid3JpdGVJbnQzMkJFIiwiX3dyaXRlRmxvYXQiLCJ2ZXJpZklFRUU3NTQiLCJ3cml0ZUZsb2F0TEUiLCJ3cml0ZUZsb2F0QkUiLCJfd3JpdGVEb3VibGUiLCJ3cml0ZURvdWJsZUxFIiwid3JpdGVEb3VibGVCRSIsImZpbGwiLCJjaGFyQ29kZUF0IiwiaW5zcGVjdCIsImpvaW4iLCJ0b0FycmF5QnVmZmVyIiwiYnVmZmVyIiwidHJpbSIsInJlcGxhY2UiLCJCUCIsIl9nZXQiLCJ0b0xvY2FsZVN0cmluZyIsImluZGV4IiwiZGVmYXVsdFZhbHVlIiwiY2VpbCIsIk9iamVjdCIsIm4iLCJieXRlQXJyYXkiLCJwdXNoIiwiaCIsImVuY29kZVVSSUNvbXBvbmVudCIsInNwbGl0IiwiYyIsImhpIiwibG8iLCJ0b0J5dGVBcnJheSIsInNyYyIsImRzdCIsImRlY29kZVVSSUNvbXBvbmVudCIsImVyciIsIm1heCIsImZsb29yIiwidGVzdCIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7OztBQU9BLElBQUlBLFNBQVNDLFFBQVEsV0FBUixDQUFiO0FBQ0EsSUFBSUMsVUFBVUQsUUFBUSxTQUFSLENBQWQ7O0FBRUFFLFFBQVFDLE1BQVIsR0FBaUJBLE1BQWpCO0FBQ0FELFFBQVFFLFVBQVIsR0FBcUJELE1BQXJCO0FBQ0FELFFBQVFHLGlCQUFSLEdBQTRCLEVBQTVCO0FBQ0FGLE9BQU9HLFFBQVAsR0FBa0IsSUFBbEI7O0FBRUE7Ozs7O0FBS0FILE9BQU9JLGVBQVAsR0FBMEIsWUFBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSTtBQUNGLFFBQUlDLE1BQU0sSUFBSUMsV0FBSixDQUFnQixDQUFoQixDQUFWO0FBQ0EsUUFBSUMsTUFBTSxJQUFJQyxVQUFKLENBQWVILEdBQWYsQ0FBVjtBQUNBRSxRQUFJRSxHQUFKLEdBQVUsWUFBWTtBQUFFLGFBQU8sRUFBUDtBQUFXLEtBQW5DO0FBQ0EsV0FBTyxPQUFPRixJQUFJRSxHQUFKLEVBQVAsSUFDSCxPQUFPRixJQUFJRyxRQUFYLEtBQXdCLFVBRDVCLENBSkUsQ0FLcUM7QUFDeEMsR0FORCxDQU1FLE9BQU9DLENBQVAsRUFBVTtBQUNWLFdBQU8sS0FBUDtBQUNEO0FBQ0YsQ0Fm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LEtBQUwsQ0FBV3RELEtBQVgsTUFBc0JBLEtBQTdCLEVBQW9DLGtDQUFwQztBQUNEOztBQUVELFNBQVNrQixZQUFULENBQXVCbEIsS0FBdkIsRUFBOEJxRCxHQUE5QixFQUFtQzVGLEdBQW5DLEVBQXdDO0FBQ3RDcEQsU0FBTyxPQUFPMkYsS0FBUCxLQUFpQixRQUF4QixFQUFrQyx1Q0FBbEM7QUFDQTNGLFNBQU8yRixTQUFTcUQsR0FBaEIsRUFBcUIseUNBQXJCO0FBQ0FoSixTQUFPMkYsU0FBU3ZDLEdBQWhCLEVBQXFCLDBDQUFyQjtBQUNEOztBQUVELFNBQVNwRCxNQUFULENBQWlCa0osSUFBakIsRUFBdUJDLE9BQXZCLEVBQWdDO0FBQzlCLE1BQUksQ0FBQ0QsSUFBTCxFQUFXLE1BQU0sSUFBSXZLLEtBQUosQ0FBVXdLLFdBQVcsa0JBQXJCLENBQU47QUFDWiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTJcblxuLyoqXG4gKiBJZiBgQnVmZmVyLl91c2VUeXBlZEFycmF5c2A6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChjb21wYXRpYmxlIGRvd24gdG8gSUU2KVxuICovXG5CdWZmZXIuX3VzZVR5cGVkQXJyYXlzID0gKGZ1bmN0aW9uICgpIHtcbiAgLy8gRGV0ZWN0IGlmIGJyb3dzZXIgc3VwcG9ydHMgVHlwZWQgQXJyYXlzLiBTdXBwb3J0ZWQgYnJvd3NlcnMgYXJlIElFIDEwKywgRmlyZWZveCA0KyxcbiAgLy8gQ2hyb21lIDcrLCBTYWZhcmkgNS4xKywgT3BlcmEgMTEuNissIGlPUyA0LjIrLiBJZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZ1xuICAvLyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsIHRoZW4gdGhhdCdzIHRoZSBzYW1lIGFzIG5vIGBVaW50OEFycmF5YCBzdXBwb3J0XG4gIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIGFkZCBhbGwgdGhlIG5vZGUgQnVmZmVyIEFQSSBtZXRob2RzLiBUaGlzIGlzIGFuIGlzc3VlXG4gIC8vIGluIEZpcmVmb3ggNC0yOS4gTm93IGZpeGVkOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzhcbiAgdHJ5IHtcbiAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKDApXG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICBhcnIuZm9vID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfVxuICAgIHJldHVybiA0MiA9PT0gYXJyLmZvbygpICYmXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgLy8gQ2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufSkoKVxuXG4vKipcbiAqIENsYXNzOiBCdWZmZXJcbiAqID09PT09PT09PT09PT1cbiAqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGFyZSBhdWdtZW50ZWRcbiAqIHdpdGggZnVuY3Rpb24gcHJvcGVydGllcyBmb3IgYWxsIHRoZSBub2RlIGBCdWZmZXJgIEFQSSBmdW5jdGlvbnMuIFdlIHVzZVxuICogYFVpbnQ4QXJyYXlgIHNvIHRoYXQgc3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXQgcmV0dXJuc1xuICogYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogQnkgYXVnbWVudGluZyB0aGUgaW5zdGFuY2VzLCB3ZSBjYW4gYXZvaWQgbW9kaWZ5aW5nIHRoZSBgVWludDhBcnJheWBcbiAqIHByb3RvdHlwZS5cbiAqL1xuZnVuY3Rpb24gQnVmZmVyIChzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKVxuICAgIHJldHVybiBuZXcgQnVmZmVyKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pXG5cbiAgdmFyIHR5cGUgPSB0eXBlb2Ygc3ViamVjdFxuXG4gIC8vIFdvcmthcm91bmQ6IG5vZGUncyBiYXNlNjQgaW1wbGVtZW50YXRpb24gYWxsb3dzIGZvciBub24tcGFkZGVkIHN0cmluZ3NcbiAgLy8gd2hpbGUgYmFzZTY0LWpzIGRvZXMgbm90LlxuICBpZiAoZW5jb2RpbmcgPT09ICdiYXNlNjQnICYmIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgc3ViamVjdCA9IHN0cmluZ3RyaW0oc3ViamVjdClcbiAgICB3aGlsZSAoc3ViamVjdC5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgICBzdWJqZWN0ID0gc3ViamVjdCArICc9J1xuICAgIH1cbiAgfVxuXG4gIC8vIEZpbmQgdGhlIGxlbmd0aFxuICB2YXIgbGVuZ3RoXG4gIGlmICh0eXBlID09PSAnbnVtYmVyJylcbiAgICBsZW5ndGggPSBjb2VyY2Uoc3ViamVjdClcbiAgZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpXG4gICAgbGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoc3ViamVjdCwgZW5jb2RpbmcpXG4gIGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKVxuICAgIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0Lmxlbmd0aCkgLy8gYXNzdW1lIHRoYXQgb2JqZWN0IGlzIGFycmF5LWxpa2VcbiAgZWxzZVxuICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgbmVlZHMgdG8gYmUgYSBudW1iZXIsIGFycmF5IG9yIHN0cmluZy4nKVxuXG4gIHZhciBidWZcbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICAvLyBQcmVmZXJyZWQ6IFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgYnVmID0gQnVmZmVyLl9hdWdtZW50KG5ldyBVaW50OEFycmF5KGxlbmd0aCkpXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBUSElTIGluc3RhbmNlIG9mIEJ1ZmZlciAoY3JlYXRlZCBieSBgbmV3YClcbiAgICBidWYgPSB0aGlzXG4gICAgYnVmLmxlbmd0aCA9IGxlbmd0aFxuICAgIGJ1Zi5faXNCdWZmZXIgPSB0cnVlXG4gIH1cblxuICB2YXIgaVxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cyAmJiB0eXBlb2Ygc3ViamVjdC5ieXRlTGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgIC8vIFNwZWVkIG9wdGltaXphdGlvbiAtLSB1c2Ugc2V0IGlmIHdlJ3JlIGNvcHlpbmcgZnJvbSBhIHR5cGVkIGFycmF5XG4gICAgYnVmLl9zZXQoc3ViamVjdClcbiAgfSBlbHNlIGlmIChpc0FycmF5aXNoKHN1YmplY3QpKSB7XG4gICAgLy8gVHJlYXQgYXJyYXktaXNoIG9iamVjdHMgYXMgYSBieXRlIGFycmF5XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpKVxuICAgICAgICBidWZbaV0gPSBzdWJqZWN0LnJlYWRVSW50OChpKVxuICAgICAgZWxzZVxuICAgICAgICBidWZbaV0gPSBzdWJqZWN0W2ldXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgYnVmLndyaXRlKHN1YmplY3QsIDAsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzICYmICFub1plcm8pIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGJ1ZltpXSA9IDBcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmXG59XG5cbi8vIFNUQVRJQyBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAncmF3JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gKGIpIHtcbiAgcmV0dXJuICEhKGIgIT09IG51bGwgJiYgYiAhPT0gdW5kZWZpbmVkICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGZ1bmN0aW9uIChzdHIsIGVuY29kaW5nKSB7XG4gIHZhciByZXRcbiAgc3RyID0gc3RyICsgJydcbiAgc3dpdGNoIChlbmNvZGluZyB8fCAndXRmOCcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAvIDJcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gdXRmOFRvQnl0ZXMoc3RyKS5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAncmF3JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IGJhc2U2NFRvQnl0ZXMoc3RyKS5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggKiAyXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIChsaXN0LCB0b3RhbExlbmd0aCkge1xuICBhc3NlcnQoaXNBcnJheShsaXN0KSwgJ1VzYWdlOiBCdWZmZXIuY29uY2F0KGxpc3QsIFt0b3RhbExlbmd0aF0pXFxuJyArXG4gICAgICAnbGlzdCBzaG91bGQgYmUgYW4gQXJyYXkuJylcblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcigwKVxuICB9IGVsc2UgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGxpc3RbMF1cbiAgfVxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdG90YWxMZW5ndGggIT09ICdudW1iZXInKSB7XG4gICAgdG90YWxMZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRvdGFsTGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZiA9IG5ldyBCdWZmZXIodG90YWxMZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgaXRlbS5jb3B5KGJ1ZiwgcG9zKVxuICAgIHBvcyArPSBpdGVtLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZcbn1cblxuLy8gQlVGRkVSIElOU1RBTkNFIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIF9oZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGFzc2VydChzdHJMZW4gJSAyID09PSAwLCAnSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGJ5dGUgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgYXNzZXJ0KCFpc05hTihieXRlKSwgJ0ludmFsaWQgaGV4IHN0cmluZycpXG4gICAgYnVmW29mZnNldCArIGldID0gYnl0ZVxuICB9XG4gIEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gaSAqIDJcbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gX3V0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF9hc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF9iaW5hcnlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBfYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIF9iYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gX3V0ZjE2bGVXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gU3VwcG9ydCBib3RoIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZylcbiAgLy8gYW5kIHRoZSBsZWdhY3kgKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIGlmICghaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHsgIC8vIGxlZ2FjeVxuICAgIHZhciBzd2FwID0gZW5jb2RpbmdcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIG9mZnNldCA9IGxlbmd0aFxuICAgIGxlbmd0aCA9IHN3YXBcbiAgfVxuXG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpXG5cbiAgdmFyIHJldFxuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG5cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpXG4gIHN0YXJ0ID0gTnVtYmVyKHN0YXJ0KSB8fCAwXG4gIGVuZCA9IChlbmQgIT09IHVuZGVmaW5lZClcbiAgICA/IE51bWJlcihlbmQpXG4gICAgOiBlbmQgPSBzZWxmLmxlbmd0aFxuXG4gIC8vIEZhc3RwYXRoIGVtcHR5IHN0cmluZ3NcbiAgaWYgKGVuZCA9PT0gc3RhcnQpXG4gICAgcmV0dXJuICcnXG5cbiAgdmFyIHJldFxuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldF9zdGFydCwgc3RhcnQsIGVuZCkge1xuICB2YXIgc291cmNlID0gdGhpc1xuXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICghdGFyZ2V0X3N0YXJ0KSB0YXJnZXRfc3RhcnQgPSAwXG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm5cbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgc291cmNlLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBhc3NlcnQoZW5kID49IHN0YXJ0LCAnc291cmNlRW5kIDwgc291cmNlU3RhcnQnKVxuICBhc3NlcnQodGFyZ2V0X3N0YXJ0ID49IDAgJiYgdGFyZ2V0X3N0YXJ0IDwgdGFyZ2V0Lmxlbmd0aCxcbiAgICAgICd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCBzb3VyY2UubGVuZ3RoLCAnc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gc291cmNlLmxlbmd0aCwgJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpXG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgPCBlbmQgLSBzdGFydClcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0ICsgc3RhcnRcblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcblxuICBpZiAobGVuIDwgMTAwIHx8ICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0X3N0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICB9IGVsc2Uge1xuICAgIHRhcmdldC5fc2V0KHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSwgdGFyZ2V0X3N0YXJ0KVxuICB9XG59XG5cbmZ1bmN0aW9uIF9iYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gX3V0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXMgPSAnJ1xuICB2YXIgdG1wID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgaWYgKGJ1ZltpXSA8PSAweDdGKSB7XG4gICAgICByZXMgKz0gZGVjb2RlVXRmOENoYXIodG1wKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICAgICAgdG1wID0gJydcbiAgICB9IGVsc2Uge1xuICAgICAgdG1wICs9ICclJyArIGJ1ZltpXS50b1N0cmluZygxNilcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzICsgZGVjb2RlVXRmOENoYXIodG1wKVxufVxuXG5mdW5jdGlvbiBfYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspXG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIF9iaW5hcnlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHJldHVybiBfYXNjaWlTbGljZShidWYsIHN0YXJ0LCBlbmQpXG59XG5cbmZ1bmN0aW9uIF9oZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2krMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gY2xhbXAoc3RhcnQsIGxlbiwgMClcbiAgZW5kID0gY2xhbXAoZW5kLCBsZW4sIGxlbilcblxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIHJldHVybiBCdWZmZXIuX2F1Z21lbnQodGhpcy5zdWJhcnJheShzdGFydCwgZW5kKSlcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIHZhciBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQsIHRydWUpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgaSsrKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gICAgcmV0dXJuIG5ld0J1ZlxuICB9XG59XG5cbi8vIGBnZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5nZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpXG4gIHJldHVybiB0aGlzLnJlYWRVSW50OChvZmZzZXQpXG59XG5cbi8vIGBzZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh2LCBvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5zZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpXG4gIHJldHVybiB0aGlzLndyaXRlVUludDgodiwgb2Zmc2V0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5mdW5jdGlvbiBfcmVhZFVJbnQxNiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWxcbiAgaWYgKGxpdHRsZUVuZGlhbikge1xuICAgIHZhbCA9IGJ1ZltvZmZzZXRdXG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDhcbiAgfSBlbHNlIHtcbiAgICB2YWwgPSBidWZbb2Zmc2V0XSA8PCA4XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWRVSW50MzIgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsXG4gIGlmIChsaXR0bGVFbmRpYW4pIHtcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbilcbiAgICAgIHZhbCA9IGJ1ZltvZmZzZXQgKyAyXSA8PCAxNlxuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXSA8PCA4XG4gICAgdmFsIHw9IGJ1ZltvZmZzZXRdXG4gICAgaWYgKG9mZnNldCArIDMgPCBsZW4pXG4gICAgICB2YWwgPSB2YWwgKyAoYnVmW29mZnNldCArIDNdIDw8IDI0ID4+PiAwKVxuICB9IGVsc2Uge1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsID0gYnVmW29mZnNldCArIDFdIDw8IDE2XG4gICAgaWYgKG9mZnNldCArIDIgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDJdIDw8IDhcbiAgICBpZiAob2Zmc2V0ICsgMyA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgM11cbiAgICB2YWwgPSB2YWwgKyAoYnVmW29mZnNldF0gPDwgMjQgPj4+IDApXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLFxuICAgICAgICAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgdmFyIG5lZyA9IHRoaXNbb2Zmc2V0XSAmIDB4ODBcbiAgaWYgKG5lZylcbiAgICByZXR1cm4gKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xXG4gIGVsc2VcbiAgICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbmZ1bmN0aW9uIF9yZWFkSW50MTYgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsID0gX3JlYWRVSW50MTYoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSlcbiAgdmFyIG5lZyA9IHZhbCAmIDB4ODAwMFxuICBpZiAobmVnKVxuICAgIHJldHVybiAoMHhmZmZmIC0gdmFsICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDE2KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZEludDMyIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDMyKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpXG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDAwMDAwXG4gIGlmIChuZWcpXG4gICAgcmV0dXJuICgweGZmZmZmZmZmIC0gdmFsICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MzIodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZEZsb2F0IChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRGbG9hdCh0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkRG91YmxlIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgKyA3IDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZilcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVyblxuXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlXG59XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmYpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGxlbiAtIG9mZnNldCwgMik7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPVxuICAgICAgICAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmZmZmZmKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDQpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID1cbiAgICAgICAgKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmLCAtMHg4MClcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgaWYgKHZhbHVlID49IDApXG4gICAgdGhpcy53cml0ZVVJbnQ4KHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgdGhpcy53cml0ZVVJbnQ4KDB4ZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2ZmZiwgLTB4ODAwMClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGlmICh2YWx1ZSA+PSAwKVxuICAgIF93cml0ZVVJbnQxNihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG4gIGVsc2VcbiAgICBfd3JpdGVVSW50MTYoYnVmLCAweGZmZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZiAodmFsdWUgPj0gMClcbiAgICBfd3JpdGVVSW50MzIoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgX3dyaXRlVUludDMyKGJ1ZiwgMHhmZmZmZmZmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZJRUVFNzU0KHZhbHVlLCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgNyA8IGJ1Zi5sZW5ndGgsXG4gICAgICAgICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmSUVFRTc1NCh2YWx1ZSwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gZmlsbCh2YWx1ZSwgc3RhcnQ9MCwgZW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiAodmFsdWUsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCF2YWx1ZSkgdmFsdWUgPSAwXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCkgZW5kID0gdGhpcy5sZW5ndGhcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHZhbHVlID0gdmFsdWUuY2hhckNvZGVBdCgwKVxuICB9XG5cbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbHVlKSwgJ3ZhbHVlIGlzIG5vdCBhIG51bWJlcicpXG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdlbmQgPCBzdGFydCcpXG5cbiAgLy8gRmlsbCAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm5cbiAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHRoaXMubGVuZ3RoLCAnc3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gdGhpcy5sZW5ndGgsICdlbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICB0aGlzW2ldID0gdmFsdWVcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvdXQgPSBbXVxuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIG91dFtpXSA9IHRvSGV4KHRoaXNbaV0pXG4gICAgaWYgKGkgPT09IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMpIHtcbiAgICAgIG91dFtpICsgMV0gPSAnLi4uJ1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBvdXQuam9pbignICcpICsgJz4nXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBgQXJyYXlCdWZmZXJgIHdpdGggdGhlICpjb3BpZWQqIG1lbW9yeSBvZiB0aGUgYnVmZmVyIGluc3RhbmNlLlxuICogQWRkZWQgaW4gTm9kZSAwLjEyLiBPbmx5IGF2YWlsYWJsZSBpbiBicm93c2VycyB0aGF0IHN1cHBvcnQgQXJyYXlCdWZmZXIuXG4gKi9cbkJ1ZmZlci5wcm90b3R5cGUudG9BcnJheUJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgICByZXR1cm4gKG5ldyBCdWZmZXIodGhpcykpLmJ1ZmZlclxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5sZW5ndGgpXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYnVmLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKVxuICAgICAgICBidWZbaV0gPSB0aGlzW2ldXG4gICAgICByZXR1cm4gYnVmLmJ1ZmZlclxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0J1ZmZlci50b0FycmF5QnVmZmVyIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyJylcbiAgfVxufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbnZhciBCUCA9IEJ1ZmZlci5wcm90b3R5cGVcblxuLyoqXG4gKiBBdWdtZW50IGEgVWludDhBcnJheSAqaW5zdGFuY2UqIChub3QgdGhlIFVpbnQ4QXJyYXkgY2xhc3MhKSB3aXRoIEJ1ZmZlciBtZXRob2RzXG4gKi9cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9pc0J1ZmZlciA9IHRydWVcblxuICAvLyBzYXZlIHJlZmVyZW5jZSB0byBvcmlnaW5hbCBVaW50OEFycmF5IGdldC9zZXQgbWV0aG9kcyBiZWZvcmUgb3ZlcndyaXRpbmdcbiAgYXJyLl9nZXQgPSBhcnIuZ2V0XG4gIGFyci5fc2V0ID0gYXJyLnNldFxuXG4gIC8vIGRlcHJlY2F0ZWQsIHdpbGwgYmUgcmVtb3ZlZCBpbiBub2RlIDAuMTMrXG4gIGFyci5nZXQgPSBCUC5nZXRcbiAgYXJyLnNldCA9IEJQLnNldFxuXG4gIGFyci53cml0ZSA9IEJQLndyaXRlXG4gIGFyci50b1N0cmluZyA9IEJQLnRvU3RyaW5nXG4gIGFyci50b0xvY2FsZVN0cmluZyA9IEJQLnRvU3RyaW5nXG4gIGFyci50b0pTT04gPSBCUC50b0pTT05cbiAgYXJyLmNvcHkgPSBCUC5jb3B5XG4gIGFyci5zbGljZSA9IEJQLnNsaWNlXG4gIGFyci5yZWFkVUludDggPSBCUC5yZWFkVUludDhcbiAgYXJyLnJlYWRVSW50MTZMRSA9IEJQLnJlYWRVSW50MTZMRVxuICBhcnIucmVhZFVJbnQxNkJFID0gQlAucmVhZFVJbnQxNkJFXG4gIGFyci5yZWFkVUludDMyTEUgPSBCUC5yZWFkVUludDMyTEVcbiAgYXJyLnJlYWRVSW50MzJCRSA9IEJQLnJlYWRVSW50MzJCRVxuICBhcnIucmVhZEludDggPSBCUC5yZWFkSW50OFxuICBhcnIucmVhZEludDE2TEUgPSBCUC5yZWFkSW50MTZMRVxuICBhcnIucmVhZEludDE2QkUgPSBCUC5yZWFkSW50MTZCRVxuICBhcnIucmVhZEludDMyTEUgPSBCUC5yZWFkSW50MzJMRVxuICBhcnIucmVhZEludDMyQkUgPSBCUC5yZWFkSW50MzJCRVxuICBhcnIucmVhZEZsb2F0TEUgPSBCUC5yZWFkRmxvYXRMRVxuICBhcnIucmVhZEZsb2F0QkUgPSBCUC5yZWFkRmxvYXRCRVxuICBhcnIucmVhZERvdWJsZUxFID0gQlAucmVhZERvdWJsZUxFXG4gIGFyci5yZWFkRG91YmxlQkUgPSBCUC5yZWFkRG91YmxlQkVcbiAgYXJyLndyaXRlVUludDggPSBCUC53cml0ZVVJbnQ4XG4gIGFyci53cml0ZVVJbnQxNkxFID0gQlAud3JpdGVVSW50MTZMRVxuICBhcnIud3JpdGVVSW50MTZCRSA9IEJQLndyaXRlVUludDE2QkVcbiAgYXJyLndyaXRlVUludDMyTEUgPSBCUC53cml0ZVVJbnQzMkxFXG4gIGFyci53cml0ZVVJbnQzMkJFID0gQlAud3JpdGVVSW50MzJCRVxuICBhcnIud3JpdGVJbnQ4ID0gQlAud3JpdGVJbnQ4XG4gIGFyci53cml0ZUludDE2TEUgPSBCUC53cml0ZUludDE2TEVcbiAgYXJyLndyaXRlSW50MTZCRSA9IEJQLndyaXRlSW50MTZCRVxuICBhcnIud3JpdGVJbnQzMkxFID0gQlAud3JpdGVJbnQzMkxFXG4gIGFyci53cml0ZUludDMyQkUgPSBCUC53cml0ZUludDMyQkVcbiAgYXJyLndyaXRlRmxvYXRMRSA9IEJQLndyaXRlRmxvYXRMRVxuICBhcnIud3JpdGVGbG9hdEJFID0gQlAud3JpdGVGbG9hdEJFXG4gIGFyci53cml0ZURvdWJsZUxFID0gQlAud3JpdGVEb3VibGVMRVxuICBhcnIud3JpdGVEb3VibGVCRSA9IEJQLndyaXRlRG91YmxlQkVcbiAgYXJyLmZpbGwgPSBCUC5maWxsXG4gIGFyci5pbnNwZWN0ID0gQlAuaW5zcGVjdFxuICBhcnIudG9BcnJheUJ1ZmZlciA9IEJQLnRvQXJyYXlCdWZmZXJcblxuICByZXR1cm4gYXJyXG59XG5cbi8vIHNsaWNlKHN0YXJ0LCBlbmQpXG5mdW5jdGlvbiBjbGFtcCAoaW5kZXgsIGxlbiwgZGVmYXVsdFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSByZXR1cm4gZGVmYXVsdFZhbHVlXG4gIGluZGV4ID0gfn5pbmRleDsgIC8vIENvZXJjZSB0byBpbnRlZ2VyLlxuICBpZiAoaW5kZXggPj0gbGVuKSByZXR1cm4gbGVuXG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXhcbiAgaW5kZXggKz0gbGVuXG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXhcbiAgcmV0dXJuIDBcbn1cblxuZnVuY3Rpb24gY29lcmNlIChsZW5ndGgpIHtcbiAgLy8gQ29lcmNlIGxlbmd0aCB0byBhIG51bWJlciAocG9zc2libHkgTmFOKSwgcm91bmQgdXBcbiAgLy8gaW4gY2FzZSBpdCdzIGZyYWN0aW9uYWwgKGUuZy4gMTIzLjQ1NikgdGhlbiBkbyBhXG4gIC8vIGRvdWJsZSBuZWdhdGUgdG8gY29lcmNlIGEgTmFOIHRvIDAuIEVhc3ksIHJpZ2h0P1xuICBsZW5ndGggPSB+fk1hdGguY2VpbCgrbGVuZ3RoKVxuICByZXR1cm4gbGVuZ3RoIDwgMCA/IDAgOiBsZW5ndGhcbn1cblxuZnVuY3Rpb24gaXNBcnJheSAoc3ViamVjdCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHN1YmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN1YmplY3QpID09PSAnW29iamVjdCBBcnJheV0nXG4gIH0pKHN1YmplY3QpXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXlpc2ggKHN1YmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXkoc3ViamVjdCkgfHwgQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpIHx8XG4gICAgICBzdWJqZWN0ICYmIHR5cGVvZiBzdWJqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgdHlwZW9mIHN1YmplY3QubGVuZ3RoID09PSAnbnVtYmVyJ1xufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGIgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGlmIChiIDw9IDB4N0YpXG4gICAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSlcbiAgICBlbHNlIHtcbiAgICAgIHZhciBzdGFydCA9IGlcbiAgICAgIGlmIChiID49IDB4RDgwMCAmJiBiIDw9IDB4REZGRikgaSsrXG4gICAgICB2YXIgaCA9IGVuY29kZVVSSUNvbXBvbmVudChzdHIuc2xpY2Uoc3RhcnQsIGkrMSkpLnN1YnN0cigxKS5zcGxpdCgnJScpXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGgubGVuZ3RoOyBqKyspXG4gICAgICAgIGJ5dGVBcnJheS5wdXNoKHBhcnNlSW50KGhbal0sIDE2KSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoc3RyKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIHBvc1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKVxuICAgICAgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBkZWNvZGVVdGY4Q2hhciAoc3RyKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RkZGRCkgLy8gVVRGIDggaW52YWxpZCBjaGFyXG4gIH1cbn1cblxuLypcbiAqIFdlIGhhdmUgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHZhbHVlIGlzIGEgdmFsaWQgaW50ZWdlci4gVGhpcyBtZWFucyB0aGF0IGl0XG4gKiBpcyBub24tbmVnYXRpdmUuIEl0IGhhcyBubyBmcmFjdGlvbmFsIGNvbXBvbmVudCBhbmQgdGhhdCBpdCBkb2VzIG5vdFxuICogZXhjZWVkIHRoZSBtYXhpbXVtIGFsbG93ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHZlcmlmdWludCAodmFsdWUsIG1heCkge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPj0gMCwgJ3NwZWNpZmllZCBhIG5lZ2F0aXZlIHZhbHVlIGZvciB3cml0aW5nIGFuIHVuc2lnbmVkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGlzIGxhcmdlciB0aGFuIG1heGltdW0gdmFsdWUgZm9yIHR5cGUnKVxuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKVxufVxuXG5mdW5jdGlvbiB2ZXJpZnNpbnQgKHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKVxufVxuXG5mdW5jdGlvbiB2ZXJpZklFRUU3NTQgKHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKVxufVxuXG5mdW5jdGlvbiBhc3NlcnQgKHRlc3QsIG1lc3NhZ2UpIHtcbiAgaWYgKCF0ZXN0KSB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCAnRmFpbGVkIGFzc2VydGlvbicpXG59XG4iXX0=
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\gulp-browserify\\node_modules\\buffer\\index.js","/..\\node_modules\\gulp-browserify\\node_modules\\buffer")
},{"2ionoC":3,"base64-js":1,"buffer":2,"ieee754":4}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

// shim for using process in browser

var process = module.exports = {};

process.nextTick = function () {
    var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
    var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;

    if (canSetImmediate) {
        return function (f) {
            return window.setImmediate(f);
        };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
}();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb3dzZXIuanMiXSwibmFtZXMiOlsicHJvY2VzcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJuZXh0VGljayIsImNhblNldEltbWVkaWF0ZSIsIndpbmRvdyIsInNldEltbWVkaWF0ZSIsImNhblBvc3QiLCJwb3N0TWVzc2FnZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJmIiwicXVldWUiLCJldiIsInNvdXJjZSIsImRhdGEiLCJzdG9wUHJvcGFnYXRpb24iLCJsZW5ndGgiLCJmbiIsInNoaWZ0IiwicHVzaCIsInNldFRpbWVvdXQiLCJ0aXRsZSIsImJyb3dzZXIiLCJlbnYiLCJhcmd2Iiwibm9vcCIsIm9uIiwiYWRkTGlzdGVuZXIiLCJvbmNlIiwib2ZmIiwicmVtb3ZlTGlzdGVuZXIiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJlbWl0IiwiYmluZGluZyIsIm5hbWUiLCJFcnJvciIsImN3ZCIsImNoZGlyIiwiZGlyIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLElBQUlBLFVBQVVDLE9BQU9DLE9BQVAsR0FBaUIsRUFBL0I7O0FBRUFGLFFBQVFHLFFBQVIsR0FBb0IsWUFBWTtBQUM1QixRQUFJQyxrQkFBa0IsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixJQUNuQkEsT0FBT0MsWUFEVjtBQUVBLFFBQUlDLFVBQVUsT0FBT0YsTUFBUCxLQUFrQixXQUFsQixJQUNYQSxPQUFPRyxXQURJLElBQ1dILE9BQU9JLGdCQURoQzs7QUFJQSxRQUFJTCxlQUFKLEVBQXFCO0FBQ2pCLGVBQU8sVUFBVU0sQ0FBVixFQUFhO0FBQUUsbUJBQU9MLE9BQU9DLFlBQVAsQ0FBb0JJLENBQXBCLENBQVA7QUFBK0IsU0FBckQ7QUFDSDs7QUFFRCxRQUFJSCxPQUFKLEVBQWE7QUFDVCxZQUFJSSxRQUFRLEVBQVo7QUFDQU4sZUFBT0ksZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsVUFBVUcsRUFBVixFQUFjO0FBQzdDLGdCQUFJQyxTQUFTRCxHQUFHQyxNQUFoQjtBQUNBLGdCQUFJLENBQUNBLFdBQVdSLE1BQVgsSUFBcUJRLFdBQVcsSUFBakMsS0FBMENELEdBQUdFLElBQUgsS0FBWSxjQUExRCxFQUEwRTtBQUN0RUYsbUJBQUdHLGVBQUg7QUFDQSxvQkFBSUosTUFBTUssTUFBTixHQUFlLENBQW5CLEVBQXNCO0FBQ2xCLHdCQUFJQyxLQUFLTixNQUFNTyxLQUFOLEVBQVQ7QUFDQUQ7QUFDSDtBQUNKO0FBQ0osU0FURCxFQVNHLElBVEg7O0FBV0EsZUFBTyxTQUFTZCxRQUFULENBQWtCYyxFQUFsQixFQUFzQjtBQUN6Qk4sa0JBQU1RLElBQU4sQ0FBV0YsRUFBWDtBQUNBWixtQkFBT0csV0FBUCxDQUFtQixjQUFuQixFQUFtQyxHQUFuQztBQUNILFNBSEQ7QUFJSDs7QUFFRCxXQUFPLFNBQVNMLFFBQVQsQ0FBa0JjLEVBQWxCLEVBQXNCO0FBQ3pCRyxtQkFBV0gsRUFBWCxFQUFlLENBQWY7QUFDSCxLQUZEO0FBR0gsQ0FqQ2tCLEVBQW5COztBQW1DQWpCLFFBQVFxQixLQUFSLEdBQWdCLFNBQWhCO0FBQ0FyQixRQUFRc0IsT0FBUixHQUFrQixJQUFsQjtBQUNBdEIsUUFBUXVCLEdBQVIsR0FBYyxFQUFkO0FBQ0F2QixRQUFRd0IsSUFBUixHQUFlLEVBQWY7O0FBRUEsU0FBU0MsSUFBVCxHQUFnQixDQUFFOztBQUVsQnpCLFFBQVEwQixFQUFSLEdBQWFELElBQWI7QUFDQXpCLFFBQVEyQixXQUFSLEdBQXNCRixJQUF0QjtBQUNBekIsUUFBUTRCLElBQVIsR0FBZUgsSUFBZjtBQUNBekIsUUFBUTZCLEdBQVIsR0FBY0osSUFBZDtBQUNBekIsUUFBUThCLGNBQVIsR0FBeUJMLElBQXpCO0FBQ0F6QixRQUFRK0Isa0JBQVIsR0FBNkJOLElBQTdCO0FBQ0F6QixRQUFRZ0MsSUFBUixHQUFlUCxJQUFmOztBQUVBekIsUUFBUWlDLE9BQVIsR0FBa0IsVUFBVUMsSUFBVixFQUFnQjtBQUM5QixVQUFNLElBQUlDLEtBQUosQ0FBVSxrQ0FBVixDQUFOO0FBQ0gsQ0FGRDs7QUFJQTtBQUNBbkMsUUFBUW9DLEdBQVIsR0FBYyxZQUFZO0FBQUUsV0FBTyxHQUFQO0FBQVksQ0FBeEM7QUFDQXBDLFFBQVFxQyxLQUFSLEdBQWdCLFVBQVVDLEdBQVYsRUFBZTtBQUMzQixVQUFNLElBQUlILEtBQUosQ0FBVSxnQ0FBVixDQUFOO0FBQ0gsQ0FGRCIsImZpbGUiOiJicm93c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG4iXX0=
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\gulp-browserify\\node_modules\\process\\browser.js","/..\\node_modules\\gulp-browserify\\node_modules\\process")
},{"2ionoC":3,"buffer":2}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImV4cG9ydHMiLCJyZWFkIiwiYnVmZmVyIiwib2Zmc2V0IiwiaXNMRSIsIm1MZW4iLCJuQnl0ZXMiLCJlIiwibSIsImVMZW4iLCJlTWF4IiwiZUJpYXMiLCJuQml0cyIsImkiLCJkIiwicyIsIk5hTiIsIkluZmluaXR5IiwiTWF0aCIsInBvdyIsIndyaXRlIiwidmFsdWUiLCJjIiwicnQiLCJhYnMiLCJpc05hTiIsImZsb29yIiwibG9nIiwiTE4yIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxRQUFRQyxJQUFSLEdBQWUsVUFBVUMsTUFBVixFQUFrQkMsTUFBbEIsRUFBMEJDLElBQTFCLEVBQWdDQyxJQUFoQyxFQUFzQ0MsTUFBdEMsRUFBOEM7QUFDM0QsTUFBSUMsQ0FBSixFQUFPQyxDQUFQO0FBQ0EsTUFBSUMsT0FBT0gsU0FBUyxDQUFULEdBQWFELElBQWIsR0FBb0IsQ0FBL0I7QUFDQSxNQUFJSyxPQUFPLENBQUMsS0FBS0QsSUFBTixJQUFjLENBQXpCO0FBQ0EsTUFBSUUsUUFBUUQsUUFBUSxDQUFwQjtBQUNBLE1BQUlFLFFBQVEsQ0FBQyxDQUFiO0FBQ0EsTUFBSUMsSUFBSVQsT0FBUUUsU0FBUyxDQUFqQixHQUFzQixDQUE5QjtBQUNBLE1BQUlRLElBQUlWLE9BQU8sQ0FBQyxDQUFSLEdBQVksQ0FBcEI7QUFDQSxNQUFJVyxJQUFJYixPQUFPQyxTQUFTVSxDQUFoQixDQUFSOztBQUVBQSxPQUFLQyxDQUFMOztBQUVBUCxNQUFJUSxJQUFLLENBQUMsS0FBTSxDQUFDSCxLQUFSLElBQWtCLENBQTNCO0FBQ0FHLFFBQU8sQ0FBQ0gsS0FBUjtBQUNBQSxXQUFTSCxJQUFUO0FBQ0EsU0FBT0csUUFBUSxDQUFmLEVBQWtCTCxJQUFJQSxJQUFJLEdBQUosR0FBVUwsT0FBT0MsU0FBU1UsQ0FBaEIsQ0FBZCxFQUFrQ0EsS0FBS0MsQ0FBdkMsRUFBMENGLFNBQVMsQ0FBckUsRUFBd0UsQ0FBRTs7QUFFMUVKLE1BQUlELElBQUss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TyxJQUFJSCxJQUFJSSxLQUFKLElBQWEsQ0FBakIsRUFBb0I7QUFDekJILFVBQUksQ0FBQ2EsUUFBUUMsQ0FBUixHQUFZLENBQWIsSUFBa0JKLEtBQUtDLEdBQUwsQ0FBUyxDQUFULEVBQVlkLElBQVosQ0FBdEI7QUFDQUUsVUFBSUEsSUFBSUksS0FBUjtBQUNELEtBSE0sTUFHQTtBQUNMSCxVQUFJYSxRQUFRSCxLQUFLQyxHQUFMLENBQVMsQ0FBVCxFQUFZUixRQUFRLENBQXBCLENBQVIsR0FBaUNPLEtBQUtDLEdBQUwsQ0FBUyxDQUFULEVBQVlkLElBQVosQ0FBckM7QUFDQUUsVUFBSSxDQUFKO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPRixRQUFRLENBQWYsRUFBa0JILE9BQU9DLFNBQVNVLENBQWhCLElBQXFCTCxJQUFJLElBQXpCLEVBQStCSyxLQUFLQyxDQUFwQyxFQUF1Q04sS0FBSyxHQUE1QyxFQUFpREgsUUFBUSxDQUEzRSxFQUE4RSxDQUFFOztBQUVoRkUsTUFBS0EsS0FBS0YsSUFBTixHQUFjRyxDQUFsQjtBQUNBQyxVQUFRSixJQUFSO0FBQ0EsU0FBT0ksT0FBTyxDQUFkLEVBQWlCUCxPQUFPQyxTQUFTVSxDQUFoQixJQUFxQk4sSUFBSSxJQUF6QixFQUErQk0sS0FBS0MsQ0FBcEMsRUFBdUNQLEtBQUssR0FBNUMsRUFBaURFLFFBQVEsQ0FBMUUsRUFBNkUsQ0FBRTs7QUFFL0VQLFNBQU9DLFNBQVNVLENBQVQsR0FBYUMsQ0FBcEIsS0FBMEJDLElBQUksR0FBOUI7QUFDRCxDQWxERCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIl19
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\ieee754\\index.js","/..\\node_modules\\ieee754")
},{"2ionoC":3,"buffer":2}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

var SDPUtils = require('sdp');

function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
  var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

  // Map ICE parameters (ufrag, pwd) to SDP.
  sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());

  // Map DTLS parameters to SDP.
  sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : dtlsRole || 'active');

  sdp += 'a=mid:' + transceiver.mid + '\r\n';

  if (transceiver.direction) {
    sdp += 'a=' + transceiver.direction + '\r\n';
  } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
    sdp += 'a=sendrecv\r\n';
  } else if (transceiver.rtpSender) {
    sdp += 'a=sendonly\r\n';
  } else if (transceiver.rtpReceiver) {
    sdp += 'a=recvonly\r\n';
  } else {
    sdp += 'a=inactive\r\n';
  }

  if (transceiver.rtpSender) {
    // spec.
    var msid = 'msid:' + stream.id + ' ' + transceiver.rtpSender.track.id + '\r\n';
    sdp += 'a=' + msid;

    // for Chrome.
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;
    if (transceiver.sendEncodingParameters[0].rtx) {
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
      sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
    }
  }
  // FIXME: this should be written by writeRtpDescription.
  sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
  if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
  }
  return sdp;
}

// Edge does not like
// 1) stun: filtered after 14393 unless ?transport=udp is present
// 2) turn: that does not have all of turn:host:port?transport=udp
// 3) turn: with ipv6 addresses
// 4) turn: occurring muliple times
function filterIceServers(iceServers, edgeVersion) {
  var hasTurn = false;
  iceServers = JSON.parse(JSON.stringify(iceServers));
  return iceServers.filter(function (server) {
    if (server && (server.urls || server.url)) {
      var urls = server.urls || server.url;
      if (server.url && !server.urls) {
        console.warn('RTCIceServer.url is deprecated! Use urls instead.');
      }
      var isString = typeof urls === 'string';
      if (isString) {
        urls = [urls];
      }
      urls = urls.filter(function (url) {
        var validTurn = url.indexOf('turn:') === 0 && url.indexOf('transport=udp') !== -1 && url.indexOf('turn:[') === -1 && !hasTurn;

        if (validTurn) {
          hasTurn = true;
          return true;
        }
        return url.indexOf('stun:') === 0 && edgeVersion >= 14393 && url.indexOf('?transport=udp') === -1;
      });

      delete server.url;
      server.urls = isString ? urls[0] : urls;
      return !!urls.length;
    }
    return false;
  });
}

// Determines the intersection of local and remote capabilities.
function getCommonCapabilities(localCapabilities, remoteCapabilities) {
  var commonCapabilities = {
    codecs: [],
    headerExtensions: [],
    fecMechanisms: []
  };

  var findCodecByPayloadType = function findCodecByPayloadType(pt, codecs) {
    pt = parseInt(pt, 10);
    for (var i = 0; i < codecs.length; i++) {
      if (codecs[i].payloadType === pt || codecs[i].preferredPayloadType === pt) {
        return codecs[i];
      }
    }
  };

  var rtxCapabilityMatches = function rtxCapabilityMatches(lRtx, rRtx, lCodecs, rCodecs) {
    var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
    var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
    return lCodec && rCodec && lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
  };

  localCapabilities.codecs.forEach(function (lCodec) {
    for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
      var rCodec = remoteCapabilities.codecs[i];
      if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() && lCodec.clockRate === rCodec.clockRate) {
        if (lCodec.name.toLowerCase() === 'rtx' && lCodec.parameters && rCodec.parameters.apt) {
          // for RTX we need to find the local rtx that has a apt
          // which points to the same local codec as the remote one.
          if (!rtxCapabilityMatches(lCodec, rCodec, localCapabilities.codecs, remoteCapabilities.codecs)) {
            continue;
          }
        }
        rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
        // number of channels is the highest common number of channels
        rCodec.numChannels = Math.min(lCodec.numChannels, rCodec.numChannels);
        // push rCodec so we reply with offerer payload type
        commonCapabilities.codecs.push(rCodec);

        // determine common feedback mechanisms
        rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function (fb) {
          for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
            if (lCodec.rtcpFeedback[j].type === fb.type && lCodec.rtcpFeedback[j].parameter === fb.parameter) {
              return true;
            }
          }
          return false;
        });
        // FIXME: also need to determine .parameters
        //  see https://github.com/openpeer/ortc/issues/569
        break;
      }
    }
  });

  localCapabilities.headerExtensions.forEach(function (lHeaderExtension) {
    for (var i = 0; i < remoteCapabilities.headerExtensions.length; i++) {
      var rHeaderExtension = remoteCapabilities.headerExtensions[i];
      if (lHeaderExtension.uri === rHeaderExtension.uri) {
        commonCapabilities.headerExtensions.push(rHeaderExtension);
        break;
      }
    }
  });

  // FIXME: fecMechanisms
  return commonCapabilities;
}

// is action=setLocalDescription with type allowed in signalingState
function isActionAllowedInSignalingState(action, type, signalingState) {
  return {
    offer: {
      setLocalDescription: ['stable', 'have-local-offer'],
      setRemoteDescription: ['stable', 'have-remote-offer']
    },
    answer: {
      setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
      setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
    }
  }[type][action].indexOf(signalingState) !== -1;
}

function maybeAddCandidate(iceTransport, candidate) {
  // Edge's internal representation adds some fields therefore
  // not all fieldѕ are taken into account.
  var alreadyAdded = iceTransport.getRemoteCandidates().find(function (remoteCandidate) {
    return candidate.foundation === remoteCandidate.foundation && candidate.ip === remoteCandidate.ip && candidate.port === remoteCandidate.port && candidate.priority === remoteCandidate.priority && candidate.protocol === remoteCandidate.protocol && candidate.type === remoteCandidate.type;
  });
  if (!alreadyAdded) {
    iceTransport.addRemoteCandidate(candidate);
  }
  return !alreadyAdded;
}

module.exports = function (window, edgeVersion) {
  var RTCPeerConnection = function RTCPeerConnection(config) {
    var self = this;

    var _eventTarget = document.createDocumentFragment();
    ['addEventListener', 'removeEventListener', 'dispatchEvent'].forEach(function (method) {
      self[method] = _eventTarget[method].bind(_eventTarget);
    });

    this.onicecandidate = null;
    this.onaddstream = null;
    this.ontrack = null;
    this.onremovestream = null;
    this.onsignalingstatechange = null;
    this.oniceconnectionstatechange = null;
    this.onicegatheringstatechange = null;
    this.onnegotiationneeded = null;
    this.ondatachannel = null;
    this.canTrickleIceCandidates = null;

    this.needNegotiation = false;

    this.localStreams = [];
    this.remoteStreams = [];

    this.localDescription = null;
    this.remoteDescription = null;

    this.signalingState = 'stable';
    this.iceConnectionState = 'new';
    this.iceGatheringState = 'new';

    config = JSON.parse(JSON.stringify(config || {}));

    this.usingBundle = config.bundlePolicy === 'max-bundle';
    if (config.rtcpMuxPolicy === 'negotiate') {
      var e = new Error('rtcpMuxPolicy \'negotiate\' is not supported');
      e.name = 'NotSupportedError';
      throw e;
    } else if (!config.rtcpMuxPolicy) {
      config.rtcpMuxPolicy = 'require';
    }

    switch (config.iceTransportPolicy) {
      case 'all':
      case 'relay':
        break;
      default:
        config.iceTransportPolicy = 'all';
        break;
    }

    switch (config.bundlePolicy) {
      case 'balanced':
      case 'max-compat':
      case 'max-bundle':
        break;
      default:
        config.bundlePolicy = 'balanced';
        break;
    }

    config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);

    this._iceGatherers = [];
    if (config.iceCandidatePoolSize) {
      for (var i = config.iceCandidatePoolSize; i > 0; i--) {
        this._iceGatherers = new window.RTCIceGatherer({
          iceServers: config.iceServers,
          gatherPolicy: config.iceTransportPolicy
        });
      }
    } else {
      config.iceCandidatePoolSize = 0;
    }

    this._config = config;

    // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
    // everything that is needed to describe a SDP m-line.
    this.transceivers = [];

    this._sdpSessionId = SDPUtils.generateSessionId();
    this._sdpSessionVersion = 0;

    this._dtlsRole = undefined; // role for a=setup to use in answers.
  };

  RTCPeerConnection.prototype._emitGatheringStateChange = function () {
    var event = new Event('icegatheringstatechange');
    this.dispatchEvent(event);
    if (typeof this.onicegatheringstatechange === 'function') {
      this.onicegatheringstatechange(event);
    }
  };

  RTCPeerConnection.prototype.getConfiguration = function () {
    return this._config;
  };

  RTCPeerConnection.prototype.getLocalStreams = function () {
    return this.localStreams;
  };

  RTCPeerConnection.prototype.getRemoteStreams = function () {
    return this.remoteStreams;
  };

  // internal helper to create a transceiver object.
  // (whih is not yet the same as the WebRTC 1.0 transceiver)
  RTCPeerConnection.prototype._createTransceiver = function (kind) {
    var hasBundleTransport = this.transceivers.length > 0;
    var transceiver = {
      track: null,
      iceGatherer: null,
      iceTransport: null,
      dtlsTransport: null,
      localCapabilities: null,
      remoteCapabilities: null,
      rtpSender: null,
      rtpReceiver: null,
      kind: kind,
      mid: null,
      sendEncodingParameters: null,
      recvEncodingParameters: null,
      stream: null,
      wantReceive: true
    };
    if (this.usingBundle && hasBundleTransport) {
      transceiver.iceTransport = this.transceivers[0].iceTransport;
      transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
    } else {
      var transports = this._createIceAndDtlsTransports();
      transceiver.iceTransport = transports.iceTransport;
      transceiver.dtlsTransport = transports.dtlsTransport;
    }
    this.transceivers.push(transceiver);
    return transceiver;
  };

  RTCPeerConnection.prototype.addTrack = function (track, stream) {
    var transceiver;
    for (var i = 0; i < this.transceivers.length; i++) {
      if (!this.transceivers[i].track && this.transceivers[i].kind === track.kind) {
        transceiver = this.transceivers[i];
      }
    }
    if (!transceiver) {
      transceiver = this._createTransceiver(track.kind);
    }

    this._maybeFireNegotiationNeeded();

    if (this.localStreams.indexOf(stream) === -1) {
      this.localStreams.push(stream);
    }

    transceiver.track = track;
    transceiver.stream = stream;
    transceiver.rtpSender = new window.RTCRtpSender(track, transceiver.dtlsTransport);
    return transceiver.rtpSender;
  };

  RTCPeerConnection.prototype.addStream = function (stream) {
    var self = this;
    if (edgeVersion >= 15025) {
      stream.getTracks().forEach(function (track) {
        self.addTrack(track, stream);
      });
    } else {
      // Clone is necessary for local demos mostly, attaching directly
      // to two different senders does not work (build 10547).
      // Fixed in 15025 (or earlier)
      var clonedStream = stream.clone();
      stream.getTracks().forEach(function (track, idx) {
        var clonedTrack = clonedStream.getTracks()[idx];
        track.addEventListener('enabled', function (event) {
          clonedTrack.enabled = event.enabled;
        });
      });
      clonedStream.getTracks().forEach(function (track) {
        self.addTrack(track, clonedStream);
      });
    }
  };

  RTCPeerConnection.prototype.removeStream = function (stream) {
    var idx = this.localStreams.indexOf(stream);
    if (idx > -1) {
      this.localStreams.splice(idx, 1);
      this._maybeFireNegotiationNeeded();
    }
  };

  RTCPeerConnection.prototype.getSenders = function () {
    return this.transceivers.filter(function (transceiver) {
      return !!transceiver.rtpSender;
    }).map(function (transceiver) {
      return transceiver.rtpSender;
    });
  };

  RTCPeerConnection.prototype.getReceivers = function () {
    return this.transceivers.filter(function (transceiver) {
      return !!transceiver.rtpReceiver;
    }).map(function (transceiver) {
      return transceiver.rtpReceiver;
    });
  };

  RTCPeerConnection.prototype._createIceGatherer = function (sdpMLineIndex, usingBundle) {
    var self = this;
    if (usingBundle && sdpMLineIndex > 0) {
      return this.transceivers[0].iceGatherer;
    } else if (this._iceGatherers.length) {
      return this._iceGatherers.shift();
    }
    var iceGatherer = new window.RTCIceGatherer({
      iceServers: this._config.iceServers,
      gatherPolicy: this._config.iceTransportPolicy
    });
    Object.defineProperty(iceGatherer, 'state', { value: 'new', writable: true });

    this.transceivers[sdpMLineIndex].candidates = [];
    this.transceivers[sdpMLineIndex].bufferCandidates = function (event) {
      var end = !event.candidate || Object.keys(event.candidate).length === 0;
      // polyfill since RTCIceGatherer.state is not implemented in
      // Edge 10547 yet.
      iceGatherer.state = end ? 'completed' : 'gathering';
      if (self.transceivers[sdpMLineIndex].candidates !== null) {
        self.transceivers[sdpMLineIndex].candidates.push(event.candidate);
      }
    };
    iceGatherer.addEventListener('localcandidate', this.transceivers[sdpMLineIndex].bufferCandidates);
    return iceGatherer;
  };

  // start gathering from an RTCIceGatherer.
  RTCPeerConnection.prototype._gather = function (mid, sdpMLineIndex) {
    var self = this;
    var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
    if (iceGatherer.onlocalcandidate) {
      return;
    }
    var candidates = this.transceivers[sdpMLineIndex].candidates;
    this.transceivers[sdpMLineIndex].candidates = null;
    iceGatherer.removeEventListener('localcandidate', this.transceivers[sdpMLineIndex].bufferCandidates);
    iceGatherer.onlocalcandidate = function (evt) {
      if (self.usingBundle && sdpMLineIndex > 0) {
        // if we know that we use bundle we can drop candidates with
        // ѕdpMLineIndex > 0. If we don't do this then our state gets
        // confused since we dispose the extra ice gatherer.
        return;
      }
      var event = new Event('icecandidate');
      event.candidate = { sdpMid: mid, sdpMLineIndex: sdpMLineIndex };

      var cand = evt.candidate;
      // Edge emits an empty object for RTCIceCandidateComplete‥
      var end = !cand || Object.keys(cand).length === 0;
      if (end) {
        // polyfill since RTCIceGatherer.state is not implemented in
        // Edge 10547 yet.
        if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
          iceGatherer.state = 'completed';
        }
      } else {
        if (iceGatherer.state === 'new') {
          iceGatherer.state = 'gathering';
        }
        // RTCIceCandidate doesn't have a component, needs to be added
        cand.component = 1;
        event.candidate.candidate = SDPUtils.writeCandidate(cand);
      }

      // update local description.
      var sections = SDPUtils.splitSections(self.localDescription.sdp);
      if (!end) {
        sections[event.candidate.sdpMLineIndex + 1] += 'a=' + event.candidate.candidate + '\r\n';
      } else {
        sections[event.candidate.sdpMLineIndex + 1] += 'a=end-of-candidates\r\n';
      }
      self.localDescription.sdp = sections.join('');
      var complete = self.transceivers.every(function (transceiver) {
        return transceiver.iceGatherer && transceiver.iceGatherer.state === 'completed';
      });

      if (self.iceGatheringState !== 'gathering') {
        self.iceGatheringState = 'gathering';
        self._emitGatheringStateChange();
      }

      // Emit candidate. Also emit null candidate when all gatherers are
      // complete.
      if (!end) {
        self.dispatchEvent(event);
        if (typeof self.onicecandidate === 'function') {
          self.onicecandidate(event);
        }
      }
      if (complete) {
        self.dispatchEvent(new Event('icecandidate'));
        if (typeof self.onicecandidate === 'function') {
          self.onicecandidate(new Event('icecandidate'));
        }
        self.iceGatheringState = 'complete';
        self._emitGatheringStateChange();
      }
    };

    // emit already gathered candidates.
    window.setTimeout(function () {
      candidates.forEach(function (candidate) {
        var e = new Event('RTCIceGatherEvent');
        e.candidate = candidate;
        iceGatherer.onlocalcandidate(e);
      });
    }, 0);
  };

  // Create ICE transport and DTLS transport.
  RTCPeerConnection.prototype._createIceAndDtlsTransports = function () {
    var self = this;
    var iceTransport = new window.RTCIceTransport(null);
    iceTransport.onicestatechange = function () {
      self._updateConnectionState();
    };

    var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
    dtlsTransport.ondtlsstatechange = function () {
      self._updateConnectionState();
    };
    dtlsTransport.onerror = function () {
      // onerror does not set state to failed by itself.
      Object.defineProperty(dtlsTransport, 'state', { value: 'failed', writable: true });
      self._updateConnectionState();
    };

    return {
      iceTransport: iceTransport,
      dtlsTransport: dtlsTransport
    };
  };

  // Destroy ICE gatherer, ICE transport and DTLS transport.
  // Without triggering the callbacks.
  RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function (sdpMLineIndex) {
    var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
    if (iceGatherer) {
      delete iceGatherer.onlocalcandidate;
      delete this.transceivers[sdpMLineIndex].iceGatherer;
    }
    var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
    if (iceTransport) {
      delete iceTransport.onicestatechange;
      delete this.transceivers[sdpMLineIndex].iceTransport;
    }
    var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
    if (dtlsTransport) {
      delete dtlsTransport.ondtlsstatechange;
      delete dtlsTransport.onerror;
      delete this.transceivers[sdpMLineIndex].dtlsTransport;
    }
  };

  // Start the RTP Sender and Receiver for a transceiver.
  RTCPeerConnection.prototype._transceive = function (transceiver, send, recv) {
    var params = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
    if (send && transceiver.rtpSender) {
      params.encodings = transceiver.sendEncodingParameters;
      params.rtcp = {
        cname: SDPUtils.localCName,
        compound: transceiver.rtcpParameters.compound
      };
      if (transceiver.recvEncodingParameters.length) {
        params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
      }
      transceiver.rtpSender.send(params);
    }
    if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
      // remove RTX field in Edge 14942
      if (transceiver.kind === 'video' && transceiver.recvEncodingParameters && edgeVersion < 15019) {
        transceiver.recvEncodingParameters.forEach(function (p) {
          delete p.rtx;
        });
      }
      params.encodings = transceiver.recvEncodingParameters;
      params.rtcp = {
        cname: transceiver.rtcpParameters.cname,
        compound: transceiver.rtcpParameters.compound
      };
      if (transceiver.sendEncodingParameters.length) {
        params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
      }
      transceiver.rtpReceiver.receive(params);
    }
  };

  RTCPeerConnection.prototype.setLocalDescription = function (description) {
    var self = this;
    var args = arguments;

    if (!isActionAllowedInSignalingState('setLocalDescription', description.type, this.signalingState)) {
      return new Promise(function (resolve, reject) {
        var e = new Error('Can not set local ' + description.type + ' in state ' + self.signalingState);
        e.name = 'InvalidStateError';
        if (args.length > 2 && typeof args[2] === 'function') {
          args[2].apply(null, [e]);
        }
        reject(e);
      });
    }

    var sections;
    var sessionpart;
    if (description.type === 'offer') {
      // VERY limited support for SDP munging. Limited to:
      // * changing the order of codecs
      sections = SDPUtils.splitSections(description.sdp);
      sessionpart = sections.shift();
      sections.forEach(function (mediaSection, sdpMLineIndex) {
        var caps = SDPUtils.parseRtpParameters(mediaSection);
        self.transceivers[sdpMLineIndex].localCapabilities = caps;
      });

      this.transceivers.forEach(function (transceiver, sdpMLineIndex) {
        self._gather(transceiver.mid, sdpMLineIndex);
      });
    } else if (description.type === 'answer') {
      sections = SDPUtils.splitSections(self.remoteDescription.sdp);
      sessionpart = sections.shift();
      var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
      sections.forEach(function (mediaSection, sdpMLineIndex) {
        var transceiver = self.transceivers[sdpMLineIndex];
        var iceGatherer = transceiver.iceGatherer;
        var iceTransport = transceiver.iceTransport;
        var dtlsTransport = transceiver.dtlsTransport;
        var localCapabilities = transceiver.localCapabilities;
        var remoteCapabilities = transceiver.remoteCapabilities;

        // treat bundle-only as not-rejected.
        var rejected = SDPUtils.isRejected(mediaSection) && !SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 1;

        if (!rejected && !transceiver.isDatachannel) {
          var remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
          var remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
          if (isIceLite) {
            remoteDtlsParameters.role = 'server';
          }

          if (!self.usingBundle || sdpMLineIndex === 0) {
            self._gather(transceiver.mid, sdpMLineIndex);
            if (iceTransport.state === 'new') {
              iceTransport.start(iceGatherer, remoteIceParameters, isIceLite ? 'controlling' : 'controlled');
            }
            if (dtlsTransport.state === 'new') {
              dtlsTransport.start(remoteDtlsParameters);
            }
          }

          // Calculate intersection of capabilities.
          var params = getCommonCapabilities(localCapabilities, remoteCapabilities);

          // Start the RTCRtpSender. The RTCRtpReceiver for this
          // transceiver has already been started in setRemoteDescription.
          self._transceive(transceiver, params.codecs.length > 0, false);
        }
      });
    }

    this.localDescription = {
      type: description.type,
      sdp: description.sdp
    };
    switch (description.type) {
      case 'offer':
        this._updateSignalingState('have-local-offer');
        break;
      case 'answer':
        this._updateSignalingState('stable');
        break;
      default:
        throw new TypeError('unsupported type "' + description.type + '"');
    }

    // If a success callback was provided, emit ICE candidates after it
    // has been executed. Otherwise, emit callback after the Promise is
    // resolved.
    var cb = arguments.length > 1 && typeof arguments[1] === 'function' && arguments[1];
    return new Promise(function (resolve) {
      if (cb) {
        cb.apply(null);
      }
      resolve();
    });
  };

  RTCPeerConnection.prototype.setRemoteDescription = function (description) {
    var self = this;
    var args = arguments;

    if (!isActionAllowedInSignalingState('setRemoteDescription', description.type, this.signalingState)) {
      return new Promise(function (resolve, reject) {
        var e = new Error('Can not set remote ' + description.type + ' in state ' + self.signalingState);
        e.name = 'InvalidStateError';
        if (args.length > 2 && typeof args[2] === 'function') {
          args[2].apply(null, [e]);
        }
        reject(e);
      });
    }

    var streams = {};
    this.remoteStreams.forEach(function (stream) {
      streams[stream.id] = stream;
    });
    var receiverList = [];
    var sections = SDPUtils.splitSections(description.sdp);
    var sessionpart = sections.shift();
    var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
    var usingBundle = SDPUtils.matchPrefix(sessionpart, 'a=group:BUNDLE ').length > 0;
    this.usingBundle = usingBundle;
    var iceOptions = SDPUtils.matchPrefix(sessionpart, 'a=ice-options:')[0];
    if (iceOptions) {
      this.canTrickleIceCandidates = iceOptions.substr(14).split(' ').indexOf('trickle') >= 0;
    } else {
      this.canTrickleIceCandidates = false;
    }

    sections.forEach(function (mediaSection, sdpMLineIndex) {
      var lines = SDPUtils.splitLines(mediaSection);
      var kind = SDPUtils.getKind(mediaSection);
      // treat bundle-only as not-rejected.
      var rejected = SDPUtils.isRejected(mediaSection) && !SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 1;
      var protocol = lines[0].substr(2).split(' ')[2];

      var direction = SDPUtils.getDirection(mediaSection, sessionpart);
      var remoteMsid = SDPUtils.parseMsid(mediaSection);

      var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier();

      // Reject datachannels which are not implemented yet.
      if (kind === 'application' && protocol === 'DTLS/SCTP') {
        self.transceivers[sdpMLineIndex] = {
          mid: mid,
          isDatachannel: true
        };
        return;
      }

      var transceiver;
      var iceGatherer;
      var iceTransport;
      var dtlsTransport;
      var rtpReceiver;
      var sendEncodingParameters;
      var recvEncodingParameters;
      var localCapabilities;

      var track;
      // FIXME: ensure the mediaSection has rtcp-mux set.
      var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
      var remoteIceParameters;
      var remoteDtlsParameters;
      if (!rejected) {
        remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
        remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
        remoteDtlsParameters.role = 'client';
      }
      recvEncodingParameters = SDPUtils.parseRtpEncodingParameters(mediaSection);

      var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);

      var isComplete = SDPUtils.matchPrefix(mediaSection, 'a=end-of-candidates', sessionpart).length > 0;
      var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:').map(function (cand) {
        return SDPUtils.parseCandidate(cand);
      }).filter(function (cand) {
        return cand.component === 1;
      });

      // Check if we can use BUNDLE and dispose transports.
      if ((description.type === 'offer' || description.type === 'answer') && !rejected && usingBundle && sdpMLineIndex > 0 && self.transceivers[sdpMLineIndex]) {
        self._disposeIceAndDtlsTransports(sdpMLineIndex);
        self.transceivers[sdpMLineIndex].iceGatherer = self.transceivers[0].iceGatherer;
        self.transceivers[sdpMLineIndex].iceTransport = self.transceivers[0].iceTransport;
        self.transceivers[sdpMLineIndex].dtlsTransport = self.transceivers[0].dtlsTransport;
        if (self.transceivers[sdpMLineIndex].rtpSender) {
          self.transceivers[sdpMLineIndex].rtpSender.setTransport(self.transceivers[0].dtlsTransport);
        }
        if (self.transceivers[sdpMLineIndex].rtpReceiver) {
          self.transceivers[sdpMLineIndex].rtpReceiver.setTransport(self.transceivers[0].dtlsTransport);
        }
      }
      if (description.type === 'offer' && !rejected) {
        transceiver = self.transceivers[sdpMLineIndex] || self._createTransceiver(kind);
        transceiver.mid = mid;

        if (!transceiver.iceGatherer) {
          transceiver.iceGatherer = self._createIceGatherer(sdpMLineIndex, usingBundle);
        }

        if (cands.length && transceiver.iceTransport.state === 'new') {
          if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
            transceiver.iceTransport.setRemoteCandidates(cands);
          } else {
            cands.forEach(function (candidate) {
              maybeAddCandidate(transceiver.iceTransport, candidate);
            });
          }
        }

        localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);

        // filter RTX until additional stuff needed for RTX is implemented
        // in adapter.js
        if (edgeVersion < 15019) {
          localCapabilities.codecs = localCapabilities.codecs.filter(function (codec) {
            return codec.name !== 'rtx';
          });
        }

        sendEncodingParameters = transceiver.sendEncodingParameters || [{
          ssrc: (2 * sdpMLineIndex + 2) * 1001
        }];

        var isNewTrack = false;
        if (direction === 'sendrecv' || direction === 'sendonly') {
          isNewTrack = !transceiver.rtpReceiver;
          rtpReceiver = transceiver.rtpReceiver || new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);

          if (isNewTrack) {
            var stream;
            track = rtpReceiver.track;
            // FIXME: does not work with Plan B.
            if (remoteMsid) {
              if (!streams[remoteMsid.stream]) {
                streams[remoteMsid.stream] = new window.MediaStream();
                Object.defineProperty(streams[remoteMsid.stream], 'id', {
                  get: function get() {
                    return remoteMsid.stream;
                  }
                });
              }
              Object.defineProperty(track, 'id', {
                get: function get() {
                  return remoteMsid.track;
                }
              });
              stream = streams[remoteMsid.stream];
            } else {
              if (!streams.default) {
                streams.default = new window.MediaStream();
              }
              stream = streams.default;
            }
            stream.addTrack(track);
            receiverList.push([track, rtpReceiver, stream]);
          }
        }

        transceiver.localCapabilities = localCapabilities;
        transceiver.remoteCapabilities = remoteCapabilities;
        transceiver.rtpReceiver = rtpReceiver;
        transceiver.rtcpParameters = rtcpParameters;
        transceiver.sendEncodingParameters = sendEncodingParameters;
        transceiver.recvEncodingParameters = recvEncodingParameters;

        // Start the RTCRtpReceiver now. The RTPSender is started in
        // setLocalDescription.
        self._transceive(self.transceivers[sdpMLineIndex], false, isNewTrack);
      } else if (description.type === 'answer' && !rejected) {
        transceiver = self.transceivers[sdpMLineIndex];
        iceGatherer = transceiver.iceGatherer;
        iceTransport = transceiver.iceTransport;
        dtlsTransport = transceiver.dtlsTransport;
        rtpReceiver = transceiver.rtpReceiver;
        sendEncodingParameters = transceiver.sendEncodingParameters;
        localCapabilities = transceiver.localCapabilities;

        self.transceivers[sdpMLineIndex].recvEncodingParameters = recvEncodingParameters;
        self.transceivers[sdpMLineIndex].remoteCapabilities = remoteCapabilities;
        self.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;

        if (cands.length && iceTransport.state === 'new') {
          if ((isIceLite || isComplete) && (!usingBundle || sdpMLineIndex === 0)) {
            iceTransport.setRemoteCandidates(cands);
          } else {
            cands.forEach(function (candidate) {
              maybeAddCandidate(transceiver.iceTransport, candidate);
            });
          }
        }

        if (!usingBundle || sdpMLineIndex === 0) {
          if (iceTransport.state === 'new') {
            iceTransport.start(iceGatherer, remoteIceParameters, 'controlling');
          }
          if (dtlsTransport.state === 'new') {
            dtlsTransport.start(remoteDtlsParameters);
          }
        }

        self._transceive(transceiver, direction === 'sendrecv' || direction === 'recvonly', direction === 'sendrecv' || direction === 'sendonly');

        if (rtpReceiver && (direction === 'sendrecv' || direction === 'sendonly')) {
          track = rtpReceiver.track;
          if (remoteMsid) {
            if (!streams[remoteMsid.stream]) {
              streams[remoteMsid.stream] = new window.MediaStream();
            }
            streams[remoteMsid.stream].addTrack(track);
            receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
          } else {
            if (!streams.default) {
              streams.default = new window.MediaStream();
            }
            streams.default.addTrack(track);
            receiverList.push([track, rtpReceiver, streams.default]);
          }
        } else {
          // FIXME: actually the receiver should be created later.
          delete transceiver.rtpReceiver;
        }
      }
    });

    if (this._dtlsRole === undefined) {
      this._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
    }

    this.remoteDescription = {
      type: description.type,
      sdp: description.sdp
    };
    switch (description.type) {
      case 'offer':
        this._updateSignalingState('have-remote-offer');
        break;
      case 'answer':
        this._updateSignalingState('stable');
        break;
      default:
        throw new TypeError('unsupported type "' + description.type + '"');
    }
    Object.keys(streams).forEach(function (sid) {
      var stream = streams[sid];
      if (stream.getTracks().length) {
        if (self.remoteStreams.indexOf(stream) === -1) {
          self.remoteStreams.push(stream);
          var event = new Event('addstream');
          event.stream = stream;
          window.setTimeout(function () {
            self.dispatchEvent(event);
            if (typeof self.onaddstream === 'function') {
              self.onaddstream(event);
            }
          });
        }

        receiverList.forEach(function (item) {
          var track = item[0];
          var receiver = item[1];
          if (stream.id !== item[2].id) {
            return;
          }
          var trackEvent = new Event('track');
          trackEvent.track = track;
          trackEvent.receiver = receiver;
          trackEvent.transceiver = { receiver: receiver };
          trackEvent.streams = [stream];
          window.setTimeout(function () {
            self.dispatchEvent(trackEvent);
            if (typeof self.ontrack === 'function') {
              self.ontrack(trackEvent);
            }
          });
        });
      }
    });

    // check whether addIceCandidate({}) was called within four seconds after
    // setRemoteDescription.
    window.setTimeout(function () {
      if (!(self && self.transceivers)) {
        return;
      }
      self.transceivers.forEach(function (transceiver) {
        if (transceiver.iceTransport && transceiver.iceTransport.state === 'new' && transceiver.iceTransport.getRemoteCandidates().length > 0) {
          console.warn('Timeout for addRemoteCandidate. Consider sending ' + 'an end-of-candidates notification');
          transceiver.iceTransport.addRemoteCandidate({});
        }
      });
    }, 4000);

    return new Promise(function (resolve) {
      if (args.length > 1 && typeof args[1] === 'function') {
        args[1].apply(null);
      }
      resolve();
    });
  };

  RTCPeerConnection.prototype.close = function () {
    this.transceivers.forEach(function (transceiver) {
      /* not yet
      if (transceiver.iceGatherer) {
        transceiver.iceGatherer.close();
      }
      */
      if (transceiver.iceTransport) {
        transceiver.iceTransport.stop();
      }
      if (transceiver.dtlsTransport) {
        transceiver.dtlsTransport.stop();
      }
      if (transceiver.rtpSender) {
        transceiver.rtpSender.stop();
      }
      if (transceiver.rtpReceiver) {
        transceiver.rtpReceiver.stop();
      }
    });
    // FIXME: clean up tracks, local streams, remote streams, etc
    this._updateSignalingState('closed');
  };

  // Update the signaling state.
  RTCPeerConnection.prototype._updateSignalingState = function (newState) {
    this.signalingState = newState;
    var event = new Event('signalingstatechange');
    this.dispatchEvent(event);
    if (typeof this.onsignalingstatechange === 'function') {
      this.onsignalingstatechange(event);
    }
  };

  // Determine whether to fire the negotiationneeded event.
  RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function () {
    var self = this;
    if (this.signalingState !== 'stable' || this.needNegotiation === true) {
      return;
    }
    this.needNegotiation = true;
    window.setTimeout(function () {
      if (self.needNegotiation === false) {
        return;
      }
      self.needNegotiation = false;
      var event = new Event('negotiationneeded');
      self.dispatchEvent(event);
      if (typeof self.onnegotiationneeded === 'function') {
        self.onnegotiationneeded(event);
      }
    }, 0);
  };

  // Update the connection state.
  RTCPeerConnection.prototype._updateConnectionState = function () {
    var newState;
    var states = {
      'new': 0,
      closed: 0,
      connecting: 0,
      checking: 0,
      connected: 0,
      completed: 0,
      disconnected: 0,
      failed: 0
    };
    this.transceivers.forEach(function (transceiver) {
      states[transceiver.iceTransport.state]++;
      states[transceiver.dtlsTransport.state]++;
    });
    // ICETransport.completed and connected are the same for this purpose.
    states.connected += states.completed;

    newState = 'new';
    if (states.failed > 0) {
      newState = 'failed';
    } else if (states.connecting > 0 || states.checking > 0) {
      newState = 'connecting';
    } else if (states.disconnected > 0) {
      newState = 'disconnected';
    } else if (states.new > 0) {
      newState = 'new';
    } else if (states.connected > 0 || states.completed > 0) {
      newState = 'connected';
    }

    if (newState !== this.iceConnectionState) {
      this.iceConnectionState = newState;
      var event = new Event('iceconnectionstatechange');
      this.dispatchEvent(event);
      if (typeof this.oniceconnectionstatechange === 'function') {
        this.oniceconnectionstatechange(event);
      }
    }
  };

  RTCPeerConnection.prototype.createOffer = function () {
    var self = this;
    var args = arguments;

    var offerOptions;
    if (arguments.length === 1 && typeof arguments[0] !== 'function') {
      offerOptions = arguments[0];
    } else if (arguments.length === 3) {
      offerOptions = arguments[2];
    }

    var numAudioTracks = this.transceivers.filter(function (t) {
      return t.kind === 'audio';
    }).length;
    var numVideoTracks = this.transceivers.filter(function (t) {
      return t.kind === 'video';
    }).length;

    // Determine number of audio and video tracks we need to send/recv.
    if (offerOptions) {
      // Reject Chrome legacy constraints.
      if (offerOptions.mandatory || offerOptions.optional) {
        throw new TypeError('Legacy mandatory/optional constraints not supported.');
      }
      if (offerOptions.offerToReceiveAudio !== undefined) {
        if (offerOptions.offerToReceiveAudio === true) {
          numAudioTracks = 1;
        } else if (offerOptions.offerToReceiveAudio === false) {
          numAudioTracks = 0;
        } else {
          numAudioTracks = offerOptions.offerToReceiveAudio;
        }
      }
      if (offerOptions.offerToReceiveVideo !== undefined) {
        if (offerOptions.offerToReceiveVideo === true) {
          numVideoTracks = 1;
        } else if (offerOptions.offerToReceiveVideo === false) {
          numVideoTracks = 0;
        } else {
          numVideoTracks = offerOptions.offerToReceiveVideo;
        }
      }
    }

    this.transceivers.forEach(function (transceiver) {
      if (transceiver.kind === 'audio') {
        numAudioTracks--;
        if (numAudioTracks < 0) {
          transceiver.wantReceive = false;
        }
      } else if (transceiver.kind === 'video') {
        numVideoTracks--;
        if (numVideoTracks < 0) {
          transceiver.wantReceive = false;
        }
      }
    });

    // Create M-lines for recvonly streams.
    while (numAudioTracks > 0 || numVideoTracks > 0) {
      if (numAudioTracks > 0) {
        this._createTransceiver('audio');
        numAudioTracks--;
      }
      if (numVideoTracks > 0) {
        this._createTransceiver('video');
        numVideoTracks--;
      }
    }

    var sdp = SDPUtils.writeSessionBoilerplate(this._sdpSessionId, this._sdpSessionVersion++);
    this.transceivers.forEach(function (transceiver, sdpMLineIndex) {
      // For each track, create an ice gatherer, ice transport,
      // dtls transport, potentially rtpsender and rtpreceiver.
      var track = transceiver.track;
      var kind = transceiver.kind;
      var mid = SDPUtils.generateIdentifier();
      transceiver.mid = mid;

      if (!transceiver.iceGatherer) {
        transceiver.iceGatherer = self._createIceGatherer(sdpMLineIndex, self.usingBundle);
      }

      var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
      // filter RTX until additional stuff needed for RTX is implemented
      // in adapter.js
      if (edgeVersion < 15019) {
        localCapabilities.codecs = localCapabilities.codecs.filter(function (codec) {
          return codec.name !== 'rtx';
        });
      }
      localCapabilities.codecs.forEach(function (codec) {
        // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
        // by adding level-asymmetry-allowed=1
        if (codec.name === 'H264' && codec.parameters['level-asymmetry-allowed'] === undefined) {
          codec.parameters['level-asymmetry-allowed'] = '1';
        }
      });

      // generate an ssrc now, to be used later in rtpSender.send
      var sendEncodingParameters = transceiver.sendEncodingParameters || [{
        ssrc: (2 * sdpMLineIndex + 1) * 1001
      }];
      if (track) {
        // add RTX
        if (edgeVersion >= 15019 && kind === 'video' && !sendEncodingParameters[0].rtx) {
          sendEncodingParameters[0].rtx = {
            ssrc: sendEncodingParameters[0].ssrc + 1
          };
        }
      }

      if (transceiver.wantReceive) {
        transceiver.rtpReceiver = new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);
      }

      transceiver.localCapabilities = localCapabilities;
      transceiver.sendEncodingParameters = sendEncodingParameters;
    });

    // always offer BUNDLE and dispose on return if not supported.
    if (this._config.bundlePolicy !== 'max-compat') {
      sdp += 'a=group:BUNDLE ' + this.transceivers.map(function (t) {
        return t.mid;
      }).join(' ') + '\r\n';
    }
    sdp += 'a=ice-options:trickle\r\n';

    this.transceivers.forEach(function (transceiver, sdpMLineIndex) {
      sdp += writeMediaSection(transceiver, transceiver.localCapabilities, 'offer', transceiver.stream, self._dtlsRole);
      sdp += 'a=rtcp-rsize\r\n';

      if (transceiver.iceGatherer && self.iceGatheringState !== 'new' && (sdpMLineIndex === 0 || !self.usingBundle)) {
        transceiver.iceGatherer.getLocalCandidates().forEach(function (cand) {
          cand.component = 1;
          sdp += 'a=' + SDPUtils.writeCandidate(cand) + '\r\n';
        });

        if (transceiver.iceGatherer.state === 'completed') {
          sdp += 'a=end-of-candidates\r\n';
        }
      }
    });

    var desc = new window.RTCSessionDescription({
      type: 'offer',
      sdp: sdp
    });
    return new Promise(function (resolve) {
      if (args.length > 0 && typeof args[0] === 'function') {
        args[0].apply(null, [desc]);
        resolve();
        return;
      }
      resolve(desc);
    });
  };

  RTCPeerConnection.prototype.createAnswer = function () {
    var self = this;
    var args = arguments;

    var sdp = SDPUtils.writeSessionBoilerplate(this._sdpSessionId, this._sdpSessionVersion++);
    if (this.usingBundle) {
      sdp += 'a=group:BUNDLE ' + this.transceivers.map(function (t) {
        return t.mid;
      }).join(' ') + '\r\n';
    }
    var mediaSectionsInOffer = SDPUtils.splitSections(this.remoteDescription.sdp).length - 1;
    this.transceivers.forEach(function (transceiver, sdpMLineIndex) {
      if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
        return;
      }
      if (transceiver.isDatachannel) {
        sdp += 'm=application 0 DTLS/SCTP 5000\r\n' + 'c=IN IP4 0.0.0.0\r\n' + 'a=mid:' + transceiver.mid + '\r\n';
        return;
      }

      // FIXME: look at direction.
      if (transceiver.stream) {
        var localTrack;
        if (transceiver.kind === 'audio') {
          localTrack = transceiver.stream.getAudioTracks()[0];
        } else if (transceiver.kind === 'video') {
          localTrack = transceiver.stream.getVideoTracks()[0];
        }
        if (localTrack) {
          // add RTX
          if (edgeVersion >= 15019 && transceiver.kind === 'video' && !transceiver.sendEncodingParameters[0].rtx) {
            transceiver.sendEncodingParameters[0].rtx = {
              ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
            };
          }
        }
      }

      // Calculate intersection of capabilities.
      var commonCapabilities = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);

      var hasRtx = commonCapabilities.codecs.filter(function (c) {
        return c.name.toLowerCase() === 'rtx';
      }).length;
      if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
        delete transceiver.sendEncodingParameters[0].rtx;
      }

      sdp += writeMediaSection(transceiver, commonCapabilities, 'answer', transceiver.stream, self._dtlsRole);
      if (transceiver.rtcpParameters && transceiver.rtcpParameters.reducedSize) {
        sdp += 'a=rtcp-rsize\r\n';
      }
    });

    var desc = new window.RTCSessionDescription({
      type: 'answer',
      sdp: sdp
    });
    return new Promise(function (resolve) {
      if (args.length > 0 && typeof args[0] === 'function') {
        args[0].apply(null, [desc]);
        resolve();
        return;
      }
      resolve(desc);
    });
  };

  RTCPeerConnection.prototype.addIceCandidate = function (candidate) {
    var err;
    var sections;
    if (!candidate || candidate.candidate === '') {
      for (var j = 0; j < this.transceivers.length; j++) {
        if (this.transceivers[j].isDatachannel) {
          continue;
        }
        this.transceivers[j].iceTransport.addRemoteCandidate({});
        sections = SDPUtils.splitSections(this.remoteDescription.sdp);
        sections[j + 1] += 'a=end-of-candidates\r\n';
        this.remoteDescription.sdp = sections.join('');
        if (this.usingBundle) {
          break;
        }
      }
    } else if (!(candidate.sdpMLineIndex !== undefined || candidate.sdpMid)) {
      throw new TypeError('sdpMLineIndex or sdpMid required');
    } else if (!this.remoteDescription) {
      err = new Error('Can not add ICE candidate without ' + 'a remote description');
      err.name = 'InvalidStateError';
    } else {
      var sdpMLineIndex = candidate.sdpMLineIndex;
      if (candidate.sdpMid) {
        for (var i = 0; i < this.transceivers.length; i++) {
          if (this.transceivers[i].mid === candidate.sdpMid) {
            sdpMLineIndex = i;
            break;
          }
        }
      }
      var transceiver = this.transceivers[sdpMLineIndex];
      if (transceiver) {
        if (transceiver.isDatachannel) {
          return Promise.resolve();
        }
        var cand = Object.keys(candidate.candidate).length > 0 ? SDPUtils.parseCandidate(candidate.candidate) : {};
        // Ignore Chrome's invalid candidates since Edge does not like them.
        if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
          return Promise.resolve();
        }
        // Ignore RTCP candidates, we assume RTCP-MUX.
        if (cand.component && cand.component !== 1) {
          return Promise.resolve();
        }
        // when using bundle, avoid adding candidates to the wrong
        // ice transport. And avoid adding candidates added in the SDP.
        if (sdpMLineIndex === 0 || sdpMLineIndex > 0 && transceiver.iceTransport !== this.transceivers[0].iceTransport) {
          if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
            err = new Error('Can not add ICE candidate');
            err.name = 'OperationError';
          }
        }

        if (!err) {
          // update the remoteDescription.
          var candidateString = candidate.candidate.trim();
          if (candidateString.indexOf('a=') === 0) {
            candidateString = candidateString.substr(2);
          }
          sections = SDPUtils.splitSections(this.remoteDescription.sdp);
          sections[sdpMLineIndex + 1] += 'a=' + (cand.type ? candidateString : 'end-of-candidates') + '\r\n';
          this.remoteDescription.sdp = sections.join('');
        }
      } else {
        err = new Error('Can not add ICE candidate');
        err.name = 'OperationError';
      }
    }
    var args = arguments;
    return new Promise(function (resolve, reject) {
      if (err) {
        if (args.length > 2 && typeof args[2] === 'function') {
          args[2].apply(null, [err]);
        }
        reject(err);
      } else {
        if (args.length > 1 && typeof args[1] === 'function') {
          args[1].apply(null);
        }
        resolve();
      }
    });
  };

  RTCPeerConnection.prototype.getStats = function () {
    var promises = [];
    this.transceivers.forEach(function (transceiver) {
      ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport', 'dtlsTransport'].forEach(function (method) {
        if (transceiver[method]) {
          promises.push(transceiver[method].getStats());
        }
      });
    });
    var cb = arguments.length > 1 && typeof arguments[1] === 'function' && arguments[1];
    var fixStatsType = function fixStatsType(stat) {
      return {
        inboundrtp: 'inbound-rtp',
        outboundrtp: 'outbound-rtp',
        candidatepair: 'candidate-pair',
        localcandidate: 'local-candidate',
        remotecandidate: 'remote-candidate'
      }[stat.type] || stat.type;
    };
    return new Promise(function (resolve) {
      // shim getStats with maplike support
      var results = new Map();
      Promise.all(promises).then(function (res) {
        res.forEach(function (result) {
          Object.keys(result).forEach(function (id) {
            result[id].type = fixStatsType(result[id]);
            results.set(id, result[id]);
          });
        });
        if (cb) {
          cb.apply(null, results);
        }
        resolve(results);
      });
    });
  };
  return RTCPeerConnection;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ0Y3BlZXJjb25uZWN0aW9uLmpzIl0sIm5hbWVzIjpbIlNEUFV0aWxzIiwicmVxdWlyZSIsIndyaXRlTWVkaWFTZWN0aW9uIiwidHJhbnNjZWl2ZXIiLCJjYXBzIiwidHlwZSIsInN0cmVhbSIsImR0bHNSb2xlIiwic2RwIiwid3JpdGVSdHBEZXNjcmlwdGlvbiIsImtpbmQiLCJ3cml0ZUljZVBhcmFtZXRlcnMiLCJpY2VHYXRoZXJlciIsImdldExvY2FsUGFyYW1ldGVycyIsIndyaXRlRHRsc1BhcmFtZXRlcnMiLCJkdGxzVHJhbnNwb3J0IiwibWlkIiwiZGlyZWN0aW9uIiwicnRwU2VuZGVyIiwicnRwUmVjZWl2ZXIiLCJtc2lkIiwiaWQiLCJ0cmFjayIsInNlbmRFbmNvZGluZ1BhcmFtZXRlcnMiLCJzc3JjIiwicnR4IiwibG9jYWxDTmFtZSIsImZpbHRlckljZVNlcnZlcnMiLCJpY2VTZXJ2ZXJzIiwiZWRnZVZlcnNpb24iLCJoYXNUdXJuIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiZmlsdGVyIiwic2VydmVyIiwidXJscyIsInVybCIsImNvbnNvbGUiLCJ3YXJuIiwiaXNTdHJpbmciLCJ2YWxpZFR1cm4iLCJpbmRleE9mIiwibGVuZ3RoIiwiZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzIiwibG9jYWxDYXBhYmlsaXRpZXMiLCJyZW1vdGVDYXBhYmlsaXRpZXMiLCJjb21tb25DYXBhYmlsaXRpZXMiLCJjb2RlY3MiLCJoZWFkZXJFeHRlbnNpb25zIiwiZmVjTWVjaGFuaXNtcyIsImZpbmRDb2RlY0J5UGF5bG9hZFR5cGUiLCJwdCIsInBhcnNlSW50IiwiaSIsInBheWxvYWRUeXBlIiwicHJlZmVycmVkUGF5bG9hZFR5cGUiLCJydHhDYXBhYmlsaXR5TWF0Y2hlcyIsImxSdHgiLCJyUnR4IiwibENvZGVjcyIsInJDb2RlY3MiLCJsQ29kZWMiLCJwYXJhbWV0ZXJzIiwiYXB0IiwickNvZGVjIiwibmFtZSIsInRvTG93ZXJDYXNlIiwiZm9yRWFjaCIsImNsb2NrUmF0ZSIsIm51bUNoYW5uZWxzIiwiTWF0aCIsIm1pbiIsInB1c2giLCJydGNwRmVlZGJhY2siLCJmYiIsImoiLCJwYXJhbWV0ZXIiLCJsSGVhZGVyRXh0ZW5zaW9uIiwickhlYWRlckV4dGVuc2lvbiIsInVyaSIsImlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUiLCJhY3Rpb24iLCJzaWduYWxpbmdTdGF0ZSIsIm9mZmVyIiwic2V0TG9jYWxEZXNjcmlwdGlvbiIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwiYW5zd2VyIiwibWF5YmVBZGRDYW5kaWRhdGUiLCJpY2VUcmFuc3BvcnQiLCJjYW5kaWRhdGUiLCJhbHJlYWR5QWRkZWQiLCJnZXRSZW1vdGVDYW5kaWRhdGVzIiwiZmluZCIsInJlbW90ZUNhbmRpZGF0ZSIsImZvdW5kYXRpb24iLCJpcCIsInBvcnQiLCJwcmlvcml0eSIsInByb3RvY29sIiwiYWRkUmVtb3RlQ2FuZGlkYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsIndpbmRvdyIsIlJUQ1BlZXJDb25uZWN0aW9uIiwiY29uZmlnIiwic2VsZiIsIl9ldmVudFRhcmdldCIsImRvY3VtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsIm1ldGhvZCIsImJpbmQiLCJvbmljZWNhbmRpZGF0ZSIsIm9uYWRkc3RyZWFtIiwib250cmFjayIsIm9ucmVtb3Zlc3RyZWFtIiwib25zaWduYWxpbmdzdGF0ZWNoYW5nZSIsIm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlIiwib25pY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZSIsIm9ubmVnb3RpYXRpb25uZWVkZWQiLCJvbmRhdGFjaGFubmVsIiwiY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMiLCJuZWVkTmVnb3RpYXRpb24iLCJsb2NhbFN0cmVhbXMiLCJyZW1vdGVTdHJlYW1zIiwibG9jYWxEZXNjcmlwdGlvbiIsInJlbW90ZURlc2NyaXB0aW9uIiwiaWNlQ29ubmVjdGlvblN0YXRlIiwiaWNlR2F0aGVyaW5nU3RhdGUiLCJ1c2luZ0J1bmRsZSIsImJ1bmRsZVBvbGljeSIsInJ0Y3BNdXhQb2xpY3kiLCJlIiwiRXJyb3IiLCJpY2VUcmFuc3BvcnRQb2xpY3kiLCJfaWNlR2F0aGVyZXJzIiwiaWNlQ2FuZGlkYXRlUG9vbFNpemUiLCJSVENJY2VHYXRoZXJlciIsImdhdGhlclBvbGljeSIsIl9jb25maWciLCJ0cmFuc2NlaXZlcnMiLCJfc2RwU2Vzc2lvbklkIiwiZ2VuZXJhdGVTZXNzaW9uSWQiLCJfc2RwU2Vzc2lvblZlcnNpb24iLCJfZHRsc1JvbGUiLCJ1bmRlZmluZWQiLCJwcm90b3R5cGUiLCJfZW1pdEdhdGhlcmluZ1N0YXRlQ2hhbmdlIiwiZXZlbnQiLCJFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJnZXRDb25maWd1cmF0aW9uIiwiZ2V0TG9jYWxTdHJlYW1zIiwiZ2V0UmVtb3RlU3RyZWFtcyIsIl9jcmVhdGVUcmFuc2NlaXZlciIsImhhc0J1bmRsZVRyYW5zcG9ydCIsInJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMiLCJ3YW50UmVjZWl2ZSIsInRyYW5zcG9ydHMiLCJfY3JlYXRlSWNlQW5kRHRsc1RyYW5zcG9ydHMiLCJhZGRUcmFjayIsIl9tYXliZUZpcmVOZWdvdGlhdGlvbk5lZWRlZCIsIlJUQ1J0cFNlbmRlciIsImFkZFN0cmVhbSIsImdldFRyYWNrcyIsImNsb25lZFN0cmVhbSIsImNsb25lIiwiaWR4IiwiY2xvbmVkVHJhY2siLCJhZGRFdmVudExpc3RlbmVyIiwiZW5hYmxlZCIsInJlbW92ZVN0cmVhbSIsInNwbGljZSIsImdldFNlbmRlcnMiLCJtYXAiLCJnZXRSZWNlaXZlcnMiLCJfY3JlYXRlSWNlR2F0aGVyZXIiLCJzZHBNTGluZUluZGV4Iiwic2hpZnQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwid3JpdGFibGUiLCJjYW5kaWRhdGVzIiwiYnVmZmVyQ2FuZGlkYXRlcyIsImVuZCIsImtleXMiLCJzdGF0ZSIsIl9nYXRoZXIiLCJvbmxvY2FsY2FuZGlkYXRlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsInNkcE1pZCIsImNhbmQiLCJjb21wb25lbnQiLCJ3cml0ZUNhbmRpZGF0ZSIsInNlY3Rpb25zIiwic3BsaXRTZWN0aW9ucyIsImpvaW4iLCJjb21wbGV0ZSIsImV2ZXJ5Iiwic2V0VGltZW91dCIsIlJUQ0ljZVRyYW5zcG9ydCIsIm9uaWNlc3RhdGVjaGFuZ2UiLCJfdXBkYXRlQ29ubmVjdGlvblN0YXRlIiwiUlRDRHRsc1RyYW5zcG9ydCIsIm9uZHRsc3N0YXRlY2hhbmdlIiwib25lcnJvciIsIl9kaXNwb3NlSWNlQW5kRHRsc1RyYW5zcG9ydHMiLCJfdHJhbnNjZWl2ZSIsInNlbmQiLCJyZWN2IiwicGFyYW1zIiwiZW5jb2RpbmdzIiwicnRjcCIsImNuYW1lIiwiY29tcG91bmQiLCJydGNwUGFyYW1ldGVycyIsInAiLCJyZWNlaXZlIiwiZGVzY3JpcHRpb24iLCJhcmdzIiwiYXJndW1lbnRzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJhcHBseSIsInNlc3Npb25wYXJ0IiwibWVkaWFTZWN0aW9uIiwicGFyc2VSdHBQYXJhbWV0ZXJzIiwiaXNJY2VMaXRlIiwibWF0Y2hQcmVmaXgiLCJyZWplY3RlZCIsImlzUmVqZWN0ZWQiLCJpc0RhdGFjaGFubmVsIiwicmVtb3RlSWNlUGFyYW1ldGVycyIsImdldEljZVBhcmFtZXRlcnMiLCJyZW1vdGVEdGxzUGFyYW1ldGVycyIsImdldER0bHNQYXJhbWV0ZXJzIiwicm9sZSIsInN0YXJ0IiwiX3VwZGF0ZVNpZ25hbGluZ1N0YXRlIiwiVHlwZUVycm9yIiwiY2IiLCJzdHJlYW1zIiwicmVjZWl2ZXJMaXN0IiwiaWNlT3B0aW9ucyIsInN1YnN0ciIsInNwbGl0IiwibGluZXMiLCJzcGxpdExpbmVzIiwiZ2V0S2luZCIsImdldERpcmVjdGlvbiIsInJlbW90ZU1zaWQiLCJwYXJzZU1zaWQiLCJnZXRNaWQiLCJnZW5lcmF0ZUlkZW50aWZpZXIiLCJwYXJzZVJ0cEVuY29kaW5nUGFyYW1ldGVycyIsInBhcnNlUnRjcFBhcmFtZXRlcnMiLCJpc0NvbXBsZXRlIiwiY2FuZHMiLCJwYXJzZUNhbmRpZGF0ZSIsInNldFRyYW5zcG9ydCIsInNldFJlbW90ZUNhbmRpZGF0ZXMiLCJSVENSdHBSZWNlaXZlciIsImdldENhcGFiaWxpdGllcyIsImNvZGVjIiwiaXNOZXdUcmFjayIsIk1lZGlhU3RyZWFtIiwiZ2V0IiwiZGVmYXVsdCIsInNpZCIsIml0ZW0iLCJyZWNlaXZlciIsInRyYWNrRXZlbnQiLCJjbG9zZSIsInN0b3AiLCJuZXdTdGF0ZSIsInN0YXRlcyIsImNsb3NlZCIsImNvbm5lY3RpbmciLCJjaGVja2luZyIsImNvbm5lY3RlZCIsImNvbXBsZXRlZCIsImRpc2Nvbm5lY3RlZCIsImZhaWxlZCIsIm5ldyIsImNyZWF0ZU9mZmVyIiwib2ZmZXJPcHRpb25zIiwibnVtQXVkaW9UcmFja3MiLCJ0IiwibnVtVmlkZW9UcmFja3MiLCJtYW5kYXRvcnkiLCJvcHRpb25hbCIsIm9mZmVyVG9SZWNlaXZlQXVkaW8iLCJvZmZlclRvUmVjZWl2ZVZpZGVvIiwid3JpdGVTZXNzaW9uQm9pbGVycGxhdGUiLCJnZXRMb2NhbENhbmRpZGF0ZXMiLCJkZXNjIiwiUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwibWVkaWFTZWN0aW9uc0luT2ZmZXIiLCJsb2NhbFRyYWNrIiwiZ2V0QXVkaW9UcmFja3MiLCJnZXRWaWRlb1RyYWNrcyIsImhhc1J0eCIsImMiLCJyZWR1Y2VkU2l6ZSIsImFkZEljZUNhbmRpZGF0ZSIsImVyciIsImNhbmRpZGF0ZVN0cmluZyIsInRyaW0iLCJnZXRTdGF0cyIsInByb21pc2VzIiwiZml4U3RhdHNUeXBlIiwic3RhdCIsImluYm91bmRydHAiLCJvdXRib3VuZHJ0cCIsImNhbmRpZGF0ZXBhaXIiLCJsb2NhbGNhbmRpZGF0ZSIsInJlbW90ZWNhbmRpZGF0ZSIsInJlc3VsdHMiLCJNYXAiLCJhbGwiLCJ0aGVuIiwicmVzIiwicmVzdWx0Iiwic2V0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQU9DO0FBQ0Q7O0FB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LElBQUkwTixPQUFKLENBQVksVUFBU0MsT0FBVCxFQUFrQjtBQUNuQztBQUNBLFVBQUlpRyxVQUFVLElBQUlDLEdBQUosRUFBZDtBQUNBbkcsY0FBUW9HLEdBQVIsQ0FBWVYsUUFBWixFQUFzQlcsSUFBdEIsQ0FBMkIsVUFBU0MsR0FBVCxFQUFjO0FBQ3ZDQSxZQUFJalEsT0FBSixDQUFZLFVBQVNrUSxNQUFULEVBQWlCO0FBQzNCbkosaUJBQU9PLElBQVAsQ0FBWTRJLE1BQVosRUFBb0JsUSxPQUFwQixDQUE0QixVQUFTL0MsRUFBVCxFQUFhO0FBQ3ZDaVQsbUJBQU9qVCxFQUFQLEVBQVdoQixJQUFYLEdBQWtCcVQsYUFBYVksT0FBT2pULEVBQVAsQ0FBYixDQUFsQjtBQUNBNFMsb0JBQVFNLEdBQVIsQ0FBWWxULEVBQVosRUFBZ0JpVCxPQUFPalQsRUFBUCxDQUFoQjtBQUNELFdBSEQ7QUFJRCxTQUxEO0FBTUEsWUFBSThOLEVBQUosRUFBUTtBQUNOQSxhQUFHakIsS0FBSCxDQUFTLElBQVQsRUFBZStGLE9BQWY7QUFDRDtBQUNEakcsZ0JBQVFpRyxPQUFSO0FBQ0QsT0FYRDtBQVlELEtBZk0sQ0FBUDtBQWdCRCxHQXJDRDtBQXNDQSxTQUFPek4saUJBQVA7QUFDRCxDQTd6Q0QiLCJmaWxlIjoicnRjcGVlcmNvbm5lY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogIENvcHlyaWdodCAoYykgMjAxNyBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFNEUFV0aWxzID0gcmVxdWlyZSgnc2RwJyk7XG5cbmZ1bmN0aW9uIHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCBjYXBzLCB0eXBlLCBzdHJlYW0sIGR0bHNSb2xlKSB7XG4gIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uKHRyYW5zY2VpdmVyLmtpbmQsIGNhcHMpO1xuXG4gIC8vIE1hcCBJQ0UgcGFyYW1ldGVycyAodWZyYWcsIHB3ZCkgdG8gU0RQLlxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzKFxuICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuZ2V0TG9jYWxQYXJhbWV0ZXJzKCkpO1xuXG4gIC8vIE1hcCBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVEdGxzUGFyYW1ldGVycyhcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuZ2V0TG9jYWxQYXJhbWV0ZXJzKCksXG4gICAgICB0eXBlID09PSAnb2ZmZXInID8gJ2FjdHBhc3MnIDogZHRsc1JvbGUgfHwgJ2FjdGl2ZScpO1xuXG4gIHNkcCArPSAnYT1taWQ6JyArIHRyYW5zY2VpdmVyLm1pZCArICdcXHJcXG4nO1xuXG4gIGlmICh0cmFuc2NlaXZlci5kaXJlY3Rpb24pIHtcbiAgICBzZHAgKz0gJ2E9JyArIHRyYW5zY2VpdmVyLmRpcmVjdGlvbiArICdcXHJcXG4nO1xuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgIHNkcCArPSAnYT1zZW5kcmVjdlxcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgc2RwICs9ICdhPXNlbmRvbmx5XFxyXFxuJztcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgIHNkcCArPSAnYT1yZWN2b25seVxcclxcbic7XG4gIH0gZWxzZSB7XG4gICAgc2RwICs9ICdhPWluYWN0aXZlXFxyXFxuJztcbiAgfVxuXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICAvLyBzcGVjLlxuICAgIHZhciBtc2lkID0gJ21zaWQ6JyArIHN0cmVhbS5pZCArICcgJyArXG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci50cmFjay5pZCArICdcXHJcXG4nO1xuICAgIHNkcCArPSAnYT0nICsgbXNpZDtcblxuICAgIC8vIGZvciBDaHJvbWUuXG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXG4gICAgICAgICcgJyArIG1zaWQ7XG4gICAgaWYgKHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICAgJyAnICsgbXNpZDtcbiAgICAgIHNkcCArPSAnYT1zc3JjLWdyb3VwOkZJRCAnICtcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAnICcgK1xuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAgICdcXHJcXG4nO1xuICAgIH1cbiAgfVxuICAvLyBGSVhNRTogdGhpcyBzaG91bGQgYmUgd3JpdHRlbiBieSB3cml0ZVJ0cERlc2NyaXB0aW9uLlxuICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcbiAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xuICB9XG4gIHJldHVybiBzZHA7XG59XG5cbi8vIEVkZ2UgZG9lcyBub3QgbGlrZVxuLy8gMSkgc3R1bjogZmlsdGVyZWQgYWZ0ZXIgMTQzOTMgdW5sZXNzID90cmFuc3BvcnQ9dWRwIGlzIHByZXNlbnRcbi8vIDIpIHR1cm46IHRoYXQgZG9lcyBub3QgaGF2ZSBhbGwgb2YgdHVybjpob3N0OnBvcnQ/dHJhbnNwb3J0PXVkcFxuLy8gMykgdHVybjogd2l0aCBpcHY2IGFkZHJlc3Nlc1xuLy8gNCkgdHVybjogb2NjdXJyaW5nIG11bGlwbGUgdGltZXNcbmZ1bmN0aW9uIGZpbHRlckljZVNlcnZlcnMoaWNlU2VydmVycywgZWRnZVZlcnNpb24pIHtcbiAgdmFyIGhhc1R1cm4gPSBmYWxzZTtcbiAgaWNlU2VydmVycyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaWNlU2VydmVycykpO1xuICByZXR1cm4gaWNlU2VydmVycy5maWx0ZXIoZnVuY3Rpb24oc2VydmVyKSB7XG4gICAgaWYgKHNlcnZlciAmJiAoc2VydmVyLnVybHMgfHwgc2VydmVyLnVybCkpIHtcbiAgICAgIHZhciB1cmxzID0gc2VydmVyLnVybHMgfHwgc2VydmVyLnVybDtcbiAgICAgIGlmIChzZXJ2ZXIudXJsICYmICFzZXJ2ZXIudXJscykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1JUQ0ljZVNlcnZlci51cmwgaXMgZGVwcmVjYXRlZCEgVXNlIHVybHMgaW5zdGVhZC4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiB1cmxzID09PSAnc3RyaW5nJztcbiAgICAgIGlmIChpc1N0cmluZykge1xuICAgICAgICB1cmxzID0gW3VybHNdO1xuICAgICAgfVxuICAgICAgdXJscyA9IHVybHMuZmlsdGVyKGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB2YXIgdmFsaWRUdXJuID0gdXJsLmluZGV4T2YoJ3R1cm46JykgPT09IDAgJiZcbiAgICAgICAgICAgIHVybC5pbmRleE9mKCd0cmFuc3BvcnQ9dWRwJykgIT09IC0xICYmXG4gICAgICAgICAgICB1cmwuaW5kZXhPZigndHVybjpbJykgPT09IC0xICYmXG4gICAgICAgICAgICAhaGFzVHVybjtcblxuICAgICAgICBpZiAodmFsaWRUdXJuKSB7XG4gICAgICAgICAgaGFzVHVybiA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybC5pbmRleE9mKCdzdHVuOicpID09PSAwICYmIGVkZ2VWZXJzaW9uID49IDE0MzkzICYmXG4gICAgICAgICAgICB1cmwuaW5kZXhPZignP3RyYW5zcG9ydD11ZHAnKSA9PT0gLTE7XG4gICAgICB9KTtcblxuICAgICAgZGVsZXRlIHNlcnZlci51cmw7XG4gICAgICBzZXJ2ZXIudXJscyA9IGlzU3RyaW5nID8gdXJsc1swXSA6IHVybHM7XG4gICAgICByZXR1cm4gISF1cmxzLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbn1cblxuLy8gRGV0ZXJtaW5lcyB0aGUgaW50ZXJzZWN0aW9uIG9mIGxvY2FsIGFuZCByZW1vdGUgY2FwYWJpbGl0aWVzLlxuZnVuY3Rpb24gZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzKGxvY2FsQ2FwYWJpbGl0aWVzLCByZW1vdGVDYXBhYmlsaXRpZXMpIHtcbiAgdmFyIGNvbW1vbkNhcGFiaWxpdGllcyA9IHtcbiAgICBjb2RlY3M6IFtdLFxuICAgIGhlYWRlckV4dGVuc2lvbnM6IFtdLFxuICAgIGZlY01lY2hhbmlzbXM6IFtdXG4gIH07XG5cbiAgdmFyIGZpbmRDb2RlY0J5UGF5bG9hZFR5cGUgPSBmdW5jdGlvbihwdCwgY29kZWNzKSB7XG4gICAgcHQgPSBwYXJzZUludChwdCwgMTApO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29kZWNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY29kZWNzW2ldLnBheWxvYWRUeXBlID09PSBwdCB8fFxuICAgICAgICAgIGNvZGVjc1tpXS5wcmVmZXJyZWRQYXlsb2FkVHlwZSA9PT0gcHQpIHtcbiAgICAgICAgcmV0dXJuIGNvZGVjc1tpXTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHJ0eENhcGFiaWxpdHlNYXRjaGVzID0gZnVuY3Rpb24obFJ0eCwgclJ0eCwgbENvZGVjcywgckNvZGVjcykge1xuICAgIHZhciBsQ29kZWMgPSBmaW5kQ29kZWNCeVBheWxvYWRUeXBlKGxSdHgucGFyYW1ldGVycy5hcHQsIGxDb2RlY3MpO1xuICAgIHZhciByQ29kZWMgPSBmaW5kQ29kZWNCeVBheWxvYWRUeXBlKHJSdHgucGFyYW1ldGVycy5hcHQsIHJDb2RlY3MpO1xuICAgIHJldHVybiBsQ29kZWMgJiYgckNvZGVjICYmXG4gICAgICAgIGxDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHJDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gIH07XG5cbiAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24obENvZGVjKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgckNvZGVjID0gcmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjc1tpXTtcbiAgICAgIGlmIChsQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSByQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpICYmXG4gICAgICAgICAgbENvZGVjLmNsb2NrUmF0ZSA9PT0gckNvZGVjLmNsb2NrUmF0ZSkge1xuICAgICAgICBpZiAobENvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3J0eCcgJiZcbiAgICAgICAgICAgIGxDb2RlYy5wYXJhbWV0ZXJzICYmIHJDb2RlYy5wYXJhbWV0ZXJzLmFwdCkge1xuICAgICAgICAgIC8vIGZvciBSVFggd2UgbmVlZCB0byBmaW5kIHRoZSBsb2NhbCBydHggdGhhdCBoYXMgYSBhcHRcbiAgICAgICAgICAvLyB3aGljaCBwb2ludHMgdG8gdGhlIHNhbWUgbG9jYWwgY29kZWMgYXMgdGhlIHJlbW90ZSBvbmUuXG4gICAgICAgICAgaWYgKCFydHhDYXBhYmlsaXR5TWF0Y2hlcyhsQ29kZWMsIHJDb2RlYyxcbiAgICAgICAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLCByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJDb2RlYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkockNvZGVjKSk7IC8vIGRlZXBjb3B5XG4gICAgICAgIC8vIG51bWJlciBvZiBjaGFubmVscyBpcyB0aGUgaGlnaGVzdCBjb21tb24gbnVtYmVyIG9mIGNoYW5uZWxzXG4gICAgICAgIHJDb2RlYy5udW1DaGFubmVscyA9IE1hdGgubWluKGxDb2RlYy5udW1DaGFubmVscyxcbiAgICAgICAgICAgIHJDb2RlYy5udW1DaGFubmVscyk7XG4gICAgICAgIC8vIHB1c2ggckNvZGVjIHNvIHdlIHJlcGx5IHdpdGggb2ZmZXJlciBwYXlsb2FkIHR5cGVcbiAgICAgICAgY29tbW9uQ2FwYWJpbGl0aWVzLmNvZGVjcy5wdXNoKHJDb2RlYyk7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGNvbW1vbiBmZWVkYmFjayBtZWNoYW5pc21zXG4gICAgICAgIHJDb2RlYy5ydGNwRmVlZGJhY2sgPSByQ29kZWMucnRjcEZlZWRiYWNrLmZpbHRlcihmdW5jdGlvbihmYikge1xuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbENvZGVjLnJ0Y3BGZWVkYmFjay5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKGxDb2RlYy5ydGNwRmVlZGJhY2tbal0udHlwZSA9PT0gZmIudHlwZSAmJlxuICAgICAgICAgICAgICAgIGxDb2RlYy5ydGNwRmVlZGJhY2tbal0ucGFyYW1ldGVyID09PSBmYi5wYXJhbWV0ZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEZJWE1FOiBhbHNvIG5lZWQgdG8gZGV0ZXJtaW5lIC5wYXJhbWV0ZXJzXG4gICAgICAgIC8vICBzZWUgaHR0cHM6Ly9naXRodWIuY29tL29wZW5wZWVyL29ydGMvaXNzdWVzLzU2OVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGxvY2FsQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihsSGVhZGVyRXh0ZW5zaW9uKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW1vdGVDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5sZW5ndGg7XG4gICAgICAgICBpKyspIHtcbiAgICAgIHZhciBySGVhZGVyRXh0ZW5zaW9uID0gcmVtb3RlQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnNbaV07XG4gICAgICBpZiAobEhlYWRlckV4dGVuc2lvbi51cmkgPT09IHJIZWFkZXJFeHRlbnNpb24udXJpKSB7XG4gICAgICAgIGNvbW1vbkNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLnB1c2gockhlYWRlckV4dGVuc2lvbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gRklYTUU6IGZlY01lY2hhbmlzbXNcbiAgcmV0dXJuIGNvbW1vbkNhcGFiaWxpdGllcztcbn1cblxuLy8gaXMgYWN0aW9uPXNldExvY2FsRGVzY3JpcHRpb24gd2l0aCB0eXBlIGFsbG93ZWQgaW4gc2lnbmFsaW5nU3RhdGVcbmZ1bmN0aW9uIGlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUoYWN0aW9uLCB0eXBlLCBzaWduYWxpbmdTdGF0ZSkge1xuICByZXR1cm4ge1xuICAgIG9mZmVyOiB7XG4gICAgICBzZXRMb2NhbERlc2NyaXB0aW9uOiBbJ3N0YWJsZScsICdoYXZlLWxvY2FsLW9mZmVyJ10sXG4gICAgICBzZXRSZW1vdGVEZXNjcmlwdGlvbjogWydzdGFibGUnLCAnaGF2ZS1yZW1vdGUtb2ZmZXInXVxuICAgIH0sXG4gICAgYW5zd2VyOiB7XG4gICAgICBzZXRMb2NhbERlc2NyaXB0aW9uOiBbJ2hhdmUtcmVtb3RlLW9mZmVyJywgJ2hhdmUtbG9jYWwtcHJhbnN3ZXInXSxcbiAgICAgIHNldFJlbW90ZURlc2NyaXB0aW9uOiBbJ2hhdmUtbG9jYWwtb2ZmZXInLCAnaGF2ZS1yZW1vdGUtcHJhbnN3ZXInXVxuICAgIH1cbiAgfVt0eXBlXVthY3Rpb25dLmluZGV4T2Yoc2lnbmFsaW5nU3RhdGUpICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gbWF5YmVBZGRDYW5kaWRhdGUoaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpIHtcbiAgLy8gRWRnZSdzIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFkZHMgc29tZSBmaWVsZHMgdGhlcmVmb3JlXG4gIC8vIG5vdCBhbGwgZmllbGTRlSBhcmUgdGFrZW4gaW50byBhY2NvdW50LlxuICB2YXIgYWxyZWFkeUFkZGVkID0gaWNlVHJhbnNwb3J0LmdldFJlbW90ZUNhbmRpZGF0ZXMoKVxuICAgICAgLmZpbmQoZnVuY3Rpb24ocmVtb3RlQ2FuZGlkYXRlKSB7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUuZm91bmRhdGlvbiA9PT0gcmVtb3RlQ2FuZGlkYXRlLmZvdW5kYXRpb24gJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5pcCA9PT0gcmVtb3RlQ2FuZGlkYXRlLmlwICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUucG9ydCA9PT0gcmVtb3RlQ2FuZGlkYXRlLnBvcnQgJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5wcmlvcml0eSA9PT0gcmVtb3RlQ2FuZGlkYXRlLnByaW9yaXR5ICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUucHJvdG9jb2wgPT09IHJlbW90ZUNhbmRpZGF0ZS5wcm90b2NvbCAmJlxuICAgICAgICAgICAgY2FuZGlkYXRlLnR5cGUgPT09IHJlbW90ZUNhbmRpZGF0ZS50eXBlO1xuICAgICAgfSk7XG4gIGlmICghYWxyZWFkeUFkZGVkKSB7XG4gICAgaWNlVHJhbnNwb3J0LmFkZFJlbW90ZUNhbmRpZGF0ZShjYW5kaWRhdGUpO1xuICB9XG4gIHJldHVybiAhYWxyZWFkeUFkZGVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdywgZWRnZVZlcnNpb24pIHtcbiAgdmFyIFJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIF9ldmVudFRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBbJ2FkZEV2ZW50TGlzdGVuZXInLCAncmVtb3ZlRXZlbnRMaXN0ZW5lcicsICdkaXNwYXRjaEV2ZW50J11cbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgc2VsZlttZXRob2RdID0gX2V2ZW50VGFyZ2V0W21ldGhvZF0uYmluZChfZXZlbnRUYXJnZXQpO1xuICAgICAgICB9KTtcblxuICAgIHRoaXMub25pY2VjYW5kaWRhdGUgPSBudWxsO1xuICAgIHRoaXMub25hZGRzdHJlYW0gPSBudWxsO1xuICAgIHRoaXMub250cmFjayA9IG51bGw7XG4gICAgdGhpcy5vbnJlbW92ZXN0cmVhbSA9IG51bGw7XG4gICAgdGhpcy5vbnNpZ25hbGluZ3N0YXRlY2hhbmdlID0gbnVsbDtcbiAgICB0aGlzLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICB0aGlzLm9uaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgIHRoaXMub25uZWdvdGlhdGlvbm5lZWRlZCA9IG51bGw7XG4gICAgdGhpcy5vbmRhdGFjaGFubmVsID0gbnVsbDtcbiAgICB0aGlzLmNhblRyaWNrbGVJY2VDYW5kaWRhdGVzID0gbnVsbDtcblxuICAgIHRoaXMubmVlZE5lZ290aWF0aW9uID0gZmFsc2U7XG5cbiAgICB0aGlzLmxvY2FsU3RyZWFtcyA9IFtdO1xuICAgIHRoaXMucmVtb3RlU3RyZWFtcyA9IFtdO1xuXG4gICAgdGhpcy5sb2NhbERlc2NyaXB0aW9uID0gbnVsbDtcbiAgICB0aGlzLnJlbW90ZURlc2NyaXB0aW9uID0gbnVsbDtcblxuICAgIHRoaXMuc2lnbmFsaW5nU3RhdGUgPSAnc3RhYmxlJztcbiAgICB0aGlzLmljZUNvbm5lY3Rpb25TdGF0ZSA9ICduZXcnO1xuICAgIHRoaXMuaWNlR2F0aGVyaW5nU3RhdGUgPSAnbmV3JztcblxuICAgIGNvbmZpZyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uZmlnIHx8IHt9KSk7XG5cbiAgICB0aGlzLnVzaW5nQnVuZGxlID0gY29uZmlnLmJ1bmRsZVBvbGljeSA9PT0gJ21heC1idW5kbGUnO1xuICAgIGlmIChjb25maWcucnRjcE11eFBvbGljeSA9PT0gJ25lZ290aWF0ZScpIHtcbiAgICAgIHZhciBlID0gbmV3IEVycm9yKCdydGNwTXV4UG9saWN5IFxcJ25lZ290aWF0ZVxcJyBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICBlLm5hbWUgPSAnTm90U3VwcG9ydGVkRXJyb3InO1xuICAgICAgdGhyb3coZSk7XG4gICAgfSBlbHNlIGlmICghY29uZmlnLnJ0Y3BNdXhQb2xpY3kpIHtcbiAgICAgIGNvbmZpZy5ydGNwTXV4UG9saWN5ID0gJ3JlcXVpcmUnO1xuICAgIH1cblxuICAgIHN3aXRjaCAoY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSkge1xuICAgICAgY2FzZSAnYWxsJzpcbiAgICAgIGNhc2UgJ3JlbGF5JzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5ID0gJ2FsbCc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN3aXRjaCAoY29uZmlnLmJ1bmRsZVBvbGljeSkge1xuICAgICAgY2FzZSAnYmFsYW5jZWQnOlxuICAgICAgY2FzZSAnbWF4LWNvbXBhdCc6XG4gICAgICBjYXNlICdtYXgtYnVuZGxlJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25maWcuYnVuZGxlUG9saWN5ID0gJ2JhbGFuY2VkJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uZmlnLmljZVNlcnZlcnMgPSBmaWx0ZXJJY2VTZXJ2ZXJzKGNvbmZpZy5pY2VTZXJ2ZXJzIHx8IFtdLCBlZGdlVmVyc2lvbik7XG5cbiAgICB0aGlzLl9pY2VHYXRoZXJlcnMgPSBbXTtcbiAgICBpZiAoY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplKSB7XG4gICAgICBmb3IgKHZhciBpID0gY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHRoaXMuX2ljZUdhdGhlcmVycyA9IG5ldyB3aW5kb3cuUlRDSWNlR2F0aGVyZXIoe1xuICAgICAgICAgIGljZVNlcnZlcnM6IGNvbmZpZy5pY2VTZXJ2ZXJzLFxuICAgICAgICAgIGdhdGhlclBvbGljeTogY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplID0gMDtcbiAgICB9XG5cbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG5cbiAgICAvLyBwZXItdHJhY2sgaWNlR2F0aGVycywgaWNlVHJhbnNwb3J0cywgZHRsc1RyYW5zcG9ydHMsIHJ0cFNlbmRlcnMsIC4uLlxuICAgIC8vIGV2ZXJ5dGhpbmcgdGhhdCBpcyBuZWVkZWQgdG8gZGVzY3JpYmUgYSBTRFAgbS1saW5lLlxuICAgIHRoaXMudHJhbnNjZWl2ZXJzID0gW107XG5cbiAgICB0aGlzLl9zZHBTZXNzaW9uSWQgPSBTRFBVdGlscy5nZW5lcmF0ZVNlc3Npb25JZCgpO1xuICAgIHRoaXMuX3NkcFNlc3Npb25WZXJzaW9uID0gMDtcblxuICAgIHRoaXMuX2R0bHNSb2xlID0gdW5kZWZpbmVkOyAvLyByb2xlIGZvciBhPXNldHVwIHRvIHVzZSBpbiBhbnN3ZXJzLlxuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fZW1pdEdhdGhlcmluZ1N0YXRlQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZScpO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMub25pY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZShldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRDb25maWd1cmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxTdHJlYW1zO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZW1vdGVTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucmVtb3RlU3RyZWFtcztcbiAgfTtcblxuICAvLyBpbnRlcm5hbCBoZWxwZXIgdG8gY3JlYXRlIGEgdHJhbnNjZWl2ZXIgb2JqZWN0LlxuICAvLyAod2hpaCBpcyBub3QgeWV0IHRoZSBzYW1lIGFzIHRoZSBXZWJSVEMgMS4wIHRyYW5zY2VpdmVyKVxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2NyZWF0ZVRyYW5zY2VpdmVyID0gZnVuY3Rpb24oa2luZCkge1xuICAgIHZhciBoYXNCdW5kbGVUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVycy5sZW5ndGggPiAwO1xuICAgIHZhciB0cmFuc2NlaXZlciA9IHtcbiAgICAgIHRyYWNrOiBudWxsLFxuICAgICAgaWNlR2F0aGVyZXI6IG51bGwsXG4gICAgICBpY2VUcmFuc3BvcnQ6IG51bGwsXG4gICAgICBkdGxzVHJhbnNwb3J0OiBudWxsLFxuICAgICAgbG9jYWxDYXBhYmlsaXRpZXM6IG51bGwsXG4gICAgICByZW1vdGVDYXBhYmlsaXRpZXM6IG51bGwsXG4gICAgICBydHBTZW5kZXI6IG51bGwsXG4gICAgICBydHBSZWNlaXZlcjogbnVsbCxcbiAgICAgIGtpbmQ6IGtpbmQsXG4gICAgICBtaWQ6IG51bGwsXG4gICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzOiBudWxsLFxuICAgICAgcmVjdkVuY29kaW5nUGFyYW1ldGVyczogbnVsbCxcbiAgICAgIHN0cmVhbTogbnVsbCxcbiAgICAgIHdhbnRSZWNlaXZlOiB0cnVlXG4gICAgfTtcbiAgICBpZiAodGhpcy51c2luZ0J1bmRsZSAmJiBoYXNCdW5kbGVUcmFuc3BvcnQpIHtcbiAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydDtcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdHJhbnNwb3J0cyA9IHRoaXMuX2NyZWF0ZUljZUFuZER0bHNUcmFuc3BvcnRzKCk7XG4gICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgPSB0cmFuc3BvcnRzLmljZVRyYW5zcG9ydDtcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQgPSB0cmFuc3BvcnRzLmR0bHNUcmFuc3BvcnQ7XG4gICAgfVxuICAgIHRoaXMudHJhbnNjZWl2ZXJzLnB1c2godHJhbnNjZWl2ZXIpO1xuICAgIHJldHVybiB0cmFuc2NlaXZlcjtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XG4gICAgdmFyIHRyYW5zY2VpdmVyO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50cmFuc2NlaXZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghdGhpcy50cmFuc2NlaXZlcnNbaV0udHJhY2sgJiZcbiAgICAgICAgICB0aGlzLnRyYW5zY2VpdmVyc1tpXS5raW5kID09PSB0cmFjay5raW5kKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyID0gdGhpcy50cmFuc2NlaXZlcnNbaV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdHJhbnNjZWl2ZXIpIHtcbiAgICAgIHRyYW5zY2VpdmVyID0gdGhpcy5fY3JlYXRlVHJhbnNjZWl2ZXIodHJhY2sua2luZCk7XG4gICAgfVxuXG4gICAgdGhpcy5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQoKTtcblxuICAgIGlmICh0aGlzLmxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XG4gICAgICB0aGlzLmxvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgfVxuXG4gICAgdHJhbnNjZWl2ZXIudHJhY2sgPSB0cmFjaztcbiAgICB0cmFuc2NlaXZlci5zdHJlYW0gPSBzdHJlYW07XG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyID0gbmV3IHdpbmRvdy5SVENSdHBTZW5kZXIodHJhY2ssXG4gICAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQpO1xuICAgIHJldHVybiB0cmFuc2NlaXZlci5ydHBTZW5kZXI7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZiAoZWRnZVZlcnNpb24gPj0gMTUwMjUpIHtcbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgIHNlbGYuYWRkVHJhY2sodHJhY2ssIHN0cmVhbSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ2xvbmUgaXMgbmVjZXNzYXJ5IGZvciBsb2NhbCBkZW1vcyBtb3N0bHksIGF0dGFjaGluZyBkaXJlY3RseVxuICAgICAgLy8gdG8gdHdvIGRpZmZlcmVudCBzZW5kZXJzIGRvZXMgbm90IHdvcmsgKGJ1aWxkIDEwNTQ3KS5cbiAgICAgIC8vIEZpeGVkIGluIDE1MDI1IChvciBlYXJsaWVyKVxuICAgICAgdmFyIGNsb25lZFN0cmVhbSA9IHN0cmVhbS5jbG9uZSgpO1xuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2ssIGlkeCkge1xuICAgICAgICB2YXIgY2xvbmVkVHJhY2sgPSBjbG9uZWRTdHJlYW0uZ2V0VHJhY2tzKClbaWR4XTtcbiAgICAgICAgdHJhY2suYWRkRXZlbnRMaXN0ZW5lcignZW5hYmxlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY2xvbmVkVHJhY2suZW5hYmxlZCA9IGV2ZW50LmVuYWJsZWQ7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBjbG9uZWRTdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICBzZWxmLmFkZFRyYWNrKHRyYWNrLCBjbG9uZWRTdHJlYW0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICB2YXIgaWR4ID0gdGhpcy5sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgdGhpcy5sb2NhbFN0cmVhbXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB0aGlzLl9tYXliZUZpcmVOZWdvdGlhdGlvbk5lZWRlZCgpO1xuICAgIH1cbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHJldHVybiAhIXRyYW5zY2VpdmVyLnJ0cFNlbmRlcjtcbiAgICB9KVxuICAgIC5tYXAoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHJldHVybiB0cmFuc2NlaXZlci5ydHBTZW5kZXI7XG4gICAgfSk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlY2VpdmVycyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHJldHVybiAhIXRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgIH0pXG4gICAgLm1hcChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgIH0pO1xuICB9O1xuXG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVJY2VHYXRoZXJlciA9IGZ1bmN0aW9uKHNkcE1MaW5lSW5kZXgsXG4gICAgICB1c2luZ0J1bmRsZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZiAodXNpbmdCdW5kbGUgJiYgc2RwTUxpbmVJbmRleCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVyc1swXS5pY2VHYXRoZXJlcjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2ljZUdhdGhlcmVycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pY2VHYXRoZXJlcnMuc2hpZnQoKTtcbiAgICB9XG4gICAgdmFyIGljZUdhdGhlcmVyID0gbmV3IHdpbmRvdy5SVENJY2VHYXRoZXJlcih7XG4gICAgICBpY2VTZXJ2ZXJzOiB0aGlzLl9jb25maWcuaWNlU2VydmVycyxcbiAgICAgIGdhdGhlclBvbGljeTogdGhpcy5fY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpY2VHYXRoZXJlciwgJ3N0YXRlJyxcbiAgICAgICAge3ZhbHVlOiAnbmV3Jywgd3JpdGFibGU6IHRydWV9XG4gICAgKTtcblxuICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmNhbmRpZGF0ZXMgPSBbXTtcbiAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciBlbmQgPSAhZXZlbnQuY2FuZGlkYXRlIHx8IE9iamVjdC5rZXlzKGV2ZW50LmNhbmRpZGF0ZSkubGVuZ3RoID09PSAwO1xuICAgICAgLy8gcG9seWZpbGwgc2luY2UgUlRDSWNlR2F0aGVyZXIuc3RhdGUgaXMgbm90IGltcGxlbWVudGVkIGluXG4gICAgICAvLyBFZGdlIDEwNTQ3IHlldC5cbiAgICAgIGljZUdhdGhlcmVyLnN0YXRlID0gZW5kID8gJ2NvbXBsZXRlZCcgOiAnZ2F0aGVyaW5nJztcbiAgICAgIGlmIChzZWxmLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5jYW5kaWRhdGVzICE9PSBudWxsKSB7XG4gICAgICAgIHNlbGYudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmNhbmRpZGF0ZXMucHVzaChldmVudC5jYW5kaWRhdGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgaWNlR2F0aGVyZXIuYWRkRXZlbnRMaXN0ZW5lcignbG9jYWxjYW5kaWRhdGUnLFxuICAgICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyQ2FuZGlkYXRlcyk7XG4gICAgcmV0dXJuIGljZUdhdGhlcmVyO1xuICB9O1xuXG4gIC8vIHN0YXJ0IGdhdGhlcmluZyBmcm9tIGFuIFJUQ0ljZUdhdGhlcmVyLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2dhdGhlciA9IGZ1bmN0aW9uKG1pZCwgc2RwTUxpbmVJbmRleCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgaWNlR2F0aGVyZXIgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlcjtcbiAgICBpZiAoaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgY2FuZGlkYXRlcyA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmNhbmRpZGF0ZXM7XG4gICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uY2FuZGlkYXRlcyA9IG51bGw7XG4gICAgaWNlR2F0aGVyZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9jYWxjYW5kaWRhdGUnLFxuICAgICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyQ2FuZGlkYXRlcyk7XG4gICAgaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgaWYgKHNlbGYudXNpbmdCdW5kbGUgJiYgc2RwTUxpbmVJbmRleCA+IDApIHtcbiAgICAgICAgLy8gaWYgd2Uga25vdyB0aGF0IHdlIHVzZSBidW5kbGUgd2UgY2FuIGRyb3AgY2FuZGlkYXRlcyB3aXRoXG4gICAgICAgIC8vINGVZHBNTGluZUluZGV4ID4gMC4gSWYgd2UgZG9uJ3QgZG8gdGhpcyB0aGVuIG91ciBzdGF0ZSBnZXRzXG4gICAgICAgIC8vIGNvbmZ1c2VkIHNpbmNlIHdlIGRpc3Bvc2UgdGhlIGV4dHJhIGljZSBnYXRoZXJlci5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2VjYW5kaWRhdGUnKTtcbiAgICAgIGV2ZW50LmNhbmRpZGF0ZSA9IHtzZHBNaWQ6IG1pZCwgc2RwTUxpbmVJbmRleDogc2RwTUxpbmVJbmRleH07XG5cbiAgICAgIHZhciBjYW5kID0gZXZ0LmNhbmRpZGF0ZTtcbiAgICAgIC8vIEVkZ2UgZW1pdHMgYW4gZW1wdHkgb2JqZWN0IGZvciBSVENJY2VDYW5kaWRhdGVDb21wbGV0ZeKApVxuICAgICAgdmFyIGVuZCA9ICFjYW5kIHx8IE9iamVjdC5rZXlzKGNhbmQpLmxlbmd0aCA9PT0gMDtcbiAgICAgIGlmIChlbmQpIHtcbiAgICAgICAgLy8gcG9seWZpbGwgc2luY2UgUlRDSWNlR2F0aGVyZXIuc3RhdGUgaXMgbm90IGltcGxlbWVudGVkIGluXG4gICAgICAgIC8vIEVkZ2UgMTA1NDcgeWV0LlxuICAgICAgICBpZiAoaWNlR2F0aGVyZXIuc3RhdGUgPT09ICduZXcnIHx8IGljZUdhdGhlcmVyLnN0YXRlID09PSAnZ2F0aGVyaW5nJykge1xuICAgICAgICAgIGljZUdhdGhlcmVyLnN0YXRlID0gJ2NvbXBsZXRlZCc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICBpY2VHYXRoZXJlci5zdGF0ZSA9ICdnYXRoZXJpbmcnO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJUQ0ljZUNhbmRpZGF0ZSBkb2Vzbid0IGhhdmUgYSBjb21wb25lbnQsIG5lZWRzIHRvIGJlIGFkZGVkXG4gICAgICAgIGNhbmQuY29tcG9uZW50ID0gMTtcbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSA9IFNEUFV0aWxzLndyaXRlQ2FuZGlkYXRlKGNhbmQpO1xuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGUgbG9jYWwgZGVzY3JpcHRpb24uXG4gICAgICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKHNlbGYubG9jYWxEZXNjcmlwdGlvbi5zZHApO1xuICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgc2VjdGlvbnNbZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXggKyAxXSArPVxuICAgICAgICAgICAgJ2E9JyArIGV2ZW50LmNhbmRpZGF0ZS5jYW5kaWRhdGUgKyAnXFxyXFxuJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlY3Rpb25zW2V2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4ICsgMV0gKz1cbiAgICAgICAgICAgICdhPWVuZC1vZi1jYW5kaWRhdGVzXFxyXFxuJztcbiAgICAgIH1cbiAgICAgIHNlbGYubG9jYWxEZXNjcmlwdGlvbi5zZHAgPSBzZWN0aW9ucy5qb2luKCcnKTtcbiAgICAgIHZhciBjb21wbGV0ZSA9IHNlbGYudHJhbnNjZWl2ZXJzLmV2ZXJ5KGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2NlaXZlci5pY2VHYXRoZXJlciAmJlxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdjb21wbGV0ZWQnO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChzZWxmLmljZUdhdGhlcmluZ1N0YXRlICE9PSAnZ2F0aGVyaW5nJykge1xuICAgICAgICBzZWxmLmljZUdhdGhlcmluZ1N0YXRlID0gJ2dhdGhlcmluZyc7XG4gICAgICAgIHNlbGYuX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBFbWl0IGNhbmRpZGF0ZS4gQWxzbyBlbWl0IG51bGwgY2FuZGlkYXRlIHdoZW4gYWxsIGdhdGhlcmVycyBhcmVcbiAgICAgIC8vIGNvbXBsZXRlLlxuICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgc2VsZi5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxmLm9uaWNlY2FuZGlkYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgc2VsZi5vbmljZWNhbmRpZGF0ZShldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjb21wbGV0ZSkge1xuICAgICAgICBzZWxmLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpY2VjYW5kaWRhdGUnKSk7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZi5vbmljZWNhbmRpZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHNlbGYub25pY2VjYW5kaWRhdGUobmV3IEV2ZW50KCdpY2VjYW5kaWRhdGUnKSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5pY2VHYXRoZXJpbmdTdGF0ZSA9ICdjb21wbGV0ZSc7XG4gICAgICAgIHNlbGYuX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBlbWl0IGFscmVhZHkgZ2F0aGVyZWQgY2FuZGlkYXRlcy5cbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGNhbmRpZGF0ZXMuZm9yRWFjaChmdW5jdGlvbihjYW5kaWRhdGUpIHtcbiAgICAgICAgdmFyIGUgPSBuZXcgRXZlbnQoJ1JUQ0ljZUdhdGhlckV2ZW50Jyk7XG4gICAgICAgIGUuY2FuZGlkYXRlID0gY2FuZGlkYXRlO1xuICAgICAgICBpY2VHYXRoZXJlci5vbmxvY2FsY2FuZGlkYXRlKGUpO1xuICAgICAgfSk7XG4gICAgfSwgMCk7XG4gIH07XG5cbiAgLy8gQ3JlYXRlIElDRSB0cmFuc3BvcnQgYW5kIERUTFMgdHJhbnNwb3J0LlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2NyZWF0ZUljZUFuZER0bHNUcmFuc3BvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBpY2VUcmFuc3BvcnQgPSBuZXcgd2luZG93LlJUQ0ljZVRyYW5zcG9ydChudWxsKTtcbiAgICBpY2VUcmFuc3BvcnQub25pY2VzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5fdXBkYXRlQ29ubmVjdGlvblN0YXRlKCk7XG4gICAgfTtcblxuICAgIHZhciBkdGxzVHJhbnNwb3J0ID0gbmV3IHdpbmRvdy5SVENEdGxzVHJhbnNwb3J0KGljZVRyYW5zcG9ydCk7XG4gICAgZHRsc1RyYW5zcG9ydC5vbmR0bHNzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5fdXBkYXRlQ29ubmVjdGlvblN0YXRlKCk7XG4gICAgfTtcbiAgICBkdGxzVHJhbnNwb3J0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIG9uZXJyb3IgZG9lcyBub3Qgc2V0IHN0YXRlIHRvIGZhaWxlZCBieSBpdHNlbGYuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZHRsc1RyYW5zcG9ydCwgJ3N0YXRlJyxcbiAgICAgICAgICB7dmFsdWU6ICdmYWlsZWQnLCB3cml0YWJsZTogdHJ1ZX0pO1xuICAgICAgc2VsZi5fdXBkYXRlQ29ubmVjdGlvblN0YXRlKCk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBpY2VUcmFuc3BvcnQ6IGljZVRyYW5zcG9ydCxcbiAgICAgIGR0bHNUcmFuc3BvcnQ6IGR0bHNUcmFuc3BvcnRcbiAgICB9O1xuICB9O1xuXG4gIC8vIERlc3Ryb3kgSUNFIGdhdGhlcmVyLCBJQ0UgdHJhbnNwb3J0IGFuZCBEVExTIHRyYW5zcG9ydC5cbiAgLy8gV2l0aG91dCB0cmlnZ2VyaW5nIHRoZSBjYWxsYmFja3MuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fZGlzcG9zZUljZUFuZER0bHNUcmFuc3BvcnRzID0gZnVuY3Rpb24oXG4gICAgICBzZHBNTGluZUluZGV4KSB7XG4gICAgdmFyIGljZUdhdGhlcmVyID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXI7XG4gICAgaWYgKGljZUdhdGhlcmVyKSB7XG4gICAgICBkZWxldGUgaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZTtcbiAgICAgIGRlbGV0ZSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlcjtcbiAgICB9XG4gICAgdmFyIGljZVRyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZVRyYW5zcG9ydDtcbiAgICBpZiAoaWNlVHJhbnNwb3J0KSB7XG4gICAgICBkZWxldGUgaWNlVHJhbnNwb3J0Lm9uaWNlc3RhdGVjaGFuZ2U7XG4gICAgICBkZWxldGUgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlVHJhbnNwb3J0O1xuICAgIH1cbiAgICB2YXIgZHRsc1RyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmR0bHNUcmFuc3BvcnQ7XG4gICAgaWYgKGR0bHNUcmFuc3BvcnQpIHtcbiAgICAgIGRlbGV0ZSBkdGxzVHJhbnNwb3J0Lm9uZHRsc3N0YXRlY2hhbmdlO1xuICAgICAgZGVsZXRlIGR0bHNUcmFuc3BvcnQub25lcnJvcjtcbiAgICAgIGRlbGV0ZSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5kdGxzVHJhbnNwb3J0O1xuICAgIH1cbiAgfTtcblxuICAvLyBTdGFydCB0aGUgUlRQIFNlbmRlciBhbmQgUmVjZWl2ZXIgZm9yIGEgdHJhbnNjZWl2ZXIuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdHJhbnNjZWl2ZSA9IGZ1bmN0aW9uKHRyYW5zY2VpdmVyLFxuICAgICAgc2VuZCwgcmVjdikge1xuICAgIHZhciBwYXJhbXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXModHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMsXG4gICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyk7XG4gICAgaWYgKHNlbmQgJiYgdHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgICBwYXJhbXMuZW5jb2RpbmdzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgIHBhcmFtcy5ydGNwID0ge1xuICAgICAgICBjbmFtZTogU0RQVXRpbHMubG9jYWxDTmFtZSxcbiAgICAgICAgY29tcG91bmQ6IHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNvbXBvdW5kXG4gICAgICB9O1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBhcmFtcy5ydGNwLnNzcmMgPSB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmM7XG4gICAgICB9XG4gICAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIuc2VuZChwYXJhbXMpO1xuICAgIH1cbiAgICBpZiAocmVjdiAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciAmJiBwYXJhbXMuY29kZWNzLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIHJlbW92ZSBSVFggZmllbGQgaW4gRWRnZSAxNDk0MlxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbydcbiAgICAgICAgICAmJiB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzXG4gICAgICAgICAgJiYgZWRnZVZlcnNpb24gPCAxNTAxOSkge1xuICAgICAgICB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmZvckVhY2goZnVuY3Rpb24ocCkge1xuICAgICAgICAgIGRlbGV0ZSBwLnJ0eDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBwYXJhbXMuZW5jb2RpbmdzID0gdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgIHBhcmFtcy5ydGNwID0ge1xuICAgICAgICBjbmFtZTogdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY25hbWUsXG4gICAgICAgIGNvbXBvdW5kOiB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jb21wb3VuZFxuICAgICAgfTtcbiAgICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xuICAgICAgICBwYXJhbXMucnRjcC5zc3JjID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjO1xuICAgICAgfVxuICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIucmVjZWl2ZShwYXJhbXMpO1xuICAgIH1cbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgaWYgKCFpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlKCdzZXRMb2NhbERlc2NyaXB0aW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb24udHlwZSwgdGhpcy5zaWduYWxpbmdTdGF0ZSkpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoJ0NhbiBub3Qgc2V0IGxvY2FsICcgKyBkZXNjcmlwdGlvbi50eXBlICtcbiAgICAgICAgICAgICcgaW4gc3RhdGUgJyArIHNlbGYuc2lnbmFsaW5nU3RhdGUpO1xuICAgICAgICBlLm5hbWUgPSAnSW52YWxpZFN0YXRlRXJyb3InO1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAyICYmIHR5cGVvZiBhcmdzWzJdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgYXJnc1syXS5hcHBseShudWxsLCBbZV0pO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBzZWN0aW9ucztcbiAgICB2YXIgc2Vzc2lvbnBhcnQ7XG4gICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicpIHtcbiAgICAgIC8vIFZFUlkgbGltaXRlZCBzdXBwb3J0IGZvciBTRFAgbXVuZ2luZy4gTGltaXRlZCB0bzpcbiAgICAgIC8vICogY2hhbmdpbmcgdGhlIG9yZGVyIG9mIGNvZGVjc1xuICAgICAgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGRlc2NyaXB0aW9uLnNkcCk7XG4gICAgICBzZXNzaW9ucGFydCA9IHNlY3Rpb25zLnNoaWZ0KCk7XG4gICAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgICB2YXIgY2FwcyA9IFNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xuICAgICAgICBzZWxmLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5sb2NhbENhcGFiaWxpdGllcyA9IGNhcHM7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgICBzZWxmLl9nYXRoZXIodHJhbnNjZWl2ZXIubWlkLCBzZHBNTGluZUluZGV4KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ2Fuc3dlcicpIHtcbiAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhzZWxmLnJlbW90ZURlc2NyaXB0aW9uLnNkcCk7XG4gICAgICBzZXNzaW9ucGFydCA9IHNlY3Rpb25zLnNoaWZ0KCk7XG4gICAgICB2YXIgaXNJY2VMaXRlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXG4gICAgICAgICAgJ2E9aWNlLWxpdGUnKS5sZW5ndGggPiAwO1xuICAgICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgICAgdmFyIHRyYW5zY2VpdmVyID0gc2VsZi50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF07XG4gICAgICAgIHZhciBpY2VHYXRoZXJlciA9IHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyO1xuICAgICAgICB2YXIgaWNlVHJhbnNwb3J0ID0gdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0O1xuICAgICAgICB2YXIgZHRsc1RyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQ7XG4gICAgICAgIHZhciBsb2NhbENhcGFiaWxpdGllcyA9IHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzO1xuICAgICAgICB2YXIgcmVtb3RlQ2FwYWJpbGl0aWVzID0gdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzO1xuXG4gICAgICAgIC8vIHRyZWF0IGJ1bmRsZS1vbmx5IGFzIG5vdC1yZWplY3RlZC5cbiAgICAgICAgdmFyIHJlamVjdGVkID0gU0RQVXRpbHMuaXNSZWplY3RlZChtZWRpYVNlY3Rpb24pICYmXG4gICAgICAgICAgICAhU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1idW5kbGUtb25seScpLmxlbmd0aCA9PT0gMTtcblxuICAgICAgICBpZiAoIXJlamVjdGVkICYmICF0cmFuc2NlaXZlci5pc0RhdGFjaGFubmVsKSB7XG4gICAgICAgICAgdmFyIHJlbW90ZUljZVBhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXRJY2VQYXJhbWV0ZXJzKFxuICAgICAgICAgICAgICBtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KTtcbiAgICAgICAgICB2YXIgcmVtb3RlRHRsc1BhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXREdGxzUGFyYW1ldGVycyhcbiAgICAgICAgICAgICAgbWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCk7XG4gICAgICAgICAgaWYgKGlzSWNlTGl0ZSkge1xuICAgICAgICAgICAgcmVtb3RlRHRsc1BhcmFtZXRlcnMucm9sZSA9ICdzZXJ2ZXInO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghc2VsZi51c2luZ0J1bmRsZSB8fCBzZHBNTGluZUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBzZWxmLl9nYXRoZXIodHJhbnNjZWl2ZXIubWlkLCBzZHBNTGluZUluZGV4KTtcbiAgICAgICAgICAgIGlmIChpY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgICAgIGljZVRyYW5zcG9ydC5zdGFydChpY2VHYXRoZXJlciwgcmVtb3RlSWNlUGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAgIGlzSWNlTGl0ZSA/ICdjb250cm9sbGluZycgOiAnY29udHJvbGxlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGR0bHNUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgICAgIGR0bHNUcmFuc3BvcnQuc3RhcnQocmVtb3RlRHRsc1BhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENhbGN1bGF0ZSBpbnRlcnNlY3Rpb24gb2YgY2FwYWJpbGl0aWVzLlxuICAgICAgICAgIHZhciBwYXJhbXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXMobG9jYWxDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgICAgIHJlbW90ZUNhcGFiaWxpdGllcyk7XG5cbiAgICAgICAgICAvLyBTdGFydCB0aGUgUlRDUnRwU2VuZGVyLiBUaGUgUlRDUnRwUmVjZWl2ZXIgZm9yIHRoaXNcbiAgICAgICAgICAvLyB0cmFuc2NlaXZlciBoYXMgYWxyZWFkeSBiZWVuIHN0YXJ0ZWQgaW4gc2V0UmVtb3RlRGVzY3JpcHRpb24uXG4gICAgICAgICAgc2VsZi5fdHJhbnNjZWl2ZSh0cmFuc2NlaXZlcixcbiAgICAgICAgICAgICAgcGFyYW1zLmNvZGVjcy5sZW5ndGggPiAwLFxuICAgICAgICAgICAgICBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMubG9jYWxEZXNjcmlwdGlvbiA9IHtcbiAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXG4gICAgICBzZHA6IGRlc2NyaXB0aW9uLnNkcFxuICAgIH07XG4gICAgc3dpdGNoIChkZXNjcmlwdGlvbi50eXBlKSB7XG4gICAgICBjYXNlICdvZmZlcic6XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdoYXZlLWxvY2FsLW9mZmVyJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYW5zd2VyJzpcbiAgICAgICAgdGhpcy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ3N0YWJsZScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3Vuc3VwcG9ydGVkIHR5cGUgXCInICsgZGVzY3JpcHRpb24udHlwZSArXG4gICAgICAgICAgICAnXCInKTtcbiAgICB9XG5cbiAgICAvLyBJZiBhIHN1Y2Nlc3MgY2FsbGJhY2sgd2FzIHByb3ZpZGVkLCBlbWl0IElDRSBjYW5kaWRhdGVzIGFmdGVyIGl0XG4gICAgLy8gaGFzIGJlZW4gZXhlY3V0ZWQuIE90aGVyd2lzZSwgZW1pdCBjYWxsYmFjayBhZnRlciB0aGUgUHJvbWlzZSBpc1xuICAgIC8vIHJlc29sdmVkLlxuICAgIHZhciBjYiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHR5cGVvZiBhcmd1bWVudHNbMV0gPT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgYXJndW1lbnRzWzFdO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICBpZiAoY2IpIHtcbiAgICAgICAgY2IuYXBwbHkobnVsbCk7XG4gICAgICB9XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICBpZiAoIWlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUoJ3NldFJlbW90ZURlc2NyaXB0aW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb24udHlwZSwgdGhpcy5zaWduYWxpbmdTdGF0ZSkpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoJ0NhbiBub3Qgc2V0IHJlbW90ZSAnICsgZGVzY3JpcHRpb24udHlwZSArXG4gICAgICAgICAgICAnIGluIHN0YXRlICcgKyBzZWxmLnNpZ25hbGluZ1N0YXRlKTtcbiAgICAgICAgZS5uYW1lID0gJ0ludmFsaWRTdGF0ZUVycm9yJztcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gMiAmJiB0eXBlb2YgYXJnc1syXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGFyZ3NbMl0uYXBwbHkobnVsbCwgW2VdKTtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgc3RyZWFtcyA9IHt9O1xuICAgIHRoaXMucmVtb3RlU3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgc3RyZWFtc1tzdHJlYW0uaWRdID0gc3RyZWFtO1xuICAgIH0pO1xuICAgIHZhciByZWNlaXZlckxpc3QgPSBbXTtcbiAgICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGRlc2NyaXB0aW9uLnNkcCk7XG4gICAgdmFyIHNlc3Npb25wYXJ0ID0gc2VjdGlvbnMuc2hpZnQoKTtcbiAgICB2YXIgaXNJY2VMaXRlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXG4gICAgICAgICdhPWljZS1saXRlJykubGVuZ3RoID4gMDtcbiAgICB2YXIgdXNpbmdCdW5kbGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcbiAgICAgICAgJ2E9Z3JvdXA6QlVORExFICcpLmxlbmd0aCA+IDA7XG4gICAgdGhpcy51c2luZ0J1bmRsZSA9IHVzaW5nQnVuZGxlO1xuICAgIHZhciBpY2VPcHRpb25zID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXG4gICAgICAgICdhPWljZS1vcHRpb25zOicpWzBdO1xuICAgIGlmIChpY2VPcHRpb25zKSB7XG4gICAgICB0aGlzLmNhblRyaWNrbGVJY2VDYW5kaWRhdGVzID0gaWNlT3B0aW9ucy5zdWJzdHIoMTQpLnNwbGl0KCcgJylcbiAgICAgICAgICAuaW5kZXhPZigndHJpY2tsZScpID49IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICAgICAgdmFyIGtpbmQgPSBTRFBVdGlscy5nZXRLaW5kKG1lZGlhU2VjdGlvbik7XG4gICAgICAvLyB0cmVhdCBidW5kbGUtb25seSBhcyBub3QtcmVqZWN0ZWQuXG4gICAgICB2YXIgcmVqZWN0ZWQgPSBTRFBVdGlscy5pc1JlamVjdGVkKG1lZGlhU2VjdGlvbikgJiZcbiAgICAgICAgICAhU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1idW5kbGUtb25seScpLmxlbmd0aCA9PT0gMTtcbiAgICAgIHZhciBwcm90b2NvbCA9IGxpbmVzWzBdLnN1YnN0cigyKS5zcGxpdCgnICcpWzJdO1xuXG4gICAgICB2YXIgZGlyZWN0aW9uID0gU0RQVXRpbHMuZ2V0RGlyZWN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpO1xuICAgICAgdmFyIHJlbW90ZU1zaWQgPSBTRFBVdGlscy5wYXJzZU1zaWQobWVkaWFTZWN0aW9uKTtcblxuICAgICAgdmFyIG1pZCA9IFNEUFV0aWxzLmdldE1pZChtZWRpYVNlY3Rpb24pIHx8IFNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllcigpO1xuXG4gICAgICAvLyBSZWplY3QgZGF0YWNoYW5uZWxzIHdoaWNoIGFyZSBub3QgaW1wbGVtZW50ZWQgeWV0LlxuICAgICAgaWYgKGtpbmQgPT09ICdhcHBsaWNhdGlvbicgJiYgcHJvdG9jb2wgPT09ICdEVExTL1NDVFAnKSB7XG4gICAgICAgIHNlbGYudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdID0ge1xuICAgICAgICAgIG1pZDogbWlkLFxuICAgICAgICAgIGlzRGF0YWNoYW5uZWw6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdHJhbnNjZWl2ZXI7XG4gICAgICB2YXIgaWNlR2F0aGVyZXI7XG4gICAgICB2YXIgaWNlVHJhbnNwb3J0O1xuICAgICAgdmFyIGR0bHNUcmFuc3BvcnQ7XG4gICAgICB2YXIgcnRwUmVjZWl2ZXI7XG4gICAgICB2YXIgc2VuZEVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgIHZhciByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzO1xuXG4gICAgICB2YXIgdHJhY2s7XG4gICAgICAvLyBGSVhNRTogZW5zdXJlIHRoZSBtZWRpYVNlY3Rpb24gaGFzIHJ0Y3AtbXV4IHNldC5cbiAgICAgIHZhciByZW1vdGVDYXBhYmlsaXRpZXMgPSBTRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcbiAgICAgIHZhciByZW1vdGVJY2VQYXJhbWV0ZXJzO1xuICAgICAgdmFyIHJlbW90ZUR0bHNQYXJhbWV0ZXJzO1xuICAgICAgaWYgKCFyZWplY3RlZCkge1xuICAgICAgICByZW1vdGVJY2VQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0SWNlUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24sXG4gICAgICAgICAgICBzZXNzaW9ucGFydCk7XG4gICAgICAgIHJlbW90ZUR0bHNQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0RHRsc1BhcmFtZXRlcnMobWVkaWFTZWN0aW9uLFxuICAgICAgICAgICAgc2Vzc2lvbnBhcnQpO1xuICAgICAgICByZW1vdGVEdGxzUGFyYW1ldGVycy5yb2xlID0gJ2NsaWVudCc7XG4gICAgICB9XG4gICAgICByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzID1cbiAgICAgICAgICBTRFBVdGlscy5wYXJzZVJ0cEVuY29kaW5nUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xuXG4gICAgICB2YXIgcnRjcFBhcmFtZXRlcnMgPSBTRFBVdGlscy5wYXJzZVJ0Y3BQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XG5cbiAgICAgIHZhciBpc0NvbXBsZXRlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLFxuICAgICAgICAgICdhPWVuZC1vZi1jYW5kaWRhdGVzJywgc2Vzc2lvbnBhcnQpLmxlbmd0aCA+IDA7XG4gICAgICB2YXIgY2FuZHMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWNhbmRpZGF0ZTonKVxuICAgICAgICAgIC5tYXAoZnVuY3Rpb24oY2FuZCkge1xuICAgICAgICAgICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKGNhbmQpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjYW5kKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FuZC5jb21wb25lbnQgPT09IDE7XG4gICAgICAgICAgfSk7XG5cbiAgICAgIC8vIENoZWNrIGlmIHdlIGNhbiB1c2UgQlVORExFIGFuZCBkaXNwb3NlIHRyYW5zcG9ydHMuXG4gICAgICBpZiAoKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgfHwgZGVzY3JpcHRpb24udHlwZSA9PT0gJ2Fuc3dlcicpICYmXG4gICAgICAgICAgIXJlamVjdGVkICYmIHVzaW5nQnVuZGxlICYmIHNkcE1MaW5lSW5kZXggPiAwICYmXG4gICAgICAgICAgc2VsZi50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0pIHtcbiAgICAgICAgc2VsZi5fZGlzcG9zZUljZUFuZER0bHNUcmFuc3BvcnRzKHNkcE1MaW5lSW5kZXgpO1xuICAgICAgICBzZWxmLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlciA9XG4gICAgICAgICAgICBzZWxmLnRyYW5zY2VpdmVyc1swXS5pY2VHYXRoZXJlcjtcbiAgICAgICAgc2VsZi50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlVHJhbnNwb3J0ID1cbiAgICAgICAgICAgIHNlbGYudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydDtcbiAgICAgICAgc2VsZi50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uZHRsc1RyYW5zcG9ydCA9XG4gICAgICAgICAgICBzZWxmLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0O1xuICAgICAgICBpZiAoc2VsZi50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRwU2VuZGVyKSB7XG4gICAgICAgICAgc2VsZi50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRwU2VuZGVyLnNldFRyYW5zcG9ydChcbiAgICAgICAgICAgICAgc2VsZi50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFJlY2VpdmVyKSB7XG4gICAgICAgICAgc2VsZi50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRwUmVjZWl2ZXIuc2V0VHJhbnNwb3J0KFxuICAgICAgICAgICAgICBzZWxmLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgJiYgIXJlamVjdGVkKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyID0gc2VsZi50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0gfHxcbiAgICAgICAgICAgIHNlbGYuX2NyZWF0ZVRyYW5zY2VpdmVyKGtpbmQpO1xuICAgICAgICB0cmFuc2NlaXZlci5taWQgPSBtaWQ7XG5cbiAgICAgICAgaWYgKCF0cmFuc2NlaXZlci5pY2VHYXRoZXJlcikge1xuICAgICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyID0gc2VsZi5fY3JlYXRlSWNlR2F0aGVyZXIoc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICAgICAgdXNpbmdCdW5kbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbmRzLmxlbmd0aCAmJiB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgaWYgKGlzQ29tcGxldGUgJiYgKCF1c2luZ0J1bmRsZSB8fCBzZHBNTGluZUluZGV4ID09PSAwKSkge1xuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnNldFJlbW90ZUNhbmRpZGF0ZXMoY2FuZHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYW5kcy5mb3JFYWNoKGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICBtYXliZUFkZENhbmRpZGF0ZSh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQsIGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbENhcGFiaWxpdGllcyA9IHdpbmRvdy5SVENSdHBSZWNlaXZlci5nZXRDYXBhYmlsaXRpZXMoa2luZCk7XG5cbiAgICAgICAgLy8gZmlsdGVyIFJUWCB1bnRpbCBhZGRpdGlvbmFsIHN0dWZmIG5lZWRlZCBmb3IgUlRYIGlzIGltcGxlbWVudGVkXG4gICAgICAgIC8vIGluIGFkYXB0ZXIuanNcbiAgICAgICAgaWYgKGVkZ2VWZXJzaW9uIDwgMTUwMTkpIHtcbiAgICAgICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MgPSBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZmlsdGVyKFxuICAgICAgICAgICAgICBmdW5jdGlvbihjb2RlYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2RlYy5uYW1lICE9PSAncnR4JztcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyB8fCBbe1xuICAgICAgICAgIHNzcmM6ICgyICogc2RwTUxpbmVJbmRleCArIDIpICogMTAwMVxuICAgICAgICB9XTtcblxuICAgICAgICB2YXIgaXNOZXdUcmFjayA9IGZhbHNlO1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3NlbmRvbmx5Jykge1xuICAgICAgICAgIGlzTmV3VHJhY2sgPSAhdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XG4gICAgICAgICAgcnRwUmVjZWl2ZXIgPSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciB8fFxuICAgICAgICAgICAgICBuZXcgd2luZG93LlJUQ1J0cFJlY2VpdmVyKHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQsIGtpbmQpO1xuXG4gICAgICAgICAgaWYgKGlzTmV3VHJhY2spIHtcbiAgICAgICAgICAgIHZhciBzdHJlYW07XG4gICAgICAgICAgICB0cmFjayA9IHJ0cFJlY2VpdmVyLnRyYWNrO1xuICAgICAgICAgICAgLy8gRklYTUU6IGRvZXMgbm90IHdvcmsgd2l0aCBQbGFuIEIuXG4gICAgICAgICAgICBpZiAocmVtb3RlTXNpZCkge1xuICAgICAgICAgICAgICBpZiAoIXN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dKSB7XG4gICAgICAgICAgICAgICAgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dLCAnaWQnLCB7XG4gICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3RlTXNpZC5zdHJlYW07XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRyYWNrLCAnaWQnLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdGVNc2lkLnRyYWNrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHN0cmVhbSA9IHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCFzdHJlYW1zLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICBzdHJlYW1zLmRlZmF1bHQgPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc3RyZWFtID0gc3RyZWFtcy5kZWZhdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyZWFtLmFkZFRyYWNrKHRyYWNrKTtcbiAgICAgICAgICAgIHJlY2VpdmVyTGlzdC5wdXNoKFt0cmFjaywgcnRwUmVjZWl2ZXIsIHN0cmVhbV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzID0gbG9jYWxDYXBhYmlsaXRpZXM7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyA9IHJlbW90ZUNhcGFiaWxpdGllcztcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgPSBydHBSZWNlaXZlcjtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMgPSBydGNwUGFyYW1ldGVycztcbiAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMgPSByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xuXG4gICAgICAgIC8vIFN0YXJ0IHRoZSBSVENSdHBSZWNlaXZlciBub3cuIFRoZSBSVFBTZW5kZXIgaXMgc3RhcnRlZCBpblxuICAgICAgICAvLyBzZXRMb2NhbERlc2NyaXB0aW9uLlxuICAgICAgICBzZWxmLl90cmFuc2NlaXZlKHNlbGYudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICBpc05ld1RyYWNrKTtcbiAgICAgIH0gZWxzZSBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ2Fuc3dlcicgJiYgIXJlamVjdGVkKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyID0gc2VsZi50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF07XG4gICAgICAgIGljZUdhdGhlcmVyID0gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXI7XG4gICAgICAgIGljZVRyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydDtcbiAgICAgICAgZHRsc1RyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQ7XG4gICAgICAgIHJ0cFJlY2VpdmVyID0gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XG4gICAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgICBsb2NhbENhcGFiaWxpdGllcyA9IHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzO1xuXG4gICAgICAgIHNlbGYudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMgPVxuICAgICAgICAgICAgcmVjdkVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgICAgc2VsZi50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucmVtb3RlQ2FwYWJpbGl0aWVzID1cbiAgICAgICAgICAgIHJlbW90ZUNhcGFiaWxpdGllcztcbiAgICAgICAgc2VsZi50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRjcFBhcmFtZXRlcnMgPSBydGNwUGFyYW1ldGVycztcblxuICAgICAgICBpZiAoY2FuZHMubGVuZ3RoICYmIGljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICBpZiAoKGlzSWNlTGl0ZSB8fCBpc0NvbXBsZXRlKSAmJlxuICAgICAgICAgICAgICAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApKSB7XG4gICAgICAgICAgICBpY2VUcmFuc3BvcnQuc2V0UmVtb3RlQ2FuZGlkYXRlcyhjYW5kcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbmRzLmZvckVhY2goZnVuY3Rpb24oY2FuZGlkYXRlKSB7XG4gICAgICAgICAgICAgIG1heWJlQWRkQ2FuZGlkYXRlKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCwgY2FuZGlkYXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdXNpbmdCdW5kbGUgfHwgc2RwTUxpbmVJbmRleCA9PT0gMCkge1xuICAgICAgICAgIGlmIChpY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgICBpY2VUcmFuc3BvcnQuc3RhcnQoaWNlR2F0aGVyZXIsIHJlbW90ZUljZVBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgJ2NvbnRyb2xsaW5nJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkdGxzVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgICAgZHRsc1RyYW5zcG9ydC5zdGFydChyZW1vdGVEdGxzUGFyYW1ldGVycyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5fdHJhbnNjZWl2ZSh0cmFuc2NlaXZlcixcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdyZWN2b25seScsXG4gICAgICAgICAgICBkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAnc2VuZG9ubHknKTtcblxuICAgICAgICBpZiAocnRwUmVjZWl2ZXIgJiZcbiAgICAgICAgICAgIChkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAnc2VuZG9ubHknKSkge1xuICAgICAgICAgIHRyYWNrID0gcnRwUmVjZWl2ZXIudHJhY2s7XG4gICAgICAgICAgaWYgKHJlbW90ZU1zaWQpIHtcbiAgICAgICAgICAgIGlmICghc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0pIHtcbiAgICAgICAgICAgICAgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXS5hZGRUcmFjayh0cmFjayk7XG4gICAgICAgICAgICByZWNlaXZlckxpc3QucHVzaChbdHJhY2ssIHJ0cFJlY2VpdmVyLCBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXN0cmVhbXMuZGVmYXVsdCkge1xuICAgICAgICAgICAgICBzdHJlYW1zLmRlZmF1bHQgPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHJlYW1zLmRlZmF1bHQuYWRkVHJhY2sodHJhY2spO1xuICAgICAgICAgICAgcmVjZWl2ZXJMaXN0LnB1c2goW3RyYWNrLCBydHBSZWNlaXZlciwgc3RyZWFtcy5kZWZhdWx0XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEZJWE1FOiBhY3R1YWxseSB0aGUgcmVjZWl2ZXIgc2hvdWxkIGJlIGNyZWF0ZWQgbGF0ZXIuXG4gICAgICAgICAgZGVsZXRlIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5fZHRsc1JvbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fZHRsc1JvbGUgPSBkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInID8gJ2FjdGl2ZScgOiAncGFzc2l2ZSc7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdGVEZXNjcmlwdGlvbiA9IHtcbiAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXG4gICAgICBzZHA6IGRlc2NyaXB0aW9uLnNkcFxuICAgIH07XG4gICAgc3dpdGNoIChkZXNjcmlwdGlvbi50eXBlKSB7XG4gICAgICBjYXNlICdvZmZlcic6XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdoYXZlLXJlbW90ZS1vZmZlcicpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Fuc3dlcic6XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdzdGFibGUnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd1bnN1cHBvcnRlZCB0eXBlIFwiJyArIGRlc2NyaXB0aW9uLnR5cGUgK1xuICAgICAgICAgICAgJ1wiJyk7XG4gICAgfVxuICAgIE9iamVjdC5rZXlzKHN0cmVhbXMpLmZvckVhY2goZnVuY3Rpb24oc2lkKSB7XG4gICAgICB2YXIgc3RyZWFtID0gc3RyZWFtc1tzaWRdO1xuICAgICAgaWYgKHN0cmVhbS5nZXRUcmFja3MoKS5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHNlbGYucmVtb3RlU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XG4gICAgICAgICAgc2VsZi5yZW1vdGVTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2FkZHN0cmVhbScpO1xuICAgICAgICAgIGV2ZW50LnN0cmVhbSA9IHN0cmVhbTtcbiAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlbGYub25hZGRzdHJlYW0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgc2VsZi5vbmFkZHN0cmVhbShldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWNlaXZlckxpc3QuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgdmFyIHRyYWNrID0gaXRlbVswXTtcbiAgICAgICAgICB2YXIgcmVjZWl2ZXIgPSBpdGVtWzFdO1xuICAgICAgICAgIGlmIChzdHJlYW0uaWQgIT09IGl0ZW1bMl0uaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHRyYWNrRXZlbnQgPSBuZXcgRXZlbnQoJ3RyYWNrJyk7XG4gICAgICAgICAgdHJhY2tFdmVudC50cmFjayA9IHRyYWNrO1xuICAgICAgICAgIHRyYWNrRXZlbnQucmVjZWl2ZXIgPSByZWNlaXZlcjtcbiAgICAgICAgICB0cmFja0V2ZW50LnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiByZWNlaXZlcn07XG4gICAgICAgICAgdHJhY2tFdmVudC5zdHJlYW1zID0gW3N0cmVhbV07XG4gICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoRXZlbnQodHJhY2tFdmVudCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlbGYub250cmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBzZWxmLm9udHJhY2sodHJhY2tFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgd2hldGhlciBhZGRJY2VDYW5kaWRhdGUoe30pIHdhcyBjYWxsZWQgd2l0aGluIGZvdXIgc2Vjb25kcyBhZnRlclxuICAgIC8vIHNldFJlbW90ZURlc2NyaXB0aW9uLlxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCEoc2VsZiAmJiBzZWxmLnRyYW5zY2VpdmVycykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2VsZi50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuZ2V0UmVtb3RlQ2FuZGlkYXRlcygpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1RpbWVvdXQgZm9yIGFkZFJlbW90ZUNhbmRpZGF0ZS4gQ29uc2lkZXIgc2VuZGluZyAnICtcbiAgICAgICAgICAgICAgJ2FuIGVuZC1vZi1jYW5kaWRhdGVzIG5vdGlmaWNhdGlvbicpO1xuICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5hZGRSZW1vdGVDYW5kaWRhdGUoe30pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCA0MDAwKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICBpZiAoYXJncy5sZW5ndGggPiAxICYmIHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCk7XG4gICAgICB9XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgLyogbm90IHlldFxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmNsb3NlKCk7XG4gICAgICB9XG4gICAgICAqL1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCkge1xuICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RvcCgpO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5zdG9wKCk7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5zdG9wKCk7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIuc3RvcCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIEZJWE1FOiBjbGVhbiB1cCB0cmFja3MsIGxvY2FsIHN0cmVhbXMsIHJlbW90ZSBzdHJlYW1zLCBldGNcbiAgICB0aGlzLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnY2xvc2VkJyk7XG4gIH07XG5cbiAgLy8gVXBkYXRlIHRoZSBzaWduYWxpbmcgc3RhdGUuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdXBkYXRlU2lnbmFsaW5nU3RhdGUgPSBmdW5jdGlvbihuZXdTdGF0ZSkge1xuICAgIHRoaXMuc2lnbmFsaW5nU3RhdGUgPSBuZXdTdGF0ZTtcbiAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ3NpZ25hbGluZ3N0YXRlY2hhbmdlJyk7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICBpZiAodHlwZW9mIHRoaXMub25zaWduYWxpbmdzdGF0ZWNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5vbnNpZ25hbGluZ3N0YXRlY2hhbmdlKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgdG8gZmlyZSB0aGUgbmVnb3RpYXRpb25uZWVkZWQgZXZlbnQuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKHRoaXMuc2lnbmFsaW5nU3RhdGUgIT09ICdzdGFibGUnIHx8IHRoaXMubmVlZE5lZ290aWF0aW9uID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubmVlZE5lZ290aWF0aW9uID0gdHJ1ZTtcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGlmIChzZWxmLm5lZWROZWdvdGlhdGlvbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2VsZi5uZWVkTmVnb3RpYXRpb24gPSBmYWxzZTtcbiAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnKTtcbiAgICAgIHNlbGYuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICBpZiAodHlwZW9mIHNlbGYub25uZWdvdGlhdGlvbm5lZWRlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBzZWxmLm9ubmVnb3RpYXRpb25uZWVkZWQoZXZlbnQpO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9O1xuXG4gIC8vIFVwZGF0ZSB0aGUgY29ubmVjdGlvbiBzdGF0ZS5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl91cGRhdGVDb25uZWN0aW9uU3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmV3U3RhdGU7XG4gICAgdmFyIHN0YXRlcyA9IHtcbiAgICAgICduZXcnOiAwLFxuICAgICAgY2xvc2VkOiAwLFxuICAgICAgY29ubmVjdGluZzogMCxcbiAgICAgIGNoZWNraW5nOiAwLFxuICAgICAgY29ubmVjdGVkOiAwLFxuICAgICAgY29tcGxldGVkOiAwLFxuICAgICAgZGlzY29ubmVjdGVkOiAwLFxuICAgICAgZmFpbGVkOiAwXG4gICAgfTtcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICBzdGF0ZXNbdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0YXRlXSsrO1xuICAgICAgc3RhdGVzW3RyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuc3RhdGVdKys7XG4gICAgfSk7XG4gICAgLy8gSUNFVHJhbnNwb3J0LmNvbXBsZXRlZCBhbmQgY29ubmVjdGVkIGFyZSB0aGUgc2FtZSBmb3IgdGhpcyBwdXJwb3NlLlxuICAgIHN0YXRlcy5jb25uZWN0ZWQgKz0gc3RhdGVzLmNvbXBsZXRlZDtcblxuICAgIG5ld1N0YXRlID0gJ25ldyc7XG4gICAgaWYgKHN0YXRlcy5mYWlsZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdmYWlsZWQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbm5lY3RpbmcgPiAwIHx8IHN0YXRlcy5jaGVja2luZyA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2Nvbm5lY3RpbmcnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmRpc2Nvbm5lY3RlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2Rpc2Nvbm5lY3RlZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMubmV3ID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnbmV3JztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb25uZWN0ZWQgPiAwIHx8IHN0YXRlcy5jb21wbGV0ZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdjb25uZWN0ZWQnO1xuICAgIH1cblxuICAgIGlmIChuZXdTdGF0ZSAhPT0gdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUpIHtcbiAgICAgIHRoaXMuaWNlQ29ubmVjdGlvblN0YXRlID0gbmV3U3RhdGU7XG4gICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2ljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZScpO1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZU9mZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgdmFyIG9mZmVyT3B0aW9ucztcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvZmZlck9wdGlvbnMgPSBhcmd1bWVudHNbMF07XG4gICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICBvZmZlck9wdGlvbnMgPSBhcmd1bWVudHNbMl07XG4gICAgfVxuXG4gICAgdmFyIG51bUF1ZGlvVHJhY2tzID0gdGhpcy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiB0LmtpbmQgPT09ICdhdWRpbyc7XG4gICAgfSkubGVuZ3RoO1xuICAgIHZhciBudW1WaWRlb1RyYWNrcyA9IHRoaXMudHJhbnNjZWl2ZXJzLmZpbHRlcihmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gdC5raW5kID09PSAndmlkZW8nO1xuICAgIH0pLmxlbmd0aDtcblxuICAgIC8vIERldGVybWluZSBudW1iZXIgb2YgYXVkaW8gYW5kIHZpZGVvIHRyYWNrcyB3ZSBuZWVkIHRvIHNlbmQvcmVjdi5cbiAgICBpZiAob2ZmZXJPcHRpb25zKSB7XG4gICAgICAvLyBSZWplY3QgQ2hyb21lIGxlZ2FjeSBjb25zdHJhaW50cy5cbiAgICAgIGlmIChvZmZlck9wdGlvbnMubWFuZGF0b3J5IHx8IG9mZmVyT3B0aW9ucy5vcHRpb25hbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0xlZ2FjeSBtYW5kYXRvcnkvb3B0aW9uYWwgY29uc3RyYWludHMgbm90IHN1cHBvcnRlZC4nKTtcbiAgICAgIH1cbiAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG51bUF1ZGlvVHJhY2tzID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBudW1BdWRpb1RyYWNrcyA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbnVtQXVkaW9UcmFja3MgPSBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSB0cnVlKSB7XG4gICAgICAgICAgbnVtVmlkZW9UcmFja3MgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSBmYWxzZSkge1xuICAgICAgICAgIG51bVZpZGVvVHJhY2tzID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBudW1WaWRlb1RyYWNrcyA9IG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgbnVtQXVkaW9UcmFja3MtLTtcbiAgICAgICAgaWYgKG51bUF1ZGlvVHJhY2tzIDwgMCkge1xuICAgICAgICAgIHRyYW5zY2VpdmVyLndhbnRSZWNlaXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xuICAgICAgICBudW1WaWRlb1RyYWNrcy0tO1xuICAgICAgICBpZiAobnVtVmlkZW9UcmFja3MgPCAwKSB7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIud2FudFJlY2VpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIE0tbGluZXMgZm9yIHJlY3Zvbmx5IHN0cmVhbXMuXG4gICAgd2hpbGUgKG51bUF1ZGlvVHJhY2tzID4gMCB8fCBudW1WaWRlb1RyYWNrcyA+IDApIHtcbiAgICAgIGlmIChudW1BdWRpb1RyYWNrcyA+IDApIHtcbiAgICAgICAgdGhpcy5fY3JlYXRlVHJhbnNjZWl2ZXIoJ2F1ZGlvJyk7XG4gICAgICAgIG51bUF1ZGlvVHJhY2tzLS07XG4gICAgICB9XG4gICAgICBpZiAobnVtVmlkZW9UcmFja3MgPiAwKSB7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVRyYW5zY2VpdmVyKCd2aWRlbycpO1xuICAgICAgICBudW1WaWRlb1RyYWNrcy0tO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZSh0aGlzLl9zZHBTZXNzaW9uSWQsXG4gICAgICAgIHRoaXMuX3NkcFNlc3Npb25WZXJzaW9uKyspO1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgIC8vIEZvciBlYWNoIHRyYWNrLCBjcmVhdGUgYW4gaWNlIGdhdGhlcmVyLCBpY2UgdHJhbnNwb3J0LFxuICAgICAgLy8gZHRscyB0cmFuc3BvcnQsIHBvdGVudGlhbGx5IHJ0cHNlbmRlciBhbmQgcnRwcmVjZWl2ZXIuXG4gICAgICB2YXIgdHJhY2sgPSB0cmFuc2NlaXZlci50cmFjaztcbiAgICAgIHZhciBraW5kID0gdHJhbnNjZWl2ZXIua2luZDtcbiAgICAgIHZhciBtaWQgPSBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcbiAgICAgIHRyYW5zY2VpdmVyLm1pZCA9IG1pZDtcblxuICAgICAgaWYgKCF0cmFuc2NlaXZlci5pY2VHYXRoZXJlcikge1xuICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlciA9IHNlbGYuX2NyZWF0ZUljZUdhdGhlcmVyKHNkcE1MaW5lSW5kZXgsXG4gICAgICAgICAgICBzZWxmLnVzaW5nQnVuZGxlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzID0gd2luZG93LlJUQ1J0cFNlbmRlci5nZXRDYXBhYmlsaXRpZXMoa2luZCk7XG4gICAgICAvLyBmaWx0ZXIgUlRYIHVudGlsIGFkZGl0aW9uYWwgc3R1ZmYgbmVlZGVkIGZvciBSVFggaXMgaW1wbGVtZW50ZWRcbiAgICAgIC8vIGluIGFkYXB0ZXIuanNcbiAgICAgIGlmIChlZGdlVmVyc2lvbiA8IDE1MDE5KSB7XG4gICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcyA9IGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5maWx0ZXIoXG4gICAgICAgICAgICBmdW5jdGlvbihjb2RlYykge1xuICAgICAgICAgICAgICByZXR1cm4gY29kZWMubmFtZSAhPT0gJ3J0eCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgICAgIC8vIHdvcmsgYXJvdW5kIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD02NTUyXG4gICAgICAgIC8vIGJ5IGFkZGluZyBsZXZlbC1hc3ltbWV0cnktYWxsb3dlZD0xXG4gICAgICAgIGlmIChjb2RlYy5uYW1lID09PSAnSDI2NCcgJiZcbiAgICAgICAgICAgIGNvZGVjLnBhcmFtZXRlcnNbJ2xldmVsLWFzeW1tZXRyeS1hbGxvd2VkJ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvZGVjLnBhcmFtZXRlcnNbJ2xldmVsLWFzeW1tZXRyeS1hbGxvd2VkJ10gPSAnMSc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBnZW5lcmF0ZSBhbiBzc3JjIG5vdywgdG8gYmUgdXNlZCBsYXRlciBpbiBydHBTZW5kZXIuc2VuZFxuICAgICAgdmFyIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzIHx8IFt7XG4gICAgICAgIHNzcmM6ICgyICogc2RwTUxpbmVJbmRleCArIDEpICogMTAwMVxuICAgICAgfV07XG4gICAgICBpZiAodHJhY2spIHtcbiAgICAgICAgLy8gYWRkIFJUWFxuICAgICAgICBpZiAoZWRnZVZlcnNpb24gPj0gMTUwMTkgJiYga2luZCA9PT0gJ3ZpZGVvJyAmJlxuICAgICAgICAgICAgIXNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHggPSB7XG4gICAgICAgICAgICBzc3JjOiBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAxXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHJhbnNjZWl2ZXIud2FudFJlY2VpdmUpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgPSBuZXcgd2luZG93LlJUQ1J0cFJlY2VpdmVyKFxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCwga2luZCk7XG4gICAgICB9XG5cbiAgICAgIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzID0gbG9jYWxDYXBhYmlsaXRpZXM7XG4gICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gc2VuZEVuY29kaW5nUGFyYW1ldGVycztcbiAgICB9KTtcblxuICAgIC8vIGFsd2F5cyBvZmZlciBCVU5ETEUgYW5kIGRpc3Bvc2Ugb24gcmV0dXJuIGlmIG5vdCBzdXBwb3J0ZWQuXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5idW5kbGVQb2xpY3kgIT09ICdtYXgtY29tcGF0Jykge1xuICAgICAgc2RwICs9ICdhPWdyb3VwOkJVTkRMRSAnICsgdGhpcy50cmFuc2NlaXZlcnMubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHQubWlkO1xuICAgICAgfSkuam9pbignICcpICsgJ1xcclxcbic7XG4gICAgfVxuICAgIHNkcCArPSAnYT1pY2Utb3B0aW9uczp0cmlja2xlXFxyXFxuJztcblxuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgIHNkcCArPSB3cml0ZU1lZGlhU2VjdGlvbih0cmFuc2NlaXZlciwgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgJ29mZmVyJywgdHJhbnNjZWl2ZXIuc3RyZWFtLCBzZWxmLl9kdGxzUm9sZSk7XG4gICAgICBzZHAgKz0gJ2E9cnRjcC1yc2l6ZVxcclxcbic7XG5cbiAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VHYXRoZXJlciAmJiBzZWxmLmljZUdhdGhlcmluZ1N0YXRlICE9PSAnbmV3JyAmJlxuICAgICAgICAgIChzZHBNTGluZUluZGV4ID09PSAwIHx8ICFzZWxmLnVzaW5nQnVuZGxlKSkge1xuICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbENhbmRpZGF0ZXMoKS5mb3JFYWNoKGZ1bmN0aW9uKGNhbmQpIHtcbiAgICAgICAgICBjYW5kLmNvbXBvbmVudCA9IDE7XG4gICAgICAgICAgc2RwICs9ICdhPScgKyBTRFBVdGlscy53cml0ZUNhbmRpZGF0ZShjYW5kKSArICdcXHJcXG4nO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdjb21wbGV0ZWQnKSB7XG4gICAgICAgICAgc2RwICs9ICdhPWVuZC1vZi1jYW5kaWRhdGVzXFxyXFxuJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGRlc2MgPSBuZXcgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XG4gICAgICB0eXBlOiAnb2ZmZXInLFxuICAgICAgc2RwOiBzZHBcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gMCAmJiB0eXBlb2YgYXJnc1swXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBhcmdzWzBdLmFwcGx5KG51bGwsIFtkZXNjXSk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShkZXNjKTtcbiAgICB9KTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlQW5zd2VyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlKHRoaXMuX3NkcFNlc3Npb25JZCxcbiAgICAgICAgdGhpcy5fc2RwU2Vzc2lvblZlcnNpb24rKyk7XG4gICAgaWYgKHRoaXMudXNpbmdCdW5kbGUpIHtcbiAgICAgIHNkcCArPSAnYT1ncm91cDpCVU5ETEUgJyArIHRoaXMudHJhbnNjZWl2ZXJzLm1hcChmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiB0Lm1pZDtcbiAgICAgIH0pLmpvaW4oJyAnKSArICdcXHJcXG4nO1xuICAgIH1cbiAgICB2YXIgbWVkaWFTZWN0aW9uc0luT2ZmZXIgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKFxuICAgICAgICB0aGlzLnJlbW90ZURlc2NyaXB0aW9uLnNkcCkubGVuZ3RoIC0gMTtcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICBpZiAoc2RwTUxpbmVJbmRleCArIDEgPiBtZWRpYVNlY3Rpb25zSW5PZmZlcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIuaXNEYXRhY2hhbm5lbCkge1xuICAgICAgICBzZHAgKz0gJ209YXBwbGljYXRpb24gMCBEVExTL1NDVFAgNTAwMFxcclxcbicgK1xuICAgICAgICAgICAgJ2M9SU4gSVA0IDAuMC4wLjBcXHJcXG4nICtcbiAgICAgICAgICAgICdhPW1pZDonICsgdHJhbnNjZWl2ZXIubWlkICsgJ1xcclxcbic7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gRklYTUU6IGxvb2sgYXQgZGlyZWN0aW9uLlxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnN0cmVhbSkge1xuICAgICAgICB2YXIgbG9jYWxUcmFjaztcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICBsb2NhbFRyYWNrID0gdHJhbnNjZWl2ZXIuc3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF07XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgIGxvY2FsVHJhY2sgPSB0cmFuc2NlaXZlci5zdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobG9jYWxUcmFjaykge1xuICAgICAgICAgIC8vIGFkZCBSVFhcbiAgICAgICAgICBpZiAoZWRnZVZlcnNpb24gPj0gMTUwMTkgJiYgdHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJyAmJlxuICAgICAgICAgICAgICAhdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4ID0ge1xuICAgICAgICAgICAgICBzc3JjOiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAxXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDYWxjdWxhdGUgaW50ZXJzZWN0aW9uIG9mIGNhcGFiaWxpdGllcy5cbiAgICAgIHZhciBjb21tb25DYXBhYmlsaXRpZXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXMoXG4gICAgICAgICAgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzKTtcblxuICAgICAgdmFyIGhhc1J0eCA9IGNvbW1vbkNhcGFiaWxpdGllcy5jb2RlY3MuZmlsdGVyKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgcmV0dXJuIGMubmFtZS50b0xvd2VyQ2FzZSgpID09PSAncnR4JztcbiAgICAgIH0pLmxlbmd0aDtcbiAgICAgIGlmICghaGFzUnR4ICYmIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgICAgIGRlbGV0ZSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eDtcbiAgICAgIH1cblxuICAgICAgc2RwICs9IHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCBjb21tb25DYXBhYmlsaXRpZXMsXG4gICAgICAgICAgJ2Fuc3dlcicsIHRyYW5zY2VpdmVyLnN0cmVhbSwgc2VsZi5fZHRsc1JvbGUpO1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzICYmXG4gICAgICAgICAgdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMucmVkdWNlZFNpemUpIHtcbiAgICAgICAgc2RwICs9ICdhPXJ0Y3AtcnNpemVcXHJcXG4nO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGRlc2MgPSBuZXcgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XG4gICAgICB0eXBlOiAnYW5zd2VyJyxcbiAgICAgIHNkcDogc2RwXG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgIGlmIChhcmdzLmxlbmd0aCA+IDAgJiYgdHlwZW9mIGFyZ3NbMF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgYXJnc1swXS5hcHBseShudWxsLCBbZGVzY10pO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoZGVzYyk7XG4gICAgfSk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xuICAgIHZhciBlcnI7XG4gICAgdmFyIHNlY3Rpb25zO1xuICAgIGlmICghY2FuZGlkYXRlIHx8IGNhbmRpZGF0ZS5jYW5kaWRhdGUgPT09ICcnKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmICh0aGlzLnRyYW5zY2VpdmVyc1tqXS5pc0RhdGFjaGFubmVsKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmFuc2NlaXZlcnNbal0uaWNlVHJhbnNwb3J0LmFkZFJlbW90ZUNhbmRpZGF0ZSh7fSk7XG4gICAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyh0aGlzLnJlbW90ZURlc2NyaXB0aW9uLnNkcCk7XG4gICAgICAgIHNlY3Rpb25zW2ogKyAxXSArPSAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XG4gICAgICAgIHRoaXMucmVtb3RlRGVzY3JpcHRpb24uc2RwID0gc2VjdGlvbnMuam9pbignJyk7XG4gICAgICAgIGlmICh0aGlzLnVzaW5nQnVuZGxlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEoY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXggIT09IHVuZGVmaW5lZCB8fCBjYW5kaWRhdGUuc2RwTWlkKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2RwTUxpbmVJbmRleCBvciBzZHBNaWQgcmVxdWlyZWQnKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnJlbW90ZURlc2NyaXB0aW9uKSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoJ0NhbiBub3QgYWRkIElDRSBjYW5kaWRhdGUgd2l0aG91dCAnICtcbiAgICAgICAgICAnYSByZW1vdGUgZGVzY3JpcHRpb24nKTtcbiAgICAgIGVyci5uYW1lID0gJ0ludmFsaWRTdGF0ZUVycm9yJztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHNkcE1MaW5lSW5kZXggPSBjYW5kaWRhdGUuc2RwTUxpbmVJbmRleDtcbiAgICAgIGlmIChjYW5kaWRhdGUuc2RwTWlkKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50cmFuc2NlaXZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy50cmFuc2NlaXZlcnNbaV0ubWlkID09PSBjYW5kaWRhdGUuc2RwTWlkKSB7XG4gICAgICAgICAgICBzZHBNTGluZUluZGV4ID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIHRyYW5zY2VpdmVyID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF07XG4gICAgICBpZiAodHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmlzRGF0YWNoYW5uZWwpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbmQgPSBPYmplY3Qua2V5cyhjYW5kaWRhdGUuY2FuZGlkYXRlKS5sZW5ndGggPiAwID9cbiAgICAgICAgICAgIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKGNhbmRpZGF0ZS5jYW5kaWRhdGUpIDoge307XG4gICAgICAgIC8vIElnbm9yZSBDaHJvbWUncyBpbnZhbGlkIGNhbmRpZGF0ZXMgc2luY2UgRWRnZSBkb2VzIG5vdCBsaWtlIHRoZW0uXG4gICAgICAgIGlmIChjYW5kLnByb3RvY29sID09PSAndGNwJyAmJiAoY2FuZC5wb3J0ID09PSAwIHx8IGNhbmQucG9ydCA9PT0gOSkpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWdub3JlIFJUQ1AgY2FuZGlkYXRlcywgd2UgYXNzdW1lIFJUQ1AtTVVYLlxuICAgICAgICBpZiAoY2FuZC5jb21wb25lbnQgJiYgY2FuZC5jb21wb25lbnQgIT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gd2hlbiB1c2luZyBidW5kbGUsIGF2b2lkIGFkZGluZyBjYW5kaWRhdGVzIHRvIHRoZSB3cm9uZ1xuICAgICAgICAvLyBpY2UgdHJhbnNwb3J0LiBBbmQgYXZvaWQgYWRkaW5nIGNhbmRpZGF0ZXMgYWRkZWQgaW4gdGhlIFNEUC5cbiAgICAgICAgaWYgKHNkcE1MaW5lSW5kZXggPT09IDAgfHwgKHNkcE1MaW5lSW5kZXggPiAwICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgIT09IHRoaXMudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydCkpIHtcbiAgICAgICAgICBpZiAoIW1heWJlQWRkQ2FuZGlkYXRlKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCwgY2FuZCkpIHtcbiAgICAgICAgICAgIGVyciA9IG5ldyBFcnJvcignQ2FuIG5vdCBhZGQgSUNFIGNhbmRpZGF0ZScpO1xuICAgICAgICAgICAgZXJyLm5hbWUgPSAnT3BlcmF0aW9uRXJyb3InO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSByZW1vdGVEZXNjcmlwdGlvbi5cbiAgICAgICAgICB2YXIgY2FuZGlkYXRlU3RyaW5nID0gY2FuZGlkYXRlLmNhbmRpZGF0ZS50cmltKCk7XG4gICAgICAgICAgaWYgKGNhbmRpZGF0ZVN0cmluZy5pbmRleE9mKCdhPScpID09PSAwKSB7XG4gICAgICAgICAgICBjYW5kaWRhdGVTdHJpbmcgPSBjYW5kaWRhdGVTdHJpbmcuc3Vic3RyKDIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnModGhpcy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApO1xuICAgICAgICAgIHNlY3Rpb25zW3NkcE1MaW5lSW5kZXggKyAxXSArPSAnYT0nICtcbiAgICAgICAgICAgICAgKGNhbmQudHlwZSA/IGNhbmRpZGF0ZVN0cmluZyA6ICdlbmQtb2YtY2FuZGlkYXRlcycpXG4gICAgICAgICAgICAgICsgJ1xcclxcbic7XG4gICAgICAgICAgdGhpcy5yZW1vdGVEZXNjcmlwdGlvbi5zZHAgPSBzZWN0aW9ucy5qb2luKCcnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyID0gbmV3IEVycm9yKCdDYW4gbm90IGFkZCBJQ0UgY2FuZGlkYXRlJyk7XG4gICAgICAgIGVyci5uYW1lID0gJ09wZXJhdGlvbkVycm9yJztcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAyICYmIHR5cGVvZiBhcmdzWzJdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgYXJnc1syXS5hcHBseShudWxsLCBbZXJyXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAxICYmIHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHByb21pc2VzID0gW107XG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgWydydHBTZW5kZXInLCAncnRwUmVjZWl2ZXInLCAnaWNlR2F0aGVyZXInLCAnaWNlVHJhbnNwb3J0JyxcbiAgICAgICAgICAnZHRsc1RyYW5zcG9ydCddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICBpZiAodHJhbnNjZWl2ZXJbbWV0aG9kXSkge1xuICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRyYW5zY2VpdmVyW21ldGhvZF0uZ2V0U3RhdHMoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmFyIGNiID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICBhcmd1bWVudHNbMV07XG4gICAgdmFyIGZpeFN0YXRzVHlwZSA9IGZ1bmN0aW9uKHN0YXQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluYm91bmRydHA6ICdpbmJvdW5kLXJ0cCcsXG4gICAgICAgIG91dGJvdW5kcnRwOiAnb3V0Ym91bmQtcnRwJyxcbiAgICAgICAgY2FuZGlkYXRlcGFpcjogJ2NhbmRpZGF0ZS1wYWlyJyxcbiAgICAgICAgbG9jYWxjYW5kaWRhdGU6ICdsb2NhbC1jYW5kaWRhdGUnLFxuICAgICAgICByZW1vdGVjYW5kaWRhdGU6ICdyZW1vdGUtY2FuZGlkYXRlJ1xuICAgICAgfVtzdGF0LnR5cGVdIHx8IHN0YXQudHlwZTtcbiAgICB9O1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAvLyBzaGltIGdldFN0YXRzIHdpdGggbWFwbGlrZSBzdXBwb3J0XG4gICAgICB2YXIgcmVzdWx0cyA9IG5ldyBNYXAoKTtcbiAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICByZXMuZm9yRWFjaChmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyhyZXN1bHQpLmZvckVhY2goZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHJlc3VsdFtpZF0udHlwZSA9IGZpeFN0YXRzVHlwZShyZXN1bHRbaWRdKTtcbiAgICAgICAgICAgIHJlc3VsdHMuc2V0KGlkLCByZXN1bHRbaWRdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgIGNiLmFwcGx5KG51bGwsIHJlc3VsdHMpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzdWx0cyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIFJUQ1BlZXJDb25uZWN0aW9uO1xufTtcbiJdfQ==
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\rtcpeerconnection-shim\\rtcpeerconnection.js","/..\\node_modules\\rtcpeerconnection-shim")
},{"2ionoC":3,"buffer":2,"sdp":6}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* eslint-env node */
'use strict';

// SDP helpers.

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var SDPUtils = {};

// Generate an alphanumeric identifier for cname or mids.
// TODO: use UUIDs instead? https://gist.github.com/jed/982883
SDPUtils.generateIdentifier = function () {
  return Math.random().toString(36).substr(2, 10);
};

// The RTCP CNAME used by all peerconnections from the same JS.
SDPUtils.localCName = SDPUtils.generateIdentifier();

// Splits SDP into lines, dealing with both CRLF and LF.
SDPUtils.splitLines = function (blob) {
  return blob.trim().split('\n').map(function (line) {
    return line.trim();
  });
};
// Splits SDP into sessionpart and mediasections. Ensures CRLF.
SDPUtils.splitSections = function (blob) {
  var parts = blob.split('\nm=');
  return parts.map(function (part, index) {
    return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
  });
};

// Returns lines that start with a certain prefix.
SDPUtils.matchPrefix = function (blob, prefix) {
  return SDPUtils.splitLines(blob).filter(function (line) {
    return line.indexOf(prefix) === 0;
  });
};

// Parses an ICE candidate line. Sample input:
// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
// rport 55996"
SDPUtils.parseCandidate = function (line) {
  var parts;
  // Parse both variants.
  if (line.indexOf('a=candidate:') === 0) {
    parts = line.substring(12).split(' ');
  } else {
    parts = line.substring(10).split(' ');
  }

  var candidate = {
    foundation: parts[0],
    component: parseInt(parts[1], 10),
    protocol: parts[2].toLowerCase(),
    priority: parseInt(parts[3], 10),
    ip: parts[4],
    port: parseInt(parts[5], 10),
    // skip parts[6] == 'typ'
    type: parts[7]
  };

  for (var i = 8; i < parts.length; i += 2) {
    switch (parts[i]) {
      case 'raddr':
        candidate.relatedAddress = parts[i + 1];
        break;
      case 'rport':
        candidate.relatedPort = parseInt(parts[i + 1], 10);
        break;
      case 'tcptype':
        candidate.tcpType = parts[i + 1];
        break;
      case 'ufrag':
        candidate.ufrag = parts[i + 1]; // for backward compability.
        candidate.usernameFragment = parts[i + 1];
        break;
      default:
        // extension handling, in particular ufrag
        candidate[parts[i]] = parts[i + 1];
        break;
    }
  }
  return candidate;
};

// Translates a candidate object into SDP candidate attribute.
SDPUtils.writeCandidate = function (candidate) {
  var sdp = [];
  sdp.push(candidate.foundation);
  sdp.push(candidate.component);
  sdp.push(candidate.protocol.toUpperCase());
  sdp.push(candidate.priority);
  sdp.push(candidate.ip);
  sdp.push(candidate.port);

  var type = candidate.type;
  sdp.push('typ');
  sdp.push(type);
  if (type !== 'host' && candidate.relatedAddress && candidate.relatedPort) {
    sdp.push('raddr');
    sdp.push(candidate.relatedAddress); // was: relAddr
    sdp.push('rport');
    sdp.push(candidate.relatedPort); // was: relPort
  }
  if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
    sdp.push('tcptype');
    sdp.push(candidate.tcpType);
  }
  if (candidate.ufrag) {
    sdp.push('ufrag');
    sdp.push(candidate.ufrag);
  }
  return 'candidate:' + sdp.join(' ');
};

// Parses an ice-options line, returns an array of option tags.
// a=ice-options:foo bar
SDPUtils.parseIceOptions = function (line) {
  return line.substr(14).split(' ');
};

// Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
// a=rtpmap:111 opus/48000/2
SDPUtils.parseRtpMap = function (line) {
  var parts = line.substr(9).split(' ');
  var parsed = {
    payloadType: parseInt(parts.shift(), 10) // was: id
  };

  parts = parts[0].split('/');

  parsed.name = parts[0];
  parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
  // was: channels
  parsed.numChannels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
  return parsed;
};

// Generate an a=rtpmap line from RTCRtpCodecCapability or
// RTCRtpCodecParameters.
SDPUtils.writeRtpMap = function (codec) {
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate + (codec.numChannels !== 1 ? '/' + codec.numChannels : '') + '\r\n';
};

// Parses an a=extmap line (headerextension from RFC 5285). Sample input:
// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
SDPUtils.parseExtmap = function (line) {
  var parts = line.substr(9).split(' ');
  return {
    id: parseInt(parts[0], 10),
    direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
    uri: parts[1]
  };
};

// Generates a=extmap line from RTCRtpHeaderExtensionParameters or
// RTCRtpHeaderExtension.
SDPUtils.writeExtmap = function (headerExtension) {
  return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) + (headerExtension.direction && headerExtension.direction !== 'sendrecv' ? '/' + headerExtension.direction : '') + ' ' + headerExtension.uri + '\r\n';
};

// Parses an ftmp line, returns dictionary. Sample input:
// a=fmtp:96 vbr=on;cng=on
// Also deals with vbr=on; cng=on
SDPUtils.parseFmtp = function (line) {
  var parsed = {};
  var kv;
  var parts = line.substr(line.indexOf(' ') + 1).split(';');
  for (var j = 0; j < parts.length; j++) {
    kv = parts[j].trim().split('=');
    parsed[kv[0].trim()] = kv[1];
  }
  return parsed;
};

// Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeFmtp = function (codec) {
  var line = '';
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  if (codec.parameters && Object.keys(codec.parameters).length) {
    var params = [];
    Object.keys(codec.parameters).forEach(function (param) {
      params.push(param + '=' + codec.parameters[param]);
    });
    line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
  }
  return line;
};

// Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
// a=rtcp-fb:98 nack rpsi
SDPUtils.parseRtcpFb = function (line) {
  var parts = line.substr(line.indexOf(' ') + 1).split(' ');
  return {
    type: parts.shift(),
    parameter: parts.join(' ')
  };
};
// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeRtcpFb = function (codec) {
  var lines = '';
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
    // FIXME: special handling for trr-int?
    codec.rtcpFeedback.forEach(function (fb) {
      lines += 'a=rtcp-fb:' + pt + ' ' + fb.type + (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') + '\r\n';
    });
  }
  return lines;
};

// Parses an RFC 5576 ssrc media attribute. Sample input:
// a=ssrc:3735928559 cname:something
SDPUtils.parseSsrcMedia = function (line) {
  var sp = line.indexOf(' ');
  var parts = {
    ssrc: parseInt(line.substr(7, sp - 7), 10)
  };
  var colon = line.indexOf(':', sp);
  if (colon > -1) {
    parts.attribute = line.substr(sp + 1, colon - sp - 1);
    parts.value = line.substr(colon + 1);
  } else {
    parts.attribute = line.substr(sp + 1);
  }
  return parts;
};

// Extracts the MID (RFC 5888) from a media section.
// returns the MID or undefined if no mid line was found.
SDPUtils.getMid = function (mediaSection) {
  var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
  if (mid) {
    return mid.substr(6);
  }
};

SDPUtils.parseFingerprint = function (line) {
  var parts = line.substr(14).split(' ');
  return {
    algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
    value: parts[1]
  };
};

// Extracts DTLS parameters from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the fingerprint line as input. See also getIceParameters.
SDPUtils.getDtlsParameters = function (mediaSection, sessionpart) {
  var lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=fingerprint:');
  // Note: a=setup line is ignored since we use the 'auto' role.
  // Note2: 'algorithm' is not case sensitive except in Edge.
  return {
    role: 'auto',
    fingerprints: lines.map(SDPUtils.parseFingerprint)
  };
};

// Serializes DTLS parameters to SDP.
SDPUtils.writeDtlsParameters = function (params, setupType) {
  var sdp = 'a=setup:' + setupType + '\r\n';
  params.fingerprints.forEach(function (fp) {
    sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
  });
  return sdp;
};
// Parses ICE information from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the ice-ufrag and ice-pwd lines as input.
SDPUtils.getIceParameters = function (mediaSection, sessionpart) {
  var lines = SDPUtils.splitLines(mediaSection);
  // Search in session part, too.
  lines = lines.concat(SDPUtils.splitLines(sessionpart));
  var iceParameters = {
    usernameFragment: lines.filter(function (line) {
      return line.indexOf('a=ice-ufrag:') === 0;
    })[0].substr(12),
    password: lines.filter(function (line) {
      return line.indexOf('a=ice-pwd:') === 0;
    })[0].substr(10)
  };
  return iceParameters;
};

// Serializes ICE parameters to SDP.
SDPUtils.writeIceParameters = function (params) {
  return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' + 'a=ice-pwd:' + params.password + '\r\n';
};

// Parses the SDP media section and returns RTCRtpParameters.
SDPUtils.parseRtpParameters = function (mediaSection) {
  var description = {
    codecs: [],
    headerExtensions: [],
    fecMechanisms: [],
    rtcp: []
  };
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');
  for (var i = 3; i < mline.length; i++) {
    // find all codecs from mline[3..]
    var pt = mline[i];
    var rtpmapline = SDPUtils.matchPrefix(mediaSection, 'a=rtpmap:' + pt + ' ')[0];
    if (rtpmapline) {
      var codec = SDPUtils.parseRtpMap(rtpmapline);
      var fmtps = SDPUtils.matchPrefix(mediaSection, 'a=fmtp:' + pt + ' ');
      // Only the first a=fmtp:<pt> is considered.
      codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
      codec.rtcpFeedback = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:' + pt + ' ').map(SDPUtils.parseRtcpFb);
      description.codecs.push(codec);
      // parse FEC mechanisms from rtpmap lines.
      switch (codec.name.toUpperCase()) {
        case 'RED':
        case 'ULPFEC':
          description.fecMechanisms.push(codec.name.toUpperCase());
          break;
        default:
          // only RED and ULPFEC are recognized as FEC mechanisms.
          break;
      }
    }
  }
  SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function (line) {
    description.headerExtensions.push(SDPUtils.parseExtmap(line));
  });
  // FIXME: parse rtcp.
  return description;
};

// Generates parts of the SDP media section describing the capabilities /
// parameters.
SDPUtils.writeRtpDescription = function (kind, caps) {
  var sdp = '';

  // Build the mline.
  sdp += 'm=' + kind + ' ';
  sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
  sdp += ' UDP/TLS/RTP/SAVPF ';
  sdp += caps.codecs.map(function (codec) {
    if (codec.preferredPayloadType !== undefined) {
      return codec.preferredPayloadType;
    }
    return codec.payloadType;
  }).join(' ') + '\r\n';

  sdp += 'c=IN IP4 0.0.0.0\r\n';
  sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

  // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
  caps.codecs.forEach(function (codec) {
    sdp += SDPUtils.writeRtpMap(codec);
    sdp += SDPUtils.writeFmtp(codec);
    sdp += SDPUtils.writeRtcpFb(codec);
  });
  var maxptime = 0;
  caps.codecs.forEach(function (codec) {
    if (codec.maxptime > maxptime) {
      maxptime = codec.maxptime;
    }
  });
  if (maxptime > 0) {
    sdp += 'a=maxptime:' + maxptime + '\r\n';
  }
  sdp += 'a=rtcp-mux\r\n';

  caps.headerExtensions.forEach(function (extension) {
    sdp += SDPUtils.writeExtmap(extension);
  });
  // FIXME: write fecMechanisms.
  return sdp;
};

// Parses the SDP media section and returns an array of
// RTCRtpEncodingParameters.
SDPUtils.parseRtpEncodingParameters = function (mediaSection) {
  var encodingParameters = [];
  var description = SDPUtils.parseRtpParameters(mediaSection);
  var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
  var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

  // filter a=ssrc:... cname:, ignore PlanB-msid
  var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
    return SDPUtils.parseSsrcMedia(line);
  }).filter(function (parts) {
    return parts.attribute === 'cname';
  });
  var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
  var secondarySsrc;

  var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID').map(function (line) {
    var parts = line.split(' ');
    parts.shift();
    return parts.map(function (part) {
      return parseInt(part, 10);
    });
  });
  if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
    secondarySsrc = flows[0][1];
  }

  description.codecs.forEach(function (codec) {
    if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
      var encParam = {
        ssrc: primarySsrc,
        codecPayloadType: parseInt(codec.parameters.apt, 10),
        rtx: {
          ssrc: secondarySsrc
        }
      };
      encodingParameters.push(encParam);
      if (hasRed) {
        encParam = JSON.parse(JSON.stringify(encParam));
        encParam.fec = {
          ssrc: secondarySsrc,
          mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
        };
        encodingParameters.push(encParam);
      }
    }
  });
  if (encodingParameters.length === 0 && primarySsrc) {
    encodingParameters.push({
      ssrc: primarySsrc
    });
  }

  // we support both b=AS and b=TIAS but interpret AS as TIAS.
  var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
  if (bandwidth.length) {
    if (bandwidth[0].indexOf('b=TIAS:') === 0) {
      bandwidth = parseInt(bandwidth[0].substr(7), 10);
    } else if (bandwidth[0].indexOf('b=AS:') === 0) {
      // use formula from JSEP to convert b=AS to TIAS value.
      bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95 - 50 * 40 * 8;
    } else {
      bandwidth = undefined;
    }
    encodingParameters.forEach(function (params) {
      params.maxBitrate = bandwidth;
    });
  }
  return encodingParameters;
};

// parses http://draft.ortc.org/#rtcrtcpparameters*
SDPUtils.parseRtcpParameters = function (mediaSection) {
  var rtcpParameters = {};

  var cname;
  // Gets the first SSRC. Note that with RTX there might be multiple
  // SSRCs.
  var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
    return SDPUtils.parseSsrcMedia(line);
  }).filter(function (obj) {
    return obj.attribute === 'cname';
  })[0];
  if (remoteSsrc) {
    rtcpParameters.cname = remoteSsrc.value;
    rtcpParameters.ssrc = remoteSsrc.ssrc;
  }

  // Edge uses the compound attribute instead of reducedSize
  // compound is !reducedSize
  var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
  rtcpParameters.reducedSize = rsize.length > 0;
  rtcpParameters.compound = rsize.length === 0;

  // parses the rtcp-mux attrіbute.
  // Note that Edge does not support unmuxed RTCP.
  var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
  rtcpParameters.mux = mux.length > 0;

  return rtcpParameters;
};

// parses either a=msid: or a=ssrc:... msid lines and returns
// the id of the MediaStream and MediaStreamTrack.
SDPUtils.parseMsid = function (mediaSection) {
  var parts;
  var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
  if (spec.length === 1) {
    parts = spec[0].substr(7).split(' ');
    return { stream: parts[0], track: parts[1] };
  }
  var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
    return SDPUtils.parseSsrcMedia(line);
  }).filter(function (parts) {
    return parts.attribute === 'msid';
  });
  if (planB.length > 0) {
    parts = planB[0].value.split(' ');
    return { stream: parts[0], track: parts[1] };
  }
};

// Generate a session ID for SDP.
// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
// recommends using a cryptographically random +ve 64-bit value
// but right now this should be acceptable and within the right range
SDPUtils.generateSessionId = function () {
  return Math.random().toString().substr(2, 21);
};

// Write boilder plate for start of SDP
// sessId argument is optional - if not supplied it will
// be generated randomly
// sessVersion is optional and defaults to 2
SDPUtils.writeSessionBoilerplate = function (sessId, sessVer) {
  var sessionId;
  var version = sessVer !== undefined ? sessVer : 2;
  if (sessId) {
    sessionId = sessId;
  } else {
    sessionId = SDPUtils.generateSessionId();
  }
  // FIXME: sess-id should be an NTP timestamp.
  return 'v=0\r\n' + 'o=thisisadapterortc ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' + 's=-\r\n' + 't=0 0\r\n';
};

SDPUtils.writeMediaSection = function (transceiver, caps, type, stream) {
  var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

  // Map ICE parameters (ufrag, pwd) to SDP.
  sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());

  // Map DTLS parameters to SDP.
  sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : 'active');

  sdp += 'a=mid:' + transceiver.mid + '\r\n';

  if (transceiver.direction) {
    sdp += 'a=' + transceiver.direction + '\r\n';
  } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
    sdp += 'a=sendrecv\r\n';
  } else if (transceiver.rtpSender) {
    sdp += 'a=sendonly\r\n';
  } else if (transceiver.rtpReceiver) {
    sdp += 'a=recvonly\r\n';
  } else {
    sdp += 'a=inactive\r\n';
  }

  if (transceiver.rtpSender) {
    // spec.
    var msid = 'msid:' + stream.id + ' ' + transceiver.rtpSender.track.id + '\r\n';
    sdp += 'a=' + msid;

    // for Chrome.
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;
    if (transceiver.sendEncodingParameters[0].rtx) {
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
      sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
    }
  }
  // FIXME: this should be written by writeRtpDescription.
  sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
  if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
  }
  return sdp;
};

// Gets the direction from the mediaSection or the sessionpart.
SDPUtils.getDirection = function (mediaSection, sessionpart) {
  // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
  var lines = SDPUtils.splitLines(mediaSection);
  for (var i = 0; i < lines.length; i++) {
    switch (lines[i]) {
      case 'a=sendrecv':
      case 'a=sendonly':
      case 'a=recvonly':
      case 'a=inactive':
        return lines[i].substr(2);
      default:
      // FIXME: What should happen here?
    }
  }
  if (sessionpart) {
    return SDPUtils.getDirection(sessionpart);
  }
  return 'sendrecv';
};

SDPUtils.getKind = function (mediaSection) {
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');
  return mline[0].substr(2);
};

SDPUtils.isRejected = function (mediaSection) {
  return mediaSection.split(' ', 2)[1] === '0';
};

SDPUtils.parseMLine = function (mediaSection) {
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');
  return {
    kind: mline[0].substr(2),
    port: parseInt(mline[1], 10),
    protocol: mline[2],
    fmt: mline.slice(3).join(' ')
  };
};

// Expose public methods.
if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') {
  module.exports = SDPUtils;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNkcC5qcyJdLCJuYW1lcyI6WyJTRFBVdGlscyIsImdlbmVyYXRlSWRlbnRpZmllciIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0ciIsImxvY2FsQ05hbWUiLCJzcGxpdExpbmVzIiwiYmxvYiIsInRyaW0iLCJzcGxpdCIsIm1hcCIsImxpbmUiLCJzcGxpdFNlY3Rpb25zIiwicGFydHMiLCJwYXJ0IiwiaW5kZXgiLCJtYXRjaFByZWZpeCIsInByZWZpeCIsImZpbHRlciIsImluZGV4T2YiLCJwYXJzZUNhbmRpZGF0ZSIsInN1YnN0cmluZyIsImNhbmRpZGF0ZSIsImZvdW5kYXRpb24iLCJjb21wb25lbnQiLCJwYXJzZUludCIsInByb3RvY29sIiwidG9Mb3dlckNhc2UiLCJwcmlvcml0eSIsImlwIiwicG9ydCIsInR5cGUiLCJpIiwibGVuZ3RoIiwicmVsYXRlZEFkZHJlc3MiLCJyZWxhdGVkUG9ydCIsInRjcFR5cGUiLCJ1ZnJhZyIsInVzZXJuYW1lRnJhZ21lbnQiLCJ3cml0ZUNhbmRpZGF0ZSIsInNkcCIsInB1c2giLCJ0b1VwcGVyQ2FzZSIsImpvaW4iLCJwYXJzZUljZU9wdGlvbnMiLCJwYXJzZVJ0cE1hcCIsInBhcnNlZCIsInBheWxvYWRUeXBlIiwic2hpZnQiLCJuYW1lIiwiY2xvY2tSYXRlIiwibnVtQ2hhbm5lbHMiLCJ3cml0ZVJ0cE1hcCIsImNvZGVjIiwicHQiLCJwcmVmZXJyZWRQYXlsb2FkVHlwZSIsInVuZGVmaW5lZCIsInBhcnNlRXh0bWFwIiwiaWQiLCJkaXJlY3Rpb24iLCJ1cmkiLCJ3cml0ZUV4dG1hcCIsImhlYWRlckV4dGVuc2lvbiIsInByZWZlcnJlZElkIiwicGFyc2VGbXRwIiwia3YiLCJqIiwid3JpdGVGbXRwIiwicGFyYW1ldGVycyIsIk9iamVjdCIsImtleXMiLCJwYXJhbXMiLCJmb3JFYWNoIiwicGFyYW0iLCJwYXJzZVJ0Y3BGYiIsInBhcmFtZXRlciIsIndyaXRlUnRjcEZiIiwibGluZXMiLCJydGNwRmVlZGJhY2siLCJmYiIsInBhcnNlU3NyY01lZGlhIiwic3AiLCJzc3JjIiwiY29sb24iLCJhdHRyaWJ1dGUiLCJ2YWx1ZSIsImdldE1pZCIsIm1lZGlhU2VjdGlvbiIsIm1pZCIsInBhcnNlRmluZ2VycHJpbnQiLCJhbGdvcml0aG0iLCJnZXREdGxzUGFyYW1ldGVycyIsInNlc3Npb25wYXJ0Iiwicm9sZSIsImZpbmdlcnByaW50cyIsIndyaXRlRHRsc1BhcmFtZXRlcnMiLCJzZXR1cFR5cGUiLCJmcCIsImdldEljZVBhcmFtZXRlcnMiLCJjb25jYXQiLCJpY2VQYXJhbWV0ZXJzIiwicGFzc3dvcmQiLCJ3cml0ZUljZVBhcmFtZXRlcnMiLCJwYXJzZVJ0cFBhcmFtZXRlcnMiLCJkZXNjcmlwdGlvbiIsImNvZGVjcyIsImhlYWRlckV4dGVuc2lvbnMiLCJmZWNNZWNoYW5pc21zIiwicnRjcCIsIm1saW5lIiwicnRwbWFwbGluZSIsImZtdHBzIiwid3JpdGVSdHBEZXNjcmlwdGlvbiIsImtpbmQiLCJjYXBzIiwibWF4cHRpbWUiLCJleHRlbnNpb24iLCJwYXJzZVJ0cEVuY29kaW5nUGFyYW1ldGVycyIsImVuY29kaW5nUGFyYW1ldGVycyIsImhhc1JlZCIsImhhc1VscGZlYyIsInNzcmNzIiwicHJpbWFyeVNzcmMiLCJzZWNvbmRhcnlTc3JjIiwiZmxvd3MiLCJhcHQiLCJlbmNQYXJhbSIsImNvZGVjUGF5bG9hZFR5cGUiLCJydHgiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJmZWMiLCJtZWNoYW5pc20iLCJiYW5kd2lkdGgiLCJtYXhCaXRyYXRlIiwicGFyc2VSdGNwUGFyYW1ldGVycyIsInJ0Y3BQYXJhbWV0ZXJzIiwiY25hbWUiLCJyZW1vdGVTc3JjIiwib2JqIiwicnNpemUiLCJyZWR1Y2VkU2l6ZSIsImNvbXBvdW5kIiwibXV4IiwicGFyc2VNc2lkIiwic3BlYyIsInN0cmVhbSIsInRyYWNrIiwicGxhbkIiLCJnZW5lcmF0ZVNlc3Npb25JZCIsIndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlIiwic2Vzc0lkIiwic2Vzc1ZlciIsInNlc3Npb25JZCIsInZlcnNpb24iLCJ3cml0ZU1lZGlhU2VjdGlvbiIsInRyYW5zY2VpdmVyIiwiaWNlR2F0aGVyZXIiLCJnZXRMb2NhbFBhcmFtZXRlcnMiLCJkdGxzVHJhbnNwb3J0IiwicnRwU2VuZGVyIiwicnRwUmVjZWl2ZXIiLCJtc2lkIiwic2VuZEVuY29kaW5nUGFyYW1ldGVycyIsImdldERpcmVjdGlvbiIsImdldEtpbmQiLCJpc1JlamVjdGVkIiwicGFyc2VNTGluZSIsImZtdCIsInNsaWNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUM7QUFDRDs7QUFFQTs7OztBQUNBLElBQUlBLFdBQVcsRUFBZjs7QUFFQTtBQUNBO0FBQ0FBLFNBQVNDLGtCQUFULEdBQThCLFlBQVc7QUFDdkMsU0FBT0MsS0FBS0MsTUFBTCxHQUFjQyxRQUFkLENBQXVCLEVBQXZCLEVBQTJCQyxNQUEzQixDQUFrQyxDQUFsQyxFQUFxQyxFQUFyQyxDQUFQO0FBQ0QsQ0FGRDs7QUFJQTtBQUNBTCxTQUFTTSxVQUFULEdBQXNCTixTQUFTQyxrQkFBVCxFQUF0Qjs7QUFFQTtBQUNBRCxTQUFTTyxVQUFULEdBQXNCLFVBQVNDLElBQVQsRUFBZTtBQUNuQyxTQUFPQSxLQUFLQyxJQUFMLEdBQVlDLEtBQVosQ0FBa0IsSUFBbEIsRUFBd0JDLEdBQXhCLENBQTRCLFVBQVNDLElBQVQsRUFBZTtBQUNoRCxXQUFPQSxLQUFLSCxJQUFMLEVBQVA7QUFDRCxHQUZNLENBQVA7QUFHRCxDQUpEO0FBS0E7QUFDQVQsU0FBU2EsYUFBVCxHQUF5QixVQUFTTCxJQUFULEVBQWU7QUFDdEMsTUFBSU0sUUFBUU4sS0FBS0UsS0FBTCxDQUFXLE1BQVgsQ0FBWjtBQUNBLFNBQU9JLE1BQU1ILEdBQU4sQ0FBVSxVQUFTSSxJQUFULEVBQWVDLEtBQWYsRUFBc0I7QUFDckMsV0FBTyxDQUFDQSxRQUFRLENBQVIsR0FBWSxPQUFPRCxJQUFuQixHQUEwQkEsSUFBM0IsRUFBaUNOLElBQWpD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QUNBLElBQUksUUFBT2dJLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBdEIsRUFBZ0M7QUFDOUJBLFNBQU9DLE9BQVAsR0FBaUI3SyxRQUFqQjtBQUNEIiwiZmlsZSI6InNkcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxuLy8gU0RQIGhlbHBlcnMuXG52YXIgU0RQVXRpbHMgPSB7fTtcblxuLy8gR2VuZXJhdGUgYW4gYWxwaGFudW1lcmljIGlkZW50aWZpZXIgZm9yIGNuYW1lIG9yIG1pZHMuXG4vLyBUT0RPOiB1c2UgVVVJRHMgaW5zdGVhZD8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4M1xuU0RQVXRpbHMuZ2VuZXJhdGVJZGVudGlmaWVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgMTApO1xufTtcblxuLy8gVGhlIFJUQ1AgQ05BTUUgdXNlZCBieSBhbGwgcGVlcmNvbm5lY3Rpb25zIGZyb20gdGhlIHNhbWUgSlMuXG5TRFBVdGlscy5sb2NhbENOYW1lID0gU0RQVXRpbHMuZ2VuZXJhdGVJZGVudGlmaWVyKCk7XG5cbi8vIFNwbGl0cyBTRFAgaW50byBsaW5lcywgZGVhbGluZyB3aXRoIGJvdGggQ1JMRiBhbmQgTEYuXG5TRFBVdGlscy5zcGxpdExpbmVzID0gZnVuY3Rpb24oYmxvYikge1xuICByZXR1cm4gYmxvYi50cmltKCkuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgcmV0dXJuIGxpbmUudHJpbSgpO1xuICB9KTtcbn07XG4vLyBTcGxpdHMgU0RQIGludG8gc2Vzc2lvbnBhcnQgYW5kIG1lZGlhc2VjdGlvbnMuIEVuc3VyZXMgQ1JMRi5cblNEUFV0aWxzLnNwbGl0U2VjdGlvbnMgPSBmdW5jdGlvbihibG9iKSB7XG4gIHZhciBwYXJ0cyA9IGJsb2Iuc3BsaXQoJ1xcbm09Jyk7XG4gIHJldHVybiBwYXJ0cy5tYXAoZnVuY3Rpb24ocGFydCwgaW5kZXgpIHtcbiAgICByZXR1cm4gKGluZGV4ID4gMCA/ICdtPScgKyBwYXJ0IDogcGFydCkudHJpbSgpICsgJ1xcclxcbic7XG4gIH0pO1xufTtcblxuLy8gUmV0dXJucyBsaW5lcyB0aGF0IHN0YXJ0IHdpdGggYSBjZXJ0YWluIHByZWZpeC5cblNEUFV0aWxzLm1hdGNoUHJlZml4ID0gZnVuY3Rpb24oYmxvYiwgcHJlZml4KSB7XG4gIHJldHVybiBTRFBVdGlscy5zcGxpdExpbmVzKGJsb2IpLmZpbHRlcihmdW5jdGlvbihsaW5lKSB7XG4gICAgcmV0dXJuIGxpbmUuaW5kZXhPZihwcmVmaXgpID09PSAwO1xuICB9KTtcbn07XG5cbi8vIFBhcnNlcyBhbiBJQ0UgY2FuZGlkYXRlIGxpbmUuIFNhbXBsZSBpbnB1dDpcbi8vIGNhbmRpZGF0ZTo3MDI3ODYzNTAgMiB1ZHAgNDE4MTk5MDIgOC44LjguOCA2MDc2OSB0eXAgcmVsYXkgcmFkZHIgOC44LjguOFxuLy8gcnBvcnQgNTU5OTZcIlxuU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cztcbiAgLy8gUGFyc2UgYm90aCB2YXJpYW50cy5cbiAgaWYgKGxpbmUuaW5kZXhPZignYT1jYW5kaWRhdGU6JykgPT09IDApIHtcbiAgICBwYXJ0cyA9IGxpbmUuc3Vic3RyaW5nKDEyKS5zcGxpdCgnICcpO1xuICB9IGVsc2Uge1xuICAgIHBhcnRzID0gbGluZS5zdWJzdHJpbmcoMTApLnNwbGl0KCcgJyk7XG4gIH1cblxuICB2YXIgY2FuZGlkYXRlID0ge1xuICAgIGZvdW5kYXRpb246IHBhcnRzWzBdLFxuICAgIGNvbXBvbmVudDogcGFyc2VJbnQocGFydHNbMV0sIDEwKSxcbiAgICBwcm90b2NvbDogcGFydHNbMl0udG9Mb3dlckNhc2UoKSxcbiAgICBwcmlvcml0eTogcGFyc2VJbnQocGFydHNbM10sIDEwKSxcbiAgICBpcDogcGFydHNbNF0sXG4gICAgcG9ydDogcGFyc2VJbnQocGFydHNbNV0sIDEwKSxcbiAgICAvLyBza2lwIHBhcnRzWzZdID09ICd0eXAnXG4gICAgdHlwZTogcGFydHNbN11cbiAgfTtcblxuICBmb3IgKHZhciBpID0gODsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgc3dpdGNoIChwYXJ0c1tpXSkge1xuICAgICAgY2FzZSAncmFkZHInOlxuICAgICAgICBjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MgPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncnBvcnQnOlxuICAgICAgICBjYW5kaWRhdGUucmVsYXRlZFBvcnQgPSBwYXJzZUludChwYXJ0c1tpICsgMV0sIDEwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0Y3B0eXBlJzpcbiAgICAgICAgY2FuZGlkYXRlLnRjcFR5cGUgPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndWZyYWcnOlxuICAgICAgICBjYW5kaWRhdGUudWZyYWcgPSBwYXJ0c1tpICsgMV07IC8vIGZvciBiYWNrd2FyZCBjb21wYWJpbGl0eS5cbiAgICAgICAgY2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnQgPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDogLy8gZXh0ZW5zaW9uIGhhbmRsaW5nLCBpbiBwYXJ0aWN1bGFyIHVmcmFnXG4gICAgICAgIGNhbmRpZGF0ZVtwYXJ0c1tpXV0gPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2FuZGlkYXRlO1xufTtcblxuLy8gVHJhbnNsYXRlcyBhIGNhbmRpZGF0ZSBvYmplY3QgaW50byBTRFAgY2FuZGlkYXRlIGF0dHJpYnV0ZS5cblNEUFV0aWxzLndyaXRlQ2FuZGlkYXRlID0gZnVuY3Rpb24oY2FuZGlkYXRlKSB7XG4gIHZhciBzZHAgPSBbXTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLmZvdW5kYXRpb24pO1xuICBzZHAucHVzaChjYW5kaWRhdGUuY29tcG9uZW50KTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLnByb3RvY29sLnRvVXBwZXJDYXNlKCkpO1xuICBzZHAucHVzaChjYW5kaWRhdGUucHJpb3JpdHkpO1xuICBzZHAucHVzaChjYW5kaWRhdGUuaXApO1xuICBzZHAucHVzaChjYW5kaWRhdGUucG9ydCk7XG5cbiAgdmFyIHR5cGUgPSBjYW5kaWRhdGUudHlwZTtcbiAgc2RwLnB1c2goJ3R5cCcpO1xuICBzZHAucHVzaCh0eXBlKTtcbiAgaWYgKHR5cGUgIT09ICdob3N0JyAmJiBjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MgJiZcbiAgICAgIGNhbmRpZGF0ZS5yZWxhdGVkUG9ydCkge1xuICAgIHNkcC5wdXNoKCdyYWRkcicpO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS5yZWxhdGVkQWRkcmVzcyk7IC8vIHdhczogcmVsQWRkclxuICAgIHNkcC5wdXNoKCdycG9ydCcpO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS5yZWxhdGVkUG9ydCk7IC8vIHdhczogcmVsUG9ydFxuICB9XG4gIGlmIChjYW5kaWRhdGUudGNwVHlwZSAmJiBjYW5kaWRhdGUucHJvdG9jb2wudG9Mb3dlckNhc2UoKSA9PT0gJ3RjcCcpIHtcbiAgICBzZHAucHVzaCgndGNwdHlwZScpO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS50Y3BUeXBlKTtcbiAgfVxuICBpZiAoY2FuZGlkYXRlLnVmcmFnKSB7XG4gICAgc2RwLnB1c2goJ3VmcmFnJyk7XG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnVmcmFnKTtcbiAgfVxuICByZXR1cm4gJ2NhbmRpZGF0ZTonICsgc2RwLmpvaW4oJyAnKTtcbn07XG5cbi8vIFBhcnNlcyBhbiBpY2Utb3B0aW9ucyBsaW5lLCByZXR1cm5zIGFuIGFycmF5IG9mIG9wdGlvbiB0YWdzLlxuLy8gYT1pY2Utb3B0aW9uczpmb28gYmFyXG5TRFBVdGlscy5wYXJzZUljZU9wdGlvbnMgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHJldHVybiBsaW5lLnN1YnN0cigxNCkuc3BsaXQoJyAnKTtcbn1cblxuLy8gUGFyc2VzIGFuIHJ0cG1hcCBsaW5lLCByZXR1cm5zIFJUQ1J0cENvZGRlY1BhcmFtZXRlcnMuIFNhbXBsZSBpbnB1dDpcbi8vIGE9cnRwbWFwOjExMSBvcHVzLzQ4MDAwLzJcblNEUFV0aWxzLnBhcnNlUnRwTWFwID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cig5KS5zcGxpdCgnICcpO1xuICB2YXIgcGFyc2VkID0ge1xuICAgIHBheWxvYWRUeXBlOiBwYXJzZUludChwYXJ0cy5zaGlmdCgpLCAxMCkgLy8gd2FzOiBpZFxuICB9O1xuXG4gIHBhcnRzID0gcGFydHNbMF0uc3BsaXQoJy8nKTtcblxuICBwYXJzZWQubmFtZSA9IHBhcnRzWzBdO1xuICBwYXJzZWQuY2xvY2tSYXRlID0gcGFyc2VJbnQocGFydHNbMV0sIDEwKTsgLy8gd2FzOiBjbG9ja3JhdGVcbiAgLy8gd2FzOiBjaGFubmVsc1xuICBwYXJzZWQubnVtQ2hhbm5lbHMgPSBwYXJ0cy5sZW5ndGggPT09IDMgPyBwYXJzZUludChwYXJ0c1syXSwgMTApIDogMTtcbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbi8vIEdlbmVyYXRlIGFuIGE9cnRwbWFwIGxpbmUgZnJvbSBSVENSdHBDb2RlY0NhcGFiaWxpdHkgb3Jcbi8vIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cblNEUFV0aWxzLndyaXRlUnRwTWFwID0gZnVuY3Rpb24oY29kZWMpIHtcbiAgdmFyIHB0ID0gY29kZWMucGF5bG9hZFR5cGU7XG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHQgPSBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcbiAgfVxuICByZXR1cm4gJ2E9cnRwbWFwOicgKyBwdCArICcgJyArIGNvZGVjLm5hbWUgKyAnLycgKyBjb2RlYy5jbG9ja1JhdGUgK1xuICAgICAgKGNvZGVjLm51bUNoYW5uZWxzICE9PSAxID8gJy8nICsgY29kZWMubnVtQ2hhbm5lbHMgOiAnJykgKyAnXFxyXFxuJztcbn07XG5cbi8vIFBhcnNlcyBhbiBhPWV4dG1hcCBsaW5lIChoZWFkZXJleHRlbnNpb24gZnJvbSBSRkMgNTI4NSkuIFNhbXBsZSBpbnB1dDpcbi8vIGE9ZXh0bWFwOjIgdXJuOmlldGY6cGFyYW1zOnJ0cC1oZHJleHQ6dG9mZnNldFxuLy8gYT1leHRtYXA6Mi9zZW5kb25seSB1cm46aWV0ZjpwYXJhbXM6cnRwLWhkcmV4dDp0b2Zmc2V0XG5TRFBVdGlscy5wYXJzZUV4dG1hcCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoOSkuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICBpZDogcGFyc2VJbnQocGFydHNbMF0sIDEwKSxcbiAgICBkaXJlY3Rpb246IHBhcnRzWzBdLmluZGV4T2YoJy8nKSA+IDAgPyBwYXJ0c1swXS5zcGxpdCgnLycpWzFdIDogJ3NlbmRyZWN2JyxcbiAgICB1cmk6IHBhcnRzWzFdXG4gIH07XG59O1xuXG4vLyBHZW5lcmF0ZXMgYT1leHRtYXAgbGluZSBmcm9tIFJUQ1J0cEhlYWRlckV4dGVuc2lvblBhcmFtZXRlcnMgb3Jcbi8vIFJUQ1J0cEhlYWRlckV4dGVuc2lvbi5cblNEUFV0aWxzLndyaXRlRXh0bWFwID0gZnVuY3Rpb24oaGVhZGVyRXh0ZW5zaW9uKSB7XG4gIHJldHVybiAnYT1leHRtYXA6JyArIChoZWFkZXJFeHRlbnNpb24uaWQgfHwgaGVhZGVyRXh0ZW5zaW9uLnByZWZlcnJlZElkKSArXG4gICAgICAoaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvbiAmJiBoZWFkZXJFeHRlbnNpb24uZGlyZWN0aW9uICE9PSAnc2VuZHJlY3YnXG4gICAgICAgICAgPyAnLycgKyBoZWFkZXJFeHRlbnNpb24uZGlyZWN0aW9uXG4gICAgICAgICAgOiAnJykgK1xuICAgICAgJyAnICsgaGVhZGVyRXh0ZW5zaW9uLnVyaSArICdcXHJcXG4nO1xufTtcblxuLy8gUGFyc2VzIGFuIGZ0bXAgbGluZSwgcmV0dXJucyBkaWN0aW9uYXJ5LiBTYW1wbGUgaW5wdXQ6XG4vLyBhPWZtdHA6OTYgdmJyPW9uO2NuZz1vblxuLy8gQWxzbyBkZWFscyB3aXRoIHZicj1vbjsgY25nPW9uXG5TRFBVdGlscy5wYXJzZUZtdHAgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGt2O1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cihsaW5lLmluZGV4T2YoJyAnKSArIDEpLnNwbGl0KCc7Jyk7XG4gIGZvciAodmFyIGogPSAwOyBqIDwgcGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICBrdiA9IHBhcnRzW2pdLnRyaW0oKS5zcGxpdCgnPScpO1xuICAgIHBhcnNlZFtrdlswXS50cmltKCldID0ga3ZbMV07XG4gIH1cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbi8vIEdlbmVyYXRlcyBhbiBhPWZ0bXAgbGluZSBmcm9tIFJUQ1J0cENvZGVjQ2FwYWJpbGl0eSBvciBSVENSdHBDb2RlY1BhcmFtZXRlcnMuXG5TRFBVdGlscy53cml0ZUZtdHAgPSBmdW5jdGlvbihjb2RlYykge1xuICB2YXIgbGluZSA9ICcnO1xuICB2YXIgcHQgPSBjb2RlYy5wYXlsb2FkVHlwZTtcbiAgaWYgKGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xuICB9XG4gIGlmIChjb2RlYy5wYXJhbWV0ZXJzICYmIE9iamVjdC5rZXlzKGNvZGVjLnBhcmFtZXRlcnMpLmxlbmd0aCkge1xuICAgIHZhciBwYXJhbXMgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhjb2RlYy5wYXJhbWV0ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKHBhcmFtKSB7XG4gICAgICBwYXJhbXMucHVzaChwYXJhbSArICc9JyArIGNvZGVjLnBhcmFtZXRlcnNbcGFyYW1dKTtcbiAgICB9KTtcbiAgICBsaW5lICs9ICdhPWZtdHA6JyArIHB0ICsgJyAnICsgcGFyYW1zLmpvaW4oJzsnKSArICdcXHJcXG4nO1xuICB9XG4gIHJldHVybiBsaW5lO1xufTtcblxuLy8gUGFyc2VzIGFuIHJ0Y3AtZmIgbGluZSwgcmV0dXJucyBSVENQUnRjcEZlZWRiYWNrIG9iamVjdC4gU2FtcGxlIGlucHV0OlxuLy8gYT1ydGNwLWZiOjk4IG5hY2sgcnBzaVxuU0RQVXRpbHMucGFyc2VSdGNwRmIgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKGxpbmUuaW5kZXhPZignICcpICsgMSkuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBwYXJ0cy5zaGlmdCgpLFxuICAgIHBhcmFtZXRlcjogcGFydHMuam9pbignICcpXG4gIH07XG59O1xuLy8gR2VuZXJhdGUgYT1ydGNwLWZiIGxpbmVzIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cblNEUFV0aWxzLndyaXRlUnRjcEZiID0gZnVuY3Rpb24oY29kZWMpIHtcbiAgdmFyIGxpbmVzID0gJyc7XG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xuICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHB0ID0gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XG4gIH1cbiAgaWYgKGNvZGVjLnJ0Y3BGZWVkYmFjayAmJiBjb2RlYy5ydGNwRmVlZGJhY2subGVuZ3RoKSB7XG4gICAgLy8gRklYTUU6IHNwZWNpYWwgaGFuZGxpbmcgZm9yIHRyci1pbnQ/XG4gICAgY29kZWMucnRjcEZlZWRiYWNrLmZvckVhY2goZnVuY3Rpb24oZmIpIHtcbiAgICAgIGxpbmVzICs9ICdhPXJ0Y3AtZmI6JyArIHB0ICsgJyAnICsgZmIudHlwZSArXG4gICAgICAoZmIucGFyYW1ldGVyICYmIGZiLnBhcmFtZXRlci5sZW5ndGggPyAnICcgKyBmYi5wYXJhbWV0ZXIgOiAnJykgK1xuICAgICAgICAgICdcXHJcXG4nO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBsaW5lcztcbn07XG5cbi8vIFBhcnNlcyBhbiBSRkMgNTU3NiBzc3JjIG1lZGlhIGF0dHJpYnV0ZS4gU2FtcGxlIGlucHV0OlxuLy8gYT1zc3JjOjM3MzU5Mjg1NTkgY25hbWU6c29tZXRoaW5nXG5TRFBVdGlscy5wYXJzZVNzcmNNZWRpYSA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHNwID0gbGluZS5pbmRleE9mKCcgJyk7XG4gIHZhciBwYXJ0cyA9IHtcbiAgICBzc3JjOiBwYXJzZUludChsaW5lLnN1YnN0cig3LCBzcCAtIDcpLCAxMClcbiAgfTtcbiAgdmFyIGNvbG9uID0gbGluZS5pbmRleE9mKCc6Jywgc3ApO1xuICBpZiAoY29sb24gPiAtMSkge1xuICAgIHBhcnRzLmF0dHJpYnV0ZSA9IGxpbmUuc3Vic3RyKHNwICsgMSwgY29sb24gLSBzcCAtIDEpO1xuICAgIHBhcnRzLnZhbHVlID0gbGluZS5zdWJzdHIoY29sb24gKyAxKTtcbiAgfSBlbHNlIHtcbiAgICBwYXJ0cy5hdHRyaWJ1dGUgPSBsaW5lLnN1YnN0cihzcCArIDEpO1xuICB9XG4gIHJldHVybiBwYXJ0cztcbn07XG5cbi8vIEV4dHJhY3RzIHRoZSBNSUQgKFJGQyA1ODg4KSBmcm9tIGEgbWVkaWEgc2VjdGlvbi5cbi8vIHJldHVybnMgdGhlIE1JRCBvciB1bmRlZmluZWQgaWYgbm8gbWlkIGxpbmUgd2FzIGZvdW5kLlxuU0RQVXRpbHMuZ2V0TWlkID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBtaWQgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPW1pZDonKVswXTtcbiAgaWYgKG1pZCkge1xuICAgIHJldHVybiBtaWQuc3Vic3RyKDYpO1xuICB9XG59XG5cblNEUFV0aWxzLnBhcnNlRmluZ2VycHJpbnQgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDE0KS5zcGxpdCgnICcpO1xuICByZXR1cm4ge1xuICAgIGFsZ29yaXRobTogcGFydHNbMF0udG9Mb3dlckNhc2UoKSwgLy8gYWxnb3JpdGhtIGlzIGNhc2Utc2Vuc2l0aXZlIGluIEVkZ2UuXG4gICAgdmFsdWU6IHBhcnRzWzFdXG4gIH07XG59O1xuXG4vLyBFeHRyYWN0cyBEVExTIHBhcmFtZXRlcnMgZnJvbSBTRFAgbWVkaWEgc2VjdGlvbiBvciBzZXNzaW9ucGFydC5cbi8vIEZJWE1FOiBmb3IgY29uc2lzdGVuY3kgd2l0aCBvdGhlciBmdW5jdGlvbnMgdGhpcyBzaG91bGQgb25seVxuLy8gICBnZXQgdGhlIGZpbmdlcnByaW50IGxpbmUgYXMgaW5wdXQuIFNlZSBhbHNvIGdldEljZVBhcmFtZXRlcnMuXG5TRFBVdGlscy5nZXREdGxzUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpIHtcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uICsgc2Vzc2lvbnBhcnQsXG4gICAgICAnYT1maW5nZXJwcmludDonKTtcbiAgLy8gTm90ZTogYT1zZXR1cCBsaW5lIGlzIGlnbm9yZWQgc2luY2Ugd2UgdXNlIHRoZSAnYXV0bycgcm9sZS5cbiAgLy8gTm90ZTI6ICdhbGdvcml0aG0nIGlzIG5vdCBjYXNlIHNlbnNpdGl2ZSBleGNlcHQgaW4gRWRnZS5cbiAgcmV0dXJuIHtcbiAgICByb2xlOiAnYXV0bycsXG4gICAgZmluZ2VycHJpbnRzOiBsaW5lcy5tYXAoU0RQVXRpbHMucGFyc2VGaW5nZXJwcmludClcbiAgfTtcbn07XG5cbi8vIFNlcmlhbGl6ZXMgRFRMUyBwYXJhbWV0ZXJzIHRvIFNEUC5cblNEUFV0aWxzLndyaXRlRHRsc1BhcmFtZXRlcnMgPSBmdW5jdGlvbihwYXJhbXMsIHNldHVwVHlwZSkge1xuICB2YXIgc2RwID0gJ2E9c2V0dXA6JyArIHNldHVwVHlwZSArICdcXHJcXG4nO1xuICBwYXJhbXMuZmluZ2VycHJpbnRzLmZvckVhY2goZnVuY3Rpb24oZnApIHtcbiAgICBzZHAgKz0gJ2E9ZmluZ2VycHJpbnQ6JyArIGZwLmFsZ29yaXRobSArICcgJyArIGZwLnZhbHVlICsgJ1xcclxcbic7XG4gIH0pO1xuICByZXR1cm4gc2RwO1xufTtcbi8vIFBhcnNlcyBJQ0UgaW5mb3JtYXRpb24gZnJvbSBTRFAgbWVkaWEgc2VjdGlvbiBvciBzZXNzaW9ucGFydC5cbi8vIEZJWE1FOiBmb3IgY29uc2lzdGVuY3kgd2l0aCBvdGhlciBmdW5jdGlvbnMgdGhpcyBzaG91bGQgb25seVxuLy8gICBnZXQgdGhlIGljZS11ZnJhZyBhbmQgaWNlLXB3ZCBsaW5lcyBhcyBpbnB1dC5cblNEUFV0aWxzLmdldEljZVBhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KSB7XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgLy8gU2VhcmNoIGluIHNlc3Npb24gcGFydCwgdG9vLlxuICBsaW5lcyA9IGxpbmVzLmNvbmNhdChTRFBVdGlscy5zcGxpdExpbmVzKHNlc3Npb25wYXJ0KSk7XG4gIHZhciBpY2VQYXJhbWV0ZXJzID0ge1xuICAgIHVzZXJuYW1lRnJhZ21lbnQ6IGxpbmVzLmZpbHRlcihmdW5jdGlvbihsaW5lKSB7XG4gICAgICByZXR1cm4gbGluZS5pbmRleE9mKCdhPWljZS11ZnJhZzonKSA9PT0gMDtcbiAgICB9KVswXS5zdWJzdHIoMTIpLFxuICAgIHBhc3N3b3JkOiBsaW5lcy5maWx0ZXIoZnVuY3Rpb24obGluZSkge1xuICAgICAgcmV0dXJuIGxpbmUuaW5kZXhPZignYT1pY2UtcHdkOicpID09PSAwO1xuICAgIH0pWzBdLnN1YnN0cigxMClcbiAgfTtcbiAgcmV0dXJuIGljZVBhcmFtZXRlcnM7XG59O1xuXG4vLyBTZXJpYWxpemVzIElDRSBwYXJhbWV0ZXJzIHRvIFNEUC5cblNEUFV0aWxzLndyaXRlSWNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICByZXR1cm4gJ2E9aWNlLXVmcmFnOicgKyBwYXJhbXMudXNlcm5hbWVGcmFnbWVudCArICdcXHJcXG4nICtcbiAgICAgICdhPWljZS1wd2Q6JyArIHBhcmFtcy5wYXNzd29yZCArICdcXHJcXG4nO1xufTtcblxuLy8gUGFyc2VzIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBhbmQgcmV0dXJucyBSVENSdHBQYXJhbWV0ZXJzLlxuU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBkZXNjcmlwdGlvbiA9IHtcbiAgICBjb2RlY3M6IFtdLFxuICAgIGhlYWRlckV4dGVuc2lvbnM6IFtdLFxuICAgIGZlY01lY2hhbmlzbXM6IFtdLFxuICAgIHJ0Y3A6IFtdXG4gIH07XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgdmFyIG1saW5lID0gbGluZXNbMF0uc3BsaXQoJyAnKTtcbiAgZm9yICh2YXIgaSA9IDM7IGkgPCBtbGluZS5sZW5ndGg7IGkrKykgeyAvLyBmaW5kIGFsbCBjb2RlY3MgZnJvbSBtbGluZVszLi5dXG4gICAgdmFyIHB0ID0gbWxpbmVbaV07XG4gICAgdmFyIHJ0cG1hcGxpbmUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcbiAgICAgICAgbWVkaWFTZWN0aW9uLCAnYT1ydHBtYXA6JyArIHB0ICsgJyAnKVswXTtcbiAgICBpZiAocnRwbWFwbGluZSkge1xuICAgICAgdmFyIGNvZGVjID0gU0RQVXRpbHMucGFyc2VSdHBNYXAocnRwbWFwbGluZSk7XG4gICAgICB2YXIgZm10cHMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcbiAgICAgICAgICBtZWRpYVNlY3Rpb24sICdhPWZtdHA6JyArIHB0ICsgJyAnKTtcbiAgICAgIC8vIE9ubHkgdGhlIGZpcnN0IGE9Zm10cDo8cHQ+IGlzIGNvbnNpZGVyZWQuXG4gICAgICBjb2RlYy5wYXJhbWV0ZXJzID0gZm10cHMubGVuZ3RoID8gU0RQVXRpbHMucGFyc2VGbXRwKGZtdHBzWzBdKSA6IHt9O1xuICAgICAgY29kZWMucnRjcEZlZWRiYWNrID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoXG4gICAgICAgICAgbWVkaWFTZWN0aW9uLCAnYT1ydGNwLWZiOicgKyBwdCArICcgJylcbiAgICAgICAgLm1hcChTRFBVdGlscy5wYXJzZVJ0Y3BGYik7XG4gICAgICBkZXNjcmlwdGlvbi5jb2RlY3MucHVzaChjb2RlYyk7XG4gICAgICAvLyBwYXJzZSBGRUMgbWVjaGFuaXNtcyBmcm9tIHJ0cG1hcCBsaW5lcy5cbiAgICAgIHN3aXRjaCAoY29kZWMubmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgIGNhc2UgJ1JFRCc6XG4gICAgICAgIGNhc2UgJ1VMUEZFQyc6XG4gICAgICAgICAgZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5wdXNoKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IC8vIG9ubHkgUkVEIGFuZCBVTFBGRUMgYXJlIHJlY29nbml6ZWQgYXMgRkVDIG1lY2hhbmlzbXMuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9ZXh0bWFwOicpLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgIGRlc2NyaXB0aW9uLmhlYWRlckV4dGVuc2lvbnMucHVzaChTRFBVdGlscy5wYXJzZUV4dG1hcChsaW5lKSk7XG4gIH0pO1xuICAvLyBGSVhNRTogcGFyc2UgcnRjcC5cbiAgcmV0dXJuIGRlc2NyaXB0aW9uO1xufTtcblxuLy8gR2VuZXJhdGVzIHBhcnRzIG9mIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBkZXNjcmliaW5nIHRoZSBjYXBhYmlsaXRpZXMgL1xuLy8gcGFyYW1ldGVycy5cblNEUFV0aWxzLndyaXRlUnRwRGVzY3JpcHRpb24gPSBmdW5jdGlvbihraW5kLCBjYXBzKSB7XG4gIHZhciBzZHAgPSAnJztcblxuICAvLyBCdWlsZCB0aGUgbWxpbmUuXG4gIHNkcCArPSAnbT0nICsga2luZCArICcgJztcbiAgc2RwICs9IGNhcHMuY29kZWNzLmxlbmd0aCA+IDAgPyAnOScgOiAnMCc7IC8vIHJlamVjdCBpZiBubyBjb2RlY3MuXG4gIHNkcCArPSAnIFVEUC9UTFMvUlRQL1NBVlBGICc7XG4gIHNkcCArPSBjYXBzLmNvZGVjcy5tYXAoZnVuY3Rpb24oY29kZWMpIHtcbiAgICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xuICAgIH1cbiAgICByZXR1cm4gY29kZWMucGF5bG9hZFR5cGU7XG4gIH0pLmpvaW4oJyAnKSArICdcXHJcXG4nO1xuXG4gIHNkcCArPSAnYz1JTiBJUDQgMC4wLjAuMFxcclxcbic7XG4gIHNkcCArPSAnYT1ydGNwOjkgSU4gSVA0IDAuMC4wLjBcXHJcXG4nO1xuXG4gIC8vIEFkZCBhPXJ0cG1hcCBsaW5lcyBmb3IgZWFjaCBjb2RlYy4gQWxzbyBmbXRwIGFuZCBydGNwLWZiLlxuICBjYXBzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlUnRwTWFwKGNvZGVjKTtcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVGbXRwKGNvZGVjKTtcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVSdGNwRmIoY29kZWMpO1xuICB9KTtcbiAgdmFyIG1heHB0aW1lID0gMDtcbiAgY2Fwcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xuICAgIGlmIChjb2RlYy5tYXhwdGltZSA+IG1heHB0aW1lKSB7XG4gICAgICBtYXhwdGltZSA9IGNvZGVjLm1heHB0aW1lO1xuICAgIH1cbiAgfSk7XG4gIGlmIChtYXhwdGltZSA+IDApIHtcbiAgICBzZHAgKz0gJ2E9bWF4cHRpbWU6JyArIG1heHB0aW1lICsgJ1xcclxcbic7XG4gIH1cbiAgc2RwICs9ICdhPXJ0Y3AtbXV4XFxyXFxuJztcblxuICBjYXBzLmhlYWRlckV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihleHRlbnNpb24pIHtcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVFeHRtYXAoZXh0ZW5zaW9uKTtcbiAgfSk7XG4gIC8vIEZJWE1FOiB3cml0ZSBmZWNNZWNoYW5pc21zLlxuICByZXR1cm4gc2RwO1xufTtcblxuLy8gUGFyc2VzIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBhbmQgcmV0dXJucyBhbiBhcnJheSBvZlxuLy8gUlRDUnRwRW5jb2RpbmdQYXJhbWV0ZXJzLlxuU0RQVXRpbHMucGFyc2VSdHBFbmNvZGluZ1BhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGVuY29kaW5nUGFyYW1ldGVycyA9IFtdO1xuICB2YXIgZGVzY3JpcHRpb24gPSBTRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcbiAgdmFyIGhhc1JlZCA9IGRlc2NyaXB0aW9uLmZlY01lY2hhbmlzbXMuaW5kZXhPZignUkVEJykgIT09IC0xO1xuICB2YXIgaGFzVWxwZmVjID0gZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5pbmRleE9mKCdVTFBGRUMnKSAhPT0gLTE7XG5cbiAgLy8gZmlsdGVyIGE9c3NyYzouLi4gY25hbWU6LCBpZ25vcmUgUGxhbkItbXNpZFxuICB2YXIgc3NyY3MgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcbiAgLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlU3NyY01lZGlhKGxpbmUpO1xuICB9KVxuICAuZmlsdGVyKGZ1bmN0aW9uKHBhcnRzKSB7XG4gICAgcmV0dXJuIHBhcnRzLmF0dHJpYnV0ZSA9PT0gJ2NuYW1lJztcbiAgfSk7XG4gIHZhciBwcmltYXJ5U3NyYyA9IHNzcmNzLmxlbmd0aCA+IDAgJiYgc3NyY3NbMF0uc3NyYztcbiAgdmFyIHNlY29uZGFyeVNzcmM7XG5cbiAgdmFyIGZsb3dzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjLWdyb3VwOkZJRCcpXG4gIC5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJyAnKTtcbiAgICBwYXJ0cy5zaGlmdCgpO1xuICAgIHJldHVybiBwYXJ0cy5tYXAoZnVuY3Rpb24ocGFydCkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHBhcnQsIDEwKTtcbiAgICB9KTtcbiAgfSk7XG4gIGlmIChmbG93cy5sZW5ndGggPiAwICYmIGZsb3dzWzBdLmxlbmd0aCA+IDEgJiYgZmxvd3NbMF1bMF0gPT09IHByaW1hcnlTc3JjKSB7XG4gICAgc2Vjb25kYXJ5U3NyYyA9IGZsb3dzWzBdWzFdO1xuICB9XG5cbiAgZGVzY3JpcHRpb24uY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcbiAgICBpZiAoY29kZWMubmFtZS50b1VwcGVyQ2FzZSgpID09PSAnUlRYJyAmJiBjb2RlYy5wYXJhbWV0ZXJzLmFwdCkge1xuICAgICAgdmFyIGVuY1BhcmFtID0ge1xuICAgICAgICBzc3JjOiBwcmltYXJ5U3NyYyxcbiAgICAgICAgY29kZWNQYXlsb2FkVHlwZTogcGFyc2VJbnQoY29kZWMucGFyYW1ldGVycy5hcHQsIDEwKSxcbiAgICAgICAgcnR4OiB7XG4gICAgICAgICAgc3NyYzogc2Vjb25kYXJ5U3NyY1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZW5jb2RpbmdQYXJhbWV0ZXJzLnB1c2goZW5jUGFyYW0pO1xuICAgICAgaWYgKGhhc1JlZCkge1xuICAgICAgICBlbmNQYXJhbSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZW5jUGFyYW0pKTtcbiAgICAgICAgZW5jUGFyYW0uZmVjID0ge1xuICAgICAgICAgIHNzcmM6IHNlY29uZGFyeVNzcmMsXG4gICAgICAgICAgbWVjaGFuaXNtOiBoYXNVbHBmZWMgPyAncmVkK3VscGZlYycgOiAncmVkJ1xuICAgICAgICB9O1xuICAgICAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaChlbmNQYXJhbSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgaWYgKGVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGggPT09IDAgJiYgcHJpbWFyeVNzcmMpIHtcbiAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaCh7XG4gICAgICBzc3JjOiBwcmltYXJ5U3NyY1xuICAgIH0pO1xuICB9XG5cbiAgLy8gd2Ugc3VwcG9ydCBib3RoIGI9QVMgYW5kIGI9VElBUyBidXQgaW50ZXJwcmV0IEFTIGFzIFRJQVMuXG4gIHZhciBiYW5kd2lkdGggPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdiPScpO1xuICBpZiAoYmFuZHdpZHRoLmxlbmd0aCkge1xuICAgIGlmIChiYW5kd2lkdGhbMF0uaW5kZXhPZignYj1USUFTOicpID09PSAwKSB7XG4gICAgICBiYW5kd2lkdGggPSBwYXJzZUludChiYW5kd2lkdGhbMF0uc3Vic3RyKDcpLCAxMCk7XG4gICAgfSBlbHNlIGlmIChiYW5kd2lkdGhbMF0uaW5kZXhPZignYj1BUzonKSA9PT0gMCkge1xuICAgICAgLy8gdXNlIGZvcm11bGEgZnJvbSBKU0VQIHRvIGNvbnZlcnQgYj1BUyB0byBUSUFTIHZhbHVlLlxuICAgICAgYmFuZHdpZHRoID0gcGFyc2VJbnQoYmFuZHdpZHRoWzBdLnN1YnN0cig1KSwgMTApICogMTAwMCAqIDAuOTVcbiAgICAgICAgICAtICg1MCAqIDQwICogOCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhbmR3aWR0aCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZW5jb2RpbmdQYXJhbWV0ZXJzLmZvckVhY2goZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICBwYXJhbXMubWF4Qml0cmF0ZSA9IGJhbmR3aWR0aDtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZW5jb2RpbmdQYXJhbWV0ZXJzO1xufTtcblxuLy8gcGFyc2VzIGh0dHA6Ly9kcmFmdC5vcnRjLm9yZy8jcnRjcnRjcHBhcmFtZXRlcnMqXG5TRFBVdGlscy5wYXJzZVJ0Y3BQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBydGNwUGFyYW1ldGVycyA9IHt9O1xuXG4gIHZhciBjbmFtZTtcbiAgLy8gR2V0cyB0aGUgZmlyc3QgU1NSQy4gTm90ZSB0aGF0IHdpdGggUlRYIHRoZXJlIG1pZ2h0IGJlIG11bHRpcGxlXG4gIC8vIFNTUkNzLlxuICB2YXIgcmVtb3RlU3NyYyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYzonKVxuICAgICAgLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgIHJldHVybiBTRFBVdGlscy5wYXJzZVNzcmNNZWRpYShsaW5lKTtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqLmF0dHJpYnV0ZSA9PT0gJ2NuYW1lJztcbiAgICAgIH0pWzBdO1xuICBpZiAocmVtb3RlU3NyYykge1xuICAgIHJ0Y3BQYXJhbWV0ZXJzLmNuYW1lID0gcmVtb3RlU3NyYy52YWx1ZTtcbiAgICBydGNwUGFyYW1ldGVycy5zc3JjID0gcmVtb3RlU3NyYy5zc3JjO1xuICB9XG5cbiAgLy8gRWRnZSB1c2VzIHRoZSBjb21wb3VuZCBhdHRyaWJ1dGUgaW5zdGVhZCBvZiByZWR1Y2VkU2l6ZVxuICAvLyBjb21wb3VuZCBpcyAhcmVkdWNlZFNpemVcbiAgdmFyIHJzaXplID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1ydGNwLXJzaXplJyk7XG4gIHJ0Y3BQYXJhbWV0ZXJzLnJlZHVjZWRTaXplID0gcnNpemUubGVuZ3RoID4gMDtcbiAgcnRjcFBhcmFtZXRlcnMuY29tcG91bmQgPSByc2l6ZS5sZW5ndGggPT09IDA7XG5cbiAgLy8gcGFyc2VzIHRoZSBydGNwLW11eCBhdHRy0ZZidXRlLlxuICAvLyBOb3RlIHRoYXQgRWRnZSBkb2VzIG5vdCBzdXBwb3J0IHVubXV4ZWQgUlRDUC5cbiAgdmFyIG11eCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9cnRjcC1tdXgnKTtcbiAgcnRjcFBhcmFtZXRlcnMubXV4ID0gbXV4Lmxlbmd0aCA+IDA7XG5cbiAgcmV0dXJuIHJ0Y3BQYXJhbWV0ZXJzO1xufTtcblxuLy8gcGFyc2VzIGVpdGhlciBhPW1zaWQ6IG9yIGE9c3NyYzouLi4gbXNpZCBsaW5lcyBhbmQgcmV0dXJuc1xuLy8gdGhlIGlkIG9mIHRoZSBNZWRpYVN0cmVhbSBhbmQgTWVkaWFTdHJlYW1UcmFjay5cblNEUFV0aWxzLnBhcnNlTXNpZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgcGFydHM7XG4gIHZhciBzcGVjID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1tc2lkOicpO1xuICBpZiAoc3BlYy5sZW5ndGggPT09IDEpIHtcbiAgICBwYXJ0cyA9IHNwZWNbMF0uc3Vic3RyKDcpLnNwbGl0KCcgJyk7XG4gICAgcmV0dXJuIHtzdHJlYW06IHBhcnRzWzBdLCB0cmFjazogcGFydHNbMV19O1xuICB9XG4gIHZhciBwbGFuQiA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYzonKVxuICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEobGluZSk7XG4gIH0pXG4gIC5maWx0ZXIoZnVuY3Rpb24ocGFydHMpIHtcbiAgICByZXR1cm4gcGFydHMuYXR0cmlidXRlID09PSAnbXNpZCc7XG4gIH0pO1xuICBpZiAocGxhbkIubGVuZ3RoID4gMCkge1xuICAgIHBhcnRzID0gcGxhbkJbMF0udmFsdWUuc3BsaXQoJyAnKTtcbiAgICByZXR1cm4ge3N0cmVhbTogcGFydHNbMF0sIHRyYWNrOiBwYXJ0c1sxXX07XG4gIH1cbn07XG5cbi8vIEdlbmVyYXRlIGEgc2Vzc2lvbiBJRCBmb3IgU0RQLlxuLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL2RyYWZ0LWlldGYtcnRjd2ViLWpzZXAtMjAjc2VjdGlvbi01LjIuMVxuLy8gcmVjb21tZW5kcyB1c2luZyBhIGNyeXB0b2dyYXBoaWNhbGx5IHJhbmRvbSArdmUgNjQtYml0IHZhbHVlXG4vLyBidXQgcmlnaHQgbm93IHRoaXMgc2hvdWxkIGJlIGFjY2VwdGFibGUgYW5kIHdpdGhpbiB0aGUgcmlnaHQgcmFuZ2VcblNEUFV0aWxzLmdlbmVyYXRlU2Vzc2lvbklkID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3Vic3RyKDIsIDIxKTtcbn07XG5cbi8vIFdyaXRlIGJvaWxkZXIgcGxhdGUgZm9yIHN0YXJ0IG9mIFNEUFxuLy8gc2Vzc0lkIGFyZ3VtZW50IGlzIG9wdGlvbmFsIC0gaWYgbm90IHN1cHBsaWVkIGl0IHdpbGxcbi8vIGJlIGdlbmVyYXRlZCByYW5kb21seVxuLy8gc2Vzc1ZlcnNpb24gaXMgb3B0aW9uYWwgYW5kIGRlZmF1bHRzIHRvIDJcblNEUFV0aWxzLndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlID0gZnVuY3Rpb24oc2Vzc0lkLCBzZXNzVmVyKSB7XG4gIHZhciBzZXNzaW9uSWQ7XG4gIHZhciB2ZXJzaW9uID0gc2Vzc1ZlciAhPT0gdW5kZWZpbmVkID8gc2Vzc1ZlciA6IDI7XG4gIGlmIChzZXNzSWQpIHtcbiAgICBzZXNzaW9uSWQgPSBzZXNzSWQ7XG4gIH0gZWxzZSB7XG4gICAgc2Vzc2lvbklkID0gU0RQVXRpbHMuZ2VuZXJhdGVTZXNzaW9uSWQoKTtcbiAgfVxuICAvLyBGSVhNRTogc2Vzcy1pZCBzaG91bGQgYmUgYW4gTlRQIHRpbWVzdGFtcC5cbiAgcmV0dXJuICd2PTBcXHJcXG4nICtcbiAgICAgICdvPXRoaXNpc2FkYXB0ZXJvcnRjICcgKyBzZXNzaW9uSWQgKyAnICcgKyB2ZXJzaW9uICsgJyBJTiBJUDQgMTI3LjAuMC4xXFxyXFxuJyArXG4gICAgICAncz0tXFxyXFxuJyArXG4gICAgICAndD0wIDBcXHJcXG4nO1xufTtcblxuU0RQVXRpbHMud3JpdGVNZWRpYVNlY3Rpb24gPSBmdW5jdGlvbih0cmFuc2NlaXZlciwgY2FwcywgdHlwZSwgc3RyZWFtKSB7XG4gIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uKHRyYW5zY2VpdmVyLmtpbmQsIGNhcHMpO1xuXG4gIC8vIE1hcCBJQ0UgcGFyYW1ldGVycyAodWZyYWcsIHB3ZCkgdG8gU0RQLlxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzKFxuICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuZ2V0TG9jYWxQYXJhbWV0ZXJzKCkpO1xuXG4gIC8vIE1hcCBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVEdGxzUGFyYW1ldGVycyhcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuZ2V0TG9jYWxQYXJhbWV0ZXJzKCksXG4gICAgICB0eXBlID09PSAnb2ZmZXInID8gJ2FjdHBhc3MnIDogJ2FjdGl2ZScpO1xuXG4gIHNkcCArPSAnYT1taWQ6JyArIHRyYW5zY2VpdmVyLm1pZCArICdcXHJcXG4nO1xuXG4gIGlmICh0cmFuc2NlaXZlci5kaXJlY3Rpb24pIHtcbiAgICBzZHAgKz0gJ2E9JyArIHRyYW5zY2VpdmVyLmRpcmVjdGlvbiArICdcXHJcXG4nO1xuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgIHNkcCArPSAnYT1zZW5kcmVjdlxcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgc2RwICs9ICdhPXNlbmRvbmx5XFxyXFxuJztcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgIHNkcCArPSAnYT1yZWN2b25seVxcclxcbic7XG4gIH0gZWxzZSB7XG4gICAgc2RwICs9ICdhPWluYWN0aXZlXFxyXFxuJztcbiAgfVxuXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICAvLyBzcGVjLlxuICAgIHZhciBtc2lkID0gJ21zaWQ6JyArIHN0cmVhbS5pZCArICcgJyArXG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci50cmFjay5pZCArICdcXHJcXG4nO1xuICAgIHNkcCArPSAnYT0nICsgbXNpZDtcblxuICAgIC8vIGZvciBDaHJvbWUuXG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXG4gICAgICAgICcgJyArIG1zaWQ7XG4gICAgaWYgKHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICAgJyAnICsgbXNpZDtcbiAgICAgIHNkcCArPSAnYT1zc3JjLWdyb3VwOkZJRCAnICtcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAnICcgK1xuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAgICdcXHJcXG4nO1xuICAgIH1cbiAgfVxuICAvLyBGSVhNRTogdGhpcyBzaG91bGQgYmUgd3JpdHRlbiBieSB3cml0ZVJ0cERlc2NyaXB0aW9uLlxuICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcbiAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xuICB9XG4gIHJldHVybiBzZHA7XG59O1xuXG4vLyBHZXRzIHRoZSBkaXJlY3Rpb24gZnJvbSB0aGUgbWVkaWFTZWN0aW9uIG9yIHRoZSBzZXNzaW9ucGFydC5cblNEUFV0aWxzLmdldERpcmVjdGlvbiA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpIHtcbiAgLy8gTG9vayBmb3Igc2VuZHJlY3YsIHNlbmRvbmx5LCByZWN2b25seSwgaW5hY3RpdmUsIGRlZmF1bHQgdG8gc2VuZHJlY3YuXG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgIHN3aXRjaCAobGluZXNbaV0pIHtcbiAgICAgIGNhc2UgJ2E9c2VuZHJlY3YnOlxuICAgICAgY2FzZSAnYT1zZW5kb25seSc6XG4gICAgICBjYXNlICdhPXJlY3Zvbmx5JzpcbiAgICAgIGNhc2UgJ2E9aW5hY3RpdmUnOlxuICAgICAgICByZXR1cm4gbGluZXNbaV0uc3Vic3RyKDIpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gRklYTUU6IFdoYXQgc2hvdWxkIGhhcHBlbiBoZXJlP1xuICAgIH1cbiAgfVxuICBpZiAoc2Vzc2lvbnBhcnQpIHtcbiAgICByZXR1cm4gU0RQVXRpbHMuZ2V0RGlyZWN0aW9uKHNlc3Npb25wYXJ0KTtcbiAgfVxuICByZXR1cm4gJ3NlbmRyZWN2Jztcbn07XG5cblNEUFV0aWxzLmdldEtpbmQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICB2YXIgbWxpbmUgPSBsaW5lc1swXS5zcGxpdCgnICcpO1xuICByZXR1cm4gbWxpbmVbMF0uc3Vic3RyKDIpO1xufTtcblxuU0RQVXRpbHMuaXNSZWplY3RlZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICByZXR1cm4gbWVkaWFTZWN0aW9uLnNwbGl0KCcgJywgMilbMV0gPT09ICcwJztcbn07XG5cblNEUFV0aWxzLnBhcnNlTUxpbmUgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICB2YXIgbWxpbmUgPSBsaW5lc1swXS5zcGxpdCgnICcpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IG1saW5lWzBdLnN1YnN0cigyKSxcbiAgICBwb3J0OiBwYXJzZUludChtbGluZVsxXSwgMTApLFxuICAgIHByb3RvY29sOiBtbGluZVsyXSxcbiAgICBmbXQ6IG1saW5lLnNsaWNlKDMpLmpvaW4oJyAnKVxuICB9O1xufTtcblxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gU0RQVXRpbHM7XG59XG4iXX0=
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\sdp\\sdp.js","/..\\node_modules\\sdp")
},{"2ionoC":3,"buffer":2}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */

'use strict';

var adapterFactory = require('./adapter_factory.js');
module.exports = adapterFactory({ window: global.window });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkYXB0ZXJfY29yZS5qcyJdLCJuYW1lcyI6WyJhZGFwdGVyRmFjdG9yeSIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwid2luZG93IiwiZ2xvYmFsIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQU9DOztBQUVEOztBQUVBLElBQUlBLGlCQUFpQkMsUUFBUSxzQkFBUixDQUFyQjtBQUNBQyxPQUFPQyxPQUFQLEdBQWlCSCxlQUFlLEVBQUNJLFFBQVFDLE9BQU9ELE1BQWhCLEVBQWYsQ0FBakIiLCJmaWxlIjoiYWRhcHRlcl9jb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGFkYXB0ZXJGYWN0b3J5ID0gcmVxdWlyZSgnLi9hZGFwdGVyX2ZhY3RvcnkuanMnKTtcbm1vZHVsZS5leHBvcnRzID0gYWRhcHRlckZhY3Rvcnkoe3dpbmRvdzogZ2xvYmFsLndpbmRvd30pO1xuIl19
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\webrtc-adapter\\src\\js\\adapter_core.js","/..\\node_modules\\webrtc-adapter\\src\\js")
},{"./adapter_factory.js":8,"2ionoC":3,"buffer":2}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */

'use strict';

var utils = require('./utils');
// Shimming starts here.
module.exports = function (dependencies, opts) {
  var window = dependencies && dependencies.window;

  var options = {
    shimChrome: true,
    shimFirefox: true,
    shimEdge: true,
    shimSafari: true
  };

  for (var key in opts) {
    if (hasOwnProperty.call(opts, key)) {
      options[key] = opts[key];
    }
  }

  // Utils.
  var logging = utils.log;
  var browserDetails = utils.detectBrowser(window);

  // Export to the adapter global object visible in the browser.
  var adapter = {
    browserDetails: browserDetails,
    extractVersion: utils.extractVersion,
    disableLog: utils.disableLog,
    disableWarnings: utils.disableWarnings
  };

  // Uncomment the line below if you want logging to occur, including logging
  // for the switch statement below. Can also be turned on in the browser via
  // adapter.disableLog(false), but then logging from the switch statement below
  // will not appear.
  // require('./utils').disableLog(false);

  // Browser shims.
  var chromeShim = require('./chrome/chrome_shim') || null;
  var edgeShim = require('./edge/edge_shim') || null;
  var firefoxShim = require('./firefox/firefox_shim') || null;
  var safariShim = require('./safari/safari_shim') || null;
  var commonShim = require('./common_shim') || null;

  // Shim browser if found.
  switch (browserDetails.browser) {
    case 'chrome':
      if (!chromeShim || !chromeShim.shimPeerConnection || !options.shimChrome) {
        logging('Chrome shim is not included in this adapter release.');
        return adapter;
      }
      logging('adapter.js shimming chrome.');
      // Export to the adapter global object visible in the browser.
      adapter.browserShim = chromeShim;
      commonShim.shimCreateObjectURL(window);

      chromeShim.shimGetUserMedia(window);
      chromeShim.shimMediaStream(window);
      chromeShim.shimSourceObject(window);
      chromeShim.shimPeerConnection(window);
      chromeShim.shimOnTrack(window);
      chromeShim.shimAddTrackRemoveTrack(window);
      chromeShim.shimGetSendersWithDtmf(window);

      commonShim.shimRTCIceCandidate(window);
      break;
    case 'firefox':
      if (!firefoxShim || !firefoxShim.shimPeerConnection || !options.shimFirefox) {
        logging('Firefox shim is not included in this adapter release.');
        return adapter;
      }
      logging('adapter.js shimming firefox.');
      // Export to the adapter global object visible in the browser.
      adapter.browserShim = firefoxShim;
      commonShim.shimCreateObjectURL(window);

      firefoxShim.shimGetUserMedia(window);
      firefoxShim.shimSourceObject(window);
      firefoxShim.shimPeerConnection(window);
      firefoxShim.shimOnTrack(window);

      commonShim.shimRTCIceCandidate(window);
      break;
    case 'edge':
      if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
        logging('MS edge shim is not included in this adapter release.');
        return adapter;
      }
      logging('adapter.js shimming edge.');
      // Export to the adapter global object visible in the browser.
      adapter.browserShim = edgeShim;
      commonShim.shimCreateObjectURL(window);

      edgeShim.shimGetUserMedia(window);
      edgeShim.shimPeerConnection(window);
      edgeShim.shimReplaceTrack(window);

      // the edge shim implements the full RTCIceCandidate object.
      break;
    case 'safari':
      if (!safariShim || !options.shimSafari) {
        logging('Safari shim is not included in this adapter release.');
        return adapter;
      }
      logging('adapter.js shimming safari.');
      // Export to the adapter global object visible in the browser.
      adapter.browserShim = safariShim;
      commonShim.shimCreateObjectURL(window);

      safariShim.shimRTCIceServerUrls(window);
      safariShim.shimCallbacksAPI(window);
      safariShim.shimLocalStreamsAPI(window);
      safariShim.shimRemoteStreamsAPI(window);
      safariShim.shimTrackEventTransceiver(window);
      safariShim.shimGetUserMedia(window);
      safariShim.shimCreateOfferLegacy(window);

      commonShim.shimRTCIceCandidate(window);
      break;
    default:
      logging('Unsupported browser!');
      break;
  }

  return adapter;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkYXB0ZXJfZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiZGVwZW5kZW5jaWVzIiwib3B0cyIsIndpbmRvdyIsIm9wdGlvbnMiLCJzaGltQ2hyb21lIiwic2hpbUZpcmVmb3giLCJzaGltRWRnZSIsInNoaW1TYWZhcmkiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJsb2dnaW5nIiwibG9nIiwiYnJvd3NlckRldGFpbHMiLCJkZXRlY3RCcm93c2VyIiwiYWRhcHRlciIsImV4dHJhY3RWZXJzaW9uIiwiZGlzYWJsZUxvZyIsImRpc2FibGVXYXJuaW5ncyIsImNocm9tZVNoaW0iLCJlZGdlU2hpbSIsImZpcmVmb3hTaGltIiwic2FmYXJpU2hpbSIsImNvbW1vblNoaW0iLCJicm93c2VyIiwic2hpbVBlZXJDb25uZWN0aW9uIiwiYnJvd3NlclNoaW0iLCJzaGltQ3JlYXRlT2JqZWN0VVJMIiwic2hpbUdldFVzZXJNZWRpYSIsInNoaW1NZWRpYVN0cmVhbSIsInNoaW1Tb3VyY2VPYmplY3QiLCJzaGltT25UcmFjayIsInNoaW1BZGRUcmFja1JlbW92ZVRyYWNrIiwic2hpbUdldFNlbmRlcnNXaXRoRHRtZiIsInNoaW1SVENJY2VDYW5kaWRhdGUiLCJzaGltUmVwbGFjZVRyYWNrIiwic2hpbVJUQ0ljZVNlcnZlclVybHMiLCJzaGltQ2FsbGJhY2tzQVBJIiwic2hpbUxvY2FsU3RyZWFtc0FQSSIsInNoaW1SZW1vdGVTdHJlYW1zQVBJIiwic2hpbVRyYWNrRXZlbnRUcmFuc2NlaXZlciIsInNoaW1DcmVhdGVPZmZlckxlZ2FjeSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFPQzs7QUFFRDs7QUFFQSxJQUFJQSxRQUFRQyxRQUFRLFNBQVIsQ0FBWjtBQUNBO0FBQ0FDLE9BQU9DLE9BQVAsR0FBaUIsVUFBU0MsWUFBVCxFQUF1QkMsSUFBdkIsRUFBNkI7QUFDNUMsTUFBSUMsU0FBU0YsZ0JB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LFFBQXRCO0FBQ0FHLGlCQUFXSSxtQkFBWCxDQUErQnpCLE1BQS9COztBQUVBa0IsZUFBU1EsZ0JBQVQsQ0FBMEIxQixNQUExQjtBQUNBa0IsZUFBU0ssa0JBQVQsQ0FBNEJ2QixNQUE1QjtBQUNBa0IsZUFBU2UsZ0JBQVQsQ0FBMEJqQyxNQUExQjs7QUFFQTtBQUNBO0FBQ0YsU0FBSyxRQUFMO0FBQ0UsVUFBSSxDQUFDb0IsVUFBRCxJQUFlLENBQUNuQixRQUFRSSxVQUE1QixFQUF3QztBQUN0Q0ksZ0JBQVEsc0RBQVI7QUFDQSxlQUFPSSxPQUFQO0FBQ0Q7QUFDREosY0FBUSw2QkFBUjtBQUNBO0FBQ0FJLGNBQVFXLFdBQVIsR0FBc0JKLFVBQXRCO0FBQ0FDLGlCQUFXSSxtQkFBWCxDQUErQnpCLE1BQS9COztBQUVBb0IsaUJBQVdjLG9CQUFYLENBQWdDbEMsTUFBaEM7QUFDQW9CLGlCQUFXZSxnQkFBWCxDQUE0Qm5DLE1BQTVCO0FBQ0FvQixpQkFBV2dCLG1CQUFYLENBQStCcEMsTUFBL0I7QUFDQW9CLGlCQUFXaUIsb0JBQVgsQ0FBZ0NyQyxNQUFoQztBQUNBb0IsaUJBQVdrQix5QkFBWCxDQUFxQ3RDLE1BQXJDO0FBQ0FvQixpQkFBV00sZ0JBQVgsQ0FBNEIxQixNQUE1QjtBQUNBb0IsaUJBQVdtQixxQkFBWCxDQUFpQ3ZDLE1BQWpDOztBQUVBcUIsaUJBQVdXLG1CQUFYLENBQStCaEMsTUFBL0I7QUFDQTtBQUNGO0FBQ0VTLGNBQVEsc0JBQVI7QUFDQTtBQTlFSjs7QUFpRkEsU0FBT0ksT0FBUDtBQUNELENBNUhEIiwiZmlsZSI6ImFkYXB0ZXJfZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbi8vIFNoaW1taW5nIHN0YXJ0cyBoZXJlLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkZXBlbmRlbmNpZXMsIG9wdHMpIHtcbiAgdmFyIHdpbmRvdyA9IGRlcGVuZGVuY2llcyAmJiBkZXBlbmRlbmNpZXMud2luZG93O1xuXG4gIHZhciBvcHRpb25zID0ge1xuICAgIHNoaW1DaHJvbWU6IHRydWUsXG4gICAgc2hpbUZpcmVmb3g6IHRydWUsXG4gICAgc2hpbUVkZ2U6IHRydWUsXG4gICAgc2hpbVNhZmFyaTogdHJ1ZSxcbiAgfTtcblxuICBmb3IgKHZhciBrZXkgaW4gb3B0cykge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdHMsIGtleSkpIHtcbiAgICAgIG9wdGlvbnNba2V5XSA9IG9wdHNba2V5XTtcbiAgICB9XG4gIH1cblxuICAvLyBVdGlscy5cbiAgdmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XG4gIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcblxuICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICB2YXIgYWRhcHRlciA9IHtcbiAgICBicm93c2VyRGV0YWlsczogYnJvd3NlckRldGFpbHMsXG4gICAgZXh0cmFjdFZlcnNpb246IHV0aWxzLmV4dHJhY3RWZXJzaW9uLFxuICAgIGRpc2FibGVMb2c6IHV0aWxzLmRpc2FibGVMb2csXG4gICAgZGlzYWJsZVdhcm5pbmdzOiB1dGlscy5kaXNhYmxlV2FybmluZ3NcbiAgfTtcblxuICAvLyBVbmNvbW1lbnQgdGhlIGxpbmUgYmVsb3cgaWYgeW91IHdhbnQgbG9nZ2luZyB0byBvY2N1ciwgaW5jbHVkaW5nIGxvZ2dpbmdcbiAgLy8gZm9yIHRoZSBzd2l0Y2ggc3RhdGVtZW50IGJlbG93LiBDYW4gYWxzbyBiZSB0dXJuZWQgb24gaW4gdGhlIGJyb3dzZXIgdmlhXG4gIC8vIGFkYXB0ZXIuZGlzYWJsZUxvZyhmYWxzZSksIGJ1dCB0aGVuIGxvZ2dpbmcgZnJvbSB0aGUgc3dpdGNoIHN0YXRlbWVudCBiZWxvd1xuICAvLyB3aWxsIG5vdCBhcHBlYXIuXG4gIC8vIHJlcXVpcmUoJy4vdXRpbHMnKS5kaXNhYmxlTG9nKGZhbHNlKTtcblxuICAvLyBCcm93c2VyIHNoaW1zLlxuICB2YXIgY2hyb21lU2hpbSA9IHJlcXVpcmUoJy4vY2hyb21lL2Nocm9tZV9zaGltJykgfHwgbnVsbDtcbiAgdmFyIGVkZ2VTaGltID0gcmVxdWlyZSgnLi9lZGdlL2VkZ2Vfc2hpbScpIHx8IG51bGw7XG4gIHZhciBmaXJlZm94U2hpbSA9IHJlcXVpcmUoJy4vZmlyZWZveC9maXJlZm94X3NoaW0nKSB8fCBudWxsO1xuICB2YXIgc2FmYXJpU2hpbSA9IHJlcXVpcmUoJy4vc2FmYXJpL3NhZmFyaV9zaGltJykgfHwgbnVsbDtcbiAgdmFyIGNvbW1vblNoaW0gPSByZXF1aXJlKCcuL2NvbW1vbl9zaGltJykgfHwgbnVsbDtcblxuICAvLyBTaGltIGJyb3dzZXIgaWYgZm91bmQuXG4gIHN3aXRjaCAoYnJvd3NlckRldGFpbHMuYnJvd3Nlcikge1xuICAgIGNhc2UgJ2Nocm9tZSc6XG4gICAgICBpZiAoIWNocm9tZVNoaW0gfHwgIWNocm9tZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uIHx8XG4gICAgICAgICAgIW9wdGlvbnMuc2hpbUNocm9tZSkge1xuICAgICAgICBsb2dnaW5nKCdDaHJvbWUgc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBjaHJvbWUuJyk7XG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IGNocm9tZVNoaW07XG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcblxuICAgICAgY2hyb21lU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1NZWRpYVN0cmVhbSh3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltU291cmNlT2JqZWN0KHdpbmRvdyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1QZWVyQ29ubmVjdGlvbih3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltT25UcmFjayh3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltQWRkVHJhY2tSZW1vdmVUcmFjayh3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltR2V0U2VuZGVyc1dpdGhEdG1mKHdpbmRvdyk7XG5cbiAgICAgIGNvbW1vblNoaW0uc2hpbVJUQ0ljZUNhbmRpZGF0ZSh3aW5kb3cpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZmlyZWZveCc6XG4gICAgICBpZiAoIWZpcmVmb3hTaGltIHx8ICFmaXJlZm94U2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHxcbiAgICAgICAgICAhb3B0aW9ucy5zaGltRmlyZWZveCkge1xuICAgICAgICBsb2dnaW5nKCdGaXJlZm94IHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xuICAgICAgICByZXR1cm4gYWRhcHRlcjtcbiAgICAgIH1cbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgZmlyZWZveC4nKTtcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXG4gICAgICBhZGFwdGVyLmJyb3dzZXJTaGltID0gZmlyZWZveFNoaW07XG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcblxuICAgICAgZmlyZWZveFNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbVNvdXJjZU9iamVjdCh3aW5kb3cpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbVBlZXJDb25uZWN0aW9uKHdpbmRvdyk7XG4gICAgICBmaXJlZm94U2hpbS5zaGltT25UcmFjayh3aW5kb3cpO1xuXG4gICAgICBjb21tb25TaGltLnNoaW1SVENJY2VDYW5kaWRhdGUod2luZG93KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2VkZ2UnOlxuICAgICAgaWYgKCFlZGdlU2hpbSB8fCAhZWRnZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uIHx8ICFvcHRpb25zLnNoaW1FZGdlKSB7XG4gICAgICAgIGxvZ2dpbmcoJ01TIGVkZ2Ugc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBlZGdlLicpO1xuICAgICAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBlZGdlU2hpbTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbUNyZWF0ZU9iamVjdFVSTCh3aW5kb3cpO1xuXG4gICAgICBlZGdlU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XG4gICAgICBlZGdlU2hpbS5zaGltUGVlckNvbm5lY3Rpb24od2luZG93KTtcbiAgICAgIGVkZ2VTaGltLnNoaW1SZXBsYWNlVHJhY2sod2luZG93KTtcblxuICAgICAgLy8gdGhlIGVkZ2Ugc2hpbSBpbXBsZW1lbnRzIHRoZSBmdWxsIFJUQ0ljZUNhbmRpZGF0ZSBvYmplY3QuXG4gICAgICBicmVhaztcbiAgICBjYXNlICdzYWZhcmknOlxuICAgICAgaWYgKCFzYWZhcmlTaGltIHx8ICFvcHRpb25zLnNoaW1TYWZhcmkpIHtcbiAgICAgICAgbG9nZ2luZygnU2FmYXJpIHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xuICAgICAgICByZXR1cm4gYWRhcHRlcjtcbiAgICAgIH1cbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgc2FmYXJpLicpO1xuICAgICAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBzYWZhcmlTaGltO1xuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XG5cbiAgICAgIHNhZmFyaVNoaW0uc2hpbVJUQ0ljZVNlcnZlclVybHMod2luZG93KTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUNhbGxiYWNrc0FQSSh3aW5kb3cpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltTG9jYWxTdHJlYW1zQVBJKHdpbmRvdyk7XG4gICAgICBzYWZhcmlTaGltLnNoaW1SZW1vdGVTdHJlYW1zQVBJKHdpbmRvdyk7XG4gICAgICBzYWZhcmlTaGltLnNoaW1UcmFja0V2ZW50VHJhbnNjZWl2ZXIod2luZG93KTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltQ3JlYXRlT2ZmZXJMZWdhY3kod2luZG93KTtcblxuICAgICAgY29tbW9uU2hpbS5zaGltUlRDSWNlQ2FuZGlkYXRlKHdpbmRvdyk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2luZygnVW5zdXBwb3J0ZWQgYnJvd3NlciEnKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIGFkYXB0ZXI7XG59O1xuIl19
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\webrtc-adapter\\src\\js\\adapter_factory.js","/..\\node_modules\\webrtc-adapter\\src\\js")
},{"./chrome/chrome_shim":9,"./common_shim":11,"./edge/edge_shim":12,"./firefox/firefox_shim":14,"./safari/safari_shim":16,"./utils":17,"2ionoC":3,"buffer":2}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){

/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = require('../utils.js');
var logging = utils.log;

var chromeShim = {
  shimMediaStream: function shimMediaStream(window) {
    window.MediaStream = window.MediaStream || window.webkitMediaStream;
  },

  shimOnTrack: function shimOnTrack(window) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
        get: function get() {
          return this._ontrack;
        },
        set: function set(f) {
          if (this._ontrack) {
            this.removeEventListener('track', this._ontrack);
          }
          this.addEventListener('track', this._ontrack = f);
        }
      });
      var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
      window.RTCPeerConnection.prototype.setRemoteDescription = function () {
        var pc = this;
        if (!pc._ontrackpoly) {
          pc._ontrackpoly = function (e) {
            // onaddstream does not fire when a track is added to an existing
            // stream. But stream.onaddtrack is implemented so we use that.
            e.stream.addEventListener('addtrack', function (te) {
              var receiver;
              if (window.RTCPeerConnection.prototype.getReceivers) {
                receiver = pc.getReceivers().find(function (r) {
                  return r.track && r.track.id === te.track.id;
                });
              } else {
                receiver = { track: te.track };
              }

              var event = new Event('track');
              event.track = te.track;
              event.receiver = receiver;
              event.transceiver = { receiver: receiver };
              event.streams = [e.stream];
              pc.dispatchEvent(event);
            });
            e.stream.getTracks().forEach(function (track) {
              var receiver;
              if (window.RTCPeerConnection.prototype.getReceivers) {
                receiver = pc.getReceivers().find(function (r) {
                  return r.track && r.track.id === track.id;
                });
              } else {
                receiver = { track: track };
              }
              var event = new Event('track');
              event.track = track;
              event.receiver = receiver;
              event.transceiver = { receiver: receiver };
              event.streams = [e.stream];
              pc.dispatchEvent(event);
            });
          };
          pc.addEventListener('addstream', pc._ontrackpoly);
        }
        return origSetRemoteDescription.apply(pc, arguments);
      };
    }
  },

  shimGetSendersWithDtmf: function shimGetSendersWithDtmf(window) {
    // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
      var shimSenderWithDtmf = function shimSenderWithDtmf(pc, track) {
        return {
          track: track,
          get dtmf() {
            if (this._dtmf === undefined) {
              if (track.kind === 'audio') {
                this._dtmf = pc.createDTMFSender(track);
              } else {
                this._dtmf = null;
              }
            }
            return this._dtmf;
          },
          _pc: pc
        };
      };

      // augment addTrack when getSenders is not available.
      if (!window.RTCPeerConnection.prototype.getSenders) {
        window.RTCPeerConnection.prototype.getSenders = function () {
          this._senders = this._senders || [];
          return this._senders.slice(); // return a copy of the internal state.
        };
        var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
        window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
          var pc = this;
          var sender = origAddTrack.apply(pc, arguments);
          if (!sender) {
            sender = shimSenderWithDtmf(pc, track);
            pc._senders.push(sender);
          }
          return sender;
        };

        var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
        window.RTCPeerConnection.prototype.removeTrack = function (sender) {
          var pc = this;
          origRemoveTrack.apply(pc, arguments);
          var idx = pc._senders.indexOf(sender);
          if (idx !== -1) {
            pc._senders.splice(idx, 1);
          }
        };
      }
      var origAddStream = window.RTCPeerConnection.prototype.addStream;
      window.RTCPeerConnection.prototype.addStream = function (stream) {
        var pc = this;
        pc._senders = pc._senders || [];
        origAddStream.apply(pc, [stream]);
        stream.getTracks().forEach(function (track) {
          pc._senders.push(shimSenderWithDtmf(pc, track));
        });
      };

      var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
      window.RTCPeerConnection.prototype.removeStream = function (stream) {
        var pc = this;
        pc._senders = pc._senders || [];
        origRemoveStream.apply(pc, [stream]);

        stream.getTracks().forEach(function (track) {
          var sender = pc._senders.find(function (s) {
            return s.track === track;
          });
          if (sender) {
            pc._senders.splice(pc._senders.indexOf(sender), 1); // remove sender
          }
        });
      };
    } else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
      var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
      window.RTCPeerConnection.prototype.getSenders = function () {
        var pc = this;
        var senders = origGetSenders.apply(pc, []);
        senders.forEach(function (sender) {
          sender._pc = pc;
        });
        return senders;
      };

      Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
        get: function get() {
          if (this._dtmf === undefined) {
            if (this.track.kind === 'audio') {
              this._dtmf = this._pc.createDTMFSender(this.track);
            } else {
              this._dtmf = null;
            }
          }
          return this._dtmf;
        }
      });
    }
  },

  shimSourceObject: function shimSourceObject(window) {
    var URL = window && window.URL;

    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
      if (window.HTMLMediaElement && !('srcObject' in window.HTMLMediaElement.prototype)) {
        // Shim the srcObject property, once, when HTMLMediaElement is found.
        Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
          get: function get() {
            return this._srcObject;
          },
          set: function set(stream) {
            var self = this;
            // Use _srcObject as a private property for this shim
            this._srcObject = stream;
            if (this.src) {
              URL.revokeObjectURL(this.src);
            }

            if (!stream) {
              this.src = '';
              return undefined;
            }
            this.src = URL.createObjectURL(stream);
            // We need to recreate the blob url when a track is added or
            // removed. Doing it manually since we want to avoid a recursion.
            stream.addEventListener('addtrack', function () {
              if (self.src) {
                URL.revokeObjectURL(self.src);
              }
              self.src = URL.createObjectURL(stream);
            });
            stream.addEventListener('removetrack', function () {
              if (self.src) {
                URL.revokeObjectURL(self.src);
              }
              self.src = URL.createObjectURL(stream);
            });
          }
        });
      }
    }
  },

  shimAddTrackRemoveTrack: function shimAddTrackRemoveTrack(window) {
    var browserDetails = utils.detectBrowser(window);
    // shim addTrack and removeTrack.
    if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 63) {
      return;
    }

    // also shim pc.getLocalStreams when addTrack is shimmed
    // to return the original streams.
    var origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
    window.RTCPeerConnection.prototype.getLocalStreams = function () {
      var self = this;
      var nativeStreams = origGetLocalStreams.apply(this);
      self._reverseStreams = self._reverseStreams || {};
      return nativeStreams.map(function (stream) {
        return self._reverseStreams[stream.id];
      });
    };

    var origAddStream = window.RTCPeerConnection.prototype.addStream;
    window.RTCPeerConnection.prototype.addStream = function (stream) {
      var pc = this;
      pc._streams = pc._streams || {};
      pc._reverseStreams = pc._reverseStreams || {};

      stream.getTracks().forEach(function (track) {
        var alreadyExists = pc.getSenders().find(function (s) {
          return s.track === track;
        });
        if (alreadyExists) {
          throw new DOMException('Track already exists.', 'InvalidAccessError');
        }
      });
      // Add identity mapping for consistency with addTrack.
      // Unless this is being used with a stream from addTrack.
      if (!pc._reverseStreams[stream.id]) {
        var newStream = new window.MediaStream(stream.getTracks());
        pc._streams[stream.id] = newStream;
        pc._reverseStreams[newStream.id] = stream;
        stream = newStream;
      }
      origAddStream.apply(pc, [stream]);
    };

    var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
    window.RTCPeerConnection.prototype.removeStream = function (stream) {
      var pc = this;
      pc._streams = pc._streams || {};
      pc._reverseStreams = pc._reverseStreams || {};

      origRemoveStream.apply(pc, [pc._streams[stream.id] || stream]);
      delete pc._reverseStreams[pc._streams[stream.id] ? pc._streams[stream.id].id : stream.id];
      delete pc._streams[stream.id];
    };

    window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
      var pc = this;
      if (pc.signalingState === 'closed') {
        throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
      }
      var streams = [].slice.call(arguments, 1);
      if (streams.length !== 1 || !streams[0].getTracks().find(function (t) {
        return t === track;
      })) {
        // this is not fully correct but all we can manage without
        // [[associated MediaStreams]] internal slot.
        throw new DOMException('The adapter.js addTrack polyfill only supports a single ' + ' stream which is associated with the specified track.', 'NotSupportedError');
      }

      var alreadyExists = pc.getSenders().find(function (s) {
        return s.track === track;
      });
      if (alreadyExists) {
        throw new DOMException('Track already exists.', 'InvalidAccessError');
      }

      pc._streams = pc._streams || {};
      pc._reverseStreams = pc._reverseStreams || {};
      var oldStream = pc._streams[stream.id];
      if (oldStream) {
        // this is using odd Chrome behaviour, use with caution:
        // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
        // Note: we rely on the high-level addTrack/dtmf shim to
        // create the sender with a dtmf sender.
        oldStream.addTrack(track);

        // Trigger ONN async.
        Promise.resolve().then(function () {
          pc.dispatchEvent(new Event('negotiationneeded'));
        });
      } else {
        var newStream = new window.MediaStream([track]);
        pc._streams[stream.id] = newStream;
        pc._reverseStreams[newStream.id] = stream;
        pc.addStream(newStream);
      }
      return pc.getSenders().find(function (s) {
        return s.track === track;
      });
    };

    // replace the internal stream id with the external one and
    // vice versa.
    function replaceInternalStreamId(pc, description) {
      var sdp = description.sdp;
      Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
        var externalStream = pc._reverseStreams[internalId];
        var internalStream = pc._streams[externalStream.id];
        sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
      });
      return new RTCSessionDescription({
        type: description.type,
        sdp: sdp
      });
    }
    function replaceExternalStreamId(pc, description) {
      var sdp = description.sdp;
      Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
        var externalStream = pc._reverseStreams[internalId];
        var internalStream = pc._streams[externalStream.id];
        sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
      });
      return new RTCSessionDescription({
        type: description.type,
        sdp: sdp
      });
    }
    ['createOffer', 'createAnswer'].forEach(function (method) {
      var nativeMethod = window.RTCPeerConnection.prototype[method];
      window.RTCPeerConnection.prototype[method] = function () {
        var pc = this;
        var args = arguments;
        var isLegacyCall = arguments.length && typeof arguments[0] === 'function';
        if (isLegacyCall) {
          return nativeMethod.apply(pc, [function (description) {
            var desc = replaceInternalStreamId(pc, description);
            args[0].apply(null, [desc]);
          }, function (err) {
            if (args[1]) {
              args[1].apply(null, err);
            }
          }, arguments[2]]);
        }
        return nativeMethod.apply(pc, arguments).then(function (description) {
          return replaceInternalStreamId(pc, description);
        });
      };
    });

    var origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
    window.RTCPeerConnection.prototype.setLocalDescription = function () {
      var pc = this;
      if (!arguments.length || !arguments[0].type) {
        return origSetLocalDescription.apply(pc, arguments);
      }
      arguments[0] = replaceExternalStreamId(pc, arguments[0]);
      return origSetLocalDescription.apply(pc, arguments);
    };

    // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

    var origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
    Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
      get: function get() {
        var pc = this;
        var description = origLocalDescription.get.apply(this);
        if (description.type === '') {
          return description;
        }
        return replaceInternalStreamId(pc, description);
      }
    });

    window.RTCPeerConnection.prototype.removeTrack = function (sender) {
      var pc = this;
      if (pc.signalingState === 'closed') {
        throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
      }
      // We can not yet check for sender instanceof RTCRtpSender
      // since we shim RTPSender. So we check if sender._pc is set.
      if (!sender._pc) {
        throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.', 'TypeError');
      }
      var isLocal = sender._pc === pc;
      if (!isLocal) {
        throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
      }

      // Search for the native stream the senders track belongs to.
      pc._streams = pc._streams || {};
      var stream;
      Object.keys(pc._streams).forEach(function (streamid) {
        var hasTrack = pc._streams[streamid].getTracks().find(function (track) {
          return sender.track === track;
        });
        if (hasTrack) {
          stream = pc._streams[streamid];
        }
      });

      if (stream) {
        if (stream.getTracks().length === 1) {
          // if this is the last track of the stream, remove the stream. This
          // takes care of any shimmed _senders.
          pc.removeStream(pc._reverseStreams[stream.id]);
        } else {
          // relying on the same odd chrome behaviour as above.
          stream.removeTrack(sender.track);
        }
        pc.dispatchEvent(new Event('negotiationneeded'));
      }
    };
  },

  shimPeerConnection: function shimPeerConnection(window) {
    var browserDetails = utils.detectBrowser(window);

    // The RTCPeerConnection object.
    if (!window.RTCPeerConnection) {
      window.RTCPeerConnection = function (pcConfig, pcConstraints) {
        // Translate iceTransportPolicy to iceTransports,
        // see https://code.google.com/p/webrtc/issues/detail?id=4869
        // this was fixed in M56 along with unprefixing RTCPeerConnection.
        logging('PeerConnection');
        if (pcConfig && pcConfig.iceTransportPolicy) {
          pcConfig.iceTransports = pcConfig.iceTransportPolicy;
        }

        return new window.webkitRTCPeerConnection(pcConfig, pcConstraints);
      };
      window.RTCPeerConnection.prototype = window.webkitRTCPeerConnection.prototype;
      // wrap static methods. Currently just generateCertificate.
      if (window.webkitRTCPeerConnection.generateCertificate) {
        Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
          get: function get() {
            return window.webkitRTCPeerConnection.generateCertificate;
          }
        });
      }
    } else {
      // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
      var OrigPeerConnection = window.RTCPeerConnection;
      window.RTCPeerConnection = function (pcConfig, pcConstraints) {
        if (pcConfig && pcConfig.iceServers) {
          var newIceServers = [];
          for (var i = 0; i < pcConfig.iceServers.length; i++) {
            var server = pcConfig.iceServers[i];
            if (!server.hasOwnProperty('urls') && server.hasOwnProperty('url')) {
              utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
              server = JSON.parse(JSON.stringify(server));
              server.urls = server.url;
              newIceServers.push(server);
            } else {
              newIceServers.push(pcConfig.iceServers[i]);
            }
          }
          pcConfig.iceServers = newIceServers;
        }
        return new OrigPeerConnection(pcConfig, pcConstraints);
      };
      window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
      // wrap static methods. Currently just generateCertificate.
      Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
        get: function get() {
          return OrigPeerConnection.generateCertificate;
        }
      });
    }

    var origGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function (selector, successCallback, errorCallback) {
      var self = this;
      var args = arguments;

      // If selector is a function then we are in the old style stats so just
      // pass back the original getStats format to avoid breaking old users.
      if (arguments.length > 0 && typeof selector === 'function') {
        return origGetStats.apply(this, arguments);
      }

      // When spec-style getStats is supported, return those when called with
      // either no arguments or the selector argument is null.
      if (origGetStats.length === 0 && (arguments.length === 0 || typeof arguments[0] !== 'function')) {
        return origGetStats.apply(this, []);
      }

      var fixChromeStats_ = function fixChromeStats_(response) {
        var standardReport = {};
        var reports = response.result();
        reports.forEach(function (report) {
          var standardStats = {
            id: report.id,
            timestamp: report.timestamp,
            type: {
              localcandidate: 'local-candidate',
              remotecandidate: 'remote-candidate'
            }[report.type] || report.type
          };
          report.names().forEach(function (name) {
            standardStats[name] = report.stat(name);
          });
          standardReport[standardStats.id] = standardStats;
        });

        return standardReport;
      };

      // shim getStats with maplike support
      var makeMapStats = function makeMapStats(stats) {
        return new Map(Object.keys(stats).map(function (key) {
          return [key, stats[key]];
        }));
      };

      if (arguments.length >= 2) {
        var successCallbackWrapper_ = function successCallbackWrapper_(response) {
          args[1](makeMapStats(fixChromeStats_(response)));
        };

        return origGetStats.apply(this, [successCallbackWrapper_, arguments[0]]);
      }

      // promise-support
      return new Promise(function (resolve, reject) {
        origGetStats.apply(self, [function (response) {
          resolve(makeMapStats(fixChromeStats_(response)));
        }, reject]);
      }).then(successCallback, errorCallback);
    };

    // add promise support -- natively available in Chrome 51
    if (browserDetails.version < 51) {
      ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
        var nativeMethod = window.RTCPeerConnection.prototype[method];
        window.RTCPeerConnection.prototype[method] = function () {
          var args = arguments;
          var self = this;
          var promise = new Promise(function (resolve, reject) {
            nativeMethod.apply(self, [args[0], resolve, reject]);
          });
          if (args.length < 2) {
            return promise;
          }
          return promise.then(function () {
            args[1].apply(null, []);
          }, function (err) {
            if (args.length >= 3) {
              args[2].apply(null, [err]);
            }
          });
        };
      });
    }

    // promise support for createOffer and createAnswer. Available (without
    // bugs) since M52: crbug/619289
    if (browserDetails.version < 52) {
      ['createOffer', 'createAnswer'].forEach(function (method) {
        var nativeMethod = window.RTCPeerConnection.prototype[method];
        window.RTCPeerConnection.prototype[method] = function () {
          var self = this;
          if (arguments.length < 1 || arguments.length === 1 && _typeof(arguments[0]) === 'object') {
            var opts = arguments.length === 1 ? arguments[0] : undefined;
            return new Promise(function (resolve, reject) {
              nativeMethod.apply(self, [resolve, reject, opts]);
            });
          }
          return nativeMethod.apply(this, arguments);
        };
      });
    }

    // shim implicit creation of RTCSessionDescription/RTCIceCandidate
    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
      var nativeMethod = window.RTCPeerConnection.prototype[method];
      window.RTCPeerConnection.prototype[method] = function () {
        arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
        return nativeMethod.apply(this, arguments);
      };
    });

    // support for addIceCandidate(null or undefined)
    var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
    window.RTCPeerConnection.prototype.addIceCandidate = function () {
      if (!arguments[0]) {
        if (arguments[1]) {
          arguments[1].apply(null);
        }
        return Promise.resolve();
      }
      return nativeAddIceCandidate.apply(this, arguments);
    };
  }
};

// Expose public methods.
module.exports = {
  shimMediaStream: chromeShim.shimMediaStream,
  shimOnTrack: chromeShim.shimOnTrack,
  shimAddTrackRemoveTrack: chromeShim.shimAddTrackRemoveTrack,
  shimGetSendersWithDtmf: chromeShim.shimGetSendersWithDtmf,
  shimSourceObject: chromeShim.shimSourceObject,
  shimPeerConnection: chromeShim.shimPeerConnection,
  shimGetUserMedia: require('./getusermedia')
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNocm9tZV9zaGltLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwicmVxdWlyZSIsImxvZ2dpbmciLCJsb2ciLCJjaHJvbWVTaGltIiwic2hpbU1lZGlhU3RyZWFtIiwid2luZG93IiwiTWVkaWFTdHJlYW0iLCJ3ZWJraXRNZWRpYVN0cmVhbSIsInNoaW1PblRyYWNrIiwiUlRDUGVlckNvbm5lY3Rpb24iLCJwcm90b3R5cGUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsIl9vbnRyYWNrIiwic2V0IiwiZiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJhZGRFdmVudExpc3RlbmVyIiwib3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uIiwic2V0UmVtb3RlRGVzY3JpcHRpb24iLCJwYyIsIl9vbnRyYWNrcG9seSIsImUiLCJzdHJlYW0iLCJ0ZSIsInJlY2VpdmVyIiwiZ2V0UmVjZWl2ZXJzIiwiZmluZCIsInIiLCJ0cmFjayIsImlkIiwiZXZlbnQiLCJFdmVudCIsInRyYW5zY2VpdmVyIiwic3RyZWFtcyIsImRpc3BhdGNoRXZlbnQiLCJnZXRUcmFja3MiLCJmb3JFYWNoIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJzaGltR2V0U2VuZGVyc1dpdGhEdG1mIiwic2hpbVNlbmRlcldpdGhEdG1mIiwiZHRtZiIsIl9kdG1mIiwidW5kZWZpbmVkIiwia2luZCIsImNyZWF0ZURUTUZTZW5kZXIiLCJfcGMiLCJnZXRTZW5kZXJzIiwiX3NlbmRlcnMiLCJzbGljZSIsIm9yaWdBZGRUcmFjayIsImFkZFRyYWNrIiwic2VuZGVyIiwicHVzaCIsIm9yaWdSZW1vdmVUcmFjayIsInJlbW92ZVRyYWNrIiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsIm9yaWdBZGRTdHJlYW0iLCJhZGRTdHJlYW0iLCJvcmlnUmVtb3ZlU3RyZWFtIiwicmVtb3ZlU3RyZWFtIiwicyIsIlJUQ1J0cFNlbmRlciIsIm9yaWdHZXRTZW5kZXJzIiwic2VuZGVycyIsInNoaW1Tb3VyY2VPYmplY3QiLCJVUkwiLCJIVE1MTWVkaWFFbGVtZW50IiwiX3NyY09iamVjdCIsInNlbGYiLCJzcmMiLCJyZXZva2VPYmplY3RVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJzaGltQWRkVHJhY2tSZW1vdmVUcmFjayIsImJyb3dzZXJEZXRhaWxzIiwiZGV0ZWN0QnJvd3NlciIsInZlcnNpb24iLCJvcmlnR2V0TG9jYWxTdHJlYW1zIiwiZ2V0TG9jYWxTdHJlYW1zIiwibmF0aXZlU3RyZWFtcyIsIl9yZXZlcnNlU3RyZWFtcyIsIm1hcCIsIl9zdHJlYW1zIiwiYWxyZWFkeUV4aXN0cyIsIkRPTUV4Y2VwdGlvbiIsIm5ld1N0cmVhbSIsInNpZ25hbGluZ1N0YXRlIiwiY2FsbCIsImxlbmd0aCIsInQiLCJvbGRTdHJlYW0iLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJyZXBsYWNlSW50ZXJuYWxTdHJlYW1JZCIsImRlc2NyaXB0aW9uIiwic2RwIiwia2V5cyIsImludGVybmFsSWQiLCJleHRlcm5hbFN0cmVhbSIsImludGVybmFsU3RyZWFtIiwicmVwbGFjZSIsIlJlZ0V4cCIsIlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiIsInR5cGUiLCJyZXBsYWNlRXh0ZXJuYWxTdHJlYW1JZCIsIm1ldGhvZCIsIm5hdGl2ZU1ldGhvZCIsImFyZ3MiLCJpc0xlZ2FjeUNhbGwiLCJkZXNjIiwiZXJyIiwib3JpZ1NldExvY2FsRGVzY3JpcHRpb24iLCJzZXRMb2NhbERlc2NyaXB0aW9uIiwib3JpZ0xvY2FsRGVzY3JpcHRpb24iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJpc0xvY2FsIiwic3RyZWFtaWQiLCJoYXNUcmFjayIsInNoaW1QZWVyQ29ubmVjdGlvbiIsInBjQ29uZmlnIiwicGNDb25zdHJhaW50cyIsImljZVRyYW5zcG9ydFBvbGljeSIsImljZVRyYW5zcG9ydHMiLCJ3ZWJraXRSVENQZWVyQ29ubmVjdGlvbiIsImdlbmVyYXRlQ2VydGlmaWNhdGUiLCJPcmlnUGVlckNvbm5lY3Rpb24iLCJpY2VTZXJ2ZXJzIiwibmV3SWNlU2VydmVycyIsImkiLCJzZXJ2ZXIiLCJoYXNPd25Qcm9wZXJ0eSIsImRlcHJlY2F0ZWQiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJ1cmxzIiwidXJsIiwib3JpZ0dldFN0YXRzIiwiZ2V0U3RhdHMiLCJzZWxlY3RvciIsInN1Y2Nlc3NDYWxsYmFjayIsImVycm9yQ2FsbGJhY2siLCJmaXhDaHJvbWVTdGF0c18iLCJyZXNwb25zZSIsInN0YW5kYXJkUmVwb3J0IiwicmVwb3J0cyIsInJlc3VsdCIsInJlcG9ydCIsInN0YW5kYXJkU3RhdHMiLCJ0aW1lc3RhbXAiLCJsb2NhbGNhbmRpZGF0ZSIsInJlbW90ZWNhbmRpZGF0ZSIsIm5hbWVzIiwibmFtZSIsInN0YXQiLCJtYWtlTWFwU3RhdHMiLCJzdGF0cyIsIk1hcCIsImtleSIsInN1Y2Nlc3NDYWxsYmFja1dyYXBwZXJfIiwicmVqZWN0IiwicHJvbWlzZSIsIm9wdHMiLCJSVENJY2VDYW5kaWRhdGUiLCJuYXRpdmVBZGRJY2VDYW5kaWRhdGUiLCJhZGRJY2VDYW5kaWRhdGUiLCJtb2R1bGUiLCJleHBvcnRzIiwic2hpbUdldFVzZXJNZWRpYSJdLCJtYXBwaW5ncyI6IjtBQUNBOzs7Ozs7O0FBT0M7QUFDRDs7OztBQUNBLElBQUlBLFFBQVFDLFFBQVEsYUFBUixDQUFaO0FBQ0EsSUFBSUMsVUFBVUYsTUFBTUcsR0FBcEI7O0FBRUEsSUFBSUMsYUFBYTtBQUNmQyxtQkFBaUIseUJBQVNDLE1BQVQsRUFBaUI7QUFDaENBLFdBQU9DLFdBQVAsR0FBcUJELE9BQU9DLFdBQVAsSUFBc0JELE9BQU9FLGlCQUFsRDtBQUNELEdBSGM7O0FBS2ZDLGVBQWEscUJBQVNILE1BQVQsRUFBaUI7QUFDNUIsUUFBSSxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQWxCLElBQThCQSxPQUFPSSxpQkFBckMsSUFBMEQsRUFBRSxhQUM1REosT0FBT0ksaUJBQVAsQ0FBeUJDLFNBRGlDLENBQTlELEVBQ3lDO0FBQ3ZDQyxhQUFPQyxjQUFQLENBQXNCUCxP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Q0FBUDtBQUNELEtBUkQ7QUFTRDtBQXRvQmMsQ0FBakI7O0FBMG9CQTtBQUNBbUksT0FBT0MsT0FBUCxHQUFpQjtBQUNmeEssbUJBQWlCRCxXQUFXQyxlQURiO0FBRWZJLGVBQWFMLFdBQVdLLFdBRlQ7QUFHZnFFLDJCQUF5QjFFLFdBQVcwRSx1QkFIckI7QUFJZnBDLDBCQUF3QnRDLFdBQVdzQyxzQkFKcEI7QUFLZjRCLG9CQUFrQmxFLFdBQVdrRSxnQkFMZDtBQU1mc0Qsc0JBQW9CeEgsV0FBV3dILGtCQU5oQjtBQU9ma0Qsb0JBQWtCN0ssUUFBUSxnQkFBUjtBQVBILENBQWpCIiwiZmlsZSI6ImNocm9tZV9zaGltLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzLmpzJyk7XG52YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcblxudmFyIGNocm9tZVNoaW0gPSB7XG4gIHNoaW1NZWRpYVN0cmVhbTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgd2luZG93Lk1lZGlhU3RyZWFtID0gd2luZG93Lk1lZGlhU3RyZWFtIHx8IHdpbmRvdy53ZWJraXRNZWRpYVN0cmVhbTtcbiAgfSxcblxuICBzaGltT25UcmFjazogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJiAhKCdvbnRyYWNrJyBpblxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbnRyYWNrJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9vbnRyYWNrO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICBpZiAodGhpcy5fb250cmFjaykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayA9IGYpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHZhciBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24gPVxuICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb247XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIGlmICghcGMuX29udHJhY2twb2x5KSB7XG4gICAgICAgICAgcGMuX29udHJhY2twb2x5ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgLy8gb25hZGRzdHJlYW0gZG9lcyBub3QgZmlyZSB3aGVuIGEgdHJhY2sgaXMgYWRkZWQgdG8gYW4gZXhpc3RpbmdcbiAgICAgICAgICAgIC8vIHN0cmVhbS4gQnV0IHN0cmVhbS5vbmFkZHRyYWNrIGlzIGltcGxlbWVudGVkIHNvIHdlIHVzZSB0aGF0LlxuICAgICAgICAgICAgZS5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignYWRkdHJhY2snLCBmdW5jdGlvbih0ZSkge1xuICAgICAgICAgICAgICB2YXIgcmVjZWl2ZXI7XG4gICAgICAgICAgICAgIGlmICh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlY2VpdmVycykge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0gcGMuZ2V0UmVjZWl2ZXJzKCkuZmluZChmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gci50cmFjayAmJiByLnRyYWNrLmlkID09PSB0ZS50cmFjay5pZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHt0cmFjazogdGUudHJhY2t9O1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xuICAgICAgICAgICAgICBldmVudC50cmFjayA9IHRlLnRyYWNrO1xuICAgICAgICAgICAgICBldmVudC5yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogcmVjZWl2ZXJ9O1xuICAgICAgICAgICAgICBldmVudC5zdHJlYW1zID0gW2Uuc3RyZWFtXTtcbiAgICAgICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGUuc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICAgICAgdmFyIHJlY2VpdmVyO1xuICAgICAgICAgICAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMpIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHBjLmdldFJlY2VpdmVycygpLmZpbmQoZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHIudHJhY2sgJiYgci50cmFjay5pZCA9PT0gdHJhY2suaWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSB7dHJhY2s6IHRyYWNrfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ3RyYWNrJyk7XG4gICAgICAgICAgICAgIGV2ZW50LnRyYWNrID0gdHJhY2s7XG4gICAgICAgICAgICAgIGV2ZW50LnJlY2VpdmVyID0gcmVjZWl2ZXI7XG4gICAgICAgICAgICAgIGV2ZW50LnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiByZWNlaXZlcn07XG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbXMgPSBbZS5zdHJlYW1dO1xuICAgICAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcGMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgcGMuX29udHJhY2twb2x5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9XG4gIH0sXG5cbiAgc2hpbUdldFNlbmRlcnNXaXRoRHRtZjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gT3ZlcnJpZGVzIGFkZFRyYWNrL3JlbW92ZVRyYWNrLCBkZXBlbmRzIG9uIHNoaW1BZGRUcmFja1JlbW92ZVRyYWNrLlxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgICAgISgnZ2V0U2VuZGVycycgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkgJiZcbiAgICAgICAgJ2NyZWF0ZURUTUZTZW5kZXInIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpIHtcbiAgICAgIHZhciBzaGltU2VuZGVyV2l0aER0bWYgPSBmdW5jdGlvbihwYywgdHJhY2spIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0cmFjazogdHJhY2ssXG4gICAgICAgICAgZ2V0IGR0bWYoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZHRtZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGlmICh0cmFjay5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IHBjLmNyZWF0ZURUTUZTZW5kZXIodHJhY2spO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZHRtZjtcbiAgICAgICAgICB9LFxuICAgICAgICAgIF9wYzogcGNcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIC8vIGF1Z21lbnQgYWRkVHJhY2sgd2hlbiBnZXRTZW5kZXJzIGlzIG5vdCBhdmFpbGFibGUuXG4gICAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycykge1xuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLl9zZW5kZXJzID0gdGhpcy5fc2VuZGVycyB8fCBbXTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fc2VuZGVycy5zbGljZSgpOyAvLyByZXR1cm4gYSBjb3B5IG9mIHRoZSBpbnRlcm5hbCBzdGF0ZS5cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG9yaWdBZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XG4gICAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgICB2YXIgc2VuZGVyID0gb3JpZ0FkZFRyYWNrLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgICAgICAgIGlmICghc2VuZGVyKSB7XG4gICAgICAgICAgICBzZW5kZXIgPSBzaGltU2VuZGVyV2l0aER0bWYocGMsIHRyYWNrKTtcbiAgICAgICAgICAgIHBjLl9zZW5kZXJzLnB1c2goc2VuZGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHNlbmRlcjtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgb3JpZ1JlbW92ZVRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjaztcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgICAgb3JpZ1JlbW92ZVRyYWNrLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgICAgICAgIHZhciBpZHggPSBwYy5fc2VuZGVycy5pbmRleE9mKHNlbmRlcik7XG4gICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHBjLl9zZW5kZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHZhciBvcmlnQWRkU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICBwYy5fc2VuZGVycyA9IHBjLl9zZW5kZXJzIHx8IFtdO1xuICAgICAgICBvcmlnQWRkU3RyZWFtLmFwcGx5KHBjLCBbc3RyZWFtXSk7XG4gICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgcGMuX3NlbmRlcnMucHVzaChzaGltU2VuZGVyV2l0aER0bWYocGMsIHRyYWNrKSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgdmFyIG9yaWdSZW1vdmVTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbTtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIHBjLl9zZW5kZXJzID0gcGMuX3NlbmRlcnMgfHwgW107XG4gICAgICAgIG9yaWdSZW1vdmVTdHJlYW0uYXBwbHkocGMsIFtzdHJlYW1dKTtcblxuICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgIHZhciBzZW5kZXIgPSBwYy5fc2VuZGVycy5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoc2VuZGVyKSB7XG4gICAgICAgICAgICBwYy5fc2VuZGVycy5zcGxpY2UocGMuX3NlbmRlcnMuaW5kZXhPZihzZW5kZXIpLCAxKTsgLy8gcmVtb3ZlIHNlbmRlclxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXG4gICAgICAgICAgICAgICAnZ2V0U2VuZGVycycgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSAmJlxuICAgICAgICAgICAgICAgJ2NyZWF0ZURUTUZTZW5kZXInIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgJiZcbiAgICAgICAgICAgICAgIHdpbmRvdy5SVENSdHBTZW5kZXIgJiZcbiAgICAgICAgICAgICAgICEoJ2R0bWYnIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xuICAgICAgdmFyIG9yaWdHZXRTZW5kZXJzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIHZhciBzZW5kZXJzID0gb3JpZ0dldFNlbmRlcnMuYXBwbHkocGMsIFtdKTtcbiAgICAgICAgc2VuZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHNlbmRlcikge1xuICAgICAgICAgIHNlbmRlci5fcGMgPSBwYztcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZW5kZXJzO1xuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlLCAnZHRtZicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5fZHRtZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50cmFjay5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSB0aGlzLl9wYy5jcmVhdGVEVE1GU2VuZGVyKHRoaXMudHJhY2spO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLl9kdG1mO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgc2hpbVNvdXJjZU9iamVjdDogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIFVSTCA9IHdpbmRvdyAmJiB3aW5kb3cuVVJMO1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAod2luZG93LkhUTUxNZWRpYUVsZW1lbnQgJiZcbiAgICAgICAgISgnc3JjT2JqZWN0JyBpbiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUpKSB7XG4gICAgICAgIC8vIFNoaW0gdGhlIHNyY09iamVjdCBwcm9wZXJ0eSwgb25jZSwgd2hlbiBIVE1MTWVkaWFFbGVtZW50IGlzIGZvdW5kLlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLCAnc3JjT2JqZWN0Jywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3JjT2JqZWN0O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIC8vIFVzZSBfc3JjT2JqZWN0IGFzIGEgcHJpdmF0ZSBwcm9wZXJ0eSBmb3IgdGhpcyBzaGltXG4gICAgICAgICAgICB0aGlzLl9zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICAgICAgICBpZiAodGhpcy5zcmMpIHtcbiAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh0aGlzLnNyYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghc3RyZWFtKSB7XG4gICAgICAgICAgICAgIHRoaXMuc3JjID0gJyc7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcbiAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gcmVjcmVhdGUgdGhlIGJsb2IgdXJsIHdoZW4gYSB0cmFjayBpcyBhZGRlZCBvclxuICAgICAgICAgICAgLy8gcmVtb3ZlZC4gRG9pbmcgaXQgbWFudWFsbHkgc2luY2Ugd2Ugd2FudCB0byBhdm9pZCBhIHJlY3Vyc2lvbi5cbiAgICAgICAgICAgIHN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdhZGR0cmFjaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoc2VsZi5zcmMpIHtcbiAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHNlbGYuc3JjKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZWxmLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3JlbW92ZXRyYWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmIChzZWxmLnNyYykge1xuICAgICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoc2VsZi5zcmMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNlbGYuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcbiAgICAvLyBzaGltIGFkZFRyYWNrIGFuZCByZW1vdmVUcmFjay5cbiAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayAmJlxuICAgICAgICBicm93c2VyRGV0YWlscy52ZXJzaW9uID49IDYzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gYWxzbyBzaGltIHBjLmdldExvY2FsU3RyZWFtcyB3aGVuIGFkZFRyYWNrIGlzIHNoaW1tZWRcbiAgICAvLyB0byByZXR1cm4gdGhlIG9yaWdpbmFsIHN0cmVhbXMuXG4gICAgdmFyIG9yaWdHZXRMb2NhbFN0cmVhbXMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlXG4gICAgICAgIC5nZXRMb2NhbFN0cmVhbXM7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRMb2NhbFN0cmVhbXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBuYXRpdmVTdHJlYW1zID0gb3JpZ0dldExvY2FsU3RyZWFtcy5hcHBseSh0aGlzKTtcbiAgICAgIHNlbGYuX3JldmVyc2VTdHJlYW1zID0gc2VsZi5fcmV2ZXJzZVN0cmVhbXMgfHwge307XG4gICAgICByZXR1cm4gbmF0aXZlU3RyZWFtcy5tYXAoZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIHJldHVybiBzZWxmLl9yZXZlcnNlU3RyZWFtc1tzdHJlYW0uaWRdO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBvcmlnQWRkU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW07XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xuICAgICAgcGMuX3JldmVyc2VTdHJlYW1zID0gcGMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xuXG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xuICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1RyYWNrIGFscmVhZHkgZXhpc3RzLicsXG4gICAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBBZGQgaWRlbnRpdHkgbWFwcGluZyBmb3IgY29uc2lzdGVuY3kgd2l0aCBhZGRUcmFjay5cbiAgICAgIC8vIFVubGVzcyB0aGlzIGlzIGJlaW5nIHVzZWQgd2l0aCBhIHN0cmVhbSBmcm9tIGFkZFRyYWNrLlxuICAgICAgaWYgKCFwYy5fcmV2ZXJzZVN0cmVhbXNbc3RyZWFtLmlkXSkge1xuICAgICAgICB2YXIgbmV3U3RyZWFtID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbShzdHJlYW0uZ2V0VHJhY2tzKCkpO1xuICAgICAgICBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdID0gbmV3U3RyZWFtO1xuICAgICAgICBwYy5fcmV2ZXJzZVN0cmVhbXNbbmV3U3RyZWFtLmlkXSA9IHN0cmVhbTtcbiAgICAgICAgc3RyZWFtID0gbmV3U3RyZWFtO1xuICAgICAgfVxuICAgICAgb3JpZ0FkZFN0cmVhbS5hcHBseShwYywgW3N0cmVhbV0pO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ1JlbW92ZVN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgcGMuX3N0cmVhbXMgPSBwYy5fc3RyZWFtcyB8fCB7fTtcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcblxuICAgICAgb3JpZ1JlbW92ZVN0cmVhbS5hcHBseShwYywgWyhwYy5fc3RyZWFtc1tzdHJlYW0uaWRdIHx8IHN0cmVhbSldKTtcbiAgICAgIGRlbGV0ZSBwYy5fcmV2ZXJzZVN0cmVhbXNbKHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gP1xuICAgICAgICAgIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0uaWQgOiBzdHJlYW0uaWQpXTtcbiAgICAgIGRlbGV0ZSBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdO1xuICAgIH07XG5cbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIGlmIChwYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcbiAgICAgICAgICAnVGhlIFJUQ1BlZXJDb25uZWN0aW9uXFwncyBzaWduYWxpbmdTdGF0ZSBpcyBcXCdjbG9zZWRcXCcuJyxcbiAgICAgICAgICAnSW52YWxpZFN0YXRlRXJyb3InKTtcbiAgICAgIH1cbiAgICAgIHZhciBzdHJlYW1zID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgaWYgKHN0cmVhbXMubGVuZ3RoICE9PSAxIHx8XG4gICAgICAgICAgIXN0cmVhbXNbMF0uZ2V0VHJhY2tzKCkuZmluZChmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICByZXR1cm4gdCA9PT0gdHJhY2s7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgLy8gdGhpcyBpcyBub3QgZnVsbHkgY29ycmVjdCBidXQgYWxsIHdlIGNhbiBtYW5hZ2Ugd2l0aG91dFxuICAgICAgICAvLyBbW2Fzc29jaWF0ZWQgTWVkaWFTdHJlYW1zXV0gaW50ZXJuYWwgc2xvdC5cbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcbiAgICAgICAgICAnVGhlIGFkYXB0ZXIuanMgYWRkVHJhY2sgcG9seWZpbGwgb25seSBzdXBwb3J0cyBhIHNpbmdsZSAnICtcbiAgICAgICAgICAnIHN0cmVhbSB3aGljaCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIHNwZWNpZmllZCB0cmFjay4nLFxuICAgICAgICAgICdOb3RTdXBwb3J0ZWRFcnJvcicpO1xuICAgICAgfVxuXG4gICAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgICAgfSk7XG4gICAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUcmFjayBhbHJlYWR5IGV4aXN0cy4nLFxuICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xuICAgICAgfVxuXG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xuICAgICAgcGMuX3JldmVyc2VTdHJlYW1zID0gcGMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xuICAgICAgdmFyIG9sZFN0cmVhbSA9IHBjLl9zdHJlYW1zW3N0cmVhbS5pZF07XG4gICAgICBpZiAob2xkU3RyZWFtKSB7XG4gICAgICAgIC8vIHRoaXMgaXMgdXNpbmcgb2RkIENocm9tZSBiZWhhdmlvdXIsIHVzZSB3aXRoIGNhdXRpb246XG4gICAgICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD03ODE1XG4gICAgICAgIC8vIE5vdGU6IHdlIHJlbHkgb24gdGhlIGhpZ2gtbGV2ZWwgYWRkVHJhY2svZHRtZiBzaGltIHRvXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgc2VuZGVyIHdpdGggYSBkdG1mIHNlbmRlci5cbiAgICAgICAgb2xkU3RyZWFtLmFkZFRyYWNrKHRyYWNrKTtcblxuICAgICAgICAvLyBUcmlnZ2VyIE9OTiBhc3luYy5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG5ld1N0cmVhbSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oW3RyYWNrXSk7XG4gICAgICAgIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gPSBuZXdTdHJlYW07XG4gICAgICAgIHBjLl9yZXZlcnNlU3RyZWFtc1tuZXdTdHJlYW0uaWRdID0gc3RyZWFtO1xuICAgICAgICBwYy5hZGRTdHJlYW0obmV3U3RyZWFtKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyByZXBsYWNlIHRoZSBpbnRlcm5hbCBzdHJlYW0gaWQgd2l0aCB0aGUgZXh0ZXJuYWwgb25lIGFuZFxuICAgIC8vIHZpY2UgdmVyc2EuXG4gICAgZnVuY3Rpb24gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKSB7XG4gICAgICB2YXIgc2RwID0gZGVzY3JpcHRpb24uc2RwO1xuICAgICAgT2JqZWN0LmtleXMocGMuX3JldmVyc2VTdHJlYW1zIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uKGludGVybmFsSWQpIHtcbiAgICAgICAgdmFyIGV4dGVybmFsU3RyZWFtID0gcGMuX3JldmVyc2VTdHJlYW1zW2ludGVybmFsSWRdO1xuICAgICAgICB2YXIgaW50ZXJuYWxTdHJlYW0gPSBwYy5fc3RyZWFtc1tleHRlcm5hbFN0cmVhbS5pZF07XG4gICAgICAgIHNkcCA9IHNkcC5yZXBsYWNlKG5ldyBSZWdFeHAoaW50ZXJuYWxTdHJlYW0uaWQsICdnJyksXG4gICAgICAgICAgICBleHRlcm5hbFN0cmVhbS5pZCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcbiAgICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcbiAgICAgICAgc2RwOiBzZHBcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXBsYWNlRXh0ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pIHtcbiAgICAgIHZhciBzZHAgPSBkZXNjcmlwdGlvbi5zZHA7XG4gICAgICBPYmplY3Qua2V5cyhwYy5fcmV2ZXJzZVN0cmVhbXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24oaW50ZXJuYWxJZCkge1xuICAgICAgICB2YXIgZXh0ZXJuYWxTdHJlYW0gPSBwYy5fcmV2ZXJzZVN0cmVhbXNbaW50ZXJuYWxJZF07XG4gICAgICAgIHZhciBpbnRlcm5hbFN0cmVhbSA9IHBjLl9zdHJlYW1zW2V4dGVybmFsU3RyZWFtLmlkXTtcbiAgICAgICAgc2RwID0gc2RwLnJlcGxhY2UobmV3IFJlZ0V4cChleHRlcm5hbFN0cmVhbS5pZCwgJ2cnKSxcbiAgICAgICAgICAgIGludGVybmFsU3RyZWFtLmlkKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oe1xuICAgICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxuICAgICAgICBzZHA6IHNkcFxuICAgICAgfSk7XG4gICAgfVxuICAgIFsnY3JlYXRlT2ZmZXInLCAnY3JlYXRlQW5zd2VyJ10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIHZhciBpc0xlZ2FjeUNhbGwgPSBhcmd1bWVudHMubGVuZ3RoICYmXG4gICAgICAgICAgICB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnZnVuY3Rpb24nO1xuICAgICAgICBpZiAoaXNMZWdhY3lDYWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseShwYywgW1xuICAgICAgICAgICAgZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgdmFyIGRlc2MgPSByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICBhcmdzWzBdLmFwcGx5KG51bGwsIFtkZXNjXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgIGlmIChhcmdzWzFdKSB7XG4gICAgICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsLCBlcnIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBhcmd1bWVudHNbMl1cbiAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBhcmd1bWVudHMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHZhciBvcmlnU2V0TG9jYWxEZXNjcmlwdGlvbiA9XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbjtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGggfHwgIWFyZ3VtZW50c1swXS50eXBlKSB7XG4gICAgICAgIHJldHVybiBvcmlnU2V0TG9jYWxEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIGFyZ3VtZW50c1swXSA9IHJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkKHBjLCBhcmd1bWVudHNbMF0pO1xuICAgICAgcmV0dXJuIG9yaWdTZXRMb2NhbERlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICAvLyBUT0RPOiBtYW5nbGUgZ2V0U3RhdHM6IGh0dHBzOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtc3RhdHMvI2RvbS1ydGNtZWRpYXN0cmVhbXN0YXRzLXN0cmVhbWlkZW50aWZpZXJcblxuICAgIHZhciBvcmlnTG9jYWxEZXNjcmlwdGlvbiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdsb2NhbERlc2NyaXB0aW9uJyk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsXG4gICAgICAgICdsb2NhbERlc2NyaXB0aW9uJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gb3JpZ0xvY2FsRGVzY3JpcHRpb24uZ2V0LmFwcGx5KHRoaXMpO1xuICAgICAgICAgICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICcnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID0gZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgaWYgKHBjLnNpZ25hbGluZ1N0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFxuICAgICAgICAgICdUaGUgUlRDUGVlckNvbm5lY3Rpb25cXCdzIHNpZ25hbGluZ1N0YXRlIGlzIFxcJ2Nsb3NlZFxcJy4nLFxuICAgICAgICAgICdJbnZhbGlkU3RhdGVFcnJvcicpO1xuICAgICAgfVxuICAgICAgLy8gV2UgY2FuIG5vdCB5ZXQgY2hlY2sgZm9yIHNlbmRlciBpbnN0YW5jZW9mIFJUQ1J0cFNlbmRlclxuICAgICAgLy8gc2luY2Ugd2Ugc2hpbSBSVFBTZW5kZXIuIFNvIHdlIGNoZWNrIGlmIHNlbmRlci5fcGMgaXMgc2V0LlxuICAgICAgaWYgKCFzZW5kZXIuX3BjKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ0FyZ3VtZW50IDEgb2YgUlRDUGVlckNvbm5lY3Rpb24ucmVtb3ZlVHJhY2sgJyArXG4gICAgICAgICAgICAnZG9lcyBub3QgaW1wbGVtZW50IGludGVyZmFjZSBSVENSdHBTZW5kZXIuJywgJ1R5cGVFcnJvcicpO1xuICAgICAgfVxuICAgICAgdmFyIGlzTG9jYWwgPSBzZW5kZXIuX3BjID09PSBwYztcbiAgICAgIGlmICghaXNMb2NhbCkge1xuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdTZW5kZXIgd2FzIG5vdCBjcmVhdGVkIGJ5IHRoaXMgY29ubmVjdGlvbi4nLFxuICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xuICAgICAgfVxuXG4gICAgICAvLyBTZWFyY2ggZm9yIHRoZSBuYXRpdmUgc3RyZWFtIHRoZSBzZW5kZXJzIHRyYWNrIGJlbG9uZ3MgdG8uXG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xuICAgICAgdmFyIHN0cmVhbTtcbiAgICAgIE9iamVjdC5rZXlzKHBjLl9zdHJlYW1zKS5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbWlkKSB7XG4gICAgICAgIHZhciBoYXNUcmFjayA9IHBjLl9zdHJlYW1zW3N0cmVhbWlkXS5nZXRUcmFja3MoKS5maW5kKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgcmV0dXJuIHNlbmRlci50cmFjayA9PT0gdHJhY2s7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaGFzVHJhY2spIHtcbiAgICAgICAgICBzdHJlYW0gPSBwYy5fc3RyZWFtc1tzdHJlYW1pZF07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgIGlmIChzdHJlYW0uZ2V0VHJhY2tzKCkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgLy8gaWYgdGhpcyBpcyB0aGUgbGFzdCB0cmFjayBvZiB0aGUgc3RyZWFtLCByZW1vdmUgdGhlIHN0cmVhbS4gVGhpc1xuICAgICAgICAgIC8vIHRha2VzIGNhcmUgb2YgYW55IHNoaW1tZWQgX3NlbmRlcnMuXG4gICAgICAgICAgcGMucmVtb3ZlU3RyZWFtKHBjLl9yZXZlcnNlU3RyZWFtc1tzdHJlYW0uaWRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyByZWx5aW5nIG9uIHRoZSBzYW1lIG9kZCBjaHJvbWUgYmVoYXZpb3VyIGFzIGFib3ZlLlxuICAgICAgICAgIHN0cmVhbS5yZW1vdmVUcmFjayhzZW5kZXIudHJhY2spO1xuICAgICAgICB9XG4gICAgICAgIHBjLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuXG4gIHNoaW1QZWVyQ29ubmVjdGlvbjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuXG4gICAgLy8gVGhlIFJUQ1BlZXJDb25uZWN0aW9uIG9iamVjdC5cbiAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcbiAgICAgICAgLy8gVHJhbnNsYXRlIGljZVRyYW5zcG9ydFBvbGljeSB0byBpY2VUcmFuc3BvcnRzLFxuICAgICAgICAvLyBzZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD00ODY5XG4gICAgICAgIC8vIHRoaXMgd2FzIGZpeGVkIGluIE01NiBhbG9uZyB3aXRoIHVucHJlZml4aW5nIFJUQ1BlZXJDb25uZWN0aW9uLlxuICAgICAgICBsb2dnaW5nKCdQZWVyQ29ubmVjdGlvbicpO1xuICAgICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlVHJhbnNwb3J0UG9saWN5KSB7XG4gICAgICAgICAgcGNDb25maWcuaWNlVHJhbnNwb3J0cyA9IHBjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID1cbiAgICAgICAgICB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuICAgICAgLy8gd3JhcCBzdGF0aWMgbWV0aG9kcy4gQ3VycmVudGx5IGp1c3QgZ2VuZXJhdGVDZXJ0aWZpY2F0ZS5cbiAgICAgIGlmICh3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG1pZ3JhdGUgZnJvbSBub24tc3BlYyBSVENJY2VTZXJ2ZXIudXJsIHRvIFJUQ0ljZVNlcnZlci51cmxzXG4gICAgICB2YXIgT3JpZ1BlZXJDb25uZWN0aW9uID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcbiAgICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVNlcnZlcnMpIHtcbiAgICAgICAgICB2YXIgbmV3SWNlU2VydmVycyA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGNDb25maWcuaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNlcnZlciA9IHBjQ29uZmlnLmljZVNlcnZlcnNbaV07XG4gICAgICAgICAgICBpZiAoIXNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJscycpICYmXG4gICAgICAgICAgICAgICAgc2VydmVyLmhhc093blByb3BlcnR5KCd1cmwnKSkge1xuICAgICAgICAgICAgICB1dGlscy5kZXByZWNhdGVkKCdSVENJY2VTZXJ2ZXIudXJsJywgJ1JUQ0ljZVNlcnZlci51cmxzJyk7XG4gICAgICAgICAgICAgIHNlcnZlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc2VydmVyKSk7XG4gICAgICAgICAgICAgIHNlcnZlci51cmxzID0gc2VydmVyLnVybDtcbiAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHNlcnZlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gocGNDb25maWcuaWNlU2VydmVyc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHBjQ29uZmlnLmljZVNlcnZlcnMgPSBuZXdJY2VTZXJ2ZXJzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgT3JpZ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID0gT3JpZ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcbiAgICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gT3JpZ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBvcmlnR2V0U3RhdHMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbihzZWxlY3RvcixcbiAgICAgICAgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgLy8gSWYgc2VsZWN0b3IgaXMgYSBmdW5jdGlvbiB0aGVuIHdlIGFyZSBpbiB0aGUgb2xkIHN0eWxlIHN0YXRzIHNvIGp1c3RcbiAgICAgIC8vIHBhc3MgYmFjayB0aGUgb3JpZ2luYWwgZ2V0U3RhdHMgZm9ybWF0IHRvIGF2b2lkIGJyZWFraW5nIG9sZCB1c2Vycy5cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCAmJiB0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICAvLyBXaGVuIHNwZWMtc3R5bGUgZ2V0U3RhdHMgaXMgc3VwcG9ydGVkLCByZXR1cm4gdGhvc2Ugd2hlbiBjYWxsZWQgd2l0aFxuICAgICAgLy8gZWl0aGVyIG5vIGFyZ3VtZW50cyBvciB0aGUgc2VsZWN0b3IgYXJndW1lbnQgaXMgbnVsbC5cbiAgICAgIGlmIChvcmlnR2V0U3RhdHMubGVuZ3RoID09PSAwICYmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgdHlwZW9mIGFyZ3VtZW50c1swXSAhPT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBbXSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBmaXhDaHJvbWVTdGF0c18gPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICB2YXIgc3RhbmRhcmRSZXBvcnQgPSB7fTtcbiAgICAgICAgdmFyIHJlcG9ydHMgPSByZXNwb25zZS5yZXN1bHQoKTtcbiAgICAgICAgcmVwb3J0cy5mb3JFYWNoKGZ1bmN0aW9uKHJlcG9ydCkge1xuICAgICAgICAgIHZhciBzdGFuZGFyZFN0YXRzID0ge1xuICAgICAgICAgICAgaWQ6IHJlcG9ydC5pZCxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogcmVwb3J0LnRpbWVzdGFtcCxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgbG9jYWxjYW5kaWRhdGU6ICdsb2NhbC1jYW5kaWRhdGUnLFxuICAgICAgICAgICAgICByZW1vdGVjYW5kaWRhdGU6ICdyZW1vdGUtY2FuZGlkYXRlJ1xuICAgICAgICAgICAgfVtyZXBvcnQudHlwZV0gfHwgcmVwb3J0LnR5cGVcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlcG9ydC5uYW1lcygpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICAgICAgc3RhbmRhcmRTdGF0c1tuYW1lXSA9IHJlcG9ydC5zdGF0KG5hbWUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHN0YW5kYXJkUmVwb3J0W3N0YW5kYXJkU3RhdHMuaWRdID0gc3RhbmRhcmRTdGF0cztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHN0YW5kYXJkUmVwb3J0O1xuICAgICAgfTtcblxuICAgICAgLy8gc2hpbSBnZXRTdGF0cyB3aXRoIG1hcGxpa2Ugc3VwcG9ydFxuICAgICAgdmFyIG1ha2VNYXBTdGF0cyA9IGZ1bmN0aW9uKHN0YXRzKSB7XG4gICAgICAgIHJldHVybiBuZXcgTWFwKE9iamVjdC5rZXlzKHN0YXRzKS5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIFtrZXksIHN0YXRzW2tleV1dO1xuICAgICAgICB9KSk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIHZhciBzdWNjZXNzQ2FsbGJhY2tXcmFwcGVyXyA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgYXJnc1sxXShtYWtlTWFwU3RhdHMoZml4Q2hyb21lU3RhdHNfKHJlc3BvbnNlKSkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBvcmlnR2V0U3RhdHMuYXBwbHkodGhpcywgW3N1Y2Nlc3NDYWxsYmFja1dyYXBwZXJfLFxuICAgICAgICAgIGFyZ3VtZW50c1swXV0pO1xuICAgICAgfVxuXG4gICAgICAvLyBwcm9taXNlLXN1cHBvcnRcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgb3JpZ0dldFN0YXRzLmFwcGx5KHNlbGYsIFtcbiAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmVzb2x2ZShtYWtlTWFwU3RhdHMoZml4Q2hyb21lU3RhdHNfKHJlc3BvbnNlKSkpO1xuICAgICAgICAgIH0sIHJlamVjdF0pO1xuICAgICAgfSkudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spO1xuICAgIH07XG5cbiAgICAvLyBhZGQgcHJvbWlzZSBzdXBwb3J0IC0tIG5hdGl2ZWx5IGF2YWlsYWJsZSBpbiBDaHJvbWUgNTFcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDUxKSB7XG4gICAgICBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ11cbiAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBuYXRpdmVNZXRob2QuYXBwbHkoc2VsZiwgW2FyZ3NbMF0sIHJlc29sdmUsIHJlamVjdF0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsLCBbXSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICAgICAgICBhcmdzWzJdLmFwcGx5KG51bGwsIFtlcnJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBwcm9taXNlIHN1cHBvcnQgZm9yIGNyZWF0ZU9mZmVyIGFuZCBjcmVhdGVBbnN3ZXIuIEF2YWlsYWJsZSAod2l0aG91dFxuICAgIC8vIGJ1Z3MpIHNpbmNlIE01MjogY3JidWcvNjE5Mjg5XG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1Mikge1xuICAgICAgWydjcmVhdGVPZmZlcicsICdjcmVhdGVBbnN3ZXInXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxIHx8IChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSkge1xuICAgICAgICAgICAgdmFyIG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICBuYXRpdmVNZXRob2QuYXBwbHkoc2VsZiwgW3Jlc29sdmUsIHJlamVjdCwgb3B0c10pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHNoaW0gaW1wbGljaXQgY3JlYXRpb24gb2YgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uL1JUQ0ljZUNhbmRpZGF0ZVxuICAgIFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXJndW1lbnRzWzBdID0gbmV3ICgobWV0aG9kID09PSAnYWRkSWNlQ2FuZGlkYXRlJykgP1xuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgOlxuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pKGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBzdXBwb3J0IGZvciBhZGRJY2VDYW5kaWRhdGUobnVsbCBvciB1bmRlZmluZWQpXG4gICAgdmFyIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZSA9XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50c1swXSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzWzFdKSB7XG4gICAgICAgICAgYXJndW1lbnRzWzFdLmFwcGx5KG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVBZGRJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG59O1xuXG5cbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaGltTWVkaWFTdHJlYW06IGNocm9tZVNoaW0uc2hpbU1lZGlhU3RyZWFtLFxuICBzaGltT25UcmFjazogY2hyb21lU2hpbS5zaGltT25UcmFjayxcbiAgc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2s6IGNocm9tZVNoaW0uc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2ssXG4gIHNoaW1HZXRTZW5kZXJzV2l0aER0bWY6IGNocm9tZVNoaW0uc2hpbUdldFNlbmRlcnNXaXRoRHRtZixcbiAgc2hpbVNvdXJjZU9iamVjdDogY2hyb21lU2hpbS5zaGltU291cmNlT2JqZWN0LFxuICBzaGltUGVlckNvbm5lY3Rpb246IGNocm9tZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uLFxuICBzaGltR2V0VXNlck1lZGlhOiByZXF1aXJlKCcuL2dldHVzZXJtZWRpYScpXG59O1xuIl19
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\webrtc-adapter\\src\\js\\chrome\\chrome_shim.js","/..\\node_modules\\webrtc-adapter\\src\\js\\chrome")
},{"../utils.js":17,"./getusermedia":10,"2ionoC":3,"buffer":2}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = require('../utils.js');
var logging = utils.log;

// Expose public methods.
module.exports = function (window) {
  var browserDetails = utils.detectBrowser(window);
  var navigator = window && window.navigator;

  var constraintsToChrome_ = function constraintsToChrome_(c) {
    if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) !== 'object' || c.mandatory || c.optional) {
      return c;
    }
    var cc = {};
    Object.keys(c).forEach(function (key) {
      if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
        return;
      }
      var r = _typeof(c[key]) === 'object' ? c[key] : { ideal: c[key] };
      if (r.exact !== undefined && typeof r.exact === 'number') {
        r.min = r.max = r.exact;
      }
      var oldname_ = function oldname_(prefix, name) {
        if (prefix) {
          return prefix + name.charAt(0).toUpperCase() + name.slice(1);
        }
        return name === 'deviceId' ? 'sourceId' : name;
      };
      if (r.ideal !== undefined) {
        cc.optional = cc.optional || [];
        var oc = {};
        if (typeof r.ideal === 'number') {
          oc[oldname_('min', key)] = r.ideal;
          cc.optional.push(oc);
          oc = {};
          oc[oldname_('max', key)] = r.ideal;
          cc.optional.push(oc);
        } else {
          oc[oldname_('', key)] = r.ideal;
          cc.optional.push(oc);
        }
      }
      if (r.exact !== undefined && typeof r.exact !== 'number') {
        cc.mandatory = cc.mandatory || {};
        cc.mandatory[oldname_('', key)] = r.exact;
      } else {
        ['min', 'max'].forEach(function (mix) {
          if (r[mix] !== undefined) {
            cc.mandatory = cc.mandatory || {};
            cc.mandatory[oldname_(mix, key)] = r[mix];
          }
        });
      }
    });
    if (c.advanced) {
      cc.optional = (cc.optional || []).concat(c.advanced);
    }
    return cc;
  };

  var shimConstraints_ = function shimConstraints_(constraints, func) {
    constraints = JSON.parse(JSON.stringify(constraints));
    if (constraints && _typeof(constraints.audio) === 'object') {
      var remap = function remap(obj, a, b) {
        if (a in obj && !(b in obj)) {
          obj[b] = obj[a];
          delete obj[a];
        }
      };
      constraints = JSON.parse(JSON.stringify(constraints));
      remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
      remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
      constraints.audio = constraintsToChrome_(constraints.audio);
    }
    if (constraints && _typeof(constraints.video) === 'object') {
      // Shim facingMode for mobile & surface pro.
      var face = constraints.video.facingMode;
      face = face && ((typeof face === 'undefined' ? 'undefined' : _typeof(face)) === 'object' ? face : { ideal: face });
      var getSupportedFacingModeLies = browserDetails.version < 66;

      if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
        delete constraints.video.facingMode;
        var matches;
        if (face.exact === 'environment' || face.ideal === 'environment') {
          matches = ['back', 'rear'];
        } else if (face.exact === 'user' || face.ideal === 'user') {
          matches = ['front'];
        }
        if (matches) {
          // Look for matches in label, or use last cam for back (typical).
          return navigator.mediaDevices.enumerateDevices().then(function (devices) {
            devices = devices.filter(function (d) {
              return d.kind === 'videoinput';
            });
            var dev = devices.find(function (d) {
              return matches.some(function (match) {
                return d.label.toLowerCase().indexOf(match) !== -1;
              });
            });
            if (!dev && devices.length && matches.indexOf('back') !== -1) {
              dev = devices[devices.length - 1]; // more likely the back cam
            }
            if (dev) {
              constraints.video.deviceId = face.exact ? { exact: dev.deviceId } : { ideal: dev.deviceId };
            }
            constraints.video = constraintsToChrome_(constraints.video);
            logging('chrome: ' + JSON.stringify(constraints));
            return func(constraints);
          });
        }
      }
      constraints.video = constraintsToChrome_(constraints.video);
    }
    logging('chrome: ' + JSON.stringify(constraints));
    return func(constraints);
  };

  var shimError_ = function shimError_(e) {
    return {
      name: {
        PermissionDeniedError: 'NotAllowedError',
        InvalidStateError: 'NotReadableError',
        DevicesNotFoundError: 'NotFoundError',
        ConstraintNotSatisfiedError: 'OverconstrainedError',
        TrackStartError: 'NotReadableError',
        MediaDeviceFailedDueToShutdown: 'NotReadableError',
        MediaDeviceKillSwitchOn: 'NotReadableError'
      }[e.name] || e.name,
      message: e.message,
      constraint: e.constraintName,
      toString: function toString() {
        return this.name + (this.message && ': ') + this.message;
      }
    };
  };

  var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
    shimConstraints_(constraints, function (c) {
      navigator.webkitGetUserMedia(c, onSuccess, function (e) {
        if (onError) {
          onError(shimError_(e));
        }
      });
    });
  };

  navigator.getUserMedia = getUserMedia_;

  // Returns the result of getUserMedia as a Promise.
  var getUserMediaPromise_ = function getUserMediaPromise_(constraints) {
    return new Promise(function (resolve, reject) {
      navigator.getUserMedia(constraints, resolve, reject);
    });
  };

  if (!navigator.mediaDevices) {
    navigator.mediaDevices = {
      getUserMedia: getUserMediaPromise_,
      enumerateDevices: function enumerateDevices() {
        return new Promise(function (resolve) {
          var kinds = { audio: 'audioinput', video: 'videoinput' };
          return window.MediaStreamTrack.getSources(function (devices) {
            resolve(devices.map(function (device) {
              return { label: device.label,
                kind: kinds[device.kind],
                deviceId: device.id,
                groupId: '' };
            }));
          });
        });
      },
      getSupportedConstraints: function getSupportedConstraints() {
        return {
          deviceId: true, echoCancellation: true, facingMode: true,
          frameRate: true, height: true, width: true
        };
      }
    };
  }

  // A shim for getUserMedia method on the mediaDevices object.
  // TODO(KaptenJansson) remove once implemented in Chrome stable.
  if (!navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      return getUserMediaPromise_(constraints);
    };
  } else {
    // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
    // function which returns a Promise, it does not accept spec-style
    // constraints.
    var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function (cs) {
      return shimConstraints_(cs, function (c) {
        return origGetUserMedia(c).then(function (stream) {
          if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
            stream.getTracks().forEach(function (track) {
              track.stop();
            });
            throw new DOMException('', 'NotFoundError');
          }
          return stream;
        }, function (e) {
          return Promise.reject(shimError_(e));
        });
      });
    };
  }

  // Dummy devicechange event methods.
  // TODO(KaptenJansson) remove once implemented in Chrome stable.
  if (typeof navigator.mediaDevices.addEventListener === 'undefined') {
    navigator.mediaDevices.addEventListener = function () {
      logging('Dummy mediaDevices.addEventListener called.');
    };
  }
  if (typeof navigator.mediaDevices.removeEventListener === 'undefined') {
    navigator.mediaDevices.removeEventListener = function () {
      logging('Dummy mediaDevices.removeEventListener called.');
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdldHVzZXJtZWRpYS5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsInJlcXVpcmUiLCJsb2dnaW5nIiwibG9nIiwibW9kdWxlIiwiZXhwb3J0cyIsIndpbmRvdyIsImJyb3dzZXJEZXRhaWxzIiwiZGV0ZWN0QnJvd3NlciIsIm5hdmlnYXRvciIsImNvbnN0cmFpbnRzVG9DaHJvbWVfIiwiYyIsIm1hbmRhdG9yeSIsIm9wdGlvbmFsIiwiY2MiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsInIiLCJpZGVhbCIsImV4YWN0IiwidW5kZWZpbmVkIiwibWluIiwibWF4Iiwib2xkbmFtZV8iLCJwcmVmaXgiLCJuYW1lIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsIm9jIiwicHVzaCIsIm1peCIsImFkdmFuY2VkIiwiY29uY2F0Iiwic2hpbUNvbnN0cmFpbnRzXyIsImNvbnN0cmFpbnRzIiwiZnVuYyIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImF1ZGlvIiwicmVtYXAiLCJvYmoiLCJhIiwiYiIsInZpZGVvIiwiZmFjZSIsImZhY2luZ01vZGUiLCJnZXRTdXBwb3J0ZWRGYWNpbmdNb2RlTGllcyIsInZlcnNpb24iLCJtZWRpYURldmljZXMiLCJnZXRTdXBwb3J0ZWRDb25zdHJhaW50cyIsIm1hdGNoZXMiLCJlbnVtZXJhdGVEZXZpY2VzIiwidGhlbiIsImRldmljZXMiLCJmaWx0ZXIiLCJkIiwia2luZCIsImRldiIsImZpbmQiLCJzb21lIiwibWF0Y2giLCJsYWJlbCIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsImxlbmd0aCIsImRldmljZUlkIiwic2hpbUVycm9yXyIsImUiLCJQZXJtaXNzaW9uRGVuaWVkRXJyb3IiLCJJbnZhbGlkU3RhdGVFcnJvciIsIkRldmljZXNOb3RGb3VuZEVycm9yIiwiQ29uc3RyYWludE5vdFNhdGlzZmllZEVycm9yIiwiVHJhY2tTdGFydEVycm9yIiwiTWVkaWFEZXZpY2VGYWlsZWREdWVUb1NodXRkb3duIiwiTWVkaWFEZXZpY2VLaWxsU3dpdGNoT24iLCJtZXNzYWdlIiwiY29uc3RyYWludCIsImNvbnN0cmFpbnROYW1lIiwidG9TdHJpbmciLCJnZXRVc2VyTWVkaWFfIiwib25TdWNjZXNzIiwib25FcnJvciIsIndlYmtpdEdldFVzZXJNZWRpYSIsImdldFVzZXJNZWRpYSIsImdldFVzZXJNZWRpYVByb21pc2VfIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJraW5kcyIsIk1lZGlhU3RyZWFtVHJhY2siLCJnZXRTb3VyY2VzIiwibWFwIiwiZGV2aWNlIiwiaWQiLCJncm91cElkIiwiZWNob0NhbmNlbGxhdGlvbiIsImZyYW1lUmF0ZSIsImhlaWdodCIsIndpZHRoIiwib3JpZ0dldFVzZXJNZWRpYSIsImJpbmQiLCJjcyIsInN0cmVhbSIsImdldEF1ZGlvVHJhY2tzIiwiZ2V0VmlkZW9UcmFja3MiLCJnZXRUcmFja3MiLCJ0cmFjayIsInN0b3AiLCJET01FeGNlcHRpb24iLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFPQztBQUNEOzs7O0FBQ0EsSUFBSUEsUUFBUUMsUUFBUSxhQUFSLENBQVo7QUFDQSxJQUFJQyxVQUFVRixNQUFNRyxHQUFwQjs7QUFFQTtBQUNBQyxPQUFPQyxPQUFQLEdBQWlCLFVBQVNDLE1BQVQsRUFBaUI7QUFDaEMsTUFBSUMsaUJBQWlCUCxNQUFNUSxhQUFOLENBQW9CRixNQUFwQixDQUFyQjtBQUNBLE1BQUlHLFlBQVlILFVBQVVBLE9BQU9HLFNBQWpDOztBQUVBLE1BQUlDLHVCQUF1QixTQUF2QkEsb0JBQXVCLENBQVNDLENBQVQsRUFBWTtBQUNyQyxRQUFJLFFBQU9BLENBQVAseUNBQU9BLENBQVAsT0FBYSxRQUFiLElBQXlCQSxFQUFFQyxTQUEzQixJQUF3Q0QsRUFBRUUsUUFBOUMsRUFBd0Q7QUFDdEQsYUFBT0YsQ0FBUDtBQUNEO0FBQ0QsUUFBSUcsS0FBSyxFQUFUO0FBQ0FDLFdBQU9D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VCxFQUFnQjtBQUN6Q0Esb0JBQU1DLElBQU47QUFDRCxhQUZEO0FBR0Esa0JBQU0sSUFBSUMsWUFBSixDQUFpQixFQUFqQixFQUFxQixlQUFyQixDQUFOO0FBQ0Q7QUFDRCxpQkFBT04sTUFBUDtBQUNELFNBVE0sRUFTSixVQUFTbkMsQ0FBVCxFQUFZO0FBQ2IsaUJBQU9rQixRQUFRRSxNQUFSLENBQWVyQixXQUFXQyxDQUFYLENBQWYsQ0FBUDtBQUNELFNBWE0sQ0FBUDtBQVlELE9BYk0sQ0FBUDtBQWNELEtBZkQ7QUFnQkQ7O0FBRUQ7QUFDQTtBQUNBLE1BQUksT0FBTzlELFVBQVUyQyxZQUFWLENBQXVCNkQsZ0JBQTlCLEtBQW1ELFdBQXZELEVBQW9FO0FBQ2xFeEcsY0FBVTJDLFlBQVYsQ0FBdUI2RCxnQkFBdkIsR0FBMEMsWUFBVztBQUNuRC9HLGNBQVEsNkNBQVI7QUFDRCxLQUZEO0FBR0Q7QUFDRCxNQUFJLE9BQU9PLFVBQVUyQyxZQUFWLENBQXVCOEQsbUJBQTlCLEtBQXNELFdBQTFELEVBQXVFO0FBQ3JFekcsY0FBVTJDLFlBQVYsQ0FBdUI4RCxtQkFBdkIsR0FBNkMsWUFBVztBQUN0RGhILGNBQVEsZ0RBQVI7QUFDRCxLQUZEO0FBR0Q7QUFDRixDQS9ORCIsImZpbGUiOiJnZXR1c2VybWVkaWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzLmpzJyk7XG52YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcblxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3cpIHtcbiAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XG5cbiAgdmFyIGNvbnN0cmFpbnRzVG9DaHJvbWVfID0gZnVuY3Rpb24oYykge1xuICAgIGlmICh0eXBlb2YgYyAhPT0gJ29iamVjdCcgfHwgYy5tYW5kYXRvcnkgfHwgYy5vcHRpb25hbCkge1xuICAgICAgcmV0dXJuIGM7XG4gICAgfVxuICAgIHZhciBjYyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVxdWlyZScgfHwga2V5ID09PSAnYWR2YW5jZWQnIHx8IGtleSA9PT0gJ21lZGlhU291cmNlJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgciA9ICh0eXBlb2YgY1trZXldID09PSAnb2JqZWN0JykgPyBjW2tleV0gOiB7aWRlYWw6IGNba2V5XX07XG4gICAgICBpZiAoci5leGFjdCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiByLmV4YWN0ID09PSAnbnVtYmVyJykge1xuICAgICAgICByLm1pbiA9IHIubWF4ID0gci5leGFjdDtcbiAgICAgIH1cbiAgICAgIHZhciBvbGRuYW1lXyA9IGZ1bmN0aW9uKHByZWZpeCwgbmFtZSkge1xuICAgICAgICBpZiAocHJlZml4KSB7XG4gICAgICAgICAgcmV0dXJuIHByZWZpeCArIG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAobmFtZSA9PT0gJ2RldmljZUlkJykgPyAnc291cmNlSWQnIDogbmFtZTtcbiAgICAgIH07XG4gICAgICBpZiAoci5pZGVhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNjLm9wdGlvbmFsID0gY2Mub3B0aW9uYWwgfHwgW107XG4gICAgICAgIHZhciBvYyA9IHt9O1xuICAgICAgICBpZiAodHlwZW9mIHIuaWRlYWwgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgb2Nbb2xkbmFtZV8oJ21pbicsIGtleSldID0gci5pZGVhbDtcbiAgICAgICAgICBjYy5vcHRpb25hbC5wdXNoKG9jKTtcbiAgICAgICAgICBvYyA9IHt9O1xuICAgICAgICAgIG9jW29sZG5hbWVfKCdtYXgnLCBrZXkpXSA9IHIuaWRlYWw7XG4gICAgICAgICAgY2Mub3B0aW9uYWwucHVzaChvYyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2Nbb2xkbmFtZV8oJycsIGtleSldID0gci5pZGVhbDtcbiAgICAgICAgICBjYy5vcHRpb25hbC5wdXNoKG9jKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHIuZXhhY3QgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygci5leGFjdCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgY2MubWFuZGF0b3J5ID0gY2MubWFuZGF0b3J5IHx8IHt9O1xuICAgICAgICBjYy5tYW5kYXRvcnlbb2xkbmFtZV8oJycsIGtleSldID0gci5leGFjdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFsnbWluJywgJ21heCddLmZvckVhY2goZnVuY3Rpb24obWl4KSB7XG4gICAgICAgICAgaWYgKHJbbWl4XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjYy5tYW5kYXRvcnkgPSBjYy5tYW5kYXRvcnkgfHwge307XG4gICAgICAgICAgICBjYy5tYW5kYXRvcnlbb2xkbmFtZV8obWl4LCBrZXkpXSA9IHJbbWl4XTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChjLmFkdmFuY2VkKSB7XG4gICAgICBjYy5vcHRpb25hbCA9IChjYy5vcHRpb25hbCB8fCBbXSkuY29uY2F0KGMuYWR2YW5jZWQpO1xuICAgIH1cbiAgICByZXR1cm4gY2M7XG4gIH07XG5cbiAgdmFyIHNoaW1Db25zdHJhaW50c18gPSBmdW5jdGlvbihjb25zdHJhaW50cywgZnVuYykge1xuICAgIGNvbnN0cmFpbnRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgIGlmIChjb25zdHJhaW50cyAmJiB0eXBlb2YgY29uc3RyYWludHMuYXVkaW8gPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgcmVtYXAgPSBmdW5jdGlvbihvYmosIGEsIGIpIHtcbiAgICAgICAgaWYgKGEgaW4gb2JqICYmICEoYiBpbiBvYmopKSB7XG4gICAgICAgICAgb2JqW2JdID0gb2JqW2FdO1xuICAgICAgICAgIGRlbGV0ZSBvYmpbYV07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdHJhaW50cyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICAgIHJlbWFwKGNvbnN0cmFpbnRzLmF1ZGlvLCAnYXV0b0dhaW5Db250cm9sJywgJ2dvb2dBdXRvR2FpbkNvbnRyb2wnKTtcbiAgICAgIHJlbWFwKGNvbnN0cmFpbnRzLmF1ZGlvLCAnbm9pc2VTdXBwcmVzc2lvbicsICdnb29nTm9pc2VTdXBwcmVzc2lvbicpO1xuICAgICAgY29uc3RyYWludHMuYXVkaW8gPSBjb25zdHJhaW50c1RvQ2hyb21lXyhjb25zdHJhaW50cy5hdWRpbyk7XG4gICAgfVxuICAgIGlmIChjb25zdHJhaW50cyAmJiB0eXBlb2YgY29uc3RyYWludHMudmlkZW8gPT09ICdvYmplY3QnKSB7XG4gICAgICAvLyBTaGltIGZhY2luZ01vZGUgZm9yIG1vYmlsZSAmIHN1cmZhY2UgcHJvLlxuICAgICAgdmFyIGZhY2UgPSBjb25zdHJhaW50cy52aWRlby5mYWNpbmdNb2RlO1xuICAgICAgZmFjZSA9IGZhY2UgJiYgKCh0eXBlb2YgZmFjZSA9PT0gJ29iamVjdCcpID8gZmFjZSA6IHtpZGVhbDogZmFjZX0pO1xuICAgICAgdmFyIGdldFN1cHBvcnRlZEZhY2luZ01vZGVMaWVzID0gYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDY2O1xuXG4gICAgICBpZiAoKGZhY2UgJiYgKGZhY2UuZXhhY3QgPT09ICd1c2VyJyB8fCBmYWNlLmV4YWN0ID09PSAnZW52aXJvbm1lbnQnIHx8XG4gICAgICAgICAgICAgICAgICAgIGZhY2UuaWRlYWwgPT09ICd1c2VyJyB8fCBmYWNlLmlkZWFsID09PSAnZW52aXJvbm1lbnQnKSkgJiZcbiAgICAgICAgICAhKG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMgJiZcbiAgICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMoKS5mYWNpbmdNb2RlICYmXG4gICAgICAgICAgICAhZ2V0U3VwcG9ydGVkRmFjaW5nTW9kZUxpZXMpKSB7XG4gICAgICAgIGRlbGV0ZSBjb25zdHJhaW50cy52aWRlby5mYWNpbmdNb2RlO1xuICAgICAgICB2YXIgbWF0Y2hlcztcbiAgICAgICAgaWYgKGZhY2UuZXhhY3QgPT09ICdlbnZpcm9ubWVudCcgfHwgZmFjZS5pZGVhbCA9PT0gJ2Vudmlyb25tZW50Jykge1xuICAgICAgICAgIG1hdGNoZXMgPSBbJ2JhY2snLCAncmVhciddO1xuICAgICAgICB9IGVsc2UgaWYgKGZhY2UuZXhhY3QgPT09ICd1c2VyJyB8fCBmYWNlLmlkZWFsID09PSAndXNlcicpIHtcbiAgICAgICAgICBtYXRjaGVzID0gWydmcm9udCddO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgLy8gTG9vayBmb3IgbWF0Y2hlcyBpbiBsYWJlbCwgb3IgdXNlIGxhc3QgY2FtIGZvciBiYWNrICh0eXBpY2FsKS5cbiAgICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKClcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihkZXZpY2VzKSB7XG4gICAgICAgICAgICBkZXZpY2VzID0gZGV2aWNlcy5maWx0ZXIoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICByZXR1cm4gZC5raW5kID09PSAndmlkZW9pbnB1dCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBkZXYgPSBkZXZpY2VzLmZpbmQoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlcy5zb21lKGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKG1hdGNoKSAhPT0gLTE7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWRldiAmJiBkZXZpY2VzLmxlbmd0aCAmJiBtYXRjaGVzLmluZGV4T2YoJ2JhY2snKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgZGV2ID0gZGV2aWNlc1tkZXZpY2VzLmxlbmd0aCAtIDFdOyAvLyBtb3JlIGxpa2VseSB0aGUgYmFjayBjYW1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZXYpIHtcbiAgICAgICAgICAgICAgY29uc3RyYWludHMudmlkZW8uZGV2aWNlSWQgPSBmYWNlLmV4YWN0ID8ge2V4YWN0OiBkZXYuZGV2aWNlSWR9IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lkZWFsOiBkZXYuZGV2aWNlSWR9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3RyYWludHMudmlkZW8gPSBjb25zdHJhaW50c1RvQ2hyb21lXyhjb25zdHJhaW50cy52aWRlbyk7XG4gICAgICAgICAgICBsb2dnaW5nKCdjaHJvbWU6ICcgKyBKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmMoY29uc3RyYWludHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdHJhaW50cy52aWRlbyA9IGNvbnN0cmFpbnRzVG9DaHJvbWVfKGNvbnN0cmFpbnRzLnZpZGVvKTtcbiAgICB9XG4gICAgbG9nZ2luZygnY2hyb21lOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICByZXR1cm4gZnVuYyhjb25zdHJhaW50cyk7XG4gIH07XG5cbiAgdmFyIHNoaW1FcnJvcl8gPSBmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgUGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJyxcbiAgICAgICAgSW52YWxpZFN0YXRlRXJyb3I6ICdOb3RSZWFkYWJsZUVycm9yJyxcbiAgICAgICAgRGV2aWNlc05vdEZvdW5kRXJyb3I6ICdOb3RGb3VuZEVycm9yJyxcbiAgICAgICAgQ29uc3RyYWludE5vdFNhdGlzZmllZEVycm9yOiAnT3ZlcmNvbnN0cmFpbmVkRXJyb3InLFxuICAgICAgICBUcmFja1N0YXJ0RXJyb3I6ICdOb3RSZWFkYWJsZUVycm9yJyxcbiAgICAgICAgTWVkaWFEZXZpY2VGYWlsZWREdWVUb1NodXRkb3duOiAnTm90UmVhZGFibGVFcnJvcicsXG4gICAgICAgIE1lZGlhRGV2aWNlS2lsbFN3aXRjaE9uOiAnTm90UmVhZGFibGVFcnJvcidcbiAgICAgIH1bZS5uYW1lXSB8fCBlLm5hbWUsXG4gICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UsXG4gICAgICBjb25zdHJhaW50OiBlLmNvbnN0cmFpbnROYW1lLFxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgKHRoaXMubWVzc2FnZSAmJiAnOiAnKSArIHRoaXMubWVzc2FnZTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIHZhciBnZXRVc2VyTWVkaWFfID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICAgIHNoaW1Db25zdHJhaW50c18oY29uc3RyYWludHMsIGZ1bmN0aW9uKGMpIHtcbiAgICAgIG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEoYywgb25TdWNjZXNzLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChvbkVycm9yKSB7XG4gICAgICAgICAgb25FcnJvcihzaGltRXJyb3JfKGUpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IGdldFVzZXJNZWRpYV87XG5cbiAgLy8gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGdldFVzZXJNZWRpYSBhcyBhIFByb21pc2UuXG4gIHZhciBnZXRVc2VyTWVkaWFQcm9taXNlXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYShjb25zdHJhaW50cywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9KTtcbiAgfTtcblxuICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzID0ge1xuICAgICAgZ2V0VXNlck1lZGlhOiBnZXRVc2VyTWVkaWFQcm9taXNlXyxcbiAgICAgIGVudW1lcmF0ZURldmljZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgIHZhciBraW5kcyA9IHthdWRpbzogJ2F1ZGlvaW5wdXQnLCB2aWRlbzogJ3ZpZGVvaW5wdXQnfTtcbiAgICAgICAgICByZXR1cm4gd2luZG93Lk1lZGlhU3RyZWFtVHJhY2suZ2V0U291cmNlcyhmdW5jdGlvbihkZXZpY2VzKSB7XG4gICAgICAgICAgICByZXNvbHZlKGRldmljZXMubWFwKGZ1bmN0aW9uKGRldmljZSkge1xuICAgICAgICAgICAgICByZXR1cm4ge2xhYmVsOiBkZXZpY2UubGFiZWwsXG4gICAgICAgICAgICAgICAga2luZDoga2luZHNbZGV2aWNlLmtpbmRdLFxuICAgICAgICAgICAgICAgIGRldmljZUlkOiBkZXZpY2UuaWQsXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogJyd9O1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBnZXRTdXBwb3J0ZWRDb25zdHJhaW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZGV2aWNlSWQ6IHRydWUsIGVjaG9DYW5jZWxsYXRpb246IHRydWUsIGZhY2luZ01vZGU6IHRydWUsXG4gICAgICAgICAgZnJhbWVSYXRlOiB0cnVlLCBoZWlnaHQ6IHRydWUsIHdpZHRoOiB0cnVlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIEEgc2hpbSBmb3IgZ2V0VXNlck1lZGlhIG1ldGhvZCBvbiB0aGUgbWVkaWFEZXZpY2VzIG9iamVjdC5cbiAgLy8gVE9ETyhLYXB0ZW5KYW5zc29uKSByZW1vdmUgb25jZSBpbXBsZW1lbnRlZCBpbiBDaHJvbWUgc3RhYmxlLlxuICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKSB7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjb25zdHJhaW50cykge1xuICAgICAgcmV0dXJuIGdldFVzZXJNZWRpYVByb21pc2VfKGNvbnN0cmFpbnRzKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIC8vIEV2ZW4gdGhvdWdoIENocm9tZSA0NSBoYXMgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyBhbmQgYSBnZXRVc2VyTWVkaWFcbiAgICAvLyBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGEgUHJvbWlzZSwgaXQgZG9lcyBub3QgYWNjZXB0IHNwZWMtc3R5bGVcbiAgICAvLyBjb25zdHJhaW50cy5cbiAgICB2YXIgb3JpZ0dldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxuICAgICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY3MpIHtcbiAgICAgIHJldHVybiBzaGltQ29uc3RyYWludHNfKGNzLCBmdW5jdGlvbihjKSB7XG4gICAgICAgIHJldHVybiBvcmlnR2V0VXNlck1lZGlhKGMpLnRoZW4oZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgaWYgKGMuYXVkaW8gJiYgIXN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmxlbmd0aCB8fFxuICAgICAgICAgICAgICBjLnZpZGVvICYmICFzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgICAgIHRyYWNrLnN0b3AoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignJywgJ05vdEZvdW5kRXJyb3InKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN0cmVhbTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChzaGltRXJyb3JfKGUpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgLy8gRHVtbXkgZGV2aWNlY2hhbmdlIGV2ZW50IG1ldGhvZHMuXG4gIC8vIFRPRE8oS2FwdGVuSmFuc3NvbikgcmVtb3ZlIG9uY2UgaW1wbGVtZW50ZWQgaW4gQ2hyb21lIHN0YWJsZS5cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmFkZEV2ZW50TGlzdGVuZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBsb2dnaW5nKCdEdW1teSBtZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciBjYWxsZWQuJyk7XG4gICAgfTtcbiAgfVxuICBpZiAodHlwZW9mIG5hdmlnYXRvci5tZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGxvZ2dpbmcoJ0R1bW15IG1lZGlhRGV2aWNlcy5yZW1vdmVFdmVudExpc3RlbmVyIGNhbGxlZC4nKTtcbiAgICB9O1xuICB9XG59O1xuIl19
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\webrtc-adapter\\src\\js\\chrome\\getusermedia.js","/..\\node_modules\\webrtc-adapter\\src\\js\\chrome")
},{"../utils.js":17,"2ionoC":3,"buffer":2}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var SDPUtils = require('sdp');
var utils = require('./utils');

// Wraps the peerconnection event eventNameToWrap in a function
// which returns the modified event object.
function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
  if (!window.RTCPeerConnection) {
    return;
  }
  var proto = window.RTCPeerConnection.prototype;
  var nativeAddEventListener = proto.addEventListener;
  proto.addEventListener = function (nativeEventName, cb) {
    if (nativeEventName !== eventNameToWrap) {
      return nativeAddEventListener.apply(this, arguments);
    }
    var wrappedCallback = function wrappedCallback(e) {
      cb(wrapper(e));
    };
    this._eventMap = this._eventMap || {};
    this._eventMap[cb] = wrappedCallback;
    return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
  };

  var nativeRemoveEventListener = proto.removeEventListener;
  proto.removeEventListener = function (nativeEventName, cb) {
    if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[cb]) {
      return nativeRemoveEventListener.apply(this, arguments);
    }
    var unwrappedCb = this._eventMap[cb];
    delete this._eventMap[cb];
    return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
  };

  Object.defineProperty(proto, 'on' + eventNameToWrap, {
    get: function get() {
      return this['_on' + eventNameToWrap];
    },
    set: function set(cb) {
      if (this['_on' + eventNameToWrap]) {
        this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
        delete this['_on' + eventNameToWrap];
      }
      if (cb) {
        this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
      }
    }
  });
}

module.exports = {
  shimRTCIceCandidate: function shimRTCIceCandidate(window) {
    // foundation is arbitrarily chosen as an indicator for full support for
    // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
    if (window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) {
      return;
    }

    var NativeRTCIceCandidate = window.RTCIceCandidate;
    window.RTCIceCandidate = function (args) {
      // Remove the a= which shouldn't be part of the candidate string.
      if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
        args = JSON.parse(JSON.stringify(args));
        args.candidate = args.candidate.substr(2);
      }

      // Augment the native candidate with the parsed fields.
      var nativeCandidate = new NativeRTCIceCandidate(args);
      var parsedCandidate = SDPUtils.parseCandidate(args.candidate);
      var augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate);

      // Add a serializer that does not serialize the extra attributes.
      augmentedCandidate.toJSON = function () {
        return {
          candidate: augmentedCandidate.candidate,
          sdpMid: augmentedCandidate.sdpMid,
          sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
          usernameFragment: augmentedCandidate.usernameFragment
        };
      };
      return augmentedCandidate;
    };

    // Hook up the augmented candidate in onicecandidate and
    // addEventListener('icecandidate', ...)
    wrapPeerConnectionEvent(window, 'icecandidate', function (e) {
      if (e.candidate) {
        Object.defineProperty(e, 'candidate', {
          value: new window.RTCIceCandidate(e.candidate),
          writable: 'false'
        });
      }
      return e;
    });
  },

  // shimCreateObjectURL must be called before shimSourceObject to avoid loop.

  shimCreateObjectURL: function shimCreateObjectURL(window) {
    var URL = window && window.URL;

    if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.HTMLMediaElement && 'srcObject' in window.HTMLMediaElement.prototype && URL.createObjectURL && URL.revokeObjectURL)) {
      // Only shim CreateObjectURL using srcObject if srcObject exists.
      return undefined;
    }

    var nativeCreateObjectURL = URL.createObjectURL.bind(URL);
    var nativeRevokeObjectURL = URL.revokeObjectURL.bind(URL);
    var streams = new Map(),
        newId = 0;

    URL.createObjectURL = function (stream) {
      if ('getTracks' in stream) {
        var url = 'polyblob:' + ++newId;
        streams.set(url, stream);
        utils.deprecated('URL.createObjectURL(stream)', 'elem.srcObject = stream');
        return url;
      }
      return nativeCreateObjectURL(stream);
    };
    URL.revokeObjectURL = function (url) {
      nativeRevokeObjectURL(url);
      streams.delete(url);
    };

    var dsc = Object.getOwnPropertyDescriptor(window.HTMLMediaElement.prototype, 'src');
    Object.defineProperty(window.HTMLMediaElement.prototype, 'src', {
      get: function get() {
        return dsc.get.apply(this);
      },
      set: function set(url) {
        this.srcObject = streams.get(url) || null;
        return dsc.set.apply(this, [url]);
      }
    });

    var nativeSetAttribute = window.HTMLMediaElement.prototype.setAttribute;
    window.HTMLMediaElement.prototype.setAttribute = function () {
      if (arguments.length === 2 && ('' + arguments[0]).toLowerCase() === 'src') {
        this.srcObject = streams.get(arguments[1]) || null;
      }
      return nativeSetAttribute.apply(this, arguments);
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbl9zaGltLmpzIl0sIm5hbWVzIjpbIlNEUFV0aWxzIiwicmVxdWlyZSIsInV0aWxzIiwid3JhcFBlZXJDb25uZWN0aW9uRXZlbnQiLCJ3aW5kb3ciLCJldmVudE5hbWVUb1dyYXAiLCJ3cmFwcGVyIiwiUlRDUGVlckNvbm5lY3Rpb24iLCJwcm90byIsInByb3RvdHlwZSIsIm5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIiLCJhZGRFdmVudExpc3RlbmVyIiwibmF0aXZlRXZlbnROYW1lIiwiY2IiLCJhcHBseSIsImFyZ3VtZW50cyIsIndyYXBwZWRDYWxsYmFjayIsImUiLCJfZXZlbnRNYXAiLCJuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInVud3JhcHBlZENiIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJzZXQiLCJtb2R1bGUiLCJleHBvcnRzIiwic2hpbVJUQ0ljZUNhbmRpZGF0ZSIsIlJUQ0ljZUNhbmRpZGF0ZSIsIk5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZSIsImFyZ3MiLCJjYW5kaWRhdGUiLCJpbmRleE9mIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5Iiwic3Vic3RyIiwibmF0aXZlQ2FuZGlkYXRlIiwicGFyc2VkQ2FuZGlkYXRlIiwicGFyc2VDYW5kaWRhdGUiLCJhdWdtZW50ZWRDYW5kaWRhdGUiLCJhc3NpZ24iLCJ0b0pTT04iLCJzZHBNaWQiLCJzZHBNTGluZUluZGV4IiwidXNlcm5hbWVGcmFnbWVudCIsInZhbHVlIiwid3JpdGFibGUiLCJzaGltQ3JlYXRlT2JqZWN0VVJMIiwiVVJMIiwiSFRNTE1lZGlhRWxlbWVudCIsImNyZWF0ZU9iamVjdFVSTCIsInJldm9rZU9iamVjdFVSTCIsInVuZGVmaW5lZCIsIm5hdGl2ZUNyZWF0ZU9iamVjdFVSTCIsImJpbmQiLCJuYXRpdmVSZXZva2VPYmplY3RVUkwiLCJzdHJlYW1zIiwiTWFwIiwibmV3SWQiLCJzdHJlYW0iLCJ1cmwiLCJkZXByZWNhdGVkIiwiZGVsZXRlIiwiZHNjIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwic3JjT2JqZWN0IiwibmF0aXZlU2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwibGVuZ3RoIiwidG9Mb3dlckNhc2UiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBT0M7QUFDRDs7OztBQUVBLElBQUlBLFdBQVdDLFFBQVEsS0FBUixDQUFmO0FBQ0EsSUFBSUMsUUFBUUQsUUFBUSxTQUFSLENBQVo7O0FBRUE7QUFDQTtBQUNBLFNBQVNFLHVCQUFULENBQWlDQyxNQUFqQyxFQUF5Q0MsZUFBekMsRUFBMERDLE9BQTFELEVBQW1FO0FBQ2pFLE1BQUksQ0FBQ0YsT0FBT0csaUJBQVosRUFBK0I7QUFDN0I7QUFDRDtBQUNELE1BQUlDLFFBQVFKLE9BQU9HLGlCQUFQLENBQXlCRSxTQUFyQztBQUNBLE1BQUlDLHlCQUF5QkYsTUFBTUcsZ0JBQW5DO0FBQ0FILFFBQU1HLGdCQUFOLEdBQXlCLFVBQVNDLGVBQVQsRUFBMEJDLEVBQTFCLEVBQThCO0FBQ3JELFFBQUlELG9CQUFvQlAsZUFBeEIsRUFBeUM7QUFDdkMsYUFBT0ssdUJBQXVCSSxLQUF2QixDQUE2QixJQUE3QixFQUFtQ0MsU0FBbkMsQ0FBUDtBQUNEO0FBQ0QsUUFBSUMsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFTQyxDQUFULEVBQVk7QUFDaENKLFNBQUdQLFFBQVFXLENBQVIsQ0FBSDtBQUNELEtBRkQ7QUFHQSxTQUFLQyxTQUFMLEdBQWlCLEtBQUtBLFNBQUwsSUFBa0IsRUFBbkM7QUFDQSxTQUFLQSxTQUFMLENBQWVMLEVBQWYsSUFBcUJHLGVBQXJCO0FBQ0EsV0FBT04sdUJBQXVCSSxLQUF2QixDQUE2QixJQUE3QixFQUFtQyxDQUFDRixlQUFELEVBQ3hDSSxlQUR3QyxDQUFuQyxDQUFQO0FBRUQsR0FYRDs7QUFhQSxNQUFJRyw0QkFBNEJYLE1BQU1ZLG1CQUF0QztBQUNBWixRQUFNWSxtQkFBTixHQUE0QixVQUFTUixlQUFULEVBQTBCQyxF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Q0FBd0IxQyxTQUF4RCxFQUNnQyxLQURoQyxDQUFWO0FBRUFhLFdBQU9DLGNBQVAsQ0FBc0JuQixPQUFPK0MsZ0JBQVAsQ0FBd0IxQyxTQUE5QyxFQUF5RCxLQUF6RCxFQUFnRTtBQUM5RGUsV0FBSyxlQUFXO0FBQ2QsZUFBT3lDLElBQUl6QyxHQUFKLENBQVFWLEtBQVIsQ0FBYyxJQUFkLENBQVA7QUFDRCxPQUg2RDtBQUk5RFcsV0FBSyxhQUFTcUMsR0FBVCxFQUFjO0FBQ2pCLGFBQUtLLFNBQUwsR0FBaUJULFFBQVFsQyxHQUFSLENBQVlzQyxHQUFaLEtBQW9CLElBQXJDO0FBQ0EsZUFBT0csSUFBSXhDLEdBQUosQ0FBUVgsS0FBUixDQUFjLElBQWQsRUFBb0IsQ0FBQ2dELEdBQUQsQ0FBcEIsQ0FBUDtBQUNEO0FBUDZELEtBQWhFOztBQVVBLFFBQUlNLHFCQUFxQmhFLE9BQU8rQyxnQkFBUCxDQUF3QjFDLFNBQXhCLENBQWtDNEQsWUFBM0Q7QUFDQWpFLFdBQU8rQyxnQkFBUCxDQUF3QjFDLFNBQXhCLENBQWtDNEQsWUFBbEMsR0FBaUQsWUFBVztBQUMxRCxVQUFJdEQsVUFBVXVELE1BQVYsS0FBcUIsQ0FBckIsSUFDQSxDQUFDLEtBQUt2RCxVQUFVLENBQVYsQ0FBTixFQUFvQndELFdBQXBCLE9BQXNDLEtBRDFDLEVBQ2lEO0FBQy9DLGFBQUtKLFNBQUwsR0FBaUJULFFBQVFsQyxHQUFSLENBQVlULFVBQVUsQ0FBVixDQUFaLEtBQTZCLElBQTlDO0FBQ0Q7QUFDRCxhQUFPcUQsbUJBQW1CdEQsS0FBbkIsQ0FBeUIsSUFBekIsRUFBK0JDLFNBQS9CLENBQVA7QUFDRCxLQU5EO0FBT0Q7QUFwR2MsQ0FBakIiLCJmaWxlIjoiY29tbW9uX3NoaW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogIENvcHlyaWdodCAoYykgMjAxNyBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFNEUFV0aWxzID0gcmVxdWlyZSgnc2RwJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8vIFdyYXBzIHRoZSBwZWVyY29ubmVjdGlvbiBldmVudCBldmVudE5hbWVUb1dyYXAgaW4gYSBmdW5jdGlvblxuLy8gd2hpY2ggcmV0dXJucyB0aGUgbW9kaWZpZWQgZXZlbnQgb2JqZWN0LlxuZnVuY3Rpb24gd3JhcFBlZXJDb25uZWN0aW9uRXZlbnQod2luZG93LCBldmVudE5hbWVUb1dyYXAsIHdyYXBwZXIpIHtcbiAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHByb3RvID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcbiAgdmFyIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIgPSBwcm90by5hZGRFdmVudExpc3RlbmVyO1xuICBwcm90by5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24obmF0aXZlRXZlbnROYW1lLCBjYikge1xuICAgIGlmIChuYXRpdmVFdmVudE5hbWUgIT09IGV2ZW50TmFtZVRvV3JhcCkge1xuICAgICAgcmV0dXJuIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgdmFyIHdyYXBwZWRDYWxsYmFjayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGNiKHdyYXBwZXIoZSkpO1xuICAgIH07XG4gICAgdGhpcy5fZXZlbnRNYXAgPSB0aGlzLl9ldmVudE1hcCB8fCB7fTtcbiAgICB0aGlzLl9ldmVudE1hcFtjYl0gPSB3cmFwcGVkQ2FsbGJhY2s7XG4gICAgcmV0dXJuIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgW25hdGl2ZUV2ZW50TmFtZSxcbiAgICAgIHdyYXBwZWRDYWxsYmFja10pO1xuICB9O1xuXG4gIHZhciBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyID0gcHJvdG8ucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbiAgcHJvdG8ucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKG5hdGl2ZUV2ZW50TmFtZSwgY2IpIHtcbiAgICBpZiAobmF0aXZlRXZlbnROYW1lICE9PSBldmVudE5hbWVUb1dyYXAgfHwgIXRoaXMuX2V2ZW50TWFwXG4gICAgICAgIHx8ICF0aGlzLl9ldmVudE1hcFtjYl0pIHtcbiAgICAgIHJldHVybiBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIHZhciB1bndyYXBwZWRDYiA9IHRoaXMuX2V2ZW50TWFwW2NiXTtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRNYXBbY2JdO1xuICAgIHJldHVybiBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIFtuYXRpdmVFdmVudE5hbWUsXG4gICAgICB1bndyYXBwZWRDYl0pO1xuICB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ29uJyArIGV2ZW50TmFtZVRvV3JhcCwge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF07XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICBpZiAodGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF0pIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZVRvV3JhcCxcbiAgICAgICAgICAgIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdKTtcbiAgICAgICAgZGVsZXRlIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdO1xuICAgICAgfVxuICAgICAgaWYgKGNiKSB7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWVUb1dyYXAsXG4gICAgICAgICAgICB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXSA9IGNiKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hpbVJUQ0ljZUNhbmRpZGF0ZTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gZm91bmRhdGlvbiBpcyBhcmJpdHJhcmlseSBjaG9zZW4gYXMgYW4gaW5kaWNhdG9yIGZvciBmdWxsIHN1cHBvcnQgZm9yXG4gICAgLy8gaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jcnRjaWNlY2FuZGlkYXRlLWludGVyZmFjZVxuICAgIGlmICh3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlICYmICdmb3VuZGF0aW9uJyBpblxuICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlLnByb3RvdHlwZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBOYXRpdmVSVENJY2VDYW5kaWRhdGUgPSB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlO1xuICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIGE9IHdoaWNoIHNob3VsZG4ndCBiZSBwYXJ0IG9mIHRoZSBjYW5kaWRhdGUgc3RyaW5nLlxuICAgICAgaWYgKHR5cGVvZiBhcmdzID09PSAnb2JqZWN0JyAmJiBhcmdzLmNhbmRpZGF0ZSAmJlxuICAgICAgICAgIGFyZ3MuY2FuZGlkYXRlLmluZGV4T2YoJ2E9JykgPT09IDApIHtcbiAgICAgICAgYXJncyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXJncykpO1xuICAgICAgICBhcmdzLmNhbmRpZGF0ZSA9IGFyZ3MuY2FuZGlkYXRlLnN1YnN0cigyKTtcbiAgICAgIH1cblxuICAgICAgLy8gQXVnbWVudCB0aGUgbmF0aXZlIGNhbmRpZGF0ZSB3aXRoIHRoZSBwYXJzZWQgZmllbGRzLlxuICAgICAgdmFyIG5hdGl2ZUNhbmRpZGF0ZSA9IG5ldyBOYXRpdmVSVENJY2VDYW5kaWRhdGUoYXJncyk7XG4gICAgICB2YXIgcGFyc2VkQ2FuZGlkYXRlID0gU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUoYXJncy5jYW5kaWRhdGUpO1xuICAgICAgdmFyIGF1Z21lbnRlZENhbmRpZGF0ZSA9IE9iamVjdC5hc3NpZ24obmF0aXZlQ2FuZGlkYXRlLFxuICAgICAgICAgIHBhcnNlZENhbmRpZGF0ZSk7XG5cbiAgICAgIC8vIEFkZCBhIHNlcmlhbGl6ZXIgdGhhdCBkb2VzIG5vdCBzZXJpYWxpemUgdGhlIGV4dHJhIGF0dHJpYnV0ZXMuXG4gICAgICBhdWdtZW50ZWRDYW5kaWRhdGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY2FuZGlkYXRlOiBhdWdtZW50ZWRDYW5kaWRhdGUuY2FuZGlkYXRlLFxuICAgICAgICAgIHNkcE1pZDogYXVnbWVudGVkQ2FuZGlkYXRlLnNkcE1pZCxcbiAgICAgICAgICBzZHBNTGluZUluZGV4OiBhdWdtZW50ZWRDYW5kaWRhdGUuc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICB1c2VybmFtZUZyYWdtZW50OiBhdWdtZW50ZWRDYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCxcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gYXVnbWVudGVkQ2FuZGlkYXRlO1xuICAgIH07XG5cbiAgICAvLyBIb29rIHVwIHRoZSBhdWdtZW50ZWQgY2FuZGlkYXRlIGluIG9uaWNlY2FuZGlkYXRlIGFuZFxuICAgIC8vIGFkZEV2ZW50TGlzdGVuZXIoJ2ljZWNhbmRpZGF0ZScsIC4uLilcbiAgICB3cmFwUGVlckNvbm5lY3Rpb25FdmVudCh3aW5kb3csICdpY2VjYW5kaWRhdGUnLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5jYW5kaWRhdGUpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsICdjYW5kaWRhdGUnLCB7XG4gICAgICAgICAgdmFsdWU6IG5ldyB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlKGUuY2FuZGlkYXRlKSxcbiAgICAgICAgICB3cml0YWJsZTogJ2ZhbHNlJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlO1xuICAgIH0pO1xuICB9LFxuXG4gIC8vIHNoaW1DcmVhdGVPYmplY3RVUkwgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIHNoaW1Tb3VyY2VPYmplY3QgdG8gYXZvaWQgbG9vcC5cblxuICBzaGltQ3JlYXRlT2JqZWN0VVJMOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgVVJMID0gd2luZG93ICYmIHdpbmRvdy5VUkw7XG5cbiAgICBpZiAoISh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudCAmJlxuICAgICAgICAgICdzcmNPYmplY3QnIGluIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSAmJlxuICAgICAgICBVUkwuY3JlYXRlT2JqZWN0VVJMICYmIFVSTC5yZXZva2VPYmplY3RVUkwpKSB7XG4gICAgICAvLyBPbmx5IHNoaW0gQ3JlYXRlT2JqZWN0VVJMIHVzaW5nIHNyY09iamVjdCBpZiBzcmNPYmplY3QgZXhpc3RzLlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB2YXIgbmF0aXZlQ3JlYXRlT2JqZWN0VVJMID0gVVJMLmNyZWF0ZU9iamVjdFVSTC5iaW5kKFVSTCk7XG4gICAgdmFyIG5hdGl2ZVJldm9rZU9iamVjdFVSTCA9IFVSTC5yZXZva2VPYmplY3RVUkwuYmluZChVUkwpO1xuICAgIHZhciBzdHJlYW1zID0gbmV3IE1hcCgpLCBuZXdJZCA9IDA7XG5cbiAgICBVUkwuY3JlYXRlT2JqZWN0VVJMID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICBpZiAoJ2dldFRyYWNrcycgaW4gc3RyZWFtKSB7XG4gICAgICAgIHZhciB1cmwgPSAncG9seWJsb2I6JyArICgrK25ld0lkKTtcbiAgICAgICAgc3RyZWFtcy5zZXQodXJsLCBzdHJlYW0pO1xuICAgICAgICB1dGlscy5kZXByZWNhdGVkKCdVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSknLFxuICAgICAgICAgICAgJ2VsZW0uc3JjT2JqZWN0ID0gc3RyZWFtJyk7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlQ3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XG4gICAgfTtcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMID0gZnVuY3Rpb24odXJsKSB7XG4gICAgICBuYXRpdmVSZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICAgIHN0cmVhbXMuZGVsZXRlKHVybCk7XG4gICAgfTtcblxuICAgIHZhciBkc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3JjJyk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSwgJ3NyYycsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBkc2MuZ2V0LmFwcGx5KHRoaXMpO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHRoaXMuc3JjT2JqZWN0ID0gc3RyZWFtcy5nZXQodXJsKSB8fCBudWxsO1xuICAgICAgICByZXR1cm4gZHNjLnNldC5hcHBseSh0aGlzLCBbdXJsXSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgbmF0aXZlU2V0QXR0cmlidXRlID0gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZTtcbiAgICB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJlxuICAgICAgICAgICgnJyArIGFyZ3VtZW50c1swXSkudG9Mb3dlckNhc2UoKSA9PT0gJ3NyYycpIHtcbiAgICAgICAgdGhpcy5zcmNPYmplY3QgPSBzdHJlYW1zLmdldChhcmd1bWVudHNbMV0pIHx8IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlU2V0QXR0cmlidXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxufTtcbiJdfQ==
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\webrtc-adapter\\src\\js\\common_shim.js","/..\\node_modules\\webrtc-adapter\\src\\js")
},{"./utils":17,"2ionoC":3,"buffer":2,"sdp":6}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

var utils = require('../utils');
var shimRTCPeerConnection = require('rtcpeerconnection-shim');

module.exports = {
  shimGetUserMedia: require('./getusermedia'),
  shimPeerConnection: function shimPeerConnection(window) {
    var browserDetails = utils.detectBrowser(window);

    if (window.RTCIceGatherer) {
      // ORTC defines an RTCIceCandidate object but no constructor.
      // Not implemented in Edge.
      if (!window.RTCIceCandidate) {
        window.RTCIceCandidate = function (args) {
          return args;
        };
      }
      // ORTC does not have a session description object but
      // other browsers (i.e. Chrome) that will support both PC and ORTC
      // in the future might have this defined already.
      if (!window.RTCSessionDescription) {
        window.RTCSessionDescription = function (args) {
          return args;
        };
      }
      // this adds an additional event listener to MediaStrackTrack that signals
      // when a tracks enabled property was changed. Workaround for a bug in
      // addStream, see below. No longer required in 15025+
      if (browserDetails.version < 15025) {
        var origMSTEnabled = Object.getOwnPropertyDescriptor(window.MediaStreamTrack.prototype, 'enabled');
        Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
          set: function set(value) {
            origMSTEnabled.set.call(this, value);
            var ev = new Event('enabled');
            ev.enabled = value;
            this.dispatchEvent(ev);
          }
        });
      }
    }

    // ORTC defines the DTMF sender a bit different.
    // https://github.com/w3c/ortc/issues/714
    if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
      Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
        get: function get() {
          if (this._dtmf === undefined) {
            if (this.track.kind === 'audio') {
              this._dtmf = new window.RTCDtmfSender(this);
            } else if (this.track.kind === 'video') {
              this._dtmf = null;
            }
          }
          return this._dtmf;
        }
      });
    }

    window.RTCPeerConnection = shimRTCPeerConnection(window, browserDetails.version);
  },
  shimReplaceTrack: function shimReplaceTrack(window) {
    // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
    if (window.RTCRtpSender && !('replaceTrack' in window.RTCRtpSender.prototype)) {
      window.RTCRtpSender.prototype.replaceTrack = window.RTCRtpSender.prototype.setTrack;
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkZ2Vfc2hpbS5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsInJlcXVpcmUiLCJzaGltUlRDUGVlckNvbm5lY3Rpb24iLCJtb2R1bGUiLCJleHBvcnRzIiwic2hpbUdldFVzZXJNZWRpYSIsInNoaW1QZWVyQ29ubmVjdGlvbiIsIndpbmRvdyIsImJyb3dzZXJEZXRhaWxzIiwiZGV0ZWN0QnJvd3NlciIsIlJUQ0ljZUdhdGhlcmVyIiwiUlRDSWNlQ2FuZGlkYXRlIiwiYXJncyIsIlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiIsInZlcnNpb24iLCJvcmlnTVNURW5hYmxlZCIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIk1lZGlhU3RyZWFtVHJhY2siLCJwcm90b3R5cGUiLCJkZWZpbmVQcm9wZXJ0eSIsInNldCIsInZhbHVlIiwiY2FsbCIsImV2IiwiRXZlbnQiLCJlbmFibGVkIiwiZGlzcGF0Y2hFdmVudCIsIlJUQ1J0cFNlbmRlciIsImdldCIsIl9kdG1mIiwidW5kZWZpbmVkIiwidHJhY2siLCJraW5kIiwiUlRDRHRtZlNlbmRlciIsIlJUQ1BlZXJDb25uZWN0aW9uIiwic2hpbVJlcGxhY2VUcmFjayIsInJlcGxhY2VUcmFjayIsInNldFRyYWNrIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQU9DO0FBQ0Q7O0FBRUEsSUFBSUEsUUFBUUMsUUFBUSxVQUFSLENBQVo7QUFDQSxJQUFJQyx3QkFBd0JELFFBQVEsd0JBQVIsQ0FBNUI7O0FBRUFFLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsb0JBQWtCSixRQUFRLGdCQUFSLENBREg7QUFFZkssc0JBQW9CLDRCQUFTQyxNQUFULEVBQWlCO0FBQ25DLFFBQUlDLGlCQUFpQlIsTUFBTVMsYUFBTixDQUFvQkYsTUFBcEIsQ0FBckI7O0FBRUEsUUFBSUEsT0FBT0csY0FBWCxFQUEyQjtBQUN6QjtBQUNBO0FBQ0EsVUFBSSxDQUFDSCxPQUFPSSxlQUFaLEVBQTZCO0FBQzNCSixlQUFPSSxlQUFQLEdBQXlCLFVBQVNDLElBQVQsRUFBZTtBQUN0QyxpQkFBT0EsSUFBUDtBQUNELFNBRkQ7QUFHRDtBQUNEO0FBQ0E7QUFDQTtBQUNBLFVBQUksQ0FBQ0wsT0FBT00scUJBQVosRUFBbUM7QUFDakNOLGVBQU9NLHFCQUFQLEdBQStCLFVBQVNELElBQVQsRUFBZTtBQUM1QyxpQkFBT0EsSUFBUDtBQUNELFNBRkQ7QUFHRDtBQUNEO0FBQ0E7QUFDQTtBQUNBLFVBQUlKLGVBQWVNLE9BQWYsR0FBeUIsS0FBN0IsRUFBb0M7QUFDbEMsWUFBSUMsaUJBQWlCQyxPQUFPQyx3QkFBUCxDQUNqQlYsT0FBT1csZ0JBQVAsQ0FBd0JDLFNBRFAsRUFDa0IsU0FEbEIsQ0FBckI7QUFFQUgsZUFBT0ksY0FBUCxDQUFzQmIsT0FBT1csZ0JBQVAsQ0FBd0JDLFNBQTlDLEVBQXlELFNBQXpELEVBQW9FO0FBQ2xFRSxlQUFLLGFBQVNDLEtBQVQsRUFBZ0I7QUFDbkJQLDJCQUFlTSxHQUFmLENBQW1CRSxJQUFuQixDQUF3QixJQUF4QixFQUE4QkQsS0FBOUI7QUFDQSxnQkFBSUUsS0FBSyxJQUFJQyxLQUFKLENBQVUsU0FBVixDQUFUO0FBQ0FELGVBQUdFLE9BQUgsR0FBYUosS0FBYjtBQUNBLGlCQUFLSyxhQUFMLENBQW1CSCxFQUFuQjtBQUNEO0FBTmlFLFNBQXBFO0FBUUQ7QUFDRjs7QUFFRDtBQUNBO0FBQ0EsUUFBSWpCLE9BQU9xQixZQUFQLElBQXVCLEVBQUUsVUFBVXJCLE9BQU9xQixZQUFQLENBQW9CVCxTQUFoQyxDQUEzQixFQUF1RTtBQUNyRUgsYUFBT0ksY0FBUCxDQUFzQmIsT0FBT3FCLFlBQVAsQ0FBb0JULFNBQTFDLEVBQXFELE1BQXJELEVBQTZEO0FBQzNEVSxhQUFLLGVBQVc7QUFDZCxjQUFJLEtBQUtDLEtBQUwsS0FBZUMsU0FBbkIsRUFBOEI7QUFDNUIsZ0JBQUksS0FBS0MsS0FBTCxDQUFXQyxJQUFYLEtBQW9CLE9BQXhCLEVBQWlDO0FBQy9CLG1CQUFLSCxLQUFMLEdBQWEsSUFBSXZCLE9BQU8yQixhQUFYLENBQXlCLElBQXpCLENBQWI7QUFDRCxhQUZELE1BRU8sSUFBSSxLQUFLRixLQUFMLENBQVdDLElBQVgsS0FBb0IsT0FBeEIsRUFBaUM7QUFDdEMsbUJBQUtILEtBQUwsR0FBYSxJQUFiO0FBQ0Q7QUFDRjtBQUNELGlCQUFPLEtBQUtBLEtBQVo7QUFDRDtBQVYwRCxPQUE3RDtBQVlEOztBQUVEdkIsV0FBTzRCLGlCQUFQLEdBQ0lqQyxzQkFBc0JLLE1BQXRCLEVBQThCQyxlQUFlTSxPQUE3QyxDQURKO0FBRUQsR0F6RGM7QUEwRGZzQixvQkFBa0IsMEJBQVM3QixNQUFULEVBQWlCO0FBQ2pDO0FBQ0EsUUFBSUEsT0FBT3FCLFlBQVAsSUFDQSxFQUFFLGtCQUFrQnJCLE9BQU9xQixZQUFQLENBQW9CVCxTQUF4QyxDQURKLEVBQ3dEO0FBQ3REWixhQUFPcUIsWUFBUCxDQUFvQlQsU0FBcEIsQ0FBOEJrQixZQUE5QixHQUNJOUIsT0FBT3FCLFlBQVAsQ0FBb0JULFNBQXBCLENBQThCbUIsUUFEbEM7QUFFRDtBQUNGO0FBakVjLENBQWpCIiwiZmlsZSI6ImVkZ2Vfc2hpbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIHNoaW1SVENQZWVyQ29ubmVjdGlvbiA9IHJlcXVpcmUoJ3J0Y3BlZXJjb25uZWN0aW9uLXNoaW0nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNoaW1HZXRVc2VyTWVkaWE6IHJlcXVpcmUoJy4vZ2V0dXNlcm1lZGlhJyksXG4gIHNoaW1QZWVyQ29ubmVjdGlvbjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuXG4gICAgaWYgKHdpbmRvdy5SVENJY2VHYXRoZXJlcikge1xuICAgICAgLy8gT1JUQyBkZWZpbmVzIGFuIFJUQ0ljZUNhbmRpZGF0ZSBvYmplY3QgYnV0IG5vIGNvbnN0cnVjdG9yLlxuICAgICAgLy8gTm90IGltcGxlbWVudGVkIGluIEVkZ2UuXG4gICAgICBpZiAoIXdpbmRvdy5SVENJY2VDYW5kaWRhdGUpIHtcbiAgICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICByZXR1cm4gYXJncztcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIC8vIE9SVEMgZG9lcyBub3QgaGF2ZSBhIHNlc3Npb24gZGVzY3JpcHRpb24gb2JqZWN0IGJ1dFxuICAgICAgLy8gb3RoZXIgYnJvd3NlcnMgKGkuZS4gQ2hyb21lKSB0aGF0IHdpbGwgc3VwcG9ydCBib3RoIFBDIGFuZCBPUlRDXG4gICAgICAvLyBpbiB0aGUgZnV0dXJlIG1pZ2h0IGhhdmUgdGhpcyBkZWZpbmVkIGFscmVhZHkuXG4gICAgICBpZiAoIXdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pIHtcbiAgICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICByZXR1cm4gYXJncztcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIC8vIHRoaXMgYWRkcyBhbiBhZGRpdGlvbmFsIGV2ZW50IGxpc3RlbmVyIHRvIE1lZGlhU3RyYWNrVHJhY2sgdGhhdCBzaWduYWxzXG4gICAgICAvLyB3aGVuIGEgdHJhY2tzIGVuYWJsZWQgcHJvcGVydHkgd2FzIGNoYW5nZWQuIFdvcmthcm91bmQgZm9yIGEgYnVnIGluXG4gICAgICAvLyBhZGRTdHJlYW0sIHNlZSBiZWxvdy4gTm8gbG9uZ2VyIHJlcXVpcmVkIGluIDE1MDI1K1xuICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAxNTAyNSkge1xuICAgICAgICB2YXIgb3JpZ01TVEVuYWJsZWQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFxuICAgICAgICAgICAgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLCAnZW5hYmxlZCcpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93Lk1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLCAnZW5hYmxlZCcsIHtcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBvcmlnTVNURW5hYmxlZC5zZXQuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICB2YXIgZXYgPSBuZXcgRXZlbnQoJ2VuYWJsZWQnKTtcbiAgICAgICAgICAgIGV2LmVuYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPUlRDIGRlZmluZXMgdGhlIERUTUYgc2VuZGVyIGEgYml0IGRpZmZlcmVudC5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdzNjL29ydGMvaXNzdWVzLzcxNFxuICAgIGlmICh3aW5kb3cuUlRDUnRwU2VuZGVyICYmICEoJ2R0bWYnIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlLCAnZHRtZicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5fZHRtZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50cmFjay5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBuZXcgd2luZG93LlJUQ0R0bWZTZW5kZXIodGhpcyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHJhY2sua2luZCA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9XG4gICAgICAgIHNoaW1SVENQZWVyQ29ubmVjdGlvbih3aW5kb3csIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24pO1xuICB9LFxuICBzaGltUmVwbGFjZVRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBPUlRDIGhhcyByZXBsYWNlVHJhY2sgLS0gaHR0cHM6Ly9naXRodWIuY29tL3czYy9vcnRjL2lzc3Vlcy82MTRcbiAgICBpZiAod2luZG93LlJUQ1J0cFNlbmRlciAmJlxuICAgICAgICAhKCdyZXBsYWNlVHJhY2snIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xuICAgICAgd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUucmVwbGFjZVRyYWNrID1cbiAgICAgICAgICB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZS5zZXRUcmFjaztcbiAgICB9XG4gIH1cbn07XG4iXX0=
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\webrtc-adapter\\src\\js\\edge\\edge_shim.js","/..\\node_modules\\webrtc-adapter\\src\\js\\edge")
},{"../utils":17,"./getusermedia":13,"2ionoC":3,"buffer":2,"rtcpeerconnection-shim":5}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

// Expose public methods.

module.exports = function (window) {
  var navigator = window && window.navigator;

  var shimError_ = function shimError_(e) {
    return {
      name: { PermissionDeniedError: 'NotAllowedError' }[e.name] || e.name,
      message: e.message,
      constraint: e.constraint,
      toString: function toString() {
        return this.name;
      }
    };
  };

  // getUserMedia error shim.
  var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
  navigator.mediaDevices.getUserMedia = function (c) {
    return origGetUserMedia(c).catch(function (e) {
      return Promise.reject(shimError_(e));
    });
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdldHVzZXJtZWRpYS5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwid2luZG93IiwibmF2aWdhdG9yIiwic2hpbUVycm9yXyIsImUiLCJuYW1lIiwiUGVybWlzc2lvbkRlbmllZEVycm9yIiwibWVzc2FnZSIsImNvbnN0cmFpbnQiLCJ0b1N0cmluZyIsIm9yaWdHZXRVc2VyTWVkaWEiLCJtZWRpYURldmljZXMiLCJnZXRVc2VyTWVkaWEiLCJiaW5kIiwiYyIsImNhdGNoIiwiUHJvbWlzZSIsInJlamVjdCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFPQztBQUNEOztBQUVBOztBQUNBQSxPQUFPQyxPQUFQLEdBQWlCLFVBQVNDLE1BQVQsRUFBaUI7QUFDaEMsTUFBSUMsWUFBWUQsVUFBVUEsT0FBT0MsU0FBakM7O0FBRUEsTUFBSUMsYUFBYSxTQUFiQSxVQUFhLENBQVNDLENBQVQsRUFBWTtBQUMzQixXQUFPO0FBQ0xDLFlBQU0sRUFBQ0MsdUJBQXVCLGlCQUF4QixHQUEyQ0YsRUFBRUMsSUFBN0MsS0FBc0RELEVBQUVDLElBRHpEO0FBRUxFLGVBQVNILEVBQUVHLE9BRk47QUFHTEMsa0JBQVlKLEVBQUVJLFVBSFQ7QUFJTEMsZ0JBQVUsb0JBQVc7QUFDbkIsZUFBTyxLQUFLSixJQUFaO0FBQ0Q7QUFOSSxLQUFQO0FBUUQsR0FURDs7QUFXQTtBQUNBLE1BQUlLLG1CQUFtQlIsVUFBVVMsWUFBVixDQUF1QkMsWUFBdkIsQ0FDbkJDLElBRG1CLENBQ2RYLFVBQVVTLFlBREksQ0FBdkI7QUFFQVQsWUFBVVMsWUFBVixDQUF1QkMsWUFBdkIsR0FBc0MsVUFBU0UsQ0FBVCxFQUFZO0FBQ2hELFdBQU9KLGlCQUFpQkksQ0FBakIsRUFBb0JDLEtBQXBCLENBQTBCLFVBQVNYLENBQVQsRUFBWTtBQUMzQyxhQUFPWSxRQUFRQyxNQUFSLENBQWVkLFdBQVdDLENBQVgsQ0FBZixDQUFQO0FBQ0QsS0FGTSxDQUFQO0FBR0QsR0FKRDtBQUtELENBdEJEIiwiZmlsZSI6ImdldHVzZXJtZWRpYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdykge1xuICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XG5cbiAgdmFyIHNoaW1FcnJvcl8gPSBmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHtQZXJtaXNzaW9uRGVuaWVkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InfVtlLm5hbWVdIHx8IGUubmFtZSxcbiAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZSxcbiAgICAgIGNvbnN0cmFpbnQ6IGUuY29uc3RyYWludCxcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIC8vIGdldFVzZXJNZWRpYSBlcnJvciBzaGltLlxuICB2YXIgb3JpZ0dldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxuICAgICAgYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcbiAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjKSB7XG4gICAgcmV0dXJuIG9yaWdHZXRVc2VyTWVkaWEoYykuY2F0Y2goZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHNoaW1FcnJvcl8oZSkpO1xuICAgIH0pO1xuICB9O1xufTtcbiJdfQ==
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\webrtc-adapter\\src\\js\\edge\\getusermedia.js","/..\\node_modules\\webrtc-adapter\\src\\js\\edge")
},{"2ionoC":3,"buffer":2}],14:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = require('../utils');

var firefoxShim = {
  shimOnTrack: function shimOnTrack(window) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
        get: function get() {
          return this._ontrack;
        },
        set: function set(f) {
          if (this._ontrack) {
            this.removeEventListener('track', this._ontrack);
            this.removeEventListener('addstream', this._ontrackpoly);
          }
          this.addEventListener('track', this._ontrack = f);
          this.addEventListener('addstream', this._ontrackpoly = function (e) {
            e.stream.getTracks().forEach(function (track) {
              var event = new Event('track');
              event.track = track;
              event.receiver = { track: track };
              event.transceiver = { receiver: event.receiver };
              event.streams = [e.stream];
              this.dispatchEvent(event);
            }.bind(this));
          }.bind(this));
        }
      });
    }
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
      Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
        get: function get() {
          return { receiver: this.receiver };
        }
      });
    }
  },

  shimSourceObject: function shimSourceObject(window) {
    // Firefox has supported mozSrcObject since FF22, unprefixed in 42.
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
      if (window.HTMLMediaElement && !('srcObject' in window.HTMLMediaElement.prototype)) {
        // Shim the srcObject property, once, when HTMLMediaElement is found.
        Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
          get: function get() {
            return this.mozSrcObject;
          },
          set: function set(stream) {
            this.mozSrcObject = stream;
          }
        });
      }
    }
  },

  shimPeerConnection: function shimPeerConnection(window) {
    var browserDetails = utils.detectBrowser(window);

    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
      return; // probably media.peerconnection.enabled=false in about:config
    }
    // The RTCPeerConnection object.
    if (!window.RTCPeerConnection) {
      window.RTCPeerConnection = function (pcConfig, pcConstraints) {
        if (browserDetails.version < 38) {
          // .urls is not supported in FF < 38.
          // create RTCIceServers with a single url.
          if (pcConfig && pcConfig.iceServers) {
            var newIceServers = [];
            for (var i = 0; i < pcConfig.iceServers.length; i++) {
              var server = pcConfig.iceServers[i];
              if (server.hasOwnProperty('urls')) {
                for (var j = 0; j < server.urls.length; j++) {
                  var newServer = {
                    url: server.urls[j]
                  };
                  if (server.urls[j].indexOf('turn') === 0) {
                    newServer.username = server.username;
                    newServer.credential = server.credential;
                  }
                  newIceServers.push(newServer);
                }
              } else {
                newIceServers.push(pcConfig.iceServers[i]);
              }
            }
            pcConfig.iceServers = newIceServers;
          }
        }
        return new window.mozRTCPeerConnection(pcConfig, pcConstraints);
      };
      window.RTCPeerConnection.prototype = window.mozRTCPeerConnection.prototype;

      // wrap static methods. Currently just generateCertificate.
      if (window.mozRTCPeerConnection.generateCertificate) {
        Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
          get: function get() {
            return window.mozRTCPeerConnection.generateCertificate;
          }
        });
      }

      window.RTCSessionDescription = window.mozRTCSessionDescription;
      window.RTCIceCandidate = window.mozRTCIceCandidate;
    }

    // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
      var nativeMethod = window.RTCPeerConnection.prototype[method];
      window.RTCPeerConnection.prototype[method] = function () {
        arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
        return nativeMethod.apply(this, arguments);
      };
    });

    // support for addIceCandidate(null or undefined)
    var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
    window.RTCPeerConnection.prototype.addIceCandidate = function () {
      if (!arguments[0]) {
        if (arguments[1]) {
          arguments[1].apply(null);
        }
        return Promise.resolve();
      }
      return nativeAddIceCandidate.apply(this, arguments);
    };

    // shim getStats with maplike support
    var makeMapStats = function makeMapStats(stats) {
      var map = new Map();
      Object.keys(stats).forEach(function (key) {
        map.set(key, stats[key]);
        map[key] = stats[key];
      });
      return map;
    };

    var modernStatsTypes = {
      inboundrtp: 'inbound-rtp',
      outboundrtp: 'outbound-rtp',
      candidatepair: 'candidate-pair',
      localcandidate: 'local-candidate',
      remotecandidate: 'remote-candidate'
    };

    var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function (selector, onSucc, onErr) {
      return nativeGetStats.apply(this, [selector || null]).then(function (stats) {
        if (browserDetails.version < 48) {
          stats = makeMapStats(stats);
        }
        if (browserDetails.version < 53 && !onSucc) {
          // Shim only promise getStats with spec-hyphens in type names
          // Leave callback version alone; misc old uses of forEach before Map
          try {
            stats.forEach(function (stat) {
              stat.type = modernStatsTypes[stat.type] || stat.type;
            });
          } catch (e) {
            if (e.name !== 'TypeError') {
              throw e;
            }
            // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
            stats.forEach(function (stat, i) {
              stats.set(i, Object.assign({}, stat, {
                type: modernStatsTypes[stat.type] || stat.type
              }));
            });
          }
        }
        return stats;
      }).then(onSucc, onErr);
    };
  }
};

// Expose public methods.
module.exports = {
  shimOnTrack: firefoxShim.shimOnTrack,
  shimSourceObject: firefoxShim.shimSourceObject,
  shimPeerConnection: firefoxShim.shimPeerConnection,
  shimGetUserMedia: require('./getusermedia')
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpcmVmb3hfc2hpbS5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsInJlcXVpcmUiLCJmaXJlZm94U2hpbSIsInNoaW1PblRyYWNrIiwid2luZG93IiwiUlRDUGVlckNvbm5lY3Rpb24iLCJwcm90b3R5cGUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsIl9vbnRyYWNrIiwic2V0IiwiZiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfb250cmFja3BvbHkiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInN0cmVhbSIsImdldFRyYWNrcyIsImZvckVhY2giLCJ0cmFjayIsImV2ZW50IiwiRXZlbnQiLCJyZWNlaXZlciIsInRyYW5zY2VpdmVyIiwic3RyZWFtcyIsImRpc3BhdGNoRXZlbnQiLCJiaW5kIiwiUlRDVHJhY2tFdmVudCIsInNoaW1Tb3VyY2VPYmplY3QiLCJIVE1MTWVkaWFFbGVtZW50IiwibW96U3JjT2JqZWN0Iiwic2hpbVBlZXJDb25uZWN0aW9uIiwiYnJvd3NlckRldGFpbHMiLCJkZXRlY3RCcm93c2VyIiwibW96UlRDUGVlckNvbm5lY3Rpb24iLCJwY0NvbmZpZyIsInBjQ29uc3RyYWludHMiLCJ2ZXJzaW9uIiwiaWNlU2VydmVycyIsIm5ld0ljZVNlcnZlcnMiLCJpIiwibGVuZ3RoIiwic2VydmVyIiwiaGFzT3duUHJvcGVydHkiLCJqIiwidXJscyIsIm5ld1NlcnZlciIsInVybCIsImluZGV4T2YiLCJ1c2VybmFtZSIsImNyZWRlbnRpYWwiLCJwdXNoIiwiZ2VuZXJhdGVDZXJ0aWZpY2F0ZSIsIlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiIsIm1velJUQ1Nlc3Npb25EZXNjcmlwdGlvbiIsIlJUQ0ljZUNhbmRpZGF0ZSIsIm1velJUQ0ljZUNhbmRpZGF0ZSIsIm1ldGhvZCIsIm5hdGl2ZU1ldGhvZCIsImFyZ3VtZW50cyIsImFwcGx5IiwibmF0aXZlQWRkSWNlQ2FuZGlkYXRlIiwiYWRkSWNlQ2FuZGlkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJtYWtlTWFwU3RhdHMiLCJzdGF0cyIsIm1hcCIsIk1hcCIsImtleXMiLCJrZXkiLCJtb2Rlcm5TdGF0c1R5cGVzIiwiaW5ib3VuZHJ0cCIsIm91dGJvdW5kcnRwIiwiY2FuZGlkYXRlcGFpciIsImxvY2FsY2FuZGlkYXRlIiwicmVtb3RlY2FuZGlkYXRlIiwibmF0aXZlR2V0U3RhdHMiLCJnZXRTdGF0cyIsInNlbGVjdG9yIiwib25TdWNjIiwib25FcnIiLCJ0aGVuIiwic3RhdCIsInR5cGUiLCJuYW1lIiwiYXNzaWduIiwibW9kdWxlIiwiZXhwb3J0cyIsInNoaW1HZXRVc2VyTWVkaWEiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBT0M7QUFDRDs7OztBQUVBLElBQUlBLFFBQVFDLFFBQVEsVUFBUixDQUFaOztBQUVBLElBQUlDLGNBQWM7QUFDaEJDLGVBQWEscUJBQVNDLE1BQVQsRUFBaUI7QUFDNUIsUUFBSSxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQWxCLElBQThCQSxPQUFPQyxpQkFBckMsSUFBMEQsRUFBRSxhQUM1REQsT0FBT0MsaUJBQVAsQ0FBeUJDLFNBRGlDLENBQTlELEVBQ3lDO0FBQ3ZDQyxhQUFPQyxjQUFQLENBQXNCSixPQUFPQyxpQkFBUCxDQUF5QkMsU0FBL0MsRUFBMEQsU0FBMUQsRUFBcUU7QUFDbkVHLGFBQUssZUFBVztBQUNkLGlCQUFPLEtBQUtDLFFBQVo7QUFDRCxTQUhrRTtBQUluRUMsYUFBSyxhQUFTQyxDQUFULEVBQVk7QUFDZixjQUFJLEtBQUtGLFFBQVQsRUFBbUI7QUFDakIsaUJBQUtHLG1CQUFMLENBQXlCLE9BQXpCLEVBQWtDLEtBQUtILFFBQXZDO0FBQ0EsaUJBQUtHLG1CQUFMLENBQXlCLFdBQXpCLEVBQXNDLEtBQUtDLFlBQTNDO0FBQ0Q7QUFDRCxlQUFLQyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixLQUFLTCxRQUFMLEdBQWdCRSxDQUEvQztBQUNBLGVBQUtHLGdCQUFMLENBQXNCLFdBQXRCLEVBQW1DLEtBQUtELFlBQUwsR0FB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QWtCSCxJQUFsQixFQUF3QjtBQUNuQ0Msc0JBQU1iLGlCQUFpQlksS0FBS0MsSUFBdEIsS0FBK0JELEtBQUtDO0FBRFAsZUFBeEIsQ0FBYjtBQUdELGFBSkQ7QUFLRDtBQUNGO0FBQ0QsZUFBT2xCLEtBQVA7QUFDRCxPQXpCSSxFQTBCSmdCLElBMUJJLENBMEJDRixNQTFCRCxFQTBCU0MsS0ExQlQsQ0FBUDtBQTJCRCxLQWhDRDtBQWlDRDtBQTFMZSxDQUFsQjs7QUE2TEE7QUFDQU0sT0FBT0MsT0FBUCxHQUFpQjtBQUNmdEYsZUFBYUQsWUFBWUMsV0FEVjtBQUVmMEIsb0JBQWtCM0IsWUFBWTJCLGdCQUZmO0FBR2ZHLHNCQUFvQjlCLFlBQVk4QixrQkFIakI7QUFJZjBELG9CQUFrQnpGLFFBQVEsZ0JBQVI7QUFKSCxDQUFqQiIsImZpbGUiOiJmaXJlZm94X3NoaW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxudmFyIGZpcmVmb3hTaGltID0ge1xuICBzaGltT25UcmFjazogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJiAhKCdvbnRyYWNrJyBpblxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbnRyYWNrJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9vbnRyYWNrO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICBpZiAodGhpcy5fb250cmFjaykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2spO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCB0aGlzLl9vbnRyYWNrcG9seSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrID0gZik7XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCB0aGlzLl9vbnRyYWNrcG9seSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUuc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xuICAgICAgICAgICAgICBldmVudC50cmFjayA9IHRyYWNrO1xuICAgICAgICAgICAgICBldmVudC5yZWNlaXZlciA9IHt0cmFjazogdHJhY2t9O1xuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogZXZlbnQucmVjZWl2ZXJ9O1xuICAgICAgICAgICAgICBldmVudC5zdHJlYW1zID0gW2Uuc3RyZWFtXTtcbiAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDVHJhY2tFdmVudCAmJlxuICAgICAgICAoJ3JlY2VpdmVyJyBpbiB3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUpICYmXG4gICAgICAgICEoJ3RyYW5zY2VpdmVyJyBpbiB3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlLCAndHJhbnNjZWl2ZXInLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHtyZWNlaXZlcjogdGhpcy5yZWNlaXZlcn07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBzaGltU291cmNlT2JqZWN0OiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBGaXJlZm94IGhhcyBzdXBwb3J0ZWQgbW96U3JjT2JqZWN0IHNpbmNlIEZGMjIsIHVucHJlZml4ZWQgaW4gNDIuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAod2luZG93LkhUTUxNZWRpYUVsZW1lbnQgJiZcbiAgICAgICAgISgnc3JjT2JqZWN0JyBpbiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUpKSB7XG4gICAgICAgIC8vIFNoaW0gdGhlIHNyY09iamVjdCBwcm9wZXJ0eSwgb25jZSwgd2hlbiBIVE1MTWVkaWFFbGVtZW50IGlzIGZvdW5kLlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLCAnc3JjT2JqZWN0Jywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb3pTcmNPYmplY3Q7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgICAgdGhpcy5tb3pTcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc2hpbVBlZXJDb25uZWN0aW9uOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgfHwgISh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gfHxcbiAgICAgICAgd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uKSkge1xuICAgICAgcmV0dXJuOyAvLyBwcm9iYWJseSBtZWRpYS5wZWVyY29ubmVjdGlvbi5lbmFibGVkPWZhbHNlIGluIGFib3V0OmNvbmZpZ1xuICAgIH1cbiAgICAvLyBUaGUgUlRDUGVlckNvbm5lY3Rpb24gb2JqZWN0LlxuICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xuICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDM4KSB7XG4gICAgICAgICAgLy8gLnVybHMgaXMgbm90IHN1cHBvcnRlZCBpbiBGRiA8IDM4LlxuICAgICAgICAgIC8vIGNyZWF0ZSBSVENJY2VTZXJ2ZXJzIHdpdGggYSBzaW5nbGUgdXJsLlxuICAgICAgICAgIGlmIChwY0NvbmZpZyAmJiBwY0NvbmZpZy5pY2VTZXJ2ZXJzKSB7XG4gICAgICAgICAgICB2YXIgbmV3SWNlU2VydmVycyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwY0NvbmZpZy5pY2VTZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSBwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldO1xuICAgICAgICAgICAgICBpZiAoc2VydmVyLmhhc093blByb3BlcnR5KCd1cmxzJykpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlcnZlci51cmxzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgbmV3U2VydmVyID0ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHNlcnZlci51cmxzW2pdXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgaWYgKHNlcnZlci51cmxzW2pdLmluZGV4T2YoJ3R1cm4nKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdTZXJ2ZXIudXNlcm5hbWUgPSBzZXJ2ZXIudXNlcm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIG5ld1NlcnZlci5jcmVkZW50aWFsID0gc2VydmVyLmNyZWRlbnRpYWw7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gobmV3U2VydmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHBjQ29uZmlnLmljZVNlcnZlcnNbaV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwY0NvbmZpZy5pY2VTZXJ2ZXJzID0gbmV3SWNlU2VydmVycztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpO1xuICAgICAgfTtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPVxuICAgICAgICAgIHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG5cbiAgICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXG4gICAgICBpZiAod2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGUpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiwgJ2dlbmVyYXRlQ2VydGlmaWNhdGUnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uID0gd2luZG93Lm1velJUQ1Nlc3Npb25EZXNjcmlwdGlvbjtcbiAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSB3aW5kb3cubW96UlRDSWNlQ2FuZGlkYXRlO1xuICAgIH1cblxuICAgIC8vIHNoaW0gYXdheSBuZWVkIGZvciBvYnNvbGV0ZSBSVENJY2VDYW5kaWRhdGUvUlRDU2Vzc2lvbkRlc2NyaXB0aW9uLlxuICAgIFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXJndW1lbnRzWzBdID0gbmV3ICgobWV0aG9kID09PSAnYWRkSWNlQ2FuZGlkYXRlJykgP1xuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgOlxuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pKGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBzdXBwb3J0IGZvciBhZGRJY2VDYW5kaWRhdGUobnVsbCBvciB1bmRlZmluZWQpXG4gICAgdmFyIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZSA9XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50c1swXSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzWzFdKSB7XG4gICAgICAgICAgYXJndW1lbnRzWzFdLmFwcGx5KG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVBZGRJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgLy8gc2hpbSBnZXRTdGF0cyB3aXRoIG1hcGxpa2Ugc3VwcG9ydFxuICAgIHZhciBtYWtlTWFwU3RhdHMgPSBmdW5jdGlvbihzdGF0cykge1xuICAgICAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgIE9iamVjdC5rZXlzKHN0YXRzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBtYXAuc2V0KGtleSwgc3RhdHNba2V5XSk7XG4gICAgICAgIG1hcFtrZXldID0gc3RhdHNba2V5XTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9O1xuXG4gICAgdmFyIG1vZGVyblN0YXRzVHlwZXMgPSB7XG4gICAgICBpbmJvdW5kcnRwOiAnaW5ib3VuZC1ydHAnLFxuICAgICAgb3V0Ym91bmRydHA6ICdvdXRib3VuZC1ydHAnLFxuICAgICAgY2FuZGlkYXRlcGFpcjogJ2NhbmRpZGF0ZS1wYWlyJyxcbiAgICAgIGxvY2FsY2FuZGlkYXRlOiAnbG9jYWwtY2FuZGlkYXRlJyxcbiAgICAgIHJlbW90ZWNhbmRpZGF0ZTogJ3JlbW90ZS1jYW5kaWRhdGUnXG4gICAgfTtcblxuICAgIHZhciBuYXRpdmVHZXRTdGF0cyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHM7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cyA9IGZ1bmN0aW9uKFxuICAgICAgc2VsZWN0b3IsXG4gICAgICBvblN1Y2MsXG4gICAgICBvbkVyclxuICAgICkge1xuICAgICAgcmV0dXJuIG5hdGl2ZUdldFN0YXRzLmFwcGx5KHRoaXMsIFtzZWxlY3RvciB8fCBudWxsXSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oc3RhdHMpIHtcbiAgICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQ4KSB7XG4gICAgICAgICAgICBzdGF0cyA9IG1ha2VNYXBTdGF0cyhzdGF0cyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTMgJiYgIW9uU3VjYykge1xuICAgICAgICAgICAgLy8gU2hpbSBvbmx5IHByb21pc2UgZ2V0U3RhdHMgd2l0aCBzcGVjLWh5cGhlbnMgaW4gdHlwZSBuYW1lc1xuICAgICAgICAgICAgLy8gTGVhdmUgY2FsbGJhY2sgdmVyc2lvbiBhbG9uZTsgbWlzYyBvbGQgdXNlcyBvZiBmb3JFYWNoIGJlZm9yZSBNYXBcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHN0YXRzLmZvckVhY2goZnVuY3Rpb24oc3RhdCkge1xuICAgICAgICAgICAgICAgIHN0YXQudHlwZSA9IG1vZGVyblN0YXRzVHlwZXNbc3RhdC50eXBlXSB8fCBzdGF0LnR5cGU7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBpZiAoZS5uYW1lICE9PSAnVHlwZUVycm9yJykge1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gQXZvaWQgVHlwZUVycm9yOiBcInR5cGVcIiBpcyByZWFkLW9ubHksIGluIG9sZCB2ZXJzaW9ucy4gMzQtNDNpc2hcbiAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbihzdGF0LCBpKSB7XG4gICAgICAgICAgICAgICAgc3RhdHMuc2V0KGksIE9iamVjdC5hc3NpZ24oe30sIHN0YXQsIHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IG1vZGVyblN0YXRzVHlwZXNbc3RhdC50eXBlXSB8fCBzdGF0LnR5cGVcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RhdHM7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKG9uU3VjYywgb25FcnIpO1xuICAgIH07XG4gIH1cbn07XG5cbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaGltT25UcmFjazogZmlyZWZveFNoaW0uc2hpbU9uVHJhY2ssXG4gIHNoaW1Tb3VyY2VPYmplY3Q6IGZpcmVmb3hTaGltLnNoaW1Tb3VyY2VPYmplY3QsXG4gIHNoaW1QZWVyQ29ubmVjdGlvbjogZmlyZWZveFNoaW0uc2hpbVBlZXJDb25uZWN0aW9uLFxuICBzaGltR2V0VXNlck1lZGlhOiByZXF1aXJlKCcuL2dldHVzZXJtZWRpYScpXG59O1xuIl19
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\webrtc-adapter\\src\\js\\firefox\\firefox_shim.js","/..\\node_modules\\webrtc-adapter\\src\\js\\firefox")
},{"../utils":17,"./getusermedia":15,"2ionoC":3,"buffer":2}],15:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = require('../utils');
var logging = utils.log;

// Expose public methods.
module.exports = function (window) {
  var browserDetails = utils.detectBrowser(window);
  var navigator = window && window.navigator;
  var MediaStreamTrack = window && window.MediaStreamTrack;

  var shimError_ = function shimError_(e) {
    return {
      name: {
        InternalError: 'NotReadableError',
        NotSupportedError: 'TypeError',
        PermissionDeniedError: 'NotAllowedError',
        SecurityError: 'NotAllowedError'
      }[e.name] || e.name,
      message: {
        'The operation is insecure.': 'The request is not allowed by the ' + 'user agent or the platform in the current context.'
      }[e.message] || e.message,
      constraint: e.constraint,
      toString: function toString() {
        return this.name + (this.message && ': ') + this.message;
      }
    };
  };

  // getUserMedia constraints shim.
  var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
    var constraintsToFF37_ = function constraintsToFF37_(c) {
      if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) !== 'object' || c.require) {
        return c;
      }
      var require = [];
      Object.keys(c).forEach(function (key) {
        if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
          return;
        }
        var r = c[key] = _typeof(c[key]) === 'object' ? c[key] : { ideal: c[key] };
        if (r.min !== undefined || r.max !== undefined || r.exact !== undefined) {
          require.push(key);
        }
        if (r.exact !== undefined) {
          if (typeof r.exact === 'number') {
            r.min = r.max = r.exact;
          } else {
            c[key] = r.exact;
          }
          delete r.exact;
        }
        if (r.ideal !== undefined) {
          c.advanced = c.advanced || [];
          var oc = {};
          if (typeof r.ideal === 'number') {
            oc[key] = { min: r.ideal, max: r.ideal };
          } else {
            oc[key] = r.ideal;
          }
          c.advanced.push(oc);
          delete r.ideal;
          if (!Object.keys(r).length) {
            delete c[key];
          }
        }
      });
      if (require.length) {
        c.require = require;
      }
      return c;
    };
    constraints = JSON.parse(JSON.stringify(constraints));
    if (browserDetails.version < 38) {
      logging('spec: ' + JSON.stringify(constraints));
      if (constraints.audio) {
        constraints.audio = constraintsToFF37_(constraints.audio);
      }
      if (constraints.video) {
        constraints.video = constraintsToFF37_(constraints.video);
      }
      logging('ff37: ' + JSON.stringify(constraints));
    }
    return navigator.mozGetUserMedia(constraints, onSuccess, function (e) {
      onError(shimError_(e));
    });
  };

  // Returns the result of getUserMedia as a Promise.
  var getUserMediaPromise_ = function getUserMediaPromise_(constraints) {
    return new Promise(function (resolve, reject) {
      getUserMedia_(constraints, resolve, reject);
    });
  };

  // Shim for mediaDevices on older versions.
  if (!navigator.mediaDevices) {
    navigator.mediaDevices = { getUserMedia: getUserMediaPromise_,
      addEventListener: function addEventListener() {},
      removeEventListener: function removeEventListener() {}
    };
  }
  navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices || function () {
    return new Promise(function (resolve) {
      var infos = [{ kind: 'audioinput', deviceId: 'default', label: '', groupId: '' }, { kind: 'videoinput', deviceId: 'default', label: '', groupId: '' }];
      resolve(infos);
    });
  };

  if (browserDetails.version < 41) {
    // Work around http://bugzil.la/1169665
    var orgEnumerateDevices = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
    navigator.mediaDevices.enumerateDevices = function () {
      return orgEnumerateDevices().then(undefined, function (e) {
        if (e.name === 'NotFoundError') {
          return [];
        }
        throw e;
      });
    };
  }
  if (browserDetails.version < 49) {
    var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function (c) {
      return origGetUserMedia(c).then(function (stream) {
        // Work around https://bugzil.la/802326
        if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
          stream.getTracks().forEach(function (track) {
            track.stop();
          });
          throw new DOMException('The object can not be found here.', 'NotFoundError');
        }
        return stream;
      }, function (e) {
        return Promise.reject(shimError_(e));
      });
    };
  }
  if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
    var remap = function remap(obj, a, b) {
      if (a in obj && !(b in obj)) {
        obj[b] = obj[a];
        delete obj[a];
      }
    };

    var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function (c) {
      if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object' && _typeof(c.audio) === 'object') {
        c = JSON.parse(JSON.stringify(c));
        remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
        remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
      }
      return nativeGetUserMedia(c);
    };

    if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
      var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
      MediaStreamTrack.prototype.getSettings = function () {
        var obj = nativeGetSettings.apply(this, arguments);
        remap(obj, 'mozAutoGainControl', 'autoGainControl');
        remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
        return obj;
      };
    }

    if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
      var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
      MediaStreamTrack.prototype.applyConstraints = function (c) {
        if (this.kind === 'audio' && (typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object') {
          c = JSON.parse(JSON.stringify(c));
          remap(c, 'autoGainControl', 'mozAutoGainControl');
          remap(c, 'noiseSuppression', 'mozNoiseSuppression');
        }
        return nativeApplyConstraints.apply(this, [c]);
      };
    }
  }
  navigator.getUserMedia = function (constraints, onSuccess, onError) {
    if (browserDetails.version < 44) {
      return getUserMedia_(constraints, onSuccess, onError);
    }
    // Replace Firefox 44+'s deprecation warning with unprefixed version.
    utils.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdldHVzZXJtZWRpYS5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsInJlcXVpcmUiLCJsb2dnaW5nIiwibG9nIiwibW9kdWxlIiwiZXhwb3J0cyIsIndpbmRvdyIsImJyb3dzZXJEZXRhaWxzIiwiZGV0ZWN0QnJvd3NlciIsIm5hdmlnYXRvciIsIk1lZGlhU3RyZWFtVHJhY2siLCJzaGltRXJyb3JfIiwiZSIsIm5hbWUiLCJJbnRlcm5hbEVycm9yIiwiTm90U3VwcG9ydGVkRXJyb3IiLCJQZXJtaXNzaW9uRGVuaWVkRXJyb3IiLCJTZWN1cml0eUVycm9yIiwibWVzc2FnZSIsImNvbnN0cmFpbnQiLCJ0b1N0cmluZyIsImdldFVzZXJNZWRpYV8iLCJjb25zdHJhaW50cyIsIm9uU3VjY2VzcyIsIm9uRXJyb3IiLCJjb25zdHJhaW50c1RvRkYzN18iLCJjIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJyIiwiaWRlYWwiLCJtaW4iLCJ1bmRlZmluZWQiLCJtYXgiLCJleGFjdCIsInB1c2giLCJhZHZhbmNlZCIsIm9jIiwibGVuZ3RoIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwidmVyc2lvbiIsImF1ZGlvIiwidmlkZW8iLCJtb3pHZXRVc2VyTWVkaWEiLCJnZXRVc2VyTWVkaWFQcm9taXNlXyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibWVkaWFEZXZpY2VzIiwiZ2V0VXNlck1lZGlhIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJlbnVtZXJhdGVEZXZpY2VzIiwiaW5mb3MiLCJraW5kIiwiZGV2aWNlSWQiLCJsYWJlbCIsImdyb3VwSWQiLCJvcmdFbnVtZXJhdGVEZXZpY2VzIiwiYmluZCIsInRoZW4iLCJvcmlnR2V0VXNlck1lZGlhIiwic3RyZWFtIiwiZ2V0QXVkaW9UcmFja3MiLCJnZXRWaWRlb1RyYWNrcyIsImdldFRyYWNrcyIsInRyYWNrIiwic3RvcCIsIkRPTUV4Y2VwdGlvbiIsImdldFN1cHBvcnRlZENvbnN0cmFpbnRzIiwicmVtYXAiLCJvYmoiLCJhIiwiYiIsIm5hdGl2ZUdldFVzZXJNZWRpYSIsInByb3RvdHlwZSIsImdldFNldHRpbmdzIiwibmF0aXZlR2V0U2V0dGluZ3MiLCJhcHBseSIsImFyZ3VtZW50cyIsImFwcGx5Q29uc3RyYWludHMiLCJuYXRpdmVBcHBseUNvbnN0cmFpbnRzIiwiZGVwcmVjYXRlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFPQztBQUNEOzs7O0FBRUEsSUFBSUEsUUFBUUMsUUFBUSxVQUFSLENBQVo7QUFDQSxJQUFJQyxVQUFVRixNQUFNRyxHQUFwQjs7QUFFQTtBQUNBQyxPQUFPQyxPQUFQLEdBQWlCLFVBQVNDLE1BQVQsRUFBaUI7QUFDaEMsTUFBSUMsaUJBQWlCUCxNQUFNUSxhQUFOLENBQW9CRixNQUFwQixDQUFyQjtBQUNBLE1BQUlHLFlBQVlILFVBQVVBLE9BQU9HLFNBQWpDO0FBQ0EsTUFBSUMsbUJBQW1CSixVQUFVQSxPQUFPSSxnQkFBeEM7O0FBRUEsTUFBSUMsYUFBYSxTQUFiQSxVQUFhLENBQVNDLENBQVQsRUFBWTtBQUMzQixXQUFPO0FBQ0xDLFlBQU07QUFDSkMsdUJBQWUsa0JBRFg7QUFFSkMsMkJBQW1CLFdBRmY7QUFHSkMsK0JBQXVCLGlCQUhuQjtBQUlKQyx1QkFBZTtBQUpYLFFBS0pMLEVBQUVDLElBTEUsS0FLT0QsRUFBRUMsSUFOVjtBQU9MSyxlQUFTO0FBQ1Asc0NBQThCLHVDQUM5QjtBQUZPLFFBR1BOLEVBQUVNLE9BSEssS0FHT04sRUFBRU0sT0FWYjtBQVdMQyxrQkFBWVAsRUFBRU8sVUFYVDtBQVlMQyxnQkFBVSxvQkFBVztBQUNuQixlQUFPLEtBQUtQLElBQUwsSUFBYSxLQUFLSyxPQUFMLElBQWdCLElBQTdCLElBQXFDLEtBQUtBLE9BQWpEO0FBQ0Q7QUFkSSxLQUFQO0FBZ0JELEdBakJEOztBQW1CQTtBQUNBLE1BQUlHLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBU0MsV0FBVCxFQUFzQkMsU0FBdEIsRUFBaUND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LE9BQWpFO0FBQ0QsR0FSRDtBQVNELENBbE1EIiwiZmlsZSI6ImdldHVzZXJtZWRpYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XG5cbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93KSB7XG4gIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcbiAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xuICB2YXIgTWVkaWFTdHJlYW1UcmFjayA9IHdpbmRvdyAmJiB3aW5kb3cuTWVkaWFTdHJlYW1UcmFjaztcblxuICB2YXIgc2hpbUVycm9yXyA9IGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZToge1xuICAgICAgICBJbnRlcm5hbEVycm9yOiAnTm90UmVhZGFibGVFcnJvcicsXG4gICAgICAgIE5vdFN1cHBvcnRlZEVycm9yOiAnVHlwZUVycm9yJyxcbiAgICAgICAgUGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJyxcbiAgICAgICAgU2VjdXJpdHlFcnJvcjogJ05vdEFsbG93ZWRFcnJvcidcbiAgICAgIH1bZS5uYW1lXSB8fCBlLm5hbWUsXG4gICAgICBtZXNzYWdlOiB7XG4gICAgICAgICdUaGUgb3BlcmF0aW9uIGlzIGluc2VjdXJlLic6ICdUaGUgcmVxdWVzdCBpcyBub3QgYWxsb3dlZCBieSB0aGUgJyArXG4gICAgICAgICd1c2VyIGFnZW50IG9yIHRoZSBwbGF0Zm9ybSBpbiB0aGUgY3VycmVudCBjb250ZXh0LidcbiAgICAgIH1bZS5tZXNzYWdlXSB8fCBlLm1lc3NhZ2UsXG4gICAgICBjb25zdHJhaW50OiBlLmNvbnN0cmFpbnQsXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyAodGhpcy5tZXNzYWdlICYmICc6ICcpICsgdGhpcy5tZXNzYWdlO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgLy8gZ2V0VXNlck1lZGlhIGNvbnN0cmFpbnRzIHNoaW0uXG4gIHZhciBnZXRVc2VyTWVkaWFfID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICAgIHZhciBjb25zdHJhaW50c1RvRkYzN18gPSBmdW5jdGlvbihjKSB7XG4gICAgICBpZiAodHlwZW9mIGMgIT09ICdvYmplY3QnIHx8IGMucmVxdWlyZSkge1xuICAgICAgICByZXR1cm4gYztcbiAgICAgIH1cbiAgICAgIHZhciByZXF1aXJlID0gW107XG4gICAgICBPYmplY3Qua2V5cyhjKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBpZiAoa2V5ID09PSAncmVxdWlyZScgfHwga2V5ID09PSAnYWR2YW5jZWQnIHx8IGtleSA9PT0gJ21lZGlhU291cmNlJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgciA9IGNba2V5XSA9ICh0eXBlb2YgY1trZXldID09PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgY1trZXldIDoge2lkZWFsOiBjW2tleV19O1xuICAgICAgICBpZiAoci5taW4gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgci5tYXggIT09IHVuZGVmaW5lZCB8fCByLmV4YWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXF1aXJlLnB1c2goa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoci5leGFjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiByLmV4YWN0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgci4gbWluID0gci5tYXggPSByLmV4YWN0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjW2tleV0gPSByLmV4YWN0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWxldGUgci5leGFjdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoci5pZGVhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYy5hZHZhbmNlZCA9IGMuYWR2YW5jZWQgfHwgW107XG4gICAgICAgICAgdmFyIG9jID0ge307XG4gICAgICAgICAgaWYgKHR5cGVvZiByLmlkZWFsID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgb2Nba2V5XSA9IHttaW46IHIuaWRlYWwsIG1heDogci5pZGVhbH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9jW2tleV0gPSByLmlkZWFsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjLmFkdmFuY2VkLnB1c2gob2MpO1xuICAgICAgICAgIGRlbGV0ZSByLmlkZWFsO1xuICAgICAgICAgIGlmICghT2JqZWN0LmtleXMocikubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWxldGUgY1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAocmVxdWlyZS5sZW5ndGgpIHtcbiAgICAgICAgYy5yZXF1aXJlID0gcmVxdWlyZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjO1xuICAgIH07XG4gICAgY29uc3RyYWludHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAzOCkge1xuICAgICAgbG9nZ2luZygnc3BlYzogJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgICBpZiAoY29uc3RyYWludHMuYXVkaW8pIHtcbiAgICAgICAgY29uc3RyYWludHMuYXVkaW8gPSBjb25zdHJhaW50c1RvRkYzN18oY29uc3RyYWludHMuYXVkaW8pO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnN0cmFpbnRzLnZpZGVvKSB7XG4gICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gY29uc3RyYWludHNUb0ZGMzdfKGNvbnN0cmFpbnRzLnZpZGVvKTtcbiAgICAgIH1cbiAgICAgIGxvZ2dpbmcoJ2ZmMzc6ICcgKyBKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgIH1cbiAgICByZXR1cm4gbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYShjb25zdHJhaW50cywgb25TdWNjZXNzLCBmdW5jdGlvbihlKSB7XG4gICAgICBvbkVycm9yKHNoaW1FcnJvcl8oZSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIFJldHVybnMgdGhlIHJlc3VsdCBvZiBnZXRVc2VyTWVkaWEgYXMgYSBQcm9taXNlLlxuICB2YXIgZ2V0VXNlck1lZGlhUHJvbWlzZV8gPSBmdW5jdGlvbihjb25zdHJhaW50cykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGdldFVzZXJNZWRpYV8oY29uc3RyYWludHMsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gU2hpbSBmb3IgbWVkaWFEZXZpY2VzIG9uIG9sZGVyIHZlcnNpb25zLlxuICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzID0ge2dldFVzZXJNZWRpYTogZ2V0VXNlck1lZGlhUHJvbWlzZV8sXG4gICAgICBhZGRFdmVudExpc3RlbmVyOiBmdW5jdGlvbigpIHsgfSxcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uKCkgeyB9XG4gICAgfTtcbiAgfVxuICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMgPVxuICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzIHx8IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgIHZhciBpbmZvcyA9IFtcbiAgICAgICAgICAgIHtraW5kOiAnYXVkaW9pbnB1dCcsIGRldmljZUlkOiAnZGVmYXVsdCcsIGxhYmVsOiAnJywgZ3JvdXBJZDogJyd9LFxuICAgICAgICAgICAge2tpbmQ6ICd2aWRlb2lucHV0JywgZGV2aWNlSWQ6ICdkZWZhdWx0JywgbGFiZWw6ICcnLCBncm91cElkOiAnJ31cbiAgICAgICAgICBdO1xuICAgICAgICAgIHJlc29sdmUoaW5mb3MpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0MSkge1xuICAgIC8vIFdvcmsgYXJvdW5kIGh0dHA6Ly9idWd6aWwubGEvMTE2OTY2NVxuICAgIHZhciBvcmdFbnVtZXJhdGVEZXZpY2VzID1cbiAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzLmJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gb3JnRW51bWVyYXRlRGV2aWNlcygpLnRoZW4odW5kZWZpbmVkLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLm5hbWUgPT09ICdOb3RGb3VuZEVycm9yJykge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQ5KSB7XG4gICAgdmFyIG9yaWdHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cbiAgICAgICAgYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgIHJldHVybiBvcmlnR2V0VXNlck1lZGlhKGMpLnRoZW4oZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIC8vIFdvcmsgYXJvdW5kIGh0dHBzOi8vYnVnemlsLmxhLzgwMjMyNlxuICAgICAgICBpZiAoYy5hdWRpbyAmJiAhc3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkubGVuZ3RoIHx8XG4gICAgICAgICAgICBjLnZpZGVvICYmICFzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcbiAgICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgICAgdHJhY2suc3RvcCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1RoZSBvYmplY3QgY2FuIG5vdCBiZSBmb3VuZCBoZXJlLicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnTm90Rm91bmRFcnJvcicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHJlYW07XG4gICAgICB9LCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChzaGltRXJyb3JfKGUpKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbiAgaWYgKCEoYnJvd3NlckRldGFpbHMudmVyc2lvbiA+IDU1ICYmXG4gICAgICAnYXV0b0dhaW5Db250cm9sJyBpbiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFN1cHBvcnRlZENvbnN0cmFpbnRzKCkpKSB7XG4gICAgdmFyIHJlbWFwID0gZnVuY3Rpb24ob2JqLCBhLCBiKSB7XG4gICAgICBpZiAoYSBpbiBvYmogJiYgIShiIGluIG9iaikpIHtcbiAgICAgICAgb2JqW2JdID0gb2JqW2FdO1xuICAgICAgICBkZWxldGUgb2JqW2FdO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgbmF0aXZlR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXG4gICAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjKSB7XG4gICAgICBpZiAodHlwZW9mIGMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBjLmF1ZGlvID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjKSk7XG4gICAgICAgIHJlbWFwKGMuYXVkaW8sICdhdXRvR2FpbkNvbnRyb2wnLCAnbW96QXV0b0dhaW5Db250cm9sJyk7XG4gICAgICAgIHJlbWFwKGMuYXVkaW8sICdub2lzZVN1cHByZXNzaW9uJywgJ21vek5vaXNlU3VwcHJlc3Npb24nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVHZXRVc2VyTWVkaWEoYyk7XG4gICAgfTtcblxuICAgIGlmIChNZWRpYVN0cmVhbVRyYWNrICYmIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzKSB7XG4gICAgICB2YXIgbmF0aXZlR2V0U2V0dGluZ3MgPSBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5nZXRTZXR0aW5ncztcbiAgICAgIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvYmogPSBuYXRpdmVHZXRTZXR0aW5ncy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICByZW1hcChvYmosICdtb3pBdXRvR2FpbkNvbnRyb2wnLCAnYXV0b0dhaW5Db250cm9sJyk7XG4gICAgICAgIHJlbWFwKG9iaiwgJ21vek5vaXNlU3VwcHJlc3Npb24nLCAnbm9pc2VTdXBwcmVzc2lvbicpO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoTWVkaWFTdHJlYW1UcmFjayAmJiBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnRzKSB7XG4gICAgICB2YXIgbmF0aXZlQXBwbHlDb25zdHJhaW50cyA9IE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludHM7XG4gICAgICBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnRzID0gZnVuY3Rpb24oYykge1xuICAgICAgICBpZiAodGhpcy5raW5kID09PSAnYXVkaW8nICYmIHR5cGVvZiBjID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGMpKTtcbiAgICAgICAgICByZW1hcChjLCAnYXV0b0dhaW5Db250cm9sJywgJ21vekF1dG9HYWluQ29udHJvbCcpO1xuICAgICAgICAgIHJlbWFwKGMsICdub2lzZVN1cHByZXNzaW9uJywgJ21vek5vaXNlU3VwcHJlc3Npb24nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmF0aXZlQXBwbHlDb25zdHJhaW50cy5hcHBseSh0aGlzLCBbY10pO1xuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQ0KSB7XG4gICAgICByZXR1cm4gZ2V0VXNlck1lZGlhXyhjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKTtcbiAgICB9XG4gICAgLy8gUmVwbGFjZSBGaXJlZm94IDQ0KydzIGRlcHJlY2F0aW9uIHdhcm5pbmcgd2l0aCB1bnByZWZpeGVkIHZlcnNpb24uXG4gICAgdXRpbHMuZGVwcmVjYXRlZCgnbmF2aWdhdG9yLmdldFVzZXJNZWRpYScsXG4gICAgICAgICduYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYScpO1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKS50aGVuKG9uU3VjY2Vzcywgb25FcnJvcik7XG4gIH07XG59O1xuIl19
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\webrtc-adapter\\src\\js\\firefox\\getusermedia.js","/..\\node_modules\\webrtc-adapter\\src\\js\\firefox")
},{"../utils":17,"2ionoC":3,"buffer":2}],16:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = require('../utils');

var safariShim = {
  // TODO: DrAlex, should be here, double check against LayoutTests

  // TODO: once the back-end for the mac port is done, add.
  // TODO: check for webkitGTK+
  // shimPeerConnection: function() { },

  shimLocalStreamsAPI: function shimLocalStreamsAPI(window) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
      return;
    }
    if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.getLocalStreams = function () {
        if (!this._localStreams) {
          this._localStreams = [];
        }
        return this._localStreams;
      };
    }
    if (!('getStreamById' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.getStreamById = function (id) {
        var result = null;
        if (this._localStreams) {
          this._localStreams.forEach(function (stream) {
            if (stream.id === id) {
              result = stream;
            }
          });
        }
        if (this._remoteStreams) {
          this._remoteStreams.forEach(function (stream) {
            if (stream.id === id) {
              result = stream;
            }
          });
        }
        return result;
      };
    }
    if (!('addStream' in window.RTCPeerConnection.prototype)) {
      var _addTrack = window.RTCPeerConnection.prototype.addTrack;
      window.RTCPeerConnection.prototype.addStream = function (stream) {
        if (!this._localStreams) {
          this._localStreams = [];
        }
        if (this._localStreams.indexOf(stream) === -1) {
          this._localStreams.push(stream);
        }
        var self = this;
        stream.getTracks().forEach(function (track) {
          _addTrack.call(self, track, stream);
        });
      };

      window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
        if (stream) {
          if (!this._localStreams) {
            this._localStreams = [stream];
          } else if (this._localStreams.indexOf(stream) === -1) {
            this._localStreams.push(stream);
          }
        }
        _addTrack.call(this, track, stream);
      };
    }
    if (!('removeStream' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.removeStream = function (stream) {
        if (!this._localStreams) {
          this._localStreams = [];
        }
        var index = this._localStreams.indexOf(stream);
        if (index === -1) {
          return;
        }
        this._localStreams.splice(index, 1);
        var self = this;
        var tracks = stream.getTracks();
        this.getSenders().forEach(function (sender) {
          if (tracks.indexOf(sender.track) !== -1) {
            self.removeTrack(sender);
          }
        });
      };
    }
  },
  shimRemoteStreamsAPI: function shimRemoteStreamsAPI(window) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
      return;
    }
    if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.getRemoteStreams = function () {
        return this._remoteStreams ? this._remoteStreams : [];
      };
    }
    if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
        get: function get() {
          return this._onaddstream;
        },
        set: function set(f) {
          if (this._onaddstream) {
            this.removeEventListener('addstream', this._onaddstream);
            this.removeEventListener('track', this._onaddstreampoly);
          }
          this.addEventListener('addstream', this._onaddstream = f);
          this.addEventListener('track', this._onaddstreampoly = function (e) {
            var stream = e.streams[0];
            if (!this._remoteStreams) {
              this._remoteStreams = [];
            }
            if (this._remoteStreams.indexOf(stream) >= 0) {
              return;
            }
            this._remoteStreams.push(stream);
            var event = new Event('addstream');
            event.stream = e.streams[0];
            this.dispatchEvent(event);
          }.bind(this));
        }
      });
    }
  },
  shimCallbacksAPI: function shimCallbacksAPI(window) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
      return;
    }
    var prototype = window.RTCPeerConnection.prototype;
    var createOffer = prototype.createOffer;
    var createAnswer = prototype.createAnswer;
    var setLocalDescription = prototype.setLocalDescription;
    var setRemoteDescription = prototype.setRemoteDescription;
    var addIceCandidate = prototype.addIceCandidate;

    prototype.createOffer = function (successCallback, failureCallback) {
      var options = arguments.length >= 2 ? arguments[2] : arguments[0];
      var promise = createOffer.apply(this, [options]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };

    prototype.createAnswer = function (successCallback, failureCallback) {
      var options = arguments.length >= 2 ? arguments[2] : arguments[0];
      var promise = createAnswer.apply(this, [options]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };

    var withCallback = function withCallback(description, successCallback, failureCallback) {
      var promise = setLocalDescription.apply(this, [description]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.setLocalDescription = withCallback;

    withCallback = function withCallback(description, successCallback, failureCallback) {
      var promise = setRemoteDescription.apply(this, [description]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.setRemoteDescription = withCallback;

    withCallback = function withCallback(candidate, successCallback, failureCallback) {
      var promise = addIceCandidate.apply(this, [candidate]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.addIceCandidate = withCallback;
  },
  shimGetUserMedia: function shimGetUserMedia(window) {
    var navigator = window && window.navigator;

    if (!navigator.getUserMedia) {
      if (navigator.webkitGetUserMedia) {
        navigator.getUserMedia = navigator.webkitGetUserMedia.bind(navigator);
      } else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.getUserMedia = function (constraints, cb, errcb) {
          navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
        }.bind(navigator);
      }
    }
  },
  shimRTCIceServerUrls: function shimRTCIceServerUrls(window) {
    // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
    var OrigPeerConnection = window.RTCPeerConnection;
    window.RTCPeerConnection = function (pcConfig, pcConstraints) {
      if (pcConfig && pcConfig.iceServers) {
        var newIceServers = [];
        for (var i = 0; i < pcConfig.iceServers.length; i++) {
          var server = pcConfig.iceServers[i];
          if (!server.hasOwnProperty('urls') && server.hasOwnProperty('url')) {
            utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
            server = JSON.parse(JSON.stringify(server));
            server.urls = server.url;
            delete server.url;
            newIceServers.push(server);
          } else {
            newIceServers.push(pcConfig.iceServers[i]);
          }
        }
        pcConfig.iceServers = newIceServers;
      }
      return new OrigPeerConnection(pcConfig, pcConstraints);
    };
    window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
    // wrap static methods. Currently just generateCertificate.
    if ('generateCertificate' in window.RTCPeerConnection) {
      Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
        get: function get() {
          return OrigPeerConnection.generateCertificate;
        }
      });
    }
  },
  shimTrackEventTransceiver: function shimTrackEventTransceiver(window) {
    // Add event.transceiver member over deprecated event.receiver
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && 'receiver' in window.RTCTrackEvent.prototype &&
    // can't check 'transceiver' in window.RTCTrackEvent.prototype, as it is
    // defined for some reason even when window.RTCTransceiver is not.
    !window.RTCTransceiver) {
      Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
        get: function get() {
          return { receiver: this.receiver };
        }
      });
    }
  },

  shimCreateOfferLegacy: function shimCreateOfferLegacy(window) {
    var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
    window.RTCPeerConnection.prototype.createOffer = function (offerOptions) {
      var pc = this;
      if (offerOptions) {
        var audioTransceiver = pc.getTransceivers().find(function (transceiver) {
          return transceiver.sender.track && transceiver.sender.track.kind === 'audio';
        });
        if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
          if (audioTransceiver.direction === 'sendrecv') {
            audioTransceiver.setDirection('sendonly');
          } else if (audioTransceiver.direction === 'recvonly') {
            audioTransceiver.setDirection('inactive');
          }
        } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
          pc.addTransceiver('audio');
        }

        var videoTransceiver = pc.getTransceivers().find(function (transceiver) {
          return transceiver.sender.track && transceiver.sender.track.kind === 'video';
        });
        if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
          if (videoTransceiver.direction === 'sendrecv') {
            videoTransceiver.setDirection('sendonly');
          } else if (videoTransceiver.direction === 'recvonly') {
            videoTransceiver.setDirection('inactive');
          }
        } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
          pc.addTransceiver('video');
        }
      }
      return origCreateOffer.apply(pc, arguments);
    };
  }
};

// Expose public methods.
module.exports = {
  shimCallbacksAPI: safariShim.shimCallbacksAPI,
  shimLocalStreamsAPI: safariShim.shimLocalStreamsAPI,
  shimRemoteStreamsAPI: safariShim.shimRemoteStreamsAPI,
  shimGetUserMedia: safariShim.shimGetUserMedia,
  shimRTCIceServerUrls: safariShim.shimRTCIceServerUrls,
  shimTrackEventTransceiver: safariShim.shimTrackEventTransceiver,
  shimCreateOfferLegacy: safariShim.shimCreateOfferLegacy
  // TODO
  // shimPeerConnection: safariShim.shimPeerConnection
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhZmFyaV9zaGltLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwicmVxdWlyZSIsInNhZmFyaVNoaW0iLCJzaGltTG9jYWxTdHJlYW1zQVBJIiwid2luZG93IiwiUlRDUGVlckNvbm5lY3Rpb24iLCJwcm90b3R5cGUiLCJnZXRMb2NhbFN0cmVhbXMiLCJfbG9jYWxTdHJlYW1zIiwiZ2V0U3RyZWFtQnlJZCIsImlkIiwicmVzdWx0IiwiZm9yRWFjaCIsInN0cmVhbSIsIl9yZW1vdGVTdHJlYW1zIiwiX2FkZFRyYWNrIiwiYWRkVHJhY2siLCJhZGRTdHJlYW0iLCJpbmRleE9mIiwicHVzaCIsInNlbGYiLCJnZXRUcmFja3MiLCJ0cmFjayIsImNhbGwiLCJyZW1vdmVTdHJlYW0iLCJpbmRleCIsInNwbGljZSIsInRyYWNrcyIsImdldFNlbmRlcnMiLCJzZW5kZXIiLCJyZW1vdmVUcmFjayIsInNoaW1SZW1vdGVTdHJlYW1zQVBJIiwiZ2V0UmVtb3RlU3RyZWFtcyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiX29uYWRkc3RyZWFtIiwic2V0IiwiZiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfb25hZGRzdHJlYW1wb2x5IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzdHJlYW1zIiwiZXZlbnQiLCJFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJiaW5kIiwic2hpbUNhbGxiYWNrc0FQSSIsImNyZWF0ZU9mZmVyIiwiY3JlYXRlQW5zd2VyIiwic2V0TG9jYWxEZXNjcmlwdGlvbiIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwiYWRkSWNlQ2FuZGlkYXRlIiwic3VjY2Vzc0NhbGxiYWNrIiwiZmFpbHVyZUNhbGxiYWNrIiwib3B0aW9ucyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInByb21pc2UiLCJhcHBseSIsInRoZW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsIndpdGhDYWxsYmFjayIsImRlc2NyaXB0aW9uIiwiY2FuZGlkYXRlIiwic2hpbUdldFVzZXJNZWRpYSIsIm5hdmlnYXRvciIsImdldFVzZXJNZWRpYSIsIndlYmtpdEdldFVzZXJNZWRpYSIsIm1lZGlhRGV2aWNlcyIsImNvbnN0cmFpbnRzIiwiY2IiLCJlcnJjYiIsInNoaW1SVENJY2VTZXJ2ZXJVcmxzIiwiT3JpZ1BlZXJDb25uZWN0aW9uIiwicGNDb25maWciLCJwY0NvbnN0cmFpbnRzIiwiaWNlU2VydmVycyIsIm5ld0ljZVNlcnZlcnMiLCJpIiwic2VydmVyIiwiaGFzT3duUHJvcGVydHkiLCJkZXByZWNhdGVkIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwidXJscyIsInVybCIsImdlbmVyYXRlQ2VydGlmaWNhdGUiLCJzaGltVHJhY2tFdmVudFRyYW5zY2VpdmVyIiwiUlRDVHJhY2tFdmVudCIsIlJUQ1RyYW5zY2VpdmVyIiwicmVjZWl2ZXIiLCJzaGltQ3JlYXRlT2ZmZXJMZWdhY3kiLCJvcmlnQ3JlYXRlT2ZmZXIiLCJvZmZlck9wdGlvbnMiLCJwYyIsImF1ZGlvVHJhbnNjZWl2ZXIiLCJnZXRUcmFuc2NlaXZlcnMiLCJmaW5kIiwidHJhbnNjZWl2ZXIiLCJraW5kIiwib2ZmZXJUb1JlY2VpdmVBdWRpbyIsImRpcmVjdGlvbiIsInNldERpcmVjdGlvbiIsImFkZFRyYW5zY2VpdmVyIiwidmlkZW9UcmFuc2NlaXZlciIsIm9mZmVyVG9SZWNlaXZlVmlkZW8iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQU9BOzs7O0FBQ0EsSUFBSUEsUUFBUUMsUUFBUSxVQUFSLENBQVo7O0FBRUEsSUFBSUMsYUFBYTtBQUNmOztBQUVBO0FBQ0E7QUFDQTs7QUFFQUMsdUJBQXFCLDZCQUFTQyxNQUFULEVBQWlCO0FBQ3BDLFFBQUksUUFBT0EsTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUFsQixJQUE4QixDQUFDQSxPQUFPQyxpQkFBMUMsRUFBNkQ7QUFDM0Q7QUFDRDtBQUNELFFBQUksRUFBRSxxQkFBcUJELE9BQU9DLGlCQUFQLENBQXlCQyxTQUFoRCxDQUFKLEVB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K0M7QUFDN0NHLDZCQUFpQkYsWUFBakIsQ0FBOEIsVUFBOUI7QUFDRCxXQUZELE1BRU8sSUFBSUUsaUJBQWlCSCxTQUFqQixLQUErQixVQUFuQyxFQUErQztBQUNwREcsNkJBQWlCRixZQUFqQixDQUE4QixVQUE5QjtBQUNEO0FBQ0YsU0FORCxNQU1PLElBQUlULGFBQWFZLG1CQUFiLEtBQXFDLElBQXJDLElBQ1AsQ0FBQ0QsZ0JBREUsRUFDZ0I7QUFDckJWLGFBQUdTLGNBQUgsQ0FBa0IsT0FBbEI7QUFDRDtBQUNGO0FBQ0QsYUFBT1gsZ0JBQWdCcEMsS0FBaEIsQ0FBc0JzQyxFQUF0QixFQUEwQnpDLFNBQTFCLENBQVA7QUFDRCxLQWxDRDtBQW1DRDtBQTNSYyxDQUFqQjs7QUE4UkE7QUFDQXFELE9BQU9DLE9BQVAsR0FBaUI7QUFDZi9ELG9CQUFrQjlDLFdBQVc4QyxnQkFEZDtBQUVmN0MsdUJBQXFCRCxXQUFXQyxtQkFGakI7QUFHZjRCLHdCQUFzQjdCLFdBQVc2QixvQkFIbEI7QUFJZm9DLG9CQUFrQmpFLFdBQVdpRSxnQkFKZDtBQUtmUSx3QkFBc0J6RSxXQUFXeUUsb0JBTGxCO0FBTWZnQiw2QkFBMkJ6RixXQUFXeUYseUJBTnZCO0FBT2ZJLHlCQUF1QjdGLFdBQVc2RjtBQUNsQztBQUNBO0FBVGUsQ0FBakIiLCJmaWxlIjoic2FmYXJpX3NoaW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbid1c2Ugc3RyaWN0JztcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbnZhciBzYWZhcmlTaGltID0ge1xuICAvLyBUT0RPOiBEckFsZXgsIHNob3VsZCBiZSBoZXJlLCBkb3VibGUgY2hlY2sgYWdhaW5zdCBMYXlvdXRUZXN0c1xuXG4gIC8vIFRPRE86IG9uY2UgdGhlIGJhY2stZW5kIGZvciB0aGUgbWFjIHBvcnQgaXMgZG9uZSwgYWRkLlxuICAvLyBUT0RPOiBjaGVjayBmb3Igd2Via2l0R1RLK1xuICAvLyBzaGltUGVlckNvbm5lY3Rpb246IGZ1bmN0aW9uKCkgeyB9LFxuXG4gIHNoaW1Mb2NhbFN0cmVhbXNBUEk6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKCdnZXRMb2NhbFN0cmVhbXMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbFN0cmVhbXM7XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoISgnZ2V0U3RyZWFtQnlJZCcgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RyZWFtQnlJZCA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5fbG9jYWxTdHJlYW1zKSB7XG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBzdHJlYW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3JlbW90ZVN0cmVhbXMpIHtcbiAgICAgICAgICB0aGlzLl9yZW1vdGVTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBzdHJlYW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghKCdhZGRTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICB2YXIgX2FkZFRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjaztcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIGlmICghdGhpcy5fbG9jYWxTdHJlYW1zKSB7XG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgX2FkZFRyYWNrLmNhbGwoc2VsZiwgdHJhY2ssIHN0cmVhbSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcbiAgICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICAgIGlmICghdGhpcy5fbG9jYWxTdHJlYW1zKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbc3RyZWFtXTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfYWRkVHJhY2suY2FsbCh0aGlzLCB0cmFjaywgc3RyZWFtKTtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghKCdyZW1vdmVTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHRyYWNrcyA9IHN0cmVhbS5nZXRUcmFja3MoKTtcbiAgICAgICAgdGhpcy5nZXRTZW5kZXJzKCkuZm9yRWFjaChmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgICAgICBpZiAodHJhY2tzLmluZGV4T2Yoc2VuZGVyLnRyYWNrKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHNlbGYucmVtb3ZlVHJhY2soc2VuZGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG4gIH0sXG4gIHNoaW1SZW1vdGVTdHJlYW1zQVBJOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgfHwgIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoISgnZ2V0UmVtb3RlU3RyZWFtcycgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVtb3RlU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVtb3RlU3RyZWFtcyA/IHRoaXMuX3JlbW90ZVN0cmVhbXMgOiBbXTtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghKCdvbmFkZHN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnb25hZGRzdHJlYW0nLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX29uYWRkc3RyZWFtO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICBpZiAodGhpcy5fb25hZGRzdHJlYW0pIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb25hZGRzdHJlYW0pO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29uYWRkc3RyZWFtcG9seSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb25hZGRzdHJlYW0gPSBmKTtcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb25hZGRzdHJlYW1wb2x5ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHN0cmVhbSA9IGUuc3RyZWFtc1swXTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fcmVtb3RlU3RyZWFtcykge1xuICAgICAgICAgICAgICB0aGlzLl9yZW1vdGVTdHJlYW1zID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVtb3RlU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPj0gMCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9yZW1vdGVTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnYWRkc3RyZWFtJyk7XG4gICAgICAgICAgICBldmVudC5zdHJlYW0gPSBlLnN0cmVhbXNbMF07XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgc2hpbUNhbGxiYWNrc0FQSTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHByb3RvdHlwZSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG4gICAgdmFyIGNyZWF0ZU9mZmVyID0gcHJvdG90eXBlLmNyZWF0ZU9mZmVyO1xuICAgIHZhciBjcmVhdGVBbnN3ZXIgPSBwcm90b3R5cGUuY3JlYXRlQW5zd2VyO1xuICAgIHZhciBzZXRMb2NhbERlc2NyaXB0aW9uID0gcHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb247XG4gICAgdmFyIHNldFJlbW90ZURlc2NyaXB0aW9uID0gcHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uO1xuICAgIHZhciBhZGRJY2VDYW5kaWRhdGUgPSBwcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlO1xuXG4gICAgcHJvdG90eXBlLmNyZWF0ZU9mZmVyID0gZnVuY3Rpb24oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBvcHRpb25zID0gKGFyZ3VtZW50cy5sZW5ndGggPj0gMikgPyBhcmd1bWVudHNbMl0gOiBhcmd1bWVudHNbMF07XG4gICAgICB2YXIgcHJvbWlzZSA9IGNyZWF0ZU9mZmVyLmFwcGx5KHRoaXMsIFtvcHRpb25zXSk7XG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcblxuICAgIHByb3RvdHlwZS5jcmVhdGVBbnN3ZXIgPSBmdW5jdGlvbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgdmFyIG9wdGlvbnMgPSAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSA/IGFyZ3VtZW50c1syXSA6IGFyZ3VtZW50c1swXTtcbiAgICAgIHZhciBwcm9taXNlID0gY3JlYXRlQW5zd2VyLmFwcGx5KHRoaXMsIFtvcHRpb25zXSk7XG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcblxuICAgIHZhciB3aXRoQ2FsbGJhY2sgPSBmdW5jdGlvbihkZXNjcmlwdGlvbiwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBwcm9taXNlID0gc2V0TG9jYWxEZXNjcmlwdGlvbi5hcHBseSh0aGlzLCBbZGVzY3JpcHRpb25dKTtcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuICAgIHByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uID0gd2l0aENhbGxiYWNrO1xuXG4gICAgd2l0aENhbGxiYWNrID0gZnVuY3Rpb24oZGVzY3JpcHRpb24sIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICB2YXIgcHJvbWlzZSA9IHNldFJlbW90ZURlc2NyaXB0aW9uLmFwcGx5KHRoaXMsIFtkZXNjcmlwdGlvbl0pO1xuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG4gICAgcHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gd2l0aENhbGxiYWNrO1xuXG4gICAgd2l0aENhbGxiYWNrID0gZnVuY3Rpb24oY2FuZGlkYXRlLCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgdmFyIHByb21pc2UgPSBhZGRJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgW2NhbmRpZGF0ZV0pO1xuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG4gICAgcHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IHdpdGhDYWxsYmFjaztcbiAgfSxcbiAgc2hpbUdldFVzZXJNZWRpYTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xuXG4gICAgaWYgKCFuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKSB7XG4gICAgICBpZiAobmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYSkge1xuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYS5iaW5kKG5hdmlnYXRvcik7XG4gICAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiZcbiAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSkge1xuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY29uc3RyYWludHMsIGNiLCBlcnJjYikge1xuICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKVxuICAgICAgICAgIC50aGVuKGNiLCBlcnJjYik7XG4gICAgICAgIH0uYmluZChuYXZpZ2F0b3IpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgc2hpbVJUQ0ljZVNlcnZlclVybHM6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIG1pZ3JhdGUgZnJvbSBub24tc3BlYyBSVENJY2VTZXJ2ZXIudXJsIHRvIFJUQ0ljZVNlcnZlci51cmxzXG4gICAgdmFyIE9yaWdQZWVyQ29ubmVjdGlvbiA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbjtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xuICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVNlcnZlcnMpIHtcbiAgICAgICAgdmFyIG5ld0ljZVNlcnZlcnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwY0NvbmZpZy5pY2VTZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHNlcnZlciA9IHBjQ29uZmlnLmljZVNlcnZlcnNbaV07XG4gICAgICAgICAgaWYgKCFzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybHMnKSAmJlxuICAgICAgICAgICAgICBzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybCcpKSB7XG4gICAgICAgICAgICB1dGlscy5kZXByZWNhdGVkKCdSVENJY2VTZXJ2ZXIudXJsJywgJ1JUQ0ljZVNlcnZlci51cmxzJyk7XG4gICAgICAgICAgICBzZXJ2ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlcnZlcikpO1xuICAgICAgICAgICAgc2VydmVyLnVybHMgPSBzZXJ2ZXIudXJsO1xuICAgICAgICAgICAgZGVsZXRlIHNlcnZlci51cmw7XG4gICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2goc2VydmVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHBjQ29uZmlnLmljZVNlcnZlcnNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwY0NvbmZpZy5pY2VTZXJ2ZXJzID0gbmV3SWNlU2VydmVycztcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgT3JpZ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcbiAgICB9O1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPSBPcmlnUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXG4gICAgaWYgKCdnZW5lcmF0ZUNlcnRpZmljYXRlJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24sICdnZW5lcmF0ZUNlcnRpZmljYXRlJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBPcmlnUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBzaGltVHJhY2tFdmVudFRyYW5zY2VpdmVyOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBBZGQgZXZlbnQudHJhbnNjZWl2ZXIgbWVtYmVyIG92ZXIgZGVwcmVjYXRlZCBldmVudC5yZWNlaXZlclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgICAgKCdyZWNlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlKSAmJlxuICAgICAgICAvLyBjYW4ndCBjaGVjayAndHJhbnNjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSwgYXMgaXQgaXNcbiAgICAgICAgLy8gZGVmaW5lZCBmb3Igc29tZSByZWFzb24gZXZlbiB3aGVuIHdpbmRvdy5SVENUcmFuc2NlaXZlciBpcyBub3QuXG4gICAgICAgICF3aW5kb3cuUlRDVHJhbnNjZWl2ZXIpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUsICd0cmFuc2NlaXZlcicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4ge3JlY2VpdmVyOiB0aGlzLnJlY2VpdmVyfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIHNoaW1DcmVhdGVPZmZlckxlZ2FjeTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIG9yaWdDcmVhdGVPZmZlciA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXI7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlciA9IGZ1bmN0aW9uKG9mZmVyT3B0aW9ucykge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIGlmIChvZmZlck9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGF1ZGlvVHJhbnNjZWl2ZXIgPSBwYy5nZXRUcmFuc2NlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnNlbmRlci50cmFjayAmJlxuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2sua2luZCA9PT0gJ2F1ZGlvJztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gZmFsc2UgJiYgYXVkaW9UcmFuc2NlaXZlcikge1xuICAgICAgICAgIGlmIChhdWRpb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2Jykge1xuICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ3NlbmRvbmx5Jyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChhdWRpb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3JlY3Zvbmx5Jykge1xuICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ2luYWN0aXZlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID09PSB0cnVlICYmXG4gICAgICAgICAgICAhYXVkaW9UcmFuc2NlaXZlcikge1xuICAgICAgICAgIHBjLmFkZFRyYW5zY2VpdmVyKCdhdWRpbycpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHZpZGVvVHJhbnNjZWl2ZXIgPSBwYy5nZXRUcmFuc2NlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnNlbmRlci50cmFjayAmJlxuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2sua2luZCA9PT0gJ3ZpZGVvJztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gZmFsc2UgJiYgdmlkZW9UcmFuc2NlaXZlcikge1xuICAgICAgICAgIGlmICh2aWRlb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2Jykge1xuICAgICAgICAgICAgdmlkZW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ3NlbmRvbmx5Jyk7XG4gICAgICAgICAgfSBlbHNlIGlmICh2aWRlb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3JlY3Zvbmx5Jykge1xuICAgICAgICAgICAgdmlkZW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ2luYWN0aXZlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSB0cnVlICYmXG4gICAgICAgICAgICAhdmlkZW9UcmFuc2NlaXZlcikge1xuICAgICAgICAgIHBjLmFkZFRyYW5zY2VpdmVyKCd2aWRlbycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gb3JpZ0NyZWF0ZU9mZmVyLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cbn07XG5cbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaGltQ2FsbGJhY2tzQVBJOiBzYWZhcmlTaGltLnNoaW1DYWxsYmFja3NBUEksXG4gIHNoaW1Mb2NhbFN0cmVhbXNBUEk6IHNhZmFyaVNoaW0uc2hpbUxvY2FsU3RyZWFtc0FQSSxcbiAgc2hpbVJlbW90ZVN0cmVhbXNBUEk6IHNhZmFyaVNoaW0uc2hpbVJlbW90ZVN0cmVhbXNBUEksXG4gIHNoaW1HZXRVc2VyTWVkaWE6IHNhZmFyaVNoaW0uc2hpbUdldFVzZXJNZWRpYSxcbiAgc2hpbVJUQ0ljZVNlcnZlclVybHM6IHNhZmFyaVNoaW0uc2hpbVJUQ0ljZVNlcnZlclVybHMsXG4gIHNoaW1UcmFja0V2ZW50VHJhbnNjZWl2ZXI6IHNhZmFyaVNoaW0uc2hpbVRyYWNrRXZlbnRUcmFuc2NlaXZlcixcbiAgc2hpbUNyZWF0ZU9mZmVyTGVnYWN5OiBzYWZhcmlTaGltLnNoaW1DcmVhdGVPZmZlckxlZ2FjeVxuICAvLyBUT0RPXG4gIC8vIHNoaW1QZWVyQ29ubmVjdGlvbjogc2FmYXJpU2hpbS5zaGltUGVlckNvbm5lY3Rpb25cbn07XG4iXX0=
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\webrtc-adapter\\src\\js\\safari\\safari_shim.js","/..\\node_modules\\webrtc-adapter\\src\\js\\safari")
},{"../utils":17,"2ionoC":3,"buffer":2}],17:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var logDisabled_ = true;
var deprecationWarnings_ = true;

// Utility methods.
var utils = {
  disableLog: function disableLog(bool) {
    if (typeof bool !== 'boolean') {
      return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool)) + '. Please use a boolean.');
    }
    logDisabled_ = bool;
    return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
  },

  /**
   * Disable or enable deprecation warnings
   * @param {!boolean} bool set to true to disable warnings.
   */
  disableWarnings: function disableWarnings(bool) {
    if (typeof bool !== 'boolean') {
      return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool)) + '. Please use a boolean.');
    }
    deprecationWarnings_ = !bool;
    return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
  },

  log: function log() {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
      if (logDisabled_) {
        return;
      }
      if (typeof console !== 'undefined' && typeof console.log === 'function') {
        console.log.apply(console, arguments);
      }
    }
  },

  /**
   * Shows a deprecation warning suggesting the modern and spec-compatible API.
   */
  deprecated: function deprecated(oldMethod, newMethod) {
    if (!deprecationWarnings_) {
      return;
    }
    console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
  },

  /**
   * Extract browser version out of the provided user agent string.
   *
   * @param {!string} uastring userAgent string.
   * @param {!string} expr Regular expression used as match criteria.
   * @param {!number} pos position in the version string to be returned.
   * @return {!number} browser version.
   */
  extractVersion: function extractVersion(uastring, expr, pos) {
    var match = uastring.match(expr);
    return match && match.length >= pos && parseInt(match[pos], 10);
  },

  /**
   * Browser detector.
   *
   * @return {object} result containing browser and version
   *     properties.
   */
  detectBrowser: function detectBrowser(window) {
    var navigator = window && window.navigator;

    // Returned result object.
    var result = {};
    result.browser = null;
    result.version = null;

    // Fail early if it's not a browser
    if (typeof window === 'undefined' || !window.navigator) {
      result.browser = 'Not a browser.';
      return result;
    }

    // Firefox.
    if (navigator.mozGetUserMedia) {
      result.browser = 'firefox';
      result.version = this.extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
    } else if (navigator.webkitGetUserMedia) {
      // Chrome, Chromium, Webview, Opera, all use the chrome shim for now
      if (window.webkitRTCPeerConnection) {
        result.browser = 'chrome';
        result.version = this.extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
      } else {
        // Safari (in an unpublished version) or unknown webkit-based.
        if (navigator.userAgent.match(/Version\/(\d+).(\d+)/)) {
          result.browser = 'safari';
          result.version = this.extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
        } else {
          // unknown webkit-based browser.
          result.browser = 'Unsupported webkit-based browser ' + 'with GUM support but no WebRTC support.';
          return result;
        }
      }
    } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
      // Edge.
      result.browser = 'edge';
      result.version = this.extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
    } else if (navigator.mediaDevices && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
      // Safari, with webkitGetUserMedia removed.
      result.browser = 'safari';
      result.version = this.extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
    } else {
      // Default fallthrough: not supported.
      result.browser = 'Not a supported browser.';
      return result;
    }

    return result;
  }

};

// Export.
module.exports = {
  log: utils.log,
  deprecated: utils.deprecated,
  disableLog: utils.disableLog,
  disableWarnings: utils.disableWarnings,
  extractVersion: utils.extractVersion,
  shimCreateObjectURL: utils.shimCreateObjectURL,
  detectBrowser: utils.detectBrowser.bind(utils)
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbImxvZ0Rpc2FibGVkXyIsImRlcHJlY2F0aW9uV2FybmluZ3NfIiwidXRpbHMiLCJkaXNhYmxlTG9nIiwiYm9vbCIsIkVycm9yIiwiZGlzYWJsZVdhcm5pbmdzIiwibG9nIiwid2luZG93IiwiY29uc29sZSIsImFwcGx5IiwiYXJndW1lbnRzIiwiZGVwcmVjYXRlZCIsIm9sZE1ldGhvZCIsIm5ld01ldGhvZCIsIndhcm4iLCJleHRyYWN0VmVyc2lvbiIsInVhc3RyaW5nIiwiZXhwciIsInBvcyIsIm1hdGNoIiwibGVuZ3RoIiwicGFyc2VJbnQiLCJkZXRlY3RCcm93c2VyIiwibmF2aWdhdG9yIiwicmVzdWx0IiwiYnJvd3NlciIsInZlcnNpb24iLCJtb3pHZXRVc2VyTWVkaWEiLCJ1c2VyQWdlbnQiLCJ3ZWJraXRHZXRVc2VyTWVkaWEiLCJ3ZWJraXRSVENQZWVyQ29ubmVjdGlvbiIsIm1lZGlhRGV2aWNlcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJzaGltQ3JlYXRlT2JqZWN0VVJMIiwiYmluZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFPQztBQUNEOzs7O0FBRUEsSUFBSUEsZUFBZSxJQUFuQjtBQUNBLElBQUlDLHVCQUF1QixJQUEzQjs7QUFFQTtBQUNBLElBQUlDLFFBQVE7QUFDVkMsY0FBWSxvQkFBU0MsSUFBVCxFQUFlO0FBQ3pCLFFBQUksT0FBT0EsSUFBUCxLQUFnQixTQUFwQixFQUErQjtBQUM3QixhQUFPLElBQUlDLEtBQUosQ0FBVSw0QkFBMkJELElBQTNCLHlDQUEyQkEsSUFBM0IsS0FDYix5QkFERyxDQUFQO0FBRUQ7QUFDREosbUJBQWVJLElBQWY7QUFDQSxXQUFRQSxJQUFELEdBQVMsNkJBQVQsR0FDSCw0QkFESjtBQUVELEdBVFM7O0FBV1Y7Ozs7QUFJQUUsbUJBQWlCLHlCQUFTRixJQUFULEVBQWU7QUFDOUIsUUFBSSxPQUFPQSxJQUFQLEtBQWdCLFNBQXBCLEVBQStCO0FBQzdCLGFBQU8sSUFB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QUFQLEdBQWlCLEtBQUtYLGNBQUwsQ0FBb0JRLFVBQVVLLFNBQTlCLEVBQ2Isb0JBRGEsRUFDUyxDQURULENBQWpCO0FBRUQsS0FMTSxNQUtBLElBQUlMLFVBQVVRLFlBQVYsSUFDUFIsVUFBVUssU0FBVixDQUFvQlQsS0FBcEIsQ0FBMEIsc0JBQTFCLENBREcsRUFDZ0Q7QUFDbkQ7QUFDRkssYUFBT0MsT0FBUCxHQUFpQixRQUFqQjtBQUNBRCxhQUFPRSxPQUFQLEdBQWlCLEtBQUtYLGNBQUwsQ0FBb0JRLFVBQVVLLFNBQTlCLEVBQ2Isc0JBRGEsRUFDVyxDQURYLENBQWpCO0FBRUQsS0FOTSxNQU1BO0FBQUU7QUFDUEosYUFBT0MsT0FBUCxHQUFpQiwwQkFBakI7QUFDQSxhQUFPRCxNQUFQO0FBQ0Q7O0FBRUQsV0FBT0EsTUFBUDtBQUNEOztBQXRIUyxDQUFaOztBQTBIQTtBQUNBUSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2YzQixPQUFLTCxNQUFNSyxHQURJO0FBRWZLLGNBQVlWLE1BQU1VLFVBRkg7QUFHZlQsY0FBWUQsTUFBTUMsVUFISDtBQUlmRyxtQkFBaUJKLE1BQU1JLGVBSlI7QUFLZlUsa0JBQWdCZCxNQUFNYyxjQUxQO0FBTWZtQix1QkFBcUJqQyxNQUFNaUMsbUJBTlo7QUFPZlosaUJBQWVyQixNQUFNcUIsYUFBTixDQUFvQmEsSUFBcEIsQ0FBeUJsQyxLQUF6QjtBQVBBLENBQWpCIiwiZmlsZSI6InV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBsb2dEaXNhYmxlZF8gPSB0cnVlO1xudmFyIGRlcHJlY2F0aW9uV2FybmluZ3NfID0gdHJ1ZTtcblxuLy8gVXRpbGl0eSBtZXRob2RzLlxudmFyIHV0aWxzID0ge1xuICBkaXNhYmxlTG9nOiBmdW5jdGlvbihib29sKSB7XG4gICAgaWYgKHR5cGVvZiBib29sICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0FyZ3VtZW50IHR5cGU6ICcgKyB0eXBlb2YgYm9vbCArXG4gICAgICAgICAgJy4gUGxlYXNlIHVzZSBhIGJvb2xlYW4uJyk7XG4gICAgfVxuICAgIGxvZ0Rpc2FibGVkXyA9IGJvb2w7XG4gICAgcmV0dXJuIChib29sKSA/ICdhZGFwdGVyLmpzIGxvZ2dpbmcgZGlzYWJsZWQnIDpcbiAgICAgICAgJ2FkYXB0ZXIuanMgbG9nZ2luZyBlbmFibGVkJztcbiAgfSxcblxuICAvKipcbiAgICogRGlzYWJsZSBvciBlbmFibGUgZGVwcmVjYXRpb24gd2FybmluZ3NcbiAgICogQHBhcmFtIHshYm9vbGVhbn0gYm9vbCBzZXQgdG8gdHJ1ZSB0byBkaXNhYmxlIHdhcm5pbmdzLlxuICAgKi9cbiAgZGlzYWJsZVdhcm5pbmdzOiBmdW5jdGlvbihib29sKSB7XG4gICAgaWYgKHR5cGVvZiBib29sICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0FyZ3VtZW50IHR5cGU6ICcgKyB0eXBlb2YgYm9vbCArXG4gICAgICAgICAgJy4gUGxlYXNlIHVzZSBhIGJvb2xlYW4uJyk7XG4gICAgfVxuICAgIGRlcHJlY2F0aW9uV2FybmluZ3NfID0gIWJvb2w7XG4gICAgcmV0dXJuICdhZGFwdGVyLmpzIGRlcHJlY2F0aW9uIHdhcm5pbmdzICcgKyAoYm9vbCA/ICdkaXNhYmxlZCcgOiAnZW5hYmxlZCcpO1xuICB9LFxuXG4gIGxvZzogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAobG9nRGlzYWJsZWRfKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUubG9nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBTaG93cyBhIGRlcHJlY2F0aW9uIHdhcm5pbmcgc3VnZ2VzdGluZyB0aGUgbW9kZXJuIGFuZCBzcGVjLWNvbXBhdGlibGUgQVBJLlxuICAgKi9cbiAgZGVwcmVjYXRlZDogZnVuY3Rpb24ob2xkTWV0aG9kLCBuZXdNZXRob2QpIHtcbiAgICBpZiAoIWRlcHJlY2F0aW9uV2FybmluZ3NfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnNvbGUud2FybihvbGRNZXRob2QgKyAnIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgJyArIG5ld01ldGhvZCArXG4gICAgICAgICcgaW5zdGVhZC4nKTtcbiAgfSxcblxuICAvKipcbiAgICogRXh0cmFjdCBicm93c2VyIHZlcnNpb24gb3V0IG9mIHRoZSBwcm92aWRlZCB1c2VyIGFnZW50IHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtIHshc3RyaW5nfSB1YXN0cmluZyB1c2VyQWdlbnQgc3RyaW5nLlxuICAgKiBAcGFyYW0geyFzdHJpbmd9IGV4cHIgUmVndWxhciBleHByZXNzaW9uIHVzZWQgYXMgbWF0Y2ggY3JpdGVyaWEuXG4gICAqIEBwYXJhbSB7IW51bWJlcn0gcG9zIHBvc2l0aW9uIGluIHRoZSB2ZXJzaW9uIHN0cmluZyB0byBiZSByZXR1cm5lZC5cbiAgICogQHJldHVybiB7IW51bWJlcn0gYnJvd3NlciB2ZXJzaW9uLlxuICAgKi9cbiAgZXh0cmFjdFZlcnNpb246IGZ1bmN0aW9uKHVhc3RyaW5nLCBleHByLCBwb3MpIHtcbiAgICB2YXIgbWF0Y2ggPSB1YXN0cmluZy5tYXRjaChleHByKTtcbiAgICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID49IHBvcyAmJiBwYXJzZUludChtYXRjaFtwb3NdLCAxMCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEJyb3dzZXIgZGV0ZWN0b3IuXG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH0gcmVzdWx0IGNvbnRhaW5pbmcgYnJvd3NlciBhbmQgdmVyc2lvblxuICAgKiAgICAgcHJvcGVydGllcy5cbiAgICovXG4gIGRldGVjdEJyb3dzZXI6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcblxuICAgIC8vIFJldHVybmVkIHJlc3VsdCBvYmplY3QuXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHJlc3VsdC5icm93c2VyID0gbnVsbDtcbiAgICByZXN1bHQudmVyc2lvbiA9IG51bGw7XG5cbiAgICAvLyBGYWlsIGVhcmx5IGlmIGl0J3Mgbm90IGEgYnJvd3NlclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhd2luZG93Lm5hdmlnYXRvcikge1xuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnTm90IGEgYnJvd3Nlci4nO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyBGaXJlZm94LlxuICAgIGlmIChuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKSB7XG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdmaXJlZm94JztcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gdGhpcy5leHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgIC9GaXJlZm94XFwvKFxcZCspXFwuLywgMSk7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhKSB7XG4gICAgICAvLyBDaHJvbWUsIENocm9taXVtLCBXZWJ2aWV3LCBPcGVyYSwgYWxsIHVzZSB0aGUgY2hyb21lIHNoaW0gZm9yIG5vd1xuICAgICAgaWYgKHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgICByZXN1bHQuYnJvd3NlciA9ICdjaHJvbWUnO1xuICAgICAgICByZXN1bHQudmVyc2lvbiA9IHRoaXMuZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgICAgICAvQ2hyb20oZXxpdW0pXFwvKFxcZCspXFwuLywgMik7XG4gICAgICB9IGVsc2UgeyAvLyBTYWZhcmkgKGluIGFuIHVucHVibGlzaGVkIHZlcnNpb24pIG9yIHVua25vd24gd2Via2l0LWJhc2VkLlxuICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvVmVyc2lvblxcLyhcXGQrKS4oXFxkKykvKSkge1xuICAgICAgICAgIHJlc3VsdC5icm93c2VyID0gJ3NhZmFyaSc7XG4gICAgICAgICAgcmVzdWx0LnZlcnNpb24gPSB0aGlzLmV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgICAvQXBwbGVXZWJLaXRcXC8oXFxkKylcXC4vLCAxKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gdW5rbm93biB3ZWJraXQtYmFzZWQgYnJvd3Nlci5cbiAgICAgICAgICByZXN1bHQuYnJvd3NlciA9ICdVbnN1cHBvcnRlZCB3ZWJraXQtYmFzZWQgYnJvd3NlciAnICtcbiAgICAgICAgICAgICAgJ3dpdGggR1VNIHN1cHBvcnQgYnV0IG5vIFdlYlJUQyBzdXBwb3J0Lic7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyAmJlxuICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLihcXGQrKSQvKSkgeyAvLyBFZGdlLlxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnZWRnZSc7XG4gICAgICByZXN1bHQudmVyc2lvbiA9IHRoaXMuZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgICAgICAvRWRnZVxcLyhcXGQrKS4oXFxkKykkLywgMik7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmXG4gICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FwcGxlV2ViS2l0XFwvKFxcZCspXFwuLykpIHtcbiAgICAgICAgLy8gU2FmYXJpLCB3aXRoIHdlYmtpdEdldFVzZXJNZWRpYSByZW1vdmVkLlxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnc2FmYXJpJztcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gdGhpcy5leHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgIC9BcHBsZVdlYktpdFxcLyhcXGQrKVxcLi8sIDEpO1xuICAgIH0gZWxzZSB7IC8vIERlZmF1bHQgZmFsbHRocm91Z2g6IG5vdCBzdXBwb3J0ZWQuXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdOb3QgYSBzdXBwb3J0ZWQgYnJvd3Nlci4nO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG59O1xuXG4vLyBFeHBvcnQuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbG9nOiB1dGlscy5sb2csXG4gIGRlcHJlY2F0ZWQ6IHV0aWxzLmRlcHJlY2F0ZWQsXG4gIGRpc2FibGVMb2c6IHV0aWxzLmRpc2FibGVMb2csXG4gIGRpc2FibGVXYXJuaW5nczogdXRpbHMuZGlzYWJsZVdhcm5pbmdzLFxuICBleHRyYWN0VmVyc2lvbjogdXRpbHMuZXh0cmFjdFZlcnNpb24sXG4gIHNoaW1DcmVhdGVPYmplY3RVUkw6IHV0aWxzLnNoaW1DcmVhdGVPYmplY3RVUkwsXG4gIGRldGVjdEJyb3dzZXI6IHV0aWxzLmRldGVjdEJyb3dzZXIuYmluZCh1dGlscylcbn07XG4iXX0=
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\webrtc-adapter\\src\\js\\utils.js","/..\\node_modules\\webrtc-adapter\\src\\js")
},{"2ionoC":3,"buffer":2}],18:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MyMediaRecorder = function () {
  function MyMediaRecorder(stream) {
    var mimeType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'video/webm';

    _classCallCheck(this, MyMediaRecorder);

    this.stream = stream;
    this.mimeType = mimeType;
  }

  _createClass(MyMediaRecorder, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        try {
          var recorder = _this.recorder = new MediaRecorder(_this.stream, { mimeType: _this.mimeType });
          resolve(recorder);
        } catch (err) {
          reject(err);
        }
      });

      // this.recorder.ondataavailable = e => {
      //   this.data = e.data;
      // }
    }
  }, {
    key: 'start',
    value: function start() {
      this.recorder.start();
    }
  }, {
    key: 'stop',
    value: function stop() {
      var _this2 = this;

      this.recorder.stop();
      return new Promise(function (resolve, reject) {
        _this2.recorder.ondataavailable = function (e) {
          _this2.lastData = e.data;
          resolve(e.data);
          _this2.recorder.ondataavailable = undefined;
        };
      });
    }
  }]);

  return MyMediaRecorder;
}();

exports.default = MyMediaRecorder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lZGlhUmVjb3JkZXIuanMiXSwibmFtZXMiOlsiTXlNZWRpYVJlY29yZGVyIiwic3RyZWFtIiwibWltZVR5cGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlY29yZGVyIiwiTWVkaWFSZWNvcmRlciIsImVyciIsInN0YXJ0Iiwic3RvcCIsIm9uZGF0YWF2YWlsYWJsZSIsImxhc3REYXRhIiwiZSIsImRhdGEiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBcUJBLGU7QUFFbkIsMkJBQWFDLE1BQWIsRUFBOEM7QUFBQSxRQUF6QkMsUUFBeUIsdUVBQWQsWUFBYzs7QUFBQTs7QUFDNUMsU0FBS0QsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDRDs7OztpQ0FFYTtBQUFBOztBQUNaLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxZQUFJO0FBQ0YsY0FBSUMsV0FBVyxNQUFLQSxRQUFMLEdBQWdCLElBQUlDLGFBQUosQ0FBa0IsTUFBS04sTUFBdkIsRUFBK0IsRUFBRUMsVUFBVSxNQUFLQSxRQUFqQixFQUEvQixDQUEvQjtBQUNBRSxrQkFBUUUsUUFBUjtBQUNELFNBSEQsQ0FHRSxPQUFPRSxHQUFQLEVBQVk7QUFDWkgsaUJBQU9HLEdBQVA7QUFDRDtBQUNGLE9BUE0sQ0FBUDs7QUFTQTtBQUNBO0FBQ0E7QUFDRDs7OzRCQUVRO0FBQ1AsV0FBS0YsUUFBTCxDQUFjRyxLQUFkO0FBQ0Q7OzsyQkFFTztBQUFBOztBQUNOLFdBQUtILFFBQUwsQ0FBY0ksSUFBZDtBQUNBLGFBQU8sSUFBSVAsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxlQUFLQyxRQUFMLENBQWNLLGVBQWQsR0FBZ0MsYUFBSztBQUNuQyxpQkFBS0MsUUFBTCxHQUFnQkMsRUFBRUMsSUFBbEI7QUFDQVYsa0JBQVFTLEVBQUVDLElBQVY7QUFDQSxpQkFBS1IsUUFBTCxDQUFjSyxlQUFkLEdBQWdDSSxTQUFoQztBQUNELFNBSkQ7QUFLRCxPQU5NLENBQVA7QUFPRDs7Ozs7O2tCQW5Da0JmLGUiLCJmaWxlIjoiTWVkaWFSZWNvcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIE15TWVkaWFSZWNvcmRlciB7XHJcbiAgXHJcbiAgY29uc3RydWN0b3IgKHN0cmVhbSwgbWltZVR5cGUgPSAndmlkZW8vd2VibScpIHtcclxuICAgIHRoaXMuc3RyZWFtID0gc3RyZWFtO1xyXG4gICAgdGhpcy5taW1lVHlwZSA9IG1pbWVUeXBlO1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGl6ZSAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGxldCByZWNvcmRlciA9IHRoaXMucmVjb3JkZXIgPSBuZXcgTWVkaWFSZWNvcmRlcih0aGlzLnN0cmVhbSwgeyBtaW1lVHlwZTogdGhpcy5taW1lVHlwZSB9KVxyXG4gICAgICAgIHJlc29sdmUocmVjb3JkZXIpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyB0aGlzLnJlY29yZGVyLm9uZGF0YWF2YWlsYWJsZSA9IGUgPT4ge1xyXG4gICAgLy8gICB0aGlzLmRhdGEgPSBlLmRhdGE7XHJcbiAgICAvLyB9XHJcbiAgfVxyXG5cclxuICBzdGFydCAoKSB7XHJcbiAgICB0aGlzLnJlY29yZGVyLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICBzdG9wICgpIHtcclxuICAgIHRoaXMucmVjb3JkZXIuc3RvcCgpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5yZWNvcmRlci5vbmRhdGFhdmFpbGFibGUgPSBlID0+IHtcclxuICAgICAgICB0aGlzLmxhc3REYXRhID0gZS5kYXRhO1xyXG4gICAgICAgIHJlc29sdmUoZS5kYXRhKTtcclxuICAgICAgICB0aGlzLnJlY29yZGVyLm9uZGF0YWF2YWlsYWJsZSA9IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG59Il19
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/MediaRecorder.js","/")
},{"2ionoC":3,"buffer":2}],19:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MediaStream = function () {
  function MediaStream(constaints) {
    _classCallCheck(this, MediaStream);

    this.constaints = constaints;
  }

  _createClass(MediaStream, [{
    key: "initialize",
    value: function initialize() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        navigator.getUserMedia(_this.constaints, function (stream) {
          _this.stream = stream;
          _this.videoTracks = stream.getVideoTracks();
          _this.audioTracks = stream.getAudioTracks();
          resolve(stream);
        }, function (err) {
          reject(err);
        });
      });
    }
  }, {
    key: "stopVideo",
    value: function stopVideo() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.videoTracks && this.videoTracks[index] && this.videoTracks[index].stop();
    }
  }, {
    key: "stopAudio",
    value: function stopAudio() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.audioTracks && this.audioTracks[index] && this.audioTracks[index].stop();
    }
  }]);

  return MediaStream;
}();

exports.default = MediaStream;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lZGlhU3RyZWFtLmpzIl0sIm5hbWVzIjpbIk1lZGlhU3RyZWFtIiwiY29uc3RhaW50cyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibmF2aWdhdG9yIiwiZ2V0VXNlck1lZGlhIiwid2Via2l0R2V0VXNlck1lZGlhIiwibW96R2V0VXNlck1lZGlhIiwibXNHZXRVc2VyTWVkaWEiLCJzdHJlYW0iLCJ2aWRlb1RyYWNrcyIsImdldFZpZGVvVHJhY2tzIiwiYXVkaW9UcmFja3MiLCJnZXRBdWRpb1RyYWNrcyIsImVyciIsImluZGV4Iiwic3RvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFxQkEsVztBQUVuQix1QkFBYUMsVUFBYixFQUF5QjtBQUFBOztBQUV2QixTQUFLQSxVQUFMLEdBQWtCQSxVQUFsQjtBQUVEOzs7O2lDQUVhO0FBQUE7O0FBQ1osYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxrQkFBVUMsWUFBVixHQUEwQkQsVUFBVUMsWUFBVixJQUEwQkQsVUFBVUUsa0JBQXBDLElBQTBERixVQUFVRyxlQUFwRSxJQUF1RkgsVUFBVUksY0FBM0g7O0FBRUFKLGtCQUFVQyxZQUFWLENBQXVCLE1BQUtMLFVBQTVCLEVBQXdDLGtCQUFVO0FBQzlDLGdCQUFLUyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxnQkFBS0MsV0FBTCxHQUFtQkQsT0FBT0UsY0FBUCxFQUFuQjtBQUNBLGdCQUFLQyxXQUFMLEdBQW1CSCxPQUFPSSxjQUFQLEVBQW5CO0FBQ0FYLGtCQUFRTyxNQUFSO0FBQ0gsU0FMRCxFQUtHLGVBQU87QUFDTk4saUJBQU9XLEdBQVA7QUFDSCxTQVBEO0FBUUQsT0FYTSxDQUFQO0FBWUQ7OztnQ0FFcUI7QUFBQSxVQUFYQyxLQUFXLHVFQUFILENBQUc7O0FBQ3BCLFdBQUtMLFdBQUwsSUFBb0IsS0FBS0EsV0FBTCxDQUFpQkssS0FBakIsQ0FBcEIsSUFBK0MsS0FBS0wsV0FBTCxDQUFpQkssS0FBakIsRUFBd0JDLElBQXhCLEVBQS9DO0FBQ0Q7OztnQ0FFcUI7QUFBQSxVQUFYRCxLQUFXLHVFQUFILENBQUc7O0FBQ3BCLFdBQUtILFdBQUwsSUFBb0IsS0FBS0EsV0FBTCxDQUFpQkcsS0FBakIsQ0FBcEIsSUFBK0MsS0FBS0gsV0FBTCxDQUFpQkcsS0FBakIsRUFBd0JDLElBQXhCLEVBQS9DO0FBQ0Q7Ozs7OztrQkE3QmtCakIsVyIsImZpbGUiOiJNZWRpYVN0cmVhbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lZGlhU3RyZWFtIHtcclxuXHJcbiAgY29uc3RydWN0b3IgKGNvbnN0YWludHMpIHtcclxuXHJcbiAgICB0aGlzLmNvbnN0YWludHMgPSBjb25zdGFpbnRzO1xyXG5cclxuICB9XHJcblxyXG4gIGluaXRpYWxpemUgKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IChuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubXNHZXRVc2VyTWVkaWEpO1xyXG4gICAgXHJcbiAgICAgIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEodGhpcy5jb25zdGFpbnRzLCBzdHJlYW0gPT4ge1xyXG4gICAgICAgICAgdGhpcy5zdHJlYW0gPSBzdHJlYW07XHJcbiAgICAgICAgICB0aGlzLnZpZGVvVHJhY2tzID0gc3RyZWFtLmdldFZpZGVvVHJhY2tzKCk7XHJcbiAgICAgICAgICB0aGlzLmF1ZGlvVHJhY2tzID0gc3RyZWFtLmdldEF1ZGlvVHJhY2tzKCk7XHJcbiAgICAgICAgICByZXNvbHZlKHN0cmVhbSk7XHJcbiAgICAgIH0sIGVyciA9PiB7XHJcbiAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBzdG9wVmlkZW8gKGluZGV4ID0gMCkge1xyXG4gICAgdGhpcy52aWRlb1RyYWNrcyAmJiB0aGlzLnZpZGVvVHJhY2tzW2luZGV4XSAmJiB0aGlzLnZpZGVvVHJhY2tzW2luZGV4XS5zdG9wKCk7XHJcbiAgfVxyXG5cclxuICBzdG9wQXVkaW8gKGluZGV4ID0gMCkge1xyXG4gICAgdGhpcy5hdWRpb1RyYWNrcyAmJiB0aGlzLmF1ZGlvVHJhY2tzW2luZGV4XSAmJiB0aGlzLmF1ZGlvVHJhY2tzW2luZGV4XS5zdG9wKCk7XHJcbiAgfVxyXG5cclxufSJdfQ==
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/MediaStream.js","/")
},{"2ionoC":3,"buffer":2}],20:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PeerConnection = function () {
  function PeerConnection() {
    var iceServers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{ url: "stun:stun.l.google.com:19302" }];

    _classCallCheck(this, PeerConnection);

    this.iceServers = iceServers;
    this.conn = this.connection = undefined;
    this.offer = undefined;
    this.answer = undefined;
    this.isCaller = undefined;
    this.state = undefined;
    this.candidate = undefined;
    this.isCandidateFired = undefined;

    this.onicecandidate = undefined;
    this.onaddstream = undefined;
    this.ondatachannel = undefined;
  }

  _createClass(PeerConnection, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      var conn = new RTCPeerConnection({ iceServers: this.iceServers }, null);

      conn.oniceconnectionstatechange = function (event) {
        _this.state = conn.iceConnectionState;
      };

      conn.onicecandidate = function (event) {
        if (!_this.isCandidateFired && event.candidate && event.candidate.candidate) {
          _this.isCandidateFired = true;
          _this.candidate = event.candidate;
          (0, _utils.isFunction)(_this.onicecandidate) && _this.onicecandidate(_this.candidate);
        }
      };

      conn.ondatachannel = function (event) {
        var channel = event.channel;
        if (channel) {
          _this.dataChannel = channel;
          (0, _utils.isFunction)(_this.ondatachannel) && _this.ondatachannel(channel);
          channel.onclose = function () {
            (0, _utils.isFunction)(_this.ondatachannelclose) && _this.ondatachannelclose();
          };
        }
      };

      conn.onaddstream = function (event) {
        var stream = event.stream;
        if (stream) {
          _this.stream = stream;
          (0, _utils.isFunction)(_this.onaddstream) && _this.onaddstream(event);
        }
      };

      this.conn = this.connection = conn;

      return Promise.resolve(this.conn);
    }
  }, {
    key: 'createOffer',
    value: function createOffer() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      };


      if (this.conn) {
        return this.conn.createOffer(options).then(function (offer) {
          _this2.offer = offer;
          _this2.isCaller = true;
          return _this2.conn.setLocalDescription(offer);
        }).then(function () {
          return _this2.offer;
        });
      } else {
        return Promise.reject(new Error('Connection is not available'));
      }
    }
  }, {
    key: 'createAnswer',
    value: function createAnswer() {
      var _this3 = this;

      if (this.conn) {
        return this.conn.createAnswer().then(function (answer) {
          _this3.answer = answer;
          _this3.isCaller = false;
          return _this3.conn.setLocalDescription(answer);
        }).then(function () {
          return _this3.answer;
        });
      } else {
        return Promise.reject(new Error('Connection is not available'));
      }
    }
  }, {
    key: 'setRemoteSDP',
    value: function setRemoteSDP(sdp) {
      if (this.conn) {
        return this.conn.setRemoteDescription(sdp);
      } else {
        return Promise.reject(new Error('Connection is not available'));
      }
    }
  }, {
    key: 'setRemoteCandidate',
    value: function setRemoteCandidate() {
      var candidate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this.conn && candidate && candidate.candidate) {
        return this.conn.addIceCandidate(new RTCIceCandidate(candidate));
      } else {
        return Promise.reject(new Error('Connection is not available'));
      }
    }
  }, {
    key: 'attachStream',
    value: function attachStream(stream) {
      if (this.conn && stream) {
        return this.conn.addStream(stream);
      } else {
        return Promise.reject(new Error('Connection is not available'));
      }
    }
  }]);

  return PeerConnection;
}();

exports.default = PeerConnection;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBlZXJDb25uZWN0aW9uLmpzIl0sIm5hbWVzIjpbIlBlZXJDb25uZWN0aW9uIiwiaWNlU2VydmVycyIsInVybCIsImNvbm4iLCJjb25uZWN0aW9uIiwidW5kZWZpbmVkIiwib2ZmZXIiLCJhbnN3ZXIiLCJpc0NhbGxlciIsInN0YXRlIiwiY2FuZGlkYXRlIiwiaXNDYW5kaWRhdGVGaXJlZCIsIm9uaWNlY2FuZGlkYXRlIiwib25hZGRzdHJlYW0iLCJvbmRhdGFjaGFubmVsIiwiUlRDUGVlckNvbm5lY3Rpb24iLCJvbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSIsImV2ZW50IiwiaWNlQ29ubmVjdGlvblN0YXRlIiwiY2hhbm5lbCIsImRhdGFDaGFubmVsIiwib25jbG9zZSIsIm9uZGF0YWNoYW5uZWxjbG9zZSIsInN0cmVhbSIsIlByb21pc2UiLCJyZXNvbHZlIiwib3B0aW9ucyIsIm9mZmVyVG9SZWNlaXZlQXVkaW8iLCJvZmZlclRvUmVjZWl2ZVZpZGVvIiwiY3JlYXRlT2ZmZXIiLCJ0aGVuIiwic2V0TG9jYWxEZXNjcmlwdGlvbiIsInJlamVjdCIsIkVycm9yIiwiY3JlYXRlQW5zd2VyIiwic2RwIiwic2V0UmVtb3RlRGVzY3JpcHRpb24iLCJhZGRJY2VDYW5kaWRhdGUiLCJSVENJY2VDYW5kaWRhdGUiLCJhZGRTdHJlYW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7SUFFcUJBLGM7QUFFbkIsNEJBQXFFO0FBQUEsUUFBeERDLFVBQXdELHVFQUEzQyxDQUFFLEVBQUNDLEtBQUssOEJBQU4sRUFBRixDQUEyQzs7QUFBQTs7QUFDbkUsU0FBS0QsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLRSxJQUFMLEdBQVksS0FBS0MsVUFBTCxHQUFrQkMsU0FBOUI7QUFDQSxTQUFLQyxLQUFMLEdBQWFELFNBQWI7QUFDQSxTQUFLRSxNQUFMLEdBQWNGLFNBQWQ7QUFDQSxTQUFLRyxRQUFMLEdBQWdCSCxTQUFoQjtBQUNBLFNBQUtJLEtBQUwsR0FBYUos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IGlzRnVuY3Rpb24gfSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVlckNvbm5lY3Rpb24ge1xyXG5cclxuICBjb25zdHJ1Y3RvciAoaWNlU2VydmVycyA9IFsge3VybDogXCJzdHVuOnN0dW4ubC5nb29nbGUuY29tOjE5MzAyXCJ9IF0pIHtcclxuICAgIHRoaXMuaWNlU2VydmVycyA9IGljZVNlcnZlcnM7XHJcbiAgICB0aGlzLmNvbm4gPSB0aGlzLmNvbm5lY3Rpb24gPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLm9mZmVyID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5hbnN3ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmlzQ2FsbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuY2FuZGlkYXRlID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5pc0NhbmRpZGF0ZUZpcmVkID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIHRoaXMub25pY2VjYW5kaWRhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLm9uYWRkc3RyZWFtID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5vbmRhdGFjaGFubmVsID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGl6ZSAoKSB7XHJcblxyXG4gICAgbGV0IGNvbm4gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24oeyBpY2VTZXJ2ZXJzOiB0aGlzLmljZVNlcnZlcnMgfSwgbnVsbCk7XHJcbiAgICBcclxuICAgIGNvbm4ub25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5zdGF0ZSA9IGNvbm4uaWNlQ29ubmVjdGlvblN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbm4ub25pY2VjYW5kaWRhdGUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmlzQ2FuZGlkYXRlRmlyZWQgJiYgZXZlbnQuY2FuZGlkYXRlICYmIGV2ZW50LmNhbmRpZGF0ZS5jYW5kaWRhdGUpIHtcclxuICAgICAgICB0aGlzLmlzQ2FuZGlkYXRlRmlyZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2FuZGlkYXRlID0gZXZlbnQuY2FuZGlkYXRlXHJcbiAgICAgICAgaXNGdW5jdGlvbih0aGlzLm9uaWNlY2FuZGlkYXRlKSAmJiB0aGlzLm9uaWNlY2FuZGlkYXRlKHRoaXMuY2FuZGlkYXRlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbm4ub25kYXRhY2hhbm5lbCA9IChldmVudCkgPT4ge1xyXG4gICAgICBsZXQgY2hhbm5lbCA9IGV2ZW50LmNoYW5uZWw7XHJcbiAgICAgIGlmIChjaGFubmVsKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhQ2hhbm5lbCA9IGNoYW5uZWw7XHJcbiAgICAgICAgaXNGdW5jdGlvbih0aGlzLm9uZGF0YWNoYW5uZWwpICYmIHRoaXMub25kYXRhY2hhbm5lbChjaGFubmVsKTtcclxuICAgICAgICBjaGFubmVsLm9uY2xvc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICBpc0Z1bmN0aW9uKHRoaXMub25kYXRhY2hhbm5lbGNsb3NlKSAmJiB0aGlzLm9uZGF0YWNoYW5uZWxjbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbm4ub25hZGRzdHJlYW0gPSAoZXZlbnQpID0+IHtcclxuICAgICAgbGV0IHN0cmVhbSA9IGV2ZW50LnN0cmVhbTtcclxuICAgICAgaWYgKHN0cmVhbSkge1xyXG4gICAgICAgIHRoaXMuc3RyZWFtID0gc3RyZWFtO1xyXG4gICAgICAgIGlzRnVuY3Rpb24odGhpcy5vbmFkZHN0cmVhbSkgJiYgdGhpcy5vbmFkZHN0cmVhbShldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvbm4gPSB0aGlzLmNvbm5lY3Rpb24gPSBjb25uO1xyXG5cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5jb25uKTtcclxuICB9XHJcblxyXG5cclxuICBjcmVhdGVPZmZlciAob3B0aW9ucyA9IHtcclxuICAgIG9mZmVyVG9SZWNlaXZlQXVkaW86IDEsXHJcbiAgICBvZmZlclRvUmVjZWl2ZVZpZGVvOiAxXHJcbiAgfSkge1xyXG5cclxuICAgIGlmICh0aGlzLmNvbm4pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29ubi5jcmVhdGVPZmZlcihvcHRpb25zKVxyXG4gICAgICAudGhlbihvZmZlciA9PiB7XHJcbiAgICAgICAgdGhpcy5vZmZlciA9IG9mZmVyO1xyXG4gICAgICAgIHRoaXMuaXNDYWxsZXIgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm4uc2V0TG9jYWxEZXNjcmlwdGlvbihvZmZlcik7XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vZmZlcjtcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ0Nvbm5lY3Rpb24gaXMgbm90IGF2YWlsYWJsZScpKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBjcmVhdGVBbnN3ZXIgKCkge1xyXG4gICAgaWYgKHRoaXMuY29ubikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb25uLmNyZWF0ZUFuc3dlcigpXHJcbiAgICAgIC50aGVuKGFuc3dlciA9PiB7XHJcbiAgICAgICAgdGhpcy5hbnN3ZXIgPSBhbnN3ZXI7XHJcbiAgICAgICAgdGhpcy5pc0NhbGxlciA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm4uc2V0TG9jYWxEZXNjcmlwdGlvbihhbnN3ZXIpO1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5zd2VyO1xyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignQ29ubmVjdGlvbiBpcyBub3QgYXZhaWxhYmxlJykpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0UmVtb3RlU0RQIChzZHApIHtcclxuICAgIGlmICh0aGlzLmNvbm4pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29ubi5zZXRSZW1vdGVEZXNjcmlwdGlvbihzZHApXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdDb25uZWN0aW9uIGlzIG5vdCBhdmFpbGFibGUnKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRSZW1vdGVDYW5kaWRhdGUgKGNhbmRpZGF0ZSA9IG51bGwpIHtcclxuICAgIGlmICh0aGlzLmNvbm4gJiYgY2FuZGlkYXRlICYmIGNhbmRpZGF0ZS5jYW5kaWRhdGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29ubi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShjYW5kaWRhdGUpKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignQ29ubmVjdGlvbiBpcyBub3QgYXZhaWxhYmxlJykpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXR0YWNoU3RyZWFtIChzdHJlYW0pIHtcclxuICAgIGlmICh0aGlzLmNvbm4gJiYgc3RyZWFtKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbm4uYWRkU3RyZWFtKHN0cmVhbSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdDb25uZWN0aW9uIGlzIG5vdCBhdmFpbGFibGUnKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/PeerConnection.js","/")
},{"./utils":22,"2ionoC":3,"buffer":2}],21:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PeerConnection = exports.MediaRecorder = exports.MediaStream = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _webrtcAdapter = require('webrtc-adapter');

var _webrtcAdapter2 = _interopRequireDefault(_webrtcAdapter);

var _MediaStream = require('./MediaStream');

var _MediaStream2 = _interopRequireDefault(_MediaStream);

var _MediaRecorder = require('./MediaRecorder');

var _MediaRecorder2 = _interopRequireDefault(_MediaRecorder);

var _PeerConnection = require('./PeerConnection');

var _PeerConnection2 = _interopRequireDefault(_PeerConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import DataChannel from './DataChannel'

if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) != undefined) {
  window.webrtc = {
    MediaStream: _MediaStream2.default,
    MediaRecorder: _MediaRecorder2.default,
    PeerConnection: _PeerConnection2.default
  };
}

exports.MediaStream = _MediaStream2.default;
exports.MediaRecorder = _MediaRecorder2.default;
exports.PeerConnection = _PeerConnection2.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfYzQ4NzZjNDQuanMiXSwibmFtZXMiOlsid2luZG93IiwidW5kZWZpbmVkIiwid2VicnRjIiwiTWVkaWFTdHJlYW0iLCJNZWRpYVJlY29yZGVyIiwiUGVlckNvbm5lY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFDQTs7QUFFQSxJQUFJLFFBQU9BLE1BQVAseUNBQU9BLE1BQVAsTUFBaUJDLFNBQXJCLEVBQWdDO0FBQzlCRCxTQUFPRSxNQUFQLEdBQWdCO0FBQ2RDLHNDQURjO0FBRWRDLDBDQUZjO0FBR2RDO0FBSGMsR0FBaEI7QUFLRDs7UUFHQ0YsVztRQUNBQyxhO1FBQ0FDLGMiLCJmaWxlIjoiZmFrZV9jNDg3NmM0NC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3IGZyb20gJ3dlYnJ0Yy1hZGFwdGVyJ1xyXG5pbXBvcnQgTWVkaWFTdHJlYW0gZnJvbSAnLi9NZWRpYVN0cmVhbSdcclxuaW1wb3J0IE1lZGlhUmVjb3JkZXIgZnJvbSAnLi9NZWRpYVJlY29yZGVyJ1xyXG5pbXBvcnQgUGVlckNvbm5lY3Rpb24gZnJvbSAnLi9QZWVyQ29ubmVjdGlvbidcclxuLy9pbXBvcnQgRGF0YUNoYW5uZWwgZnJvbSAnLi9EYXRhQ2hhbm5lbCdcclxuXHJcbmlmICh0eXBlb2Ygd2luZG93ICE9IHVuZGVmaW5lZCkge1xyXG4gIHdpbmRvdy53ZWJydGMgPSB7XHJcbiAgICBNZWRpYVN0cmVhbTogTWVkaWFTdHJlYW0sXHJcbiAgICBNZWRpYVJlY29yZGVyOiBNZWRpYVJlY29yZGVyLFxyXG4gICAgUGVlckNvbm5lY3Rpb246IFBlZXJDb25uZWN0aW9uXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIE1lZGlhU3RyZWFtLFxyXG4gIE1lZGlhUmVjb3JkZXIsXHJcbiAgUGVlckNvbm5lY3Rpb25cclxufVxyXG4iXX0=
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_c4876c44.js","/")
},{"./MediaRecorder":18,"./MediaStream":19,"./PeerConnection":20,"2ionoC":3,"buffer":2,"webrtc-adapter":7}],22:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isFunction = exports.isFunction = function isFunction(arg) {
  return arg && typeof arg === 'function';
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbImlzRnVuY3Rpb24iLCJhcmciXSwibWFwcGluZ3MiOiI7Ozs7O0FBQU8sSUFBTUEsa0NBQWEsU0FBYkEsVUFBYSxDQUFDQyxHQUFELEVBQVM7QUFDakMsU0FBT0EsT0FBTyxPQUFPQSxHQUFQLEtBQWUsVUFBN0I7QUFDRCxDQUZNIiwiZmlsZSI6InV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGlzRnVuY3Rpb24gPSAoYXJnKSA9PiB7XHJcbiAgcmV0dXJuIGFyZyAmJiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xyXG59Il19
}).call(this,require("2ionoC"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/utils.js","/")
},{"2ionoC":3,"buffer":2}]},{},[21])
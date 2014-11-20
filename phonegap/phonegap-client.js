/* jshint browser:true */
/* global libsb, $ */
var config = require('../client-config.js');
libsb.on("navigate", function(state, next) {
	var regex;
	if (state.phonegap && state.source === 'boot') {
		regex = new RegExp("(^https?:" + config.server.host + ")(($)|(\/)).*");
		console.log("test", regex.test("https://local.scrollback.io/akdshf");
		window.openExternal = function openExternal(elem) {
			window.open(elem.href, "_system");
			return false;
		};
		$(document).on('click', "a[href]", function(e) {
			// config.host e.g- //local.scrollback.io

			if (!(regex).test(this.href)) {
				e.preventDefault();
				window.openExternal(this);
			}

		});
	}
	next();
}, 500);


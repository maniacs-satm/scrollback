/* eslint-env browser */

"use strict";

module.exports = function(core) {
	var colordiv;

	function rgb2hex(color) {
		var arr, rgb, r, g, b;

		arr = color.replace(/[rgba()]/g, "").split(",");

		rgb = [
			parseInt(arr[0], 10),
			parseInt(arr[1], 10),
			parseInt(arr[2], 10)
		];

		r = ("0" + parseInt(rgb[0], 10).toString(16)).slice(-2);
		g = ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2);
		b = ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2);

		return "#" + r + g + b;
	}

	core.on("boot", function(state) {
		if (window.Android) {
			state.context.env = "android";

			if (typeof window.Android.onFinishedLoading === "function") {
				window.Android.onFinishedLoading();
			}
		}
	}, 200);

	if (window.Android && typeof window.Android.setStatusBarColor === "function") {
		colordiv = document.createElement("div");

		colordiv.className = "thread-color-dark";

		document.body.appendChild(colordiv);

		core.on("statechange", function(changes) {
			var color;

			if (changes.nav && (changes.nav.mode || changes.nav.thread || changes.nav.room)) {
				color = window.getComputedStyle(colordiv)["background-color"];

				if (color) {
					window.Android.setStatusBarColor(rgb2hex(color));
				} else {
					window.Android.setStatusBarColor("#000000");
				}
			}
		}, 1);
	}
};

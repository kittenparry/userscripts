// ==UserScript==
// @name         reddit Karma Hider
// @namespace    https://github.com/kittenparry/
// @version      1.0
// @description  Hide karma of posts & comments.
// @author       kittenparry
// @include      *://*.reddit.com/*
// @include      *://reddit.com/*
// @grant        none
// @run-at       document-start
// @license      GPL-3.0-or-later
// ==/UserScript==

(() => {
	let css = '.midcol .score { visibility: hidden; } .tagline .score { display: none; }';
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		let node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		let heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			heads[0].appendChild(node);
		} else {
			document.documentElement.appendChild(node);
		}
	}
})();

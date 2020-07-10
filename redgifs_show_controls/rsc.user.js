// ==UserScript==
// @name         Redgifs Show Controls
// @namespace    https://github.com/kittenparry/
// @version      0.1
// @description  For some reason the controls are disabled by default.
// @author       kittenparry
// @match        https://www.gifdeliverynetwork.com/*
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

(function() {
	document.querySelector('video[class="video"]').controls = true;
})();

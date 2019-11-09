// ==UserScript==
// @name         Gfycat HD On
// @namespace    https://github.com/kittenparry/
// @version      0.1
// @description  Switch to HD version on page load™.
// @author       kittenparry
// @match        https://gfycat.com/*
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

setTimeout(() => {
	document.querySelector('span[class="settings-button"]').click();
}, 500);

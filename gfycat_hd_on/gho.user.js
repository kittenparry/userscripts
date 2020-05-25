// ==UserScript==
// @name         Gfycat/redgifs HD On
// @namespace    https://github.com/kittenparry/
// @version      0.2
// @description  Switch to HD version on page load™.
// @author       kittenparry
// @include      https://*.gfycat.com/*
// @include      https://gfycat.com/*
// @include      https://*.redgifs.com/*
// @include      https://redgifs.com/*
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

setTimeout(() => {
	document.querySelector('span[class="settings-button"]').click();
}, 500);

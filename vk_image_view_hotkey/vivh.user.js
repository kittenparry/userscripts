// ==UserScript==
// @name         VK Image View Hotkey
// @namespace    https://github.com/kittenparry/
// @version      0.1
// @description  View the full image by pressing D.
// @author       kittenparry
// @match        https://vk.com/photo*
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

window.addEventListener('keydown', (e) => {
	let type = e.target.getAttribute('type');
	let tag = e.target.tagName.toLowerCase();
	if (type != 'text' && tag != 'textarea') {
		if (e.keyCode == 68) {
			open(document.getElementById('pv_photo').firstElementChild.src);
		}
	}
}, false);

// ==UserScript==
// @name         Twitch Fullscreen Shortcut
// @namespace    https://github.com/kittenparry/
// @version      1.0
// @description  F keyboard button to go fullscreen on Twitch, similar to Youtube.
// @author       kittenparry
// @match        *://www.twitch.tv/*
// @grant        none
// @license      MIT License
// ==/UserScript==

check_twitch_key_press = (e) => {
	var type = e.target.getAttribute('type');
	var tag = e.target.tagName.toLowerCase();
	if (type != 'text' && tag != 'textarea' && type != 'search') {
		if (e.keyCode == 70) {
			document.querySelector('button[class="player-button qa-fullscreen-button pl-mg-r-1 pl-button__fullscreen--tooltip-left"]').click();
		}
	}
};
window.addEventListener('keydown', (e) => check_twitch_key_press(e), false);

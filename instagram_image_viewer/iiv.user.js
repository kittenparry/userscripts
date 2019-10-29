// ==UserScript==
// @name         Instagram Image Viewer
// @namespace    https://github.com/kittenparry/
// @version      0.2
// @description  View the full image with the click of a button (or D key press).
// @author       kittenparry
// @match        https://www.instagram.com/p/*
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* CHANGELOG:
 * 0.2:  fix the functionality | only gets the last image in image sets
 * 0.1:  initial
 */

window.addEventListener('keydown', (e) => {
	var type = e.target.getAttribute('type');
	var tag = e.target.tagName.toLowerCase();
	if (type != 'text' && tag != 'textarea') {
		if (e.keyCode == 68) {
			window.location = document.documentElement.children[1].getElementsByTagName('script')[11].innerText.match(/"src":"(.*)","config_width":1080/)[1].split('src":')[document.documentElement.children[1].getElementsByTagName('script')[11].innerText.match(/"src":"(.*)","config_width":1080/)[1].split('src":').length - 1].replace(/\\/g, '').replace(/"/g, '');
		}
	}
}, false);

document.body.innerHTML += '<a href="' + document.documentElement.children[1].getElementsByTagName('script')[11].innerText.match(/"src":"(.*)","config_width":1080/)[1].split('src":')[document.documentElement.children[1].getElementsByTagName('script')[11].innerText.match(/"src":"(.*)","config_width":1080/)[1].split('src":').length - 1].replace(/\\/g, '').replace(/"/g, '') + '" style="color: #7f8a94;"><div style="position: fixed; bottom: 50%; right: 0px; border-radius: 15px 0px 0px 15px; background: #faf0e6; padding: 13px; border: 2px solid #7f8a94; border-right-style: none;"><i style="border: solid black; border-width: 0 3px 3px 0; display: inline-block; padding: 3px; transform: rotate(45deg); -webkit-transform: rotate(45deg);"></i></div></a>';

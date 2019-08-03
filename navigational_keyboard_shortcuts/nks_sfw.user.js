// ==UserScript==
// @name         Navigational Keyboard Shortcuts SFW
// @namespace    https://github.com/kittenparry/
// @version      1.3
// @description  Navigate through websites using keyboard buttons N/B for next/previous pages.
// @author       kittenparry
// @match        *://*/*
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* LIST:
 * metal-tracker.com
 * nexusmods.com
 * nyaa.si
 * rarbg.to || rarbgproxy.org
 * reddit.com
 * steamcommunity.com/workshop/
 * steamgifts.com
 * trakt.tv
 * tumblr.com
 */

/* CHANGELOG:
 * 1.3:       +trakt.tv | only works in episode/season views | switch to semantic versioning so incrementing minor instead of patch part (https://semver.org/)
 * 1.2.3:     +rarbgproxy.org as an alternative to rarbg.to
 * 1.2.2:     +nexusmods.com | assignment is in the function
 * 1.2.1:     +steamcommunity.com/workshop/ | remove sfw from version naming
 * 1.2.sfw:   metal-tracker.com | btn case switch
 * 1.1.1.sfw: prevent execution of code when not on these sites
 * 1.1:       +nyaa.si
 * 1.0:       initial
 */

check_nav_key_press = (e, prev, next, special = '') => {
	var type = e.target.getAttribute('type');
	var tag = e.target.tagName.toLowerCase();
	if (type != 'text' && tag != 'textarea' && type != 'search') {
		if (e.keyCode == 66) {
			if (special == 'nexusmods') {
				document.querySelector('li[class="prev"]').firstElementChild.click();
			} else if (special == 'btn' && prev != undefined) {
				document.querySelector(prev).click();
			} else if (special == 'url' && prev != undefined) {
				window.location = prev;
			} else if (special == '') {
				window.location = document.querySelector(prev).href;
			}
		} else if (e.keyCode == 78) {
			if (special == 'nexusmods') {
				document.querySelector('li[class="next"]').firstElementChild.click();
			} else if (special == 'btn' && next != undefined) {
				document.querySelector(next).click();
			} else if (special == 'url' && next != undefined) {
				window.location = next;
			} else if (special == '') {
				window.location = document.querySelector(next).href;
			}
		}
	}
};

/* probably need a better way than simply .includes()
 * pqsel: previous query selector
 * nqsel: next query selector
 * nav_spcl: used when url is given instead of selector
 *	 check steamgifts example
 *	 also these include try/catch if they don't exist yet (first/last page)
 *	 !this section really looks ugly and repetitive
 */

var cur_loc = window.location.href;

if (cur_loc.includes('metal-tracker.com')) {
	var nav_spcl = 'btn';
	var pqsel = 'li[class="previous"]';
	var nqsel = 'li[class="next"]';
} else if (cur_loc.includes('nexusmods.com')) {
	var nav_spcl = 'nexusmods';
	var pqsel = '';
	var nqsel = '';
} else if (cur_loc.includes('nyaa.si')) {
	var pqsel = 'a[rel="prev"]';
	var nqsel = 'a[rel="next"]';
} else if (cur_loc.includes('rarbg.to') || cur_loc.includes('rarbgproxy.org')) {
	var pqsel = 'a[title="previous page"]';
	var nqsel = 'a[title="next page"]'
} else if (cur_loc.includes('reddit.com')) {
	var pqsel = 'a[rel="nofollow prev"]';
	var nqsel = 'a[rel="nofollow next"]';
} else if (cur_loc.includes('steamcommunity.com/workshop/')) {
	var nav_spcl = 'url';
	try {
		var pqsel = document.querySelectorAll('.pagebtn')[0].href;
	} catch (e) {}
	try {
		var nqsel = document.querySelectorAll('.pagebtn')[1].href;
	} catch (e) {}
} else if (cur_loc.includes('steamgifts.com')) {
	var nav_spcl = 'url';
	try {
		var pqsel = document.querySelector('i[class="fa fa-angle-left"]').parentNode.href;
	} catch (e) {}
	try {
		var nqsel = document.querySelector('i[class="fa fa-angle-right"]').parentNode.href;
	} catch (e) {}
} else if (cur_loc.includes('trakt.tv')) {
	var pqsel = 'a[class="previous-item-link"]';
	var nqsel = 'a[class="next-item-link"]';
} else if (cur_loc.includes('tumblr.com')) {
	var pqsel = 'a[id="previous_page_link"]';
	var nqsel = 'a[id="next_page_link"]';
}

if (pqsel != undefined || nqsel != undefined) {
	try {
		if (nav_spcl) {
			window.addEventListener('keydown', (e) => check_nav_key_press(e, pqsel, nqsel, nav_spcl), false);
		} else {
			window.addEventListener('keydown', (e) => check_nav_key_press(e, pqsel, nqsel), false);
		}
	} catch (e) {}
}

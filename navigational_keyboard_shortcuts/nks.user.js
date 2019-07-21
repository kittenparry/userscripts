// ==UserScript==
// @name         Navigational Keyboard Shortcuts
// @namespace    https://github.com/kittenparry/
// @version      1.5
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
 * rarbg.com
 * reddit.com
 * steamcommunity.com/workshop/
 * steamgifts.com
 * tumblr.com
 * 
 * NSFW:
 * 8muses.com
 * camwhores.tv
 * coedcherry.com
 * f95zone.com
 * hentai-foundry.com
 * hongfire.com
 * javbus.com
 * meitulu.com
 * meituri.com
 * nhentai.net
 * nobodyhome.ga
 * pornbay.org
 * shadbase.com
 * sinnercomics.com
 * thothub.tv
 * yiff.party/activity
 */

/* CHANGELOG:
 * 1.5: +meituri.com +meitulu.com | they work the same way so a simple or will do
 * 1.4: +javbus.com | also switch to semantic versioning so incrementing minor instead of patch part (https://semver.org/)
 * 1.3.7: +thothub.tv
 * 1.3.6: +nexusmods.com | a special case similar to camwhores.tv
 * 1.3.5: +yiff.party/activity | with some clunky mechanics
 * 1.3.4: +steamcommunity.com/workshop/
 * 1.3.3: +f95zone.to/latest/ | change the original link to .to as well
 * 1.3.2: +metal-tracker.com | btn case i wanted to use in camwhores.tv
 * 1.3.1: +shadbase.com
 * 1.3: +camwhores.tv | element needs to be reassigned each time so it's in the function
 * 1.2.4: +8muses.com
 * 1.2.3: +nobodyhome.ga
 * 1.2.2: +hongfire.com
 * 1.2.1: prevent execution of code when not on these sites
 * 1.2: +f95zone.com
 * 1.1: +nyaa.si +coedcherry.com
 * 1.0: initial
 */

check_nav_key_press = (e, prev, next, special = '') => {
	var type = e.target.getAttribute('type');
	var tag = e.target.tagName.toLowerCase();
	if (type != 'text' && tag != 'textarea' && type != 'search') {
		if (e.keyCode == 66) {
			if (special == 'camwhores') {
				document.querySelector('li[class="page-current"]').previousElementSibling.firstElementChild.click();
			} else if (special == 'nexusmods') {
				document.querySelector('li[class="prev"]').firstElementChild.click();
			} else if (special == 'meituri') {
				document.querySelectorAll('.a1')[0].click();
			} else if (special == 'btn' && prev != undefined) {
				document.querySelector(prev).click();
			} else if (special == 'url' && prev != undefined) {
				window.location = prev;
			} else if (special == '') {
				window.location = document.querySelector(prev).href;
			}
		} else if (e.keyCode == 78) {
			if (special == 'camwhores') {
				document.querySelector('li[class="page-current"]').nextElementSibling.firstElementChild.click();
			} else if (special == 'nexusmods') {
				document.querySelector('li[class="next"]').firstElementChild.click();
			} else if (special == 'meituri') {
				document.querySelectorAll('.a1')[1].click();
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

// for now only optimised for getting one result (first result)
// with href for yiff.party
find_els_with_text = (tag, text) => {
	var els = document.getElementsByTagName(tag);
	var found = [];
	for (var i = 0; i < els.length; i++) {
		if (els[i].innerHTML == text) {
			found.push(els[i]);
		}
	}

	return found[0].href;
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
} else if (cur_loc.includes('rarbg.to')) {
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
} else if (cur_loc.includes('tumblr.com')) {
	var pqsel = 'a[id="previous_page_link"]';
	var nqsel = 'a[id="next_page_link"]';
	// nsfw below
} else if (cur_loc.includes('8muses.com')) {
	var pqsel = 'a[class="pageNav-jump pageNav-jump--prev"]';
	var nqsel = 'a[class="pageNav-jump pageNav-jump--next"]';
} else if (cur_loc.includes('camwhores.tv')) {
	var nav_spcl = 'camwhores';
	var pqsel = '';
	var nqsel = '';
} else if (cur_loc.includes('coedcherry.com')) {
	var pqsel = 'a[rel="prev"]';
	var nqsel = 'a[rel="next"]';
} else if (cur_loc.includes('f95zone.to/latest/')) {
	// something else for "/pages/latest/"
	var pqsel = 'a[class="nav_prev"]';
	var nqsel = 'a[class="nav_next"]';
} else if (cur_loc.includes('f95zone.to')) {
	// for only threads/forums
	// something else is required for /pages/latest/
	var pqsel = 'a[class="pageNav-jump pageNav-jump--prev"]';
	var nqsel = 'a[class="pageNav-jump pageNav-jump--next"]';
} else if (cur_loc.includes('hentai-foundry.com')) {
	var nav_spcl = 'url';
	try {
		var pqsel = document.querySelector('li[class="previous"]').firstChild.href;
	} catch (e) {}
	try {
		var nqsel = document.querySelector('li[class="next"]').firstChild.href;
	} catch (e) {}
} else if (cur_loc.includes('hongfire.com')) {
	var pqsel = 'a[class="js-pagenav-button js-pagenav-prev-button b-button b-button--secondary js-shrink-event-child"]';
	var nqsel = 'a[class="js-pagenav-button js-pagenav-next-button b-button b-button--secondary js-shrink-event-child"]';
} else if (cur_loc.includes('javbus.com')) {
	var pqsel = 'a[id="pre"]';
	var nqsel = 'a[id="next"]';
} else if (cur_loc.includes('meituri.com') || cur_loc.includes('meitulu.com')) {
	var nav_spcl = 'meituri';
	var pqsel = '';
	var nqsel = '';
} else if (cur_loc.includes('nhentai.net')) {
	var pqsel = 'a[class="previous"]';
	var nqsel = 'a[class="next"]';
} else if (cur_loc.includes('nobodyhome.ga')) {
	var pqsel = 'a[class="pagination_previous"]';
	var nqsel = 'a[class="pagination_next"]';
} else if (cur_loc.includes('pornbay.org')) {
	var pqsel = 'a[class="pager pager_prev"]';
	var nqsel = 'a[class="pager pager_next"]';
} else if (cur_loc.includes('shadbase.com')) {
	var pqsel = 'a[class="navi navi-prev"]';
	var nqsel = 'a[class="navi navi-next"]';
} else if (cur_loc.includes('sinnercomics.com')) {
	var pqsel = 'a[class="comic-nav-base comic-nav-previous"]';
	var nqsel = 'a[class="comic-nav-base comic-nav-next"]';
} else if (cur_loc.includes('thothub.tv')) {
	var pqsel = 'a[class="pageNav-jump pageNav-jump--prev"]';
	var nqsel = 'a[class="pageNav-jump pageNav-jump--next"]';
} else if (cur_loc.includes('yiff.party/activity')) {
	var nav_spcl = 'url';
	try {
		var pqsel = find_els_with_text('a', 'prev');
	} catch (e) {}
	try {
		var nqsel = find_els_with_text('a', 'next');
	} catch (e) {}
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

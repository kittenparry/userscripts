// ==UserScript==
// @name         Navigational Keyboard Shortcuts
// @namespace    https://github.com/kittenparry/
// @version      0.1
// @description  Navigate through websites using keyboard buttons N/B for next/previous pages.
// @author       kittenparry
// @match        *://*/*
// @grant        none
// ==/UserScript==

/* LIST:
 *	 rarbg.com
 *	 reddit.com
 *	 steamgifts.com
 *	 tumblr.com
 * NSFW:
 *	 hentai-foundry.com
 *	 nhentai.net
 *	 pornbay.org
 *	 sinnercomics.com
 */

check_nav_key_press = (e, prev, next, special = false) => {
	var type = e.target.getAttribute('type');
	var tag = e.target.tagName.toLowerCase();
	if(type != 'text' && tag != 'textarea' && type != 'search'){
		switch(e.keyCode){
			case 66:
				if(special && prev != undefined){
					window.location = prev;
				}else if(!special){
					window.location = document.querySelector(prev).href;
				}
				break;
			case 78:
				if(special && next != undefined){
					window.location = next;
				}else if(!special){
					window.location = document.querySelector(next).href;
				}
				break;
			default:
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

if(cur_loc.includes('rarbg.to')){
	var pqsel = 'a[title="previous page"]';
	var nqsel = 'a[title="next page"]'}
else if(cur_loc.includes('reddit.com')){
	var pqsel = 'a[rel="nofollow prev"]';
	var nqsel = 'a[rel="nofollow next"]';
}else if(cur_loc.includes('steamgifts.com')){
	var nav_spcl = true;
	try{
		var pqsel = document.querySelector('i[class="fa fa-angle-left"]').parentNode.href;
	}catch(e){}
	try{
		var nqsel = document.querySelector('i[class="fa fa-angle-right"]').parentNode.href;
	}catch(e){}
}else if(cur_loc.includes('tumblr.com')){
	var pqsel = 'a[id="previous_page_link"]';
	var nqsel = 'a[id="next_page_link"]';
// nsfw below
}else if(cur_loc.includes('hentai-foundry.com')){
	var nav_spcl = true;
	try{
		var pqsel = document.querySelector('li[class="previous"]').firstChild.href;
	}catch(e){}
	try{
		var nqsel = document.querySelector('li[class="next"]').firstChild.href;
	}catch(e){}
}else if(cur_loc.includes('nhentai.net')){
	var pqsel = 'a[class="previous"]';
	var nqsel = 'a[class="next"]';
}else if(cur_loc.includes('pornbay.org')){
	var pqsel = 'a[class="pager pager_prev"]';
	var nqsel = 'a[class="pager pager_next"]';
}else if(cur_loc.includes('sinnercomics.com')){
	var pqsel = 'a[class="comic-nav-base comic-nav-previous"]';
	var nqsel = 'a[class="comic-nav-base comic-nav-next"]';
}

try{
	if(nav_spcl){
		window.addEventListener('keydown', (e) => check_nav_key_press(e, pqsel, nqsel, nav_spcl), false);
	}else{
		window.addEventListener('keydown', (e) => check_nav_key_press(e, pqsel, nqsel), false);
	}
}catch(e){}

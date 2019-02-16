// ==UserScript==
// @name         Instagram Download Button
// @namespace    https://github.com/kittenparry/
// @version      0.1
// @description  Get full image on button click or 'd' key (need to be in the page of image and not that fancy foreground thingy)
// @author       kittenparry
// @match        https://www.instagram.com/p/*
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', (e) => {
  var type = e.target.getAttribute('type');
	var tag = e.target.tagName.toLowerCase();
	if(type != 'text' && tag != 'textarea'){
		switch(e.keyCode){
			case 68: //D key
				window.location = document.querySelector('meta[property="og:image"]').getAttribute('content');
				break;
			default:
		}
	}
}, false);

document.body.innerHTML += '<a href="' + document.querySelector("meta[property='og:image']").getAttribute('content') + '" style="color: #7f8a94;"><div style="position: fixed; bottom: 50%; right: 0px; border-radius: 15px 0px 0px 15px; background: #faf0e6; padding: 13px; border: 2px solid #7f8a94; border-right-style: none;"><i style="border: solid black; border-width: 0 3px 3px 0; display: inline-block; padding: 3px; transform: rotate(45deg); -webkit-transform: rotate(45deg);"></i></div></a>';

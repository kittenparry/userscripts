// ==UserScript==
// @name         Twitch Status+
// @namespace    https://github.com/kittenparry/
// @version      0.1
// @description  Switch to online and share activity status on page load™.
// @author       kittenparry
// @match        https://*.twitch.tv/*
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

setTimeout(() => {
	let avatar = document.querySelector('img[class="tw-block tw-border-radius-rounded tw-image tw-image-avatar"]');
	avatar.click();
	let online_toggle = document.querySelectorAll('input[class="ScToggleInput-sc-796zbf-1 doVmsZ tw-toggle__input"]')[0];
	if (!online_toggle.checked) {
		online_toggle.click();
		let activity_toggle = document.querySelectorAll('input[class="ScToggleInput-sc-796zbf-1 doVmsZ tw-toggle__input"]')[1];
		if (!activity_toggle.checked) {
			activity_toggle.click();
		} else {}
		avatar.click();
	} else {
		avatar.click();
	}
}, 3000);

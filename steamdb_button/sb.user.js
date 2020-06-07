// ==UserScript==
// @name         SteamDB button on Steam page
// @namespace    https://github.com/kittenparry/
// @version      0.1
// @description  One click away from useful stats on the game.
// @author       kittenparry
// @match        https://store.steampowered.com/app/*
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

let dom = document.querySelector('div[class="queue_actions_ctn"]');
let btn = `<div style="cursor: pointer; position: relative; display: inline-block;" class="queue_control_button queue_btn_ignore" onclick='steamdb()'><div class="btnv6_blue_hoverfade  btn_medium queue_btn_inactive"><span>SteamDB</span></div></div>`;
dom.children[2].innerHTML += btn;

steamdb = () => {
	let id = window.location.href.split('/')[4];
	window.open(`https://steamdb.info/app/${id}/`);
};

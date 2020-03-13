import 'https://polyfill.io/v3/polyfill.min.js?unknown=polyfill&flags=gated&features=Array.from%2CArray.prototype.every%2CArray.prototype.find%2CArray.prototype.includes%2CArray.prototype.some%2CCustomEvent%2CDOMTokenList%2CDate.prototype.toISOString%2CDocumentFragment.prototype.append%2CElement.prototype.append%2CElement.prototype.classList%2CElement.prototype.closest%2CElement.prototype.dataset%2CElement.prototype.matches%2CElement.prototype.scrollIntoView%2CElement.prototype.toggleAttribute%2CMutationObserver%2CObject.fromEntries%2CPromise%2CSet%2CString.prototype.includes%2CString.prototype.startsWith%2CString.prototype.endsWith%2CURL%2CURLSearchParams%2CWebAnimations%2CWeakSet%2CWeakMap%2CmatchMedia%2CscrollIntoView%2CrequestAnimationFrame%2C%7Ehtml5-elements';
import 'https://cdn.kernvalley.us/js/std-js/deprefixer.js';
import 'https://cdn.kernvalley.us/js/std-js/shims.js';
import { $, registerServiceWorker, ready } from 'https://cdn.kernvalley.us/js/std-js/functions.js';
import * as handlers from './handlers.js';
document.documentElement.classList.replace('no-js', 'js');

if (document.documentElement.dataset.hasOwnProperty('serviceWorker')) {
	registerServiceWorker(document.documentElement.dataset.serviceWorker).catch(console.error);
}

ready().then(() => {
	document.body.classList.toggle('no-dialog', document.createElement('dialog') instanceof HTMLUnknownElement);
	document.body.classList.toggle('no-details', document.createElement('details') instanceof HTMLUnknownElement);
	handlers.hashChange({newURL: location.href});
	$('[data-action]').click(event => {
		const action = event.target.closest('[data-action]').dataset.action;

		if (action in handlers) {
			handlers[action](event);
		}
	});
});

if (location.hash === '#accessibility') {
	location.hash = '';
}

window.addEventListener('hashchange', ({newURL, oldURL}) => handlers.hashChange({newURL, oldURL}), {passive: true});

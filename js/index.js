import 'https://cdn.kernvalley.us/js/std-js/deprefixer.js';
import 'https://cdn.kernvalley.us/js/std-js/shims.js';
import { registerServiceWorker, ready } from 'https://cdn.kernvalley.us/js/std-js/functions.js';

document.documentElement.classList.replace('no-js', 'js');

if (document.documentElement.dataset.hasOwnProperty('serviceWorker')) {
	registerServiceWorker(document.documentElement.dataset.serviceWorker).catch(console.error);
}

ready().then(() => {
	document.body.classList.toggle('no-dialog', document.createElement('dialog') instanceof HTMLUnknownElement);
	document.body.classList.toggle('no-details', document.createElement('details') instanceof HTMLUnknownElement);
	hashChangeHandler({newURL: location.href});
});

function hashChangeHandler({newURL, oldURL = null})  {
	const [from, to] = [
		typeof oldURL === 'string' ? new URL(oldURL).hash.substr(1) : null,
		new URL(newURL).hash.substr(1)
	];

	const target = document.getElementById(to);
	const leaving = document.getElementById(from);

	if (target instanceof HTMLElement && target.tagName === 'DIALOG') {
		target.showModal();
	} else if (target instanceof HTMLElement && target.tagName === 'TOAST-MESSAGE') {
		customElements.whenDefined('toast-message').then(() => target.show());
	}

	if (leaving instanceof HTMLElement && ['DIALOG', 'TOAST-MESSAGE'].includes(leaving.tagName)) {
		leaving.close();
	}
}

window.addEventListener('hashchange', ({newURL, oldURL}) => hashChangeHandler({newURL, oldURL}), {passive: true});

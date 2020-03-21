export function hashChange({newURL, oldURL = null})  {
	const [from, to] = [
		typeof oldURL === 'string' ? new URL(oldURL).hash.substr(1) : null,
		new URL(newURL).hash.substr(1)
	];

	const target = document.getElementById(to);
	const leaving = document.getElementById(from);

	if (target instanceof HTMLElement && target.tagName === 'DIALOG') {
		requestAnimationFrame(() => target.showModal());
	} else if (target instanceof HTMLElement && target.tagName === 'TOAST-MESSAGE') {
		customElements.whenDefined('toast-message').then(() => target.show());
	}

	if (leaving instanceof HTMLElement && ['DIALOG', 'TOAST-MESSAGE'].includes(leaving.tagName)) {
		leaving.close();
	}

	[...document.querySelectorAll('a.current')].forEach(a => a.classList.remove('current'));
	[...document.querySelectorAll(`a.nav-link[href$="${CSS.escape(to)}"]`)].forEach(a => a.classList.add('current'));
}

export function back(event) {
	if (event instanceof Event) {
		event.preventDefault();
	}

	history.back();
}

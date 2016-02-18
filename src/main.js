import 'milligram/dist/milligram.css'
import './styles/main.styl';
import app from './views/app.js';
import { getLocalPathname } from 'local-links';
import parse from 'vdom-parser';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';

const rootElement = document.body.firstChild;

function render(page) {
	requestAnimationFrame(() => {
		patch(rootElement, diff(parse(rootElement), app({url: page})));
	});
}

// if the user hits the back/forward buttons
// pass the new url to the worker
window.addEventListener('popstate', () => {
	render(location.pathname);
})

// listen for all clicks globally
document.body.addEventListener('click', (event) => {
	// handles internal navigation defined as
	// clicks on <a> tags that have `href` that is
	// on the same origin.
	// https://www.npmjs.com/package/local-links
	const pathname = getLocalPathname(event)
	if (pathname) {
		// stop browser from following the link
		event.preventDefault()
		// instead, render new VDom
		render(pathname);
	}
});

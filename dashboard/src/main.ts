import App from './components/App.svelte';
import 'modern-css-reset'

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

window.app = app;

export default app;

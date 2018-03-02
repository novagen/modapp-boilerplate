import { AppExt } from 'modapp/ext';
import eventBus from 'modapp/eventBus';
import modules from './modules';
import config from './module.config';

import './scss/default.scss';

// Create app and load core modules
window.app = new AppExt(config, { eventBus: eventBus });
window.app.loadBundle(modules)
	.then(result => {
		console.info("[Main] Loaded modules: ", result);
		window.app.render(document.body);
	});
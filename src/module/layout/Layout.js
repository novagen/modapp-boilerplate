import Model from 'modapp-resource/Model';
import LayoutComponent from './LayoutComponent';

import './Layout.scss';

/**
 * Layout draws the main layout wireframe
 * @module module/Layout
 */
class Layout {
	constructor(app, params) {
		this.app = app;
		this.app.require([ 'router' ], this._init.bind(this));
	}

	_init(module) {
		this.module = module;
		this.model = new Model(this.app.eventBus, 'module.layout.model', {
			definition: {
				menuOpen: {
					type: 'boolean'
				}
			}
		});

		this.component = new LayoutComponent(this.app, this.module, this.model);

		this.app.setComponent(this.component);
	}

	dispose() {
		this.app.unsetComponent(this.component);
		this.component = null;
	}
}

export default Layout;
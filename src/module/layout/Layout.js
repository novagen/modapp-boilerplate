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
		this.module.layout = this;

		this.model = new Model(this.app.eventBus, 'module.layout.model', {
			definition: {
				menuOpen: {
					type: 'boolean'
				},
				asideOpen: {
					type: 'boolean'
				},
				footerOpen: {
					type: 'boolean',
					default: true
				}
			}
		});

		this.component = new LayoutComponent(this.app, this.module, this.model);

		this.app.setComponent(this.component);
	}

	openAside(open) {
		this.model.set({ asideOpen: open });
	}

	openMenu(open) {
		this.model.set({ menuOpen: open });
	}

	openFooter(open) {
		this.model.set({ footerOpen: open });
	}

	dispose() {
		this.app.unsetComponent(this.component);
		this.component = null;
	}
}

export default Layout;
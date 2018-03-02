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
					type: 'boolean',
					default: false
				},
				footerOpen: {
					type: 'boolean',
					default: false
				}
			}
		});

		this.component = new LayoutComponent(this.app, this.module, this.model);

		this.app.setComponent(this.component);
	}

	/**
	 * Show a component in the aside area
	 * @param {object} component The component to load in the aside area
	 */
	setAsideComponent(component) {
		this.component.setAsideContent(component);
	}

	/**
	 * Open / close the aside area
	 * @param {boolean} open true if it show open, false if it should close
	 */
	openAside(open) {
		this.model.set({ asideOpen: open });
	}

	/**
	 * Open / close the nav area
	 * @param {boolean} open true if it show open, false if it should close
	 */
	openMenu(open) {
		this.model.set({ menuOpen: open });
	}

	/**
	 * Open / close the footer area
	 * @param {boolean} open true if it show open, false if it should close
	 */
	openFooter(open) {
		this.model.set({ footerOpen: open });
	}

	dispose() {
		this.app.unsetComponent(this.component);
		this.component = null;
	}
}

export default Layout;
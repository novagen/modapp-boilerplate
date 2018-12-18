import { Model } from 'modapp-resource';
import LayoutComponent from './LayoutComponent';

const namespace = 'module.layout';

const OBJ_DEF = {
	title: {
		type: 'string',
		default: ''
	},
	usePageInTitle: {
		type: 'boolean',
		default: false
	},
	titlePageSeparator: {
		type: 'string',
		default: ':'
	},
	menuOpen: {
		type: 'boolean',
		default: true
	},
	asideOpen: {
		type: 'boolean',
		default: false
	},
	footerOpen: {
		type: 'boolean',
		default: false
	},
	menuExpanded: {
		type: 'boolean',
		default: false
	}
};

/**
 * Layout draws the main layout wireframe
 * @module module/Layout
 */
class Layout {
	constructor(app, params) {
		this.app = app;

		this.model = new Model({
			eventBus: this.app.eventBus,
			namespace: namespace + '.model',
			definition: OBJ_DEF,
			data: params
		});

		this.app.require([ 'router' ], this._init.bind(this));
	}

	_init(module) {
		this.module = module;
		this.module.layout = this;

		this.component = new LayoutComponent(this.app, this.module, this.model);
		this.app.setComponent(this.component);
	}

	/**
	 * Open / close the aside area
	 * @param {boolean} open true if it show open, false if it should close
	 */
	openAside(open) {
		this.model.set({ asideOpen: open });
	}

	/**
	 * Change application title
	 * @param {boolean} title the title to use
	 */
	setTitle(title) {
		this.model.set({ title: title });
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

	/**
	 * Expand / collapse the nav area
	 * @param {boolean} expanded true if it should be expanded, false if it should be collapsed
	 */
	expandMenu(expanded) {
		this.model.set({ menuExpanded: expanded });
	}

	dispose() {
		this.app.unsetComponent(this.component);
		this.component = null;
	}
}

export default Layout;
import TestComponent from './TestComponent';

import l10n from 'modapp-l10n';

const routeId = "test";

/**
 * Test module
 * @module module/Test
 */
class Test {

	constructor(app, params) {
		this.app = app;

		this._setState = this._setState.bind(this);

		this.app.require([ 'router' ], this._init.bind(this));
	}

	_init(module) {
		this.module = module;

		this.module.router.addRoute({
			id: routeId,
			name: l10n.t('module.test', `Test`),
			parentId: null,
			order: 30,
			setState: this._setState,
			component: new TestComponent(this.app, this.module),
			getUrl: (params) => {
				return;
			},
			parseUrl: (data) => {
				return {};
			}
		});
	}

	_setState(params) {}

	dispose() {
		this.module.router.removeRoute(routeId);
	}
}

export default Test;
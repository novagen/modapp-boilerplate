import ExampleComponent from './ExampleComponent';
import AsideComponent from './AsideComponent';

import l10n from 'modapp-l10n';

const routeId = "example";

/**
 * Example module
 * @module module/Example
 */
class Example {

	constructor(app, params) {
		this.app = app;

		this._setState = this._setState.bind(this);
		this.app.require([ 'router' ], this._init.bind(this));
	}

	_init(module) {
		this.module = module;

		this.module.router.addRoute({
			id: routeId,
			name: l10n.t('module.example', `Example`),
			parentId: null,
			order: 20,
			setState: this._setState,
			component: {
				'main': new ExampleComponent(),
				'aside': new AsideComponent()
			},
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

export default Example;
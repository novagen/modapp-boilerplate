import StartComponent from './StartComponent';
import l10n from 'modapp-l10n';

const routeId = "start";

/**
 * Start module
 * @module module/Start
 */
class Start {

	constructor(app, params) {
		this.app = app;

		this._setState = this._setState.bind(this);

		this.app.require([ 'router' ], this._init.bind(this));
	}

	_init(module) {
		this.module = module;

		this.module.router.addRoute({
			id: routeId,
			name: l10n.t('module.start', `Start`),
			parentId: null,
			order: 10,
			setState: this._setState,
			component: new StartComponent(this.app, this.module),
			getUrl: (params) => {
				return;
			},
			parseUrl: (data) => {
				return {};
			}
		});

		this.module.router.setDefault(routeId);
	}

	_setState(params) {}

	dispose() {
		this.module.router.removeRoute(routeId);
	}
}

export default Start;
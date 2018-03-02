import Elem from 'modapp-base-component/Elem';
import Txt from 'modapp-base-component/Txt';
import Button from 'modapp-base-component/Button';
import l10n from 'modapp-l10n';

/**
 * Initial header component
 * @module component/HeaderComponent
 */
class HeaderComponent {

	constructor(layout) {
		this.layout = layout;

		this._toggleMenu = this._toggleMenu.bind(this);
		this._layoutChanged = this._layoutChanged.bind(this);
	}

	render(el) {
		this.node = new Elem(n =>
			n.elem('div', { className: 'header-container' }, [
				n.component(new Txt(l10n.t('application.name', `AppName`), { className: 'header-title', events: {
					click: () => {
						let defaultRoute = this.layout.module.router.getDefaultRoute();

						if (defaultRoute) {
							this.layout.module.router.setRoute(defaultRoute.routeId, defaultRoute.params);
						}
					} }
				})),
				n.component('expand', new Button('', this._toggleMenu, { className: 'menu-toggle' }))
			])
		);

		this.layout.model.on('change', this._layoutChanged);
		return this.node.render(el);
	}

	_toggleMenu() {
		this.layout.openMenu(!this.layout.model.menuOpen);
	}

	_layoutChanged(changed) {
		if (changed.hasOwnProperty('menuOpen')) {
			if (this.node) {
				const button = this.node.getNode("expand");

				if (!button) {
					return;
				}

				if (this.layout.model.menuOpen) {
					button.addClass("open");
				} else {
					button.removeClass("open");
				}
			}
		}
	}

	unrender() {
		this.layout.model.off('change', this._openNav);

		this.node.unrender();
		this.node = null;
	}
}

export default HeaderComponent;
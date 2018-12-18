import { Elem } from 'modapp-base-component';
import { ModelButton, ModelTxt } from 'modapp-resource-component';

/**
 * Initial header component
 * @module component/HeaderComponent
 */
class HeaderComponent {

	constructor(layout, model) {
		this.layout = layout;
		this.model = model;

		this._toggleMenu = this._toggleMenu.bind(this);
		this._layoutChanged = this._layoutChanged.bind(this);
	}

	render(el) {
		this.node = new Elem(n =>
			n.elem('div', { className: 'header-container' }, [
				n.component(new ModelTxt(this.model, m => m.title, { className: 'header-title', events: {
					click: () => {
						let defaultRoute = this.layout.module.router.getDefaultRoute();

						if (defaultRoute) {
							this.layout.module.router.setRoute(defaultRoute.routeId, defaultRoute.params);
						}
					} }
				})),
				n.component('expand', new ModelButton(this.model, (m, c, changed) => {
					if (!m.menuOpen) { // Hide button if menu is disabled
						c.addClass("hidden");
					} else {
						c.removeClass("hidden");
					}

					if (m.menuExpanded) { // Expand the menu for mobile devices
						c.addClass("open");
					} else {
						c.removeClass("open");
					}

				}, this._toggleMenu, { className: 'menu-toggle' }))
			])
		);

		this.layout.model.on('change', this._layoutChanged);
		return this.node.render(el);
	}

	_toggleMenu() {
		this.layout.expandMenu(!this.layout.model.menuExpanded);
	}

	_layoutChanged(changed) {
	}

	unrender() {
		this.layout.model.off('change', this._openNav);

		this.node.unrender();
		this.node = null;
	}
}

export default HeaderComponent;
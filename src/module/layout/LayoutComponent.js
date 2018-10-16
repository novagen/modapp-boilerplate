import { Elem, Transition } from 'modapp-base-component';
import { ModelTxt, CollectionList } from 'modapp-resource-component';
import { Collection, Model } from 'modapp-resource';
import MainComponent from './MainComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import AsideComponent from './AsideComponent';

class LayoutComponent {

	constructor(app, module, model) {
		this.app = app;
		this.module = module;
		this.model = model;

		this.defaultComponents = {
			header: new HeaderComponent(this.module.layout),
			footer: new FooterComponent(),
			aside: new AsideComponent()
		};

		this.navigation = new Collection({
			namespace: 'navigation',
			eventBus: this.app.eventBus,
			idAttribute: m => m.id,
			compare: (a, b) => {
				let ao = typeof(a.order) === 'number' ? a.order : -1,
					bo = typeof(b.order) === 'number' ? b.order : -1;

				if (ao === bo) {
					return a.name.localeCompare(b.name);
				}

				// Non-set sortOrder should come after all sorted values
				if (ao === -1 || bo === -1) {
					return ao === -1 ? 1 : -1;
				}

				return ao - bo;
			}
		});

		this._addNavigation = this._addNavigation.bind(this);
		this._delNavigation = this._delNavigation.bind(this);
		this._addRoute = this._addRoute.bind(this);
		this._delRoute = this._delRoute.bind(this);
		this._setRoute = this._setRoute.bind(this);

		this._setDefaultContent = this._setDefaultContent.bind(this);
		this._setMainContent = this._setMainContent.bind(this);
		this._setHeaderContent = this._setHeaderContent.bind(this);
		this._setFooterContent = this._setFooterContent.bind(this);
		this._setAsideContent = this._setAsideContent.bind(this);
		this._layoutChanged = this._layoutChanged.bind(this);
	}

	render(el) {
		this.node = new Elem(n =>
			n.elem('body', 'div', { className: 'body' + (this.model.asideOpen ? '' : ' no-aside') + (this.model.footerOpen ? '' : ' no-footer') }, [
				n.elem('header', { }, [
					n.component('header', new Transition())
				]),
				n.elem('nav', 'nav', { className: 'navigation' }, [
					n.component('menu', new CollectionList(this.navigation, m => {
						return new ModelTxt(m, (m, c) => {
							if (m.active) {
								c.addClass("active");
							} else {
								c.removeClass("active");
							}
							return m.name;
						}, {
							events: {
								click: (c, e) => {
									this.module.router.setRoute(m.id, {
										id: m.id
									});
								}
							},
							className: 'item'
						});
					}))
				]),
				n.elem('main', { className: 'content' }, [
					n.component('main', new Transition())
				]),
				n.elem('aside', { }, [
					n.component('aside', new Transition())
				]),
				n.elem('footer', { }, [
					n.component('footer', new Transition())
				])
			])
		);

		this._initNavigation();
		this._setDefaultContent();

		this.module.router.on('set', this._setRoute);
		this.module.router.on('add', this._addRoute);
		this.module.router.on('remove', this._delRoute);
		this.model.on('change', this._layoutChanged);

		this._setRoute();
		return this.node.render(el);
	}

	/**
	 * Show a component in the aside area
	 * @param {object} component The component to load in the aside area
	 */
	setAsideContent(component) {
		if (!component) {
			return;
		}

		this._setComponent("aside", component, this.defaultComponents.aside);
	}

	_layoutChanged(changed) {
		// if (changed.hasOwnProperty('menuOpen')) {
		// 	this._openMenu();
		// }

		if (changed.hasOwnProperty('asideOpen')) {
			this._openAside();
		}

		if (changed.hasOwnProperty('footerOpen')) {
			this._openFooter();
		}
	}

	_openAside() {
		if (this.node) {
			const body = this.node.getNode("body");

			if (!body) {
				return;
			}

			if (this.model.asideOpen) {
				body.classList.remove("no-aside");
			} else {
				body.classList.add("no-aside");
			}
		}
	}

	_openMenu() {
		if (this.node) {
			const body = this.node.getNode("body");

			if (!body) {
				return;
			}

			if (this.model.menuOpen) {
				body.classList.remove("no-menu");
			} else {
				body.classList.add("no-menu");
			}
		}
	}

	_openFooter() {
		if (this.node) {
			const body = this.node.getNode("body");

			if (!body) {
				return;
			}

			if (this.model.footerOpen) {
				body.classList.remove("no-footer");
			} else {
				body.classList.add("no-footer");
			}
		}
	}

	_setDefaultContent() {
		if (this.node) {
			const main = this.node.getNode("main");
			const aside = this.node.getNode("aside");
			const header = this.node.getNode("header");
			const footer = this.node.getNode("footer");

			if (main) {
				main.fade(new MainComponent());
			}

			if (aside) {
				aside.fade(this.defaultComponents.aside);
			}

			if (header) {
				header.fade(this.defaultComponents.header);
			}

			if (footer) {
				footer.fade(this.defaultComponents.footer);
			}
		}
	}

	_setRoute(route) {
		this.model.set({ menuOpen: false });

		this._setMainContent();
		this._setAsideContent();
		this._setHeaderContent();
		this._setFooterContent();

		this._highlightActive();
	}

	_addRoute(route) {
		this._addNavigation(route);
	}

	_delRoute(route) {
		this._delNavigation(route.id);
	}

	_setMainContent() {
		const current = this.module.router.getCurrent();

		if (current && current.route) {
			this._setComponent("main", current.route.component['main'], null);
		}
	}

	_setAsideContent() {
		const current = this.module.router.getCurrent();

		if (current && current.route) {
			this._setComponent("aside", current.route.component['aside'], this.defaultComponents.aside);
		}
	}

	_setHeaderContent() {
		const current = this.module.router.getCurrent();

		if (current && current.route) {
			this._setComponent("header", current.route.component['header'], this.defaultComponents.header);
		}
	}

	_setFooterContent() {
		const current = this.module.router.getCurrent();

		if (current && current.route) {
			this._setComponent("footer", current.route.component['router'], this.defaultComponents.footer);
		}
	}

	_setComponent(nodeId, component, defaultComponent) {
		if (this.node) {
			const nodeItem = this.node.getNode(nodeId);

			if (!nodeItem) {
				return;
			}

			if (component) {
				nodeItem.fade(component);
			} else if (defaultComponent) {
				nodeItem.fade(defaultComponent);
			}
		}
	}

	_highlightActive() {
		if (this.node) {
			const current = this.module.router.getCurrent();
			const menu = this.node.getNode("menu");

			if (current && menu) {
				for (let i of menu.collection) {
					i.set({ active: i.id === current.route.id });
				}
			}
		}
	}

	_initNavigation() {
		let routes = this.module.router.getRoutes();

		if (routes) {
			for (let key in routes) {
				console.log(key);
				this._addNavigation(routes[key]);
			}
		}
	}

	_addNavigation(item) {
		let navItem = new Model({
			namespace: 'navigation',
			eventBus: this.app.eventBus,
			data: item
		});

		this.navigation.add(navItem);
		this._highlightActive();
	}

	_delNavigation(id) {
		this.navigation.remove(id);

		let currentRoute = this.module.router.getCurrent();
		let defaultRoute = this.module.router.getDefaultRoute();

		if (defaultRoute && currentRoute && currentRoute.route.id === id) {
			if (defaultRoute) {
				this.module.router.setRoute(defaultRoute.routeId, defaultRoute.params);
			}
		}
	}

	unrender() {
		this.module.router.off('set', this._setRoute);
		this.module.router.off('add', this.addRoute);
		this.module.router.off('remove', this.delRoute);
		this.model.off('change', this._layoutChanged);

		this.node.unrender();
		this.node = null;
	}
}

export default LayoutComponent;

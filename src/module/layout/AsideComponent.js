import { Elem } from 'modapp-base-component';

/**
 * Initial aside component
 * @module component/AsideComponent
 */
class AsideComponent {

	constructor() {
	}

	render(el) {
		this.node = new Elem(n =>
			n.component(null)
		);

		return this.node.render(el);
	}

	unrender() {
		this.node.unrender();
		this.node = null;
	}
}

export default AsideComponent;
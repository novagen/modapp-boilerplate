import Elem from 'modapp-base-component/Elem';

/**
 * Initial main component
 * @module component/MainComponent
 */
class MainComponent {

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

export default MainComponent;
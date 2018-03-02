import Elem from 'modapp-base-component/Elem';
import Txt from 'modapp-base-component/Txt';

/**
 * Example aside component
 * @module component/AsideComponent
 */
class AsideComponent {

	constructor() {
	}

	render(el) {
		this.node = new Elem(n =>
			n.component(new Txt('example aside'))
		);

		return this.node.render(el);
	}

	unrender() {
		this.node.unrender();
		this.node = null;
	}
}

export default AsideComponent;
import { Elem, Txt } from 'modapp-base-component';

/**
 * Initial footer component
 * @module component/FooterComponent
 */
class FooterComponent {

	constructor() {
	}

	render(el) {
		this.node = new Elem(n =>
			n.component(new Txt('AppName'))
		);

		return this.node.render(el);
	}

	unrender() {
		this.node.unrender();
		this.node = null;
	}
}

export default FooterComponent;
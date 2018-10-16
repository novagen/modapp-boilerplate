import { Elem, Txt } from 'modapp-base-component';

class ExampleComponent {
	constructor() {
	}

	render(el) {
		this.node = new Elem(n =>
			n.component(new Txt('example'))
		);

		return this.node.render(el);
	}

	unrender() {
		this.node.unrender();
		this.node = null;
	}
}

export default ExampleComponent;
import Elem from 'modapp-base-component/Elem';
import Txt from 'modapp-base-component/Txt';

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
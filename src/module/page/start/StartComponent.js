import Elem from 'modapp-base-component/Elem';
import Txt from 'modapp-base-component/Txt';

class StartComponent {
	constructor(app, module) {
		this.app = app;
		this.module = module;
	}

	render(el) {
		this.node = new Elem(n =>
			n.component(new Txt('start'))
		);

		return this.node.render(el);
	}

	unrender() {
		this.node.unrender();
		this.node = null;
	}
}

export default StartComponent;
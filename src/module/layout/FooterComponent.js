import { Elem } from 'modapp-base-component';
import { ModelTxt } from 'modapp-resource-component';

/**
 * Initial footer component
 * @module component/FooterComponent
 */
class FooterComponent {

	constructor(model) {
		this.model = model;
	}

	render(el) {
		this.node = new Elem(n =>
			n.component(new ModelTxt(this.model, model => model.title))
		);

		return this.node.render(el);
	}

	unrender() {
		this.node.unrender();
		this.node = null;
	}
}

export default FooterComponent;
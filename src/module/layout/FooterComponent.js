import Elem from 'modapp-base-component/Elem';
import Txt from 'modapp-base-component/Txt';
import l10n from 'modapp-l10n';

/**
 * Initial footer component
 * @module component/FooterComponent
 */
class FooterComponent {

	constructor() {
	}

	render(el) {
		this.node = new Elem(n =>
			n.component(new Txt(l10n.t('application.name', `AppName`)))
		);

		return this.node.render(el);
	}

	unrender() {
		this.node.unrender();
		this.node = null;
	}
}

export default FooterComponent;
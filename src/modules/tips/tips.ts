import { View } from '../../utils/view';
import html from './tips.tpl.html';
import { ViewTemplate } from '../../utils/viewTemplate';

export class Tips {
    view: View;
    tips: any;

    constructor() {
        this.view = new ViewTemplate(html).cloneView();
    }

    attach($root: HTMLElement) {
        $root.innerHTML = '';
        $root.appendChild(this.view.root);
    }

    render() {
        ViewTemplate.applyText(this.view.root)
    }
}
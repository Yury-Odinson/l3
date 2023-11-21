import { View } from '../../utils/view';
import html from './tips.tpl.html';
import { ViewTemplate } from '../../utils/viewTemplate';

export class Tips {
    view: View;

    constructor() {
        this.view = new ViewTemplate(html).cloneView();
    }

    render() {
        console.log(this.view)
    }
}
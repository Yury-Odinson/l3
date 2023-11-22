import { View } from '../../utils/view';
import html from './tips.tpl.html';
import { ViewTemplate } from '../../utils/viewTemplate';

export class Tips {
    view: View;
    tips: string[];

    constructor() {
        this.view = new ViewTemplate(html).cloneView();
        this.tips = ["Волшебная палочка", "знания js", "вселенский разум"];
    }

    attach($root: HTMLElement) {
        $root.innerHTML = '';
        $root.appendChild(this.view.root);
        this.render();
    }

    private _createTip(tip: string) {
        const element = document.createElement("span");
        element.classList.add("tip__item");
        element.textContent = tip;
        return element;
    }


    render() {
        this.view.root.innerHTML = "";
        const test = this._createTip(this.tips[1])
        console.log(test)

        const result = `Например, ${this.tips[0]}`;
        this.view.root.innerHTML = result;
    }
}

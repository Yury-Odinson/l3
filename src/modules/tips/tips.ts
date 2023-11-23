import { View } from '../../utils/view';
import html from './tips.tpl.html';
import { ViewTemplate } from '../../utils/viewTemplate';

export class Tips {
    view: View;
    tips: string[];

    constructor() {
        this.view = new ViewTemplate(html).cloneView();
        this.tips = ["Волшебная палочка", "Чехол для всего", "вселенский разум"];

        this.tips.forEach((tip, index) => {
            const tipElement = this.view[`tip${index + 1}`];
            if (tipElement) {
                tipElement.innerHTML = tip;
                tipElement.addEventListener("click", () => {
                    this.handlerChoice(tipElement);
                });
            }
        });
    }

    private handlerChoice(elem: html) {
        return console.log(`Вы выбрали ${elem.innerText}`);
    }

    attach($root: HTMLElement) {
        $root.innerHTML = '';
        $root.appendChild(this.view.root);
        this.render();
    }

    render() { }
}

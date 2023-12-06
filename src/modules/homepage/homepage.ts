import {addElement} from '../../utils/helpers';
import {Component} from '../component';
import html from './homepage.tpl.html';

import {ProductList} from '../productList/productList';
import {userService} from '../../services/user.service';

class Homepage extends Component {
    popularProducts: ProductList;

    constructor(props: any) {
        super(props);

        this.popularProducts = new ProductList();
        this.popularProducts.attach(this.view.popular);
    }

    async render() {

        await userService.init();

        try {
            fetch('/api/getPopularProducts', {
                headers: {
                    'x-userid': window.userId,
                }
            })
                .then((res) => res.json())
                .then((products) => {
                    this.popularProducts.update(products);
                });

            const isSuccessOrder = new URLSearchParams(window.location.search).get('isSuccessOrder');
            if (isSuccessOrder != null) {
                const $notify = addElement(this.view.notifies, 'div', {className: 'notify'});
                addElement($notify, 'p', {
                    innerText:
                        'Заказ оформлен. Деньги спишутся с вашей карты, менеджер может позвонить, чтобы уточнить детали доставки'
                });
            }
        } catch (error) {
            console.log("fetch Error", error);
        }

    }
}

export const homepageComp = new Homepage(html);

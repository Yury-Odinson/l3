import {Component} from '../component';
import html from './catalog.tpl.html';

import {ProductList} from '../productList/productList';
import {userService} from "../../services/user.service";

class Catalog extends Component {
    productList: ProductList;

    constructor(props: any) {
        super(props);

        this.productList = new ProductList();
        this.productList.attach(this.view.products);
    }

    async render() {

        await userService.init();

        try {
            const productsResp = await fetch('/api/getProducts', {
                headers: {
                    'x-userid': window.userId
                }
            });

            const products = await productsResp.json();
            this.productList.update(products);
        } catch (error) {
            console.log("fetch Error", error);
        }

    }
}

export const catalogComp = new Catalog(html);

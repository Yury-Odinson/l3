import { ProductData } from "types";
import { Component } from "../component";
import html from "./favorites.tpl.html";
import { cartFavService } from '../../services/cartFav.service';
import { Product } from "../product/product";

class Favorites extends Component {
    products!: ProductData[];

    async render() {
        this.products = await cartFavService.get();
        const headerFavLink = document.querySelector(".cartFav");

        if (this.products.length < 0) {
            this.view.root.classList.add("is__empty");
            headerFavLink?.classList.add("favIsEmpty");
        } else {
            headerFavLink?.classList.remove("favIsEmpty");
        }

        this.products.forEach((product) => {
            const productComp = new Product(product);
            productComp.render();
            productComp.attach(this.view.cartFav);
        });
    }
}

export const favoritesComp = new Favorites(html)

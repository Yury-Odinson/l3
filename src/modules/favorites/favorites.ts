import { ProductData } from "types";
import { Component } from "../component";
import html from "./favorites.tpl.html";
import { cartFavService } from '../../services/cartFav.service';

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

    }
}

export const favoritesComp = new Favorites(html)

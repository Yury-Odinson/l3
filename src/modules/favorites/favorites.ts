import { ProductData } from "types";
import { Component } from "../component";
import html from "./favorites.tpl.html";

export const favorites: any = JSON.parse(localStorage.getItem("favorites") || "[]");

class Favorites extends Component {
    products!: ProductData[];

    render() {
        if (favorites.length <= 0) {
            this.view.root.classList.add("is__empty");
            return;
        }

    }
}

export const favoritesComp = new Favorites(html)

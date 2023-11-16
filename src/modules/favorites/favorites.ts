import { ProductData } from "types";
import { Component } from "../component";
import html from "./favorites.tpl.html";

export const favorites: any = JSON.parse(localStorage.getItem("favorites") || "[]");

class Favorites extends Component {
    products!: ProductData[];



}

export const favoritesComp = new Favorites(html)

import { Component } from '../component';
import { ProductList } from '../productList/productList';
import { formatPrice } from '../../utils/helpers';
import { ProductData } from 'types';
import html from './productDetail.tpl.html';
import { cartService } from '../../services/cart.service';
import { favorites } from '../favorites/favorites';
import { visibleFavLink } from '../_header';

class ProductDetail extends Component {
  more: ProductList;
  product?: ProductData;

  constructor(props: any) {
    super(props);

    this.more = new ProductList();
    this.more.attach(this.view.more);
  }

  async render() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = Number(urlParams.get('id'));

    const productResp = await fetch(`/api/getProduct?id=${productId}`);
    this.product = await productResp.json();

    if (!this.product) return;

    const { id, src, name, description, salePriceU } = this.product;

    this.view.photo.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.description.innerText = description;
    this.view.price.innerText = formatPrice(salePriceU);
    this.view.btnBuy.onclick = this._addToCart.bind(this);
    this.view.btnFav.onclick = this._isFavorite.bind(this);

    const isInCart = await cartService.isInCart(this.product);

    if (isInCart) this._setInCart();

    fetch(`/api/getProductSecretKey?id=${id}`)
      .then((res) => res.json())
      .then((secretKey) => {
        this.view.secretKey.setAttribute('content', secretKey);
      });

    fetch('/api/getPopularProducts')
      .then((res) => res.json())
      .then((products) => {
        this.more.update(products);
      });
  }

  private _addToCart() {
    if (!this.product) return;

    cartService.addProduct(this.product);
    this._setInCart();
  }

  private _isFavorite() {
    if (!this.product) return;

    const isFavorites = favorites.includes(this.product.id);
    if (!isFavorites) {
      this._addToFav();
      this.view.favIcon.setAttribute("xlink:href", "#heartActive");
    } else {
      this._remToFav();
      this.view.favIcon.setAttribute("xlink:href", "#heart");
    }
    visibleFavLink();
  }

  private _addToFav() {
    if (!this.product) return;

    favorites.push(this.product.id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  private _remToFav() {
    if (!this.product) return;

    let index = favorites.indexOf(this.product.id);
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  private _setInCart() {
    this.view.btnBuy.innerText = '✓ В корзине';
    this.view.btnBuy.disabled = true;
  }
}

export const productDetailComp = new ProductDetail(html);

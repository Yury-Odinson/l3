import localforage from 'localforage';
import { ProductData } from 'types';

const DBF = '__wb-cartFav';

class CartFavService {
  init() {
    this._updCounters();
  }

  async addFavProduct(productFav: ProductData) {
    const productsFav = await this.get();
    await this.set([...productsFav, productFav]);
  }

  async removeFavProduct(productFav: ProductData) {
    const productsFav = await this.get();
    await this.set(productsFav.filter(({ id }) => id !== productFav.id));
  }

  async clear() {
    await localforage.removeItem(DBF);
    this._updCounters();
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(DBF)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(DBF, data);
    this._updCounters();
  }

  async isInCart(productFav: ProductData) {
    const productsFav = await this.get();
    return productsFav.some(({ id }) => id === productFav.id);
  }

  private async _updCounters() {
    const productsFav = await this.get();
    const count = productsFav.length >= 10 ? '9+' : productsFav.length;

    //@ts-ignore
    document.querySelectorAll('.js__cartFav-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
  }
}

export const cartFavService = new CartFavService();

import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './productList.tpl.html';
import { ProductData } from 'types';
import { Product } from '../product/product';
import { eventService } from '../../services/event.service';

export class ProductList {
  view: View;
  products: ProductData[];

  constructor() {
    this.products = [];
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(products: ProductData[]) {
    this.products = products;
    this.render();

    const observer: any = new IntersectionObserver((elements => {
      elements.forEach(element => {
        if (element.isIntersecting) {
          const href: any = element.target.getAttribute("href");
          const productId = parseInt(href.match(/\d+/));

          products.some((obj) => {
            if (obj.id === productId) {
              fetch(`/api/getProductSecretKey?id=${productId}`)
                .then((res) => res.json())
                .then((secretKey) => eventService.sendEvent("viewCard", { obj, secretKey }))
            }
          });
        }
      });
    }), { threshold: 1.0 });

    const productsDOM = document.querySelectorAll(".product");
    productsDOM.forEach(async elem => {
      observer.observe(elem);
    })
  }

  render() {
    this.view.root.innerHTML = '';

    this.products.forEach((product) => {
      const productComp = new Product(product);
      productComp.render();
      productComp.attach(this.view.root);
    });
  }
}

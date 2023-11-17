import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { cartFavService } from "./services/cartFav.service";
import { userService } from "./services/user.service";

new Router();
cartService.init();
cartFavService.init();
userService.init();

setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);

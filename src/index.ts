import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { eventService } from "./services/event.service";
import { userService } from "./services/user.service";

new Router();
cartService.init();
userService.init();

setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);

const pageURL = window.location.href;
eventService.sendEvent("route", { url: pageURL });

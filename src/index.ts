import localforage from "localforage";
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

export async function setFavCounter(key: string): Promise<any | null> {

  const headerFavCounter = document.querySelector(".cartFav");
  const data: object[] | any = await localforage.getItem(key);

  if (data?.length >= 1) {
    headerFavCounter?.classList.remove("favIsEmpty");
  } else {
    headerFavCounter?.classList.add("favIsEmpty");
  }
}

setFavCounter("__wb-cartFav");

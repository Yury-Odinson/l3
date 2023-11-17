import { favorites } from "./favorites/favorites";

export const visibleFavLink = () => {
    const favLink = document.querySelector(".cartFav");
    if (favorites.length <= 0) {
        favLink?.classList.add("favIsEmpty");
    } else {
        favLink?.classList.remove("favIsEmpty");
    }
}

visibleFavLink();

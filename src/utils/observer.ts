import { eventService } from "../services/event.service";

export const observer: any = new IntersectionObserver((elements => {
    elements.forEach(element => {
        if (element.isIntersecting) {
            eventService.sendEvent("viewCard", element);
            // console.log(element.target);
        }
    })
}), { threshold: 1.0 });

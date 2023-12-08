class EventService {
    async sendEvent(type: string, payload: object) {

        const timestamp = new Date().toString();
        const event = {
            type,
            payload,
            timestamp
        };

        const response = await fetch("/api/sendEvent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })

        try {
            if (response.status === 200) {
                const result = await response.json();
                console.log(result);
            } else console.log("sh*t happens, status: ", response.status);
        } catch (error) {
            console.log("oops... ", error);
        }
    }

}

export const eventService = new EventService();

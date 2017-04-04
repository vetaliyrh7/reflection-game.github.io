import {HttpClient} from 'aurelia-http-client';

let httpClient = new HttpClient();

export class ItemsContainer {
    constructor() {
        this.cardsData = [];
        this.sendRequest();
        this.noData = true;
    }

    sendRequest() {
        httpClient.get('./src/json-db/items.json')
            .then(data => {
                this.cardsData = JSON.parse(data.response);
                if(this.cardsData.length > 0) {
                    this.noData = false
                }
            });
    }
}

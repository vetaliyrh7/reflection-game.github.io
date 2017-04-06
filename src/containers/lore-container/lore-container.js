import {HttpClient} from 'aurelia-http-client';
import _ from "lodash";

let httpClient = new HttpClient();

export class LoreContainer {
    constructor() {
        this.cardsData = [];
        this.sendRequest();
        this.noData = true;
    }

    sendRequest() {
        httpClient.get('/api/posts?type=lore')
            .then(data => {
                this.cardsData = JSON.parse(data.response);
                if(this.cardsData.length > 0) {
                    this.noData = false
                }
            });
    }
}

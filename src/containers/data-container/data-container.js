import {HttpClient} from 'aurelia-http-client';
import { inject } from 'aurelia-dependency-injection'; //or framework
import {activationStrategy} from 'aurelia-router';
import { Router } from 'aurelia-router';

let httpClient = new HttpClient();

@inject(Router)
export class DataContainer {
  constructor(router) {
    this.router = router;
    this.cardsData = [];
    this.noData = true;
    this.contentType = null;
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  activate(params, routeconfig) {
    this.contentType = routeconfig.contentType;
    this.sendRequest(routeconfig.contentType);
  }

  sendRequest(params) {
    httpClient.get(`/api/posts?type=${params}`)
      .then(data => {
        this.cardsData = JSON.parse(data.response);
        if (this.cardsData.length > 0) {
          this.noData = false
        }
      });
  }
}

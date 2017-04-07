import {HttpClient} from 'aurelia-http-client';

let httpClient = new HttpClient();

export class CharactersContainer {
  constructor() {
    this.cardsData = [];
    this.sendRequest();
    this.noData = true;
    this.showAddContent = false;
    this.title = "";
    this.content = "";
    this.typeLabel = "";
  }

  toggleShowAddContent() {
    this.showAddContent = !this.showAddContent;
  }

  addInfo() {
    const postData = {
      title: this.title,
      content: this.content,
      typeLabel: this.typeLabel,
      type: "characters"
    };
    httpClient.post('/api/posts', postData)
      .then(data => {
        this.title = "";
        this.content = "";
        this.typeLabel = "";
        this.cardsData.push(JSON.parse(data.response))
      });
  }

  sendRequest() {
    httpClient.get('/api/posts?type=characters')
      .then(data => {
        this.cardsData = JSON.parse(data.response);
        if (this.cardsData.length > 0) {
          this.noData = false
        }
      });
  }
}

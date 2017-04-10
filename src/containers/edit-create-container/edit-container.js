import {HttpClient} from 'aurelia-http-client';
import { inject } from 'aurelia-dependency-injection'; //or framework
import { Router } from 'aurelia-router';

// Core - these two are required :-)
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'

// Plugins
import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/image/plugin';
import 'tinymce/plugins/code/plugin';
import 'tinymce/plugins/table/plugin';
import 'tinymce/plugins/autoresize/plugin';

let httpClient = new HttpClient();

@inject(Router)
export class EditContainer {
  constructor(router) {
    this.router = router;
    this.header = "Создание новой публикации";
    this.postId = null;
    this.title = "";
    this.typeLabel = "";
    this.params = null;
    this.uniqueId = this.generateUUID();
    this.isEdit = false;
  }

  activate(params, routeconfig) {
    this.type = params.contentType;
    if (params && params.id) {
      this.isEdit = true;
      httpClient.get(`/api/posts/${params.id}`)
        .then(data => {
          const post = JSON.parse(data.response);
          this.postId = post.id;
          this.title = post.title;
          this.typeLabel = post.typeLabel;
          this.type = post.type;
          this.header = `Редактирование публикации: ${post.title}`;
          tinymce.activeEditor.setContent(post.content);
        });
    }
  }

  attached() {
    tinymce.init({
      selector: `#${this.uniqueId}`,
      skin: false,
      plugins: 'paste autoresize table link image code'
    })
  }

  addInfo() {
    const postData = {
      title: this.title,
      content: tinymce.activeEditor.getContent(),
      typeLabel: this.typeLabel,
      type: this.type
    };

    if (this.title !== '' && tinymce.activeEditor.getContent() !== '' && this.typeLabel) {
      httpClient.post('/api/posts/', postData)
        .then(() => {
          this.title = "";
          this.content = "";
          this.typeLabel = "";
          tinymce.activeEditor.setContent('');
          this.router.navigate(this.type);
        });
    } else {
      alert("Не все поля заполнены!!");
    }
  }

  updateInfo() {
    const postData = {
      title: this.title,
      content: tinymce.activeEditor.getContent(),
      typeLabel: this.typeLabel
    };
    if (this.title !== '' && tinymce.activeEditor.getContent() !== '' && this.typeLabel) {
      httpClient.put(`/api/posts/${this.postId}`, postData)
        .then(() => {
          this.title = "";
          this.content = "";
          this.typeLabel = "";
          tinymce.activeEditor.setContent('');
          this.router.navigate(this.type);
        });
    } else {
      alert("Не все поля заполнены!!");
    }
  }

  removePost() {
    httpClient.delete(`/api/posts/${this.postId}`);
    this.router.navigate(this.type);
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

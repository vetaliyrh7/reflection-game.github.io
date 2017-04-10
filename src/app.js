// TODO: Убрать самокопирование компонентов. В проекте много дубликатов

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Reflection';
    config.options.pushState = true;
    config.map([
      { route: ['/', 'lore'],
        name: 'lore',
        contentType: 'lore',
        moduleId: './containers/data-container/data-container',
        nav: true,
        title: "Лор"},
      { route: ['/characters', 'characters'],
        name: 'characters',
        contentType: 'characters',
        moduleId: './containers/data-container/data-container',
        nav: true,
        title: "Персонажи"},
      {
        route: ['/items', 'items'],
        name: 'items',
        contentType: 'items',
        moduleId: './containers/data-container/data-container',
        nav: true,
        title: "Предметы"},
      {
        route: '/create/:contentType',
        name: 'create',
        moduleId: './containers/edit-create-container/edit-container',
        title: "Создать публикацию"},
      {
        route: '/edit/:id',
        name: 'edit',
        moduleId: './containers/edit-create-container/edit-container',
        title: "Редактирование публикации"}
    ]);
  }
}

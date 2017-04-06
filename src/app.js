export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Reflection';
    config.options.pushState = true;
    config.map([
      { route: ['/', 'lore'],
        name: 'lore',
        moduleId: './containers/lore-container/lore-container',
        nav: true,
        title: "Лор"},
      { route: ['/characters', 'characters'],
        name: 'characters',
        moduleId: './containers/characters-container/characters-container',
        nav: true,
        title: "Персонажи"},
      {
        route: ['/items', 'items'],
        name: 'items',
        moduleId: './containers/items-container/items-container',
        nav: true,
        title: "Предметы"}
    ]);
  }
}

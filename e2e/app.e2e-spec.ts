import { SalesAdminAppPage } from './app.po';

describe('sales-admin-app App', () => {
  let page: SalesAdminAppPage;

  beforeEach(() => {
    page = new SalesAdminAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

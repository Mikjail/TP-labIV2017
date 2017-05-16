import { MyCliAppPage } from './app.po';

describe('my-cli-app App', () => {
  let page: MyCliAppPage;

  beforeEach(() => {
    page = new MyCliAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

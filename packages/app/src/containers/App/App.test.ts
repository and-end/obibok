import { App } from './';

describe('App', () => {
  const el = document.createElement('div');

  new App({
    target: el,
    props: {
      name: 'obibok'
    }
  });

  it('renders welcome text', () => {
    expect(el.textContent).toBe('Hello obibok!');
  });
});

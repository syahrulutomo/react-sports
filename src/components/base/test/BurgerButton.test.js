import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { BurgerButton } from '../BurgerButton';

const renderer = new ShallowRenderer();

describe('<BurgerButton />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<BurgerButton />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});

import React from 'react';
import {cleanup} from '@testing-library/react';
import { LayoutDefault } from '../index'
import ShallowRenderer from 'react-test-renderer/shallow';

afterEach(cleanup)

const children = (
  <div></div>
)

it('renders correctly Layout Default component', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<LayoutDefault children={children}/>);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
import React from 'react';
import {cleanup} from '@testing-library/react';
import { Section } from '../Section'
import ShallowRenderer from 'react-test-renderer/shallow';

afterEach(cleanup)

const children = (
  <div></div>
)

it('renders correctly Section component', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Section children={children}/>);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
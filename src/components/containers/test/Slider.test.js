import React from 'react';
import {cleanup} from '@testing-library/react';
import { Slider } from '../Slider'
import ShallowRenderer from 'react-test-renderer/shallow';

afterEach(cleanup)

const data = [
  { a: 1}, { b: 1}, { c: 1}, { d: 1},
];

it('renders correctly Slider component', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Slider data={data} />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
import React from 'react';
import {cleanup} from '@testing-library/react';
import { ThumbnailLoader } from '../ThumbnailLoader'
import ShallowRenderer from 'react-test-renderer/shallow';

afterEach(cleanup)

it('renders correctly ThumbnailLoader component', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ThumbnailLoader />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
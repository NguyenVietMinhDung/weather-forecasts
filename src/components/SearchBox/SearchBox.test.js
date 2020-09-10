import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import locations from '../../locations';
import SearchBox from './SearchBox';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with label', () => {
  act(() => {
    render(
      <SearchBox
        defaultValue={locations[0]}
        options={locations}
        onChange={jest.fn()}
        inputId="location"
      />,
      container,
    );
  });

  expect(container.querySelector('label').innerHTML).toBe('location');
});

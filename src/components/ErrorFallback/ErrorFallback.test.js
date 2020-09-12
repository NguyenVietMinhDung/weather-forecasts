import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import ErrorFallback from './ErrorFallback';

it('renders with text', async () => {
  let component;

  await act(async () => {
    component = mount(<ErrorFallback />);
  });

  expect(component.find('h1').text()).toBe('Oops! Something Went Wrong. Please try again.');
});

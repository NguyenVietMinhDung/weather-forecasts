import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import locations from '../../constants/locations';
import SearchBox from './SearchBox';

it('should render correctly', async () => {
  let component;

  await act(async () => {
    component = mount(
      <SearchBox
        defaultValue={locations[0]}
        options={locations}
        onChange={jest.fn()}
        inputId="location"
      />,
    );
  });

  expect(component.find('Select')).toHaveLength(1);
});

import React from 'react';
import { mount } from 'enzyme';
import { unmountComponentAtNode } from 'react-dom';
import { render, act } from '@testing-library/react';
import selectEvent from 'react-select-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from '../../api';
import App from './App';

const SAMPLE_REPLY_DATA_1 = [
  {
    distance: 1836,
    title: 'London',
    location_type: 'City',
    woeid: 2488853,
    latt_long: '37.123, -122.456',
  },
  {
    distance: 2000,
    title: 'Ho Chi Minh City',
    location_type: 'City',
    woeid: 2487956,
    latt_long: '11.123, -25.456',
  },
];

const SAMPLE_REPLY_DATA_2 = [
  {
    title: 'London',
    location_type: 'City',
    woeid: 2488853,
    latt_long: '37.123, -122.456',
  },
  {
    title: 'Ho Chi Minh City',
    location_type: 'City',
    woeid: 2487956,
    latt_long: '11.123, -25.456',
  },
];

const SAMPLE_REPLY_DATA_3 = [
  {
    consolidated_weather: [
      {
        id: 5068185964380160,
        weather_state_name: 'Heavy Cloud',
        weather_state_abbr: 'hc',
        applicable_date: '2020-09-11',
        min_temp: 10.86,
        max_temp: 20.825,
      },
    ],
  },
  {
    consolidated_weather: [
      {
        id: 506818591212232,
        weather_state_name: 'Heavy Cloud',
        weather_state_abbr: 'hc',
        applicable_date: '2020-09-11',
        min_temp: 12.86,
        max_temp: 28.825,
      },
    ],
  },
];

jest.mock('react-geolocated', () => ({
  geolocated: () => jest.fn((component) => component),
}));

let container = null;

const mock = new MockAdapter(axios);

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with coordinates', async () => {
  mock
    .onGet(api.getLocationsByCoords(37.123, -122.456))
    .reply(200, [SAMPLE_REPLY_DATA_1[0]]);

  mock
    .onGet(api.getLocationsByQuery('London'))
    .reply(200, [SAMPLE_REPLY_DATA_2[0]]);

  mock
    .onGet(api.getLocationInfo('2488853'))
    .reply(200, SAMPLE_REPLY_DATA_3[0]);

  await act(async () => {
    mount(<App coords={{ latitude: 37.123, longitude: -122.456 }} />);
  });
});

it('renders with default location', async () => {
  mock
    .onGet(api.getLocationsByQuery('Ho Chi Minh City'))
    .reply(200, [SAMPLE_REPLY_DATA_2[1]]);

  mock
    .onGet(api.getLocationInfo('2487956'))
    .reply(200, SAMPLE_REPLY_DATA_3[1]);

  await act(async () => {
    mount(<App />);
  });
});

it('search by coordinates unsuccessfully', async () => {
  mock.onGet(api.getLocationsByCoords(37.123, -122.456))
    .reply(404);

  await act(async () => {
    mount(<App coords={{ latitude: 37.123, longitude: -122.456 }} />);
  });
});

it('search by queries without coordinates unsuccessfully', async () => {
  mock.onGet(api.getLocationsByQuery('London'))
    .reply(404);

  await act(async () => {
    mount(<App />);
  });
});

it('search by queries with coordinates unsuccessfully', async () => {
  mock
    .onGet(api.getLocationsByCoords(37.123, -122.456))
    .reply(200, [SAMPLE_REPLY_DATA_2[0]]);

  mock.onGet(api.getLocationsByQuery('London'))
    .reply(404);

  await act(async () => {
    mount(<App coords={{ latitude: 37.123, longitude: -122.456 }} />);
  });
});

it('search by woeid without coordinates unsuccessfully', async () => {
  mock.onGet(api.getLocationsByQuery('Ho Chi Minh City'))
    .reply(200, [SAMPLE_REPLY_DATA_2[0]]);

  mock.onGet(api.getLocationInfo('2487956'))
    .reply(404);

  await act(async () => {
    mount(<App />);
  });
});

it('search by woeid with coordinates unsuccessfully', async () => {
  mock
    .onGet(api.getLocationsByCoords(37.123, -122.456))
    .reply(200, [SAMPLE_REPLY_DATA_2[0]]);

  mock.onGet(api.getLocationsByQuery('London'))
    .reply(200, [SAMPLE_REPLY_DATA_2[0]]);

  mock.onGet(api.getLocationInfo('2488853'))
    .reply(404);

  await act(async () => {
    mount(<App />);
  });
});

it('triggers select box', async () => {
  mock
    .onGet(api.getLocationsByQuery('Ho Chi Minh City'))
    .reply(200, [SAMPLE_REPLY_DATA_2[1]]);

  mock
    .onGet(api.getLocationInfo('2487956'))
    .reply(200, SAMPLE_REPLY_DATA_3[1]);

  mock
    .onGet(api.getLocationsByQuery('London'))
    .reply(200, [SAMPLE_REPLY_DATA_2[0]]);

  mock
    .onGet(api.getLocationInfo('2488853'))
    .reply(200, SAMPLE_REPLY_DATA_3[0]);

  await act(async () => {
    const component = render(<App />, container);
    const { getByLabelText, getByTestId } = component;
    await selectEvent.select(getByLabelText('location'), 'London');
    expect(getByTestId('form')).toHaveFormValues({ location: 'London' });
  });
});

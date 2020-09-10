import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, act } from '@testing-library/react';
import selectEvent from 'react-select-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from '../../api';
import App from './App';

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
  jest.clearAllMocks();
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with current location', async () => {
  mock
    .onGet(api.getLocationsByCoords(37.123, -122.456))
    .reply(200, [
      {
        distance: 1836,
        title: 'London',
        location_type: 'City',
        woeid: 2488853,
        latt_long: '37.123, -122.456',
      },
    ]);

  mock
    .onGet(api.getLocationsByQuery('London'))
    .reply(200, [
      {
        title: 'London',
        location_type: 'City',
        woeid: 2487956,
        latt_long: '37.123, -122.456',
      },
    ]);

  mock
    .onGet(api.getLocationInfo('2487956'))
    .reply(200, {
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
    });

  await act(async () => {
    render(
      <App coords={{ latitude: 37.123, longitude: -122.456 }} />, container,
    );
  });
});

it('renders without current location', async () => {
  mock
    .onGet(api.getLocationsByQuery('Ho Chi Minh City'))
    .reply(200, [
      {
        title: 'Ho Chi Minh City',
        location_type: 'City',
        woeid: 2487956,
        latt_long: '37.123, -122.456',
      },
    ]);

  mock
    .onGet(api.getLocationInfo('2487956'))
    .reply(200, {
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
    });

  await act(async () => {
    render(<App />, container);
  });
});

it('triggers select box', async () => {
  mock
    .onGet(api.getLocationsByQuery('Ho Chi Minh City'))
    .reply(200, [
      {
        title: 'Ho Chi Minh City',
        location_type: 'City',
        woeid: 2487959,
        latt_long: '37.123, -122.456',
      },
    ]);

  mock
    .onGet(api.getLocationInfo('2487959'))
    .reply(200, {
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
    });

  mock
    .onGet(api.getLocationsByQuery('London'))
    .reply(200, [
      {
        title: 'London',
        location_type: 'City',
        woeid: 2487956,
        latt_long: '37.123, -122.456',
      },
    ]);

  mock
    .onGet(api.getLocationInfo('2487956'))
    .reply(200, {
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
    });

  await act(async () => {
    const component = render(<App />, container);
    const { getByLabelText, getByTestId } = component;
    await selectEvent.select(getByLabelText('location'), 'London');
    expect(getByTestId('form')).toHaveFormValues({ location: 'London' });
  });
});

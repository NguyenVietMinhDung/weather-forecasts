const API = [
  {
    findByQueryRequest: {
      title: 'Ho Chi Minh City',
    },
    findByQueryResponse: [
      {
        title: 'Ho Chi Minh City',
        location_type: 'City',
        woeid: 2488853,
        latt_long: '37.123, -122.456',
      },
    ],
    findByWoeidResponse: {
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
  },
  {
    findByQueryRequest: {
      title: 'London',
    },
    findByQueryResponse: [
      {
        title: 'London',
        location_type: 'City',
        woeid: 2412344,
        latt_long: '37.123, -122.456',
      },
    ],
    findByWoeidResponse: {
      consolidated_weather: [
        {
          id: 5068185964385346,
          weather_state_name: 'Heavy Cloud',
          weather_state_abbr: 'hc',
          applicable_date: '2020-09-11',
          min_temp: 10.86,
          max_temp: 20.825,
        },
      ],
    },
  },
];

export default {
  API,
};

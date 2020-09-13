/* istanbul ignore file */
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com';

const BASE_URL = 'https://www.metaweather.com';

export default {
  getLocationsByQuery: (query) => `${CORS_PROXY}/${BASE_URL}/api/location/search?query=${query}`,
  getLocationsByCoords: (latt, long) => `${CORS_PROXY}/${BASE_URL}/api/location/search/?lattlong=${latt},${long}`,
  getLocationByWoeid: (woeid) => `${CORS_PROXY}/${BASE_URL}/api/location/${woeid}`,
  getIcon: (type, abbr) => `${BASE_URL}/static/img/weather/${abbr}.${type}`,
};

import moment from 'moment';

const DATE_FORMAT = 'ddd DD MMM';

export default (date) => moment(date).format(DATE_FORMAT);

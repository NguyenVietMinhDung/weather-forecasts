import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PuffLoader from 'react-spinners/PuffLoader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Figure from 'react-bootstrap/Figure';
import styles from './WeatherForecasts.module.css';
import dateFormat from '../../utils/dateFormat';

const ICON_TYPE = 'svg';

const WeatherForecasts = (props) => {
  const { isLoading, forecasts, getIcon } = props;
  return (
    <>
      <div className={styles.loader}>
        <PuffLoader
          size={50}
          color="mediumseagreen"
          loading={isLoading}
        />
      </div>
      {!isLoading && (
        <Row>
          <Col>
            <CardDeck>
              {forecasts.map((forecast) => (
                <Card key={forecast.id}>
                  <Card.Body>
                    <Card.Title className={styles.title}>
                      {dateFormat(forecast.applicable_date)}
                    </Card.Title>
                    <Figure>
                      <Figure.Image
                        className={styles.icon}
                        src={getIcon(ICON_TYPE, forecast.weather_state_abbr)}
                        alt=""
                      />
                      <Figure.Caption>
                        {forecast.weather_state_name}
                      </Figure.Caption>
                    </Figure>
                    <Card.Text>
                      Max: {Math.round(forecast.max_temp)}&#176;C
                      <br />
                      Min: {Math.round(forecast.min_temp)}&#176;C
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </CardDeck>
          </Col>
        </Row>
      )}
    </>
  );
};

export default memo(WeatherForecasts);

WeatherForecasts.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  forecasts: PropTypes.arrayOf(PropTypes.object).isRequired,
  getIcon: PropTypes.func.isRequired,
};

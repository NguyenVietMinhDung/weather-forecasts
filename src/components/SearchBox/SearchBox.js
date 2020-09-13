import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './SearchBox.module.css';

const SearchBox = (props) => {
  const {
    defaultValue, options, onChange, inputId,
  } = props;
  return (
    <Row className={styles.wrapper}>
      <Col sm={6} md={4} lg={3}>
        <Select
          name={inputId}
          inputId={inputId}
          defaultValue={defaultValue}
          options={options}
          isClearable
          placeholder="Search..."
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

export default memo(SearchBox);

SearchBox.propTypes = {
  defaultValue: PropTypes.shape({}).isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  inputId: PropTypes.string.isRequired,
};

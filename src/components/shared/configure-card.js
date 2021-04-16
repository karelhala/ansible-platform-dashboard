import React from 'react';
import PropTypes from 'prop-types';
import '../../App.scss';
import {
  Card,
  CardBody,
  CardTitle
} from '@patternfly/react-core';

const ConfigureCard = ({ title, description, renderButtons }) => {
  return (
    <Card className='config_card'>
      <CardTitle className="pf-u-py-sm">
        { title }
      </CardTitle>
      <CardBody>
        { description }
        { renderButtons() }
      </CardBody>
    </Card>
  );
};

ConfigureCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  renderButtons: PropTypes.func
};

export default ConfigureCard;

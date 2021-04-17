import React from 'react';
import PropTypes from 'prop-types';
import '../../App.scss';
import {
  Bullseye,
  Card,
  CardBody, CardFooter,
  CardTitle,
  Flex,
  FlexItem,
  Title
} from '@patternfly/react-core';
import Truncate from 'react-truncate';

const ConfigureCard = ({ title, description, renderButtons }) => {
  return (
    <Card className='config_card'>
      <CardTitle>
        <Title headingLevel="h3">
          { title }
        </Title>
      </CardTitle>
      <CardBody>
        <Flex direction={ { default: 'column' } }>
          <FlexItem>
            <Truncate lines={ 3 } ellipsis={ <span>... </span> }>
              { description }
            </Truncate>
          </FlexItem>
        </Flex>
      </CardBody>
      <CardFooter>
        <Bullseye>
          { renderButtons() }
        </Bullseye>
      </CardFooter>
    </Card>
  );
};

ConfigureCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  renderButtons: PropTypes.func
};

export default ConfigureCard;

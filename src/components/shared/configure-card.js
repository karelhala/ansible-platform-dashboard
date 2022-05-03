import React from 'react';
import PropTypes from 'prop-types';
import '../../App.scss';
import {
  Bullseye,
  Card,
  CardBody,
  CardTitle,
  Stack,
  StackItem,
  Title
} from '@patternfly/react-core';
import LinesEllipsis from 'react-lines-ellipsis';

const ConfigureCard = ({ title, description, renderButtons }) => {
  return (
    <Card className='ans-c-card-config' >
      <CardTitle>
        <Title headingLevel="h3">
          { title }
        </Title>
      </CardTitle>
      <CardBody className={ 'pf-u-mb-0-pb-0' }>
        <Stack>
          <StackItem isFilled>
            <LinesEllipsis maxLine={ 3 } text={ description } />
          </StackItem>
          <StackItem style={ { marginBottom: 0, paddingBottom: 0 } }>
            <Bullseye>
              { renderButtons() }
            </Bullseye>
          </StackItem>
        </Stack>
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

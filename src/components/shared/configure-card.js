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
import Truncate from 'react-truncate';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';
import { bottom } from '@patternfly/react-core/dist/js/helpers/Popper/thirdparty/popper-core';

const ConfigureCard = ({ title, description, renderButtons }) => {
  return (
    <Card className='config_card' >
      <CardTitle>
        <Title headingLevel="h3">
          { title }
        </Title>
      </CardTitle>
      <CardBody className={ 'pf-u-mb-0-pb-0' }>
        <Stack>
          <StackItem isFilled>
            <Truncate lines={ 3 } ellipsis={ <span>... </span> }>
              { description }
            </Truncate>
          </StackItem>
          <StackItem style={ { marginBottom: 0, paddingBottom: 0 } }>
            <Bullseye>
              { renderButtons() }
              <ExternalLinkAltIcon />
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

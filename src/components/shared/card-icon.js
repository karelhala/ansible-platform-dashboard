/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';

import { IconPlaceholder } from './loader-placeholders';
import StyledLazyLoadImage from './lazy-load-image';

const CardIconContainer = styled.div`
  display: inline-block;
  height: ${({ height }) => `${height}px`};
`;

const CardIcon = ({
  src,
  height = 40
}) => {
  const [ isLoaded, setLoaded ] = useState(false);
  const [ isUnknown, setUnknown ] = useState(false);

  const defaultIcon = '/apps/frontend-assets/platform-logos/ansible-automation-platform.svg';

  return (
    <CardIconContainer height={ height }>
      { !isLoaded && <IconPlaceholder height={ height } /> }
      <StyledLazyLoadImage
        threshold={ 2000 }
        delayTime={ 0 }
        hidden={ !isLoaded }
        height={ isLoaded ? height : 0 }
        onError={ () => setUnknown(true) }
        onLoad={ () => setLoaded(true) }
        src={ !src || isUnknown ? defaultIcon : src }
      />
    </CardIconContainer>
  );
};

export default CardIcon;

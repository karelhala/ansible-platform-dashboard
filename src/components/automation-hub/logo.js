import * as React from 'react';
// had to declare *.svg in src/index.d.ts
import DefaultLogo from '../../images/default-logo.svg';

export const Logo = () => {
  const { size, image, alt, className, unlockWidth } = this.props;

  const style = {
    height: size,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  if (unlockWidth) {
    style.minWidth = size;
  } else {
    style.width = size;
  }

  // use inline css so we can set size
  return (
    <div className={ className } style={ style }>
      <img
        style={ { objectFit: 'contain', maxHeight: size } }
        src={ image || DefaultLogo }
        alt={ alt }
      />
    </div>
  );
};

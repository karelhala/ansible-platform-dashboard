import * as React from 'react';
// had to declare *.svg in src/index.d.ts
import DefaultLogo from '../../../static/images/default-logo.svg';
import PropTypes from 'prop-types';

export const Logo = (props) => {
  const { size, image, alt, className } = props;

  const style = {
    height: size,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  const imgSrc = image ? image : DefaultLogo;
  // use inline css so we can set size
  return (
    <div className={ className } style={ style }>
      <img
        style={ { objectFit: 'contain', maxHeight: size } }
        src={ imgSrc }
        alt={ alt }
      />
    </div>
  );
};

Logo.propTypes = {
  size: PropTypes.string,
  image: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.any
};
export default Logo;


import * as React from 'react';
import PropTypes from 'prop-types';

export const IconPlaceholder = ({
  height = 40
}) => (
  <svg height={ height } width={ height }>
    <circle cx={ height / 2 } cy={ height / 2 } r={ height / 2 } fill="#ecebeb" />
  </svg>
);

IconPlaceholder.propTypes = {
  height: PropTypes.number
};

export const Logo = (props) => {
  const { size, image, alt, className } = props;

  const style = {
    height: size,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  // use inline css so we can set size
  return (
    <div className={ className } style={ style }>
      { image ?
        <img
          style={ { objectFit: 'contain', maxHeight: size } }
          src={ image }
          alt={ alt }
        /> :  <IconPlaceholder/> }
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


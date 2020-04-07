import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';


const Button = ({ className, text, as: Component, disabled, onSubmit }) => {
  const props = {
    className: cx(className || 'ui-button ui-button-primary', {
      'is-disabled': disabled,
    }),
  };

  if (Component === 'button') {
    props.type = 'submit';
    props.disabled = disabled;
  } else if (!disabled) {
    props.onClick = onSubmit;
  }

  return <Component {...props}>{text}</Component>;
};

Button.defaultProps = {
  as: 'button',
  disabled: false,
};

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,

  as: PropTypes.elementType,
  disabled: PropTypes.bool.isRequired,

  onSubmit: PropTypes.func.isRequired,
};

export default Button;

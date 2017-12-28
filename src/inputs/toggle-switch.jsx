import React from 'react';
import PropTypes from 'prop-types';

import '../styles/inputs.scss';
import '../styles/toggle-switch.scss';

class ToggleSwitch extends React.Component {
  componentDidMount() {
    const requiredProps = ['isActive', 'labelText', 'name', 'onClick']

    const missingRequired = requiredProps.filter(field => {
      return !this.props[field] && (this.props[field] !== false)
    })

    if (missingRequired.length) {
      console.log(`%c Missing required props in ToggleSwitch with name ${this.props.name}: ${missingRequired.toString()}`, 'color: red')
    }
  }

  render() {
    let { className, disabled, innerLabels, isActive, labelText, name, onClick, required, showLabel } = this.props;
    let attr = {};

    if (required) {
      attr['required'] = true;
      attr['aria-required'] = true;
    }

    const triggerHiddenCheckbox = (e) => {
      e.preventDefault();
      document.getElementById(name).click()
    }

    return (
      <label className={ `ToggleSwitch ${ isActive ? 'active' : '' } ${ disabled ? 'disabled' : '' }
        ${ className || '' }` } onClick={ !disabled ? triggerHiddenCheckbox : () => '' } id={ `${ name }-label` }>
        <span className={ `ToggleSwitch-label-text ${ showLabel ? '' : 'u-sr-only' }` }>
          { labelText }{ attr.required &&
            <span>{ '\u00A0' }*<span className='u-sr-only'> required field</span></span>
          }
        </span>
        <input type='checkbox' className='ToggleSwitch-input u-sr-only' checked={ isActive } id={ name } name={ name }
          aria-labelledby={ `${ name }-aria-label` } onClick={ onClick } readOnly />
        <span className='u-sr-only' id={ `${ name }-aria-label` } aria-live='polite'>
          { labelText }: { isActive ? 'on' : 'off' }.
          <span className='u-sr-only'>Press Space Bar to toggle on or off.</span>
        </span>
        <div>
          <span className='ToggleSwitch-label' data-on={ innerLabels && innerLabels.on || 'On' }
            data-off={ innerLabels && innerLabels.off || 'Off' }>
            { innerLabels && innerLabels.on && innerLabels.off &&
              <span className='ToggleSwitch-label-text' aria-hidden role='presentation'>
                { isActive ? innerLabels.on : innerLabels.off }
              </span>
            }
          </span>
          <span role='presentation' aria-hidden className={ `ToggleSwitch-handle ${ isActive ? 'active' : '' }` }></span>
        </div>
      </label>
    )
  }
}

ToggleSwitch.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  innerLabels: PropTypes.shape({
    on: PropTypes.string.isRequired,
    off: PropTypes.string.isRequired
  }),
  isActive: PropTypes.bool.isRequired,
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  required: PropTypes.bool,
  showLabel: PropTypes.bool
}

export default ToggleSwitch;

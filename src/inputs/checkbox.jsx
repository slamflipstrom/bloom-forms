import React from 'react';
import PropTypes from 'prop-types';

import '../styles/inputs.scss';
import '../styles/checkbox.scss';

class Checkbox extends React.Component {
  componentDidMount() {
    const requiredProps = ['checked', 'label', 'name']
    const recommendedProps = ['onChange']

    const missingRequired = requiredProps.filter(field => {
      return !this.props[field] && (this.props[field] !== false)
    })

    const missingRecommended = recommendedProps.filter(field => {
      return !this.props[field] && (this.props[field] !== false)
    })

    const missingOneOrOther = (this.props.formData && (Object.keys(this.props.formData).indexOf(this.props.name) === -1)) || (!(this.props.checked || (this.props.checked === false)))

    if (missingRequired.length) {
      console.log(`%c Missing required props in Checkbox with name ${this.props.name}: ${missingRequired.toString()}`, 'color: red')
    }

    if (missingOneOrOther) {
      console.log(`%c Missing either 'checked' or 'formData' in Checkbox with name ${this.props.name}`, 'color: red')
    }

    if (missingRecommended.length) {
      console.log(`%c Missing recommended props in Checkbox with name ${this.props.name}: ${missingRecommended.toString()}`, 'color: orange')
    }
  }

  render() {
    let {
      checked, className, errors, formData,
      name, label, labelClass,
      showLabel, showLabelBeforeCheckbox,
      validateAs, ...props } = this.props;
    let labelTextClasses = `Input-label-text ${ labelClass ? labelClass : '' } ${ showLabel ? '' : ' u-sr-only' }`;
    let attr = {}

    if (props.required) {
      attr['aria-required'] = true;
      attr.required = true;
    }

    let val
    if (formData && (Object.keys(formData).indexOf('name') > -1)) {
      val = formData[name]
    } else {
      val = checked
    }

    const labelText = (
      <span className={ labelTextClasses }>
        { label }{ attr.required && <span>{ '\u00A0' }*<span className='u-sr-only'> required field</span></span> }
      </span>
    )

    return (
      <label style={{paddingBottom: '2px'}} className='Input-label Input-label--inline Input--checkbox'
        id={ `${name}-label` }>
        { showLabelBeforeCheckbox && labelText }
        <div className={ `non-sr-only Input--checkbox-placeholder ${ val ? 'glyphicon glyphicon-ok is-checked' : '' }` }></div>
        <input type='checkbox' checked={ val } name={ name } id={ name } onChange={ props.onChange }
          className={ `u-sr-only Input Input--text ${ className ? className : '' } ${ errors ? 'Input--invalid' : '' }` }
          data-validate={ validateAs } { ...attr } />
        { !showLabelBeforeCheckbox && labelText }
        { errors &&
          <div className='Input-error'>{ errors }</div>
        }
      </label>
    )
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  errors: PropTypes.string,
  formData: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]).isRequired,
  labelClass: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  showLabel: PropTypes.bool,
  showLabelBeforeCheckbox: PropTypes.bool,
  validateAs: PropTypes.string
};

export default Checkbox;

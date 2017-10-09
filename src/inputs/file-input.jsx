'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import ErrorTip from '../error-tip'

import '../styles/inputs.scss'

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileText: 'Choose a File'
    }
  };

  static propTypes = {
    description: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
  };

  triggerInput = (e) => {
    let input = document.getElementById(this.props.id);
    if (e.target.getAttribute('type') === 'file') {
      return;
    }
    e.preventDefault();
    input.click();
  }

  updateText = (e) => {
    e.persist();
    let fileName = document.getElementById(this.props.id).value.split( '\\' ).pop();
    // we don't want to update prevFile, or the input will disappear and it won't be able to upload
    this.setState({
      fileText: fileName
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.props.formId, this.props.name, fileName)
      }
    });

    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }

  render = () => {
    const { error, id, label, name, required } = this.props
    let requiredString = ''
    let attr = {}

    if (required) {
      requiredString = (<span>{ '\u00A0' }*<span className="u-sr-only"> required field</span></span>)
      attr['required'] = true
      attr['aria-required'] = 'true'
    }

    return (
      <label htmlFor={ this.props.name } className="input__label input--file" onClick={ this.triggerInput }>
        <span className='input--file__label-text'>{ label }{ requiredString }</span>
        <div className='input__placeholder input__placeholder--file' role='presentation' aria-hidden>
          <div className='input--file__text'>
            { this.state.fileText }
          </div>
          <div className='btn'>
            Browse <span className="u-sr-only">local file system</span>
          </div>
        </div>
        { error && <ErrorTip contents={ error } /> }
        <input name={ name } id={ id } { ...attr } type='file' data-validate={ required ? 'not-empty' : null }
          className='input' style={ {display: 'none'} } onChange={ this.updateText }
          data-multiple-caption="{count} files selected" multiple data-validate='file' />
      </label>
    )
  }
}

export default FileInput

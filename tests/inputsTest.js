import React from 'react';
import * as assert from 'assert';
import Enzyme from 'enzyme';
import { combineReducers, createStore, dispatch } from 'redux';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Button from '../src/inputs/button.jsx';
import Checkbox from '../src/inputs/checkbox.jsx';
import CurrencyInput from '../src/inputs/currency-input.jsx';
import DateInput from '../src/inputs/date-input.jsx';
import Dropzone from '../src/inputs/dropzone.jsx';
import FileInput from '../src/inputs/file-input.jsx';
import RadioGroup from '../src/inputs/radio-group.jsx';
import RadioButtonGroup from '../src/inputs/radio-button-group.jsx';
import SelectInput from '../src/inputs/select-input.jsx';
import TextArea from '../src/inputs/text-area.jsx';
import TextInput from '../src/inputs/text-input.jsx';
import ToggleSwitch from '../src/inputs/toggle-switch.jsx';

function exampleClick() {
  return;
}

describe('<Button />', function() {
  it ('renders without breaking', function() {
    const exampleText = 'example button';
    const button = Enzyme.mount(<Button contents={ exampleText } onClick={ exampleClick } id='button-id' />);

    assert.ok((button).text().indexOf(exampleText) >= 0);
  })
})

describe('<Checkbox />', function() {
  it ('renders without breaking', function() {
    const exampleLabel = 'Example Checkbox';
    const checkbox = Enzyme.mount(<Checkbox name='checkbox' label={ exampleLabel } checked onChange={() => ''} />);

    assert.ok((checkbox).text().indexOf(exampleLabel) >= 0);
  })
})

describe('<CurrencyInput />', function() {
  it ('renders without breaking', function() {
    const exampleLabel = 'Example Currency Input';
    const currency = Enzyme.mount(<CurrencyInput label={ exampleLabel } name='currency-input' id='currency-input' maximumValue={ 100 } value='50' />);

    assert.ok((currency).text().indexOf(exampleLabel) >= 0);
  })
})

describe('<DateInput />', function() {
  it ('renders without breaking', function() {
    const exampleLabel = 'Example Date Input';
    const date = Enzyme.mount(<DateInput label={ exampleLabel } name='date-input' value='2017/12/12' onChange={ exampleClick } />);

    assert.ok((date).text().indexOf(exampleLabel) >= 0);
  })
})

describe('<Dropzone />', function() {
  it ('renders without breaking', function() {
    const exampleLabel = 'Example Dropzone';
    const dropzone = Enzyme.mount(<Dropzone label={ exampleLabel } name='dropzone' onChange={ exampleClick } />);

    assert.ok((dropzone).text().indexOf(exampleLabel) >= 0);
  })
})

describe('<FileInput />', function() {
  it ('renders without breaking', function() {
    const exampleLabel = 'Example File Input';
    const file = Enzyme.mount(<FileInput label={ exampleLabel } name='file-input' formId='example-form' onChange={ exampleClick } id='example-form' />);

    assert.ok((file).text().indexOf(exampleLabel) >= 0);
  })
})

describe('<RadioGroup />', function() {
  it ('renders without breaking', function() {
    const options = [
      {
        label: 'Option 1',
        id: 'opt-1'
      },
      {
        label: 'Option 2',
        id: 'opt-2'
      }
    ]
    const radio = Enzyme.mount(<RadioGroup options={ options } value='opt-2' onChange={ exampleClick } name='radio' label='radio' />);

    assert.ok((radio).text().indexOf('Option 2') >= 0);
  })
})

describe('<RadioButtonGroup />', function() {
  it ('renders without breaking', function() {
    const options = [
      {
        label: 'Option 1',
        id: 'opt-1'
      },
      {
        label: 'Option 2',
        id: 'opt-2'
      }
    ]
    const radio = Enzyme.mount(<RadioButtonGroup options={ options } value='opt-2' onChange={ exampleClick } name='radio' label='radio' />);

    assert.ok((radio).text().indexOf('Option 2') >= 0);
  })
})

describe('<SelectInput />', function() {
  it ('renders without breaking', function() {
    const exampleLabel = 'Example Select Input';
    const select = Enzyme.mount(<SelectInput label={ exampleLabel } name='select' formId='example-form' onChange={() => ''} value='12' />);

    assert.ok((select).text().indexOf(exampleLabel) >= 0);
  })
})

describe('<TextArea />', function() {
  it ('renders without breaking', function() {
    const exampleLabel = 'Example Text Area';
    const textarea = Enzyme.mount(<TextArea label={ exampleLabel } name='textarea' value='hello' />);

    assert.ok((textarea).text().indexOf(exampleLabel) >= 0);
  })
})

describe('<TextInput />', function() {
  it ('renders without breaking', function() {
    const exampleLabel = 'Example Text Input';
    const textinput = Enzyme.mount(<TextInput label={ exampleLabel } name='textinput' value='hi hi hi' />);

    assert.ok((textinput).text().indexOf(exampleLabel) >= 0);
  })

  it ('limits input value according to maxLength prop', function() {
    const exampleLabel = 'Test Label';
    const textinput = Enzyme.mount(<TextInput label={ exampleLabel } name='textinput' value='maxLength Test' maxLength={5} />);

    textinput.find('TextInput').simulate('change', {target: {value: 'My new value'}});


    console.log('textinput length!!!!', textinput.text().length)
    console.log('textinput text!!!!', textinput.text())
    console.log('textinput!!!!', textinput)

    assert.ok((textinput).text().length <= 5);
  })
})

describe('<ToggleSwitch />', function() {
  it ('renders without breaking', function() {
    const exampleLabel = 'Example ToggleSwitch';
    const toggle = Enzyme.mount(<ToggleSwitch labelText={ exampleLabel } name='toggle-switch' onClick={ exampleClick } isActive={ true } />);

    assert.ok((toggle).text().indexOf(exampleLabel) >= 0);
  })
})

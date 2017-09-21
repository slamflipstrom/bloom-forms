# Bloom Forms

#### All your form functionality in one place.

Includes:

* Redux:
    - formActions.js
    - formReducer.js

* Components:
    - form.jsx (form wrapper)
    - form inputs

## Usage
To use this package, you can install with either npm or yarn.
```
npm install bloom-forms --save
```
or
```
yarn add bloom-forms
```

To import one of the files/components in this package, import like:
```
import { formReducer } from 'bloom-forms';
```

## Set Up
- Every form needs two files: a container and a presentation component (with all the inputs inside it)
- The container should render the presentation component wrapped inside of the generic Form.jsx container. This wrapper handles all your state, updating redux, errors, etc.
- Example:
A login form might look like this: (simplified -- make sure all your inputs have required props, etc.)
```
const LoginForm = (props) => {
  return (
    <form id='login-form'>
      <TextInput name='username' value={ formData.username } />
      <TextInput name='password' isPassword={ true } value={ formData.password.value } onBlur={ props.checkField } />
      <Button text='submit' onClick={ props.submitForm } />
    </form>
  )
}
```
And its container would look like this:
```
class LoginFormContainer extends React.Component {
  render() {
    let fieldNames = ['username', 'password']
  
    return (
      <Form id='login-form' fieldNames={ fieldNames } submitRoute='/login'>
        <LoginForm />
      </Form>
    )
  }
}
```
- Note that the IDs match ('login-form'), and the fieldNames match the names of the TextInputs.

## Updating Form State
By default, inputs' values are updated via the `updateForm` method. It receives the event coming from changing that input and sets that field's value for you. You can stick it right on an input like:
```
<TextInput onChange={ this.props.updateForm } />
```

You can also manually update a field. Say you have a button that changes the value of a text input. You would want to manually pass in which values and which fields are needed. You can do this through `manualFieldUpdate`, which accepts three parameters: the formId, the fieldValue, and the fieldName. To use:
```
const { formData, formId, manualFieldUpdate } = this.props

...

    <Button onClick={ () => manualFieldUpdate(formId, 'Choice #1 - Blah', 'choice') }>
      Choice #1
    </Button>
    <TextInput name='choice' value={ formData.choice.value } />

...
```

## Validation
All the existing inputs have support for a `validateAs` string and an `onBlur` (when that field loses focus) function prop, which should call `props.checkField`. You can add more types of validaton to the validator by passing in a `validationHelp` prop to form.jsx.

`validationHelp` should be an object with two fields: a json object of error messages, and a dictionary of custom `validateAs` keys with their test functions that return errors.
- Example:
```
validationHelp = {
  errorLanguage: {
    'not-empty': 'This field cannot be empty',
    'min-length': 'This field must be at least <LIMIT> chars.'
  },
  dictionary: {
    'min-length-2': (testData) => testData.length && testData.length >= 2 ? null : errorLanguage['min-length'].replace('<LIMIT>', 2),
    'min-length-8': (testData) => testData.length && testData.length >= 8 ? null : errorLanguage['min-length'].replace('<LIMIT>', 8)
  }
}
```

To use this set up, an example field would look like:
```
<TextInput name='pet' validateAs='min-length-2' onBlur={ props.checkField } onChange={ props.updateForm }
  value={ formData.pet.value } error={ formData.pet.error } />
```

You don't need to change anything inside Form.jsx.

## Prepopulating Form.jsx
To have your form populate with existing data, pass in a JSON object of key/value pairs where the keys match your fieldNames prop.

You may have to use an ajax call to grab the necessary data. Form.jsx will load those values as soon as it receives them.

## Submitting Forms
Form.jsx will handle your form data, but you should write your own submitForm function and pass it in as a prop. Your submitForm should be able to handle formData, an array of files, and both a success and fail callback. You *must* call the success and fail callbacks for the form to update `pendingRequest` -- otherwise, anything showing loading/pending that's dependent on that field will continue to spin endlessly.

An example submitForm might look like:
```
submitForm = (formData, files, successCallback, failCallback) => {
  WebService.post(formData)
    .then((res) => {
      // trigger a success alert
      successCallback()
    })
    .catch((err) => {
      // trigger an error alert
      failCallback()
    })
}
```

## Forms with Switch Inside
To make forms with Routes inside, you will need to make the Switch its own Container inside another form container and pass in the props with a spread operator.

For example:
Outermost container:
```
class RegistrationFormContainer extends React.Component {
  render() {
    return (
      <Form id='registration-form' fieldNames={ fieldNames } submitRoute='/user/register'>
        <RegistrationFormSwitch />
      </Form>
    )
  }
}
```
Switch container:
```
class RegistrationFormSwitch extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/step1' render={ () => <StepOne { ...this.props } /> } />
        <Route path='/step2' render={ () => <StepTwo { ...this.props } /> } />
      </Switch>
    )
  }
}
```
Now StepOne and StepTwo will both be able to receive their needed Form props, such as `updateForm` and `addFormError`.

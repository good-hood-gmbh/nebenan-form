import React, { PureComponent } from 'react';

import Header from '../../components/header';

import Input from '../../../lib/input';
import Textarea from '../../../lib/textarea';
import Select from '../../../lib/select';
import FancySelect from '../../../lib/fancy_select';

import Checkbox from '../../../lib/checkbox';
import Toggle from '../../../lib/toggle';
import Radio from '../../../lib/radio';

import Form from '../../../lib/form';
import FormGroup from '../../../lib/form_group';

import content from '../../sample_data';


const secretValidation = (value) => {
  const executor = (resolve, reject) => {
    const validate = () => {
      if (parseInt(value, 10) % 2 === 0) {
        console.info('async validation success', value);
        resolve();
      } else {
        console.info('async validation fail', value);
        reject();
      }
    };

    setTimeout(validate, 1000);
  };

  return new Promise(executor);
};

class FormPreview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };

    this.setError = this.setError.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  setError() {
    this.setState({
      error: 'Unknown server error! Please insert 100EUR into your mouth and press eject.',
    });
  }

  resetForm() {
    this.form.reset();
    this.setState({ error: null });
  }

  handleSubmit() {
    console.info('model submitted');
  }

  handleValidSubmit(model) {
    console.info('valid model', model);
  }

  handleInvalidSubmit() {
    console.info('invalid model');
  }

  render() {
    const buttonText = 'Submit!';

    const alternativeAction = (
      <span className="preview-form-actions">
        <span className="ui-link" onClick={this.setError}>Error</span>
        <span className="ui-button ui-button-danger ui-button-small" onClick={this.resetForm}>
          Reset
        </span>
      </span>
    );

    return (
      <article className="preview-form">
        <Header>Form</Header>

        <div className="preview-section">
          <Form
            ref={(el) => { this.form = el; }} formError={this.state.error}
            buttonText={buttonText} alternativeAction={alternativeAction}
            onSubmit={this.handleSubmit}
            onValidSubmit={this.handleValidSubmit}
            onInvalidSubmit={this.handleInvalidSubmit}
          >
            <FormGroup>
              <FancySelect
                label="Required" name="fancy_select1"
                options={content.optionValues} required
                error="MUST SELECTOMUNDO"
              />
              <FancySelect
                label="Optional" name="fancy_select2"
                options={content.optionValues}
                defaultValue="fokin wot?"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text" label="Pattern validation - 'abc'" name="pattern_abc"
                error="Value incorrect!" pattern="abc"
              />
              <Input
                type="text" label="Pattern validation - '\d{5}'" name="pattern_numeric"
                error="Value incorrect!" pattern="\d{5}"
              />
            </FormGroup>

            <FormGroup>
              <Input
                label="Length validation" name="input_1"
                placeholder="3, 10" validate="isLength:3,10"
                error="Wrong length! Please provide text between 3 and 10 characters long!"
              />
              <Input
                label="Async validation" name="input_2"
                placeholder="even" validate={secretValidation}
                error="Async validation, provide an even number and wait a second"
              />
              <Input
                label="Required - no error" name="input_3"
                required
              />
            </FormGroup>

            <FormGroup>
              <Input
                type="email" label="Email validation - no error" name="email"
                validate="isEmail"
              />
            </FormGroup>

            <FormGroup>
              <Input
                type="text" label="Phone validation" name="phone"
                validate="isPhone" error="Plz give 'correct' phone"
              />
            </FormGroup>

            <FormGroup>
              <Input
                label="Input with disabled autocomplete"
                name="city"
                disableAutoComplete
              />
            </FormGroup>

            <FormGroup>
              <Select
                label="Required validation" name="select"
                options={content.listOptions} error="Required!" required
              />
            </FormGroup>

            <FormGroup>
              <Textarea
                label="Length and required validation" name="text"
                placeholder="5, 20" validate="isLength:5,20"
                error="Required and/or wrong length!" required
              />
            </FormGroup>

            <FormGroup>
              <Radio
                name="radio"
                options={[
                  { label: 'Required radio 0', value: 0 },
                  { label: 'Required radio 1', value: 1 },
                  { label: 'Required radio 2', value: 2 },
                ]}
                defaultValue={0} error="Required!" required
              />
            </FormGroup>

            <FormGroup>
              <Checkbox
                label={content.lorem} name="checkbox_1"
                error="Required!" required
              />
              <Checkbox
                label="Form checkbox label" name="checkbox_2"
                defaultChecked
              />
            </FormGroup>

            <FormGroup>
              <Toggle
                labelOn="Ja" labelOff="Nein"
                label="Form toggle label" name="toggle_1"
                error="Required!" required
              />
              <Toggle
                labelOn="Ja" labelOff="Nein"
                label={content.tooltip} name="toggle_2"
                defaultChecked
              />
            </FormGroup>
          </Form>
        </div>
      </article>
    );
  }
}

export default FormPreview;

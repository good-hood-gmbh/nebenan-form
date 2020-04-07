import React, { PureComponent } from 'react';

import Header from '../../components/header';

import Input from '../../../lib/input';
import Form from '../../../lib/form';
import FormGroup from '../../../lib/form_group';


class LockedPreview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };

    this.setError = this.setError.bind(this);
    this.setFormError = this.setFormError.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  setError() {
    this.setState({
      error: 'Unknown server error! Please insert 100EUR into your mouth and press eject.',
    });
  }

  setFormError() {
    this.form.setErrors({
      pattern_az: 'This is already taken, use another!',
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
        <span className="ui-link" onClick={this.setError}>Error</span>{' '}
        <span className="ui-link" onClick={this.setFormError}>FormError</span>{' '}
        <span className="ui-button ui-button-danger ui-button-small" onClick={this.resetForm}>
          Reset
        </span>
      </span>
    );

    return (
      <article className="preview-locked">
        <Header>Default Locked Form</Header>

        <div className="preview-section">
          <Form
            ref={(el) => { this.form = el; }} formError={this.state.error}
            buttonText={buttonText} alternativeAction={alternativeAction}
            onSubmit={this.handleSubmit}
            onValidSubmit={this.handleValidSubmit}
            onInvalidSubmit={this.handleInvalidSubmit}
            defaultLocked
          >
            <FormGroup>
              <Input
                type="text" label="Pattern validation - '[a-z]'" name="pattern_az"
                error="Value incorrect!" pattern="[a-z]+" required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text" label="Pattern validation - 'abc'" name="pattern_abc"
                error="Value incorrect!" pattern="abc"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text" label="Pattern validation - '\d{5}'" name="pattern_numeric"
                error="Value incorrect!" pattern="\d{5}" required
              />
            </FormGroup>
          </Form>
        </div>


        <div className="preview-section">
          <Form
            buttonText={buttonText}
            onSubmit={this.handleSubmit}
            onValidSubmit={this.handleValidSubmit}
            onInvalidSubmit={this.handleInvalidSubmit}
            defaultLocked
          >
            <FormGroup>
              <Input
                type="text" label="Pattern validation - '\d{5}'" name="pattern_numeric"
                error="Value incorrect!" pattern="\d{5}" required
              />
            </FormGroup>
          </Form>
        </div>
      </article>
    );
  }
}

export default LockedPreview;

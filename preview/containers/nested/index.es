import React, { PureComponent } from 'react';

import Header from '../../components/header';

import Input from '../../../lib/input';
import Form from '../../../lib/form';
import FormGroup from '../../../lib/form_group';


class NestedPreview extends PureComponent {
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

  handleSubmitInner() {
    console.info('inner model submitted');
  }

  handleValidSubmitInner(model) {
    console.info('inner valid model', model);
  }

  handleInvalidSubmitInner() {
    console.info('inner invalid model');
  }

  render() {
    const alternativeAction = (
      <span className="preview-form-actions">
        <span className="ui-link" onClick={this.setError}>Error</span>
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
            buttonText="Submit!" alternativeAction={alternativeAction}
            onSubmit={this.handleSubmit}
            onValidSubmit={this.handleValidSubmit}
            onInvalidSubmit={this.handleInvalidSubmit}
          >
            <Form
              as="div"
              buttonText="submit inner 1"
              buttonClass="ui-button ui-button-secondary ui-button-small"
              onSubmit={this.handleSubmitInner}
              onValidSubmit={this.handleValidSubmitInner}
              onInvalidSubmit={this.handleInvalidSubmitInner}
            >
              <FormGroup>
                <Input
                  type="text" label="Pattern validation - 'abc'" name="pattern_abc"
                  error="Value incorrect!" pattern="abc" required
                />
              </FormGroup>
            </Form>
            <Form
              as="div"
              buttonText="submit inner 2"
              buttonClass="ui-button ui-button-secondary ui-button-small"
              onSubmit={this.handleSubmitInner}
              onValidSubmit={this.handleValidSubmitInner}
              onInvalidSubmit={this.handleInvalidSubmitInner}
            >
              <FormGroup>
                <Input
                  type="text" label="Pattern validation - '\d{5}'" name="pattern_numeric"
                  error="Value incorrect!" pattern="\d{5}" required
                />
              </FormGroup>
            </Form>
          </Form>
        </div>
      </article>
    );
  }
}

export default NestedPreview;

import React, { PureComponent } from 'react';

import Header from '../../components/header';

import Dropzone from '../../../lib/dropzone';

import Input from '../../../lib/input';
import Textarea from '../../../lib/textarea';
import Select from '../../../lib/select';
import FancySelect from '../../../lib/fancy_select';

import Checkbox from '../../../lib/checkbox';
import Toggle from '../../../lib/toggle';
import Radio from '../../../lib/radio';

import content from '../../sample_data';


class Inputs extends PureComponent {
  static handleUpdate(value) { console.info('Got value:', value); }
  static handleSelect(key, value) { console.info('Got key/value:', key, value); }
  static handleSelectFile(files) { console.info('Selected:', files); }

  render() {
    const radios = [
      { label: 'Default radio label 2', value: 1 },
      { value: 2 },
      { label: 'Object', value: { awesome: true } },
    ];

    return (
      <article className="preview-inputs">
        <Header>Inputs</Header>
        <div className="preview-section">
          <Dropzone
            onSelect={this.constructor.handleSelectFile}
            labelDrag="Drop files here"
            labelRelease="Release now"
          >
            <p><span>Drop files here</span></p>
            <p><span>Or here</span></p>
            <p><span>Or even here!</span></p>
          </Dropzone>
        </div>
        <div className="preview-section">
          <ul>
            <li>
              <FancySelect
                onUpdate={this.constructor.handleUpdate}
                label="Pick one pick some" options={content.optionValues}
              />
            </li>
            <li>
              <FancySelect
                onUpdate={this.constructor.handleUpdate}
                options={content.optionValues}
                defaultValue={content.optionValues[3].value}
              />
            </li>
            <li>
              <FancySelect
                onUpdate={this.constructor.handleUpdate}
                options={content.optionFancyValues}
                deselectable
              />
            </li>
            <li>
              <FancySelect
                onUpdate={this.constructor.handleUpdate}
                label="Disabled" options={content.optionValues} disabled
              />
            </li>
          </ul>
          <ul>
            <li>
              <Select
                onUpdate={this.constructor.handleUpdate}
                label="Default select label" options={[1, 2, 3]}
              />
            </li>
            <li>
              <Select
                onUpdate={this.constructor.handleUpdate}
                label="Default select label" options={content.listOptions}
                defaultValue={content.listOptions[2].value}
              />
            </li>
            <li>
              <Select
                onUpdate={this.constructor.handleUpdate}
                options={[
                  { key: 'one', value: null },
                  { key: 'two', value: { secret: 'sauce' } },
                  { key: 'three', value: false },
                ]} defaultValue={false}
              />
            </li>
            <li>
              <Select
                onUpdate={this.constructor.handleUpdate}
                label="Disabled" options={[1, 2, 3]} disabled
              />
            </li>
          </ul>

          <ul>
            <li>
              <Textarea
                onUpdate={this.constructor.handleUpdate}
                label="Default textarea label"
              />
            </li>
            <li>
              <Textarea
                onUpdate={this.constructor.handleUpdate}
                label="Default textarea label"
                defaultValue="Filled textarea"
              />
            </li>
            <li>
              <Textarea
                onUpdate={this.constructor.handleUpdate}
                placeholder="Textarea placeholder"
              />
            </li>
            <li>
              <Textarea
                onUpdate={this.constructor.handleUpdate}
                label="Disabled" disabled
              />
            </li>
          </ul>

          <ul>
            <li>
              <Input
                onUpdate={this.constructor.handleUpdate}
                label="Default input label"
              />
            </li>
            <li>
              <Input
                onUpdate={this.constructor.handleUpdate}
                label="Default input label" defaultValue="Filled input"
              />
            </li>
            <li>
              <Input
                onUpdate={this.constructor.handleUpdate}
                placeholder="Input placeholder"
              />
            </li>
            <li>
              <Input
                name="city"
                disableAutoComplete
                label="Input with disabled autocomplete"
              />
            </li>
            <li>
              <Input
                onUpdate={this.constructor.handleUpdate}
                label="Disabled" disabled
              />
            </li>
          </ul>

          <ul className="preview-checkboxes">
            <li>
              <div className="preview-checkboxblock">
                <Checkbox
                  onUpdate={this.constructor.handleUpdate} label="Default checkbox label"
                />
              </div>
              <div className="preview-checkboxblock">
                <Checkbox
                  onUpdate={this.constructor.handleUpdate} defaultChecked
                />
              </div>
            </li>
            <li>
              <div className="preview-checkboxblock">
                <Checkbox
                  onUpdate={this.constructor.handleUpdate} label="Default checkbox label" disabled
                />
              </div>
              <div className="preview-checkboxblock">
                <Checkbox
                  onUpdate={this.constructor.handleUpdate} defaultChecked disabled
                  label="Checked and disabled"
                />
              </div>
            </li>
          </ul>

          <ul className="preview-checkboxes">
            <li>
              <div className="preview-checkboxblock">
                <Toggle
                  labelOn="Ja" labelOff="Nein"
                  onUpdate={this.constructor.handleUpdate} label="Default toggle label"
                />
              </div>
              <div className="preview-checkboxblock">
                <Toggle
                  labelOn="Ja" labelOff="Nein"
                  onUpdate={this.constructor.handleUpdate} defaultChecked
                />
              </div>
            </li>
            <li>
              <div className="preview-checkboxblock">
                <Toggle
                  labelOn="Ja" labelOff="Nein"
                  onUpdate={this.constructor.handleUpdate} label="Default toggle label" disabled
                />
              </div>
              <div className="preview-checkboxblock">
                <Toggle
                  labelOn="Ja" labelOff="Nein"
                  onUpdate={this.constructor.handleUpdate} defaultChecked disabled
                  label="Checked and disabled"
                />
              </div>
            </li>
          </ul>

          <ul className="preview-radios">
            <li>
              <Radio
                onUpdate={this.constructor.handleUpdate}
                options={[
                  { label: 'Default radio label 1', value: 1 },
                  { value: 2 },
                  { label: 'zero test', value: 0 },
                  { label: 'String', value: 'awesome' },
                  { label: 'Disabled', value: 'Disabled', disabled: true },
                  { label: 'Disabled and checked', value: 'Disabled and checked', disabled: true },
                ]}
                defaultValue="Disabled and checked"
              />
            </li>

            <li>
              <Radio
                onUpdate={this.constructor.handleUpdate}
                type="small" options={radios} defaultValue={radios[2].value}
              />
            </li>

            <li>
              <Radio
                onUpdate={this.constructor.handleUpdate}
                type="small" options={radios} defaultValue={radios[2].value}
                disabled
              />
            </li>
          </ul>
        </div>
      </article>
    );
  }
}

export default Inputs;

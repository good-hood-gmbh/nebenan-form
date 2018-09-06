const { createElement } = require('react');
const { assert } = require('chai');
const { shallow, mount } = require('enzyme');
const { fake } = require('sinon');

const Form = require('../../lib/form').default;


describe('<Form />', () => {
  it('renders form', () => {
    const props = {
      alternativeAction: 'action',
      formError: 'Error',
      buttonText: 'button',
      buttonClass: 'buttonClass',
    };
    const wrapper = shallow(createElement(Form, props));
    const error = wrapper.find('strong .c-form-error');
    const button = wrapper.find('button .buttonClass');

    assert.lengthOf(wrapper.find('form .c-form'), 1, 'form was rendered');
    assert.lengthOf(wrapper.find('div .c-form-footer'), 1, 'footer was rendered');

    assert.lengthOf(error, 1, 'error was rendered');
    assert.equal(error.text(), 'Error', 'formError text was rendered correct');

    assert.lengthOf(button, 1, 'button was rendered');
    assert.equal(button.text(), 'button', 'button text  was rendered correct');
  });

  it('setPristine', () => {
    const wrapper = mount(createElement(Form));
    const instance = wrapper.instance();
    const callback = fake();
    const setPristine = fake();

    assert.isTrue(instance.state.isValid, 'default state is valild');

    instance.setValid(false);
    assert.isFalse(instance.state.isValid, 'state was changed');

    instance.addInput({ setPristine });
    instance.setPristine(callback);

    assert.deepEqual(instance.state, instance.getDefaultState(), 'state is back to default');
    assert.isTrue(setPristine.calledOnce, 'setPristine on component was called');

    setTimeout(() => {
      assert.isTrue(callback.calledOnce, 'callback was called');
    }, 100);
    wrapper.unmount();
  });

  it('setValid', () => {
    const props = { onValidityChange: fake() };
    const wrapper = shallow(createElement(Form, props));
    const instance = wrapper.instance();
    const doneFake = fake();

    assert.isTrue(instance.state.isValid, 'default state is valild');

    instance.setValid(false, doneFake);

    assert.isTrue(doneFake.calledOnce, 'callback was called');
    assert.isTrue(props.onValidityChange.calledOnce, 'onValidityChange prop was called');
    assert.isFalse(instance.state.isValid, 'state was changed');
  });

  it('isDisabled', () => {
    // this.props.locked is true
    const props = { locked: true };
    const wrapperWithLock = shallow(createElement(Form, props));
    const instanceWithLock = wrapperWithLock.instance();
    assert.isTrue(instanceWithLock.isDisabled(), 'form is disabled if locked is true');

    // this.state.isValid is false
    const wrapper = shallow(createElement(Form));
    const instance = wrapper.instance();

    instance.setValid(false);
    assert.isTrue(instance.isDisabled(), 'form is disabled if state is not valid');
  });

  it('updateValidity', () => {
    const wrapper = shallow(createElement(Form));
    const instance = wrapper.instance();
    instance.setValid = fake();

    instance.updateValidity();

    assert.isTrue(instance.setValid.calledOnce, 'setValid was called');
  });

  it('reset', () => {
    const wrapper = shallow(createElement(Form));
    const instance = wrapper.instance();
    const reset = fake();

    instance.addInput({ reset });
    instance.setValid(false);
    assert.isFalse(instance.state.isValid, 'state was changed');

    instance.reset();
    assert.deepEqual(instance.state, instance.getDefaultState(), 'state is back to default');
    assert.isTrue(reset.calledOnce, 'reset on component was called');
  });

  it('submit', () => {
    const preventDefault = fake();
    const wrapper = shallow(createElement(Form));

    wrapper.find('form').simulate('submit', { preventDefault });
    const onSubmit = wrapper.props().onSubmit;

    assert.isTrue(preventDefault.calledOnce, 'preventDefault was called');
    assert.exists(onSubmit, 'onSubmit prop exists');
    assert.typeOf(onSubmit, 'function', 'onSubmit must be a funciton');
  });

  it('validate', () => {
    const wrapper = shallow(createElement(Form));
    const instance = wrapper.instance();
    instance.setValid = fake();

    return Promise.all([
      assert.isFulfilled(instance.validate(), 'success'),
      assert.isRejected(instance.validate(), 'fail'),
    ]);
  });


  it('addInput', () => {
    const wrapper = shallow(createElement(Form));
    const instance = wrapper.instance();

    instance.addInput('input1');
    instance.addInput('input2');
    instance.addInput('input1');
    instance.addInput('input2');
    instance.addInput('input3');

    assert.equal(instance.inputs.length, 3, 'only not existing input were added');
  });

  it('removeInput', () => {
    const wrapper = shallow(createElement(Form));
    const instance = wrapper.instance();

    instance.addInput('input1');
    instance.addInput('input2');
    instance.addInput('input3');

    instance.removeInput('input2');
    instance.removeInput('input3');

    assert.equal(instance.inputs.length, 1, 'input were removed');
    assert.equal(instance.inputs[0], 'input1', 'correct input stayed');
  });

  it('isValid', () => {
    const wrapper = shallow(createElement(Form));
    const instance = wrapper.instance();
    const isValid = fake();

    instance.addInput({ isValid });

    instance.isValid();

    assert.isTrue(isValid.calledOnce, 'isValid was called');
  });

  it('isPristine', () => {
    const wrapper = shallow(createElement(Form));
    const instance = wrapper.instance();
    const isPristine = fake();

    instance.addInput({ isPristine });

    instance.isPristine();

    assert.isTrue(isPristine.calledOnce, 'isPristine was called');
  });
});

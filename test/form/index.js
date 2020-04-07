const { createElement } = require('react');
const { assert } = require('chai');
const { shallow } = require('enzyme');
const { fake, spy } = require('sinon');

const Form = require('../../lib/form');


describe('<Form />', () => {
  it('renders form', () => {
    const props = {
      alternativeAction: 'action',
      formError: 'Error',
      buttonText: 'button',
      buttonClass: 'buttonClass',
    };
    const wrapper = shallow(createElement(Form, props));
    const error = wrapper.find('.c-form-error');
    const button = wrapper.find('.buttonClass');

    assert.lengthOf(wrapper.find('.c-form'), 1, 'form was rendered');
    assert.lengthOf(wrapper.find('.c-form-footer'), 1, 'footer was rendered');

    assert.lengthOf(error, 1, 'error was rendered');
    assert.equal(error.text(), 'Error', 'formError text was rendered correct');

    assert.lengthOf(button, 1, 'button was rendered');
  });

  it('setErrors', () => {
    const wrapper = shallow(createElement(Form));
    const instance = wrapper.instance();

    const errorSetA = fake();
    const errorSetB = fake();

    instance.addInput({ getName: () => 'a', setError: errorSetA });
    instance.addInput({ getName: () => 'b', setError: errorSetB });

    const resultA = instance.setErrors({ a: 'Error A', b: 'Error B', c: 'Error C' });
    const resultB = instance.setErrors({ c: 'Error C' });

    assert.isTrue(errorSetA.calledOnce, 'Input A set error');
    assert.isTrue(errorSetB.calledOnce, 'Input B set error');

    assert.deepEqual(resultA, ['a', 'b'], 'Return list of input keys that had erros');
    assert.deepEqual(resultB, [], 'Return empty list if none errors were set');
  });

  it('setPristine', (done) => {
    const wrapper = shallow(createElement(Form));
    const instance = wrapper.instance();
    const callback = fake();
    const setPristine = fake();

    assert.isTrue(instance.state.isValid, 'default state is valild');

    instance.setValid(false);
    assert.isFalse(instance.state.isValid, 'state was changed');

    instance.addInput({ setPristine });
    instance.setPristine(callback);

    assert.deepEqual(instance.state, instance.getDefaultState({}), 'state is back to default');
    assert.isTrue(setPristine.calledOnce, 'setPristine on component was called');

    process.nextTick(() => {
      assert.isTrue(callback.calledOnce, 'callback was called');
      done();
    });
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
    assert.deepEqual(instance.state, instance.getDefaultState({}), 'state is back to default');
    assert.isTrue(reset.calledOnce, 'reset on component was called');
  });

  it('submit was successful', (done) => {
    const props = {
      onValidSubmit: fake(),
      onInvalidSubmit: fake(),
      onSubmit: fake(),
    };
    const preventDefault = fake();
    const wrapper = shallow(createElement(Form, props));
    const instance = wrapper.instance();
    instance.validate = spy(() => Promise.resolve());

    wrapper.find('form').simulate('submit', { preventDefault });

    assert.isTrue(preventDefault.calledOnce, 'preventDefault was called');
    assert.isTrue(instance.validate.calledOnce, 'validate was called');
    assert.isTrue(props.onSubmit.calledOnce, 'onSubmit was called');

    const check = () => {
      assert.isTrue(props.onValidSubmit.calledOnce, 'onValidSubmit was called');
      done();
    };
    setTimeout(check, 100);
  });

  it('submit failed', (done) => {
    const props = {
      onValidSubmit: fake(),
      onInvalidSubmit: fake(),
      onSubmit: fake(),
    };
    const preventDefault = fake();
    const wrapper = shallow(createElement(Form, props));
    const instance = wrapper.instance();
    instance.validate = spy(() => Promise.reject());

    wrapper.find('form').simulate('submit', { preventDefault });

    assert.isTrue(preventDefault.calledOnce, 'preventDefault was called');
    assert.isTrue(instance.validate.calledOnce, 'validate was called');
    assert.isTrue(props.onSubmit.calledOnce, 'onSubmit was called');

    const check = () => {
      assert.isTrue(props.onInvalidSubmit.calledOnce, 'onInvalidSubmit was called');
      done();
    };
    setTimeout(check, 100);
  });


  it('validate', () => {
    const wrapper = shallow(createElement(Form));

    const instance1 = wrapper.instance();
    instance1.addInput({ validate: spy(() => Promise.resolve()) });
    assert.isFulfilled(instance1.validate());

    const instance2 = wrapper.instance();
    instance2.addInput({ validate: spy(() => Promise.reject()) });
    assert.isRejected(instance2.validate());
  });


  it('addInput', () => {
    const wrapper = shallow(createElement(Form));
    const instance = wrapper.instance();

    instance.addInput('input1');
    instance.addInput('input2');
    instance.addInput('input1');
    instance.addInput('input2');
    instance.addInput('input3');

    assert.deepEqual(instance.inputs, ['input1', 'input2', 'input3'], 'only not existing input were added');
  });

  it('removeInput', () => {
    const wrapper = shallow(createElement(Form));
    const instance = wrapper.instance();

    instance.addInput('input1');
    instance.addInput('input2');
    instance.addInput('input3');

    instance.removeInput('input2');
    instance.removeInput('input3');

    assert.deepEqual(instance.inputs, ['input1'], 'correct input stayed');
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

  it('getModel', () => {
    const wrapper = shallow(createElement(Form));
    const instance = wrapper.instance();

    instance.addInput({ getName: () => 'testNameA', getValue: () => 'testValueA' });
    instance.addInput({ getName: () => 'testNameB', getValue: () => 'testValueB' });
    instance.addInput({ getName: () => 'testNameC', getValue: () => 'testValueC' });

    assert.deepEqual(instance.getModel(), {
      testNameA: 'testValueA',
      testNameB: 'testValueB',
      testNameC: 'testValueC',
    }, 'collect input values');
  });
});

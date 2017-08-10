import React, {Component} from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import createContainer from 'UTIL/createContainer';
// import {login} from 'ACTION';
// import {
//   Link,
// } from 'react-router-dom';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
// import authService from '../../services/authService';

import less from './Login.less';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login({
          formData: {
            pid: values.userName,
            password: values.password,
          },
          history: this.props.history,
        });
      }
    });
  }

  render() {
    console.log('=== Login render ===');
    const {getFieldDecorator} = this.props.form;

    return (
      <div className={less.Login}>
        <Form onSubmit={this.handleSubmit} className={less['login-form']}>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{required: true, message: 'Please input your username!'}],
            })(
              <Input prefix={<Icon type="user" style={{fontSize: 13}} />} placeholder="Username" />
          )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your Password!'}],
            })(
              <Input prefix={<Icon type="lock" style={{fontSize: 13}} />} type="password" placeholder="Password" />
          )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
          )}
            <a className={less['login-form-forgot']} href="www.h5devhoward.com">Forgot password</a>
            <Button type="primary" htmlType="submit" className={less['login-form-button']}>
              Log in
            </Button>
            Or <a href="www.h5devhoward.com">register now!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

NormalLoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  form: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

NormalLoginForm.defaultProps = {
  form: undefined,
};

const connectComponent = createContainer(
  ({userData}) => ({userData}),
  require('ACTION/user').default
);

const Login = connectComponent(Form.create()(NormalLoginForm));
export default Login;

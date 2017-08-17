import React, {Component} from 'react';
import classNames from 'classnames';
import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile';

// import {createForm} from 'rc-form';
import PropTypes from 'prop-types';
import createContainer from 'UTIL/createContainer';

import less from './Login.less';

class BasicInputExample extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleUsernameBlur = this.handleUsernameBlur.bind(this);
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  handleUsernameBlur(value) {
    this.setState({
      username: value,
    });
  }

  handlePasswordBlur(value) {
    this.setState({
      password: value,
    });
  }

  handleClick() {
    // this.props.form.getFieldProps('username').value
    this.props.login({
      formData: {
        pid: this.state.username,
        password: this.state.password,
      },
      history: this.props.history,
    });
  }

  render() {
    console.log('=== render ===', this.context.store.getState());
    // const {getFieldProps} = this.props.form;
    
    return (
      <div className={less.Login}>
        <WingBlank>
          <div className={classNames('preload', less.logo)}>
            <img src="../../assets/img/logo.png" alt="" />
          </div>
          <p className={less.title}>小雅</p>
        </WingBlank>
        <WhiteSpace />
        
        <List>
          <InputItem
            ref={cc => {this.username = cc;}}
            onBlur={this.handleUsernameBlur}
            placeholder="username"
          >
            <div className={less['username-icon']} />
          </InputItem>
          <InputItem
            ref={cc => {this.password = cc;}}
            onBlur={this.handlePasswordBlur}
            type="password"
            placeholder="password"
          >
            <div className={less['password-icon']} />
          </InputItem>
          {/* <InputItem
            {...getFieldProps('username', {
              initialValue: 'Test8【小雅生产】',
            })}
            ref={cc => {this.username = cc;}}
            placeholder="username"
          >
            <div className={less['username-icon']} />
          </InputItem> */}
          {/* <InputItem
            {...getFieldProps('password')}
            placeholder="password"
          >
            <div className={less['password-icon']} />
          </InputItem> */}
        </List>
        <WhiteSpace />
        <Button onClick={this.handleClick} className={less.button} type="primary">登录</Button>

      </div>
    );
  }
}

const connectComponent = createContainer(
  ({userData}) => ({userData}),
  require('ACTION/user').default
);

BasicInputExample.contextTypes = {
  store: React.PropTypes.object,
};

BasicInputExample.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

// Login.defaultProps = {
//   form: undefined,
// };


const Login = connectComponent(BasicInputExample);
export default Login;


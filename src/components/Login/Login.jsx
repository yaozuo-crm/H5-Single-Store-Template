import React, {Component} from 'react';
import classNames from 'classnames';
import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile';
// import {createForm} from 'rc-form';
// import PropTypes from 'prop-types';

import less from './Login.less';

class Login extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleUsernameBlur = this.handleUsernameBlur.bind(this);
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
  }

  handleClick() {
    // this.props.form.getFieldProps('username').value
    console.log('=== login ===', this);
  }

  handleUsernameBlur(value) {
    console.log('username', value, this);
  }

  handlePasswordBlur(value) {
    console.log('password', value, this);
  }

  render() {
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

// Login.propTypes = {
//   form: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.object,
//   ]),
// };

// Login.defaultProps = {
//   form: undefined,
// };


// const Login = createForm()(Login);
export default Login;


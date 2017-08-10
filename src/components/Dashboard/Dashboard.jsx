import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Dropdown,
  Button,
} from 'antd';

import {
  // HashRouter as Router,
  Route,
  Link,
  // Switch,
} from 'react-router-dom';

// import store from 'STORE';
import createContainer from 'UTIL/createContainer';

import less from './Dashboard.less';

import AddList from '../AddList';
import ReduxTest from '../../containers/ReduxTest';
import AsyncTest from '../../containers/AsyncTest';

import authService from '../../services/authService';

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

const breadcrumbNameMap = {
  '/': 'Home',
  '/user': 'User',
  '/user/tom': 'Tom',
  '/user/bill': 'Bill',
  '/user/alex': 'Alex',
};

const userItems = Object.entries(breadcrumbNameMap).filter(item => item[0].startsWith('/user/'));

const menuItems = match => userItems.map(item => (
  <Menu.Item key={item[0]}>
    <Link to={match.url + item[0]}>{item[1]}</Link>
  </Menu.Item>
));

const fakeAuth = {
  dataLoaded: false,
  fetchData(cb) {
    authService.documents().then(data => {
      this.dataLoaded = true;
      cb(data);
    });
  },
  leave(cb) {
    this.dataLoaded = false;
    cb();
  },
};

class Dashboard extends Component {
  constructor(props) {
    super();
    this.state = {
      listLoaded: false,
      dataSource: [],
      collapsed: false,
      selectedKeys: [props.location.pathname],
      openKeys: [`/${props.location.pathname.split('/')[1]}`],
      mode: 'inline',
    };
    this.handleCollapse = this.handleCollapse.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if (this.props.location.pathname.split(this.props.match.url)[1] === Object.keys(breadcrumbNameMap)[2]) {
      this.fetchData();
    }
  }

  fetchData() {
    fakeAuth.fetchData(data => {
      this.setState({
        listLoaded: true,
        dataSource: data,
      });
    });
  }

  handleCollapse(collapsed) {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }

  handleSelect({key, selectedKeys}) {
    if (key === this.props.location.pathname.split(this.props.match.url)[1]) return;
    if (key === Object.keys(breadcrumbNameMap)[2]) {
      fakeAuth.fetchData(data => {
        this.setState({
          listLoaded: true,
          dataSource: data,
          selectedKeys,
        });
      });
    } else {
      fakeAuth.leave(() => {
        this.setState({
          listLoaded: false,
          selectedKeys,
        });
      });
    }
  }

  handleLogout() {
    this.props.logout({
      history: this.props.history,
    });
  }

  render() {
    console.log('=== Dashboard render ===');
    const {match, location} = this.props;

    const pathSnippets = location.pathname.split(match.url)[1].split('/').filter(i => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

      return (
        <Breadcrumb.Item key={url}>
          <Link to={match.url + url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      );
    });

    const breadcrumbItems = () => [(
      <Breadcrumb.Item key="home">
        <Link to={match.url}>Home</Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);

    const system = (
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.h5devhoward.com/" rel="noopener noreferrer" target="_blank">www</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://blog.h5devhoward.com/" rel="noopener noreferrer" target="_blank">blog</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <Button type="primary" icon="logout" onClick={this.handleLogout}>Log out</Button>
        </Menu.Item>
      </Menu>
    );

    const PrivateRoute = ({component: Component, ...rest}) => ( // eslint-disable-line
      <Route
        {...rest}
          render={props => // eslint-disable-line
            fakeAuth.dataLoaded ? (
              <Component {...props} dataSource={rest.dataSource} />
            ) : (
              <div style={{fontSize: '16px'}}>loading</div>
            )
          }
      />
    );

    return (
      <div className={less.Dashboard}>
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.handleCollapse}
          >
            <div className={classNames(less.logo, less.preload)}>
              {this.state.collapsed ? <img src={require('../../favicon.png')} alt="logo" /> : <p>入账DMS</p>}
            </div>
            <Menu
              theme="dark"
              defaultSelectedKeys={this.state.selectedKeys}
              defaultOpenKeys={this.state.openKeys}
              mode={this.state.mode}
              onSelect={this.handleSelect}
              inlineCollapsed
            >
              <SubMenu
                key="/user"
                title={<span><Icon type="user" /><span className="nav-text">User</span></span>}
              >
                {menuItems(match)}
              </SubMenu>
              <SubMenu
                key="sub2"
                title={<span><Icon type="team" /><span className="nav-text">Team</span></span>}
              >
                <Menu.Item key="4">Team 1</Menu.Item>
                <Menu.Item key="5">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="6">
                <span>
                  <Icon type="file" />
                  <span className="nav-text">File</span>
                </span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header className={less.header}>
              <Dropdown overlay={system} trigger={['hover']}>
                <a className="ant-dropdown-link">
                  <span className={less.username}><Icon type="user" />{localStorage.getItem('pid')}</span>
                  <Icon type="down" />
                </a>
              </Dropdown>
            </Header>
            <Content style={{margin: '0 16px'}}>
              <Breadcrumb style={{margin: '12px 0'}} >
                {breadcrumbItems(match)}
              </Breadcrumb>
              <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                <Route
                  exact
                  path={match.url}
                  render={() => (
                    <h3>This is Home.</h3>
                      )}
                />
                <Route
                  exact
                  path={`${match.url}/user`}
                  render={() => (
                    <h3>This is User.</h3>
                      )}
                />
                <PrivateRoute exact path={match.url + Object.keys(breadcrumbNameMap)[2]} dataSource={this.state.dataSource} component={AddList} />
                <Route exact path={match.url + Object.keys(breadcrumbNameMap)[3]} component={ReduxTest} />
                <Route exact path={match.url + Object.keys(breadcrumbNameMap)[4]} component={AsyncTest} />
              </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
              入账DMS ©2017 Created by Howard
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

Dashboard.defaultProps = {
  match: undefined,
  location: undefined,
};

const connectComponent = createContainer(
  () => ({}),
  require('ACTION/user').default
);

export default connectComponent(Dashboard);

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  SettingOutlined,
  UserOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

import Dashboard from './components/Dashboard';
import Services from './components/Services';
import Monitoring from './components/Monitoring';

import { Provider } from 'react-redux';

import marketplace from './marketplace';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Provider store={marketplace}>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                <Link to='/'>Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<PieChartOutlined />}>
                <Link to='/services'>Services</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<DesktopOutlined />}>
                <Link to="/monitoring">Monitoring</Link>
              </Menu.Item>
              <SubMenu key="sub2" icon={<SettingOutlined />} title="Settings">
                <Menu.Item key="3">Option 1</Menu.Item>
                <Menu.Item key="4">Option 2</Menu.Item>
              </SubMenu>
              <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                <Menu.Item key="5">Valentin</Menu.Item>
                <Menu.Item key="6">Logout</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/services" component={Services} />
                  <Route path="/monitoring" component={Monitoring} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Valentin Vareskic ©2020</Footer>
          </Layout>
        </Layout>
      </Router>
      </Provider>
    );
  }
}

export default App;

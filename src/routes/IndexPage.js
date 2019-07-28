import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import {
  Icon, Menu, Dropdown, Drawer,
  Button, Row, Col, Layout, Avatar, Divider
} from 'antd';
import { Link, withRouter } from 'dva/router';
import ScrollBar from '../components/ScrollBar';
import IndexRouterConfig from '../indexrouter'

const { Header, Content, Footer } = Layout;

class IndexPage extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const models = [{ name: '首页', icon: "home", path: "/main/page" },
    { name: '关于我们', icon: "user", path: "/main/aboutus" },
    { name: '项目与服务', icon: "profile", path: "/main/service" },
    { name: '合作伙伴', icon: "api", path: "/main/cooperate" },
    { name: '联系我们', icon: "phone", path: "/main/contact" },
    { name: '公共模块', icon: "snippets", path: "/main/public" }];;
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            <Icon type='edit'></Icon>
            &nbsp;修改密码
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link to='/login' >
            <Icon type="logout" />
            &nbsp;退出登录
          </Link>
        </Menu.Item>
      </Menu>
    ),
      w = document.body.clientWidth;
    return (
      <Layout style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Header className={styles.indexheader}>
          <div className={styles.flexrow}>
            <Link to='/main' ><img src="./assets/images/logos.png" alt="" /></Link>
            &nbsp;&nbsp;
            <Divider type='vertical'></Divider>
            &nbsp;&nbsp;
            <Icon type="menu-unfold" style={{ fontSize: 20 }} onClick={this.showDrawer} />
          </div>
          <div className={styles.indexuser}>
            <Dropdown trigger={["hover", "click"]} overlay={menu}>
              <Avatar style={{ backgroundColor: "#1bbcff", cursor: "pointer" }} icon="user">
              </Avatar>
            </Dropdown>

          </div>
        </Header>
        <Content className={styles.indexcontent} style={{ height: "100vh" }}>
          <div style={{
            height: "100%", overflow: "auto", background: "#fff", overflowX: "hidden"
          }}>
            <ScrollBar>
              <div style={{ padding: w < 500 ? "12px 29px 30px 12px" : 12, height: "100%" }}>
                <IndexRouterConfig></IndexRouterConfig>
              </div>
            </ScrollBar>
          </div>

        </Content>
        <Footer className={styles.indexfooter}>
          <p>Ant Design ©2018 Created by Ant UED</p>
        </Footer>

        <Drawer
          placement="top"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <img src="./assets/images/logos.png" className={styles.logos} alt="" />
          <Row gutter={24} className={styles.indexrow}>
            {
              models.map((item,i) => (
                <Col key={i} xs={8} sm={8} md={8} lg={4} xl={4} className={styles.indexcol}>
                  <Link to={item.path}>
                    <p style={{ textAlign: "center" }}><Icon style={{ fontSize: 18, marginBottom: 8 }} type={item.icon} /><br />{item.name}</p>

                  </Link>
                </Col>))
            }

          </Row>

        </Drawer>
      </Layout>
    );
  }
}

export default IndexPage

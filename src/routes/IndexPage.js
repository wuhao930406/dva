import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import {
  Icon, Menu, Dropdown, Drawer, 
  Button, Row, Col, Layout, Avatar, Divider
} from 'antd';
import { Link,withRouter } from 'dva/router';
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
    const models = ['模块1', '模块2', '模块3', '模块4', '模块5', '模块6'];
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
          <Link to='/' ><img src="./assets/images/logos.png" alt="" /></Link>
            &nbsp;&nbsp;
            <Divider type='vertical'></Divider>
            &nbsp;&nbsp;
            <Icon type="menu-unfold" style={{ fontSize: 20 }} onClick={this.showDrawer} />
          </div>
          <div className={styles.indexuser}>
            <Dropdown trigger={["hover","click"]} overlay={menu}>
              <Avatar style={{ backgroundColor: "#1bbcff",cursor: "pointer"}} icon="user">
            </Avatar>
            </Dropdown>

          </div>
        </Header>
        <Content className={styles.indexcontent} style={{height:"100vh"}}>
          <div style={{ height: "100%", overflow: "auto", background: "#fff",overflowX:"hidden"
          }}>
            <ScrollBar>
                  <div style={{padding:w<500?"12px 29px 30px 12px":12,height:"100%" }}>
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
              models.map((item) => (
                <Col key={item} xs={8} sm={8} md={8} lg={4} xl={4} className={styles.indexcol}>
                  <p style={{ textAlign: "center" }}>{item}</p>
                </Col>))
            }

          </Row>

        </Drawer>
      </Layout>
    );
  }
}

export default withRouter(connect()(IndexPage));

import React,{Component} from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Drawer, Button,Row,Col  } from 'antd';
import {Link} from 'dva/router'



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
    const models = ['Model1','Model2','Model3','Model4','Model5','Model6']
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Open
        </Button>
        <Drawer
          placement="top"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <img src="./assets/images/logos.png" className={styles.logos} alt=""/>
          <Row gutter={24} className={styles.indexrow}>
            {
              models.map((item)=>( 
              <Col xs={8} sm={8} md={8} lg={4} xl={4} className={styles.indexcol}>
                <p style={{textAlign:"center"}}>{item}</p>
              </Col>))
            }



            
          </Row>
          
        </Drawer>
      </div>
    );
  }
}

export default connect()(IndexPage);

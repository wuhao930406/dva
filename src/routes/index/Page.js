import Uploadpic from '../../components/Uploadpic';
import PageHead from '../../components/PageHead';
import { Component } from 'react';
import { Row, Col, Card, Icon } from 'antd';
import styles from '../IndexPage.css';
class Page extends Component {
  constructor(){
    super()
    this.state = {
      fileList:[
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'preload',
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559045153887&di=c7668c88f1b2e1e0957ba272cde147da&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Ftj%2F2019-03-04%2F5c7cd3cd7933e.jpg',
          jumpurl:"baidu.com"
        },
      ],
    }
  }

  /*清空*/
  resetFileList = ()=>{
    this.setState({
      fileList:[]
    })
  }

  render() {
    const {fileList} = this.state;

    return (
      <div className={styles.model1}>
        <PageHead title="模块1" subTitle="修改官网上模块1的内容"></PageHead>
        <Row>
          <Col>
            <Card 
            title = {<span style={{color:"#333"}}><Icon type="picture" /> 修改banner图</span>} 
            extra={<Icon style={{color:"#1bbcff",cursor:"pointer"}} type="eye"/>}
            actions={[<a onClick={this.resetFileList}><Icon type="redo"/> 清空</a>,<a><Icon type="edit"/> 修改</a>]}
            >
              <Uploadpic num={3} fileList={fileList}></Uploadpic>
            </Card>
          </Col>


        </Row>


      </div>

    )
  }
}


export default Page;
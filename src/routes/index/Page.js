import Uploadpic from '../../components/Uploadpic';
import PageHead from '../../components/PageHead';
import { Component } from 'react';
import { Row, Col, Card, Icon } from 'antd';
import styles from '../IndexPage.css';
import { connect } from 'dva';
import Item from 'antd/lib/list/Item';

@connect(({ example }) => ({
  example
}))
class Page extends Component {
  constructor(){
    super()
    this.state = {
      fileList:[],
    }
  }

  /* dispatch获取 */
  setNewState(type,value,fn) {
    const { dispatch } = this.props;
    dispatch({
      type: 'example/'+type,
      payload: value
    }).then((res)=>{
      if(res){
        fn?fn(res):null
      }
    })
  }

  /*清空*/
  resetFileList = ()=>{
    this.setState({
      fileList:[]
    },()=>{
      this.setNewState("bannerdelete")
    })
  }

  onRef = (ref) => {
    this.child = ref
  }

  componentDidMount(){
    this.setNewState("getall",null,()=>{
      this.setState({
        fileList:this.props.example.getall.map((item)=>{
          item.url = `http://localhost:8000/edu`+item.url;
          return item
        })
      })
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
            actions={[<a onClick={this.resetFileList}><Icon type="redo"/> 清空</a>]}
            >
              <Uploadpic action="/edu/page/bannerinsert" delete="bannerdelete" data={1} onRef={this.onRef} num={3} fileList={fileList}></Uploadpic>
            </Card>
          </Col>


        </Row>


      </div>

    )
  }
}


export default Page;
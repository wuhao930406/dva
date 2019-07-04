import Uploadpic from '../../components/Uploadpic';
import PageHead from '../../components/PageHead';
import { Component } from 'react';
import { Row, Col, Card, Icon, message, Input, InputNumber, Popconfirm, Skeleton, Tabs } from 'antd';
import styles from '../IndexPage.css';
import { connect } from 'dva';

const { TabPane } = Tabs;
@connect(({ example, loading }) => ({
  example,
  load1: loading.effects['example/getaboutus'],
}))
class Aboutus extends Component {
  constructor() {
    super()
    this.state = {
      fileList: [],
      advList: [{
        title: "",
        desc: ""
      }, {
        title: "",
        desc: ""
      }, {
        title: "",
        desc: ""
      }
      ],
      getaboutus: {
        companydesc: "",
        ourdream: "",
        plant: "",
        workenv: ""
      },
      service: [

      ]
    }
  }

  /* dispatch获取 */
  setNewState(type, value, fn) {
    const { dispatch } = this.props;
    dispatch({
      type: 'example/' + type,
      payload: value
    }).then((res) => {
      if (res) {
        fn ? fn(res) : null
      }
    })
  }

  /*清空*/
  resetFileList = () => {
    message.destroy();
    if (this.child.state.fileList.length == 0) {
      message.warn("没有需要清除的办公图片")
      return
    }
    this.setState({
      fileList: [],
      getaboutus: {
        companydesc: "",
        ourdream: "",
        plant: "",
        workenv: ""
      },
    }, () => {
      message.success("重置企业介绍成功，提交之前保留原来的数据");
      this.setNewState("envdelete")
    })
  }

  onRef = (ref) => {
    this.child = ref
  }

  componentDidMount() {
    this.setNewState("getenv", null, () => {
      this.setState({
        fileList: this.props.example.getenv.map((item) => {
          item.url = `http://localhost:8000/edu` + item.url;
          return item
        })
      })
    });
    this.setNewState("getaboutus", null, () => {
      this.props.example.getaboutus ?
        this.setState({
          getaboutus: this.props.example.getaboutus
        }) : ""
    });

  }

  submitAbout = () => {
    if (!this.state.getaboutus.companydesc) {
      message.warn("请输入公司简介！")
      return
    }
    if (!this.state.getaboutus.workenv) {
      message.warn("请输入办公环境！")
      return
    }
    if (!this.state.getaboutus.ourdream) {
      message.warn("请输入海学达景愿！")
      return
    }
    if (!this.state.getaboutus.plant) {
      message.warn("请输入办公面积！")
      return
    }

    this.setNewState("updateaboutus", this.state.getaboutus, () => {
      message.success("修改成功！")
    })
  }

  render() {
    const { fileList, advList, getaboutus, service } = this.state,
      { getadv } = this.props.example,
      { load1 } = this.props;

    return (
      <div className={styles.model1} style={{paddingBottom:18}}>
        <PageHead title="关于我们" subTitle="修改官网上关于我们的内容"></PageHead>
        <Tabs defaultActiveKey="1">
          <TabPane tab="企业介绍" key="1">
            <Card
              title={<span style={{ color: "#333" }}><Icon type="picture" /> 修改企业介绍</span>}
              extra={<Icon style={{ color: "#1bbcff", cursor: "pointer" }} type="eye" />}
              actions={[<a onClick={this.resetFileList}><Icon type="redo" /> 清空</a>, <a onClick={this.submitAbout}><Icon type="upload" /> 提交</a>]}
            >
              <Skeleton active loading={load1}>
                <Row gutter={24} className={styles.intro}>
                  <Col span={24}>
                    <p>公司简介:</p>
                    <Input.TextArea placeholder='请输入关于海学达的描述（最多400个字）' rows={6} maxLength={400} value={getaboutus.companydesc} onChange={(e) => {
                      getaboutus.companydesc = e.target.value
                      this.setState({
                        getaboutus
                      })
                    }} />
                  </Col>
                  <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                    <p>办公环境:</p>
                    <Input placeholder='请输入关于海学达的描述（最多60个字）' maxLength={60} value={getaboutus.workenv} onChange={(e) => {
                      getaboutus.workenv = e.target.value
                      this.setState({
                        getaboutus
                      })
                    }}></Input>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <p>办公面积(㎡):</p>
                    <InputNumber min={1} style={{ width: "100%" }} value={getaboutus.plant} onChange={(value) => {
                      getaboutus.plant = value
                      this.setState({
                        getaboutus
                      })
                    }}></InputNumber>
                  </Col>
                  <Col span={24} style={{ margin: -4 }}>
                    <p style={{ marginLeft: 4, marginBottom: 12 }}>办公环境图片：</p>
                    <Uploadpic
                      action="/edu/about/envinsert"
                      delete="envdelete"
                      update="envupdate"
                      extrakey="picname"
                      extratext="请输入图片描述"
                      onRef={this.onRef}
                      num={4}
                      fileList={fileList}>
                    </Uploadpic>
                  </Col>
                  <Col span={24}>
                    <p style={{ marginTop: 16 }}>海学达景愿:</p>
                    <Input.TextArea placeholder='请输入关于海学达的景愿（最多300个字）' rows={5} maxLength={300} value={getaboutus.ourdream} onChange={(e) => {
                      getaboutus.ourdream = e.target.value
                      this.setState({
                        getaboutus
                      })
                    }} />
                  </Col>
                </Row>
              </Skeleton>
            </Card>
          </TabPane>
          <TabPane tab="发展历程" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="企业成绩" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>



      </div>

    )
  }
}


export default Aboutus;
import Uploadpic from '../../components/Uploadpic';
import PageHead from '../../components/PageHead';
import { Component } from 'react';
import { Row, Col, Card, Icon, message, Input, Alert, Popconfirm, Skeleton, Tabs, DatePicker, Upload, Modal, Button } from 'antd';
import styles from '../IndexPage.css';
import { connect } from 'dva';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment, { now } from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { MonthPicker } = DatePicker;
const { TabPane } = Tabs;

function beforeUpload(file) {
  return false;
}


@connect(({ example, loading }) => ({
  example,
  load1: loading.effects['example/getcooperate'],
}))
class Cooperate extends Component {
  constructor() {
    super()
    this.state = {
      cooperate: {
        model: [{
          title: "",
          jumpurl: "",
          desc: "",
          totaldesc: ""
        }],
        adv: [{
          title: "",
          desc: ""
        }]
      },


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

  componentDidMount() {
    this.setNewState("getcooperate", null, () => {
      this.setState({
        cooperate: this.props.example.getcooperate
      })
    })
  }



  render() {
    const { cooperate } = this.state,
      { load1 } = this.props;
    let model = cooperate.model;
    let adv = cooperate.adv;




    return (
      <div className={styles.model1} style={{ paddingBottom: 18 }}>
        <PageHead title="合作伙伴" subTitle="修改官网上合作伙伴的内容"></PageHead>
        <Card
          title={<span style={{ color: "#333" }}><Icon type="picture" /> 修改合作伙伴</span>}
          extra={<Icon style={{ color: "#1bbcff", cursor: "pointer" }} type="eye" />}
          actions={[<a onClick={this.resetFileList}><Icon type="redo" /> 清空</a>,
          <a onClick={this.submitcooperate}><Icon type="upload" /> 提交</a>]}
        >
          <Skeleton active loading={load1}>
            <Row gutter={24} className={styles.intro}>
              <Col span={24} style={{ paddingBottom: 20, marginBottom: 20, borderBottom: "#e8e8e8 solid 1px" }}>
                <p style={{ textIndent: 12 }}>我们的优势:</p>
                {
                  adv.map((item, i) => {
                    return (
                      <Col key={i} xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} style={{ marginBottom: 18 }}>
                        <Card hoverable title={item.title ? item.title : "合作优势"} extra={
                          <Popconfirm title="是否删除该合作优势?" okText="删除" cancelText="取消" onConfirm={() => {
                            adv.splice(i, 1);
                            this.setState({ adv })
                          }}>
                            <a><Icon type="minus-circle" /> &nbsp;删除</a>
                          </Popconfirm>
                        }>
                          <Input placeholder='请输入合作优势标题' value={item.title} onChange={(e) => {
                            adv[i].title = e.target.value;
                            this.setState({
                              adv
                            })
                          }}></Input>
                          <Input.TextArea style={{ height: 100 }} rows={4} placeholder='请输入合作优势的内容(最多200字)' maxLength={200} value={item.desc} onChange={(e) => {
                            adv[i].desc = e.target.value;
                            this.setState({
                              adv
                            })
                          }} />
                        </Card>
                      </Col>
                    )
                  })
                }
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} style={{ marginBottom: 18 }}>
                  <div className={styles.Icons} style={{ height: 242 }} onClick={() => {
                    adv.push({
                      title: undefined,
                      desc: undefined,
                    });
                    this.setState({ adv })
                  }}>
                    <Icon type="plus" />
                  </div>
                </Col>

              </Col>



              <Col span={24}>
                <p>合作模式:</p>
                <Input.TextArea
                  placeholder='请输入合作模式的描述（最多600个字）'
                  rows={6}
                  maxLength={600}
                  value={cooperate.cooperatedesc}
                  onChange={(e) => {
                    cooperate.cooperatedesc = e.target.value
                    this.setState({
                      cooperate
                    })
                  }} />
              </Col>
              <Col span={24} style={{ padding: 0 }}>
                <p style={{ textIndent: 12 }}>模式分类:</p>
                {
                  model.map((item, i) => {
                    return (
                      <Col key={i} xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} style={{ marginBottom: 18 }}>
                        <Card hoverable title={item.title ? item.title : "合作模式"} extra={
                          <Popconfirm title="是否删除该合作模式?" okText="删除" cancelText="取消" onConfirm={() => {
                            model.splice(i, 1);
                            this.setState({ model })
                          }}>
                            <a><Icon type="minus-circle" /> &nbsp;删除</a>
                          </Popconfirm>
                        }>
                          <Input placeholder='请输入合作模式标题' value={item.title} onChange={(e) => {
                            model[i].title = e.target.value;
                            this.setState({
                              model
                            })
                          }}></Input>
                          <Input.TextArea style={{ height: 100 }} rows={4} placeholder='请输入合作模式的内容(最多200字)' maxLength={200} value={item.desc} onChange={(e) => {
                            model[i].desc = e.target.value;
                            this.setState({
                              model
                            })
                          }} />
                          <Input placeholder='请输入合作模式跳转地址' value={item.jumpurl} onChange={(e) => {
                            model[i].jumpurl = e.target.value;
                            this.setState({
                              model
                            })
                          }}></Input>

                        </Card>
                      </Col>
                    )
                  })
                }
                {
                  model.length < 4 && <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} style={{ marginBottom: 18 }}>
                    <div className={styles.Icons} style={{ height: 272 }} onClick={() => {
                      model.push({
                        title: "",
                        jumpurl: "",
                        desc: "",
                        totaldesc: ""
                      });
                      this.setState({ model })
                    }}>
                      <Icon type="plus" />
                    </div>
                  </Col>
                }
              </Col>

            </Row>
          </Skeleton>
        </Card>


      </div >

    )
  }
}


export default Cooperate;
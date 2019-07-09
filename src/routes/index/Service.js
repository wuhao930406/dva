import Uploadpic from '../../components/Uploadpic';
import PageHead from '../../components/PageHead';
import { Component } from 'react';
import { Row, Col, Card, Icon, message, Input, InputNumber, Popconfirm, Skeleton, Tabs, DatePicker, Upload, Modal, Button } from 'antd';
import styles from '../IndexPage.css';
import { connect } from 'dva';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { MonthPicker } = DatePicker;
const { TabPane } = Tabs;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  return false;
}


@connect(({ example, loading }) => ({
  example,
  load1: loading.effects['example/course'],
}))
class Service extends Component {
  constructor() {
    super()
    this.state = {
      fileList: [],
      loading: false,
      course: {
        coursedesc: "",
        cmodule: [{
          title: "",
          url: "",
          pdfurl: ""
        }],
        cpro: [{
          title: "",
          desc: ""
        }]
      }
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

  /*图片上传 */
  handleChange(info, i, type) {
    const isJPG = info.file.type.indexOf(type) != -1;
    if (!isJPG) {
      message.error(`只能上传${type == "image" ? "图片" : "pdf"}格式!`);
      return
    }
    if (type == "image") {
      this.setState({ loading: true });
    }
    let formData = new FormData();

    formData.append("file", info.file);
    formData.append("type", type);

    this.setNewState("insertcourse", formData, () => {
      let res = this.props.example.insertcourse;
      let imageUrl = '/edu' + res.data.url;
      let course = this.state.course;
      if (type == "image") {
        course.cmodule[i].url = imageUrl;
      } else {
        course.cmodule[i].pdfurl = imageUrl;
      }
      this.setState({
        course,
        loading: false,
      })
    })


  };

  /*清空*/
  resetFileList = () => {
    this.setState({
      course: {
        coursedesc: "",
        cmodule: [{
          title: "",
          url: "",
          pdfurl: ""
        }],
        cpro: [{
          title: "",
          desc: ""
        }]
      }
    }, () => {
      message.success("重置国际课程整体配套成功，提交之前保留原来的数据");
    })
  }

  submitCourse = () => {
    let course = this.state.course;
    if (!course.coursedesc) {
      message.warn("请输入课程简介");
      return
    }

    if (course.cmodule.length == 0) {
      message.warn("请完善课程模块");
      return
    }
    let arrs = course.cmodule.filter((item) => { return !item.title || !item.url || !item.pdfurl })
    if (course.cpro.length == 0) {
      message.warn("请完善产品介绍");
      return
    }
    let arrc = course.cpro.filter((item) => { return !item.title || !item.desc })

    if (arrs.length > 0) {
      message.warn("请完善课程模块");
      return
    }
    if (arrc.length > 0) {
      message.warn("请完善产品介绍");
      return
    }
    this.setNewState("updatecourse",course)

  }

  onRef = (ref) => {
    this.child = ref
  }

  componentDidMount() {
    this.setNewState("getcourse",null,()=>{
      this.setState({
        course:this.props.example.getcourse
      })
    })
  }





  render() {
    const { course } = this.state,
      { load1 } = this.props;
    let cmodule = course.cmodule;
    let cpro = course.cpro;

    const uploadButton = (
      <div style={{ width: 104 }}>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );





    return (
      <div className={styles.model1} style={{ paddingBottom: 18 }}>
        <PageHead title="项目与服务" subTitle="修改官网上项目与服务的内容"></PageHead>
        <Tabs defaultActiveKey="1">
          <TabPane tab="国际课程整体配套" key="1">
            <Card
              title={<span style={{ color: "#333" }}><Icon type="picture" /> 修改企业介绍</span>}
              extra={<Icon style={{ color: "#1bbcff", cursor: "pointer" }} type="eye" />}
              actions={[<a onClick={this.resetFileList}><Icon type="redo" /> 清空</a>,
              <a onClick={this.submitCourse}><Icon type="upload" /> 提交</a>]}
            >
              <Skeleton active loading={load1}>
                <Row gutter={24} className={styles.intro}>
                  <Col span={24}>
                    <p>课程简介:</p>
                    <Input.TextArea
                      placeholder='请输入课程简介的描述（最多400个字）'
                      rows={6}
                      maxLength={400}
                      value={course.coursedesc}
                      onChange={(e) => {
                        course.coursedesc = e.target.value
                        this.setState({
                          course
                        })
                      }} />
                  </Col>
                  <Col span={24} style={{ padding: 0 }}>
                    <p style={{ textIndent: 12 }}>课程模块:</p>
                    {
                      cmodule.map((item, i) => {
                        return (
                          <Col key={i} xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} style={{ marginBottom: 18 }}>
                            <Card hoverable title={item.title ? item.title : "课程模块"} extra={
                              <Popconfirm title="是否删除该课程模块?" okText="删除" cancelText="取消" onConfirm={() => {
                                cmodule.splice(i, 1);
                                this.setState({ cmodule })
                              }}>
                                <a><Icon type="minus-circle" /> &nbsp;删除</a>
                              </Popconfirm>
                            }>
                              <Input placeholder='请输入课程模块标题' value={item.title} onChange={(e) => {
                                cmodule[i].title = e.target.value;
                                this.setState({
                                  cmodule
                                })
                              }}></Input>
                              <Row>
                                <Col span={12}>
                                  <p>添加图片：</p>
                                  <div style={{ width: "100%" }}>
                                    <Upload
                                      style={{ width: 118 }}
                                      listType="picture-card"
                                      showUploadList={false}
                                      action={""}
                                      beforeUpload={(file) => beforeUpload(file)}
                                      onChange={(info) => this.handleChange(info, i, "image")}
                                    >
                                      {cmodule[i].url ? <img style={{ width: 118, height: 86 }} src={cmodule[i].url} alt="avatar" /> : uploadButton}
                                    </Upload>
                                  </div>

                                </Col>
                                <Col span={12}>
                                  <p>添加pdf：</p>
                                  <Upload
                                    showUploadList={false}
                                    action={""}
                                    beforeUpload={(file) => beforeUpload(file)}
                                    onChange={(info) => this.handleChange(info, i, "pdf")}
                                  >
                                    <Button>
                                      <Icon type="upload" /> 上传(只能上传1份)
                                  </Button>
                                  </Upload>
                                </Col>
                              </Row>

                            </Card>
                          </Col>
                        )
                      })
                    }
                    {
                      cmodule.length < 4 && <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} style={{ marginBottom: 18 }}>
                        <div className={styles.Icons} style={{ height: 272 }} onClick={() => {
                          cmodule.push({
                            title: undefined,
                            url: undefined,
                            pdfurl: undefined
                          });
                          this.setState({ cmodule })
                        }}>
                          <Icon type="plus" />
                        </div>
                      </Col>
                    }
                  </Col>

                  <Col span={24} style={{ padding: 0 }}>
                    <p style={{ textIndent: 12 }}>产品介绍:</p>
                    {
                      cpro.map((item, i) => {
                        return (
                          <Col key={i} xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} style={{ marginBottom: 18 }}>
                            <Card hoverable title={item.title ? item.title : "产品介绍"} extra={
                              <Popconfirm title="是否删除该产品介绍?" okText="删除" cancelText="取消" onConfirm={() => {
                                cpro.splice(i, 1);
                                this.setState({ cpro })
                              }}>
                                <a><Icon type="minus-circle" /> &nbsp;删除</a>
                              </Popconfirm>
                            }>
                              <Input placeholder='请输入产品介绍标题' value={item.title} onChange={(e) => {
                                cpro[i].title = e.target.value;
                                this.setState({
                                  cpro
                                })
                              }}></Input>
                              <Input.TextArea placeholder='请输入产品介绍的内容(最多400字)' maxLength={400} value={item.desc} onChange={(e) => {
                                cpro[i].desc = e.target.value;
                                this.setState({
                                  cpro
                                })
                              }} />
                            </Card>
                          </Col>
                        )
                      })
                    }
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} style={{ marginBottom: 18 }}>
                      <div className={styles.Icons} style={{ height: 210 }} onClick={() => {
                        cpro.push({
                          title: undefined,
                          desc: undefined,
                        });
                        this.setState({ cpro })
                      }}>
                        <Icon type="plus" />
                      </div>
                    </Col>

                  </Col>


                </Row>
              </Skeleton>
            </Card>
          </TabPane>
          <TabPane tab="信息化校园平台" key="2">
          </TabPane>
          <TabPane tab="大型国际教育活动" key="3">
          </TabPane>
        </Tabs>



      </div>

    )
  }
}


export default Service;
import Uploadpic from '../../components/Uploadpic';
import PageHead from '../../components/PageHead';
import { Component } from 'react';
import { Row, Col, Card, Icon, message, Input, InputNumber, Popconfirm, Skeleton, Tabs, DatePicker, Upload, Modal,Button } from 'antd';
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
        cmodule: [],
        cpro:[]
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
  handleChange(info, i,type) {

    const isJPG = info.file.type.indexOf(type) != -1;
    if (!isJPG) {
      message.error(`只能上传${type=="image"?"图片":"pdf"}格式!`);
      return
    }

    this.setState({ loading: true });
    let formData = new FormData();
    formData.append("file", info.file);
    formData.append("type", type);


    this.setNewState("insertcourse", formData, () => {
      let res = this.props.example.insertcourse;
      let imageUrl = '/edu' + res.data.url;
      let course = this.state.course;
      course.cmodule[i].url = imageUrl;
      this.setState({
        course,
        loading: false,
      })
    })


  };

  /*清空*/
  resetFileList = () => {
    message.destroy();
    if (this.child.state.fileList.length == 0) {
      message.warn("没有需要清除的办公图片")
      return
    }
    this.setState({
      fileList: [],
      course: {
        coursedesc: "",
        cmodule: []
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

  }





  render() {
    const { course } = this.state,
      { load1 } = this.props;
    let cmodule = course.cmodule;

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
              actions={[<a onClick={this.resetFileList}><Icon type="redo" /> 清空</a>, <a onClick={this.submitAbout}><Icon type="upload" /> 提交</a>]}
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
                  <p style={{ textIndent: 12 }}>课程模块:</p>
                  {
                    cmodule.map((item, i) => {
                      return (
                        <Col key={i} xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} style={{ marginBottom: 18 }}>
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
                                    beforeUpload={(file)=>beforeUpload(file,"pdf")}
                                    onChange={(info) => this.handleChange(info, i,"image")}
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
                                  beforeUpload={(file)=>beforeUpload(file,"pdf")}
                                  onChange={(info) => this.handleChange(info, i, "pdf")}
                                >
                                  <Button>
                                    <Icon type="upload" /> Upload
                                  </Button>
                                </Upload>
                              </Col>
                            </Row>

                          </Card>
                        </Col>
                      )
                    })
                  }

                  <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} style={{ marginBottom: 18 }}>
                    <div className={styles.Icons} style={{ height: 272 }} onClick={() => {
                      cmodule.push({
                        title: undefined,
                        desc: undefined
                      });
                      this.setState({ cmodule })
                    }}>
                      <Icon type="plus" />
                    </div>
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
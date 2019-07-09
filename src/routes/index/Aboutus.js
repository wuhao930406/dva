import Uploadpic from '../../components/Uploadpic';
import PageHead from '../../components/PageHead';
import { Component } from 'react';
import { Row, Col, Card, Icon, message, Input, InputNumber, Popconfirm, Skeleton, Tabs, DatePicker, Upload, Modal } from 'antd';
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
  const isJPG = file.type.indexOf('image') != -1;
  if (!isJPG) {
    message.error('只能上传图片格式!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片必须小于2MB!');
  }
  return false;
}


@connect(({ example, loading }) => ({
  example,
  load1: loading.effects['example/getaboutus'],
}))
class Aboutus extends Component {
  constructor() {
    super()
    this.state = {
      fileList: [],
      loading: false,
      getaboutus: {
        companydesc: "",
        ourdream: "",
        plant: "",
        workenv: ""
      },
      develop: [
        {
          year: "",
          desc: "",
          title: "",
          url: ""
        }
      ],
      achieve: [
        {
          totaldesc: "",
          title: "",
          desc: "",
          mores: []
        }
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

  /*图片上传 */

  handleChange(info, i) {
    this.setState({ loading: true });
    let formData = new FormData();
    formData.append("file", info.file)

    this.setNewState("insertdevlop", formData, () => {
      let res = this.props.example.insertdevlop;
      let imageUrl = '/edu' + res.data.url;
      let develop = this.state.develop;
      develop[i].url = imageUrl;
      this.setState({
        develop,
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
      getaboutus: {
        companydesc: "",
        ourdream: "",
        plant: "",
        workenv: ""
      },
    }, () => {
      message.success("重置企业介绍成功，提交之前保留原来的数据");
    })
  }

  onRef = (ref) => {
    this.child = ref
  }

  componentDidMount() {
    this.setNewState("getenv", null, () => {
      this.setState({
        fileList: this.props.example.getenv.map((item) => {
          item.url = `/edu` + item.url;
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
    this.setNewState("getdevlop", null, () => {
      this.props.example.getdevlop.length > 0 ?
        this.setState({
          develop: this.props.example.getdevlop
        }) : null
    });
    this.setNewState("getachieve", null, () => {
      let reshieve = JSON.parse(JSON.stringify(this.props.example.getachieve));
      if (reshieve.length > 0) {
        let resdata = reshieve.map((item) => {
          let more = item.mores.split("^");
          more = more.map((t, n) => {
            return {
              num: t.split("|")[0],
              leaf: t.split("|")[1],
              content: t.split("|")[2],
            }
          })
          item.mores = more
          return item
        })
        console.log(resdata)

        this.setState({
          achieve: resdata
        })

      }

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

    this.setNewState("updateaboutus", this.state.getaboutus)
  }

  resetDevelop = () => {
    let _it = this;
    Modal.confirm({
      title: '是否清空?',
      content: '清空内容后不提交，则保留原始数据',
      okText: "清空",
      cancelText: "取消",
      onOk() {
        _it.setState({
          develop: [
            {
              year: "",
              desc: "",
              title: "",
              url: ""
            }
          ]
        })
      },
      onCancel() {
      },
    });


  }

  submitDevelop = () => {
    let { develop } = this.state;
    let nullarr = develop.filter((item) => { return !item.title || !item.desc || !item.url || !item.year })
    if (nullarr.length > 0) {
      message.warn("请完善信息后提交...");
      return
    }
    this.setNewState("updatedevlop", develop, () => {

    })

  }
  resetAchieve = () => {
    let _it = this;
    Modal.confirm({
      title: '是否清空?',
      content: '清空内容后不提交，则保留原始数据',
      okText: "清空",
      cancelText: "取消",
      onOk() {
        _it.setState({
          achieve: [
            {
              totaldesc: "",
              title: "",
              desc: "",
              mores: []
            }
          ]
        })
      },
      onCancel() {
      },
    });
  }

  submitAchieve = () => {
    let achieve = JSON.parse(JSON.stringify(this.state.achieve));
    let key = 0, str = "";
    if (!achieve[0].totaldesc) {
      message.warn("请输入企业成绩概述");
      return
    }
    let postArr = achieve.map((item, i) => {
      if (!item.title || !item.desc) {
        key = 1
      }

      let more = item.mores.map((t, n) => {
        if (!t.num || !t.leaf || !t.content) {
          str += item.title + ",";
          key = 1
        }
        let oneline = t.num + "|" + t.leaf + "|" + t.content
        return oneline
      })
      let mores = more.join("^");
      item.mores = mores;
      return item
    })
    if (key == 1) {
      if (str == "") {
        message.warn("请输入标题")
      } else {
        message.warn(`请完善${str}下的信息`)
      }
      return
    }
    this.setNewState("updateachieve", postArr)


  }

  render() {
    const { fileList, develop, getaboutus, achieve } = this.state,
      { getadv } = this.props.example,
      { load1 } = this.props;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );



    return (
      <div className={styles.model1} style={{ paddingBottom: 18 }}>
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
            <Card
              title={<span style={{ color: "#333" }}><Icon type="picture" /> 修改企业发展历程</span>}
              extra={<Icon style={{ color: "#1bbcff", cursor: "pointer" }} type="eye" />}
              actions={[<a onClick={this.resetDevelop}><Icon type="redo" /> 清空</a>, <a onClick={this.submitDevelop}><Icon type="upload" /> 提交</a>]}
            >
              <Row gutter={24}>
                {
                  develop.map((item, i) => {
                    return (
                      <Col key={i} xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} style={{ marginBottom: 18 }}>
                        <Card hoverable title={item.title ? item.title : "发展历程"} extra={
                          <Popconfirm title="是否删除该历程?" okText="删除" cancelText="取消" onConfirm={() => {
                            develop.splice(i, 1);
                            this.setState({ develop })
                          }}>
                            <a><Icon type="minus-circle" /> &nbsp;删除</a>
                          </Popconfirm>
                        }>
                          <MonthPicker
                            style={{ width: "100%" }}
                            locale={"zh-cn"}
                            defaultValue={null}
                            value={item.year ? moment(item.year) : undefined}
                            onChange={(val, datastring) => {
                              develop[i].year = datastring;
                              this.setState({
                                develop
                              })
                            }}
                            placeholder='请选择时间'>
                          </MonthPicker>
                          <Input style={{ marginTop: 16 }} placeholder='请输入发展历程标题' value={item.title} onChange={(e) => {
                            develop[i].title = e.target.value;
                            this.setState({
                              develop
                            })
                          }}></Input>
                          <Input.TextArea
                            rows={6}
                            placeholder='请输入发展历程内容（最多600个字）'
                            style={{ marginTop: 16 }}
                            maxLength={600}
                            value={item.desc}
                            onChange={(e) => {
                              develop[i].desc = e.target.value;
                              this.setState({
                                develop
                              })
                            }}
                          />
                          <div style={{ marginTop: 16 }}>
                            <p>添加图片：</p>
                            <Upload
                              listType="picture-card"
                              showUploadList={false}
                              action={"/edu/about/devlopinsert"}
                              data={{ time: 0 }}
                              beforeUpload={beforeUpload}
                              onChange={(info) => this.handleChange(info, i)}
                            >
                              {develop[i].url ? <img style={{ width: 118, height: 86 }} src={develop[i].url} alt="avatar" /> : uploadButton}
                            </Upload>
                          </div>
                        </Card>
                      </Col>
                    )
                  })
                }

                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} style={{ marginBottom: 18 }}>
                  <div className={styles.Icons} style={{ height: 490 }} onClick={() => {
                    develop.push({
                      title: undefined,
                      desc: undefined
                    });
                    this.setState({ develop })
                  }}>
                    <Icon type="plus" />
                  </div>
                </Col>

              </Row>


            </Card>


          </TabPane>
          <TabPane tab="企业成绩" key="3">
            <Card
              title={<span style={{ color: "#333" }}><Icon type="picture" /> 修改企业成绩</span>}
              extra={<Icon style={{ color: "#1bbcff", cursor: "pointer" }} type="eye" />}
              actions={[<a onClick={this.resetAchieve}><Icon type="redo" /> 清空</a>, <a onClick={this.submitAchieve}><Icon type="upload" /> 提交</a>]}
            >
              <Row gutter={24}>
                <Col span={24} style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 16, color: "#45cdff" }}>企业成绩概述</p>
                  <Input.TextArea
                    maxLength={200}
                    placeholder="请输入企业成绩概述(最多200字)"
                    value={achieve[0] ? achieve[0].totaldesc : undefined}
                    onChange={(e) => {
                      achieve[0].totaldesc = e.target.value;
                      this.setState({
                        achieve
                      })
                    }}
                  />
                </Col>
                {
                  achieve.map((item, i) => {
                    return (
                      <Col key={i} xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} style={{ marginBottom: 18 }}>
                        <Card hoverable title={item.title ? item.title : "企业成绩"} extra={
                          <Popconfirm title="是否删除该企业成绩?" okText="删除" cancelText="取消" onConfirm={() => {
                            achieve.splice(i, 1);
                            this.setState({ achieve })
                          }}>
                            <a><Icon type="minus-circle" /> &nbsp;删除</a>
                          </Popconfirm>
                        }>
                          <Input style={{ marginTop: 16 }} placeholder='请输入企业成绩标题' value={item.title} onChange={(e) => {
                            achieve[i].title = e.target.value;
                            this.setState({
                              achieve
                            })
                          }}></Input>
                          <Input.TextArea
                            rows={6}
                            placeholder='请输入企业成绩内容（最多600个字）'
                            style={{ marginTop: 16 }}
                            maxLength={600}
                            value={item.desc}
                            onChange={(e) => {
                              achieve[i].desc = e.target.value;
                              this.setState({
                                achieve
                              })
                            }}
                          />
                          <p style={{ marginTop: 16 }}>添加成果：</p>
                          <Row gutter={24} >
                            {
                              item.mores.map((itemz, n) => {
                                return (
                                  <Col xxl={12} xl={12} lg={24} key={n} style={{ marginBottom: 12 }}>
                                    <Card title={<span style={{ fontSize: 14, color: "#45cdff" }}>{"成果" + (n + 1)}</span>} extra={<a onClick={() => {
                                      let achieve = this.state.achieve;
                                      let mores = achieve[i].mores;
                                      mores.splice(n, 1);
                                      achieve[i].mores = mores;
                                      this.setState({ achieve })
                                    }}>删除</a>}>

                                      <Input.Group compact style={{ display: "flex" }}>
                                        <InputNumber min={1} style={{ flex: 1 }}
                                          value={this.state.achieve[i].mores[n].num}
                                          onChange={(val) => {
                                            let achieve = this.state.achieve;
                                            let mores = achieve[i].mores;
                                            mores[n].num = val;
                                            achieve[i].mores = mores;
                                            this.setState({ achieve })
                                          }}
                                          placeholder="请输入数字"
                                        ></InputNumber>
                                        <Input style={{ flex: 1, maxWidth: 80 }}
                                          value={this.state.achieve[i].mores[n].leaf}
                                          placeholder="请输入单位"
                                          onChange={(e) => {
                                            let achieve = this.state.achieve;
                                            let mores = achieve[i].mores;
                                            mores[n].leaf = e.target.value;
                                            achieve[i].mores = mores;
                                            this.setState({ achieve })
                                          }}></Input>
                                      </Input.Group>
                                      <Input style={{ marginTop: 18 }}
                                        placeholder="请输入内容(最多16个字)"
                                        maxLength={16}
                                        value={this.state.achieve[i].mores[n].content}
                                        onChange={(e) => {
                                          let achieve = this.state.achieve;
                                          let mores = achieve[i].mores;
                                          mores[n].content = e.target.value;
                                          achieve[i].mores = mores;
                                          this.setState({ achieve })
                                        }}>
                                      </Input>

                                    </Card>
                                  </Col>
                                )

                              })
                            }
                            {
                              achieve[i].mores.length < 6 && <Col xxl={12} xl={12} lg={24}
                                style={{ height: 160, marginBottom: 12 }} onClick={() => {
                                  let achieve = this.state.achieve;
                                  achieve[i].mores.push({
                                    num: "",
                                    leaf: "",
                                    content: "",
                                  });
                                  this.setState({
                                    achieve
                                  })
                                }}>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 160, border: "#45cdff dashed 1px", cursor: "pointer" }}>
                                  添加
                                </div>
                              </Col>
                            }
                          </Row>
                        </Card>
                      </Col>
                    )
                  })
                }
                {
                  achieve.length < 4 &&
                  <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} style={{ marginBottom: 18 }}>
                    <div className={styles.Icons} style={{ height: 500 }} onClick={() => {
                      achieve.push({
                        title: undefined,
                        desc: undefined,
                        mores: []
                      });
                      this.setState({ achieve })
                    }}>
                      <Icon type="plus" />
                    </div>
                  </Col>
                }

              </Row>


            </Card>
          </TabPane>
        </Tabs>



      </div>

    )
  }
}


export default Aboutus;
import Uploadpic from '../../components/Uploadpic';
import PageHead from '../../components/PageHead';
import { Component } from 'react';
import { Row, Col, Card, Icon, message, Input, Popconfirm } from 'antd';
import styles from '../IndexPage.css';
import { connect } from 'dva';

@connect(({ example }) => ({
  example
}))
class Page extends Component {
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
      companydesc: "",
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
      message.warn("没有需要清除的banner")
      return
    }

    this.setState({
      fileList: []
    }, () => {
      this.setNewState("bannerdelete")
    })
  }

  onRef = (ref) => {
    this.child = ref
  }

  componentDidMount() {
    this.setNewState("getall", null, () => {
      this.setState({
        fileList: this.props.example.getall.map((item) => {
          item.url = `http://localhost:8000/edu` + item.url;
          return item
        })
      })
    });
    this.setNewState("getadv", null, () => {
      this.props.example.getadv.length == 0 ? "" :
        this.setState({
          advList: this.props.example.getadv
        })
    });

    this.setNewState("getaboutus", null, () => {
      this.props.example.getaboutus.companydesc ?
        this.setState({
          companydesc: this.props.example.getaboutus.companydesc
        }) : ""
    });
    // getservice, updateservice
    this.setNewState("getservice", null, () => {
      this.props.example.getservice.length != 0 ?
        this.setState({
          service: this.props.example.getservice
        }) : ""
    });

  }

  resetAdvance = () => {
    this.setState({
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
      ]
    }, () => {
      message.success("重置海学达优势成功，提交之前保留原来的数据")
    })
  }

  submitAdvance = () => {
    let advList = this.state.advList;
    let nullarr = advList.filter((item, i) => {
      return item.title == "" || item.desc == ""
    })
    if (nullarr.length != 0) {
      message.warn("请完善提交信息!")
      return
    }
    this.setNewState("updateadv", advList, () => {
      message.success("提交成功！")
    })
  }


  submitAbout = () => {
    if (!this.state.companydesc) {
      message.warn("请输入公司简介！")
      return
    }
    this.setNewState("updateaboutus", { companydesc: this.state.companydesc }, () => {
      message.success("修改成功！")
    })
  }


  resetService = () => {
    this.setState({
      service: [
      ]
    }, () => {
      message.success("重置海学达服务成功，提交之前保留原来的数据")
    })
  }

  submitService = () => {
    let service = this.state.service;
    let nullarr = service.filter((item, i) => {
      return !item.title || !item.desc
    })
    if (nullarr.length != 0 || service.length == 0) {
      message.warn("请完善提交信息,至少保留1条服务！")
      return
    }
    this.setNewState("updateservice", service, () => {
      message.success("提交成功！")
    })
  }


  render() {
    const { fileList, advList, companydesc, service } = this.state,
      { getadv } = this.props.example;

    return (
      <div className={styles.model1}>
        <PageHead title="首页" subTitle="修改官网上首页的内容"></PageHead>
        <Row>
          <Col>
            <Card
              title={<span style={{ color: "#333" }}><Icon type="picture" /> 修改banner图</span>}
              extra={<Icon style={{ color: "#1bbcff", cursor: "pointer" }} type="eye" />}
              actions={[<a onClick={this.resetFileList}><Icon type="redo" /> 清空</a>]}
            >
              <Uploadpic 
              action="/edu/page/bannerinsert" 
              delete="bannerdelete"
              update="bannerupdate" 
              extrakey="jumpurl"
              extratext="banner跳转地址"
              onRef={this.onRef} 
              num={6} 
              fileList={fileList}></Uploadpic>
            </Card>
          </Col>
          <Col style={{ marginTop: 18 }}>
            <div className={styles.setcard}>
              <Card
                bordered={false}
                style={{ backgroundColor: "#737373" }}
                title={<span style={{ color: "#fff" }}><Icon type="check-circle" /> 海学达国际教育的优势</span>}
                extra={<Icon style={{ color: "#fff", cursor: "pointer" }} type="eye" />}
                actions={[<a onClick={this.resetAdvance}><Icon type="redo" /> 清空</a>, <a onClick={this.submitAdvance}><Icon type="upload" /> 提交</a>]}
              >
                <Row gutter={24}>
                  <Col style={{ margin: "6px 0px", padding: "12px" }} xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <p>优势1</p>
                    <Input placeholder='请输入优势1标题' value={advList[0].title} onChange={(e) => {
                      advList[0].title = e.target.value;
                      this.setState({
                        advList: advList
                      })
                    }}></Input>
                    <Input.TextArea rows={6} placeholder='请输入优势1描述（最多48个字）' style={{ marginTop: 16 }} maxLength={48} value={advList[0].desc} onChange={(e) => {
                      advList[0].desc = e.target.value;
                      this.setState({
                        advList: advList
                      })
                    }} />
                  </Col>
                  <Col style={{ margin: "6px 0px", padding: "12px", borderLeft: "#F0F0F0 solid 1px", borderRight: "#F0F0F0 solid 1px", boxSizing: "border-box" }} xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <p>优势2</p>
                    <Input placeholder='请输入优势2标题' value={advList[1].title} onChange={(e) => {
                      advList[1].title = e.target.value;
                      this.setState({
                        advList: advList
                      })
                    }}></Input>
                    <Input.TextArea rows={6} placeholder='请输入优势2描述（最多48个字）' style={{ marginTop: 16 }} maxLength={48} value={advList[1].desc} onChange={(e) => {
                      advList[1].desc = e.target.value;
                      this.setState({
                        advList: advList
                      })
                    }} />
                  </Col>
                  <Col style={{ margin: "6px 0px", padding: "12px" }} xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <p>优势3</p>
                    <Input placeholder='请输入优势3标题' value={advList[2].title} onChange={(e) => {
                      advList[2].title = e.target.value;
                      this.setState({
                        advList: advList
                      })
                    }}></Input>
                    <Input.TextArea rows={6} placeholder='请输入优势3描述（最多48个字）' style={{ marginTop: 16 }} maxLength={48} value={advList[2].desc} onChange={(e) => {
                      advList[2].desc = e.target.value;
                      this.setState({
                        advList: advList
                      })
                    }} />
                  </Col>
                </Row>

              </Card>

            </div>
          </Col>
          <Col style={{ marginTop: 18 }}>
            <Card
              title={<span style={{ color: "#333" }}><Icon type="question-circle" /> 关于海学达</span>}
              extra={<Icon style={{ color: "#1bbcff", cursor: "pointer" }} type="eye" />}
              actions={[<a onClick={this.submitAbout}><Icon type="upload" /> 提交</a>]}
            >
              <Input.TextArea placeholder='请输入关于海学达的描述（最多400个字）' rows={6} maxLength={400} value={companydesc} onChange={(e) => {
                this.setState({
                  companydesc: e.target.value
                })
              }} />
            </Card>
          </Col>
          <Col style={{ marginTop: 18 }}>
            <Card
              title={<span style={{ color: "#333" }}><Icon type="team" /> 项目与服务</span>}
              extra={<Icon style={{ color: "#1bbcff", cursor: "pointer" }} type="eye" />}
              actions={[<a onClick={this.resetService}><Icon type="redo" /> 清空</a>, <a onClick={this.submitService}><Icon type="upload" /> 提交</a>]}
            >
              <Row gutter={24} style={{ paddingTop: 18 }}>
                {
                  service.map((item, i) => {
                    return (<Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} style={{ marginBottom: 18 }}>
                      <Card hoverable title={item.title ? item.title : "服务标题"} extra={
                        <Popconfirm >
                          <a onClick={() => {
                            service.splice(i, 1);
                            this.setState({ service })

                          }}><Icon type="minus-circle" /> &nbsp;删除</a>
                        </Popconfirm>
                      }>
                        <Input placeholder='请输入服务标题' value={item.title} onChange={(e) => {
                          service[i].title = e.target.value;
                          this.setState({
                            service
                          })
                        }}></Input>
                        <Input.TextArea
                          rows={6}
                          placeholder='请输入服务描述（最多80个字）'
                          style={{ marginTop: 16 }}
                          maxLength={80}
                          value={item.desc}
                          onChange={(e) => {
                            service[i].desc = e.target.value;
                            this.setState({
                              service
                            })
                          }}
                        />
                      </Card>
                    </Col>)

                  })
                }
                {
                  service.length < 6 && <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} style={{ marginBottom: 18 }}>
                    <div className={styles.Icons} onClick={() => {
                      service.push({
                        title: undefined,
                        desc: undefined
                      });
                      this.setState({ service })
                    }}>
                      <Icon type="plus" />
                    </div>
                  </Col>
                }


              </Row>




            </Card>
          </Col>

        </Row>


      </div>

    )
  }
}


export default Page;
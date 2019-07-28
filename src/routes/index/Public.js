import Uploadpic from '../../components/Uploadpic';
import PageHead from '../../components/PageHead';
import { Component } from 'react';
import { Row, Col, Card, Icon, message, Input, Alert, Popconfirm, Skeleton, Tabs, DatePicker, Upload, Modal, Button, Form, Table } from 'antd';
import styles from '../IndexPage.css';
import { connect } from 'dva';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment, { now } from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { MonthPicker } = DatePicker;
const { TabPane } = Tabs;


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
  load1: loading.effects['example/getpublic'],
}))
class Public extends Component {
  constructor() {
    super();
    let publiclist = ["About", "Develop", "Achiev", "Internation", "School", "Activity", "Partner", "Contact"].map((item) => {
      return {
        title: item,
        bacurl: "",
        desc: ""
      }
    })
    this.state = {
      publiclist,
      selectedRowKeys: [],
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

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };


  componentDidMount() {
    //getpublic,insertpublic,updatepublic
    this.setNewState("getwx")
    this.setNewState("getpublic", null, () => {
      let res = this.props.example.getpublic;
      if (res.length == 0) {
        return
      }
      this.setState({
        publiclist: res
      })
    })
  }


  /*图片上传 */

  handleChange(info, i) {
    this.setState({ loading: true });
    let formData = new FormData();
    formData.append("file", info.file)

    this.setNewState("insertpublic", formData, () => {
      let res = this.props.example.insertpublic;
      let imageUrl = '/edu' + res.data.url;
      let publiclist = this.state.publiclist;
      publiclist[i].bacurl = imageUrl;
      this.setState({
        publiclist,
        loading: false,
      })
    })


  };

  submitpublic = () => {
    let publiclist = this.state.publiclist;
    let arr = publiclist.filter((item) => { return !item.desc || !item.bacurl });
    if (arr.length > 0) {
      message.warn("页面上的内容全部必填，请完善后提交")
    }
    this.setNewState("updatepublic", publiclist)

  }


  ondelete(key) {
    this.setNewState("deletewx", { id: key }, () => {
      this.setNewState("getwx")
    })
  }


  render() {
    const { imageUrl, publiclist,selectedRowKeys } = this.state,
      { load1, example } = this.props, { getwx } = example;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const { getFieldDecorator } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );

    let mostcol = {
      xxl: 8,
      xl: 8,
      xs: 24,
      sm: 12,
      md: 12,
      lg: 8
    }

    function getTitle(key) {
      let name = ""
      switch (key) {
        case "About":
          name = "企业介绍"
          break;
        case "Develop":
          name = "发展历程"
          break;
        case "Achiev":
          name = "企业成绩"
          break;
        case "Internation":
          name = "国际课程整体配套"
          break;
        case "School":
          name = "信息化校园平台"
          break;
        case "Activity":
          name = "大型国际教育活动"
          break;
        case "Partner":
          name = "合作伙伴"
          break;
        case "Contact":
          name = "联系我们"
          break;
      }
      return name
    }


    const getItem = (item, i) => {

      return (
        <Col key={i} {...mostcol} style={{ marginBottom: 20 }}>
          <Card title={getTitle(item.title)} hoverable={true}>
            <Input.TextArea
              rows={6}
              placeholder='请输入发展历程内容（最多600个字）'
              style={{ marginTop: 16 }}
              maxLength={600}
              value={item.desc}
              onChange={(e) => {
                publiclist[i].desc = e.target.value;
                this.setState({
                  publiclist
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
                {publiclist[i].bacurl ? <img style={{ width: 118, height: 86 }} src={publiclist[i].bacurl} alt="avatar" /> : uploadButton}
              </Upload>
            </div>
          </Card>

        </Col>
      )


    }

    const columns = [
      {
        title: '姓名',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
        render: text => <a href={`tel:${text}`}>{text}</a>,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '留言内容',
        dataIndex: 'message',
        key: 'message',
      },
      {
        title: "操作",
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          return (
            <Popconfirm title="是否删除该留言?" okText="删除" cancelText="取消" onConfirm={() => {
              this.ondelete([record.id])
            }}>
              <a><Icon type="minus-circle" /> &nbsp;删除</a>
            </Popconfirm>

          )


        }
      }


    ]


    return (
      <div className={styles.model1} style={{ paddingBottom: 18 }}>
        <PageHead title="公共模块" subTitle="修改官网上公共模块的内容"></PageHead>
        <Tabs defaultActiveKey="1">
          <TabPane tab="各模块描述&banner图" key="1">
            <Card
              title={<span style={{ color: "#333" }}><Icon type="picture" /> 修改公共模块</span>}
              extra={<Icon style={{ color: "#1bbcff", cursor: "pointer" }} type="eye" />}
              actions={[<a onClick={this.resetFileList}><Icon type="redo" /> 清空</a>,
              <a onClick={this.submitpublic}><Icon type="upload" /> 提交</a>]}
            >
              <Skeleton active loading={load1}>
                <Row gutter={24}>
                  {
                    publiclist ?
                      publiclist.map((item, i) => {
                        return getItem(item, i)
                      }) : null
                  }
                </Row>

              </Skeleton>
            </Card>
          </TabPane>
          <TabPane tab="微信公众号留言表" key="2">
            <div style={{ display: "block", padding: 10 }}>
              <Row style={{marginBottom:20,display:"flex",justifyContent:"flex-end"}}>
                <Button onClick={()=>{this.setNewState("getwx",null,()=>{message.success("数据刷新成功")})}} style={{marginRight:10}}><Icon type="redo"/> 刷新数据</Button>

                <Button type="danger" onClick={()=>{
                  if(selectedRowKeys.length==0){
                    message.warn("请选择需要删除的项");
                    return
                  }
                  this.ondelete(selectedRowKeys)}}><Icon type="delete" /> 批量删除</Button>
              </Row>
              <Table
                dataSource={getwx}
                columns={columns}
                rowKey="id"
                rowSelection={rowSelection}
              >

              </Table>

            </div>




          </TabPane>
        </Tabs>


      </div >

    )
  }
}

Public = Form.create("publicus")(Public);

export default Public;
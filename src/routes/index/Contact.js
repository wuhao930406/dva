import Uploadpic from '../../components/Uploadpic';
import PageHead from '../../components/PageHead';
import { Component } from 'react';
import { Row, Col, Card, Icon, message, Input, Alert, Popconfirm, Skeleton, Tabs, DatePicker, Upload, Modal, Button, Form } from 'antd';
import styles from '../IndexPage.css';
import { connect } from 'dva';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment, { now } from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { MonthPicker } = DatePicker;
const { TabPane } = Tabs;


function beforeUpload(file) {
  const isJPG = file.type.indexOf('image') !== -1;
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}


@connect(({ example, loading }) => ({
  example,
  load1: loading.effects['example/getcontact'],
}))
class Contact extends Component {
  constructor() {
    super()
    this.state = {
      contact: {

      },
      imageUrl: ""


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
    this.setNewState("getcontact", null, () => {
      this.setState({
        contact: this.props.example.getcontact
      })

    })
  }

  resetFileList = () => {
    message.destroy();
    this.setState({
      contact: {
      }
    }, () => {
      message.success("重置联系我们成功，提交之前保留原来的数据");
    })


  }


  submitcontact = () => {


    //this.setNewState("updatecontact", this.state.contact)

  }


  normFile = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      let imageUrl = info.file.response.data.url;
      this.setState({
        imageUrl:imageUrl?`/edu${imageUrl}`:"",
        loading: false
      })
    }
    if (Array.isArray(info)) {
      return info;
    }
    return info && info.fileList;
  };


  render() {
    const { contact, imageUrl } = this.state,
      { load1 } = this.props;

    const { getFieldDecorator } = this.props.form;


    let model = contact.model;
    let adv = contact.adv;
    let mostcol = {
      xxl: 8,
      xl: 8,
      xs: 24,
      sm: 12,
      md: 12,
      lg: 8
    }

    const uploadButton = (
      <div style={{width:102}}>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className={styles.model1} style={{ paddingBottom: 18 }}>
        <PageHead title="联系我们" subTitle="修改官网上联系我们的内容"></PageHead>
        <Card
          title={<span style={{ color: "#333" }}><Icon type="picture" /> 修改联系我们</span>}
          extra={<Icon style={{ color: "#1bbcff", cursor: "pointer" }} type="eye" />}
          actions={[<a onClick={this.resetFileList}><Icon type="redo" /> 清空</a>,
          <a onClick={this.submitcontact}><Icon type="upload" /> 提交</a>]}
        >
          <Skeleton active loading={load1}>
            <Row gutter={24} className={styles.intro}>
              <Form>
                <Col {...mostcol}>
                  <Form.Item label="地址">
                    {getFieldDecorator('address', {
                      rules: [{ required: true, message: '请输入地址!' }],
                    })(
                      <Input
                        prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入地址"
                      />,
                    )}
                  </Form.Item>
                </Col>
                <Col {...mostcol}>
                  <Form.Item label="联系电话">
                    {getFieldDecorator('phone', {
                      rules: [{ required: true, message: '请输入联系电话!' }],
                    })(
                      <Input
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入联系电话"
                      />,
                    )}
                  </Form.Item>
                </Col>
                <Col {...mostcol}>
                  <Form.Item label="客服QQ">
                    {getFieldDecorator('qq', {
                      rules: [{ required: true, message: '请输入客服QQ!' }],
                    })(
                      <Input
                        prefix={<Icon type="qq" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入客服QQ"
                      />,
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="上传公众号二维码">
                    {getFieldDecorator('qrcode', {
                      rules: [{ required: true, message: '请上传公众号二维码!' }],
                      getValueFromEvent: this.normFile,
                    })(
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="/edu/contact/insertqrcode"
                        beforeUpload={beforeUpload}
                      >
                        {imageUrl ? <img style={{width:102,height:86}} src={imageUrl} alt="avatar" /> : uploadButton}
                      </Upload>,
                    )}
                  </Form.Item>
                </Col>



              </Form>




            </Row>
          </Skeleton>
        </Card>


      </div >

    )
  }
}

Contact = Form.create("contactus")(Contact);

export default Contact;
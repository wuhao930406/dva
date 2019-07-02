import Uploadpic from '../../components/Uploadpic';
import PageHead from '../../components/PageHead';
import { Component } from 'react';
import { Row, Col, Card, Icon, message, Input } from 'antd';
import styles from '../IndexPage.css';
import { connect } from 'dva';
import Item from 'antd/lib/list/Item';

@connect(({ example }) => ({
  example
}))
class Page extends Component {
  constructor() {
    super()
    this.state = {
      fileList: [],
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
    })
  }

  render() {
    const { fileList } = this.state;

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
              <Uploadpic action="/edu/page/bannerinsert" delete="bannerdelete" data={1} onRef={this.onRef} num={3} fileList={fileList}></Uploadpic>
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
                    <Input placeholder='请输入优势1标题'></Input>
                    <Input.TextArea placeholder='请输入优势1描述（最多48个字）' style={{ marginTop: 16 }} maxLength={48} />
                  </Col>
                  <Col style={{ margin: "6px 0px", padding: "12px", borderLeft: "#F0F0F0 solid 1px", borderRight: "#F0F0F0 solid 1px", boxSizing: "border-box" }} xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <p>优势2</p>
                    <Input placeholder='请输入优势2标题'></Input>
                    <Input.TextArea placeholder='请输入优势2描述（最多48个字）' style={{ marginTop: 16 }} maxLength={48} />
                  </Col>
                  <Col style={{ margin: "6px 0px", padding: "12px" }} xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <p>优势3</p>
                    <Input placeholder='请输入优势3标题'></Input>
                    <Input.TextArea placeholder='请输入优势3描述（最多48个字）' style={{ marginTop: 16 }} maxLength={48} />
                  </Col>
                </Row>

              </Card>

            </div>
          </Col>

          <Col style={{ marginTop: 18 }}>
            <Card
              title={<span style={{ color: "#333" }}><Icon type="question-circle" /> 关于海学达</span>}
              extra={<Icon style={{ color: "#1bbcff", cursor: "pointer" }} type="eye" />}
              actions={[<a onClick={this.submitAdvance}><Icon type="upload" /> 提交</a>]}
            >
              <Input.TextArea placeholder='请输入关于海学达的描述（最多280个字）' allowClear rows={6} maxLength={280} />
            </Card>
          </Col>
          
          <Col style={{ marginTop: 18 }}>
            <Card
              title={<span style={{ color: "#333" }}><Icon type="team" /> 项目与服务</span>}
              extra={<Icon style={{ color: "#1bbcff", cursor: "pointer" }} type="eye" />}
              actions={[<a onClick={this.resetAdvance}><Icon type="redo" /> 清空</a>,<a onClick={this.submitAdvance}><Icon type="upload" /> 提交</a>]}
            >
              <Row>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Input placeholder='请输入服务1标题'></Input>
                    <Input.TextArea placeholder='请输入服务1描述（最多80个字）' style={{ marginTop: 16 }} maxLength={80} />
                </Col>

              </Row>

              <div className={styles.Icons}>
                <Icon type="plus" />
              </div>


            </Card>
          </Col>





        </Row>


      </div>

    )
  }
}


export default Page;
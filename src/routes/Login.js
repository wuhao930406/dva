import React,{Component} from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './IndexPage.css';
import moment from 'moment';
import { Link,withRouter } from 'dva/router';
@connect(({ example,loading }) => ({
  example,
  loads:loading.effects['example/login'],
}))
class Login extends Component{
  constructor(props){
     super(props);
     this.t = null;
     let time = moment(new Date().getTime()).format("YYYY-MM-DD | HH:mm:ss");
     this.state={
       time:this.getArrTime(time)
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

  getArrTime(time){
    let arr = []
    for(let i=0;i<time.length;i++){
      arr.push(time[i]);
    }
    return arr
  }

  componentDidMount(){
    this.t = setInterval(() => {
      let time = moment(new Date().getTime()).format("YYYY-MM-DD | HH:mm:ss");
      this.setState({
        time:this.getArrTime(time)
      })  
    }, 1000);

  }

  componentWillUnmount(){

    clearInterval(this.t)

  }

  handleSubmit = e => {
    e.preventDefault();
  
    this.props.form.validateFields((err, values) => {
      if (!err) {
       //登录！！
        this.setNewState("login",{username:values.username,password:values.password},(res)=>{
          this.setNewState("redirect",{url:"/main"})
        })

      }
    });
  };

  render(){
    const { getFieldDecorator } = this.props.form;
    let { time } = this.state;
    return (
      <div className={styles.loginbac}>
        <p className={styles.timetable}>
          <Icon type="clock-circle" 
          style={{float:"left",marginTop:6,marginRight:10}}/>
          { 
            time.map((item,i)=>{
               return !item||item=="|"?<span key={i} className={styles.jiange}></span>:<span key={i} className={styles.zifu}>{item}</span> 
            })
          }
        </p>
        <img className={styles.logo} src="./assets/images/logo.png" alt=""/>
        <div className={styles.loginbox}>
          <div className={styles.icongroup}>
            <img src="./assets/images/icon_login_01.png" alt=""/>
            <img src="./assets/images/icon_login_01.png" alt=""/>
          </div>  


          <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input
                size="large"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                size="large"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住密码</Checkbox>)}
            <Button loading={this.props.loads} size="large" type="primary" htmlType="submit" className="login-form-button" style={{width:"100%",marginTop:12}}>
              立即登录
            </Button>
          </Form.Item>
        </Form>
        </div>
        <p className={styles.footer}>xxxx管理平台，designed by wuhao</p>    
  
      </div>
    );
  }
}


Login =  Form.create({ name: 'normal_login' })(Login)//挂载Form

export default withRouter(Login);

import { Upload, Icon, Modal,Input,message } from 'antd';
import React from 'react'
import styles from './style.css';
import { connect } from 'dva';


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@connect(({ example }) => ({
  example
}))
class Uploadpic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      previewVisible: false,
      confirmLoading:false,
      previewImage: '',
      fileList:props.fileList,
      postData:{}
    };
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

  /*隐藏*/
  handleCancel = () => this.setState({ previewVisible: false });

  /*提交*/
  handleOk = () => {
    this.setState({ confirmLoading: true });
    let { postData } = this.state;
    this.setNewState(this.props.update,postData,()=>{
      this.setState({ confirmLoading: false,previewVisible:false });
    });
  }

  /*查看*/
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    let extrakey = this.props.extrakey;
    this.setState({
      previewImage: file.url || file.preview,
      previewUrl: file[extrakey],
      previewVisible: true,
    });
  };

  /*限制上传*/
  handlebeforeUpload = file => {
    const isJPG = file.type.indexOf("image")!=-1;
    if (!isJPG) {
      message.error('只能上传图片格式!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小需小于2MB!');
    }
    return isJPG && isLt2M;

  }

  /*修改*/
  handleChange = ({ fileList,file,event }) => {
    const isJPG = file.type.indexOf("image")!=-1;
    const isLt2M = file.size / 1024 / 1024 < 2;
    const res = file.response;
    if(res){
      if(res.code==200){
        message.success(res.message);
      }else{
        message.error(res.message)
      }
    }
    if(isJPG && isLt2M || !file.size){
      this.setState({ fileList })
    }
  };

  /*删除*/
  handleRemove = (file) => {
    this.setNewState(this.props.delete,{uid:file.uid})  
  };

  componentWillReceiveProps(nextProps){
    if(this.props.fileList!=nextProps.fileList){
      this.setState({
        fileList:nextProps.fileList
      })
    }
  }

  componentDidMount(){
    this.props.onRef?this.props.onRef(this):null;
  }

  getData=(file)=>{
    return {
      uid:file.uid,
      name:file.name,
      type:file.type
    }
  }

  render() {
    const { previewVisible, previewImage, fileList,previewUrl,confirmLoading } = this.state,
    {num,action,extratext,extrakey} = this.props;
    const uploadButton = (
      <div>
        <div className={styles.upload} >
        </div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={action}
          listType="picture-card"
          fileList={fileList}
          data = {this.getData}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}  
          beforeUpload = {this.handlebeforeUpload}
        >
          {fileList.length >= num ? null : uploadButton}
        </Upload>
        <Modal 
          visible={previewVisible} 
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          okText="提交"
          cancelText="取消"
          confirmLoading={confirmLoading}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
          <div>
            <p style={{margin:"18px 0px 16px 0px"}}>
              {extratext}:
            </p>
            <Input value={previewUrl} onChange={(e)=>{
                let val = e.target.value,curuid,
                    newfileList = fileList.map((Item)=>{
                    if(Item.url==previewImage || Item.preview==previewImage){
                      Item[extrakey] = val
                      curuid = Item.uid;
                    }
                    return Item
                  })
               let postData = {uid:curuid};
               postData[extrakey] = val   
               this.setState({
                  previewUrl:val,
                  fileList:newfileList,
                  postData
               })
            }}></Input>
          </div>
          
        </Modal>
      </div>
    );
  }
}

export default Uploadpic
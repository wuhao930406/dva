import { Upload, Icon, Modal,Input } from 'antd';
import React from 'react'
import styles from './style.css';
import Item from 'antd/lib/list/Item';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class Uploadpic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList:props.fileList,
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewUrl:file.jumpurl,
      previewVisible: true,
    });
  };

  handlebeforeUpload = file => {
    this.setState(state => ({
      fileList: [...state.fileList, file],
    }));
    return false;
  }

  handleChange = ({ fileList }) => this.setState({ fileList });


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
  render() {
    const { previewVisible, previewImage, fileList,previewUrl } = this.state,
    {num} = this.props;
    const uploadButton = (
      <div>
        <div className={styles.upload} >
        </div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload = {this.handlebeforeUpload}
        >
          {fileList.length >= num ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
          <div>
            <p style={{margin:8}}>
              banner跳转地址:
            </p>
            <Input value={previewUrl} onChange={(e)=>{
               let val = e.target.value,
                   newfileList = fileList.map((Item)=>{
                    if(Item.url==previewImage||Item.preview==previewImage){
                      Item.jumpurl = val
                    }
                    return Item
                   }) 
               this.setState({
                previewUrl:val,
                fileList:newfileList
               })
            }}></Input>
          </div>
          
        </Modal>
      </div>
    );
  }
}

export default Uploadpic
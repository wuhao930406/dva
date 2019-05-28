import { Upload, Icon, Modal } from 'antd';
import React from 'react'


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
    fileList:props.fileList 
  };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
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

  render() {
    const { previewVisible, previewImage, fileList } = this.state,
    {num} = this.props;
    const uploadButton = (
      <div>
        <div style={{width:"100%",height:86,background:"url(../assets/images/upload.png) no-repeat center",backgroundSize:"contain"}}></div>
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
        </Modal>
      </div>
    );
  }
}

export default Uploadpic
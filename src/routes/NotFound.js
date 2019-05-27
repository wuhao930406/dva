
import styles from './IndexPage.css';
import { Link } from 'dva/router';
import { Tag,Icon } from 'antd';
const NotFound = ({children}) => {
    return (
      <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}> 
      <div className={styles.notfound}>
        <img src="./assets/images/404cloud.png" alt=""/> 
        <img src="./assets/images/404cloud.png" alt=""/> 
        <img src="./assets/images/404cloud.png" alt=""/> 
        <img className={styles.notfoundbac}  src="./assets/images/404.png" alt=""/>
      </div>
      <div className={styles.tip}>
          没有找到您要的页面哦~
          <br/>
          <Tag color="#2db7f5" style={{paddingBottom:2}}>
            <Icon type="link" />
            <Link to='/main/index'>点击返回首页</Link>
          </Tag>
      </div>
      </div> 
    );
  };
  
NotFound.propTypes = {
};
  
  export default NotFound;
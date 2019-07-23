import { Row,Col,Card,Icon,PageHeader  } from 'antd';
import { Link } from 'dva/router';
import styles from '../IndexPage.css';
const HomePage = ({children}) => {
  const models = [{name:'首页',icon:"home",path:"/main/page"}, 
  {name:'关于我们',icon:"user",path:"/main/aboutus"}, 
  {name:'项目与服务',icon:"profile",path:"/main/service"}, 
  {name:'合作伙伴',icon:"api",path:"/main/cooperate"}, 
  {name:'联系我们',icon:"phone",path:"/main/contact"}, 
  {name:'模块6',icon:"snippets",path:"/page"}];
    return (
      <Row>
        <Col className={styles.banner} style={{height:300,width:"auto"}}>
        </Col>
        <PageHeader style={{padding:"16px 6px"}} onBack={() => null} backIcon={<Icon type="caret-down" />} title="系统简介" subTitle="系统使用简单介绍" />
        <p style={{margin:"0 6px 6px 6px",padding:"6px 8px",background:"#f9f9f9"}}>描述文字描述文字描述文字描述文字第描述文字描述文字描述文字描述文字第一吧第第描述文字描述文字描述文字描述文字第一吧第第描述文字描述文字描述文字描述文字第一吧第第描述文字描述文字描述文字描述文字第一吧第第描述文字描述文字描述文字描</p>
        <PageHeader style={{padding:"16px 6px"}} onBack={() => null} backIcon={<Icon type="caret-down" />} title="功能模块" subTitle="每个模块对应管理" />
        {
          models.map((item,i)=>(
          <Col key={i} xs={12} sm={8} md={8} lg={8} xl={8} style={{padding:6}}>
            <Link to={item.path}>
              <Card hoverable className={styles.flexcolumn}>
                <p className={styles.iconp}>
                  <Icon style={{fontSize:36,marginBottom:12}} type={item.icon} /><br/>
                  {item.name}
                </p>
              </Card>
            </Link>
          </Col> ))
        }
         
        
      </Row>
    );
  };
  
  HomePage.propTypes = {
  };
  
  export default HomePage;
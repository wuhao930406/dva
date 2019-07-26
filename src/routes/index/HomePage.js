import { Row,Col,Card,Icon,PageHeader  } from 'antd';
import { Link } from 'dva/router';
import styles from '../IndexPage.css';
const HomePage = ({children}) => {
  const models = [{name:'首页',icon:"home",path:"/main/page"}, 
  {name:'关于我们',icon:"user",path:"/main/aboutus"}, 
  {name:'项目与服务',icon:"profile",path:"/main/service"}, 
  {name:'合作伙伴',icon:"api",path:"/main/cooperate"}, 
  {name:'联系我们',icon:"phone",path:"/main/contact"}, 
  {name:'公共模块',icon:"snippets",path:"/main/public"}];
    return (
      <Row>
        <Col className={styles.banner} style={{height:300,width:"auto"}}>
        </Col>
        <PageHeader style={{padding:"16px 6px"}} onBack={() => null} backIcon={<Icon type="caret-down" />} title="系统简介" subTitle="对于官网上各个模块的自定义编辑" />
        <p style={{margin:"0 6px 6px 6px",padding:"6px 8px",background:"#f9f9f9"}}>提供官方网站上所有内容的维护！若功能模块需要调整请联系<a href="tel:18351061956">开发人员</a></p>
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
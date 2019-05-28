import { Row,Col,Card,Icon,PageHeader  } from 'antd';
import { Link } from 'dva/router';
import styles from '../IndexPage.css';
const HomePage = ({children}) => {
  const models = [{name:'模块1',icon:"edit",path:"/main/page"}, 
  {name:'模块2',icon:"form",path:"/page"}, 
  {name:'模块3',icon:"copy",path:"/page"}, 
  {name:'模块4',icon:"scissor",path:"/page"}, 
  {name:'模块5',icon:"delete",path:"/page"}, 
  {name:'模块6',icon:"snippets",path:"/page"}];
    return (
      <Row>
        <Col className={styles.banner} style={{height:300,width:"auto"}}>
            <div className={styles.says} style={{width:1000,height:1000}}>
              <p>描述文字描述文字描述文字描述文字第描述文字描述文字描述文字描述文字第一吧第第描述文字描述文字描述文字描述文字第一吧第第描述文字描述文字描述文字描述文字第一吧第第描述文字描述文字描述文字描述文字第一吧第第描述文字描述文字描述文字描</p>
            </div>

        </Col>
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
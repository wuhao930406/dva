import { Row,Col,Card,Icon,PageHeader  } from 'antd';
import { Link } from 'dva/router';
import styles from '../IndexPage.css';
const HomePage = ({children}) => {
  const models = [{name:'模块1',icon:"edit"}, 
  {name:'模块2',icon:"form"}, 
  {name:'模块3',icon:"copy"}, 
  {name:'模块4',icon:"scissor"}, 
  {name:'模块5',icon:"delete"}, 
  {name:'模块6',icon:"snippets"}],
  h = document.body.clientHeight;
    return (
      <Row style={{padding:"12px 29px 12px 12px"}}>
        <Col className={styles.banner} style={{height:h*0.4}}>
            <div className={styles.says} style={{width:1000,height:1000}}>
              <p>描述文字描述文字描述文字描述文字第</p>
              <p>描述文字描述文字描述文字描述文字第第</p>
              <p>描述文字描述文字描述文字描述文字第一第</p>
              <p>描述文字描述文字描述文字描述文字第一第第</p>
              <p>描述文字描述文字描述文字描述文字第一吧第第</p>

            </div>

        </Col>
        <PageHeader onBack={() => null} backIcon={<Icon type="caret-down" />} title="功能模块" subTitle="每个模块对应官网上的内容" />
        {
          models.map((item,i)=>(
          <Col key={i} xs={12} sm={8} md={8} lg={8} xl={8} style={{padding:6}}>
            <Card hoverable className={styles.flexcolumn}>
              <p className={styles.iconp}>
                <Icon style={{fontSize:36,marginBottom:12}} type={item.icon} /><br/>
                {item.name}
              </p>
            </Card>
          </Col> ))
        }
         
        
      </Row>
    );
  };
  
  HomePage.propTypes = {
  };
  
  export default HomePage;
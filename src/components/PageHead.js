import {Icon, PageHeader } from 'antd';

const PageHead = ({children,backIcon,title,subTitle}) => {
    return (
        <PageHeader style={{padding:" 0px 0px 16px 0px"}} backIcon={backIcon?backIcon:<Icon type="arrow-left" />} onBack={() => {
            window.history.go(-1)
        }} title={title} subTitle={subTitle} />
    );
};

PageHead.propTypes = {
};

export default PageHead
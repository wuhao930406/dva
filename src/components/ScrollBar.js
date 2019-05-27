import FreeScrollBar from 'react-free-scrollbar';

const ScrollBar = ({children}) => {
    return (
      <FreeScrollBar autohide={true} timeout={1000}>
        {children}
      </FreeScrollBar>
    );
  };
  
  ScrollBar.propTypes = {
  };
  
  export default ScrollBar;
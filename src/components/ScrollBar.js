import FreeScrollBar from 'react-free-scrollbar';
import React, { Component } from 'react';
import { withRouter } from 'dva/router';

class ScrollBar extends Component{
  constructor(props){
    super(props)
    this.controlledScrollBar = null
  }



  componentDidUpdate(nextProps) {
    if(nextProps.location !== this.props.location){
      if(this.controlledScrollBar){
        setTimeout(()=>{
          this.controlledScrollBar.setPosition({top: 1})
        },100)
      }
    }
  }




  render(){
    let {children} = this.props;
    return (
      <FreeScrollBar start={"top"} ref={(el) => (this.controlledScrollBar = el)} autohide={true} timeout={1000}>
        {children}
      </FreeScrollBar>
    );
  }
}


  
export default withRouter(ScrollBar);
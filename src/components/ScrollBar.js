import FreeScrollBar from 'react-free-scrollbar';
import React, { Component } from 'react';

class ScrollBar extends Component{
  constructor(props){
    super(props)
    this.controlledScrollBar = null
  }

  shouldComponentUpdate(nextProps){
    if(this.props.children!=nextProps.children){
      if(this.controlledScrollBar){
        setTimeout(()=>{
          this.controlledScrollBar.setPosition({top: 1})
        },100)
      }
      
    }
    return true
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


  
export default ScrollBar;
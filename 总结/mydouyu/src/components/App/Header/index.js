import React, { Component } from "react";
import './index.less';

import { Drawer, List, NavBar, Icon } from 'antd-mobile';

export default class Header extends Component {
  state = {
      open: false,
    }
  onOpenChange = (...args) => {
        // console.log(args);
    this.setState({ open: !this.state.open });
  }
  render() {
    const sidebar = (<List>
      {[...Array(10).keys()].map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            multipleLine
          >Category</List.Item>);
        }
        return (<List.Item key={index}
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        >Category{index}</List.Item>);
      })}
    </List>);
    
    return (<div className="nav-container">
      <NavBar mode="dark"
          icon={<Icon type="ellipsis" />} 
          onLeftClick={this.onOpenChange}
          rightContent={<span style={{color:"orange"}} onClick={()=>{window.location.href="/#/list"}}>斗鱼TV</span>}
          leftContent="直播分类"
      />
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebar={sidebar}
        open={this.state.open}
        onOpenChange={this.onOpenChange}
      >.
      </Drawer>
    </div>);
  }
}
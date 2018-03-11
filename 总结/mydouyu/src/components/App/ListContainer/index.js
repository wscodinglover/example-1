import React, { Component } from "react";
import './index.less';

export default class ListContainer extends Component {

    render(){
        const {
            list
        } = this.props
        return (<div className="list-flex-container">
            {
                list.map((v,i)=>(
                    <div className="list-flex-item" key={i}>             
                        <img className="list-item-img" src={v.room_src} alt=""/>
                        <p className="list-item-sub">
                            <span className="list-item-name">{v.nickname}</span>
                            <span className="list-item-online">{(v.online/10000).toFixed(1)}万</span>
                        </p>
                        <p className="list-item-title">{v.room_name}</p>
                    </div>
                ))
            }
        </div>)
    }
}
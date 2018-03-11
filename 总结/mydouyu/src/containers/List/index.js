import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchListData } from '../../common/redux/list/actions/list';
// import ContainerBase from '../base';
import connectDataFetchers from '../HOC/connectDataFetchers';

import { PullToRefresh, ListView  } from 'antd-mobile';
import './index.less';

class List extends Component{
    constructor(props){
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) =>row1 !== row2,
        })

        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true
        };
    }

     // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    componentWillReceiveProps(nextProps) {
        if (nextProps.list !== this.props.list) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.list.arr),
            });
        }
        this.setState({
            refreshing: nextProps.list.refreshing,
            isLoading: nextProps.list.isLoading,
        });
    } 

    componentDidMount() {
        const {
            dispatch,
        } = this.props;
        dispatch(fetchListData()) 
    }

    onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true });
        // simulate initial Ajax
        const {
            dispatch,
        } =this.props
        dispatch(fetchListData())      
    };

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        // if (this.state.isLoading && !this.state.hasMore) {
        // return;
        // }
        // console.log('reach end', event);
        this.setState({ isLoading: true });
        const {
            dispatch,
            list: { page }
        } =this.props

        dispatch(fetchListData(2 , page))
    };

    render() {

        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} className="dy-container">
                    <div className="dy-room">
                        <img className="dy-room-img" src={rowData.room_src} alt="图片"/>
                        <p className="dy-room-sub">
                            <span className="room-sub-name">{rowData.nickname}</span>
                            <span className="room-sub-online">{(rowData.online/10000).toFixed(1)}万</span>
                        </p>
                        <p className="dy-room-title">{rowData.room_name}</p>
                    </div>
                </div>
            );
          };
        return (
            <div>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderRow={row}
                    renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    useBodyScroll
                    pullToRefresh={<PullToRefresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    distanceToRefresh = {window.devicePixelRatio * 15}
                    />}
                    onEndReached={this.onEndReached}
                    pageSize={5}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log('state',state)
    return {
        list:state.list.listData
    }
}

export default connect(mapStateToProps)(List)
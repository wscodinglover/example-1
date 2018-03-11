import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchListData } from '../../common/redux/list/actions/list';
import './index.less';

import CarouselView from '../../components/App/Carousel';
import  Header from '../../components/App/Header';
import  ListContainer from '../../components/App/ListContainer';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const {
            dispatch,
        } = this.props;
        dispatch(fetchListData()) 
    }
    render() {
        const {
            list: { arr }
        } = this.props;
        return (
            <div>
                <Header />
                <CarouselView pics={ arr }/>
                <ListContainer list={ arr } />
            </div>
        )
    }
}
// 类型检查
// App.propTypes = {

// }

const mapStateToProps = (state) => {
    console.log('state',state)
    return {
        list:state.list.listData
    }
}

export default connect(mapStateToProps)(App)
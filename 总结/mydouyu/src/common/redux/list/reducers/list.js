import { handleActions } from 'redux-actions';
import { receiveList, receiveListMore } from '../actions/list';
// {
//     console.log("-------state---------")
//     console.log(state)
//     console.log("-------action---------")
//     console.log(action)
//     let newState = Object.assign({}, state, action.payload);
//     newState.arr = state.arr.concat( action.payload.arr);

//     return newState;
// }
export const listData = handleActions({
    [receiveList]: (state, action) =>({
        ...state,
        arr:action.payload.arr,
        page:action.payload.page
    }),
    [receiveListMore]: (state, action) =>({
        ...state,
        arr:state.arr.concat( action.payload.arr),
        page:action.payload.page
    })

},{
    refreshing: false,
    isLoading: false,
    arr:[]
})
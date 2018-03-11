import { createAction } from "redux-actions";

export const receiveList = createAction('RECEIVE_LIST');
export const receiveListMore = createAction('RECEIVE_LIST_MORE');

export function fetchListData(
    type=1,
    page=0,
){
    return (dispatch,getState) => {
        let isOk;
        fetch(`api/RoomApi/live?offset=${page*1*10}&limit=10`)
        .then(res => {
            isOk = !! res.ok;
            return res.json();
        })
        .then(data =>{
            if(isOk) {
                // console.log(data);
                let arr = data.data;
                // let length = arr.length;
                // console.log('leng',length)
                if(type === 1){
                    dispatch(receiveList({
                        arr:arr,
                        page:1
                    }));
                    // page=2
                }else if(type === 2){
                    page++;
                    // console.log('page',data)
                   dispatch(receiveListMore({
                        arr:arr,
                        page:page
                    }))
                }
                
            }
        })
        .catch((err) =>{
            console.log(err)
        })

    }
}
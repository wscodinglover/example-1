import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import list from './common/redux/list/reducers';

const rootReducer = combineReducers({
    list,
})

const middlewares = [ thunk ];
let enhancer 
// = applyMiddleware(...middlewares);
let updateStore = f => f ;

if(false) {
    const devTools = require('remote-redux-devtools');

    updateStore = devTools.updateStore || updateStore;
    enhancer = compose(
        applyMiddleware(...middlewares),
        devTools({
            name:'my-app',
            port:6000
        })
    );
}else{
    enhancer = applyMiddleware(...middlewares);
}

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, enhancer);
    updateStore(store);
    if(module.hot){
        module.hot.accept(() => {
            store.replaceReducer(('./index').default);
        });
    }
    return store;
}

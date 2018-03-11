export  default {
    path:'game',
    getComponent(location,cb) {
        require.ensure([],(require)=>{
            cb(null,require('../containers/Games').default)
        })
    }
}
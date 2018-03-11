export default {
    path:'app',
    getComponent(location, cb) {
        require.ensure([], (reruire) => {
            cb(null, require('../containers/App').default)
        })
    }
}
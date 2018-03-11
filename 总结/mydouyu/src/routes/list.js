export default {
    path:'list',
    getComponent(location, cb) {
        require.ensure([], (reruire) => {
            cb(null, require('../containers/List').default)
        })
    }
}
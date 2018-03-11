let env = "development";

let config = {
    'development': {
        port:8080,
        NODE_ENV: 'development',
        __GATEWAY__: "http://open.douyucdn.cn"
    }
}

module.exports = config;
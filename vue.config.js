module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    // baseUrl: '/',
    lintOnSave: false,
    assetsDir: 'static',
    devServer: {
        proxy: {
            "/api": {
                target: 'http://10.1.0.84:8080',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/api": "/api"
                }
            }
        }
    }
}
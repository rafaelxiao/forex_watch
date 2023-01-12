const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('https://datacenter-web.eastmoney.com/api/data/v1/get', {
            target: 'https://datacenter-web.eastmoney.com/api/data/v1/get',
            changeOrigin: true,
        }),

        createProxyMiddleware('https://www.chinamoney.com.cn/ags/ms/cm-u-bk-shibor/ShiborHis?lang=cn', {
            target: 'https://www.chinamoney.com.cn/ags/ms/cm-u-bk-shibor/ShiborHis?lang=cn',
            changeOrigin: true,
        }),

        createProxyMiddleware('https://www.chinamoney.com.cn/r/cms/www/chinamoney/data/fx/ccpr.json', {
            target: 'https://www.chinamoney.com.cn/r/cms/www/chinamoney/data/fx/ccpr.json',
            changeOrigin: true,
        }),

        createProxyMiddleware('https://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/var%20_fx_susdcnh_1_1673425502873=/NewForexService.getMinKline?symbol=fx_susdcnh&scale=1&datalen=1', {
            target: 'https://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/var%20_fx_susdcnh_1_1673425502873=/NewForexService.getMinKline?symbol=fx_susdcnh&scale=1&datalen=1',
            changeOrigin: true,
        }),

        createProxyMiddleware('https://push2.eastmoney.com/api/qt/stock/get?invt=2&fltt=1&fields=f43%2Cf57%2Cf58&secid=133.USDCNH', {
            target: 'https://push2.eastmoney.com/api/qt/stock/get?invt=2&fltt=1&fields=f43%2Cf57%2Cf58&secid=133.USDCNH',
            changeOrigin: true,
        }),

        createProxyMiddleware('https://www.global-rates.com/en/interest-rates/libor/libor.aspx', {
            target: 'https://www.global-rates.com/en/interest-rates/libor/libor.aspx',
            changeOrigin: true,
        }),
    )
}
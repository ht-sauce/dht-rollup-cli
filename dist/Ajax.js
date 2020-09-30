// 埋点上报文件
class Ajax {
    constructor() {
        this._xhr = {};
    }
    // 终止接口请求
    abort() {
        this._xhr && this._xhr.abort();
    }
    // get情况下需要拼接字符格式
    splicing(data) {
        let params = '';
        for (const key in data) {
            params += `${key}=${data[key]}&`;
        }
        params = '?' + params.substring(0, params.length - 1);
        return params;
    }
    // 传入参数预处理
    config({ prefix = '', url = '', data = {}, method = 'get', splicing = true, timeout = 1000 * 30, // 默认等待1分钟
    type = 'json', header = {
        'Content-Type': 'application/json; charset=UTF-8',
    }, }) {
        method = method.toUpperCase(); // 统一转换为大写
        url = prefix + url;
        if (method === 'GET' && splicing)
            url = url + this.splicing(data);
        const config = {
            prefix,
            url,
            data,
            splicing,
            method,
            timeout,
            type,
            header,
        };
        return config;
    }
    // image请求方式
    image(config) {
        const setting = this.config(config);
        let image;
        image = new Image();
        image.src = setting.url;
        image = null; // 清空内存
    }
    // xhr请求方式
    request(config) {
        const { url, method, timeout, header, type } = this.config(config);
        let xhr;
        if (window.XMLHttpRequest)
            xhr = new XMLHttpRequest();
        this._xhr = xhr;
        // 返回promise对象
        return new Promise((resolve, reject) => {
            if (!xhr)
                reject('版本不支持');
            // 请求成功回调函数
            // xhr.onload = e => {
            //   //console.log('load', e)
            //   resolve(e)
            // }
            // 请求结束
            xhr.onloadend = (e) => {
                const status = xhr.status;
                let data;
                if (xhr.responseType === 'text') {
                    data = xhr.responseText;
                }
                else if (xhr.responseType === 'document') {
                    data = xhr.responseXML;
                }
                else {
                    data = xhr.response;
                }
                resolve({ data, status, xhr: e });
            };
            // 请求出错
            xhr.onerror = (e) => {
                //console.error('error', e)
                reject(e);
            };
            // 请求超时
            xhr.ontimeout = (e) => {
                //console.error('timeout', e)
                reject(e);
            };
            // 当 request 被停止时触发
            // xhr.onabort = e => {
            //   reject(e)
            // }
            xhr.open(method, url, true);
            // 设置期望的返回数据类型
            xhr.responseType = type;
            // 设置请求头
            for (const key of Object.keys(header)) {
                xhr.setRequestHeader(key, header[key]);
            }
            xhr.send(null);
            xhr.timeout = timeout;
        });
    }
}
export default Ajax;
//# sourceMappingURL=Ajax.js.map
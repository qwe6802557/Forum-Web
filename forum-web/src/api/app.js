/**
 * 请求示例
 */

import request from '@/utils/request'


export function getApiNames (name) {
    return request ({
        url: '',
        method: 'get',
        params: {
            name: name
        }
    })
}

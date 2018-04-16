import request from '../utils/request';

const PATH_PREFIX = 'http://127.0.0.1:7001/api/'

export async function create(params) {
  return request(PATH_PREFIX + 'iduser', {
    method: 'POST',
    body: params
  })
}

export async function del(id) {
  return request(PATH_PREFIX + 'iduser/' + id, {
    method: 'POST'
  })
}

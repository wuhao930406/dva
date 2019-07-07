import request from '../utils/request';
import { stringify } from 'qs';


export async function login(params) {
  return request(`edu/login`,{
    method: 'post',
    body: JSON.stringify(params)
  })
}

//banner图

export async function getall(params) {
  return request(`edu/page/getall`,{
    method: 'get',
  })
}

export async function bannerupdate(params) {
  return request(`edu/page/bannerupdate`,{
    method: 'post',
    body: JSON.stringify(params)
  })
}

export async function bannerdelete(params) {
  return request(`edu/page/bannerdelete`,{
    method: 'post',
    body: JSON.stringify(params)
  })
}

//index_adv 
export async function getadv(params) {
  return request(`edu/page/getadv`,{
    method: 'get',
  })
}

export async function updateadv(params) {
  return request(`edu/page/updateadv`,{
    method: 'post',
    body: JSON.stringify(params)
  })
}

//aboutus
export async function getaboutus(params) {
  return request(`edu/page/getaboutus`,{
    method: 'get',
  })
}



export async function updateaboutus(params) {
  return request(`edu/page/updateaboutus`,{
    method: 'post',
    body: JSON.stringify(params)
  })
}

//service
export async function getservice(params) {
  return request(`edu/page/getservice`,{
    method: 'get',
  })
}

export async function updateservice(params) {
  return request(`edu/page/updateservice`,{
    method: 'post',
    body: JSON.stringify(params)
  })
}

//aboutus
export async function getdevlop(params) {
  return request(`edu/about/getdevlop`,{
    method: 'get',
  })
}
export async function updatedevlop(params) {
  return request(`edu/about/updatedevlop`,{
    method: 'post',
    body: JSON.stringify(params)
  })
}

export async function insertdevlop(params) {
  return request(`edu/about/insertdevlop`,{
    method: 'post',
    body: params
  })
}
//aboutus work_env

export async function getenv(params) {
  return request(`edu/about/getenv`,{
    method: 'get',
  })
}

export async function envupdate(params) {
  return request(`edu/about/envupdate`,{
    method: 'post',
    body: JSON.stringify(params)
  })
}

export async function envdelete(params) {
  return request(`edu/about/envdelete`,{
    method: 'post',
    body: JSON.stringify(params)
  })
}


export async function getachieve(params) {
  return request(`edu/about/getachieve`,{
    method: 'get',
  })
}

export async function updateachieve(params) {
  return request(`edu/about/updateachieve`,{
    method: 'post',
    body: JSON.stringify(params)
  })
}
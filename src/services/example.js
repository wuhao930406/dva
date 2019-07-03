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
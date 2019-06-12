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
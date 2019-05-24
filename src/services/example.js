import request from '../utils/request';
import { stringify } from 'qs';


export async function login(params) {
  console.log(params)
  return request(`edu/login`,{
    method: 'post',
    body: JSON.stringify(params)
  })
}
import fetch from 'dva/fetch';
import {message} from 'antd';
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options,type) {
  let newoption;
  if(type){
    newoption = {...options, headers: {
      'Content-Type':type,
      'x-csrf-token':document.cookie.split("=")[1]
    }}
  }else{
    newoption = {...options, headers: {
      'Content-Type':'application/json; charset=utf-8',
      'x-csrf-token':document.cookie.split("=")[1]
    }}
  }

  return fetch(url,newoption)
    .then(checkStatus)
    .then(parseJSON)
    .then(data =>{
      message.destroy();
      if(data.code==200){
        message.success(data.message)
        return { ...data,next:true }
      }else{
        message.error(data.message)
        return { next:false }
      }
      
    })
    .catch(err => ({ err }));
}

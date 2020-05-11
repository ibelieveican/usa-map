import Axios from 'axios'
const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV)
Axios.defaults.baseURL = IS_PROD ? '' : '/mock'// 配置接口地址
const CancelToken = Axios.CancelToken
// eslint-disable-next-line
window.abortRequest
// *************************** 发送axios请求 ***************************
const sendAxios = async ({url, type, data, success, error, enableAbortRequest = false}) => {
  let sendData = type.toLocaleString() === 'get' ? {params: data} : data
  let transformRequest = []
  // 终止请求
  let abortFunc = null
  if (enableAbortRequest) {
    abortFunc = new CancelToken(function executor (c) {
      window.abortRequest = c
    })
  }
  let successCallBack = resp => {
    success(resp)
  }
  let errorCallBack = err => {
    if (error) {
      error(err)
    } else {
      console.log('请求错误:' + url)
      console.log(err)
    }
  }

  await Axios[type](
    url,
    sendData,
    {headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    transformRequest: transformRequest, cancelToken: abortFunc}).then(successCallBack).catch(errorCallBack)
}

const getStates = ({type = 'get', data = {}, success, error}) => {
  sendAxios({
    url: IS_PROD ? 'https://api.prossier.org/api/statescovid' : '/api/statescovid',
    type: type,
    data: data,
    success: success,
    error: error
  })
}

const all = ({type = 'get', data = {}, success, error}) => {
  sendAxios({
    url: 'https://disease.sh/v2/nyt/usa',
    type: type,
    data: data,
    success: success,
    error: error
  })
}

const daily_perception_latest = ({type = 'get', data = {}, success, error}) => {
  sendAxios({
    url: IS_PROD ? 'https://api.prossier.org/api/daily_perception/latest' : '/api/daily_perception/latest',
    type: type,
    data: data,
    success: success,
    error: error
  })
}

const state_reopening_status = ({type = 'get', data = {}, success, error}) => {
  sendAxios({
    url: IS_PROD ? 'https://api.prossier.org/api/state_reopening_status' : '/api/state_reopening_status',
    type: type,
    data: data,
    success: success,
    error: error
  })
}

const daily_perception_state_id = ({url, type = 'get', data = {}, success, error}) => {
  sendAxios({
    url: IS_PROD ? url : '/api/daily_perception/state_id/26',
    type: type,
    data: data,
    success: success,
    error: error
  })
}

const historical = ({type = 'get', data = {}, success, error}) => {
  sendAxios({
    url: IS_PROD ? 'https://api.prossier.org/api/historical' : '/api/historical',
    type: type,
    data: data,
    success: success,
    error: error
  })
}

const us_daily_perception = ({type = 'get', data = {}, success, error}) => {
  sendAxios({
    url: IS_PROD ? 'https://api.prossier.org/api/us_daily_perception' : '/api/us_daily_perception',
    type: type,
    data: data,
    success: success,
    error: error
  })
}

export default {
  getStates,
  daily_perception_latest,
  state_reopening_status,
  daily_perception_state_id,
  all,
  historical,
  us_daily_perception
}
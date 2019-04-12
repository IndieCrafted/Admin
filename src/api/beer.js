import api from './config'

// 获取啤酒列表
export const getBeerList = data => api.get('/beer/list', data)

// 新增啤酒
export const addBeer = data => api.post('/beer/create', data)

// 修改啤酒
export const updateBeer = data => api.put('/beer/update', data)

// 变更状态
export const updateBeerStatus = data => api.put('/beer/updateStatus', data)

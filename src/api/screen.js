import api from './config'

// 获取屏幕列表
export const getScreenList = data => api.get('/screen/list', data)

// 添加啤酒到屏幕
export const addToScreen = data => api.post('/screen/addBeer', data)

// 删除屏幕中啤酒
export const removeFromScreen = data => api.delete('/screen/removeBeer', data)

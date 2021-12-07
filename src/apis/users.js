import { apiHelper } from './../utils/helpers'



export default {
  getCurrentUser() {
    return apiHelper.get('/users/self')
  },
  getUsers() {
    return apiHelper.get('/users')
  },
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },//取得個人資料
  getTopUsers() {
    return apiHelper.get('/users/top')
  },
  postFollow() {
    return apiHelper.post('/followships', null)
  },
  deleteFollow({ userId }) {
    return apiHelper.delete(`/followships/${userId}`)
  }
}
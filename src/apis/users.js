import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')


export default {
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`)
  },
  getUsers({ userId }) {
    return apiHelper.get(`/users/${userId}`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  getTopUsers() {
    return apiHelper.get('/users/top')
  },
  addFollowing({ userId }) {
    return apiHelper.post(`/following/${userId}`, null)
  },
  deleteFollowing({ userId }) {
    return apiHelper.delete(`/following/${userId}`)
  }
}
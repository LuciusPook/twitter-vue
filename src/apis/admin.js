import { apiHelper } from '../utils/helpers'


export default {
  getTweets() {
    return apiHelper.get('/admin/tweets')
  },
  getUsers() {
    return apiHelper.get('/admin/users')
  },
}
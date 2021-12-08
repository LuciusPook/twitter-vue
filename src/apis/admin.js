import { apiHelper } from '../utils/helpers'


export default {
  signIn({ account, password }) {
    return apiHelper.post('/admin/signin', {
      account,
      password
    })
  },
  getUsers() {
    return apiHelper.get('/admin/users')
  },

  getTweets() {
    return apiHelper.get('/admin/tweets')
  },

  deleteTweet({ tweetId }) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`)
  },
}
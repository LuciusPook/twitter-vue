import { apiHelper } from '../utils/helpers'


export default {
  getTweets() {
    return apiHelper.get('/tweets') //取得所有post
  },
  deleteTweet() {
    return apiHelper.get('/tweets/:id')
  },
  postTweet({ description }) {
    return apiHelper.post('/tweets', { description })
  },
}
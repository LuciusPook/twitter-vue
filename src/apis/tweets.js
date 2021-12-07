import { apiHelper } from "./../utils/helpers"

export default {
  like:{
    addLike({tweetId}){
      return apiHelper.post(`/tweets/${tweetId}/like`)
    },
    deleteLike({tweetId}){
      return apiHelper.post(`/tweets/${tweetId}/unlike`)
    }
  },
  reply:{
    getReplies({tweetId}){
      return apiHelper.get(`/tweets/${tweetId}/replies`)
    },
    addReply({tweetId , comment}){
      return apiHelper.post(`/tweets/${tweetId}/replies`, { comment })
    },
    deleteReply({tweetId}){
      return apiHelper.delete(`/replies/${tweetId}`)
    }
  },
  getTweets() {
    return apiHelper.get('/tweets')
  },
  getTweet({tweetId}){
    return apiHelper.get(`/tweets/${tweetId}`)
  },
  addTweet({ description }){
    return apiHelper.post('/tweets', { description })
  }
}
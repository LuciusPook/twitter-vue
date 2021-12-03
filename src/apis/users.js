import { apiHelper } from './../utils/helpers'
// const getToken = () => localStorage.getItem('token')


export default {
  tweets:{
    getUserTweets({ userId }){
      return apiHelper.get(`/users/${userId}/tweets`)
    },
    getUserRepliedTweets({ userId }){
      return apiHelper.get(`/users/${userId}/replied_tweets`)
    },
    getUserLikedTweets({userId}){
      return apiHelper.get(`/users/${userId}/likes`)
    }
  },
  getCurrentUser() {
    return apiHelper.get(`/users/self`)
  },
  getUsers({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  addFavorite({ restaurantId }) {
    return apiHelper.post(`/favorite/${restaurantId}`, null)
  },
  deleteFavorite({ restaurantId }) {
    return apiHelper.delete(`/favorite/${restaurantId}`)
  },
  addLike({ restaurantId }) {
    return apiHelper.post(`/like/${restaurantId}`, null)
  },
  deleteLike({ restaurantId }) {
    return apiHelper.delete(`/like/${restaurantId}`)
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
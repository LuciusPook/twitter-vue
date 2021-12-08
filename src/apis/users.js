import { apiHelper } from './../utils/helpers'

export default {
  tweets: {
    getUserTweets({ userId }) {
      return apiHelper.get(`/users/${userId}/tweets`)
    },
    getUserRepliedTweets({ userId }) {
      return apiHelper.get(`/users/${userId}/replied_tweets`)
    },
    getUserLikedTweets({ userId }) {
      return apiHelper.get(`/users/${userId}/likes`)
    }
  },
  followship: {
    getUserFollowers({ userId }) {
      return apiHelper.get(`/users/${userId}/followers`)
    },
    getUserFollowings({ userId }) {
      return apiHelper.get(`/users/${userId}/followings`)
    },
    addFollowing({ userId }) {
      return apiHelper.post('/followships', { id: userId })
    },
    deleteFollowing({ userId }) {
      return apiHelper.delete(`/followships/${userId}`)
    }
  },

  getCurrentUser() {
    return apiHelper.get(`/users/self`)
  },

  getUsers({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },

  update({ userId, formData }) {
    return apiHelper.put(`/users/account/${userId}`, formData)
  },

  getTopUsers() {
    return apiHelper.get('/users/top/')
  },
}
import { apiHelper } from './../utils/helpers'

export default {
  signIn({ email, password }) {
    return apiHelper.post('/users/signin', {
      email,
      password
    })
  },
  signUp({ name, email, password, passwordCheck }) {
    return apiHelper.post('/users/signup', {
      name,
      email,
      password,
      passwordCheck
    })
  }
}
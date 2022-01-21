import { apiHelper } from "../utils/helpers";

export default {
  // getPublicHistory() {
  //   return apiHelper.get('/chats/public')
  // },
  getHistory({ roomName }){
    return apiHelper.get(`/chat/message/${roomName}`)
  },
  getLatest() {
    return apiHelper.get(`/messages/latest`)
  }
}
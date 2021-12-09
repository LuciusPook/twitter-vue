import moment from 'moment'
import nullAvatar from './../assets/default-avatar.png'

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || nullAvatar
    }
  }
}

export const timeTransForm = {
  filters:{
    timeTransForm(datetime){
      let d= new Date(datetime)
      const year = d.getFullYear()
      const month = d.getMonth()
      const day = d.getDate()
      const hour = d.getHours()
      const min = d.getMinutes()
      if(hour < 12){
        return `上午${hour}:${min}．${year}年${month}月${day}日`
      }else{
        return `上午${hour}:${min}．${year}年${month}月${day}日`
      }
    }
  }
}
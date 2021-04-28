import { apiHelper } from './../utils/helpers'

export default {
  getTweets () {
    return apiHelper.get('/tweets')
  },
  getTweet ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },
  create ({ description }) {
    return apiHelper.post('/tweets', {
      description
    })
  },
  like ({ id }) {
    return apiHelper.post(`/tweets/${id}/like`)
  },
  unlike ({ id }) {
    return apiHelper.post(`/tweets/${id}/unlike`)
  }
}

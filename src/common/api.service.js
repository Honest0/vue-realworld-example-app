import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import JwtService from '@/common/jwt.service'
import { API_URL } from '@/common/config'

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },

  setHeader () {
    Vue.axios.defaults.headers.common['Authorization'] = `Token ${JwtService.getToken()}`
  },

  get (resource, params = '') {
    if (typeof resource !== 'string') {
      throw new Error('[RWV] ApiService.get() first parameter must be a string')
    }
    return Vue.axios
      .get(`${resource}/${params}`)
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`)
      })
  },

  post (resource, params) {
    if (typeof resource !== 'string') {
      throw new Error('[RWV] ApiService.post() first parameter must be a string')
    }
    return Vue.axios
      .post(`${resource}`, params)
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`)
      })
  },

  delete (resource) {
    return Vue.axios
      .delete(resource)
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`)
      })
  }
}

export default ApiService

export const TagsService = {
  get () {
    return ApiService.get('tags')
  }
}
export const ArticlesService = {
  get (slug) {
    return ApiService.get('articles', slug)
  }
}
export const CommentsService = {
  get (slug) {
    if (typeof slug !== 'string') {
      throw new Error('[RWV] CommentsService.get() article slug required to fetch comments')
    }
    return ApiService.get('articles', `${slug}/comments`)
  },

  post (slug, payload) {
    return ApiService.post(
      `articles/${slug}/comments`, { comment: { body: payload } })
  },

  destroy (slug, commentId) {
    return ApiService
      .delete(`articles/${slug}/comments/${commentId}`)
  }
}

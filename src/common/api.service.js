import Vue from 'vue'

export default class ApiService {

  static get (resource, params = '') {
    if (typeof resource !== 'string') {
      throw new Error('[RWV] ApiService.get() first parameter must be a string')
    }
    return Vue.axios
      .get(`${resource}/${params}`)
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`)
      })
  }

  static post (resource, params) {
    if (typeof resource !== 'string') {
      throw new Error('[RWV] ApiService.post() first parameter must be a string')
    }
    return Vue.axios
      .post(`${resource}`, {
        data: params

      })
      .then(console.log)
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`)
      })
  }
}

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
  }
}

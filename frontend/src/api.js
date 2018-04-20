'use strict'

import Vue from 'vue'
const API = 'http://localhost:3000/api/'

function cleanObj(obj) {
  Object.keys(obj).forEach(key => obj[key] == null && delete obj[key])
  return obj
}

export function get(path, params) {
  return Vue.http.get(`${API}${path}`, { params: params })
}

export function post(path, params) {
  return Vue.http.post(`${API}${path}`, cleanObj(params))

}

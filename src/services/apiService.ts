import axios from 'axios'
const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
})

export default httpClient

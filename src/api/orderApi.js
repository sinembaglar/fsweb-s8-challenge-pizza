import axios from 'axios'

const API_URL = 'https://reqres.in/api/pizza'
const API_KEY = 'free_user_3KPD31YOTequ27leeKzmszuJUYJ'

const api = axios.create({
  headers: { 'x-api-key': API_KEY },
  timeout: 10000,
})

export const postOrder = (order) => api.post(API_URL, order)

export const getErrorMessage = (error) => {
  if (!error.response) {
    return 'İnternete bağlanılamadı. Lütfen bağlantınızı kontrol edip tekrar deneyin.'
  }
  if (error.response.status === 401 || error.response.status === 403) {
    return 'Sipariş servisine erişim izni alınamadı. Lütfen daha sonra tekrar deneyin.'
  }
  if (error.response.status >= 500) {
    return 'Sunucuda bir sorun oluştu. Lütfen biraz sonra tekrar deneyin.'
  }
  return 'Siparişiniz gönderilemedi. Lütfen bilgilerinizi kontrol edip tekrar deneyin.'
}

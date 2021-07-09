import axios from 'axios'
// 15711140593
// 123456yzy
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    // headers:{
    //     cookie: localStorage.getItem('cookies')?localStorage.getItem('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''
    // }
})
// axiosInstance.defaults.withCredentials = true
// let intercepteor = 
axiosInstance.interceptors.response.use(function(res) {
    
    return res
})
// axiosInstance.interceptors.response.eject(intercepteor)
function request(url,params={}) {
    
        let data = axiosInstance({
            url,
            // method,
            params,
            withCredentials: true
        })
        if(params.isLogin) {
            data.headers
        }

       return data
}
// axiosInstance({
//          baseURL: "http://localhost:3000",
//          url: '/login/cellphone',
//          params: {
//           phone: '15711140593', 
//           password: '123456yzy',
//           isLogin:true
//         },
//       }).then(function(res) {
//           console.log(res)
//       })
export default request
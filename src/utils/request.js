import axios from 'axios'

const instance = axios.create({
    baseURL:'https://www.fastmock.site/mock/4b9bd7604a76c782b0d4a6caa7a4f913/jd',
    timeout:'10000'
})

export const get = (url,params = {})=>{
    return new Promise((resolve,reject)=>{
        instance.get(url,{ params }).then((response)=>{
            resolve(response)
        },err=>{
            reject(err)
        })
    })
}

export const post =(url,data = {})=>{
    return new Promise((resolve,reject)=>{
        instance.post(url,data,{
            headers:{
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            resolve(response)
        },err=>{
            reject(err)
        })
    })
}
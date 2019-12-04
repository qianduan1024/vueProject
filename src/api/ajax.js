import axios from 'axios';
export default function ajax(url, data = {}, method = 'GET') {
  // let promise = new Promise((resolve, reject) => {
  //   let xmlhttp=new XMLHttpRequest();
  //   xmlhttp.onreadystatechange=function(){
  //     if(xmlhttp.readyState === 4){
  //       if(xmlhttp.status === 200){
  //         resolve(xmlhttp.responseText)
  //       }else{
  //         reject('报错')
  //       }
  //     }
  //   };
  //   xmlhttp.open('GET',URL)
  //   xmlhttp.send()
  // })

  return new Promise((resolve, reject) => {
    let promise
    if(method==='GET'){
      promise=axios.get(url, {params: data})
    }else{
      promise=axios.post(url, data)
    }
    promise.then(
      response => {
        resolve(response.data)
      },
      error => {
        alert('请求异常:' + error.message)
      }
    )
  })
}
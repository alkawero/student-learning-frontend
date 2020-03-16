import axios from 'axios'

let api_host = 'http://sispahoa.sch.id/pahoa_webapi/'


export const doGetExternalApi = async(url,params={},headers={}) =>{
  return await axios.get(url,{
        params:params,
        headers: headers
      })
      .then((rsp)=>{
        return{data:rsp.data, error:''}
        })
      .catch((error)=>{
        return {data:'', error:error}
        });
}

export const doGet = async(path,params={},headers={}) =>{ 
  return await axios.get(api_host+path,{
    params:params,
    headers: headers
  })
      .then((rsp)=>{
        return{data:rsp.data}
        })
      .catch((error)=>{
        console.log(path)
        console.log(error)
        return {error:error}
        });
}


export const doPost = async(path,payload) =>{
  
  return await axios({
        method: 'post',
        url: api_host+path,
        headers:{'Content-Type': 'application/json'},
        data: payload
      })
      .then((rsp)=>{
        return {data:rsp.data}})
      .catch((error)=>{
        console.log(error)
      })
}

export const doSilentPost = async(path,payload) =>{
  return await axios({
        method: 'post',
        url: api_host+path,
        data: payload
      })
      .then((rsp)=>{
        return {data:rsp.data}})
      .catch((error)=>{
        console.log(error)
      })
}


export const doUpload = async(path,payload) =>{
  return await axios({
        method: 'post',
        url: api_host+path,
        data: payload,
        headers:{'content-type': 'multipart/form-data' }
      })
      .then((rsp)=>{
        return rsp
      })
      .catch((error)=>{

        console.log(error)
      })
}

export const doPut = async(path,payload,activity) =>{
  return await axios({
        method: 'put',
        url: api_host+path,
        data: payload
      })
      .then((rsp)=>{
        return {data:rsp.data}})
      .catch((error)=>{
        console.log(error)
      })
}

export const doPatch = async(path,payload,activity) =>{
  return await axios({
        method: 'patch',
        url: api_host+path,
        data: payload
      })
      .then((rsp)=>{
        return {data:rsp.data}})
      .catch((error)=>{
        console.log(error)
      })
}

export const doDelete = async(path,payload,activity) =>{
  return await axios({
        method: 'delete',
        url: api_host+path,
        data: payload
      })
      .then((rsp)=>{
        return {data:rsp.data}})
      .catch((error)=>{
        console.log(error)
      })
}



export const doDownloadExcel = async(path,params={}) =>{
    return await axios.get(api_host+path,{
        params:params,
        responseType: 'blob',
        headers: { 'Accept': 'application/vnd.ms-excel' }
      }).then((rsp)=>{
            const url = window.URL.createObjectURL(new Blob([rsp.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', params.file_name+'.xlsx');
            document.body.appendChild(link);
            link.click();
        })
        .catch((error)=>{
          console.log(error)
        })
  }

  export const doDownloadPdf = async(path,params={}) =>{
    return await axios.get(api_host+path,{
      params:params,
      responseType: 'blob'
    })
        .then((rsp)=>{
          const url = window.URL.createObjectURL(new Blob([rsp.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.pdf'); //or any other extension
          document.body.appendChild(link);
          link.click();
          })
        .catch((error)=>{
          console.log(path)
          console.log(error)
          return {error:error}
          });
  }

  export const doDownload = async(path,params={},file_name) =>{
    return await axios.get(path,{
      params:params,
      responseType: 'blob'
    })
        .then((rsp)=>{
          const url = window.URL.createObjectURL(new Blob([rsp.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', file_name); //or any other extension
          document.body.appendChild(link);
          link.click();
          })
        .catch((error)=>{
          console.log(path)
          console.log(error)
          return {error:error}
          });
  }


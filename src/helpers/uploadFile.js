const uploadFile = async (file) =>{
    console.log('иде')
    // console.log(file)
    const uploadFile = async (file) => {
        const url = `http://localhost:4000/upload`
        let formData = await new FormData()
        formData.append('file', file);
        return fetch(url, {
                    method: "POST",
                    headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
                    body: formData
                })
                .then((res) => res.json())
                .then((data) => {
                    // console.log('ready data',data)
                    return data
                })
    }
    console.log(await Promise.all(file.map(file => uploadFile(file))).then(values => {return values}))
    return await Promise.all(file.map(file => uploadFile(file))).then(values => {return values})    
}

export default uploadFile

function uploadImg (e) {
    function upload (e) {
        const file = e.target.file?.[0];

        if(!file) return;

        const formData = new formData();

        formData.append('textValue', 'Hello world')
        formData.append('image', file)

        console.log("file object", file)
        console.log("file name", file.name)
        console.log("file type", file.type)
        console.log("file size", file.size)

        console.log('form message', formData.get("textValue"))
        console.log('formData image', formData.get('image'))

    }

    return(
        <input type="file"
        className="imgFile"
        onChange={()=>upload(e)} />
    )
}

export default uploadImg;
import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
const axios = require('axios');
function  Addimage() {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});
    const [token, setToken] = useState("");
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("profileInfo") )
        setToken(data.token);
        console.log("Token from localstorage: ", token);
    }, []);

    console.log("Token from localstorage: ", token);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }
    const handlechange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    // const token = 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("FormData: ", formData);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            console.log("reached here: ")
 
            const data = await axios({
                method: "POST",
                crossorigin: false,
                url: `http://localhost:1234/auth/addimagec`,
                data: { ...formData, image_url: reader.result },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });;

            
            console.log("Final Data: ", data)

    }}

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" onChange={handlechange} value={formData.title} placeholder="Title"/>
                <input type="text" name="description" onChange={handlechange} value={formData.description } placeholder="Description" />
                <input type="radio" name="isPrivate" onChange={handlechange} value="true" id="true" />
                <label htmlFor="true">True</label>
                <input type="radio" name="isPrivate" onChange={handlechange} value="false" id="false" />
                <label htmlFor="false">False</label>
                <input type="file" name="image_url" onChange={handleFileChange} />
                <button type="submit" className="btn">Add Image</button>
            </form>
            
        </div>
    )
}

export default Addimage;

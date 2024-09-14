import axios from "axios";

export async function udpateGame(data) {
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}/earnings/update`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
}  

export async function fetchData(config){
    try {
        
        const resp = await axios.request(config)
        return resp.data
    } catch (error) {
        console.log(error);
        return error.response || error.request
        
    }
}  
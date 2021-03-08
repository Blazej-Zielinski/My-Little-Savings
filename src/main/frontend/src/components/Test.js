import axios from "axios";
import {useState, useEffect} from "react";

const Test = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/someData').then(resp => {
            console.log(resp.data);
            setData(resp.data);
        });
    },[])

    return data.map((user, index) => {
        return (
            <div key={index}>
                <h1>{user.id}</h1>
                <p>{user.name}</p>
                <p>{user.surname}</p>
            </div>
        )
    })
}

export default Test;
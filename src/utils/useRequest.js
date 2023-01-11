import axios from "axios";
import { useEffect, useState } from "react";

export default function useRequest(url, method, params) {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // initiate an async function to ensure getting the data
        return async() => {
            try {
                await axios.request(
                    {
                        url: url,
                        method: method,
                        params: params,
                    }
                ).then((response) => {
                    if(response.status == 200) {
                        setData(response.data);
                    }
                    setStatus(response.status);
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoaded(true);
            }
        }
    }, []);
    return {data, status, error, loaded};
}
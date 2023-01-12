import React, { useEffect } from "react";
import "../styles/Home.css"
import ForexWatch from "../components/ForexWatch";
import getToday from "../utils/getToday";

function Home() {

    useEffect(() => {
        document.title = getToday() + ' 外汇数据';
    }, [])
    
    return (
        <ForexWatch />
    )
}

export default Home;
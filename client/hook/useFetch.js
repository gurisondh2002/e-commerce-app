import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';

const useFetch = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async() =>{
        setIsLoading(true);
        try{
            const resp = await axios.get('http://localhost:3020/api/products/getllProducts')
            resjson = await resp.json();
            console.log(resjson);
            setData(resp.data);
            setIsLoading(false);
        }
        catch(err) {
            console.log(err);
            setError(err);
        }
        finally{
            setIsLoading(false);
       }
    }

    useEffect (() =>{
        fetchData();
    },[]);


    // const refetch = () =>{
    //     setIsLoading(true);
    //     fetchData();
    // }


  return {data, isLoading, error};
}

export default useFetch

const styles = StyleSheet.create({})
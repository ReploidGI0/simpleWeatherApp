import axios from "axios"
import type { SearchType } from "../types"

export default function useWeather() {
    const fetchWeather = async (search: SearchType) => {

        const appid = import.meta.env.VITE_API_KEY

        try{
            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${appid}`

            const {data} = await axios(geoUrl)
            console.log(data)

        } catch (error){
            console.log(error)
        }
    }

    return{
        fetchWeather
    }
}
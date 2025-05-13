import axios from "axios"
import type { SearchType } from "../types"
import { object, string, number, type InferOutput, parse } from 'valibot'
import { useMemo, useState } from "react"

//Valibot Schema
const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_min: number(),
        temp_max: number()
    })
})

export type Weather = InferOutput<typeof WeatherSchema>
            
export default function useWeather() {

    const [weather, setWeather] = useState<Weather>({
        name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    })

    const [loading, setLoading] = useState(false)

    const fetchWeather = async (search: SearchType) => {

        const appid = import.meta.env.VITE_API_KEY
        setLoading(true)

        try{
            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${appid}`

            const {data} = await axios(geoUrl)

            const lat = data.coord.lat
            const lon = data.coord.lon
            
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`

            //Valibot
            const {data: weatherResult} = await axios<Weather>(weatherUrl)
            const result = parse(WeatherSchema, weatherResult)
            if(result){
                setWeather(result)
            }

        } catch (error){
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return{
        weather,
        loading,
        fetchWeather,
        hasWeatherData
    }
}
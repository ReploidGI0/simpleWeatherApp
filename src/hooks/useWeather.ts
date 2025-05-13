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

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}
            
export default function useWeather() {

    const [weather, setWeather] = useState<Weather>(initialState)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {

        const appid = import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(initialState)
        setNotFound(false)

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

        } catch (error: any){
            console.log('Error al obtener clima: ',error)
            if(error.response?.status === 404){
                console.log('Clima no encontrado: ')
                setNotFound(true)
            }
        } finally {
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return{
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}
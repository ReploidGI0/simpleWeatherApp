import type { Weather } from "../../hooks/useWeather"
import { formatTemperature } from "../../helpers"

type WeatherDetailProps = {
    weather: Weather
}

export default function WeatherDetail({weather}: WeatherDetailProps) {
  return (
    <div>
        <h2>Clima de: {weather.name}</h2>
        <p>{formatTemperature(weather.main.temp)}</p>
    </div>
  )
}

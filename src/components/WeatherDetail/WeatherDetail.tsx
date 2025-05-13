import type { Weather } from "../../hooks/useWeather"

type WeatherDetailProps = {
    weather: Weather
}

export default function WeatherDetail({weather}: WeatherDetailProps) {
  return (
    <div>
        <h1>Clima de: </h1>
    </div>
  )
}

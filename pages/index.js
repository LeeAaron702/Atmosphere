import Image from 'next/image';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import axios from 'axios';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Weather from '../components/Weather';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [city, setCity] = useState("")
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(false)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`

  const fetchWeather = (e) => {
    e.preventDefault()
    setLoading(true)
    axios.get(url).then((response) => {
      setWeather(response.data)
    });
    setCity("")
    setLoading(false)
  }

  if (loading) {
    return <Spinner />
  } else {
    return (
      <div>
        <Head>
          <title>Atmosphere</title>
          <meta name="description" content="Weather App" />
          <link rel='icon' href="/favicon.ico" />
        </Head>
        {/* overlay */}
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/10 z-[1]' />
        {/* background image */}

        <Image src='https://images.unsplash.com/photo-1545193544-312983719627?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
          layout='fill'
          className='object-cover'
          alt='atmospheric photo of cancun'
        />

        {/* search */}
        <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10'>
          <form onSubmit={fetchWeather} className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'>
            <div>
              <input onChange={(e) => setCity(e.target.value)} className='bg-transparent border-none text-white focus:outline-none text-2xl placeholder:text-gray' type='text' placeholder='Search City' />
            </div>
            <button onClick={fetchWeather}>
              <BsSearch size={25} />
            </button>
          </form>
        </div>
        {/*  */}

        {weather.main && <Weather data={weather} />}
      </div>
    )
  }
}

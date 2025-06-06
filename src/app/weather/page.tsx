'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Eye, Wind, Droplets, Gauge, Sunrise, Sunset, Calendar, Activity } from 'lucide-react';

interface Weather {
main: {
temp: number;
feels_like: number;
humidity: number;
pressure: number;
temp_min: number;
temp_max: number;
};
weather: { description: string; icon: string; main: string }[];
wind: { speed: number; deg?: number };
visibility: number;
name: string;
sys: { country: string; sunrise: number; sunset: number };
dt: number;
}

interface ForecastList {
dt: number;
main: { temp: number; temp_min: number; temp_max: number };
weather: { icon: string; description: string; main: string }[];
dt_txt: string;
}

interface Forecast {
list: ForecastList[];
}

const fadeInUp = {
initial: { opacity: 0, y: 30 },
animate: { opacity: 1, y: 0 },
transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
animate: {
transition: {
    staggerChildren: 0.15,
    delayChildren: 0.1
}
}
};

const scaleIn = {
initial: { scale: 0.8, opacity: 0 },
animate: { scale: 1, opacity: 1 },
transition: { duration: 0.6, ease: "easeOut" }
};

const weatherIcons: Record<string, string> = {
'01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
'03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
'09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌦️',
'11d': '⛈️', '11n': '⛈️', '13d': '🌨️', '13n': '🌨️',
'50d': '🌫️', '50n': '🌫️',
};

const WeatherApp = () => {
const api_key = process.env.OPENWEATHER_KEY || 'your-api-key-here';

const [weatherData, setWeatherData] = useState<Weather | null>(null);
const [forecastData, setForecastData] = useState<Forecast | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [searchQuery, setSearchQuery] = useState('');
const [currentTime, setCurrentTime] = useState(new Date());
const [animationKey, setAnimationKey] = useState(0);
const [wicon, setWicon] = useState('☁️');

const searchInputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
const timer = setInterval(() => setCurrentTime(new Date()), 1000);
return () => clearInterval(timer);
}, []);

const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;

    const [weatherResponse, forecastResponse] = await Promise.all([
    fetch(weatherUrl),
    fetch(forecastUrl)
    ]);

    if (!weatherResponse.ok || !forecastResponse.ok) throw new Error();

    const weather = await weatherResponse.json();
    const forecast = await forecastResponse.json();

    setWeatherData(weather);
    setForecastData(forecast);
    setWicon(weatherIcons[weather.weather[0].icon] || '☀️');
    setAnimationKey(prev => prev + 1);
    setError('');
} catch {
    setError('Failed to fetch weather data');
} finally {
    setLoading(false);
}
}, [api_key]);

const searchWeather = useCallback(async (city: string = searchQuery) => {
if (!city.trim()) return;

setLoading(true);
setError('');

try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${api_key}`;

    const [weatherResponse, forecastResponse] = await Promise.all([
    fetch(weatherUrl),
    fetch(forecastUrl)
    ]);

    if (!weatherResponse.ok || !forecastResponse.ok) throw new Error();

    const weather = await weatherResponse.json();
    const forecast = await forecastResponse.json();

    setWeatherData(weather);
    setForecastData(forecast);
    setWicon(weatherIcons[weather.weather[0].icon] || '☀️');
    setAnimationKey(prev => prev + 1);
    setError('');
} catch {
    setError('City not found. Please try a different city name.');
} finally {
    setLoading(false);
}
}, [api_key, searchQuery]);


const getCurrentLocationWeather = useCallback(async () => {
if (navigator.geolocation) {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
    async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchWeatherByCoords(latitude, longitude);
    },
    () => {
        setError('Location access denied. Please search for a city manually.');
        setLoading(false);
        searchWeather('London');
    }
    );
} else {
    setError('Geolocation is not supported.');
    searchWeather('London');
}
}, [fetchWeatherByCoords, searchWeather]);

useEffect(() => {
getCurrentLocationWeather();
}, [getCurrentLocationWeather]);


const formatTime = (timestamp: number) => new Date(timestamp * 1000).toLocaleTimeString('en-US', {
hour: '2-digit',
minute: '2-digit'
});

const getDayName = (timestamp: number) => new Date(timestamp * 1000).toLocaleDateString('en-US', {
weekday: 'short'
});

const getWeatherGradient = (weatherMain: string) => {
switch (weatherMain?.toLowerCase()) {
    case 'clear':
    return 'from-yellow-400 via-orange-500 to-red-500';
    case 'clouds':
    return 'from-gray-400 via-gray-500 to-gray-600';
    case 'rain':
    return 'from-blue-400 via-blue-500 to-blue-600';
    case 'thunderstorm':
    return 'from-purple-400 via-purple-600 to-indigo-700';
    case 'snow':
    return 'from-blue-100 via-blue-200 to-blue-300';
    case 'mist':
    case 'fog':
    return 'from-gray-300 via-gray-400 to-gray-500';
    default:
    return 'from-blue-400 via-purple-500 to-indigo-600';
}
};

return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-black relative">
    {/* Animated Background Elements */}
    <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-20 left-10 w-32 h-32 md:w-72 md:h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
    <div className="absolute top-40 right-10 w-32 h-32 md:w-72 md:h-72 bg-yellow-300 dark:bg-yellow-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-20 w-32 h-32 md:w-72 md:h-72 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>

    {/* Hero Section */}
    <section className="relative z-10 overflow-hidden">
    <div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto text-center">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg">
            <Activity className="w-4 h-4 mr-2" />
            Weather Vista
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Real-time{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
                Weather
            </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto font-medium">
            {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}
            </p>
            
            <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-800 dark:text-gray-200 mb-12">
            {currentTime.toLocaleTimeString()}
            </div>
        </motion.div>
        
        {/* Enhanced Search Section */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto mb-12"
        >
            <div className="relative flex-1 w-full">
            <input
                ref={searchInputRef}
                type="text"
                className="w-full px-6 py-4 lg:px-8 lg:py-5 text-lg lg:text-xl rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-gray-200/50 dark:border-gray-600/50 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 shadow-xl hover:shadow-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchWeather()}
                placeholder="Search for any city..."
            />
            </div>
            <button
            onClick={() => searchWeather()}
            className="px-8 py-4 lg:px-10 lg:py-5 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white text-lg lg:text-xl rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3"
            >
            <Search className="w-5 h-5" />
            Search
            </button>
            <button
            onClick={getCurrentLocationWeather}
            className="px-6 py-4 lg:px-8 lg:py-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl text-gray-900 dark:text-white rounded-2xl border-2 border-gray-200/50 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            title="Use current location"
            >
            <MapPin className="w-5 h-5" />
            </button>
        </motion.div>
        </div>
    </div>
    </section>

    {/* Error Message */}
    {error && (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
    >
        <div className="bg-red-50/80 dark:bg-red-900/30 backdrop-blur-xl border border-red-200 dark:border-red-800 rounded-2xl p-6 shadow-xl">
        <p className="text-red-600 dark:text-red-400 text-lg text-center font-medium">{error}</p>
        </div>
    </motion.div>
    )}

    {/* Loading State */}
    {loading && (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center py-16"
    >
        <div className="flex items-center space-x-4 text-gray-900 dark:text-white">
        <div className="animate-spin rounded-full h-10 w-10 lg:h-12 lg:w-12 border-b-2 border-purple-600"></div>
        <span className="text-lg lg:text-xl font-medium">Loading weather data...</span>
        </div>
    </motion.div>
    )}

    {/* Main Weather Display */}
    {weatherData && (
    <motion.div
        key={animationKey}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
    >
        {/* Current Weather Hero Card */}
        <div className={`bg-gradient-to-br ${getWeatherGradient(weatherData.weather[0].main)} p-1 rounded-3xl shadow-2xl mb-12 transform hover:scale-[1.02] transition-all duration-500`}>
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 lg:p-12">
            <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
            >
            <div className="text-8xl lg:text-9xl xl:text-[10rem] mb-6 filter drop-shadow-lg">
                {wicon}
            </div>
            
            <div className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-light text-gray-900 dark:text-white mb-4">
                {Math.round(weatherData.main.temp)}°C
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p className="text-xl lg:text-2xl xl:text-3xl text-gray-600 dark:text-gray-300 capitalize mb-3 font-medium">
                {weatherData.weather[0].description}
            </p>
            <p className="text-lg lg:text-xl xl:text-2xl text-gray-500 dark:text-gray-400">
                Feels like {Math.round(weatherData.main.feels_like)}°C
            </p>
            <div className="flex justify-center items-center gap-4 mt-4 text-sm lg:text-base text-gray-600 dark:text-gray-400">
                <span>H: {Math.round(weatherData.main.temp_max)}°</span>
                <span>L: {Math.round(weatherData.main.temp_min)}°</span>
            </div>
            </motion.div>
        </div>
        </div>

        {/* Enhanced Weather Stats Grid */}
        <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12"
        >
        <motion.div variants={fadeInUp}>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 dark:from-blue-500/30 dark:to-blue-600/20 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-blue-200/30 dark:border-blue-400/30">
            <div className="flex items-center space-x-4">
                <div className="p-3 lg:p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
                <Droplets className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <div>
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white">{weatherData.main.humidity}%</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm lg:text-base font-medium">Humidity</div>
                </div>
            </div>
            </div>
        </motion.div>
        
        <motion.div variants={fadeInUp}>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 dark:from-purple-500/30 dark:to-purple-600/20 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-purple-200/30 dark:border-purple-400/30">
            <div className="flex items-center space-x-4">
                <div className="p-3 lg:p-4 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg">
                <Wind className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <div>
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white">{Math.round(weatherData.wind.speed * 3.6)} km/h</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm lg:text-base font-medium">Wind Speed</div>
                </div>
            </div>
            </div>
        </motion.div>
        
        <motion.div variants={fadeInUp}>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 dark:from-green-500/30 dark:to-green-600/20 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-green-200/30 dark:border-green-400/30">
            <div className="flex items-center space-x-4">
                <div className="p-3 lg:p-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
                <Eye className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <div>
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white">{(weatherData.visibility / 1000).toFixed(1)} km</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm lg:text-base font-medium">Visibility</div>
                </div>
            </div>
            </div>
        </motion.div>
        
        <motion.div variants={fadeInUp}>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 dark:from-orange-500/30 dark:to-orange-600/20 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-orange-200/30 dark:border-orange-400/30">
            <div className="flex items-center space-x-4">
                <div className="p-3 lg:p-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
                <Gauge className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <div>
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white">{weatherData.main.pressure}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm lg:text-base font-medium">Pressure hPa</div>
                </div>
            </div>
            </div>
        </motion.div>
        </motion.div>

        {/* Enhanced Sun Times */}
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 dark:from-yellow-500/30 dark:to-orange-500/30 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-yellow-200/30 dark:border-yellow-400/30">
            <div className="flex items-center space-x-6">
            <div className="p-4 lg:p-5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg">
                <Sunrise className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
            </div>
            <div>
                <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">Sunrise</div>
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-yellow-600 dark:text-yellow-400">{formatTime(weatherData.sys.sunrise)}</div>
            </div>
            </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 dark:from-orange-500/30 dark:to-red-500/30 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-orange-200/30 dark:border-orange-400/30">
            <div className="flex items-center space-x-6">
            <div className="p-4 lg:p-5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
                <Sunset className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
            </div>
            <div>
                <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">Sunset</div>
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-orange-600 dark:text-orange-400">{formatTime(weatherData.sys.sunset)}</div>
            </div>
            </div>
        </div>
        </motion.div>

        {/* Enhanced 5-Day Forecast */}
        {forecastData && (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
        >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-center mb-8 lg:mb-12">
                <Calendar className="h-8 w-8 lg:h-10 lg:w-10 text-purple-600 mr-4" />
                <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white">5-Day Forecast</h3>
            </div>
            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6"
            >
                {forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 5).map((forecast, index) => (
                <motion.div key={index} variants={scaleIn}>
                    <div className="bg-gradient-to-br from-white/60 to-white/30 dark:from-gray-700/60 dark:to-gray-800/30 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200/30 dark:border-gray-600/30">
                    <div className="text-center">
                        <div className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {index === 0 ? 'Today' : getDayName(forecast.dt)}
                        </div>
                        <div className="text-4xl lg:text-5xl mb-4 filter drop-shadow-sm">
                        {weatherIcons[forecast.weather[0].icon] || '☀️'}
                        </div>
                        <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {Math.round(forecast.main.temp)}°C
                        </div>
                        <div className="text-sm lg:text-base text-gray-600 dark:text-gray-300 capitalize font-medium">
                        {forecast.weather[0].description}
                        </div>
                    </div>
                    </div>
                </motion.div>
                ))}
            </motion.div>
            </div>
        </motion.div>
        )}
    </motion.div>
    )}

    <style jsx>{`
    @keyframes blob {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
        animation: blob 7s infinite;
    }
    .animation-delay-2000 {
        animation-delay: 2s;
    }
    .animation-delay-4000 {
        animation-delay: 4s;
    }
    `}</style>
</div>
);
};

export default WeatherApp;
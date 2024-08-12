import { useState, useEffect } from 'react';
import axios from 'axios';
import WebApp from '@twa-dev/sdk';

const zodiacSigns = [
  { name: 'Aries', dates: 'March 21 - April 19', icon: '♈' },
  { name: 'Taurus', dates: 'April 20 - May 20', icon: '♉' },
  { name: 'Gemini', dates: 'May 21 - June 20', icon: '♊' },
  { name: 'Cancer', dates: 'June 21 - July 22', icon: '♋' },
  { name: 'Leo', dates: 'July 23 - August 22', icon: '♌' },
  { name: 'Virgo', dates: 'August 23 - September 22', icon: '♍' },
  { name: 'Libra', dates: 'September 23 - October 22', icon: '♎' },
  { name: 'Scorpio', dates: 'October 23 - November 21', icon: '♏' },
  {
    name: 'Sagittarius',
    dates: 'November 22 - December 21',
    icon: '♐',
  },
  {
    name: 'Capricorn',
    dates: 'December 22 - January 19',
    icon: '♑',
  },
  { name: 'Aquarius', dates: 'January 20 - February 18', icon: '♒' },
  { name: 'Pisces', dates: 'February 19 - March 20', icon: '♓' },
];

function App() {
  const [language, setLanguage] = useState('en');
  const [horoscope, setHoroscope] = useState<any | null>(null);
  const [selectedSign, setSelectedSign] = useState<string | null>(
    null
  );

  useEffect(() => {
    const userLang =
      WebApp.initDataUnsafe?.user?.language_code || 'en';
    setLanguage(userLang === 'ru' ? 'ru' : 'en');
  }, []);

  const fetchHoroscope = async (sign: string) => {
    try {
      const response = await axios.post(
        'http://5.35.90.171:61011/get_horoscope/',
        {
          sign: sign.toLowerCase(),
          language: language === 'ru' ? 'original' : 'translated',
        },
        {
          headers: {},
        }
      );
      setHoroscope(response.data);
      setSelectedSign(sign);
    } catch (error) {
      console.error('Failed to fetch horoscope:', error);
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ru' : 'en'));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-4">
      <header className="w-full flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          {language === 'ru' ? 'Гороскоп' : 'Horoscope'}
        </h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={toggleLanguage}
        >
          {language === 'ru' ? 'English' : 'Русский'}
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {zodiacSigns.map((sign) => (
          <div
            key={sign.name}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition"
            onClick={() => fetchHoroscope(sign.name)}
          >
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <span className="text-2xl mr-2">{sign.icon}</span>{' '}
              {sign.name}
            </h2>
            <p className="text-gray-500">{sign.dates}</p>
          </div>
        ))}
      </div>

      {!!selectedSign && !!horoscope && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
            <button
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
              onClick={() => setSelectedSign(null)}
            >
              {language === 'ru' ? 'Назад' : 'Back'}
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              {selectedSign}
            </h2>
            <p>{horoscope.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

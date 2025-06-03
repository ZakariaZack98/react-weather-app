import React, { useContext } from 'react'
import { WeatherContext } from '../../contexts/WeatherContext';
import NewsCardHorizontal from '../common/NewsCardHorizontal';
import NewsCard from '../common/NewsCard';

const NewsSec = () => {
  const {newsData} = useContext(WeatherContext);
  const sampleData = newsData?.slice(2,12);
  return (
    <div className='w-full'>
      <h2 className="text-3xl font-bold mb-4">LATEST WEATHER NEWS</h2>
      <div className='w-full flex flex-wrap items-stretch justify-between gap-y-5'>
      {
        sampleData?.map((article, idx) => (
          <>
            {
              idx === 0 || idx === 5 || idx === 6 ? (
                <div key={idx} className="xl:w-[48%] w-full">
                  <NewsCardHorizontal key={idx} article={article}/>
                </div>
              ) : (
                <div key={idx} className='sm:w-[48%] xl:w-[24%] w-full'>
                  <NewsCard key={idx} article={article}/>
                </div>
              )
            }
          </>
        ))
      }
    </div>
    </div>
  )
}

export default NewsSec
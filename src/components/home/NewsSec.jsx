import React, { useContext } from 'react'
import { WeatherContext } from '../../contexts/WeatherContext';
import NewsCardHorizontal from '../common/NewsCardHorizontal';
import NewsCard from '../common/NewsCard';

const NewsSec = () => {
  const {newsData} = useContext(WeatherContext);
  const sampleData = newsData?.slice(2,12);
  return (
    <div className='w-full flex flex-wrap items-stretch justify-between gap-y-5'>
      {
        sampleData?.map((article, idx) => (
          <>
            {
              idx === 0 || idx === 5 || idx === 6 ? (
                <div className="w-[48%]">
                  <NewsCardHorizontal key={idx} article={article}/>
                </div>
              ) : (
                <div className='w-[24%]'>
                  <NewsCard key={idx} article={article}/>
                </div>
              )
            }
          </>
        ))
      }
    </div>
  )
}

export default NewsSec
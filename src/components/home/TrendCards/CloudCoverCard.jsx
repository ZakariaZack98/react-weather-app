import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useSelector } from 'react-redux';

const CloudCoverCard = () => {
  const { hourlyForecastData, weatherDataNow } = useSelector(state => state.weather);
  const futureData = hourlyForecastData[4];
  const cloudCoverNow = weatherDataNow?.clouds?.all;
  const cloudCoverFuture = futureData?.clouds?.all;
  const getCloudTrend = () => {
    if (cloudCoverFuture > cloudCoverNow) {
      return 'likely to rise'
    } else if (cloudCoverFuture === cloudCoverNow) {
      return 'likely to stay similiar'
    } else return 'likely to decrease'
  }

  return (
    <div className='min-h-75 p-4 flex flex-col gap-y-3 justify-between rounded-xl glass-effect'>
      <h1 className='font-semibold'>Cloud Cover</h1>
      <div className="flex w-full justify-center items-center">
        <div className="w-35 h-35 border border-[rgba(255,255,255,0.23)] rounded-full surface-card">
          {
            cloudCoverNow <= 10 ? (
              <DotLottieReact
                key="clear"
                src="https://lottie.host/93bc5c0b-2cf3-4cb2-af95-ad08f14fdf6b/vs6fzTP4e4.lottie"
                style={{ width: 140, height: 140 }}
                loop
                autoplay
              />
            ) : cloudCoverNow <= 50 ? (
              <DotLottieReact
                key="partly"
                src="https://lottie.host/ceec6e6d-885d-453c-a152-aaf1fde79d5d/BPZ20XhuHv.lottie"
                style={{ width: 140, height: 140, scale: '1.3' }}
                loop
                autoplay
              />
            ) : (
              <DotLottieReact
                key="cloudy"
                src="https://lottie.host/4cd9f87d-62e7-428d-a836-ca34f577b989/Au3BnocTTt.lottie"
                style={{ width: 140, height: 140, transform: 'translateX(10px)' }}
                loop
                autoplay
              />
            )
          }
        </div>
      </div>
      <div className="textSec">
        <div className="flex items-center gap-x-2">
          <p className='font-semibold'>Now: <strong>{cloudCoverNow}%</strong> cloud coverage</p>
        </div>
        <p className='text-[13px] mt-2'>Clouds in the sky <strong>{getCloudTrend()}</strong> in upcoming hours {
          getCloudTrend() !== 'likely to stay similiar' && <span className='font-semibold'>by {cloudCoverFuture - cloudCoverNow}%</span>
        }.</p>
      </div>
    </div>
  )
}

export default CloudCoverCard
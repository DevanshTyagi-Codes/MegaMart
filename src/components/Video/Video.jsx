import React from 'react'

const Video = () => {
  return (
    <video
    src="./video.mp4"
    loop
    autoPlay
    muted
    className="w-[90vw] rounded"
  ></video>
  )
}

export default Video

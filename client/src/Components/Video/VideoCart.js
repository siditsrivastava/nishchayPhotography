import React from 'react'

const VideoCart = (props) => {
  return (
    <iframe className="embed-responsive" src={props.items} title='youtube'referrerpolicy="no-referrer"/>
)
}

export default VideoCart
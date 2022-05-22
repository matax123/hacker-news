import React, { useState } from 'react'
import '../styles/News.css'

const News = (props: NewsType) => {

  const [liked, setLiked] = useState(localStorage.getItem(String(props.id)) ? true : false);

  const handleLike = (id: string) => {
    if (localStorage.getItem(id)) {
      localStorage.removeItem(id);
    }
    else {
      localStorage.setItem(id, JSON.stringify(props));
    }
    setLiked(!liked);
  }

  return (
    <div className='news__container'>
      <div>
        <a className='news__info' href={props.url} target='_blank' >
          <div>
            <svg className='iconmonstr-time-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z" /></svg>
            <span>{props.created_at + " by " + props.author}</span>
          </div>
          <div>
            <span >{props.title}</span>
          </div>
        </a>
        <div className='news__like' onClick={() => {
          handleLike(String(props.id))
        }}>
          {
            localStorage.getItem(String(props.id)) ? <svg className='iconmonstr-favorite-3-svg' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" /></svg>
              : <svg className='iconmonstr-heart' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" /></svg>
          }
        </div>
      </div>
    </div>
  )
}

export default News
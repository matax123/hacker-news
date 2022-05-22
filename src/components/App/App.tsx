import React, { useEffect, useRef, useState } from 'react';
import '../../styles/App.css';
import News from '../News/News';

const App = () => {

  const [allNews, setAllNews] = useState(true);
  const [newsArray, setNewsArray] = useState([]);
  const [filter, setFilter] = useState(localStorage.getItem('selectedNews') ? localStorage.getItem('selectedNews') : 'default');
  const [previousFilter, setPreviousFilter] = useState(localStorage.getItem('selectedNews') ? localStorage.getItem('selectedNews') : 'default');
  const [page, setPage] = useState(0);

  let observedElements: number = 0;

  const footer = useRef(null)

  async function fetchNews(query: string, page: number) {
    let data: NewsResponseType[] = [];
    let newNewsArray: NewsType[] = [];

    data = await fetch('https://hn.algolia.com/api/v1/search_by_date?query=' + query + '&page=' + page).then(res => res.json()).then(res => res.hits)
    data.forEach((item: NewsResponseType, index: number) => {
      if (item.author && item.story_title && item.story_url && item.created_at) {
        
        let date = new Date(item.created_at)
        var ms = (Date.now() - date.getTime())
        let time_string: string = '';
        if(ms/1000 < 60) {
          time_string = Math.floor(ms/1000) + ' seconds ago'
        }
        else if(ms/1000/60 >= 1 && ms/1000/60 < 60) {
          time_string = Math.floor(ms/1000/60) + ' minutes ago'
        }
        else if(ms/1000/60/60 >= 1 && ms/1000/60/60 < 24) {
          time_string = Math.floor(ms/1000/60/60) + ' hours ago'
        }
        else{
          time_string = Math.floor(ms/1000/60/60/24) + ' days ago'
        }

        newNewsArray.push({
          id: item.objectID,
          created_at: time_string,
          author: item.author,
          title: item.story_title,
          url: item.story_url,
        })
      }
    });

    return newNewsArray;
  }

  async function activeObserver(toggle: boolean) {
    if (toggle === true) {
      footer.current.style.display = 'block';
    }
    else {
      footer.current.style.display = 'none';
    }
  }

  useEffect(() => {
    if (filter !== previousFilter) {
      fetchNews(filter, 0).then(res => {
        setNewsArray(res);
        activeObserver(true);
      })
      setPage(1);
      setPreviousFilter(filter);
    }
    else {
      const observer = new IntersectionObserver(async (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          let news = fetchNews(filter, page);
          news.then(res => {
            //set newsArray to [previous newsArray + new news]
            setNewsArray(prev => [...prev, ...res]);
            setPage(prev => prev + 1)
          })
        }
      }, { threshold: 0.5 })

      activeObserver(false)
      if (allNews === true && filter !== 'default') {
        activeObserver(true)
        if (observedElements === 0) {
          observer.observe(footer.current)
          observedElements++;
        }
        else {
          observer.disconnect();
        }
      }
      //eslint-disable-next-line
      return () => observer.disconnect();
    }
    return () => { };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, footer, page, allNews]);

  return (
    <div>
      <header className="app__header">
        <span>
          HACKER NEWS
        </span>
      </header>
      <main className='app__content'>
        <section>
          <div>
            <button className={allNews ? 'app__button-all app__selected-button' : 'app__button-all'} onClick={() => { setAllNews(true) }}>
              All
            </button>
            <button className={!allNews ? 'app__button-my-faves app__selected-button' : 'app__button-my-faves'} onClick={() => { setAllNews(false) }}>
              My faves
            </button>
          </div>
        </section>
        <section className='app__news-container'>
          <div className='app__news-grid'>
            <div className='app__select-news-container' style={allNews ? { visibility: 'visible' } : { visibility: 'hidden' }}>
              <select onChange={
                async (e) => {
                  localStorage.setItem('selectedNews', e.target.value);
                  setFilter(e.target.value);
                }
              }
                defaultValue={filter}
              >
                <option value="default" disabled hidden>Select your news</option>
                <option value="Angular">Angular</option>
                <option value="React">React</option>
                <option value="Vue">Vue</option>
              </select>
            </div>
            <div className='app__news'>
              {allNews ?
                <div>
                  {
                    newsArray.map((news: NewsType, index: number) => {
                      return <News
                        {...news}
                        key={index}
                      />
                    })
                  }
                </div>
                :
                <div>
                  {
                    Object.keys(localStorage).map((key: string, index: number) => {
                      if (key !== 'selectedNews') {
                        return <News
                          {...JSON.parse(localStorage.getItem(key))}
                          key={index}
                        />
                      }
                      return null;
                    })
                  }
                </div>
              }
            </div>
          </div>
        </section>
        <footer className='app__footer' ref={footer} />
      </main>
    </div>
  );
}

export default App;

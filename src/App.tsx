import React, { useState } from 'react';
import './styles/App.css';
import News from './components/News';

const App = () => {

  const [allNews, setAllNews] = useState(true);
  const [newsArray, setNewsArray] = useState([]);

  async function fetchNews(query: string) {
    let data: NewsResponseType[] = [];
    let newNewsArray: NewsType[] = [];

    data = await fetch('https://hn.algolia.com/api/v1/search_by_date?query=' + query + '&page=0').then(res => res.json()).then(res => res.hits)
    data.forEach((item: NewsResponseType, index: number) => {
      if (item.author && item.story_title && item.story_url && item.created_at) {
        newNewsArray.push({
          id: item.objectID,
          created_at: item.created_at,
          author: item.author,
          title: item.story_title,
          url: item.story_url,
        })
      }
    });
    return newNewsArray;
  }

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
              <div className='app__select-news-container' style={
                allNews ? { visibility: 'visible' } : { visibility: 'hidden' }
              }>
                <select onChange={async (e) => {
                  if (e.target.value !== 'default') {
                    await fetchNews(e.target.value).then(res => setNewsArray(res));
                  }
                }
                }>
                  <option value="default">Select your news</option>
                  <option value="Angular">Angular</option>
                  <option value="React">React</option>
                  <option value="Vue">Vue</option>
                </select>
              </div>

              <div className='app__news'>
                {allNews ?
                  <div>
                    {
                      newsArray.map((news: NewsType) => {
                        return <News
                          {...news}
                          key={news.id}
                        />
                      })
                    }
                  </div>
                  :
                  <div>
                    {
                      Object.keys(localStorage).map((key: string) => {
                        return <News
                          {...JSON.parse(localStorage.getItem(key))}
                          key={key}
                        />
                      })
                    }
                  </div>
                }
              </div>
            </div>

        </section>
      </main>
    </div>
  );
}

export default App;

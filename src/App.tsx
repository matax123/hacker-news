import React, { useEffect, useState } from 'react';
import './styles/App.css';
import News from './components/News';

const App = () => {

  const [newsArray, setNewsArray] = useState([]);

  async function fetchNews() {
    let response = await fetch('https://hn.algolia.com/api/v1/search_by_date?query=angular&page=1', {
      method: "GET"
    }).then(res => res.json()).then(res => res.hits);
    let newNewsArray: NewsType[] = [];
    response.forEach((item: NewsResponseType, index: number) => {
      console.log(item)
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
    console.log(newNewsArray)
    return newNewsArray;
  }

  useEffect(() => {
    async function fetchData() {
      let response = await fetchNews();
      setNewsArray(response);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="HACKER-NEWS">
        <span>
          HACKER NEWS
        </span>
      </header>
      <main>
        <section>
          <div>
            <button>
              All
            </button>
            <button>
              My faves
            </button>
          </div>
          <div>
            <select name="" id="">
              <option value="default" >Select your news</option>
              <option value="Angular">Angular</option>
              <option value="React">React</option>
              <option value="Vue">Vue</option>
            </select>
          </div>
        </section>
        <section className='app__news'>
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
        </section>
      </main>
    </div>
  );
}

export default App;

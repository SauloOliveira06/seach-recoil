import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import dataInfo from './atoms/DataInfo';
import textInfo from './atoms/TextInfo';
import { TextSearch } from './interface/text.interface';
import searchQuery from './services/getQueryAPI';
import style from './styles/style.module.css';
import './App.css';

const App = () => {
  const [search, setSearch] = useRecoilState(dataInfo); // search -> array []
  const [text, setText] = useRecoilState(textInfo); // text -> string ' '

  const textInfoFill = useRecoilValue(searchQuery);

  useEffect(() => {
    setInterval(() => {
      setSearch(textInfoFill)
    }, 1000)
  }, []);

  const filteredInfo = text.length > 1
    ? search.filter((repo: TextSearch) => repo.title.includes(text))
    : [];

  return (
    <div className="App">
      <input
        type="text"
        name="search"
        placeholder="search..."
        onChange={e => setText(e.target.value)}
        value={text}
      />
      {
        text.length > 1 ? (
          filteredInfo.map((repo: TextSearch) => {
            return (
              <>
                <ul key={repo.id} >
                  <li className={style.list}>{repo.title}</li>
                </ul>
              </>
            )
          })
        ) : (
          search.map((repo: TextSearch) => {
            return (
              <>
                <ul key={repo.id}>
                  <li className={style.list}>{repo.title}</li>
                </ul>
              </>
            )
          })
        )
      }
    </div>
  );
}

export default App;

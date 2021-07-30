import React, { useState, useEffect } from 'react';
import Datatable from './components/Datatable';
import Title from './components/Title';
import './styles.css';

export default function App() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [searchColumns, setSearchColumns] = useState([
    'name',
    'gender',
  ]);
  const [loading, setLoading] = useState(false)

  //useEffect is making the api call when the page mounts which
  //allows for the data to populate automatically
  useEffect(() => {
    fetch('https://swapi.dev/api/people')
      .then((response) => response.json())
      .then((json) => {
        setData(json.results)
        setLoading(true)
      })
      .catch(error => console.log(error))
  }, []);

  function search(rows) {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            //.indexOf > -1 returns -1 when searched value is not present
            .indexOf(q.toLowerCase()) > -1,
      ),
    );
  }

  const columns = data[0] && Object.keys(data[0]);
  return (
    <div>
      {!loading ? <div className="loading">Loading...</div> :
      <div>
      <Title pageTitle={"React Datatable"} />
      
      
      <div className="container">
        <div>
          <input
            type='text'
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="searchBox"
            placeholder="Search by columns"
          />
          {columns &&
            columns.map((column) => (
              <label className="checkbox">
                <input
                  type='checkbox'
                  checked={searchColumns.includes(column)}
                  onChange={(e) => {
                    const checked = searchColumns.includes(column);
                    setSearchColumns((prev) =>
                      checked
                        ? prev.filter((sc) => sc !== column)
                        : [...prev, column],
                    );
                  }}
                />
                {column}
              </label>
            ))}
        </div>
        <div>
          <Datatable data={search(data)} />
        </div>
      </div>
      </div>
      }
    </div>
  );
}


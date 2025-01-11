
import React, {useState, useEffect} from 'react';

function App() {
  const[data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/dataframe')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        console.log(typeof data)
        const parsedData = JSON.parse(data)
        setData(parsedData)
      })
      .catch((error) => console.error('Error getting data:', error))
  }, []);


  return (
    <div>
      <h1>Data Frame Table</h1>
      {data.length > 0 ? (
        <table border="1" color='black'>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) =>(
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading data... </p>
      )}
      
    </div>
  );
}

export default App;

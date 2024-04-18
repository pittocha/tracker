import { useState } from 'react';
import { Chart } from 'react-google-charts';
import './App.scss';

function Home() {
  const [selectedOption, setSelectedOption] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  /*
  vérification du token et redirection ci nécessaire
  const token = sessionStorage.getItem('token');

  if (!token) {
    wondow.location.href = '/';
    }
  */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/keyword-search?q=${selectedOption}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },        
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResponseData(data);
      setError(null);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la requête:', error)
      setResponseData(null);
      setError(error.message);
    }
  };
 
  return (
    <div className="App">
      <header className="App-header">
      <form className='etf-form' onSubmit={handleSubmit} method='GET'>
        <label className='form-title'>choisissez votre etf:</label>
        <select className='form-select' name='etf' id='etf-select' value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          <option value=''>--choisissez une option</option>
          <option value='PSP5:EPA'>S&P 500</option>
          <option value='PUST:EPA'>NASDAC 100</option>
          <option value='C40:EPA'>CAC 40</option>
          <option value='EUEA:AMS'>EURO STOXX 50</option>
          <option volue='IFRE:AMS'>MSCI France</option>
        </select>
        <button className='form-button' type='submit'>selectionnez</button>
      </form>
      {/* affichage de la reponce ou de l'erreur */}
      <div className='graph'>
      {responseData &&
        (
          <Chart
          width={'100%'}
          height={'400px'}
          chartType='LineChart'
          loader={<div>Loading Chart</div>}
          data={[
            ['Date', 'Price'],
            ...responseData.graph.map(item => {
              const time = item.date.split(',')[1].trim();
              return [time, item.price];
            }),
          ]}
          options={{
            title: 'Evolution du prix',
            hAxis: {
              title: 'Date',
            },
            vAxis: {
              title: 'Price',
            },
          }}
          rootProps={{ 'data-testid': '1' }}
          />
        )
      }
      </div>
      {error && <div>Erreur : {error}</div>}
      </header>
    </div>
  );
}

export default Home;

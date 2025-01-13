
import React, {useState, useEffect} from 'react';
import Table from './components/Table.js'
import Slider from './components/Slider.js'
import DropdownTree from './components/DropDownTree.js';
import './app.css'

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]); // [startDate, endDate]
  const [revenueRange, setRevenueRange] = useState([null, null]); // [minRevenue, maxRevenue]
  const [netIncomeRange, setNetIncomeRange] = useState([null, null]); // [minNetIncome, maxNetIncome]

  const [sortOption, setSortOption] = useState({ field: "", order: "" });

  const applyFilters = () => {
    let updatedData = [...data];

    if (dateRange[0] !== null && dateRange[1] !== null) {
      updatedData = updatedData.filter(
        (item) =>
          new Date(item.date) >= new Date(dateRange[0]) &&
          new Date(item.date) <= new Date(dateRange[1])
      );
      console.log("filter by date: " , updatedData)
    }

    if (revenueRange[0] !== null && revenueRange[1] !== null) {
      updatedData = updatedData.filter(
        (item) =>
          item.revenue >= revenueRange[0] && item.revenue <= revenueRange[1]
      );
      console.log("filter by revenue: " , updatedData)
    }
  
    if (netIncomeRange[0] !== null && netIncomeRange[1] !== null) {
      updatedData = updatedData.filter(
        (item) =>
          item.netIncome >= netIncomeRange[0] &&
          item.netIncome <= netIncomeRange[1]
      );
    }
  
    setFilteredData(updatedData);
    console.log("updated data after applying filter", filteredData)
  }

  const applySort = () => {
    if(!sortOption.field || !sortOption.order) return;

    const dataToSort = filteredData.length > 0 ? [...filteredData] : [...data];

    const sortedData = dataToSort.sort((a, b) => {
      const field = sortOption.field;
      if (sortOption.order === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
  
    setFilteredData(sortedData);
    console.log("updated data after applying sort", filteredData)
  }

  const resetData = () => {
    setFilteredData(data);
    setDateRange([null, null]);
    setRevenueRange([null, null]);
    setNetIncomeRange([null, null]);

    setSortOption({ field: "", order: "" });
  }

  

  useEffect(() => {
    fetch('http://127.0.0.1:5000/dataframe')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const parsedData = JSON.parse(data) // convert data from string to json
        setData(parsedData)
        setFilteredData(parsedData)
      })
      .catch((error) => console.error('Error getting data:', error))
  }, []);



  const column = [
    {heading: 'Date', value: 'date' },
    {heading: 'Revenue', value: 'revenue'},
    {heading: 'Net Income', value: 'netIncome'},
    {heading: 'Gross Profit', value: 'grossProfit'},
    {heading: 'EPS', value: 'eps'},
    {heading: 'Operating Income', value: 'operatingIncome'},
  ]

  return (
    
    <div className='container'>
      <header>Financial Data Filtering App</header>



      <p>This data table contains annual income statements for Apple. You can filter the data by date, revenue, and net income. You can sort the data
      in ascending or descending order by date, revenue, or net income. To select filter or sort, make your adjustments and then click on the apply filter and apply sort buttons accordingly.
      This data was accessed via an API endpoint provided by financialmodelingprep.com, API key provided by ValueGlance.</p>

      <body>
        <Table data={filteredData} column={column} />
        <subheader>Apply Filters</subheader>

        <subsubheader>Year Range Filter</subsubheader>
        <Slider min={2020} max={2024} onRangeChange={(min, max) => setDateRange([new Date(`${min}-01-01`), new Date(`${max}-12-31`)])}/>

        <subsubheader>Revenue Range Filter</subsubheader>
        <Slider min={0} max={400000000000} onRangeChange={(min, max) => setRevenueRange([min, max])}/>

        <subsubheader>Net income Range Filter</subsubheader>
        <Slider min={0} max={100000000000} onRangeChange={(min, max) => setNetIncomeRange([min, max])}/>

        <button onClick={applyFilters}>Apply Filter</button>

        <subheader>Apply Data Sort</subheader>

        <DropdownTree onSortChange={(field, order) => setSortOption({field, order})} />
        <button onClick={applySort}>Apply Sort</button>

        <button onClick={resetData}>Reset Table</button>
      </body>
      


    </div>
  );
}


export default App;

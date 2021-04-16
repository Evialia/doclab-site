import React, { useState } from 'react'
import Logo from './Components/Logo'
import Input from './Components/Input'
import SearchResult from './Components/SearchResult'
import Footer from './Components/Footer'
import ReactDOM from 'react-dom'
import ResultLoader from './Components/ResultLoader'

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <>
      <div className='container'>
        <div className="row justify-content-center">
          <div className='col'>
            <Logo showSearch={showSearch} />
            <h1 className='title'>DocLab</h1>
            <Input
              type='text'
              onSubmit={value => {
                setShowSearch(value.length > 0)
                setQuery(value)
              }}
            />
          </div>
        </div>
        {query && <ResultLoader query={query} />}
      </div>
      <Footer />
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)


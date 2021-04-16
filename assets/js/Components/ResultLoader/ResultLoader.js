import React, { useState, useEffect } from 'react'
import SearchResult from '../SearchResult'

const ResultLoader = ({ query }) => {
  const [results, setResults] = useState(null)
  const [executionTime, setExecutionTime] = useState(0)

  useEffect(() => {
    setResults(null)
    setExecutionTime(0)
    const preExecutionTime = performance.now()
    fetch(`/api/search_results?query=${query}`)
      .then(res => res.json())
      .then(body => {
        const postExecutionTime = performance.now()
        setExecutionTime(postExecutionTime - preExecutionTime)
        setResults(body['hydra:member'])
      })
  }, [query])

  if (results === null) {
    return null
  }

  return results.length > 0 ? <>
    <p className='pt-3'>
      {results.length} Results ({+(executionTime/1000).toFixed(2)} seconds)
    </p>

    {results.map((result, index) => <SearchResult
      key={`result_${index}`}
      authors={JSON.parse(result.authors)}
      previewPath={`/public/media/${result.screenshot}`}
      title={result.title}
      url={result.url}
      description={result.description}
      topic={result.topic}
    />)}
  </>: <div className='no-results'>
    <h2>No Results found</h2>
    <p>No documents were found for '{query}', try altering your query. </p>
  </div>
}

export default ResultLoader

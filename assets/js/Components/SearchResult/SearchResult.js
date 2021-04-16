import React from 'react'
import PropTypes from 'prop-types'

const descriptionLength = 120
const titleLength = 70
const shownAuthors = 6

const trimString = (str, length) => {
  if (str) {
    let trimmedStr = str.substr(0, length)
    trimmedStr = trimmedStr.substr(0, Math.min(trimmedStr.length, trimmedStr.lastIndexOf(" ")))

    // Add ellipsis if the string has been trimmed
    if (str.length > trimmedStr.length) {
      trimmedStr += '...'
    }

    return trimmedStr
  }
}

const SearchResult = ({ title, description, url, authors, previewPath, topic }) => {
  return <a className='search-result' href={url} target='_blank'>
    <div className='row'>
      <div className='col-auto'>
        <div className='preview-wrapper'>
          <img src={previewPath} />
        </div>
      </div>
      <div className='col'>
        <h2>{title ? trimString(title, titleLength) : trimString(description, titleLength)}</h2>
        <p>{trimString(description, descriptionLength)}</p>
        {topic && <p className='capitalise'><small>Topic: {topic}</small></p>}
        {authors.length > 0 && <span className='authors'>
          {authors.slice(0, shownAuthors).join(', ')}{authors.length > shownAuthors ? '...' : ''}
        </span>}
      </div>
    </div>
  </a>
}

SearchResult.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  previewPath: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired
}

export default SearchResult

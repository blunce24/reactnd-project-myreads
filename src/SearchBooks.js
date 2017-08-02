import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
  static propTypes = {
   updateBook: PropTypes.func.isRequired,
   books: PropTypes.array.isRequired
  }

  state = {
   query: '',
   searchResults: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.searchBooks(query, 20)
  }

  searchBooks = (query, maxResults) => {
    if (query) {
      BooksAPI.search(query, maxResults).then((searchResults) => {
        if (
          searchResults &&
          searchResults.length &&
          typeof searchResults !== "undefined" &&
          !searchResults.error
        ) {
          searchResults = searchResults.map(result => {
            const bookOnShelf = this.props.books.find(bookOnShelf => bookOnShelf.id === result.id)
            if (bookOnShelf) {
              return bookOnShelf
            } else {
              return result
            }
          })
          this.setState({ searchResults: searchResults })
        } else {
          this.setState({ searchResults: [] })
        }
      })
    } else {
      this.setState({ searchResults: [] })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <ListBooks
              books={this.state.searchResults}
              onChangeShelf={this.props.updateBook}
            />
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks

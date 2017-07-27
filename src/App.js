import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import MainPage from './MainPage'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MainPage
            books={this.state.books}
            updateBook={this.updateBook}
          />
        )}/>
        <Route path='/search' component={SearchBooks}/>
      </div>
    )
  }
}

export default BooksApp

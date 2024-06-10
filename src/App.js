import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import DeleteBook from './components/DeleteBook';
import ViewBooks from './components/ViewBooks';
import Register from './components/Register';
import Login from './components/Login';
import BorrowBook from './components/BorrowBook';
import ReturnBook from './components/ReturnBook';
import ViewBorrowedBooks from './components/ViewBorrowedBooks';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/add" component={AddBook} />
                    <Route path="/update" component={UpdateBook} />
                    <Route path="/delete" component={DeleteBook} />
                    <Route path="/" exact component={ViewBooks} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/borrow" component={BorrowBook} />
                    <Route path="/return" component={ReturnBook} />
                    <Route path="/borrowed" component={ViewBorrowedBooks} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;

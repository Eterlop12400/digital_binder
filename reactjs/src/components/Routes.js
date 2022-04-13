import React from 'react';

// React Router
import { Routes, Route, Navigate } from 'react-router-dom';

// React Components
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Collection from '../pages/MyCollection';
import Deck from '../pages/MyDeck';
import Explore from '../pages/Explore';
import Profile from '../pages/Profile';
import CollectionView from '../pages/CollectionView';
import DeckView from '../pages/DeckView';
import DeckEdit from '../pages/DeckEdit';
import CollectionEdit from '../pages/CollectionEdit';
import CardView from '../pages/CardView';
import CollectionNew from '../pages/CollectionNew';
import DeckNew from '../pages/DeckNew';
import SetCardView from '../pages/SetCardView';
import Set from '../pages/Set';
import SetView from '../pages/SetView';


const Nav = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Navigate to='/dashboard' />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/collection/:id' element={<CollectionView />} />
            <Route path='/collection/new' element={<CollectionNew />} />
            <Route path='/collection/:id/edit' element={<CollectionEdit />} />
            <Route path='/deck' element={<Deck />} />
            <Route path='/deck/:id' element={<DeckView />} />
            <Route path='/deck/new' element={<DeckNew />} />
            <Route path='/deck/:id/edit' element={<DeckEdit />} />
            <Route path='/card/:id' element={<CardView />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/explore/:id' element={<Set />} />
            <Route path='/set/:id' element={<SetView />} />
            <Route path='/set/card/:id' element={<SetCardView />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
    );
}

export default Nav;
import React, { useState, useEffect } from 'react';
import { useInput } from '../../hooks/input-hook';
import { SearchBar, Item } from '../../components';
import logo from '../../images/target.svg';
import './home.css';

function Home() {
    const [currItem, setCurrItem] = useState(undefined);
    const [currMessage, setCurrMessage] = useState('Please Begin Your Search');
    useEffect(() => {
    }, []);
    const { value:query, setValue:setQuery, reset:resetQuery } = useInput('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        fetch(`/item?tcin=${query}`).then(res => res.json()).then(data => {
        setCurrMessage(data.message)
        if (data.success) {
            var item = {}
            item['location_name'] = data.location_name
            item['location_id'] = data.location_id
            item['price'] = data.minCost
            setCurrItem(item);
        } else {
            setCurrItem(undefined);
        }
        resetQuery();
        });
    }

    return (
        <div className="App">
        <header className="App-header"> 
            <img src={logo} className="App-logo" alt="logo" />
            <SearchBar handleSubmit={handleSubmit} searchQuery={query} setSearchQuery={setQuery}/>
            <Item item={currItem}></Item>
            <p class="text">{currMessage}</p>
        </header>
        </div>
    );
}

export default Home;
import React, { useState } from 'react';
import { useInput } from '../../hooks/input-hook';
import { ShopSearchBar, ShopItem, Modal } from '../../components';
import logo from '../../images/target.svg';
import './home.css';

function Home() {
    const [currItem, setCurrItem] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [currMessage, setCurrMessage] = useState('Please Begin Your Search');
    const { value:query, setValue:setQuery, reset:resetQuery } = useInput('');

    const isTcin = (str) => {
        return str.length === 8 && /^\d+$/.test(str);
    }
    const close = () => {
        setOpen(false)
    }
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        let url = '/item'
        if (isTcin(query)) {
            url += `/${query}`
        } else {
            setCurrMessage("Invalid Input, please try entering the item's TCIN");
            resetQuery();
            return;
        }
        
        fetch(url).then(res => res.json()).then(data => {
            setCurrMessage(data.message)
            if (data.success) {
                var item = JSON.parse(data.result)
                setCurrItem(item);
            } else {
                setCurrItem(undefined);
            }
            setOpen(true);
            resetQuery();
        });
    }

    return (
        <div className="App">
            <header className="header"> 
                <div className="content">
                    <img src={logo} className="logo" alt="logo" />
                    <ShopSearchBar handleSubmit={handleSubmit} searchQuery={query} setSearchQuery={setQuery}/>
                </div>
            </header>
            <div className='body'>
                <Modal show={open} close={close}>{currItem ? <ShopItem item={currItem}/> :  <p class="text">{currMessage}</p>}</Modal>
            </div>
            <div className='footer'>
                <div id='tribute' className='text-center'>
                    <small>
                        Fun gadget by&nbsp;
                        <a id='name' href="https://www.github.com/chenfeiyu132" data-content="Feiyu Wong">
                            Feiyu Wong
                        </a>
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Home;
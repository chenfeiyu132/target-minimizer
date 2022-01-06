import React, { useState } from 'react';
import { useInput } from '../../hooks/input-hook';
import { ShopSearchBar, ShopItem, Modal, Info } from '../../components';
import logo from '../../images/target.svg';
import './home.css';

function Home() {
    const [currItem, setCurrItem] = useState(undefined);
    const [modalTitle, setModalTitle] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [modalContent, setModalContent] = useState(<p class="text">Please begin your search</p>);
    const { value:query, setValue:setQuery, reset:resetQuery } = useInput('');

    const isTcin = (str) => {
        return str.length === 8 && /^\d+$/.test(str);
    }
    const close = () => {
        setModalOpen(false);
    }

    const populateHelper = () => {
        setModalTitle('Help')
        setModalContent(<Info/>)
        setModalOpen(true);
    }   

    const handleRandom = (evt) => {
        evt.preventDefault();
        const url = '/item/random'
        fetch(url).then(res => res.json()).then(data => {
            setMessage(null);
            setModalTitle('Item Details');
            var item = JSON.parse(data.result)
            setCurrItem(item);
            setModalContent(<ShopItem item={item}/>)
            setModalOpen(true);
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let url = '/item'
        if (isTcin(query)) {
            url += `/${query}`
        } else {
            resetQuery();
            setMessage('Invalid TCIN input, please search for the item TCIN on the target item page');
            return;
        }
        
        fetch(url).then(res => res.json()).then(data => {
            setMessage(null);
            setModalTitle('Item Details');
            if (data.success) {
                var item = JSON.parse(data.result)
                setCurrItem(item);
                setModalContent(<ShopItem item={item}/>)
            } else {
                setCurrItem(undefined);
            }
            setModalOpen(true);
            resetQuery();
        });
    }

    return (
        <div className="App">
            <header className="header"> 
                <div className="content">
                    <img src={logo} className="logo" alt="logo" />
                    <div className='search'>
                        <ShopSearchBar handleSubmit={handleSubmit} handleRandom={handleRandom} searchQuery={query} setSearchQuery={setQuery}/>
                    </div>
                    
                    {message && message}
                </div>
            </header>
            <div className='body'>
                <Modal title={modalTitle} show={modalOpen} close={close}>{modalContent}</Modal>
            </div>
            <div className='footer'>
                <div id='tribute' className='text-center'>
                    <span className='small' id='help-trigger' onClick={populateHelper}>
                        How do I use this?
                    </span>
                    <span className='space'> | </span>
                    <span className='small'>
                        Fun gadget by&nbsp;
                        <a id='name' href="https://feiyuwong.codes" data-content="Feiyu Wong">
                            Feiyu Wong
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Home;
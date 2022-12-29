import React, { useState, useRef } from 'react';
import { useInput } from '../../hooks/input-hook';
import { ShopSearchBar, ShopItem, Modal, Info, CardSet } from '../../components';
import logo from '../../images/target.svg';
import './home.css';

function Home() {
    const [modalTitle, setModalTitle] = useState('');
    const [searchItems, setSearchItems] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [modalContent, setModalContent] = useState(<p class="text">Please begin your search</p>);
    const { value:query, setValue:setQuery, reset:resetQuery } = useInput('');
    const itemsRef = useRef(null);
    
    
    const scrollToRef = (ref) => window.scrollTo({top: ref.current.offsetTop, behavior: 'smooth'})   
    const scrollToItems = () => scrollToRef(itemsRef)

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
        fetch(url).then(res => res.json()).then((data) => {
            setMessage(null);
            if (data.success) {
                setModalTitle('Item Details');
                var item = data.result;
                setModalContent(<ShopItem item={item}/>)
                setModalOpen(true);
            } else {
                // open alert with data.message saying nothing found
                alert(data.message);
            }
        })
    }

    const fetchTCIN = (data) => {
        setModalTitle('Item Details');
        if (data.success) {
            var item = data.result;
            setModalContent(<ShopItem item={item}/>)
            setModalOpen(true);
            setMessage(null);
        } else {
            setMessage(data.message);
        }
    }

    const fetchItems = (data) => {
        if (data.success) {
            const items = data.result;
            setSearchItems(items.map((itemInfo) => 
            <ShopItem item={itemInfo}/>
        ));
            scrollToItems();
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let url = '/item'
        if (isTcin(query)) {
            url += `/${query}`
            fetch(url).then(res => res.json()).then(data => {
                fetchTCIN(data);
            });
        } else {
            url += `/search?query=${query}`
            fetch(url).then(res => res.json()).then(data => {
                fetchItems(data);
            });
        }
        resetQuery();   
    }


    return (
        <div className="App">
            <header className="header"> 
                <div className="content">
                    <img src={logo} className="logo" alt="logo" />
                    <div className='search'>
                        <ShopSearchBar handleSubmit={handleSubmit} handleRandom={handleRandom} searchQuery={query} setSearchQuery={setQuery}/>
                    </div>
                    <span style={{visibility : message ? 'visible' : 'hidden'}}>
                        {message ? message : 'Please begin your search'}
                    </span>
                </div>
            </header>
            <div className='body'>
                <Modal title={modalTitle} show={modalOpen} close={close}>{modalContent}</Modal>
                <div ref={itemsRef} className='search-items'>
                    <CardSet items={searchItems}/>
                </div>
            </div>
            <div className='footer'>
                <div id='tribute' className='text-center'>
                    <span className='small highlight' id='help-trigger' onClick={populateHelper} data-content="How do I use this?">
                        How do I use this<span style={{visibility: 'hidden', fontWeight: 'bolder'}}>?</span>
                    </span>
                    <span className='space'> | </span>
                    <span className='small'>
                        Fun gadget by&nbsp;
                        <a id='name' className='highlight' href="https://feiyuwong.codes" data-content="Feiyu Wong">
                            Feiyu Wong
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Home;
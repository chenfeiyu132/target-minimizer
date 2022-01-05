import './SearchBar.css';

const ShopSearchBar = ({handleSubmit, searchQuery, setSearchQuery}) => (
    <form id="search-bar" onSubmit={handleSubmit}>
        <label htmlFor="header-search">
            <span className="visually-hidden">Search Item</span>
        </label>
        <input
            type="text"
            class="input"
            placeholder="Search TCIN"
            name="s"
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
        />
        <button id="search-button" class="primary button" type="submit">Search</button>
        {/* <button id='helper-button' class='secondary button'>Feeling Random</button> */}
    </form>
);

export default ShopSearchBar;
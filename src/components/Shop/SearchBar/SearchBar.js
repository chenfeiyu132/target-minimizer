import './SearchBar.css';

const ShopSearchBar = ({handleSubmit, searchQuery, setSearchQuery}) => (
    <form id="search-bar" onSubmit={handleSubmit}>
        <label htmlFor="header-search">
            <span className="visually-hidden">Search Item</span>
        </label>
        <input
            type="text"
            class="input"
            placeholder="Search Item"
            name="s"
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
        />
        <button id="search-button" class="button" type="submit">Search</button>
    </form>
);

export default ShopSearchBar;
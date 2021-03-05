export default function SearchBar() {
    return (
        <form className='Search__form'>
            <label htmlFor='search-by'>Search by: </label>
            <select id='search-by'>
                <option value='title'>Reminder title</option>
                <option value='dueDate'>Due date</option>
                <option value='checked'>Checked</option>
            </select>
            <label htmlFor='search-term'>Search for:</label>
            <input type='text' id='search-term' />
            <button>Go</button>
        </form>
    )
}
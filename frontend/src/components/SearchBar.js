import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState({ youtube: [], google: [] });

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/search?q=${searchTerm}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    return (
        <div className="p-4">
            <input
                type="text"
                className="border p-2 w-full mb-4"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
                Search
            </button>

            <div className="mt-4">
                <h3 className="font-bold">YouTube Results:</h3>
                {results.youtube.map((video) => (
                    <div key={video.id.videoId} className="my-2">
                        <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                            <p>{video.snippet.title}</p>
                        </a>
                        <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                    </div>
                ))}

                <h3 className="font-bold mt-4">Google Results:</h3>
                {results.google.map((item, index) => (
                    <div key={index} className="my-2">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                            <p>{item.title}</p>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;

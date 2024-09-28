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
        <div className="max-w-2xl mx-auto p-6">

            <div className="flex flex-col sm:flex-row items-center mb-6">
                <input
                    type="text"
                    className="border p-2 rounded-md w-full sm:w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-0 sm:mr-2"
                    placeholder="Search for YouTube videos or Google results..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Search
                </button>
            </div>

            <div className="space-y-8">
                {/* YouTube Results */}
                {results.youtube.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">YouTube Results</h3>
                        <div className="space-y-4">
                            {results.youtube.map((video) => (
                                <div key={video.id.videoId} className="flex items-start space-x-4 bg-white p-4 rounded-md shadow-md hover:shadow-lg transition">
                                    <img
                                        src={video.snippet.thumbnails.default.url}
                                        alt={video.snippet.title}
                                        className="w-24 h-16 rounded-md"
                                    />
                                    <div className="flex-1">
                                        <a
                                            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-lg font-medium text-blue-600 hover:underline"
                                        >
                                            {video.snippet.title}
                                        </a>
                                        <p className="text-sm text-gray-500">{video.snippet.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Google Results */}
                {results.google.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Google Results</h3>
                        <div className="space-y-4">
                            {results.google.map((item, index) => (
                                <div key={index} className="p-4 bg-white rounded-md shadow-md hover:shadow-lg transition">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg font-medium text-blue-600 hover:underline"
                                    >
                                        {item.title}
                                    </a>
                                    <p className="text-sm text-gray-500">{item.snippet}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;

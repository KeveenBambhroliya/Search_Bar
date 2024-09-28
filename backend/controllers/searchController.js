const axios = require('axios');

// Fetch YouTube results
const fetchYouTubeResults = async (searchTerm) => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
            q: searchTerm ,
            part: 'snippet',
            maxResults: 5,
            key: YOUTUBE_API_KEY,
        },
    });
    return response.data.items;
};

// Fetch custom Google API results 
const fetchGoogleResults = async (searchTerm) => {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;
    const response = await axios.get(`https://customsearch.googleapis.com/customsearch/v1`, {
        params: {
            q: searchTerm, 
            cx: SEARCH_ENGINE_ID,
            key: GOOGLE_API_KEY,
        },
    });

    return response.data.items.map(item => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        image: item.pagemap?.cse_image ? item.pagemap.cse_image[0].src : null,
    }));
};




const searchResults = async (req, res) => {
    const searchTerm = req.query.q;
    try {
        const youtubeResults = await fetchYouTubeResults(searchTerm);
        const googleResults = await fetchGoogleResults(searchTerm);

        res.json({
            youtube: youtubeResults,
            google: googleResults,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching search results' });
    }
};

module.exports = { searchResults };

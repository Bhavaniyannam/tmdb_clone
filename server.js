const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

const API_KEY = 'bec5ad614120b91ae1d633619db60764';

app.get('/api/movies/popular', async (req, res) => {
  const page = req.query.page || 1;
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: page
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching movies from TMDb API:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

app.listen(PORT, () => {
  console.log('Proxy server running on http://localhost:' + PORT);
});

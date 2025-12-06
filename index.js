import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
       
        const response = await axios.get('https://api.jikan.moe/v4/top/anime');
        const animes = response.data.data;

        res.render('index.ejs', {
            content: null,  
            animes: animes
        });
    } catch (error) {
        res.render('index.ejs', {
            content: null,
            animes: [] 
        });
    }
});


app.get('/submit', async (req, res) => {
  const animeName = req.query.search;

  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${animeName}`);
    const result = response.data.data[0];

    if (!result) {
      return res.render('index.ejs', {
        content: null,
        animes: null
      });
    }

    res.render('index.ejs', {
      content: {
        title_en: result.title_english,
        title_jpn: result.title,
        release_date: result.year,
        image: result.images.jpg.image_url,
        url : result.url
      },
      animes: null
    });

  } catch (err) {
    res.render('index.ejs', {
      content: null,   
      animes: null     
    });
  }
});



app.listen(port, () => {
  console.log(`Server is on : ${port}`);
});

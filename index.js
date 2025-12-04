import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('index.ejs',{
        content : null
    })
})


app.get('/submit',async(req,res)=>{
    const animeName = req.query.search;
    try{ 
        const response = (await axios.get(`https://api.jikan.moe/v4/anime?q=${animeName}`));
        const result = response.data.data[0];

        res.render('index.ejs',{content:{
            title_en : result.title_english,
            title_jpn : result.title,
            release_date : result.year,

            image : result.images.jpg.image_url,
        }})
    }
    catch(err){
        res.render('index.ejs',{content : 'Anime bulunamadı.'})
    }
})

app.listen(port,()=>{
    console.log(`Server is on : ${port}`)
})
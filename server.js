const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

app.get('/api/quotes/random', (req,res,next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({quote: randomQuote});
});

app.get('/api/quotes', (req,res,next) => {
    if(req.query.person){
        const personQuote = quotes.filter((quote) => {
            return quote.person === req.query.person;
        });
        res.send({quotes: personQuote});
    } else {
        res.send({quotes: quotes});
    }
});

app.post('/api/quotes', (req,res,next) => {
    if(req.query.person && req.query.quote){
        const quote = {
            quote: {
                
                quote: req.query.quote,
                person: req.query.person
            
            }
        }
        quotes.push(quote.quote);
       res.send(quote);
    }else {
        res.status(400).send();
    }
});
app.listen(PORT, () => {
    console.log('SERVER Starting Running at ' + PORT); 
});
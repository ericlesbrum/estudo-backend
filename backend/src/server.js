const express=require('express');
const cors = require('cors');

const routes=require('./routes/routes')
const db = require('./database/db');

const app = express();

db.connect();

const allowedOrigins =[
    'http://127.0.0.1:5500',
    'http://localhost:8080/api/clients',
    'http://192.168.18.25:5500',
    'http://192.168.18.25:5500/api/clients'
]

app.use(cors({
    origin: function(origin,callback){
        let allowed=true;
        if(!origin)
            allowed=true;
        if(!allowedOrigins.includes(origin))
            allowed=false;
        callback(null,allowed);
    }
}));

app.use(express.json());

app.use('/api',routes);

const port =process.env.PORT||8080;
app.listen(port, () => { console.log(`Server is listening on port ${port}`) });
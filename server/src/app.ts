import express from 'express'
import path from 'path'

const app = express();
app.use(express.static(path.join(__dirname,'..','..','client')));
app.use('/', express.static('index.html'));

export default app
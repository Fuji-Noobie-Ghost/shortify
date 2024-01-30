import express, { Request, Response } from 'express'
import { config } from 'dotenv'

config()

const PORT = process.env.PORT || '8080'
const HOST = process.env.HOST || 'localhost'

const app = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!')
})

app.listen(parseInt(PORT), HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`)
})
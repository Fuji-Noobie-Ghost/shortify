import { createHash } from 'node:crypto'
import express, { Request, Response } from 'express'
import { config } from 'dotenv'

config()

const PORT = process.env.PORT || '8080'
const HOST = process.env.HOST || 'localhost'

const app = express()
app.use(express.json())

function shortify(url: string, length = 7): Promise<string> {
    return new Promise<string>((resolve) => {
        resolve(createHash('md5')
            .update(url + Date.now())
            .digest('base64')
            .slice(0, length)
        )
    })
}

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!')
})

app.post('/shortify', async (req: Request, res: Response) => {
    res.json({
        originalURL: req.body.url,
        shortenedURL: await shortify(req.body.url)
    })
})

app.listen(parseInt(PORT), HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`)
})
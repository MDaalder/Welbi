import express from 'express'
import router from './controllers/welbi.controller'

const app = express()

const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hello Welbi!')
})

app.use('/daalder-retirement', router)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

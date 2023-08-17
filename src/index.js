/* eslint-disable no-undef */
import app from './app.js'

const PORT = process.env.PORT || 3000
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

//TODO
app.listen(PORT, () => {
    console.log(`Server listening... on port ${PORT}`)
    console.log(
        //`Version 1 Docs are available on http://localhost:${PORT}/api/docs`
        `Version 1 Docs are available on ${BASE_URL}/api/v1/docs`
    )
})

import app from './app.js'

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000

//TODO
app.listen(PORT, () => {
    console.log(`Server listening... on port ${PORT}`)
    console.log(
        `Version 1 Docs are available on http://localhost:${PORT}/api/docs`
    )
})

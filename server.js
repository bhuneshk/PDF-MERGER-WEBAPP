const express = require('express')
const app = express()
const port = 3000
const path=require('path')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const {mergePdfs}=require('./merge.js')
app.use('/static', express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})
app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=>{
    console.log(req.files)
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    let d=await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path));
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
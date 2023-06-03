const express = require('express');
const app = express()
const port = 5000
var cors = require('cors');
app.use(cors())
app.use(express.json())

require('./db');


//available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/tournaments',require('./routes/tournamentRoutes'));
app.use('/api/brackets',require('./routes/bracketGeneratorRoutes'));
app.use('/api/communities',require('./routes/communityRoutes'));


app.get('/', (req, res) => {
  res.send('Welcome to the Tourney Nation API!')
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
}) 
const express = require('express')
const cors = require('cors');

const { pool } = require('./db')
const authenticationRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/applications');
const app = express();

app.use(express.json());
app.use(cors());


app.use('/applications', applicationRoutes);
app.use('/auth', authenticationRoutes);

let port = process.env.PORT || 3000;

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("build"));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "build", "index.html"));
//     });
// }

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
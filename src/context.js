const app = require('./app');
const cors = require('cors');
const port = process.env.PORT || 5000;

require('dotenv').config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
})

app.use(cors());

const knex = require('knex');

function createKnex() {
  return knex({
    client: 'mysql2',
    connection: 'mysql://root:kCHJ7wpYRxyxkRO55w3u@containers-us-west-173.railway.app:6701/railway',
    pool: {
      min: 2,
      max: 10,
    },
  });
}

module.exports = createKnex;

const routes = require('./routes/index.routes')
app.use('/api', routes);



app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});

module.exports = knex;
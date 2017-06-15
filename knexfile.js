// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/crud-states-visited'
},
  production: {
	  client: 'pg',
	  connection: proccess.env.DATABASE_URL
  }

};

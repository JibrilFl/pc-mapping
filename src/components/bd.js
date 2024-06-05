import mariadb from 'mariadb';

const pool = mariadb.createPool({
	host: '10.74.42.188',
	user: 'Admin',
	password: '123456789',
	database: 'PCLocation',
	connectionLimit: 10
});

export default pool;
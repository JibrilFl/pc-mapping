import mariadb from 'mariadb';

const pool = mariadb.createPool({
	host: '10.74.42.188',
	user: 'Admin',
	password: '123456789',
	database: 'PCLocation',
	connectionLimit: 10
});

export async function POST(req) {
	let conn;
	const data = await req.json();

	try {
		conn = await pool.getConnection();
		const res = await conn
			.query('UPDATE Buildings SET Location = (?) WHERE Id=(?)', [data.value, data.id])
			.then(() => conn.query("COMMIT").then(() => {
				conn.end()
			}))
			.catch((err) => console.log(err))


		return new Response(JSON.stringify(res), {
			headers: {
				"Content-Type": "application/json",
			},
			status: 201,
		})
	} finally {
		if (conn)  await conn.release(); //release to pool
	}
}
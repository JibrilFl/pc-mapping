import pool from "@/components/bd";
import {NextResponse} from "next/server";

export async function POST(req) {
	let conn;
	const data = await req.json();
	try {
		conn = await pool.getConnection();
		const res = await conn.query(`UPDATE Rooms SET Comments = "${data.value}" WHERE Id=${data.id}`);
		return NextResponse.json(res.toString())
	} finally {
		if (conn)  await conn.release();
	}
}
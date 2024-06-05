import pool from "@/components/bd";
import {NextResponse} from "next/server";

export async function GET() {
	let conn;
	try {
		conn = await pool.getConnection();
		const res = await conn.query(`SELECT * From Computers`);
		return NextResponse.json(res)
	} finally {
		if (conn)  await conn.release(); //release to pool
	}
}
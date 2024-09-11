import pool from '../../db';
import { NextRequest, NextResponse } from "next/server";

// Action to read
export const GET = async () => {
  	try {
       	const result = await pool.query('SELECT * FROM employee')
    	
    	return NextResponse.json({
	    	"empData":result.rows
	  	});
    } catch (error) {
      	return NextResponse.json({ error: error.message });
    }
};

// Action to create
export const POST = async (req: NextRequest) => {
	try {
	  	const { name, email, phone } = await req.json();

		const result = await pool.query('INSERT INTO employee (name, email, phone) VALUES ($1, $2, $3) RETURNING *', [name, email, phone]);

		return NextResponse.json({
			"result": result
		});
	} catch (error) {
      	return NextResponse.json({ error: error.message });
    }
};

// Action to delete
export const DELETE = async (req: NextRequest) => {
	const url = new URL(req.url).searchParams;
	const id = Number(url.get("id")) || 0;

	try {
      	await pool.query('DELETE FROM employee WHERE id = $1', [id]);
      	return NextResponse.json({});
    } catch (error) {
      	return NextResponse.json({ error: error.message });
    }  	
};

// Action to update or edit
export const PUT = async (req: NextRequest) => {
  	const { name, email, phone, id } = await req.json();

	try {
      	const result = await pool.query('UPDATE employee SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *', [name, email, phone, id]);
      	return NextResponse.json({
			"result": result.rows[0]
		});
      	
    } catch (error) {
      	return NextResponse.json({ error: error.message });
    }
};
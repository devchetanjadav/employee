const pool = require ('../../../db');
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  	req: NextRequest,
  	context: { params: { id: string } }
) => {
  	const id = Number(context.params.id || 0);

  	try {
       	const result = await pool.query('SELECT * FROM employee WHERE id = $1', [id]);
    	
    	return NextResponse.json({
	    	"data":result.rows[0]
	  	});
    } catch (error) {
      	return NextResponse.json({ error: error.message });
    }
};
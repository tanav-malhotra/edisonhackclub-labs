import type { NextApiRequest, NextApiResponse } from "next";
// Use a pure-JS SQL engine to avoid WASM fetch issues in serverless environments
// eslint-disable-next-line @typescript-eslint/no-var-requires
const alasql: any = require("alasql");

type Row = {
	id: number;
	email: string;
	role: string;
	recovery_token?: string | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}
	const helpMode = req.query.help === "1";
	try {
		// Create an isolated in-memory database for this request
		const db = new alasql.Database();
		db.exec(`
      CREATE TABLE users (id INT, email STRING, role STRING, recovery_token STRING);
      INSERT INTO users VALUES
        (1, 'tanav@edisontech.example', 'president', NULL),
        (2, 'ziyam@edisontech.example', 'advisor', NULL),
        (3, 'sudipto@edisontech.example', 'vp', NULL),
        (4, 'saleh@edisontech.example', 'director_operations,treasurer', NULL),
        (5, 'felipe@edisontech.example', 'director_communications,director_organization', NULL),
		(6, 'security@edisontech.example', 'security', NULL),
        (7, 'admin@edisontech.example', 'admin', '636e46325a6d4a686532707962793131626e4234636d5639');
    `);

		const q = (req.body?.q ?? "").toString();
		// Intentionally vulnerable concatenation using LIKE to allow substring matches (do NOT do this in real apps)
		const query =
			"SELECT id,email,role,recovery_token FROM users WHERE role <> 'admin' AND email LIKE '%" + q + "%'";

		if (helpMode) {
			res.setHeader("X-Debug-SQL", query);
		}

		let rows: Row[] = [];
		try {
			const result = db.exec(query) as Row[] | undefined;
			rows = (result || []) as Row[];
		} catch (err: any) {
			// Surface errors to teach impact of unsafe concatenation
			return res.status(400).json({ error: err.message });
		}
		return res.status(200).json({ rows });
	} catch (e: any) {
		return res.status(500).json({ error: "Internal error" });
	}
}



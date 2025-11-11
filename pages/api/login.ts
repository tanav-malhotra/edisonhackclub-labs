import type { NextApiRequest, NextApiResponse } from "next";

function getAdminPassword(): string {
	return process.env.ADMIN_PASSWORD || "edison{web-hacker}";
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}
	const helpMode = req.query.help === "1";
	const username = (req.body?.username ?? "").toString();
	const password = (req.body?.password ?? "").toString();

	const ok = username === "admin" && password === getAdminPassword();
	if (!ok) {
		if (helpMode) {
			// Intentionally verbose to push students to Network tab
			res.setHeader(
				"X-Debug-SQL",
				"SELECT id FROM users WHERE role='admin' AND password='<provided>' /* legacy check */"
			);
		}
		res.statusCode = 302;
		res.setHeader("Location", "/admin?error=1" + (helpMode ? "&help=1" : ""));
		return res.end();
	}

	// Set a very simple session cookie (intentionally weak for the lab)
	const cookie =
		"et_session=admin; HttpOnly; Path=/; SameSite=Lax; Max-Age=3600";
	res.setHeader("Set-Cookie", cookie);
	res.statusCode = 302;
	res.setHeader("Location", "/flag" + (helpMode ? "?help=1" : ""));
	return res.end();
}



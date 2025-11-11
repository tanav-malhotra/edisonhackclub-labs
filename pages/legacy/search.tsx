import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

type Row = {
	id: number;
	email: string;
	role: string;
	recovery_token?: string | null;
};

export default function LegacySearch() {
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [rows, setRows] = useState<Row[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const help = router.query.help === "1";
	const foundToken = !!rows?.some((r) => (r.recovery_token ?? "").toString().trim().length > 0);

	useEffect(() => {
		// Encourage DevTools Network tab use by making responses interesting there
		// No-op here; the API will set headers when help=1.
	}, [help]);

	async function onSubmit(e: FormEvent) {
		e.preventDefault();
		setError(null);
		setRows(null);
		try {
			const url = `/api/legacy-search${help ? "?help=1" : ""}`;
			const res = await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ q: query }),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Request failed");
			}
			setRows(data.rows);
		} catch (err: any) {
			setError(err.message || "Something went wrong");
		}
	}

	return (
		<section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
			<div className="et-card rounded-xl p-8">
				<h1 className="text-2xl font-bold">Legacy Employee Directory</h1>
				<p className="mt-2 text-white/80 text-sm">
					Search by email address. Note: this tool is deprecated and slated for removal.
				</p>
				<form onSubmit={onSubmit} className="mt-6 flex gap-3">
					<input
						type="text"
						placeholder="email or name (e.g., tanav)"
						className="w-full rounded border border-white/15 bg-white/5 px-3 py-2 outline-none focus:border-brand-400"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						name="q"
						autoComplete="off"
					/>
					<button
						type="submit"
						className="rounded bg-brand-600 px-4 py-2 font-medium hover:bg-brand-500"
					>
						Search
					</button>
				</form>
				{error ? (
					<p className="mt-4 text-sm text-red-300">{error}</p>
				) : null}
				{rows && (
					<div className="mt-6 overflow-x-auto rounded border border-white/10">
						<table className="min-w-full text-left text-sm">
							<thead className="bg-white/5">
								<tr>
									<th className="px-4 py-2 font-semibold">ID</th>
									<th className="px-4 py-2 font-semibold">Email</th>
									<th className="px-4 py-2 font-semibold">Role</th>
									<th className="px-4 py-2 font-semibold">Recovery Token</th>
								</tr>
							</thead>
							<tbody>
								{rows.map((r) => (
									<tr key={r.id} className="odd:bg-white/0 even:bg-white/5">
										<td className="px-4 py-2">{r.id}</td>
										<td className="px-4 py-2">{r.email}</td>
										<td className="px-4 py-2">{r.role}</td>
										<td className="px-4 py-2">{r.recovery_token ?? ""}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
				{foundToken ? (
					<div className="mt-6 rounded border border-brand-400/30 bg-brand-800/20 px-4 py-3 text-sm">
						Next step: If you’ve obtained a hex token, ask Tanav: <span className="italic">“What is the decoding recipe?”</span>
					</div>
				) : null}
				{help ? (
					<div className="mt-6 rounded border border-brand-400/30 bg-brand-800/20 px-4 py-3 text-sm">
						Tip: Try a normal email first. Then consider how inputs are combined into queries. Quotes matter.
					</div>
				) : null}
			</div>
		</section>
	);
}



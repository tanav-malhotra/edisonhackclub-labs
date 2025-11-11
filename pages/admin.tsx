import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

type AdminProps = {
	error?: boolean;
	helpMode: boolean;
};

export default function Admin({ error, helpMode }: AdminProps) {
	const router = useRouter();
	const help = helpMode;
	return (
		<section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
			<div className="et-card rounded-xl p-8 max-w-lg">
				<h1 className="text-2xl font-bold">Employee Portal</h1>
				<p className="mt-2 text-sm text-white/80">Sign in to continue.</p>
				<form method="POST" action={`/api/login${help ? "?help=1" : ""}`} className="mt-6 space-y-4">
					<div>
						<label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
						<input id="username" name="username" defaultValue="admin" readOnly className="w-full rounded border border-white/15 bg-white/5 px-3 py-2 outline-none" />
						<p className="mt-1 text-xs text-white/50">Only administrator accounts can access the flag.</p>
					</div>
					<div>
						<label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
						<input id="password" name="password" type="password" className="w-full rounded border border-white/15 bg-white/5 px-3 py-2 outline-none" />
					</div>
					<button type="submit" className="rounded bg-brand-600 px-4 py-2 font-medium hover:bg-brand-500">
						Sign in
					</button>
					{error ? (
						<p className="text-sm text-red-300 mt-2">Login failed. Check your inputs and try again.</p>
					) : null}
				</form>
				{helpMode ? (
					<div className="mt-6 rounded border border-brand-400/30 bg-brand-800/20 px-4 py-3 text-sm">
						If authentication fails, inspect the request in Network → Headers. Custom debug headers may be present.
					</div>
				) : null}
			</div>
		</section>
	);
}

export const getServerSideProps: GetServerSideProps<AdminProps> = async (ctx) => {
	const error = ctx.query.error === "1";
	const helpMode = ctx.query.help === "1";
	if (helpMode) {
		ctx.res.setHeader("X-Company-Trace", "Denied? Inspect network headers and look for legacy hints.");
	}
	return { props: { error, helpMode } };
};



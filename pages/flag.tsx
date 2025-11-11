import { GetServerSideProps } from "next";

type FlagProps = {
	authorized: boolean;
	helpMode: boolean;
};

export default function Flag({ authorized, helpMode }: FlagProps) {
	if (!authorized) {
		return (
			<section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
				<div className="et-card rounded-xl p-8">
					<h1 className="text-2xl font-bold">Access denied</h1>
					<p className="mt-2 text-white/80">
						You must be signed in as an administrator to view this page.
					</p>
					{helpMode ? (
						<div className="mt-6 rounded border border-brand-400/30 bg-brand-800/20 px-4 py-3 text-sm">
							Sign in at the portal after you discover the decoding recipe. Enumeration and careful reading will help.
						</div>
					) : null}
				</div>
			</section>
		);
	}
	return (
		<section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
			<div className="et-card rounded-xl p-8">
				<h1 className="text-2xl font-bold">Flag</h1>
				<p className="mt-4 text-xl">
					<span className="font-semibold">FLAG:</span> EDISONTECH{`{nice-work-intern}`}
				</p>
				<p className="mt-6 text-white/80">
					Call Tanav over and show this flag to complete the challenge.
				</p>
			</div>
		</section>
	);
}

function hasAdminCookie(cookieHeader?: string): boolean {
	if (!cookieHeader) return false;
	return cookieHeader.split(";").some((c) => c.trim().startsWith("et_session=admin"));
}

export const getServerSideProps: GetServerSideProps<FlagProps> = async (ctx) => {
	const helpMode = ctx.query.help === "1";
	if (helpMode) {
		ctx.res.setHeader("X-Company-Trace", "Authenticate with the discovered admin password.");
	}
	const authorized = hasAdminCookie(ctx.req.headers.cookie);
	return { props: { authorized, helpMode } };
};



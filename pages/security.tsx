import { GetServerSideProps } from "next";

type SecurityProps = {
	helpMode: boolean;
};

export default function Security({ helpMode }: SecurityProps) {
	return (
		<section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
			<div className="et-card rounded-xl p-8">
				<h1 className="text-3xl font-bold">Security at EdisonTech</h1>
				<p className="mt-4 text-white/80">
					We design for security from first principles: minimizing blast radius, enforcing least privilege, and practicing continuous hardening.
				</p>
				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="rounded bg-white/5 p-5">
						<h2 className="font-semibold">Vulnerability Disclosure</h2>
						<p className="mt-2 text-sm text-white/70">
							If you believe you’ve found a security issue, please see <a className="underline hover:text-brand-200" href="/.well-known/security.txt">security.txt</a>.
						</p>
					</div>
					<div className="rounded bg-white/5 p-5">
						<h2 className="font-semibold">Bug Bounty</h2>
						<p className="mt-2 text-sm text-white/70">
							We reward high-impact findings with public recognition and, where applicable, bounties.
						</p>
					</div>
				</div>
				{helpMode ? (
					<div className="mt-8 rounded border border-brand-400/30 bg-brand-800/20 px-4 py-3 text-sm">
						<span className="font-semibold">Trace:</span> Some teams still host legacy pages. Old notes and source maps can leak intern guidance.
					</div>
				) : null}
			</div>
		</section>
	);
}

export const getServerSideProps: GetServerSideProps<SecurityProps> = async (ctx) => {
	const helpMode = ctx.query.help === "1";
	if (helpMode) {
		ctx.res.setHeader("X-Company-Trace", "Legacy breadcrumbs exist; check notes and old site.");
	}
	return { props: { helpMode } };
};



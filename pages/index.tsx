import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { GetServerSideProps } from "next";

type HomeProps = {
	helpMode: boolean;
};

export default function Home({ helpMode }: HomeProps) {
	return (
		<>
			<Head>
				<meta name="description" content="EdisonTech — Building secure systems for tomorrow." />
			</Head>
			<Script id="et-console-crumb" strategy="afterInteractive">
				{`
					console.log("%cEdisonTech tip:", "color:#3A78CF;font-weight:bold", "Enumeration usually starts at /robots.txt");
				`}
			</Script>
			<section className="relative">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div>
							<h1 className="text-4xl sm:text-5xl font-bold leading-tight">
								Secure systems for a connected world
							</h1>
							<p className="mt-6 text-white/80 text-lg">
								EdisonTech delivers enterprise platforms with a relentless focus on security, reliability, and user trust.
							</p>
							<div className="mt-10 flex gap-4">
								<Link href="/security" className="rounded bg-brand-600 px-5 py-3 font-medium hover:bg-brand-500">
									Security
								</Link>
								<Link href="/admin" className="rounded border border-white/20 px-5 py-3 font-medium hover:border-white/40">
									Employee Portal
								</Link>
							</div>
						</div>
						<div className="et-card rounded-xl p-6">
							<h2 className="text-xl font-semibold">Platform highlights</h2>
							<ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
								<li className="rounded bg-white/5 p-4">
									<span className="block font-medium">Zero‑trust design</span>
									<span className="block text-white/70">Principle of least privilege across services.</span>
								</li>
								<li className="rounded bg-white/5 p-4">
									<span className="block font-medium">Defense in depth</span>
									<span className="block text-white/70">Layered controls for resilient posture.</span>
								</li>
								<li className="rounded bg-white/5 p-4">
									<span className="block font-medium">Observability</span>
									<span className="block text-white/70">Telemetry for rapid detection and response.</span>
								</li>
								<li className="rounded bg-white/5 p-4">
									<span className="block font-medium">Privacy‑by‑default</span>
									<span className="block text-white/70">Data minimization at every layer.</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
			<section className="border-t border-white/10">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="et-card rounded-xl p-6">
							<h3 className="text-lg font-semibold">Products</h3>
							<p className="mt-2 text-white/70 text-sm">Explore our suite of enterprise offerings.</p>
						</div>
						<div className="et-card rounded-xl p-6">
							<h3 className="text-lg font-semibold">Careers</h3>
							<p className="mt-2 text-white/70 text-sm">Join a team where security is everyone’s job.</p>
						</div>
						<div className="et-card rounded-xl p-6">
							<h3 className="text-lg font-semibold">Security</h3>
							<p className="mt-2 text-white/70 text-sm">Read about our program and report a vulnerability.</p>
						</div>
					</div>
				</div>
			</section>
			{helpMode ? (
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
					<div className="rounded border border-brand-400/30 bg-brand-800/20 px-4 py-3 text-sm">
						<span className="font-semibold">Trace:</span> Start with robots, then read what humans and security have to say. Sources often reveal more than they should.
					</div>
				</div>
			) : null}
			{/* Legacy asset is purposely included to encourage Sources tab exploration */}
			<script src="/assets/js/legacy.js" defer />
		</>
	);
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (ctx) => {
	const helpMode = ctx.query.help === "1";
	if (helpMode) {
		ctx.res.setHeader("X-Company-Trace", "Enumeration: robots -> humans -> .well-known -> notes");
	}
	return { props: { helpMode } };
};



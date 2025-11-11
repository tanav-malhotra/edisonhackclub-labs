export default function Training() {
	return (
		<section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
			<div className="et-card rounded-xl p-8">
				<h1 className="text-2xl font-bold">Security Training for Interns</h1>
				<ol className="mt-6 space-y-4 list-decimal list-inside text-white/90">
					<li>
						Open Chrome DevTools with <span className="font-semibold">F12</span>.
						<ul className="mt-2 ml-6 list-disc space-y-1 text-sm text-white/75">
							<li>Network tab → click a request → Headers</li>
							<li>Sources tab → browse files and source maps</li>
							<li>Console tab → look for breadcrumbs</li>
						</ul>
					</li>
					<li>
						Enumerate. Try common discovery files:
						<ul className="mt-2 ml-6 list-disc space-y-1 text-sm text-white/75">
							<li>/robots.txt</li>
							<li>/humans.txt</li>
							<li>/.well-known/security.txt</li>
						</ul>
					</li>
					<li>
						Read carefully. Legacy pages and notes can reveal valuable hints.
					</li>
					<li>
						If you’re stuck, the site will eventually tell you to ask Tanav a specific question. Ask it exactly when prompted.
					</li>
					<li>
						SQL basics:
						<ul className="mt-2 ml-6 list-disc space-y-1 text-sm text-white/75">
							<li><span className="font-semibold">SELECT</span> chooses columns; <span className="font-semibold">FROM</span> selects a table</li>
							<li><span className="font-semibold">WHERE</span> filters rows, often with quoted values</li>
							<li>
								If input is inserted into a query unsafely, adding a single quote <span className="font-mono">'</span> may break out.
							</li>
							<li>
								A classic test is <span className="font-mono">' OR '1'='1</span> which turns a filter into a condition that’s always true.
							</li>
						</ul>
					</li>
				</ol>
				<p className="mt-6 text-sm text-white/70">
					Stay in scope: this site only. Your objective is to sign in as admin and retrieve the flag.
				</p>
			</div>
		</section>
	);
}



import Link from "next/link";
import { ReactNode } from "react";

type LayoutProps = {
	children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="min-h-screen flex flex-col">
			<a href="#main" className="sr-only sr-only-focusable">
				Skip to content
			</a>
			<header className="sticky top-0 z-50 border-b border-white/10 bg-slateink/60 backdrop-blur">
				<nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<Link href="/" className="flex items-center gap-2">
							<div className="h-8 w-8 rounded bg-brand-500"></div>
							<span className="text-lg font-semibold tracking-wide">EdisonTech</span>
						</Link>
						<div className="flex items-center gap-6 text-sm">
							<Link href="/products" className="hover:text-brand-200">Products</Link>
							<Link href="/careers" className="hover:text-brand-200">Careers</Link>
							<Link href="/security" className="hover:text-brand-200">Security</Link>
							<Link href="/admin" className="rounded bg-brand-600 px-3 py-1.5 font-medium hover:bg-brand-500">
								Portal
							</Link>
						</div>
					</div>
				</nav>
			</header>
			<main id="main" className="flex-1">{children}</main>
			<footer className="border-t border-white/10">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-white/70">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<p>© {new Date().getFullYear()} EdisonTech. All rights reserved.</p>
						<div className="flex gap-4">
							<Link href="/humans.txt" className="hover:text-brand-200">humans.txt</Link>
							<Link href="/robots.txt" className="hover:text-brand-200">robots.txt</Link>
							<Link href="/.well-known/security.txt" className="hover:text-brand-200">security.txt</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}



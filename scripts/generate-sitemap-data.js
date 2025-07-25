#!/usr/bin/env node

const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

/**
 * Get the last Git commit timestamp for a file
 * @param {string} filePath - The path to the file
 * @returns {number} - Unix timestamp of last commit affecting this file
 */
function getGitLastModified(filePath) {
	// In CI/CD environments like Vercel, the .git directory might not be present.
	// In such cases, fall back to the current timestamp.
	if (process.env.VERCEL) {
		return Math.floor(Date.now() / 1000);
	}

	try {
		// Get the timestamp of the last commit that modified this file
		const gitCmd = `git log -1 --format="%ct" -- "${filePath}"`;
		const result = execSync(gitCmd, { encoding: "utf8" }).trim();
		return result ? Number.parseInt(result) : Math.floor(Date.now() / 1000);
	} catch (error) {
		console.warn(
			`Could not get Git timestamp for ${filePath}, using current time. Error: ${error.message}`,
		);
		return Math.floor(Date.now() / 1000);
	}
}

/**
 * Generate sitemap data for all routes
 */
function generateSitemapData() {
	// Define the routes and their corresponding file paths
	const routes = [
		{ route: "", filePath: "app/[locale]/page.tsx" },
		{ route: "/kayaking", filePath: "app/[locale]/kayaking/page.tsx" },
		{ route: "/rafting", filePath: "app/[locale]/rafting/page.tsx" },
		{ route: "/riding", filePath: "app/[locale]/riding/page.tsx" },
		{
			route: "/river-village",
			filePath: "app/[locale]/river-village/page.tsx",
		},
		{ route: "/trekking", filePath: "app/[locale]/trekking/page.tsx" },

		// CRITICAL SEO FIX: Package pages for Google indexing
		{ route: "/packages", filePath: "app/[locale]/packages/page.tsx" },
		{ route: "/package-1", filePath: "app/[locale]/package-1/page.tsx" },
		{ route: "/package-2", filePath: "app/[locale]/package-2/page.tsx" },

		{ route: "/for-schools", filePath: "app/[locale]/for-schools/page.tsx" },
		{
			route: "/kayak-rafting",
			filePath: "app/[locale]/kayak-rafting/page.tsx",
		},
		{
			route: "/privacy-settings",
			filePath: "app/[locale]/privacy-settings/page.tsx",
		},
	];

	const routeData = routes.map(({ route, filePath }) => {
		const lastModified = getGitLastModified(filePath);
		console.log(
			`${route || "/"}: ${new Date(lastModified * 1000).toISOString()}`,
		);
		return {
			route,
			fileMtime: lastModified,
		};
	});

	// Generate the TypeScript content for sitemap data
	const tsContent = `// Auto-generated sitemap data - Do not edit manually
// Generated on: ${new Date().toISOString()}

export interface RouteData {
  route: string;
  fileMtime: number;
}

export const routeData: RouteData[] = ${JSON.stringify(routeData, null, 2)};
`;

	// Write to a TypeScript file that can be imported by sitemap.ts
	const outputPath = path.join(__dirname, "../lib/sitemap-data.ts");
	fs.writeFileSync(outputPath, tsContent);

	console.log("\n✅ Sitemap data generated successfully:");
	console.log(`📁 Output: ${outputPath}`);
	console.log(`📊 Routes processed: ${routeData.length}`);
}

// Run if called directly
if (require.main === module) {
	generateSitemapData();
}

module.exports = { generateSitemapData };

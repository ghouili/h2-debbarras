const baseUrl = process.env.BASE_URL || "http://localhost:3000";

async function fetchAndValidate(path, expects) {
  const url = new URL(path, baseUrl).toString();
  const response = await fetch(url, { redirect: "follow" });
  const contentType = response.headers.get("content-type") || "";
  const body = await response.text();

  const issues = [];
  if (!response.ok) issues.push(`Status ${response.status}`);
  if (!contentType.includes(expects.contentType)) {
    issues.push(`Content-Type ${contentType}`);
  }
  for (const expected of expects.contains) {
    if (!body.includes(expected)) issues.push(`Missing: ${expected}`);
  }

  if (issues.length) {
    throw new Error(`Validation failed for ${url}: ${issues.join(", ")}`);
  }

  console.log(`OK ${url}`);
}

async function main() {
  await fetchAndValidate("/robots.txt", {
    contentType: "text/plain",
    contains: ["User-agent:", "Sitemap:", "Disallow:"],
  });

  await fetchAndValidate("/sitemap.xml", {
    contentType: "application/xml",
    contains: ["<urlset", "<url>", "</urlset>"],
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

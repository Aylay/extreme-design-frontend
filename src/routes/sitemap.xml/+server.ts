/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch, setHeaders }) {
	const site = import.meta.env.VITE_SITE_URL;
	setHeaders({
		'Content-Type': 'application/xml'
	});
	const langs = ['fr', 'en', 'pt'];
	// const langs = ['fr'];
	const pages = ['', 'about', 'articles', 'contact', 'legals', 'projets', 'uniqueness', 'formation'];
	const projectsResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/projets?populate=deep&locale=all&pagination[pageSize]=200',
		{
			method: 'GET'
		}
	);
	const projectsData = await projectsResponse.json();
	const projectsSlug: any[] = [];
	for (const project of projectsData.data) {
		projectsSlug.push(project.attributes.slug);
	}
	const newsResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/articles?populate=deep&locale=all&pagination[pageSize]=200',
		{
			method: 'GET'
		}
	);
	const newsData = await newsResponse.json();
	const newsSlug: any[] = [];
	for (const article of newsData.data) {
		newsSlug.push(article.attributes.slug);
	}
	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" >
      <url>
        <loc>${site}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
      ${langs.map(
				(lang) => `
        ${pages
					.map(
						(page) => `
        <url>
          <loc>${site}/${lang}/${page}</loc>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>
        `
					)
					.join('')}
        ${projectsSlug
					.map(
						(slug) => `
        <url>
          <loc>${site}/${lang}/projets/${slug}</loc>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>
        `
					)
					.join('')}
        ${newsSlug
					.map(
						(slug) => `
        <url>
          <loc>${site}/${lang}/articles/${slug}</loc>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>
        `
					)
					.join('')}
      `
			)}
    </urlset>`;
	return new Response(sitemap);
}

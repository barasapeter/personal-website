# Personal Website

This is my personal website. It is intentionally built as a single file: [`main.html`](./main.html).

Everything, the HTML structure, the CSS, and any small amount of JavaScript lives in that one file. No build step, no framework, no separate stylesheet, no bundler.

This README explains why I chose this approach, and also gives a quick comparison of server-side rendering (SSR) and client-side rendering (CSR) so it's clear why neither is necessary for a site like this.

---

## Why a single `main.html`?

For a personal website, the goal is usually simple: share who I am, what I do, and how to contact me. That content does not change per user, does not need authentication and does not need to be dynamically fetched from a database on every request.

So I chose the simplest thing that works:

- One file to edit
- One file to deploy
- One file to back up
- No dependencies to update
- No build tools to configure
- No JavaScript required to see the content

This is not a limitation. It is a deliberate design choice.

---

## SSR vs. CSR (and why this site uses neither)

There are two common ways modern web apps render content:

### Server-Side Rendering (SSR)

With SSR, the server generates the full HTML for each request and sends it to the browser. The browser can display content immediately, then JavaScript "hydrates" the page to make it interactive.

**Advantages of SSR**
- Great SEO, because crawlers receive fully rendered HTML
- Fast first contentful paint
- Good for social media previews
- Works well on slow devices, since the server does the heavy lifting

**Disadvantages of SSR**
- Requires a running server
- Higher server load and hosting cost
- More complex infrastructure
- Slower time to interactive
- Caching dynamic pages is harder

### Client-Side Rendering (CSR)

With CSR, the server sends a minimal HTML shell and a JavaScript bundle. The browser then downloads and executes JavaScript, fetches data and renders the page.

**Advantages of CSR**
- Very interactive, app-like experience
- Reduced server load after initial load
- Clear separation between frontend and backend
- Can work offline with service workers

**Disadvantages of CSR**
- Poor SEO without extra work
- Slow initial load — users often see a blank screen
- Large JavaScript bundles
- Can be slow on low-end devices
- Data fetching waterfalls delay content

### Why my site uses neither

My personal website is a **static HTML file**. It is not rendered on the server per request, and it is not rendered in the browser by a JavaScript framework.

The HTML is already complete in `main.html`. When someone visits the site, the browser receives the full content immediately. There is no hydration, no data fetching, no blank screen, and no JavaScript required to read the page.

This gives me many of the benefits of SSR — good SEO, fast first paint, works without JS — without needing a server, a framework, or a build pipeline.

| Approach | Where HTML is built | First paint | SEO | Server needed | Complexity | Best for |
|---|---|---|---|---|---|---|
| SSR | On the server per request | Fast | Strong | Yes | High | Dynamic, SEO-critical apps |
| CSR | In the browser via JS | Slow | Weak without extra work | No | Medium | Highly interactive apps |
| This site | Once, in `main.html` | Immediate | Strong | No | Very low | Personal sites, portfolios, docs |

---

## Why one file for HTML and CSS instead of splitting them?

Splitting HTML, CSS, and JavaScript into separate files is common in large projects. But for a small personal website, keeping them together has real advantages.

### 1. Simplicity

There is only one file to open, edit, and understand. I do not need to jump between `index.html`, `styles.css`, and `script.js` to make a small change.

### 2. No build step

I do not need Webpack, Vite, Parcel, Sass, PostCSS, or any other tool. I can edit `main.html`, save it, and open it in a browser. That is the entire workflow.

### 3. Easy deployment

A single HTML file can be hosted almost anywhere:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any static file host
- Even a USB stick

There is nothing to compile and no server to configure.

### 4. Fewer HTTP requests

When CSS is inside the same file, the browser does not need to request a separate stylesheet. That means the page can render faster, especially on slow connections.

### 5. No flash of unstyled content

Because the styles are already in the document, there is no moment where the HTML appears without its CSS. The page looks correct from the first paint.

### 6. SEO friendly

Search engines receive the full content immediately. There is no JavaScript rendering step required for crawlers to understand the page.

### 7. Portable and durable

A single file is easy to archive, email, copy, or move. It will still work years from now, even if a framework or build tool falls out of fashion.

---

## Trade-offs I accept

A single-file approach is not perfect for every situation. I accept these trade-offs:

- **Not ideal for many pages.** If the site grows to dozens of pages, sharing styles across separate HTML files becomes harder.
- **No shared CSS caching.** Since the CSS is inside the HTML, it is not cached separately across pages. For a single-page site, this does not matter.
- **The file can get large.** If I add a lot of CSS or JavaScript, `main.html` could become unwieldy.
- **Less separation of concerns.** For a team, splitting files can make ownership and collaboration clearer.

For a personal website, these trade-offs are worth it. The site is small, static, and maintained by one person.

---

## When I would split the file

I would reconsider this approach if:

- The site grows into many pages
- I need a shared design system across pages
- Multiple people start contributing regularly
- I need a build pipeline for minification, bundling, or pre-processing
- I add enough JavaScript that it deserves its own file

Until then, `main.html` is enough.

---

## Conclusion

My personal website is a single `main.html` file on purpose.

It avoids the complexity of SSR and the drawbacks of CSR. It is fast, SEO-friendly, easy to host, easy to edit, and works without JavaScript. Keeping HTML and CSS together makes the site simpler to maintain and deploy.

For a small personal site, the best architecture is often the simplest one that works.

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const publicDir = path.join(repoRoot, "public");
const outRoot = path.join(publicDir, "images", "windows");

const CATEGORIES = [
  {
    slug: "energy-efficient",
    name: "Energy Efficient Windows",
    description: "Designed to reduce heat transfer and lower energy bills",
  },
  {
    slug: "wood-clad",
    name: "Wood Clad Windows",
    description: "Natural interior warmth with protected exterior durability",
  },
  {
    slug: "wood",
    name: "Wood Windows",
    description: "Timeless craftsmanship and architectural beauty",
  },
  {
    slug: "vinyl",
    name: "Vinyl Windows",
    description: "Low maintenance and cost-effective performance",
  },
  {
    slug: "aluminum",
    name: "Aluminum Windows",
    description: "Slim profiles with modern strength",
  },
  {
    slug: "fiberglass",
    name: "Fiberglass Windows",
    description: "Superior stability and insulation",
  },
  {
    slug: "obscure-glass",
    name: "Obscure Glass Windows",
    description: "Privacy without sacrificing daylight",
  },
];

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function toQuery(category) {
  const name = category.name.toLowerCase();

  if (name.includes("wood clad"))
    return "wood clad windows interior home bright natural light";
  if (name === "wood windows")
    return "wood windows interior home bright architectural photography";

  // "Vinyl windows" searches can be sparse when including too many qualifiers.
  if (name === "vinyl windows") return "white vinyl window interior home";

  if (name === "aluminum windows")
    return "aluminum frame windows modern architecture interior daylight";
  if (name === "fiberglass windows")
    return "fiberglass windows exterior home modern architecture daylight";
  if (name === "obscure glass windows")
    return "obscure glass bathroom window daylight modern interior";
  if (name === "energy efficient windows")
    return "energy efficient windows modern home interior daylight multi pane";

  return "modern windows interior home daylight architecture";
}

function toFallbackQueries(category) {
  const name = category.name.toLowerCase();
  const primary = toQuery(category);

  const fallbacks = [];

  if (name === "vinyl windows") {
    fallbacks.push(
      "vinyl window frame interior home",
      "double hung window interior daylight",
      "white window frame interior home bright"
    );
  }

  if (name === "aluminum windows") {
    fallbacks.push(
      "black aluminum window frame interior modern home",
      "modern architecture windows interior daylight"
    );
  }

  if (name === "fiberglass windows") {
    fallbacks.push(
      "modern house windows exterior daylight",
      "window wall modern home interior daylight"
    );
  }

  if (name === "obscure glass windows") {
    fallbacks.push(
      "bathroom frosted window daylight",
      "privacy glass window bathroom interior"
    );
  }

  if (name.includes("wood clad")) {
    fallbacks.push(
      "wood clad window interior daylight",
      "wood interior window trim modern home"
    );
  }

  if (name === "wood windows") {
    fallbacks.push(
      "wood framed window interior daylight",
      "timber window interior modern home"
    );
  }

  if (name === "energy efficient windows") {
    fallbacks.push(
      "triple pane window interior daylight",
      "low e glass window modern home"
    );
  }

  return [primary, ...fallbacks].filter(Boolean);
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36",
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Fetch failed ${res.status} for ${url}\n${text.slice(0, 400)}`);
  }
  return res.json();
}

async function downloadToFile(url, outFile) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36",
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Image download failed ${res.status} for ${url}\n${text.slice(0, 200)}`);
  }

  const arr = new Uint8Array(await res.arrayBuffer());
  fs.writeFileSync(outFile, arr);
}

function buildUnsplashDownloadUrl(photo) {
  const raw = photo?.urls?.raw;
  if (!raw) return null;
  const u = new URL(raw);
  u.searchParams.set("w", "2600");
  u.searchParams.set("fit", "max");
  u.searchParams.set("fm", "jpg");
  u.searchParams.set("q", "80");
  return u.toString();
}

function uniqBy(arr, keyFn) {
  const seen = new Set();
  const out = [];
  for (const item of arr) {
    const k = keyFn(item);
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}

async function main() {
  const perCategory = Number(process.env.WINDOWS_IMAGES_PER_CATEGORY || 3);
  const orientation = process.env.WINDOWS_UNSPLASH_ORIENTATION || "landscape";

  ensureDir(outRoot);

  const manifest = {};
  const credits = {};

  for (const category of CATEGORIES) {
    const queries = toFallbackQueries(category);

    let chosen = [];
    let chosenQuery = null;

    for (const query of queries) {
      const apiUrl = new URL("https://unsplash.com/napi/search/photos");
      apiUrl.searchParams.set("query", query);
      apiUrl.searchParams.set("per_page", String(Math.max(24, perCategory * 8)));
      apiUrl.searchParams.set("orientation", orientation);

      // Unsplash NAPI returns a mix; we keep deterministic ordering (as given).
      const json = await fetchJson(apiUrl.toString());
      const results = Array.isArray(json?.results) ? json.results : [];
      const usable = results
        .filter((p) => p?.urls?.raw && p?.width && p?.height)
        .filter((p) => Math.min(p.width, p.height) >= 1200);

      const unique = uniqBy(usable, (p) => p.id);
      const attempt = unique.slice(0, perCategory);
      if (attempt.length >= perCategory) {
        chosen = attempt;
        chosenQuery = query;
        break;
      }
    }

    if (chosen.length < perCategory) {
      throw new Error(
        `Not enough Unsplash results for ${category.slug}. Needed ${perCategory}, got ${chosen.length}. Tried queries: ${queries
          .map((q) => `"${q}"`)
          .join(", ")}`
      );
    }

    const outDir = path.join(outRoot, category.slug);
    ensureDir(outDir);

    const localPaths = [];
    credits[category.slug] = [];
    credits[category.slug].push({ selectedQuery: chosenQuery });

    for (let i = 0; i < chosen.length; i++) {
      const photo = chosen[i];
      const outFile = path.join(outDir, `${i + 1}.jpg`);
      const dlUrl = buildUnsplashDownloadUrl(photo);
      if (!dlUrl) throw new Error(`Missing download URL for ${category.slug} photo ${photo?.id}`);

      await downloadToFile(dlUrl, outFile);

      localPaths.push(`/images/windows/${category.slug}/${i + 1}.jpg`);
      credits[category.slug].push({
        id: photo.id,
        photographer: photo?.user?.name || null,
        profile: photo?.user?.links?.html || null,
        source: "unsplash",
      });
    }

    manifest[category.slug] = localPaths;
  }

  const manifestFile = path.join(outRoot, "windowsImageManifest.json");
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + "\n");

  // Keep attribution available without surfacing brands in UI.
  const creditsFile = path.join(outRoot, "windowsImageCredits.json");
  fs.writeFileSync(creditsFile, JSON.stringify(credits, null, 2) + "\n");

  // Also generate categories JSON at the repo-level data/ folder.
  const categoriesOut = CATEGORIES.map((c) => ({
    slug: c.slug,
    name: c.name,
    description: c.description,
    images: manifest[c.slug] || [],
  }));

  const dataOutDir = path.join(repoRoot, "data");
  ensureDir(dataOutDir);
  fs.writeFileSync(
    path.join(dataOutDir, "windowsCategories.json"),
    JSON.stringify(categoriesOut, null, 2) + "\n"
  );

  // Print verification summary
  console.log(`Downloaded window images to: ${path.relative(repoRoot, outRoot)}`);
  console.log(`Wrote manifest: ${path.relative(repoRoot, manifestFile)}`);
  console.log(`Wrote categories: data/windowsCategories.json`);
  for (const c of CATEGORIES) {
    console.log(`- ${c.slug}: ${manifest[c.slug]?.length || 0} images`);
  }
}

main().catch((err) => {
  console.error(err?.stack || String(err));
  process.exit(1);
});

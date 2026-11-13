// Looks up book cover images using the free Open Library API.
// Each lookup is saved so the same book is never searched twice.

const coverCache = new Map();

// Returns a Promise that resolves to a cover image URL, or null if none is found
export function getCoverUrl(title, author) {
    const cacheKey = `${title}|${author}`.toLowerCase();

    if (!coverCache.has(cacheKey)) {
        coverCache.set(cacheKey, fetchCoverUrl(title, author));
    }

    return coverCache.get(cacheKey);
}

async function fetchCoverUrl(title, author) {
    const searchParams = new URLSearchParams({
        title,
        author,
        limit: 1,
        fields: "cover_i",
    });

    try {
        const response = await fetch(`https://openlibrary.org/search.json?${searchParams}`);

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        const coverId = data.docs[0]?.cover_i;

        return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null;
    } catch {
        // No internet or the API is down: the card keeps its placeholder cover
        return null;
    }
}

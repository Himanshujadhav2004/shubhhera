/**
 * Turns whatever form of video link you paste into a working embed URL.
 *
 * The point is that `content.ts` should accept the link you actually have in
 * your hand — the address bar URL, a share link, or a bare ID — rather than
 * requiring you to hand-build an embed URL with the right query string. The
 * platform quirks that are easy to get wrong live here instead:
 *
 *  - YouTube's `loop=1` silently does nothing unless `playlist` is also set to
 *    the same video ID.
 *  - `playsinline=1` is required or iOS Safari forces fullscreen on play.
 *  - `modestbranding` was deprecated in 2023 and `rel=0` no longer removes
 *    end-screen suggestions (it only limits them to the same channel), so
 *    neither is worth setting for appearance — we use youtube-nocookie.com,
 *    which at least avoids tracking cookies until playback starts.
 */

type EmbedOptions = {
  /** Background mode: muted, looping, no controls. */
  background?: boolean;
};

const YOUTUBE_ID = /^[\w-]{11}$/;

function youtubeId(input: string): string | null {
  if (YOUTUBE_ID.test(input)) return input;

  try {
    const url = new URL(input);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") return url.pathname.slice(1) || null;
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const v = url.searchParams.get("v");
      if (v) return v;
      // /embed/ID, /shorts/ID, /live/ID
      const match = url.pathname.match(/\/(?:embed|shorts|live|v)\/([\w-]{11})/);
      if (match) return match[1];
    }
  } catch {
    return null;
  }
  return null;
}

function vimeoId(input: string): string | null {
  try {
    const url = new URL(input);
    if (!url.hostname.replace(/^www\./, "").endsWith("vimeo.com")) return null;
    const match = url.pathname.match(/\/(\d+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/**
 * @param source A YouTube URL or 11-character ID, a Vimeo URL, or any other
 *   provider's ready-made embed URL (Bunny Stream, Cloudflare Stream, …),
 *   which is passed through untouched.
 * @returns An embeddable URL, or "" if `source` is empty.
 */
export function toEmbedUrl(source: string, options: EmbedOptions = {}): string {
  const input = source.trim();
  if (!input) return "";

  const { background = false } = options;

  const yt = youtubeId(input);
  if (yt) {
    const params = new URLSearchParams({ playsinline: "1", rel: "0" });
    if (background) {
      params.set("autoplay", "1");
      params.set("mute", "1");
      params.set("loop", "1");
      params.set("playlist", yt); // required for loop to take effect
      params.set("controls", "0");
    }
    return `https://www.youtube-nocookie.com/embed/${yt}?${params}`;
  }

  const vimeo = vimeoId(input);
  if (vimeo) {
    const params = new URLSearchParams();
    if (background) params.set("background", "1"); // Vimeo's own muted-loop mode
    const query = params.toString();
    return `https://player.vimeo.com/video/${vimeo}${query ? `?${query}` : ""}`;
  }

  // Already an embed URL from some other provider — trust it as given.
  return input;
}

/**
 * Glyphs for the social links in `site.socials`.
 *
 * Keyed by the label used in content.ts (case-insensitive), so adding a
 * platform there picks up its icon here automatically. Anything unrecognised
 * falls back to a neutral link glyph rather than rendering nothing — a missing
 * icon should still be a visible, clickable link.
 *
 * Drawn as strokes on a 24px grid to match the hairline weight used across the
 * site, and inheriting `currentColor` so the light/dark contexts control them.
 */

type Props = { name: string; className?: string };

const paths: Record<string, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14.5 8.5h2V5.8h-2.2c-2 0-3.3 1.3-3.3 3.4v1.6H9v2.8h2v6.4h2.9v-6.4h2.1l.4-2.8h-2.5V9.6c0-.7.2-1.1.6-1.1z" />
  ),
  whatsapp: (
    <>
      <path d="M3.8 20.2l1.2-4.2a8 8 0 113.1 3l-4.3 1.2z" />
      <path d="M9.2 8.6c.3.7.7 1.4 1.2 2 .6.6 1.2 1 2 1.4l1-1.1 2 1-.6 1.6c-1.6.3-3.2-.5-4.5-1.8s-2-2.9-1.8-4.5l1.6-.6 1 2z" />
    </>
  ),
  vimeo: (
    <path d="M4 8.5c1-1 2-2 3-2s1.6.7 2 2l1.2 4.4c.4 1.4.9 1.6 1.5 1 .6-.6 1.6-2 1.9-3.3.3-1.3-.5-1.6-1.3-1.3.5-2.2 2.8-3.4 4.4-3.1 1.7.3 2.1 2 1.5 4-.8 2.8-3.7 6.6-6 7.3-1.8.5-2.7-1-3.5-3.6L7.4 10c-.3-1-.6-1.2-1.2-.8z" />
  ),
};

const fallback = (
  <>
    <path d="M10.5 13.5a4 4 0 015.6 0l2.4-2.4a4 4 0 00-5.7-5.7l-1.4 1.4" />
    <path d="M13.5 10.5a4 4 0 00-5.6 0l-2.4 2.4a4 4 0 005.7 5.7l1.4-1.4" />
  </>
);

export default function SocialIcon({ name, className = "h-5 w-5" }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name.toLowerCase()] ?? fallback}
    </svg>
  );
}

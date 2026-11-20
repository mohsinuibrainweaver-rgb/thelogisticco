export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD built from trusted, static content only.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

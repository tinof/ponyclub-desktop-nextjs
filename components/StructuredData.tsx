interface StructuredDataProps {
  data: Record<string, any> | Record<string, any>[];
}

export default function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={item['@type'] || `structured-data-${index}`}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe JSON-LD structured data for SEO
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item, null, 0),
          }}
        />
      ))}
    </>
  );
}

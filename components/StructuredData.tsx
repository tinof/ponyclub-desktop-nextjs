interface StructuredDataProps {
	data: Record<string, unknown> | Record<string, unknown>[];
}

export default function StructuredData({ data }: StructuredDataProps) {
	const jsonLd = Array.isArray(data) ? data : [data];

	return (
		<>
			{jsonLd.map((item, index) => (
				<script
					key={String(item["@type"]) || `structured-data-${index}`}
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(item, null, 0),
					}}
				/>
			))}
		</>
	);
}

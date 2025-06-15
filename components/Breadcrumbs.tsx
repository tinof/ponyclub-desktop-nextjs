import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * SEO-friendly breadcrumb navigation component
 * Provides clear navigation hierarchy for users and search engines
 */
export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav 
      className={`breadcrumbs ${className}`}
      aria-label="Breadcrumb navigation"
    >
      <ol 
        className="flex items-center space-x-2 text-sm text-gray-600"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => (
          <li 
            key={index}
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && (
              <svg
                className="w-4 h-4 mx-2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-amber-600 transition-colors duration-200"
                itemProp="item"
              >
                <span itemProp="name">{item.name}</span>
              </Link>
            ) : (
              <span 
                className="text-gray-900 font-medium"
                itemProp="name"
                aria-current="page"
              >
                {item.name}
              </span>
            )}
            
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Hook to generate breadcrumb items for activity pages
 */
export function useActivityBreadcrumbs(
  activityName: string, 
  locale: string
): BreadcrumbItem[] {
  const isGreek = locale === 'el';
  
  return [
    {
      name: isGreek ? 'Αρχική' : 'Home',
      href: `/${locale}`
    },
    {
      name: isGreek ? 'Δραστηριότητες' : 'Activities',
      href: `/${locale}#activities`
    },
    {
      name: activityName
      // No href for current page
    }
  ];
}

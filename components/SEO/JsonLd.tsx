interface OrganizationJsonLdProps {
  url?: string
}

interface CourseJsonLdProps {
  name: string
  description: string
  url: string
  provider?: string
}

export function OrganizationJsonLd({ url = "https://opensyntax-academy.vercel.app" }: OrganizationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OpenSyntax Academy",
    url,
    logo: url + "/icon.svg",
    description:
      "A free, open-source learning platform for advanced Discord development and full-stack web engineering.",
    sameAs: [
      "https://github.com/TSSEJED/opensyntax-academy",
      "https://discord.gg/66GA8MNPeB",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "community support",
      url: "https://discord.gg/66GA8MNPeB",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function CourseJsonLd({ name, description, url, provider = "OpenSyntax Academy" }: CourseJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: provider,
      sameAs: "https://opensyntax-academy.vercel.app",
    },
    isAccessibleForFree: true,
    inLanguage: "en",
    educationalLevel: "Advanced",
    teaches: name,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OpenSyntax Academy",
    url: "https://opensyntax-academy.vercel.app",
    description:
      "Premium open-source learning platform covering Discord development, Web Engineering, AI/ML, TypeScript, DevOps, Databases, and more.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://opensyntax-academy.vercel.app/courses?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

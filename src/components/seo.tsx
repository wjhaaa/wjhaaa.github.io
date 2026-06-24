import Head from "next/head";
import { siteConfig } from "@/lib/site-config";

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
};

function resolveOgImage(image?: string) {
  const path = image ?? siteConfig.ogImage;
  if (path.startsWith("http")) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function Seo({ title, description, canonical, image }: Props) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const desc = description ?? siteConfig.description;
  const ogImage = resolveOgImage(image);
  const pageUrl = canonical ?? siteConfig.url;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}

import Head from "next/head";
import { siteConfig } from "@/lib/site-config";

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
};

export function Seo({ title, description, canonical }: Props) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const desc = description ?? siteConfig.description;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}

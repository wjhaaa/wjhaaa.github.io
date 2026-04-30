import Head from "next/head";

type Props = {
  title: string;
  description?: string;
  canonical?: string;
};

const SITE_NAME = "wjhaaa";
const DEFAULT_DESCRIPTION = "Personal site: about, portfolio, and knowledge base.";

export function Seo({ title, description, canonical }: Props) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const desc = description ?? DEFAULT_DESCRIPTION;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}


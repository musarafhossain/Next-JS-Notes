import React from 'react';

type ParamsType = { slug: string[] };

const DocsPage = async ({ params }: { params: Promise<ParamsType> }) => {
  const { slug } = await params;

  return (
    <div>
      <h1>Docs Page</h1>
      <p>Slug Array: {slug?.join(' / ')}</p>
      {slug?.length >= 1 && <p>Feature ID: {slug[0]}</p>}
      {slug?.length >= 2 && <p>Concept ID: {slug[1]}</p>}
      {slug?.length >= 3 && <p>Example ID: {slug[2]}</p>}
    </div>
  );
};

export default DocsPage;

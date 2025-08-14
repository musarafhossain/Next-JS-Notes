import React from 'react';

type ParamsType = { productId: string; reviewId: string };

const ReviewPage = async ({ params }: { params: Promise<ParamsType> }) => {
  const { productId, reviewId } = await params;

  return (
    <div>
      <h1>Product ID: {productId}</h1>
      <h2>Review ID: {reviewId}</h2>
    </div>
  );
};

export default ReviewPage;

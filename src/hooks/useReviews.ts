import { useEffect, useState } from "react";

export const useReviews = (productId: string) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(`/api/review?productId=${productId}`);
      const data = await response.json();
      setReviews(data);
      calculateAverageRating(data);
    };

    fetchReviews();
  }, [productId]);

  const calculateAverageRating = (reviews: any[]) => {
    if (reviews.length === 0) {
      setAverageRating(0);
    } else {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const average = totalRating / reviews.length;
      setAverageRating(average);
    }
  };

  return { reviews, averageRating };
};

import { useState } from "react";
import { Rating } from "@mui/material";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const CommentForm = ({
  productId,
  onCommentAdded,
}: {
  productId: string;
  onCommentAdded: () => void;
}) => {
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, rating, comment }),
    });

    if (response.ok) {
      setRating(0);
      setComment("");
      onCommentAdded(); // Yorum eklendikten sonra parent componenti bilgilendir
      router.refresh(); // Sayfayı yenile
    } else {
      alert("Yorum eklenirken bir hata oluştu.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-16">
      <div className="mb-4 flex items-center gap-2">
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-white"
        >
          Puan:
        </label>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          emptyIcon={<StarIcon style={{ color: "#b6b6b6" }} />}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-white"
        >
          Yorum:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Yorum Ekle
      </button>
    </form>
  );
};

export default CommentForm;

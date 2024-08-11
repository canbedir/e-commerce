"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Rating } from "@mui/material";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

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

  const uniqueId = useId();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState<null | string>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      return;
    }

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
      onCommentAdded();
      router.refresh();
      closeMenu(); // Yorum eklendikten sonra formu kapat
    } else {
      alert("Yorum eklenirken bir hata oluştu.");
    }
  };

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setNote(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
        <MotionConfig transition={TRANSITION}>
          <div className="">
            <motion.button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              style={{
                borderRadius: 8,
              }}
              onClick={openMenu}
            >
              <motion.span className="text-sm">Yorum yaz</motion.span>
            </motion.button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  ref={formContainerRef}
                  layoutId={`popover-${uniqueId}`}
                  className="absolute h-[200px] mt-2 w-[600px] overflow-hidden border border-zinc-950/10 bg-white outline-none"
                  style={{
                    borderRadius: 12,
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex h-full flex-col">
                    <textarea
                      className="h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none text-black"
                      autoFocus
                      rows={4}
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <div key="close" className="flex justify-between px-4 py-3">
                      <button
                        type="button"
                        className="flex items-center"
                        onClick={closeMenu}
                        aria-label="Close popover"
                      >
                        <ArrowLeftIcon size={16} className="text-zinc-900" />
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Ekle
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </MotionConfig>
      </div>
    </form>
  );
};

export default CommentForm;

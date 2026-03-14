"use client";

import { useState, useEffect } from "react";
import { Star, User, MessageSquare, Loader2, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductReviews({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products/${productId}/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setError("You must be logged in to review.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg("Review submitted successfully!");
        setComment("");
        setRating(5);
        fetchReviews(); // Refresh list
        router.refresh(); // Refresh Server Components to update the main product's rating/review stats real-time
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 sm:p-12 border border-slate-200 shadow-sm mt-12">
      <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
          <MessageSquare className="h-5 w-5 text-[#0f7af7]" />
        </div>
        Customer Reviews
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Write a Review Form */}
        <div>
          <h4 className="font-bold text-slate-900 mb-4">Write a Review</h4>
          {!session ? (
             <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
               <p className="text-sm font-medium text-slate-500 mb-3">Please log in to leave a review.</p>
               <a href="/login" className="inline-flex items-center justify-center px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all">
                 Login
               </a>
             </div>
          ) : (
             <form onSubmit={handleSubmit} className="space-y-4">
               {error && <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
               {successMsg && <p className="text-xs font-bold text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-100">{successMsg}</p>}
               
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`transition-all hover:scale-110 p-1`}
                      >
                        <Star className={`w-8 h-8 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                      </button>
                    ))}
                  </div>
               </div>

               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Review Comment</label>
                 <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="What did you think about this product?"
                    className="w-full text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#0f7af7]/20 focus:border-[#0f7af7] transition-all"
                    required
                 />
               </div>

               <button
                 type="submit"
                 disabled={isSubmitting}
                 className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0f7af7] text-white rounded-xl font-bold hover:bg-blue-600 transition-all disabled:opacity-50"
               >
                 {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                 Submit Review
               </button>
             </form>
          )}
        </div>

        {/* Reviews List */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-6">
            <h4 className="font-bold text-slate-900">Recent Reviews ({reviews.length})</h4>
            {reviews.length > 0 && (
              <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-xl border border-amber-100/50">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-black text-amber-700">
                  {Number((reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1))}
                </span>
                <span className="text-xs font-bold text-amber-600/50">({reviews.length})</span>
              </div>
            )}
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center p-10">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center p-8 bg-slate-50 rounded-xl border border-slate-100">
              <Star className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-500">No reviews yet.</p>
              <p className="text-xs text-slate-400 mt-1">Be the first to review this product!</p>
            </div>
          ) : (
            <div className="space-y-6 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar">
              {reviews.map((review) => (
                <div key={review.id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      {review.user?.image ? (
                        <Image src={review.user.image} alt={review.user.name || "User"} width={36} height={36} className="shrink-0 w-9 h-9 rounded-full bg-white object-cover border border-slate-200" />
                      ) : (
                        <div className="w-9 h-9 shrink-0 rounded-full bg-slate-200 flex items-center justify-center">
                           <User className="w-4 h-4 text-slate-500" />
                        </div>
                      )}
                      <div className="flex flex-col">
                         <p className="text-sm font-bold text-slate-900">{review.user?.name || "Anonymous User"}</p>
                         <p className="text-[10px] uppercase font-bold text-slate-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                       ))}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed pl-12">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

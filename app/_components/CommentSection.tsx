'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Loader, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Comment } from './_types';
import { addComment, getComments } from './_services/commentServices';

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const fetchedComments = await getComments();
      setComments(fetchedComments);

    } catch (err) {
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const newComment = await addComment(name.trim(), comment.trim());
      const newComments = [newComment.response, ...comments].slice(0, 25)
      setComments(newComments);
      setComment('');
      setName('');
    } catch (err) {
      setError('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };
  // [calc(100vh-160px)] 
  return (
    <div className="bg-white rounded-xl shadow-sm flex flex-col h-[calc(100vh-160px)] lg:h-[1400px]">

       <div className="px-6 pb-6 order-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Share Your Thoughts</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              maxLength={50}
            />
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Your Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Share your thoughts..."
              rows={3}
              maxLength={500}
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting || !name.trim() || !comment.trim()}
            className={`
              flex items-center justify-center gap-2 w-full px-6 py-2 
              bg-blue-600 text-white font-medium rounded-lg
              hover:bg-blue-700 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {submitting ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Submit Comment
              </>
            )}
          </button>
        </div>
      </form>
      <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Comments</h3>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : comments?.length > 0 ? (
            <div className="space-y-6">
              <AnimatePresence>
                {comments?.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-blue-50 rounded-lg p-4 border border-blue-100"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800">{comment.name}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600">{comment.comment}</p>
                    <div className='flex justify-start'>
                      <ThumbsUp className='h-4 w-4 mt-2 mx-2 hover:shadow-md' />
                      <ThumbsDown className='h-4 w-4 mt-2 mx-2' />
                    </div>
                  </motion.div>
                ))}
          </AnimatePresence>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No comments yet. Be the first to share your thoughts!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
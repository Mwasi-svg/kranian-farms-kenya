
import React, { useState, useEffect } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export type Comment = {
  id: string;
  name: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
};

interface CommentSectionProps {
  postId: number;
  postSlug: string;
  comments?: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, postSlug, comments: initialComments = [] }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const { toast } = useToast();

  // Simulate loading stored comments from localStorage
  useEffect(() => {
    const storedComments = localStorage.getItem(`blog-comments-${postSlug}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    } else if (initialComments.length > 0) {
      localStorage.setItem(`blog-comments-${postSlug}`, JSON.stringify(initialComments));
    }
  }, [postSlug, initialComments]);
  
  // Save comments to localStorage when they change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(`blog-comments-${postSlug}`, JSON.stringify(comments));
    }
  }, [comments, postSlug]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please provide both your name and a comment.",
        variant: "destructive"
      });
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      avatar: "/placeholder.svg",
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      content: content.trim(),
      likes: 0,
      replies: []
    };

    setComments([...comments, newComment]);
    setName('');
    setContent('');
    
    toast({
      title: "Success",
      description: "Your comment has been posted successfully!",
    });
  };

  const handleReply = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplyContent('');
  };

  const submitReply = (commentId: string) => {
    if (!replyContent.trim()) {
      toast({
        title: "Error",
        description: "Please write a reply before submitting.",
        variant: "destructive"
      });
      return;
    }

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const newReply: Comment = {
          id: `${commentId}-reply-${Date.now()}`,
          name: "You",
          avatar: "/placeholder.svg",
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),
          content: replyContent.trim(),
          likes: 0
        };

        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyingTo(null);
    setReplyContent('');
    
    toast({
      title: "Success",
      description: "Your reply has been posted successfully!",
    });
  };

  const handleLike = (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      
      if (comment.replies) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === commentId) {
            return {
              ...reply,
              likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
              isLiked: !reply.isLiked
            };
          }
          return reply;
        });
        
        return {
          ...comment,
          replies: updatedReplies
        };
      }
      
      return comment;
    });

    setComments(updatedComments);
  };

  return (
    <div className="mt-8 pt-8 border-t">
      <h3 className="text-xl font-bold mb-6">Comments ({comments.reduce((total, comment) => 
        total + 1 + (comment.replies?.length || 0), 0)})</h3>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8 bg-gray-50 p-4 rounded-lg">
        <h4 className="text-lg font-medium mb-3">Leave a Comment</h4>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-kranian-500"
          />
        </div>
        <Textarea
          placeholder="Write your comment here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-3 min-h-[100px] focus-visible:ring-kranian-500"
        />
        <Button type="submit" className="bg-kranian-600 hover:bg-kranian-700">
          Post Comment
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-6">Be the first to leave a comment!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-start">
                <Avatar className="h-10 w-10 mr-3">
                  <img src={comment.avatar} alt={comment.name} className="rounded-full" />
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{comment.name}</h4>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="mt-2 text-gray-700">{comment.content}</p>
                  <div className="mt-3 flex items-center space-x-4">
                    <button 
                      onClick={() => handleLike(comment.id)}
                      className={`flex items-center text-sm ${comment.isLiked ? 'text-kranian-600' : 'text-gray-500'} hover:text-kranian-600`}
                    >
                      <ThumbsUp size={16} className="mr-1" />
                      <span>{comment.likes} Like{comment.likes !== 1 ? 's' : ''}</span>
                    </button>
                    <button 
                      onClick={() => handleReply(comment.id)}
                      className="flex items-center text-sm text-gray-500 hover:text-kranian-600"
                    >
                      <MessageCircle size={16} className="mr-1" />
                      <span>Reply</span>
                    </button>
                  </div>
                  
                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="mt-3">
                      <Textarea
                        placeholder="Write your reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="mb-2 min-h-[80px] focus-visible:ring-kranian-500"
                      />
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setReplyingTo(null)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={() => submitReply(comment.id)}
                          className="bg-kranian-600 hover:bg-kranian-700"
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 ml-6 space-y-4">
                      {comment.replies.map(reply => (
                        <div key={reply.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-start">
                            <Avatar className="h-8 w-8 mr-3">
                              <img src={reply.avatar} alt={reply.name} className="rounded-full" />
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <h5 className="font-medium text-sm">{reply.name}</h5>
                                <span className="text-xs text-gray-500">{reply.date}</span>
                              </div>
                              <p className="mt-1 text-sm text-gray-700">{reply.content}</p>
                              <button 
                                onClick={() => handleLike(reply.id)}
                                className={`mt-2 flex items-center text-xs ${reply.isLiked ? 'text-kranian-600' : 'text-gray-500'} hover:text-kranian-600`}
                              >
                                <ThumbsUp size={14} className="mr-1" />
                                <span>{reply.likes} Like{reply.likes !== 1 ? 's' : ''}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;

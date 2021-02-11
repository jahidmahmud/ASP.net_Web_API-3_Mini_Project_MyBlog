using Blog.Models;
using Code_first.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Blog.Repositories
{
    public class PostRepository : Repository<Post>
    {
        MyBlogContext con = new MyBlogContext();
        public List<Post> GetPostsByUserId(int id)
        {
            return con.Posts.Where(x => x.PostUserID == id).ToList();
        }
        public void DeletePost(int id)
        {
            CommentRepository c = new CommentRepository();
            ReplyRepository r = new ReplyRepository();
            var Comlist = con.Comments.Where(x => x.ComPostID == id).ToList();
            foreach (var x1 in Comlist)
            {
                var replist = con.Replies.Where(x => x.ComID == x1.ComID).ToList();
                foreach(var x2 in replist)
                {
                    r.Delete(x2.ReplyId);
                }
                c.Delete(x1.ComID);
            }

            PostRepository p = new PostRepository();
            p.Delete(id);
        }
    }
}
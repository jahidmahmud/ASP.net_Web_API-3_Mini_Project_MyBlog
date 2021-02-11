using Blog.Models;
using Code_first.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Blog.Repositories
{
    public class CommentRepository:Repository<Comment>
    {
        MyBlogContext con = new MyBlogContext();
        public List<Comment> GetCommentsByPostId(int id)
        {
            return con.Comments.Where(x => x.ComPostID == id).ToList();
        }
    }
}
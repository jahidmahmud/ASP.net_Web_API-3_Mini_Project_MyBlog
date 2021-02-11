using Blog.Models;
using Code_first.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Blog.Repositories
{
    public class ReplyRepository:Repository<Reply>
    {
        MyBlogContext con = new MyBlogContext();
        public List<Reply> GetRepliesByCommentId(int id)
        {
            return con.Replies.Where(x => x.ComID == id).ToList();
        }
    }
}
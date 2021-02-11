using Blog.Models;
using Blog.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Blog.Controllers
{
    [RoutePrefix("api/comments")]
    public class CommentController : ApiController
    {
        MyBlogContext con = new MyBlogContext();
        CommentRepository cr = new CommentRepository();
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(cr.GetAll());
        }
        [Route("{id}", Name = "GetCommentById")]
        public IHttpActionResult Get(int id)
        {
            return Ok(cr.Get(id));
        }
        [Route("")]
        public IHttpActionResult Post(Comment u)
        {
            cr.Insert(u);
            string url = Url.Link("GetCommentById", new { id = u.ComID });
            return Created(url, u);
        }

        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            ReplyRepository r = new ReplyRepository();
            var replist = con.Replies.Where(x => x.ComID == id).ToList();
            foreach(var x in replist)
            {
                r.Delete(x.ReplyId);
            }
            cr.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("{id}")]
        public IHttpActionResult Put([FromUri] int id, [FromBody] Comment p)
        {
            if (p.ComUserID == id)

            {
                cr.Update(p);
                return Ok(p);

            }

            return StatusCode(HttpStatusCode.Forbidden);




        }

        [Route("{id}/comments")]
        public IHttpActionResult GetCommentsByPostId(int id)
        {
            //ProductRepository pro = new ProductRepository();
            return Ok(cr.GetCommentsByPostId(id));
        }
    }
}

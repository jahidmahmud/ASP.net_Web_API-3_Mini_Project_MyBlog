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
    [RoutePrefix("api/replies")]
    public class ReplyController : ApiController
    {
        ReplyRepository repo = new ReplyRepository();
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(repo.GetAll());
        }
        [Route("{id}", Name = "GetreplyById")]
        public IHttpActionResult Get(int id)
        {
            return Ok(repo.Get(id));
        }
        [Route("")]
        public IHttpActionResult Post(Reply u)
        {
            repo.Insert(u);
            string url = Url.Link("GetreplyById", new { id = u.ReplyId });
            return Created(url, u);
        }
        [Route("{id}/replies")]
        public IHttpActionResult GetRepliesByCommentId(int id)
        {
            //ProductRepository pro = new ProductRepository();
            return Ok(repo.GetRepliesByCommentId(id));
        }
    }
}

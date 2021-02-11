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
    [RoutePrefix("api/posts")]
    public class PostController : ApiController
    {
        PostRepository pro = new PostRepository();
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(pro.GetAll());
        }
        [Route("{id}", Name = "GetPostById")]
        public IHttpActionResult Get(int id)
        {
            return Ok(pro.Get(id));
        }
        [Route("")]
        public IHttpActionResult Post(Post u)
        {
            pro.Insert(u);
            string url = Url.Link("GetCommentById", new { id = u.PostID });
            return Created(url, u);
        }
        [Route("{id}")]
        public IHttpActionResult Put([FromUri] int id, [FromBody] Post p)
        {
            p.PostID = id;
            pro.Update(p);
            return Ok(p);
        }
        [Route("{id}/posts")]
        public IHttpActionResult GetPostsByUserId(int id)
        {
            //ProductRepository pro = new ProductRepository();
            return Ok(pro.GetPostsByUserId(id));
        }
        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            pro.DeletePost(id);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}

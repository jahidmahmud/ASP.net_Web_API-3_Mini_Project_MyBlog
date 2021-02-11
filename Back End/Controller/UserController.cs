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
    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {
        UserRepository usrepo = new UserRepository();
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(usrepo.GetAll());
        }
        [Route("{id}", Name = "GetUserById")]
        public IHttpActionResult Get(int id)
        {
            return Ok(usrepo.Get(id));
        }
        [Route("")]
        public IHttpActionResult Post(User u)
        {
            usrepo.Insert(u);
            string url = Url.Link("GetUserById", new { id = u.UserID });
            return Created(url, u);
        }

    }
}

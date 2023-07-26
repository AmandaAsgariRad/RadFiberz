using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RadFiberz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductColorController : ControllerBase
    {
        // GET: api/<ProductColor>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ProductColor>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ProductColor>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ProductColor>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProductColor>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

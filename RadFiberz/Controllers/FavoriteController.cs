using Microsoft.AspNetCore.Mvc;
using RadFiberz.Models;
using RadFiberz.Repositories;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RadFiberz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteRepository _favoriteRepository;
        public FavoriteController(IFavoriteRepository favoriteRepository)
        {
            _favoriteRepository = favoriteRepository;
        }
        //// GET: api/<FavoriteController>
        //[HttpGet]
        //public IActionResult Get()
        //{
            
        //}

        // GET by UserId api/<FavoriteController>/5
        [HttpGet("details/{userId}")]
        public IActionResult GetByUserId(int userId)
        {
            List<Favorite> favorites = _favoriteRepository.GetAllByUserId(userId);
            return Ok(favorites);
        }

        // POST/ADD api/<FavoriteController>
        [HttpPost]
        public IActionResult AddFavorite(Favorite favorite)
        {
            _favoriteRepository.Add(favorite);
            return CreatedAtAction("Get", new { id = favorite.Id }, favorite);
        }

        //// PUT api/<FavoriteController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<FavoriteController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _favoriteRepository.Delete(id);
            return NoContent();
        }
    }
}

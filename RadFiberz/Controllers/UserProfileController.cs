using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RadFiberz.Models;
using RadFiberz.Repositories;
using System;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RadFiberz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class UserProfileController : ControllerBase
    {
        
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }
            // GET: api/<UserProfileController>
            [HttpGet("{firebaseUserId}")]
            public IActionResult GetUserProfile(string firebaseUserId)
            {
                return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
            }

        // GET api/<UserProfileController>/5
        [HttpGet("details/{id}")]
        public IActionResult GetByUserId(int id)
        {
            var userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }
            

            // POST api/<UserProfileController>
            [HttpPost]
            public IActionResult Add(UserProfile userProfile)
            {
                userProfile.DateCreated = DateTime.Now;
                _userProfileRepository.Add(userProfile);
            return CreatedAtAction(nameof(GetUserProfile), userProfile);
            }

            // PUT api/<UserProfileController>/5
            [HttpPut("{id}")]
            public IActionResult Update(int id, UserProfile userProfile)
            {
               if (id != userProfile.Id)
            {
                return BadRequest();
            }
               _userProfileRepository.Update(userProfile);
               return NoContent();
            }

            // DELETE api/<UserProfileController>/5
            //[HttpDelete("{id}")]
            //public void Delete(int id)
            //{
            //}
        
    }
}

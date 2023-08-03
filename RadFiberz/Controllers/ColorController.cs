using Microsoft.AspNetCore.Mvc;
using RadFiberz.Models;
using RadFiberz.Repositories;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RadFiberz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        private readonly IColorRepository _colorRepository;
        public ColorController(IColorRepository colorRepository)
        {
            _colorRepository = colorRepository;
        }

        // GET all Colors: api/<ColorController>
        [HttpGet]
        public IActionResult GetAllColors()
        {
            List<Color> colors = _colorRepository.GetAll();
            return Ok(colors);
        }

        // GET by Id api/<ColorController>/5
        [HttpGet("details/{id}")]
        public IActionResult GetColorById(int id)
        {
            var colors = _colorRepository.GetById(id);
            if (colors == null)
            {
                return NotFound();
            }
            return Ok(colors);
        }
        //Product Colors-------------------------------------------------------

        [HttpGet("productColors/{userId}")]
        public IActionResult GetAllProductColors(int userId)
        {
            List<ProductColor> productColors = _colorRepository.GetAllProductColors(userId);
            return Ok(productColors);
        }

        // GET Product Color by userId api/<ColorController>/5
        [HttpGet("details/{userId}")]
        public IActionResult GetByUserId(int userId)
        {
            var productColor = _colorRepository.GetPcByUserId(userId);
            if (productColor == null)
            {
                return NotFound();
            }
            return Ok(productColor);
        }

        // POST/add productColor api/<ColorController>
        [HttpPost]
        public IActionResult AddPc(ProductColor productColor)
        {
            _colorRepository.AddProductColor(productColor);
            return Ok(productColor.Id);
        }

        //// PUT api/<ColorController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<ColorController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _colorRepository.DeletePcById(id);
            return NoContent();
        }
    }
}

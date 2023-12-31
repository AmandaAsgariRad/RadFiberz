﻿using Microsoft.AspNetCore.Mvc;
using RadFiberz.Models;
using RadFiberz.Repositories;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RadFiberz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;
        private readonly IColorRepository _colorRepository;
        public CartController(ICartRepository cartRepository, IColorRepository colorRepository)
        {
            _cartRepository = cartRepository;
            _colorRepository = colorRepository;
        }

        //// GET: api/<CartController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET by UserId api/<CartController>/5
        [HttpGet("{userId}")]
        public IActionResult GetCartByUserId(int userId)
        {
            List<Cart> carts = _cartRepository.GetByUserId(userId);
            if (carts == null)
            {
                return NotFound();
            }
            return Ok(carts);
        }

        // GET by Id api/<CartController>/5
        [HttpGet("details/{id}")]
        public IActionResult GetCartById(int id)
        {
            var cart = _cartRepository.GetById(id);
            if (cart == null)
            {
                return NotFound();
            }
            return Ok(cart);
        }

        // POST/Add api/<CartController>
        [HttpPost]
        public IActionResult AddCart(Cart cart)
        {
            if (cart == null)
            {
                return BadRequest();
            }

            _cartRepository.Add(cart);

            return Ok();
        }

        // PUT/Update api/<CartController>/5
        [HttpPut("{id}")]
        public IActionResult UpdateCart(int id, ProductColor productColor)
        {
            if (productColor == null)
            {
                return BadRequest();
            }

            //var existingCart = _cartRepository.GetById(id);
            //if (existingCart == null)
            //{
            //    return NotFound();
            //}

            //existingCart.ProductId = productColor.ProductId;
            //existingCart.ProductColorId = productColor.ColorId;

            _cartRepository.Update(id, productColor);

            return NoContent();
        }

        // DELETE api/<CartController>/5
        [HttpDelete("deleteItem/{productColorId}")]
        public IActionResult DeleteByPcId(int productColorId)
        {

            _cartRepository.DeleteByProductColorId(productColorId);
            _colorRepository.DeletePcById(productColorId);

            return NoContent();
        }

        [HttpDelete("{userId}")]
        public IActionResult DeleteByUserProfileId(int userId)
        {

            _cartRepository.DeleteByUserId(userId);

            return NoContent();
        }
    }
}

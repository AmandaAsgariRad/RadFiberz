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
        public CartController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        //// GET: api/<CartController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET by UserId api/<CartController>/5
        [HttpGet("details/byUserId/{userId}")]
        public IActionResult GetCartByUserId(int userId)
        {
            var cart = _cartRepository.GetByUserId(userId);
            if (cart == null)
            {
                return NotFound();
            }
            return Ok(cart);
        }

        // GET by Id api/<CartController>/5
        [HttpGet("details/byId/{id}")]
        public IActionResult Get(int id)
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
        public IActionResult AddCart([FromBody] Cart cart)
        {
            if (cart == null)
            {
                return BadRequest();
            }

            _cartRepository.Add(cart);

            return CreatedAtRoute("GetCartById", new { id = cart.Id }, cart);
        }

        // PUT/Update api/<CartController>/5
        [HttpPut("{id}")]
        public IActionResult UpdateCart(int id, [FromBody] Cart cart)
        {
            if (cart == null || cart.Id != id)
            {
                return BadRequest();
            }

            var existingCart = _cartRepository.GetById(id);
            if (existingCart == null)
            {
                return NotFound();
            }

            existingCart.ProductId = cart.ProductId;
            existingCart.ProductQuantity = cart.ProductQuantity;
            existingCart.UserId = cart .UserId;
            existingCart.ProductColorId = cart .ProductColorId;
            existingCart.OrderComplete = cart.OrderComplete;

            _cartRepository.Update(existingCart);

            return NoContent();
        }

        // DELETE api/<CartController>/5
        [HttpDelete("{productId}")]
        public IActionResult DeleteProductInCart(int productId)
        {

            _cartRepository.Delete(productId);

            return NoContent();
        }
    }
}

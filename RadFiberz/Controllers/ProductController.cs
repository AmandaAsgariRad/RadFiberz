using Microsoft.AspNetCore.Mvc;
using RadFiberz.Models;
using RadFiberz.Repositories;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RadFiberz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        // GET All Products: api/<ProductController>
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            List<Product> products = _productRepository.GetAll();
            return Ok(products);
        }

        // GET by Id api/<ProductController>/5
        [HttpGet("details/{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _productRepository.GetById(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);

        }

        // POST/add product api/<ProductController>
        //[HttpPost]
        //public IActionResult AddProduct(Product product)
        //{
        //    _productRepository.Add(product);
        //    return CreatedAtAction("Get", new { id = product.Id }, product);
        //}

        // DELETE favorite api/<ProductController>/5
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            _productRepository.Delete(id);
            return NoContent();
        }
    }
}

//        

//        // PUT api/<ProductController>/5
//        [HttpPut("{id}")]
//        public void Put(int id, [FromBody] string value)
//        {
//        }





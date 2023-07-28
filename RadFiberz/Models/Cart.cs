using System;
using System.ComponentModel.DataAnnotations;

namespace RadFiberz.Models
{
    public class Cart
    {
        public int Id { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int CartId { get; set; }
        [Required]
        public int ProductQuantity { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int ProductColorId { get; set; }

        [Required]
        public bool OrderComplete { get; set; } 
        public UserProfile UserProfile { get; set; }
        public Product Product { get; set; }
        public ProductColor ProductColor { get; set; }



    }
}

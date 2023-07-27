using System;
using System.ComponentModel.DataAnnotations;

namespace RadFiberz.Models
{
    public class Order
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int CartId { get; set; }
        public Cart Cart { get; set; }


    }
}

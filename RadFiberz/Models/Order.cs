using System;
using System.ComponentModel.DataAnnotations;

namespace RadFiberz.Models
{
    public class Order
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int CartId { get; set; }


    }
}

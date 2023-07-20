using System.ComponentModel.DataAnnotations;
namespace RadFiberz.Models
{
    public class Purchase
    {
        public int Id
        {
            get; set;
        }
        [Required]
        public int ProductId
        {
            get; set;
        }
        [Required]
        public int UserId
        {
            get; set;
        }
    }
}

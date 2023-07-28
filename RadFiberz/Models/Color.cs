using System.ComponentModel.DataAnnotations;

namespace RadFiberz.Models
{
    public class Color
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(55)]
        public string Name { get; set; }
        public UserProfile UserProfile { get; set; }

    }
}

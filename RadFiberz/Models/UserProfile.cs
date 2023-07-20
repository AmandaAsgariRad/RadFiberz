using Microsoft.VisualBasic;
using System;
using System.ComponentModel.DataAnnotations;

namespace RadFiberz.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(55)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(55)]
        public string LastName { get; set; }

        [Required]
        public bool IsAdmin { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(55)]
        public string Email { get; set; }

        [Required]
        [MaxLength(55)]
        public string StreetAddress { get; set; }

        [Required]
        [MaxLength(55)]
        public string City { get; set; }

        [Required]
        [MaxLength(55)]
        public string State { get; set; }
        [Required]
        [DataType(DataType.PostalCode)]
        [MaxLength(55)]
        public string ZipCode { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        [MaxLength(55)]
        public string PhoneNumber { get; set; }
        public DateTime DateCreated { get; set; }
        
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        public bool IsActive { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }



    }
}

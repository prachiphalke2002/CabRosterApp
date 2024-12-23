using System.ComponentModel.DataAnnotations;
namespace CabRosterApp.Models
{
    public class UserRegistrationViewModel
    {
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; }

        [Required] // Ensure it's required if it shouldn't be nullable
       

        public string MobileNumber { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
        public string Password { get; set; }

      

        public string ConfirmPassword { get; set; }

        
    }
}

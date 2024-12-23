using CabRosterApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CabRosterApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly CabRosterAppDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(CabRosterAppDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IActionResult> GetUsersStatus()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            var userStatus = new
            {
                user.Name,
                user.Email,
                user.IsApproved,
                user.IsRejected,
                user.MobileNumber,
               
            };

            return Ok(userStatus);
        }

        // POST: api/Users/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                Name = model.Name,
                MobileNumber = model.MobileNumber,
                IsApproved = false,
                IsRejected = false,
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok("User registered successfully. Awaiting approval.");
            }

            foreach (var error in result.Errors)
            {
                return BadRequest(error.Description);
            }

            return BadRequest("Something went wrong.");

        }
       
    }
}

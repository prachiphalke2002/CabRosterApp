using CabRosterApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace CabRosterApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : Controller
    {
        private readonly CabRosterAppDbContext _context;

        public CalendarController(CabRosterAppDbContext context)
        {
            _context = context;
        }

        [HttpGet("available-dates")]
        public IActionResult GetAvailableDates(int weeks = 4) // Default to 4 weeks
        {
            var today = DateTime.Now.Date;
            var availableDates = new List<DateTime>();

            for (var i = 0; i < weeks * 7; i++) // Iterate for N weeks
            {
                var date = today.AddDays(i);
                // Exclude Saturday, Sunday, and Monday
                if (date.DayOfWeek != DayOfWeek.Saturday && date.DayOfWeek != DayOfWeek.Sunday && date.DayOfWeek != DayOfWeek.Monday)
                {
                    availableDates.Add(date);
                }
            }

            return Ok(availableDates);
        }


        
    }
}

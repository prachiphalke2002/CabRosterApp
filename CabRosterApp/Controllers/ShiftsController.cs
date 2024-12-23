using CabRosterApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CabRosterApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShiftsController : ControllerBase
    {
        private readonly CabRosterAppDbContext _context;

        public ShiftsController(CabRosterAppDbContext context)
        {
            _context = context;
        }

        // GET: api/Shifts/list
        [HttpGet("list")]
        public IActionResult GetShifts()
        {
            var shifts = _context.Shifts.Select(s => new
            {
                id = s.Id,
                shiftTime = s.ShiftTime
            }).ToList();

            return Ok(shifts);
        }
    }
}
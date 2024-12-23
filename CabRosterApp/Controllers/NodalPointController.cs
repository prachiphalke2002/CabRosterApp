using CabRosterApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace CabRosterApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NodalPointController : ControllerBase
    {
        private readonly CabRosterAppDbContext _context;

        public NodalPointController(CabRosterAppDbContext context)
        {
            _context = context;
        }

        [HttpPost("add-nodal-point")]
        public IActionResult AddNodalPoint([FromBody] NodalPoint nodalPoint)
        {
            if (nodalPoint == null || string.IsNullOrWhiteSpace(nodalPoint.LocationName))
            {
                return BadRequest("Invalid nodal point.");
            }

            _context.NodalPoints.Add(nodalPoint);
            _context.SaveChanges();

            return Ok(new { Message = "Nodal point added successfully." });
        }

        [HttpGet("get-nodal-points")]
        public IActionResult GetNodalPoints()
        {
            var nodalPoints = _context.NodalPoints.ToList();
            return Ok(nodalPoints);
        }

    }
}
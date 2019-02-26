using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Networth.Services;

namespace Networth.Controllers
{
    [ApiController]
    public class PositionController : Controller
    {
        private NetworthDbContext _context;
        public PositionController(NetworthDbContext context) {
            _context = context;
        }
        [Route("[controller]")]
        public ActionResult Index() {
            return View();
        }

        [HttpGet("api/[controller]")]
        public ActionResult GetPositions() {
            return Json(_context.Positions);
        }

        [HttpGet("api/[controller]/{id}")]
        public IActionResult GetPositionId(int id) {
            return Ok(_context.Positions.Find(id));
        }
    }
}
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
    public class LoanController : Controller
    {
        private NetworthDbContext _context;
        public LoanController(NetworthDbContext context) {
            _context = context;
        }

        [Route("[controller]")]
        public ActionResult Index() {
            return View();
        }

        [HttpGet("api/[controller]")]
        public ActionResult GetLoans() {
            return Json(_context.Loans);
        }

        [HttpGet("api/[controller]/{id}")]
        public IActionResult GetLoanId(int id) {
            return Ok(_context.Loans.Find(id));
        }
    }
}
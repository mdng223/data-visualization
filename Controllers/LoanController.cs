using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Networth.Services;
using Networth.Entities.Loan;
using Networth.Models;

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
            List<LoanViewModel> loanList = new List<LoanViewModel> {};
            foreach (Loan loan in _context.Loans) {
                if (loan.Hidden == false) {
                    LoanViewModel loanData = new LoanViewModel();
                    loanData.LoanId = loan.LoanId;
                    loanData.LoanName = loan.LoanName;
                    // loanData.UserId = _context.Loans.Find(loan.UserId);
                    loanList.Add(loanData);
                }
            }
            return Json(loanList);
        }

        [HttpGet("api/[controller]/{id}")]
        public IActionResult GetLoanId(int id) {
            return Ok(_context.Loans.Find(id));
        }
    }
}
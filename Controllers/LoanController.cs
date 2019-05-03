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
                    loanData.Debt = loan.Debt;
                    loanData.LoanDate = loan.LoanDate;
                    loanData.LoanType = _context.LoanTypes.FirstOrDefault(a => a.LoanTypeId == 
                                        loan.LoanTypeId).LoanTypeName;
                    loanData.InterestRate = loan.InterestRate;
                    loanData.User = _context.Users.FirstOrDefault(a => a.Id == 
                                        loan.UserId).Username;
                    loanList.Add(loanData);
                }
            }
            return Json(loanList);
        }

        [HttpPut("api/[controller]/hide")]
        public ActionResult HideLoan(HideModel hideModel) {
            Console.WriteLine("Hiding ID:\t{0} ::\ttype: {1}", hideModel.Id, hideModel.Id.GetType());
            try {
                Loan l =_context.Loans.FirstOrDefault(a => a.LoanId == hideModel.Id);
                if(l == null) {
                    return BadRequest();
                }
                l.Hidden = true;
                _context.SaveChanges();
            } catch (Exception e) {
                return Json("Bank delete failed. " + e);
            }
            return Json(hideModel.Id);
        }
        [HttpGet("api/[controller]/{id}")]
        public IActionResult GetLoanId(int id) {
            return Ok(_context.Loans.Find(id));
        }
    }
}
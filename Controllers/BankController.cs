using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Networth.Services;
using Networth.Entities.Bank;
using Networth.Models;

namespace Networth.Controllers
{
    [ApiController]
    public class BankController : Controller
    {
        private NetworthDbContext _context;
        public BankController(NetworthDbContext context) {
            _context = context;
        }

        [Route("[controller]")]
        public ActionResult Index() {
            return View();
        }

        [HttpGet("api/[controller]")]
        public ActionResult GetBanks() {
            List<BankViewModel> bankList = new List<BankViewModel> {};
            foreach (Bank bank in _context.Banks) {
                if (bank.Hidden == false) {
                    BankViewModel bankData = new BankViewModel();
                    bankData.BankId = bank.BankId;
                    bankData.BankName = bank.BankName;
                    bankData.InterestRate = bank.InterestRate;
                    bankList.Add(bankData);
                }
            }
            return Json(bankList);
        }


        [HttpPut("api/[controller]/hide")]
        public ActionResult HideBank(HideModel hideModel) {
            Console.WriteLine("Hiding ID:\t{0} ::\ttype: {1}", hideModel.Id, hideModel.Id.GetType());
            try {
                Bank b =_context.Banks.FirstOrDefault(a => a.BankId == hideModel.Id);
                if(b == null) {
                    return BadRequest();
                }
                b.Hidden = true;
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
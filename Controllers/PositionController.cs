using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Networth.Services;
using Networth.Entities.Position;
using Networth.Models;

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
            List<PositionViewModel> positionList = new List<PositionViewModel> {};
            foreach (Position position in _context.Positions) {
                if (position.Hidden == false) {
                    PositionViewModel positionData = new PositionViewModel();
                    positionData.PositionId = position.PositionId;
                    positionData.PositionName = position.PositionName;
                    positionData.Symbol = position.Symbol;
                    positionData.Username = _context.Users.FirstOrDefault(a => a.Id == 
                                        position.UserId).Username;
                    positionList.Add(positionData);
                }
            }
            return Json(positionList);
        }


        [HttpPost("api/[controller]")]
        public ActionResult PostPosition(Position Position) {
             Console.WriteLine("GETS HERE");
            Console.WriteLine("Position Name:\t{0} ::\ttype: {1}", Position.PositionName, Position.PositionName.GetType());
            Console.WriteLine("Symbol:\t{0} ::\ttype: {1}", Position.Symbol, Position.Symbol.GetType());
            Console.WriteLine("Symbol:\t{0} ::\ttype: {1}", Position.UserId, Position.UserId.GetType());
            try {
                Position positionData = new Position() {
                    PositionName = Position.PositionName,
                    Symbol = Position.Symbol,
                    UserId = Position.UserId,
                    Hidden = false, 
                    DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                };
                _context.Positions.Add(positionData);
                _context.SaveChanges();
            } catch (Exception e) {
                return Json("Position add failed. " + e);
            }

            return Json("Position added successfully!");
        }

        [HttpPut("api/[controller]/hide")]
        public ActionResult HidePosition(HideModel hideModel) {
            Console.WriteLine("Hiding ID:\t{0} ::\ttype: {1}", hideModel.Id, hideModel.Id.GetType());
            try {
                Position p =_context.Positions.SingleOrDefault(a => a.PositionId == hideModel.Id);
                if(p == null) {
                    return BadRequest();
                }
                p.Hidden = true;
                _context.SaveChanges();
            } catch (Exception e) {
                return Json("User delete failed. " + e);
            }
            return Json(hideModel.Id);
        }


        [HttpGet("api/[controller]/{id}")]
        public IActionResult GetPositionId(int id) {
            return Ok(_context.Positions.Find(id));
        }
    }
}
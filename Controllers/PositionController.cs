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

        [HttpGet("api/[controller]/{id}")]
        public IActionResult GetPositionId(int id) {
            return Ok(_context.Positions.Find(id));
        }

        [HttpPut("api/[controller]/edit")]
        public JsonResult EditUser(EditPositionModel position) {
            Console.WriteLine("Editing ID:\t{0} ::\ttype: {1}", position.Id, position.Id.GetType());
            Console.WriteLine("Editing positionName:\t{0} ::\ttype: {1}", position.positionName, position.positionName.GetType());
            Console.WriteLine("Editing symbol:\t{0} ::\ttype: {1}", position.symbol, position.symbol.GetType());
            Console.WriteLine("Editing userId:\t{0} ::\ttype: {1}", position.userId, position.userId.GetType());
            try {
                Position p =_context.Positions.FirstOrDefault(a => a.PositionId == position.Id);
                if(p == null) {
                    return Json(new {
                        message = "Null"
                    });
                }
                p.PositionName = position.positionName;
                p.Symbol = position.symbol;
                p.UserId = position.userId;
                _context.SaveChanges();
            } catch (Exception e) {
                return Json("User delete failed. " + e);
            }
            //return Json(user.Username + " hidden!");
            return Json(position.Id);
        }

        [HttpPut("api/[controller]/hide")]
        public JsonResult HidePosition(HideModel hideModel) {
            Console.WriteLine("Hiding ID:\t{0} ::\ttype: {1}", hideModel.Id, hideModel.Id.GetType());
            try {
                Position p =_context.Positions.SingleOrDefault(a => a.PositionId == hideModel.Id);
                if(p == null) {
                    return Json(new {
                        message = "Null"
                    });
                }
                p.Hidden = true;
                _context.SaveChanges();
            } catch (Exception e) {
                return Json("User delete failed. " + e);
            }
            return Json(hideModel.Id);
        }

        [HttpGet("api/[controller]")]
        public JsonResult GetPositions() {
            List<PositionViewModel> positionList = new List<PositionViewModel> {};
            foreach (Position position in _context.Positions) {
                if (position.Hidden == false) {
                    PositionViewModel positionData = new PositionViewModel();
                    positionData.PositionId = position.PositionId;
                    positionData.PositionName = position.PositionName;
                    positionData.Symbol = position.Symbol;
                    positionData.Username = _context.Users.FirstOrDefault(
                        a => a.Id == position.UserId).Username;
                    positionList.Add(positionData);
                }
            }
            return Json(positionList);
        }

        [Route("[controller]")]
        public ActionResult Index() {
            return View();
        }

        [HttpPost("api/[controller]")]
        public JsonResult PostPosition(Position Position) {
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
    }
}
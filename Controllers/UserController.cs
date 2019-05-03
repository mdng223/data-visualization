using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Networth.Services;
using Networth.Entities.User;
using Networth.Entities.Position;
using Networth.Models;


namespace Networth.Controllers
{

    [ApiController]
    public class UserController : Controller
    {
        private NetworthDbContext _context;
        public UserController(NetworthDbContext context) {
            _context = context;
        }
        [Route("[controller]")]
        public ActionResult Index() {
            return View();
        }

        [HttpGet("api/[controller]")]
        public ActionResult GetUsers() {
            List<UserViewModel> userList = new List<UserViewModel> {};
            foreach (User user in _context.Users) {
                if (user.Hidden == false) {
                    UserViewModel userData = new UserViewModel();
                    userData.Id = user.Id;
                    userData.Username = user.Username;
                    userData.RoleName = _context.Roles.Find(user.RoleId).RoleName;
                    userData.Email = user.Email;
                    userList.Add(userData);
                }
            }
            return Json(userList);
        }

        [HttpGet("api/[controller]/{id}")]
        public IActionResult GetUserId(int id) {
            return Ok(_context.Users.Find(id));
        }

        [HttpPost("api/[controller]")]
        public ActionResult PostUser(User user) {
            Console.WriteLine("Username:\t{0} ::\ttype: {1}", user.Username, user.Username.GetType());
            Console.WriteLine("Password:\t{0} ::\ttype: {1}", user.Password, user.Password.GetType());
            Console.WriteLine("Email:\t{0} ::\ttype: {1}", user.Email, user.Email.GetType());
            Console.WriteLine("RoleId:\t{0} ::\ttype: {1}", user.RoleId, user.RoleId.GetType());
            try {
                User userData = new User() {
                    Username = user.Username,
                    Email = user.Email,
                    Password = user.Password,
                    RoleId = user.RoleId,
                };
                _context.Users.Add(userData);
                _context.SaveChanges();
            } catch (Exception e) {
                return Json("User add failed. " + e);
            }

            return Json("User added successfully!");
        }


        [HttpPut("api/[controller]/hide")]
        public ActionResult HideUser(HideModel hideModel) {
            Console.WriteLine("Hiding ID:\t{0} ::\ttype: {1}", hideModel.Id, hideModel.Id.GetType());
            try {
                User u =_context.Users.FirstOrDefault(a => a.Id == hideModel.Id);
                if(u == null) {
                    return BadRequest();
                }
                u.Hidden = true;
                _context.SaveChanges();
            } catch (Exception e) {
                return Json("User delete failed. " + e);
            }
            //return Json(user.Username + " hidden!");
            return Json(hideModel.Id);
        }


        [HttpPut("api/[controller]/edit")]
        public ActionResult EditUser(EditUserModel user) {
            Console.WriteLine("Editing ID:\t{0} ::\ttype: {1}", user.Id, user.Id.GetType());
            try {
                User u =_context.Users.FirstOrDefault(a => a.Id == user.Id);
                if(u == null) {
                    return BadRequest();
                }
                u.Email = user.Email;
                u.RoleId = user.RoleId;
                _context.SaveChanges();
            } catch (Exception e) {
                return Json("User delete failed. " + e);
            }
            //return Json(user.Username + " hidden!");
            return Json(user.Id);
        }
    }
}
/*
     Purpose:  To manually give my database some starting data only if no data exists.
     Date:     December 20, 2018
 */

using System.Collections.Generic;
using System.Linq;
using Networth.Entities.User;
using Networth.Entities.Position;
using Networth.Entities.Role;
using Networth.Entities.Loan;
using Networth.Services;
using System;

namespace Networth.Services{
     public static class NetworthDbContextExtensions{
          public static void CreateSeedData(this NetworthDbContext context){
               if(!context.Positions.Any()){

                    //context.AddRange(p);
               }
               if(!context.Loans.Any()){
                    var l = new List<Networth.Entities.Loan.Loan>(){
                         new Loan(){
                              LoanName = "Loan1",
                              DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                              Hidden = false,
                         },
                         new Loan(){
                              LoanName = "Loan2",
                              DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                              Hidden = false,
                         },
                         new Loan(){
                              LoanName = "Loan3",
                              DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                              Hidden = false,
                         },
                         new Loan(){
                              LoanName = "Loan4",
                              DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                              Hidden = false,
                         }
                    };
                    context.AddRange(l);
               }
               if(!context.Roles.Any()){
                    var r = new List<Networth.Entities.Role.Role>(){
                         new Role(){
                              RoleId = (int)RoleEnum.Administrator,
                              RoleName = RoleEnum.Administrator.ToString(),
                         },
                         new Role(){
                              RoleId = (int)RoleEnum.Manager,
                              RoleName = RoleEnum.Manager.ToString(),
                         },
                         new Role(){
                              RoleId = (int)RoleEnum.User,
                              RoleName = RoleEnum.User.ToString(),
                         }
                    };
                    

                    context.AddRange(r);
               }
               context.SaveChanges();
               if(!context.Users.Any()){

                    var p = new List<Networth.Entities.Position.Position>(){
                         new Position(){
                              PositionName = "Fidelity Contrafund",
                              Symbol = "FCNTX",
                              DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                              Hidden = false,
                         },
                         new Position(){
                              PositionName = "Fidelity ZERO Total Market Index Fund",
                              Symbol = "FZROX",
                              DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                              Hidden = false,
                         },
                         new Position(){
                              PositionName = "Equity Index Trust Class C",
                              Symbol = "XCT",
                              DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                              Hidden = false,
                         },
                         new Position(){
                              PositionName = "Vanguard Small Cap Index, Admiral Shares",
                              Symbol = "VSMAX",
                              DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                              Hidden = false,
                         },
                         new Position(){
                              PositionName = "Vanguard 500 Index Fund Admiral Shares",
                              Symbol = "VFIAX",
                              DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                              Hidden = false,
                         },
                    };

                    var u = new List<Networth.Entities.User.User>(){
                         new User(){
                              Username = "mdng223",
                              Password = "stuff",
                              Email = "as;dfljkasdf@gmail.com",
                              RoleId = context.Roles.FirstOrDefault(a => a.Id == (int)RoleEnum.Administrator).RoleId,
                              Hidden = false,
                              Positions =  p,
                         },
                         new User(){
                              Username = "hello",
                              Password = "stuff",
                              Email = "m@gmail.com",
                              RoleId = context.Roles.FirstOrDefault(a => a.Id == (int)RoleEnum.Manager).RoleId,
                              Hidden = false,
                         },
                         new User(){
                              Username = "hello2",
                              Password = "stuff2",
                              Email = "marcopolo@gmai2l.com",
                              RoleId = context.Roles.FirstOrDefault(a => a.Id == (int)RoleEnum.User).RoleId,
                              Hidden = false,
                         },
                    };
                    foreach (Position position in p) {
                              position.User = context.Users.FirstOrDefault(a => a.Username == "mdng223");
                              //position.UserId = context.Users.FirstOrDefault(a => a.Username == "mdng223").Id;
                    }
                    context.AddRange(p);
                    context.AddRange(u);
               }

               context.SaveChanges();
          }
     }
}

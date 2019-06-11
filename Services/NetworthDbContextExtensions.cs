/*
     Purpose:  To manually give my database some starting data only if no data exists.
     Date:     December 20, 2018
 */

using System.Collections.Generic;
using System.Linq;
using Networth.Entities.User;
using Networth.Entities.Position;
using Networth.Entities.PositionEntry;
using Networth.Entities.Role;
using Networth.Entities.Loan;
using Networth.Entities.Bank;
using Networth.Entities.BankType;
using Networth.Entities.LoanEntry;
using Networth.Entities.LoanType;
using Networth.Entities.PositionType;
using Networth.Entities.Mbti;
using Networth.Entities.MbtiUser;
using Networth.Entities.Gender;
using Networth.Services;
using System.IO;
using System;

namespace Networth.Services{  
     public static class NetworthDbContextExtensions{

        // WILL READ IN A CSV FILE
        private static string[] _ReadFile(string filename) {
            if (!File.Exists(filename)) {
                Console.WriteLine("Could not open: " + filename);
            }
            string[] lines = File.ReadAllLines(filename);
            return lines;
        }

        public static void CreateSeedData(this NetworthDbContext context){

            // ADD ROLE TABLE
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

            // ADD BANK TYPE TABLE
            if(!context.BankTypes.Any()){
                var bt = new List<Networth.Entities.BankType.BankType>(){
                        new BankType(){
                            BankTypeId = (int)BankEnum.Checking,
                            BankTypeName = BankEnum.Checking.ToString(),
                        },
                        new BankType(){
                            BankTypeId = (int)BankEnum.Savings,
                            BankTypeName = BankEnum.Savings.ToString(),
                        },
                };
                context.AddRange(bt);
            }
            context.SaveChanges();

            // ADD LOAN TYPE TABLE
            if(!context.LoanTypes.Any()){
                var lt = new List<Networth.Entities.LoanType.LoanType>(){
                        new LoanType(){
                            LoanTypeId = (int)LoanEnum.Subsidized,
                            LoanTypeName = LoanEnum.Subsidized.ToString(),
                        },
                        new LoanType(){
                            LoanTypeId = (int)LoanEnum.Unsubsidized,
                            LoanTypeName = LoanEnum.Unsubsidized.ToString(),
                        },
                };
                context.AddRange(lt);
            }
            context.SaveChanges();

            // ADD POSITION TYPE TABLE
            if(!context.PositionTypes.Any()){
                var pt = new List<Networth.Entities.PositionType.PositionType>(){
                        new PositionType(){
                            PositionTypeId = (int)PositionEnum.HSA,
                            PositionTypeName = PositionEnum.HSA.ToString(),
                        },
                        new PositionType(){
                            PositionTypeId = (int)PositionEnum.Roth,
                            PositionTypeName = PositionEnum.Roth.ToString(),
                        },
                        new PositionType(){
                            PositionTypeId = (int)PositionEnum.Company401k,
                            PositionTypeName = PositionEnum.Company401k.ToString(),
                        },
                        new PositionType(){
                            PositionTypeId = (int)PositionEnum.Brokerage,
                            PositionTypeName = PositionEnum.Brokerage.ToString(),
                        },
                };
                context.AddRange(pt);
            }
            context.SaveChanges();

            // ADD USER TABLE
            if(!context.Users.Any()){
                var u = new List<Networth.Entities.User.User>(){
                        new User(){
                            Username = "mdng223",
                            Password = "stuff",
                            Email = "as;dfljkasdf@gmail.com",
                            RoleId = context.Roles.FirstOrDefault(a => a.Id == (int)RoleEnum.Administrator).RoleId,
                            Hidden = false,
                            Positions = new List<Networth.Entities.Position.Position>(){
                                new Position(){
                                    PositionName = "Unfunded Core Position",
                                    Symbol = "CORE",
                                    DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                                    Hidden = false,
                                    PositionTypeId = context.PositionTypes.FirstOrDefault(a => a.PositionTypeId == 
                                            (int)PositionEnum.Roth).PositionTypeId,
                                },
                                new Position(){
                                    PositionName = "Fidelity Contrafund",
                                    Symbol = "FCNTX",
                                    DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                                    Hidden = false,
                                    PositionTypeId = context.PositionTypes.FirstOrDefault(a => a.PositionTypeId == 
                                            (int)PositionEnum.Roth).PositionTypeId,
                                },
                                new Position(){
                                    PositionName = "Fidelity ZERO Total Market Index Fund",
                                    Symbol = "FZROX",
                                    DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                                    Hidden = false,
                                    PositionTypeId = context.PositionTypes.FirstOrDefault(a => a.PositionTypeId == 
                                            (int)PositionEnum.Roth).PositionTypeId,
                                },
                                new Position(){
                                    PositionName = "Canopy Growth Company",
                                    Symbol = "CGC",
                                    DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                                    Hidden = false,
                                    PositionTypeId = context.PositionTypes.FirstOrDefault(a => a.PositionTypeId == 
                                            (int)PositionEnum.Roth).PositionTypeId,
                                },
                                new Position(){
                                    PositionName = "Equity Index Trust Class C",
                                    Symbol = "XCT",
                                    DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                                    Hidden = false,
                                    PositionTypeId = context.PositionTypes.FirstOrDefault(a => a.PositionTypeId == 
                                            (int)PositionEnum.Company401k).PositionTypeId,
                                },
                                new Position(){
                                    PositionName = "Vanguard Small Cap Index, Admiral Shares",
                                    Symbol = "VSMAX",
                                    DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                                    Hidden = false,
                                    PositionTypeId = context.PositionTypes.FirstOrDefault(a => a.PositionTypeId == 
                                            (int)PositionEnum.Company401k).PositionTypeId,
                                },
                                new Position(){
                                    PositionName = "Vanguard 500 Index Fund Admiral Shares",
                                    Symbol = "VFIAX",
                                    DateAdded = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd")),
                                    Hidden = false,
                                    PositionTypeId = context.PositionTypes.FirstOrDefault(a => a.PositionTypeId == 
                                            (int)PositionEnum.HSA).PositionTypeId,
                                },
                            },
                            Banks = new List<Networth.Entities.Bank.Bank>(){
                                new Bank(){
                                    BankName = "Chase Bank",
                                    BankTypeId = context.BankTypes.FirstOrDefault(a => a.BankTypeId == 
                                            (int)BankEnum.Checking).BankTypeId,
                                    Balance = 1.00m,
                                },
                                new Bank(){
                                    BankName = "Ally Bank",
                                    BankTypeId = context.BankTypes.FirstOrDefault(a => a.BankTypeId == 
                                            (int)BankEnum.Savings).BankTypeId,
                                    Balance = 2000.12m,
                                    InterestRate = 0.022m,
                                },
                            },
                            Loans = new List<Networth.Entities.Loan.Loan>(){
                                new Loan(){
                                    LoanName = "Direct Subsidized Stafford 1",
                                    LoanTypeId = context.LoanTypes.FirstOrDefault(a => a.LoanTypeId == 
                                            (int)LoanEnum.Subsidized).LoanTypeId,
                                    LoanDate =  DateTime.Parse("November 14, 2014"),
                                    Hidden = false,
                                    Debt = 0.0m,
                                    InterestRate = 0.0441,
                                    Symbol = "SS1",
                                },
                                new Loan(){
                                    LoanName = "Direct Subsidized Stafford 2",
                                    LoanTypeId = context.LoanTypes.FirstOrDefault(a => a.LoanTypeId == 
                                            (int)LoanEnum.Subsidized).LoanTypeId,
                                    LoanDate = DateTime.Parse("October 27, 2015"),
                                    Hidden = false,
                                    Debt = 1653.04m,
                                    InterestRate = 0.0404,
                                    Symbol = "SS2",
                                },
                                new Loan(){
                                    LoanName = "Direct Subsidized Stafford 3",
                                    LoanTypeId = context.LoanTypes.FirstOrDefault(a => a.LoanTypeId == 
                                            (int)LoanEnum.Subsidized).LoanTypeId,
                                    LoanDate = DateTime.Parse("September 7, 2016"),
                                    Hidden = false,
                                    Debt = 4899.84m,
                                    InterestRate = 0.0351,
                                    Symbol = "SS3",
                                },
                                new Loan(){
                                    LoanName = "Direct Unsubsidized Stafford 3",
                                    LoanTypeId = context.LoanTypes.FirstOrDefault(a => a.LoanTypeId == 
                                            (int)LoanEnum.Unsubsidized).LoanTypeId,
                                    LoanDate = DateTime.Parse("September 7, 2016"),
                                    Hidden = false,
                                    Debt = 1848.79m,
                                    InterestRate = 0.0351,
                                    Symbol = "US1",
                                },
                            },
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
                context.AddRange(u);
            }
            context.SaveChanges();

            /*  
                ADD Position and loan table
                Header
                XCT|VOO|VGSH|VMFXX|HSA|VB|SS1|SS2|SS3|US1|date|time|VWO|FZROX|VFIAX|FCNTX|VSMAX|SPAXX
            */
            if(!context.PositionEntries.Any() && !context.LoanEntries.Any()){
                var pe = new List<Networth.Entities.PositionEntry.PositionEntry>();
                var be = new List<Networth.Entities.LoanEntry.LoanEntry>();
                string[] lines = File.ReadAllLines("services/finance.csv");
                int row = 0;
                
                var header = new List<string>();
                foreach(string line in lines){
                        int column = 0;
                        string[] split = line.Split("|");
                        foreach(String i in split){
                            if(row == 0) {
                                /* if we are the first row then store the header into an array */
                                header.Add(i);
                            }
                            else if(column > 0 && row > 0) {
                                if(context.Positions.Any(a => a.Symbol == 
                                            header[column])) {
                                    pe.Add(new PositionEntry() {
                                            PositionId = context.Positions.FirstOrDefault(a => a.Symbol == 
                                                header[column]).PositionId,
                                            Price = decimal.Parse(i),
                                            Hidden = false,
                                            DateAdded = DateTime.Parse(split[10] + " " + split[11]),
                                    });
                                } else if (context.Loans.Any(b => b.Symbol == 
                                            header[column])) {
                                    be.Add(new Entities.LoanEntry.LoanEntry() {
                                            LoanId = context.Loans.FirstOrDefault(b => b.Symbol ==
                                                header[column]).LoanId,
                                            Debt = decimal.Parse(i),
                                            Hidden = false,
                                            DateAdded = DateTime.Parse(split[10] + " " + split[11]),
                                    });
                                }
                            } else {
                                Console.WriteLine("unexpected outcome.");
                            }
                            column += 1;
                        }
                        Console.WriteLine("-------row {0}-------", row);
                        row += 1;
                }
                context.AddRange(pe);
                context.AddRange(be);
            }
            context.SaveChanges();

            // ADD Gender TABLE
            if(!context.Gender.Any()) {
                List<Gender> genders = new List<Gender>(){
                    new Gender() {
                        Type = "Male"
                    },
                    new Gender() {
                        Type = "Female"
                    },
                    new Gender() {
                        Type = "Other"
                    }
                };
                context.AddRange(genders);
            }
            context.SaveChanges();

            // ADD Mbti TABLE
            if(!context.Mbti.Any()) {                
                List<Mbti> mbtis = new List<Mbti>() {
                    new Mbti() {
                        Name = "Commander",
                        Symbol = "ENTJ",
                        TemperamentName = "Analyst",
                        TemperamentSymbol = "NT"
                    },
                    new Mbti() {
                        Name = "Architect",
                        Symbol = "INTJ",
                        TemperamentName = "Analyst",
                        TemperamentSymbol = "NT"
                    },
                    new Mbti() {
                        Name = "Debater",
                        Symbol = "ENTP",
                        TemperamentName = "Analyst",
                        TemperamentSymbol = "NT"
                    },
                    new Mbti() {
                        Name = "Analyst",
                        Symbol = "INTP",
                        TemperamentName = "Analyst",
                        TemperamentSymbol = "NT"
                    },
                    new Mbti() {
                        Name = "Advocate",
                        Symbol = "INFJ",
                        TemperamentName = "Diplomat",
                        TemperamentSymbol = "NF"
                    },
                    new Mbti() {
                        Name = "Protagonist",
                        Symbol = "ENFJ",
                        TemperamentName = "Diplomat",
                        TemperamentSymbol = "NF"
                    },
                    new Mbti() {
                        Name = "Mediator",
                        Symbol = "INFP",
                        TemperamentName = "Diplomat",
                        TemperamentSymbol = "NF"
                    },
                    new Mbti() {
                        Name = "Campaigner",
                        Symbol = "ENFP",
                        TemperamentName = "Diplomat",
                        TemperamentSymbol = "NF"
                    },
                    new Mbti() {
                        Name = "Logistician",
                        Symbol = "ISTJ",
                        TemperamentName = "Sentinel",
                        TemperamentSymbol = "SJ"
                    },
                    new Mbti() {
                        Name = "Defender",
                        Symbol = "ISFJ",
                        TemperamentName = "Sentinel",
                        TemperamentSymbol = "SJ"
                    },
                    new Mbti() {
                        Name = "Executive",
                        Symbol = "ESTJ",
                        TemperamentName = "Sentinel",
                        TemperamentSymbol = "SJ"
                    },
                    new Mbti() {
                        Name = "Consul",
                        Symbol = "ESFJ",
                        TemperamentName = "Sentinel",
                        TemperamentSymbol = "SJ"
                    },
                    new Mbti() {
                        Name = "Virtuoso",
                        Symbol = "ISTP",
                        TemperamentName = "Explorer",
                        TemperamentSymbol = "SP"
                    },
                    new Mbti() {
                        Name = "Adventurer",
                        Symbol = "ISFP",
                        TemperamentName = "Explorer",
                        TemperamentSymbol = "SP"
                    },
                    new Mbti() {
                        Name = "Entrepreneur",
                        Symbol = "ESTP",
                        TemperamentName = "Explorer",
                        TemperamentSymbol = "SP"
                    },
                    new Mbti() {
                        Name = "Entertainer",
                        Symbol = "ESFP",
                        TemperamentName = "Explorer",
                        TemperamentSymbol = "SP"
                    },
                };
                context.AddRange(mbtis);
            }
            context.SaveChanges();

            // ADD MbtiUser TABLE
            if(!context.MbtiUser.Any()){
                List<MbtiUser> mbtiUsers = new List<MbtiUser>();
                string[] lines = File.ReadAllLines("services/mbti.csv");
                foreach(string line in lines){
                        string[] split = line.Split(",");
                        Console.WriteLine("first name =\t{0}", split[0]);
                        Console.WriteLine("last name =\t{0}", split[1]);
                        Console.WriteLine("last name =\t{0} {1}", split[2], split[2].GetType());

                        try {
                            mbtiUsers.Add(new MbtiUser() {
                                FirstName = split[0],
                                LastName = split[1],
                                GenderId = context.Gender.FirstOrDefault(g => g.Type[0] == split[2][0]).Id,
                                MbtiId = context.Mbti.FirstOrDefault(mbti => mbti.Symbol == split[3]).Id,
                                Hidden = false,
                            });
                        } catch (Exception e) {
                            Console.WriteLine(e);
                        }
                        
                }
                context.AddRange(mbtiUsers);
            }
            context.SaveChanges();
        }
    }
}
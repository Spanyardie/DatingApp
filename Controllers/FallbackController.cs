﻿using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace DatingApp.Controllers
{
    public class FallbackController : Controller
    {
        public ActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/html");
        }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Helpers
{
    public class MessageParams : PaginationParams
    {
        public string userName { get; set; }
        public string Container { get; set; }
    }
}

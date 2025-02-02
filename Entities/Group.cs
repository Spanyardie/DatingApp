﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Entities
{
    public class Group
    {
        public Group()
        {
        }

        public Group(string name)
        {
            Name = name;
            Connections = new Collection<Connection>();
        }

        [Key]
        public string Name { get; set; }
        public ICollection<Connection> Connections { get; set; }
    }
}

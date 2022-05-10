using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class PagingParameterModel
    {
        const int maxPageSize = 10;

        public int pageNumber { get; set; } = 1;

        public int _pageSize { get; set; } = 5;

        public int pageSize
        {
            get { return _pageSize; }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
    }
}
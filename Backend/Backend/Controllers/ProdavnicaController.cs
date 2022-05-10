using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using Backend.Models;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    public class ProdavnicaController : ApiController
    {
        private DBModel db = new DBModel();

        [HttpGet]
        [Route("api/GetProdavnica")]
        public IEnumerable<Prodavnica> GetProdavnicaPagination([FromUri] PagingParameterModel pagingParameterModel)
        {
            try
            {
                var source = db.Prodavnicas.OrderBy(p => p.ProdavnicaID).AsQueryable();
                int count = source.Count();
                int CurrentPage = pagingParameterModel.pageNumber;
                int PageSize = pagingParameterModel.pageSize;
                int TotalCount = count;
                int TotalPages = (int)Math.Ceiling(count / (double)PageSize);
                var items = source.Skip((CurrentPage - 1) * PageSize).Take(PageSize).ToList();
                var previousPage = CurrentPage > 1 ? "Yes" : "No";
                var nextPage = CurrentPage < TotalPages ? "Yes" : "No";

                var paginationMetadata = new
                {
                    totalCount = TotalCount,
                    pageSize = PageSize,
                    currentPage = CurrentPage,
                    totalPages = TotalPages,
                    previousPage,
                    nextPage
                };

                HttpContext.Current.Response.Headers.Add("Paging-Headers", JsonConvert.SerializeObject(paginationMetadata));
                return items;
            }
            catch (Exception ex)
            {
                return null;
            }
           
        }

        // GET: api/Prodavnica
        public IQueryable<Prodavnica> GetProdavnicas()
        {
            return db.Prodavnicas;
        }

        // GET: api/Prodavnica/5
        [ResponseType(typeof(Prodavnica))]
        public IHttpActionResult GetProdavnica(int id)
        {
            Prodavnica prodavnica = db.Prodavnicas.Find(id);
            if (prodavnica == null)
            {
                return NotFound();
            }

            return Ok(prodavnica);
        }

        [HttpGet]
        [Route("api/Prodavnica/grad/{GradID}")]
        public IHttpActionResult GetProdavnicaGrad(int GradID)
        {
            List<Prodavnica> prodavnica = new List<Prodavnica>();
            foreach (var r in db.Prodavnicas)
            {
                if (r.GradID == GradID)
                {
                    prodavnica.Add(r);
                }
            }
            if (prodavnica == null)
            {
                return BadRequest();
            }
            return Ok(prodavnica);
        }

        [Authorize(Roles = "Administrator")]
        // PUT: api/Prodavnica/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProdavnica(int id, Prodavnica prodavnica)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != prodavnica.ProdavnicaID)
            {
                return BadRequest();
            }

            db.Entry(prodavnica).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }

            return Ok(prodavnica);
        }

        [Authorize(Roles = "Administrator")]
        // POST: api/Prodavnica
        [ResponseType(typeof(Prodavnica))]
        public IHttpActionResult PostProdavnica(Prodavnica prodavnica)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Prodavnicas.Add(prodavnica);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = prodavnica.ProdavnicaID }, prodavnica);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }
            
        }

        [Authorize(Roles = "Administrator")]
        // DELETE: api/Prodavnica/5
        [ResponseType(typeof(Prodavnica))]
        public IHttpActionResult DeleteProdavnica(int id)
        {
            try
            {
                Prodavnica prodavnica = db.Prodavnicas.Find(id);
                if (prodavnica == null)
                {
                    return NotFound();
                }

                db.Prodavnicas.Remove(prodavnica);
                db.SaveChanges();

                return Ok(prodavnica);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError,
                    new { message = "Nije moguce obrisati prodavnicu, potrebno je obrisati sve slike i proizvode u kojima se nalazi" });
            }
            
        }

        [HttpDelete]
        [Route("api/Prodavnica/deleteByGrad/{id}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult DeleteByGrad(int id)
        {
            try
            {
                foreach (var pr in db.Prodavnicas)
                {
                    if (pr.GradID == id)
                    {
                        db.Prodavnicas.Remove(pr);
                    }
                }
                db.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProdavnicaExists(int id)
        {
            return db.Prodavnicas.Count(e => e.ProdavnicaID == id) > 0;
        }
    }
}
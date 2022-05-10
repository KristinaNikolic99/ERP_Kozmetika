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
    public class ProizvodController : ApiController
    {
        private DBModel db = new DBModel();

        [HttpGet]
        [Route("api/GetProizvod/{ProdavnicaID}")]
        public IEnumerable<Proizvod> GetProizvodPagination([FromUri] PagingParameterModel pagingParameterModel, int ProdavnicaID)
        {
            try
            {
                var source = this.GetProizvodProdavnica(ProdavnicaID).OrderBy(p => p.ProizvodID).AsQueryable();
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

        // GET: api/Proizvod
        public IQueryable<Proizvod> GetProizvods()
        {
            return db.Proizvods;
        }

        // GET: api/Proizvod/5
        [ResponseType(typeof(Proizvod))]
        public IHttpActionResult GetProizvod(int id)
        {
            Proizvod proizvod = db.Proizvods.Find(id);
            if (proizvod == null)
            {
                return NotFound();
            }

            return Ok(proizvod);
        }

        [HttpGet]
        [Route("api/Proizvod/prodavnica/{ProdavnicaID}")]
        public IEnumerable<Proizvod> GetProizvodProdavnica(int ProdavnicaID)
        {
            List<Proizvod> proizvod = new List<Proizvod>();
            foreach (var r in db.Proizvods)
            {
                if (r.ProdavnicaID == ProdavnicaID)
                {
                    proizvod.Add(r);
                }
            }
            if (proizvod == null)
            {
                //return BadRequest();
            }
            return proizvod;
        }

        [Authorize(Roles = "Administrator")]
        // PUT: api/Proizvod/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProizvod(int id, Proizvod proizvod)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != proizvod.ProizvodID)
            {
                return BadRequest();
            }

            db.Entry(proizvod).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }

            return Ok(proizvod);
        }

        [Authorize(Roles = "Administrator")]
        // POST: api/Proizvod
        [ResponseType(typeof(Proizvod))]
        public IHttpActionResult PostProizvod(Proizvod proizvod)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Proizvods.Add(proizvod);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = proizvod.ProizvodID }, proizvod);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }
            
        }

        [Authorize(Roles = "Administrator")]
        // DELETE: api/Proizvod/5
        [ResponseType(typeof(Proizvod))]
        public IHttpActionResult DeleteProizvod(int id)
        {
            try
            {
                Proizvod proizvod = db.Proizvods.Find(id);
                if (proizvod == null)
                {
                    return NotFound();
                }

                db.Proizvods.Remove(proizvod);
                db.SaveChanges();

                return Ok(proizvod);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError,
                    new { message = "Nije moguce obrisati proizvod, potrebno je obrisati sve slike, stavke porudzbine i recenzije u kojima se nalazi" });
            }
            
        }

        [HttpDelete]
        [Route("api/Proizvod/deleteByBrend/{id}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult DeleteByBrend(int id)
        {
            try
            {
                foreach (var p in db.Proizvods)
                {
                    if (p.BrendID == id)
                    {
                        db.Proizvods.Remove(p);
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

        [HttpDelete]
        [Route("api/Proizvod/deleteByVrstaProizvoda/{id}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult DeleteByVrstaProizvoda(int id)
        {
            try
            {
                foreach (var p in db.Proizvods)
                {
                    if (p.VrstaProidvodaID == id)
                    {
                        db.Proizvods.Remove(p);
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

        [HttpDelete]
        [Route("api/Proizvod/deleteByProdavnica/{id}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult DeleteByProdavnica(int id)
        {
            try
            {
                foreach (var p in db.Proizvods)
                {
                    if (p.ProdavnicaID == id)
                    {
                        db.Proizvods.Remove(p);
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

        private bool ProizvodExists(int id)
        {
            return db.Proizvods.Count(e => e.ProizvodID == id) > 0;
        }
    }
}
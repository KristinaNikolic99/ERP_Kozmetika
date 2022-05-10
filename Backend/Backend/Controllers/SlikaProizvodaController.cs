using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Backend.Models;

namespace Backend.Controllers
{
    public class SlikaProizvodaController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/SlikaProizvoda
        public IQueryable<SlikaProizvoda> GetSlikaProizvodas()
        {
            return db.SlikaProizvodas;
        }

        // GET: api/SlikaProizvoda/5
        [ResponseType(typeof(SlikaProizvoda))]
        public IHttpActionResult GetSlikaProizvoda(int id)
        {
            SlikaProizvoda slikaProizvoda = db.SlikaProizvodas.Find(id);
            if (slikaProizvoda == null)
            {
                return NotFound();
            }

            return Ok(slikaProizvoda);
        }

        [Authorize(Roles = "Administrator")]
        // PUT: api/SlikaProizvoda/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSlikaProizvoda(int id, SlikaProizvoda slikaProizvoda)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != slikaProizvoda.SlikaID)
            {
                return BadRequest();
            }

            db.Entry(slikaProizvoda).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }

            return Ok(slikaProizvoda);
        }

        [Authorize(Roles = "Administrator")]
        // POST: api/SlikaProizvoda
        [ResponseType(typeof(SlikaProizvoda))]
        public IHttpActionResult PostSlikaProizvoda(SlikaProizvoda slikaProizvoda)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.SlikaProizvodas.Add(slikaProizvoda);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = slikaProizvoda.SlikaID }, slikaProizvoda);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }
            
        }

        [Authorize(Roles = "Administrator")]
        // DELETE: api/SlikaProizvoda/5
        [ResponseType(typeof(SlikaProizvoda))]
        public IHttpActionResult DeleteSlikaProizvoda(int id)
        {
            SlikaProizvoda slikaProizvoda = db.SlikaProizvodas.Find(id);
            if (slikaProizvoda == null)
            {
                return NotFound();
            }

            db.SlikaProizvodas.Remove(slikaProizvoda);
            db.SaveChanges();

            return Ok(slikaProizvoda);
        }

        [HttpDelete]
        [Route("api/SlikaProizvoda/deleteByProizvod/{id}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult DeleteByProizvod(int id)
        {
            try
            {
                foreach (var sp in db.SlikaProizvodas)
                {
                    if (sp.ProizvodID == id)
                    {
                        db.SlikaProizvodas.Remove(sp);
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

        private bool SlikaProizvodaExists(int id)
        {
            return db.SlikaProizvodas.Count(e => e.SlikaID == id) > 0;
        }
    }
}
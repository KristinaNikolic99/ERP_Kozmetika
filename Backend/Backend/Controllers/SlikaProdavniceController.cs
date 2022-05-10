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
    public class SlikaProdavniceController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/SlikaProdavnice
        public IQueryable<SlikaProdavnice> GetSlikaProdavnices()
        {
            return db.SlikaProdavnices;
        }

        // GET: api/SlikaProdavnice/5
        [ResponseType(typeof(SlikaProdavnice))]
        public IHttpActionResult GetSlikaProdavnice(int id)
        {
            SlikaProdavnice slikaProdavnice = db.SlikaProdavnices.Find(id);
            if (slikaProdavnice == null)
            {
                return NotFound();
            }

            return Ok(slikaProdavnice);
        }

        [Authorize(Roles = "Administrator")]
        // PUT: api/SlikaProdavnice/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSlikaProdavnice(int id, SlikaProdavnice slikaProdavnice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != slikaProdavnice.SlikaProdavniceID)
            {
                return BadRequest();
            }

            db.Entry(slikaProdavnice).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }

            return Ok(slikaProdavnice);
        }

        [Authorize(Roles = "Administrator")]
        // POST: api/SlikaProdavnice
        [ResponseType(typeof(SlikaProdavnice))]
        public IHttpActionResult PostSlikaProdavnice(SlikaProdavnice slikaProdavnice)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.SlikaProdavnices.Add(slikaProdavnice);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = slikaProdavnice.SlikaProdavniceID }, slikaProdavnice);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }
            
        }

        [Authorize(Roles = "Administrator")]
        // DELETE: api/SlikaProdavnice/5
        [ResponseType(typeof(SlikaProdavnice))]
        public IHttpActionResult DeleteSlikaProdavnice(int id)
        {
            SlikaProdavnice slikaProdavnice = db.SlikaProdavnices.Find(id);
            if (slikaProdavnice == null)
            {
                return NotFound();
            }

            db.SlikaProdavnices.Remove(slikaProdavnice);
            db.SaveChanges();

            return Ok(slikaProdavnice);
        }

        [HttpDelete]
        [Route("api/SlikaProdavnice/deleteByProdavnica/{id}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult DeleteByProdavnica(int id)
        {
            try
            {
                foreach (var pr in db.SlikaProdavnices)
                {
                    if (pr.ProdavnicaID == id)
                    {
                        db.SlikaProdavnices.Remove(pr);
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

        private bool SlikaProdavniceExists(int id)
        {
            return db.SlikaProdavnices.Count(e => e.SlikaProdavniceID == id) > 0;
        }
    }
}
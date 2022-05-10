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
    public class BrendController : ApiController
    {
        private DBModel db = new DBModel();

        [Authorize]
        // GET: api/Brend
        public IQueryable<Brend> GetBrends()
        {
            return db.Brends;
        }

        [Authorize]
        // GET: api/Brend/5
        [ResponseType(typeof(Brend))]
        public IHttpActionResult GetBrend(int id)
        {
            Brend brend = db.Brends.Find(id);
            if (brend == null)
            {
                return NotFound();
            }

            return Ok(brend);
        }

        [Authorize(Roles = "Administrator")]
        // PUT: api/Brend/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBrend(int id, Brend brend)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != brend.BrendID)
            {
                return BadRequest();
            }

            db.Entry(brend).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }

            return Ok(brend);
        }

        [Authorize(Roles = "Administrator")]
        // POST: api/Brend
        [ResponseType(typeof(Brend))]
        public IHttpActionResult PostBrend(Brend brend)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Brends.Add(brend);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = brend.BrendID }, brend);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }
            
        }

        [Authorize(Roles = "Administrator")]
        // DELETE: api/Brend/5
        [ResponseType(typeof(Brend))]
        public IHttpActionResult DeleteBrend(int id)
        {
            try
            {
                Brend brend = db.Brends.Find(id);
                if (brend == null)
                {
                    return NotFound();
                }

                db.Brends.Remove(brend);
                db.SaveChanges();

                return Ok(brend);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, 
                    new { message = "Nije moguce obrisati brend, potrebno je obrisati sve slike i proizvode u kojima se nalazi" });
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

        private bool BrendExists(int id)
        {
            return db.Brends.Count(e => e.BrendID == id) > 0;
        }
    }
}
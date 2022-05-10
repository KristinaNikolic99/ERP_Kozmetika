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
    public class VrstaProizvodaController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/VrstaProizvoda
        public IQueryable<VrstaProizvoda> GetVrstaProizvodas()
        {
            return db.VrstaProizvodas;
        }

        // GET: api/VrstaProizvoda/5
        [ResponseType(typeof(VrstaProizvoda))]
        public IHttpActionResult GetVrstaProizvoda(int id)
        {
            VrstaProizvoda vrstaProizvoda = db.VrstaProizvodas.Find(id);
            if (vrstaProizvoda == null)
            {
                return NotFound();
            }

            return Ok(vrstaProizvoda);
        }

        [Authorize(Roles = "Administrator")]
        // PUT: api/VrstaProizvoda/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVrstaProizvoda(int id, VrstaProizvoda vrstaProizvoda)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vrstaProizvoda.VrstaProizvodaID)
            {
                return BadRequest();
            }

            db.Entry(vrstaProizvoda).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }

            return Ok(vrstaProizvoda);
        }

        [Authorize(Roles = "Administrator")]
        // POST: api/VrstaProizvoda
        [ResponseType(typeof(VrstaProizvoda))]
        public IHttpActionResult PostVrstaProizvoda(VrstaProizvoda vrstaProizvoda)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.VrstaProizvodas.Add(vrstaProizvoda);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = vrstaProizvoda.VrstaProizvodaID }, vrstaProizvoda);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }
            
        }

        [Authorize(Roles = "Administrator")]
        // DELETE: api/VrstaProizvoda/5
        [ResponseType(typeof(VrstaProizvoda))]
        public IHttpActionResult DeleteVrstaProizvoda(int id)
        {
            try
            {
                VrstaProizvoda vrstaProizvoda = db.VrstaProizvodas.Find(id);
                if (vrstaProizvoda == null)
                {
                    return NotFound();
                }

                db.VrstaProizvodas.Remove(vrstaProizvoda);
                db.SaveChanges();

                return Ok(vrstaProizvoda);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError,
                    new { message = "Nije moguce obrisati vrstu proizvoda, potrebno je obrisati sve proizvode u kojima se nalazi" });
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

        private bool VrstaProizvodaExists(int id)
        {
            return db.VrstaProizvodas.Count(e => e.VrstaProizvodaID == id) > 0;
        }
    }
}
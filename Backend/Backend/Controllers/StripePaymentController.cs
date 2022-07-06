using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Kozmetika.Controllers
{
    public class StripePaymentController : ApiController
    {
        [HttpPost]
        [Route("api/stripepayment")]
        public IHttpActionResult Post([FromBody] StripePaymentRequest paymentRequest) {
            StripeConfiguration.SetApiKey("sk_test_51L8LnFCNYvKNBZ1TbqciawIfuNk5JKEMK5TF4dvkriUBy3qBiFAvUvXDcWPiBCroJjCYOCiAkZi8POsyJYMt1tlR00TOykRApq");

            var myCharge = new ChargeCreateOptions();
            myCharge.Source = paymentRequest.tokenId;
            myCharge.Amount = paymentRequest.amount;
            myCharge.Currency = "rsd";
            myCharge.Description = paymentRequest.order;
            myCharge.Metadata = new Dictionary<string, string>();
            myCharge.Metadata["OurRef"] = "OurRef-" + Guid.NewGuid().ToString();

            var chargeService = new ChargeService();
            Charge stripeCharge = chargeService.Create(myCharge);

            return Json(stripeCharge);
        }

        public class StripePaymentRequest
        {
            public string tokenId { get; set; }
            public string order { get; set; }
            public int amount { get; set; }
        }

    }
}

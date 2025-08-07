const express = require("express");
const axios = require("axios");
const { default: OpenAI } = require("openai");
const router = express.Router();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

router.post("/", async (req, res) => {
  const client = new OpenAI();
  try {
    const body = await req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-nano",
      input: `You are a online marketing specialist for a florist. They need to create a city page that will market their services in a new city. The shop is called ${body["shop-name"]} and they are marketing their services in ${body["city-state"]}. They offer these delivery services in the city: ${body["delivery-options"]}. They want to give this delivery information: ${body["delivery-information"]}. These are the special services they offer the city: ${body["city-services"]}, ${body["other-city-services"]}. They've been serving the city for ${body["service-duration"]}. The city has the following attractions: ${body["city-attractions"]}. The city encompasses the following zip codes or neighborhoods: ${body["city-zips-and-neighborhoods"]}. The city has these holidays or events that might involve flowers: ${body["special-holidays"]}. They want citizens of this city to know that ${body["unique"]}. They describe their floral style as ${body["floral-style"]}. They want to mention this additional information: ${body["additional-info"]}. They delivery to these funeral homes: ${body["funeral-homes"]}, these hospitals ${body["hospitals"]}, these schools ${body["schools"]}, these wedding venues:${body["wedding-venues"]}, and these other locations: ${body["other-locations"]}. Please respond only with raw HTML for the page, no other markup. If anything is undefined or empty text, please don't include it because the florist didn't fill that information out. Please use this HTML Template:
      <div class="city-page-container">
    <div class="city-page-wrapper l-wrapper">
        <!-- CITY PAGE TITLE -->
        <section class="city-page-header-container">
            <div class="city-page-header-wrapper">
                <h1 class="city-page-header">/* NAME OF FLORIST */</h1>
                <h2 class="city-page-subheader">Top Rated Florist in /* CITY */</h2>
            </div>
        </section>

        <!-- CITY PAGE SEO/IMAGE -->
        <section class="city-page-seo-img-container">
            <div class="city-page-seo-img-wrapper">
                <div class="city-page-seo-img-left">
                    <p class="city-page-seo-text">
                        /* Give some information about the city. */
                    </p>
                    <p class="city-page-seo-text">
                        /* Give even more information about the city */
                </div>
                <div class="city-page-seo-img-right">
                    <img src="https://assets.eflorist.com//site/00000001/Custom HTML/Frame 4.jpg" alt=""
                        class="city-page-seo-img">
                </div>
            </div>
        </section>

        <!-- CITY PAGE MAP -->
        <section class="city-page-google-map-container">
            <div class="city-page-google-map-wrapper">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3247.90319289516!2d-97.5851058!3d35.50667189999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b21a9eafa617af%3A0xfea624ecf83116c1!2sTeleflora!5e0!3m2!1sen!2sus!4v1754056223016!5m2!1sen!2sus"
                    width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>

        <!-- CITY PAGE FLOWER DELIVERY -->
        <section class="city-page-flower-delivery-container">
            <div class="city-page-flower-delivery-wrapper">
                <h2 class="city-page-flower-delivery-header">Flower Delivery in /* CITY */</h2>
                <p class="city-page-flower-delivery-text">
                    /* GIVE DELIVERY INFORMATION HERE */
                </p>
            </div>
        </section>

        <!-- CITY PAGE POPULAR PRODUCTS -->
        <section class="city-page-popular-flowers-container">
            <div class="city-page-popular-flowers-wrapper">
                <h2 class="city-page-popular-flowers-header">Popular Flowers in /* CITY */</h2>
                <div class="city-page-popular-flowers-product-container"></div>
            </div>
        </section>

        <!-- CITY PAGE FREQUENTLY ASKED QUESTIONS -->
        <section class="city-page-faq-container">
            <div class="city-page-faq-wrapper">
                <h2 class="city-page-faq-header">Frequently Asked Questions</h2>
                <button class="city-page-faq-question">What funeral homes do you deliver to?</button>
                <div class="city-page-faq-answer-container">
                    <p class="city-page-answer">
                        /* PARAGRAPH ABOUT FUNERAL HOMES */
                    </p>
                    
                </div>

                <button class="city-page-faq-question">What hospitals do you deliver to?</button>
                <div class="city-page-faq-answer-container">
                    <p class="city-page-answer">
                       /* PARAGRAPH ABOUT HOSPITALS */ 
                    </p>
                </div>

                <button class="city-page-faq-question">Which schools and clubs do you deliver to?</button>
                <div class="city-page-faq-answer-container">
                    <p class="city-page-answer">
                        /* PARAGRAPH ABOUT SCHOOLS */
                    </p>
                </div>

                <button class="city-page-faq-question">What additional venues do you deliver to?</button>
                <div class="city-page-faq-answer-container">
                    <p class="city-page-answer">
                        /* PARAGRAPH ABOUT ADDITIONAL VENUES */
                    </p>
                </div>
            </div>
        </section>

        <!-- CITY PAGE SEO 2  -->
        <section class="city-page-bottom-seo-container">
            <div class="city-page-bottom-seo-wrapper">
                <p class="city-page-bottom-seo-text">
                    /* MORE INFORMATION ABOUT THE CITY */
                </p>
            </div>
        </section>
    </div>
</div>

<!-- PRODUCTS CATEGORY JS -->
<script>
    /* FUNCTION TO PULL PRODUCTS FROM CATEGORY */
    async function getProductsFromCategoryPage(url) {
        try {
            // Get HTML response from category page
            const response = await fetch(url);
            const htmlText = await response.text();

            // Get productContainer element from HTML text
            const html = document.createElement('html');
            html.innerHTML = htmlText;
            const productContainer = html.querySelector('#productContainer');

            // Return productContainer node
            return productContainer;
        } catch (error) {
            throw new Error(\`Error fetching products from category page at \${url}: \`, error);
        }
    }

    $(document).ready(async () => {
        /* BEST SELLER BOUQUETS */
        /* SELECTS CLASS TO SELECT WHICH ELEMENT TO ADD PRODUCTS TO */
        const elementToAddProductsTo = document.querySelector('body .city-page-popular-flowers-container .city-page-popular-flowers-product-container');
        /* TO CHANGE CATEGORY THAT'S BEING PULLED FROM REPLACE THE URL INSIDE getProductsFromCategoryPage(''); */
        const productContainer = await getProductsFromCategoryPage('/best-sellers/cat1070001');
        /* ADDS PRODUCTS TO SELECTED ELEMENT */
        elementToAddProductsTo.append(productContainer);
    });
</script>
<!-- END PRODUCTS CATEGORY JS -->

<!-- ACCORDION JS -->
<script>
    var faqQuestion = document.getElementsByClassName('city-page-faq-question');
    var i;

    for (i = 0; i < faqQuestion.length; i++) {
        faqQuestion[i].addEventListener('click', function () {
            this.classList.toggle('active');
            var faqAnswer = this.nextElementSibling;
            if (faqAnswer.style.maxHeight) {
                faqAnswer.style.maxHeight = null;
            } else {
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
            }
        });
    }
</script>
<!-- END ACCORDION JS -->
    `,
    });

    console.log("Response from OpenAI: ", response.output_text);
    res.status(200).json(response.output_text);
  } catch (error) {
    console.error(
      "OpenAI proxy error:",
      error?.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({
      error: "Failed to proxy request to OpenAI",
      detail: error.response?.data || error.message,
    });
  }
});

module.exports = router;

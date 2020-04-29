const puppeteer = require('puppeteer');

let bookingUrl = 'https://www.booking.com/searchresults.es.html?aid=397594&label=gog235jc-1DCAEoggI46AdIClgDaEaIAQGYAQq4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AojC6_AFwAIB&lang=es&sid=21c30abf367120d75e02a4c34c80058c&sb=1&src=hotel&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fhotel%2Fsg%2Fmarina-bay-sands.es.html%3Faid%3D397594%3Blabel%3Dgog235jc-1DCAEoggI46AdIClgDaEaIAQGYAQq4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AojC6_AFwAIB%3Bsid%3D21c30abf367120d75e02a4c34c80058c%3Bdest_id%3D-73635%3Bdest_type%3Dcity%3Bdist%3D0%3Bgroup_adults%3D2%3Bgroup_children%3D0%3Bhapos%3D1%3Bhpos%3D1%3Bno_rooms%3D1%3Broom1%3DA%252CA%3Bsb_price_type%3Dtotal%3Bsr_order%3Dpopularity%3Bsrepoch%3D1578821972%3Bsrpvid%3D266f43ea08f6023b%3Btype%3Dtotal%3Bucfs%3D1%26%3B&highlighted_hotels=245881&hp_sbox=1&sr_autoscroll=1&ss=Singapur&is_ski_area=0&ssne=Singapur&ssne_untouched=Singapur&dest_id=-73635&dest_type=city&checkin_year=2020&checkin_month=1&checkin_monthday=24&checkout_year=2020&checkout_month=1&checkout_monthday=25&group_adults=2&group_children=0&no_rooms=1&from_sf=1';
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(bookingUrl);

    // get hotel details
    let hotelData = await page.evaluate(() => {
        let hotels = [];
        // get the hotel elements
        let hotelsElms = document.querySelectorAll('div.sr_property_block[data-hotelid]');
        // get the hotel data
        hotelsElms.forEach((hotelelement) => {
            let hotelJson = {};
            try {
                hotelJson.name = hotelelement.querySelector('span.sr-hotel__name').innerText;
                hotelJson.reviews = hotelelement.querySelector('span.review-score-widget__subtext').innerText;
                hotelJson.rating = hotelelement.querySelector('span.review-score-badge').innerText;
                if(hotelelement.querySelector('strong.price')){
                    hotelJson.price = hotelelement.querySelector('strong.price').innerText;
                }
            }
            catch (exception){

            }
            hotels.push(hotelJson);
        });
        return hotels;
    });

    console.dir(hotelData);
})();
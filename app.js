
'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const md5 = require('md5');
var _ = require('lodash');
const fs = require('fs');
const request = require('request');

const app = express();
app.set('port', process.env.PORT || 6003);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

function test() {
    console.log('---');
    // var re = '{"edd_action":"get_tracking_data","data":{"url":"http%3A%2F%2Flocalhost%2Fwc_test","email":"prashant%40tact9.in","installed":[],"active_plugins":["query-monitor%2Fquery-monitor.php","automate-mautic%2Fautomate-mautic.php","enhanced-woocommerce-mautic-integration%2Fenhanced-woocommerce-mautic-integration.php","woo-thank-you-page-nextmove-lite%2Fthank-you-page-for-woocommerce-nextmove-lite.php","woocommerce%2Fwoocommerce.php","woofunnels-autobot-automations%2Fwoofunnels-autobot-automations.php","woofunnels-deadline-coupons%2Fwoofunnels-deadline-coupons.php","wp-crontrol%2Fwp-crontrol.php","wp-php-console-master%2Fwp-php-console.php"],"license_info":[],"theme_info":{"name":"Storefront","uri":"https%3A%2F%2Fwoocommerce.com%2Fstorefront%2F","version":"2.3.3","author":"Automattic","author_uri":"https%3A%2F%2Fwoocommerce.com%2F"},"users_count":{"total":"1","administrator":"1","none":"0"},"locale":"en_US","country":"US","currency":"USD","is_mu":"no","wp":"4.9.8","wc":"3.4.5","php":"7.2.10-1%2Bubuntu16.04.1%2Bdeb.sury.org%2B1","mysql":"5.5.5","calc_taxes":"no","guest_checkout":"yes","product_count":{"total":"18","external":"1","grouped":"1","simple":"14","variable":"2"},"order_count":{"wc-pending":"0","wc-processing":"4","wc-on-hold":"29","wc-completed":"1","wc-cancelled":"32","wc-refunded":"0","wc-failed":"0"},"xlcore_version":"5.0","notification_ref":"","wc_gateways":["cheque","cod"],"date":"04.10.2018+09%3A53%3A59","admins":[{"user_email":"prashant%2540tact9.in","user_nicename":"wc_test"}]}}';
    // var re = '{"edd_action":"get_tracking_data","data":{"url":"https%3A%2F%2Freload.global","email":"admin%40reload.global","installed":{"finale-woocommerce-sales-countdown-timer-discount\/finale-woocommerce-sales-countdown-timer-discount-plugin-lite.php":{"WC requires at least":"2.6.0","WC tested up to":"3.4.4","XL":"True","Name":"Finale+-+WooCommerce+Sales+Countdown+Timer+%26+Discount+Plugin+Lite","PluginURI":"https%3A%2F%2Fxlplugins.com%2Ffinale-woocommerce-sales-countdown-timer-discount-plugin%2F","Version":"2.5.1","Description":"Finale+lets+you+create+scheduled+one+time+or+recurring+campaigns.+It+induces+urgency+with+visual+elements+such+as+Countdown+Timer+and+Counter+Bar+to+motivate+users+to+place+an+order.","Author":"XLPlugins","AuthorURI":"https%3A%2F%2Fwww.xlplugins.com","TextDomain":"finale-woocommerce-sales-countdown-timer-discount","DomainPath":"%2Flanguages%2F","Network":"","Title":"Finale+-+WooCommerce+Sales+Countdown+Timer+%26+Discount+Plugin+Lite","AuthorName":"XLPlugins"}},"active_plugins":["worker%2Finit.php","admin-menu-editor%2Fmenu-editor.php","aftership-woocommerce-tracking%2Faftership.php","all-in-one-seo-pack%2Fall_in_one_seo_pack.php","autoptimize%2Fautoptimize.php","beeketing-for-woocommerce%2Fbeeketing-woocommerce.php","better-coupon-box%2Fbetter-coupon-box.php","coming-soon%2Fcoming-soon.php","contact-form-7%2Fwp-contact-form-7.php","cookie-notice%2Fcookie-notice.php","customer-reviews-woocommerce%2Fivole.php","ewww-image-optimizer%2Fewww-image-optimizer.php","finale-woocommerce-sales-countdown-timer-discount%2Ffinale-woocommerce-sales-countdown-timer-discount-plugin-lite.php","fusion-builder%2Ffusion-builder.php","fusion-core%2Ffusion-core.php","google-analytics-premium%2Fgoogleanalytics-premium.php","google-captcha%2Fgoogle-captcha.php","header-footer%2Fplugin.php","hide-plugins%2Fhide-plugins.php","instagram-feed%2Finstagram-feed.php","magic-password%2Fmagic-password.php","mailchimp-for-woocommerce%2Fmailchimp-woocommerce.php","mailchimp-forms-by-mailmunch%2Fmailchimp-mailmunch.php","master-slider%2Fmaster-slider.php","minify-html-markup%2Fminify-html.php","monsterinsights-eu-compliance%2Fmonsterinsights-eu-compliance.php","optin-forms%2Foptin-forms.php","redirection%2Fredirection.php","reid-plugins-curl-options%2Freid-plugins-curl-options.php","resize-image-after-upload%2Fresize-image-after-upload.php","revslider%2Frevslider.php","sg-cachepress%2Fsg-cachepress.php","updraftplus%2Fupdraftplus.php","user-role-editor%2Fuser-role-editor.php","woocommerce-delivery-notes%2Fwoocommerce-delivery-notes.php","woocommerce-gateway-paypal-express-checkout%2Fwoocommerce-gateway-paypal-express-checkout.php","woocommerce-google-analytics-integration%2Fwoocommerce-google-analytics-integration.php","woocommerce-pre-orders%2Fwoocommerce-pre-orders.php","woocommerce-product-bundles%2Fwoocommerce-product-bundles.php","woocommerce-upcoming-product%2Fwoocommerce-upcoming-product.php","woocommerce%2Fwoocommerce.php","wordfence%2Fwordfence.php","wp-smushit%2Fwp-smush.php"],"theme_info":{"name":"Avada","uri":"http%3A%2F%2Favada.theme-fusion.com%2F","version":"5.6.2","author":"ThemeFusion","author_uri":"http%3A%2F%2Fthemeforest.net%2Fuser%2FThemeFusion"},"users_count":{"total":"31","administrator":"2","customer":"27","editor":"1","subscriber":"1","none":"0"},"locale":"en_GB","country":"GB","currency":"GBP","is_mu":"no","wp":"4.9.8","wc":"3.4.5","php":"7.0.32","mysql":"5.6.40","calc_taxes":"no","guest_checkout":"yes","product_count":{"total":"36","bundle":"1","external":"0","grouped":"0","simple":"17","variable":"18"},"order_count":{"wc-pending":"0","wc-processing":"3","wc-on-hold":"0","wc-completed":"109","wc-cancelled":"5","wc-refunded":"1","wc-failed":"0","wc-pre-ordered":"0"},"xlcore_version":"5.1","notification_ref":"wc-settings","wc_gateways":["paypal","ppec_paypal","pre_orders_pay_later"],"date":"04.10.2018+13%3A15%3A12"}}';
    var re = '{"edd_action":"get_tracking_data","data":{"url":"https%3A%2F%2Fwww.therealrugcompany.co.uk","email":"paulking76%40gmail.com","active_plugins":["accelerated-mobile-pages%2Faccelerated-moblie-pages.php","aelia-woocommerce-blacklister%2Fwoocommerce-blacklister.php","affiliates-manager%2Fboot-strap.php","akismet%2Fakismet.php","blogvault-real-time-backup%2Fblogvault.php","code-snippets%2Fcode-snippets.php","coinpayments-payment-gateway-for-woocommerce%2Fclass-wc-gateway-coinpayments.php","color-filters%2Fplugin.php","ecr-google-customer-reviews%2Fecr-google-customer-reviews.php","fraudlabs-pro-for-woocommerce%2Finit.php","ip-blacklist-cloud%2Fip_blacklist_cloud.php","loginpress%2Floginpress.php","mabel-woobought-rpn%2Fmabel-woobought-rpn.php","ni-woocommerce-cost-of-goods%2Fni-woocommerce-cost-of-goods.php","pc-robotstxt%2Fpc-robotstxt.php","pricing-deals-for-woocommerce%2Fvt-pricing-deals.php","pricing-deals-pro-for-woocommerce%2Fvt-pricing-deals-pro.php","product-csv-import-export-for-woocommerce%2Fproduct-csv-import-export.php","really-simple-ssl%2Frlrsssl-really-simple-ssl.php","regenerate-thumbnails%2Fregenerate-thumbnails.php","remove-google-fonts-references%2Fremove-google-fonts-references.php","tawkto-live-chat%2Ftawkto.php","thank-you-page-for-woocommerce-nextmove%2Fwoocommerce-thankyou-pages.php","wc-aelia-foundation-classes%2Fwc-aelia-foundation-classes.php","woo-order-export-lite%2Fwoo-order-export-lite.php","woocom-wholesale-ordering%2Fwoocom-wholesale-ordering.php","woocommerce-advanced-shipping%2Fwoocommerce-advanced-shipping.php","woocommerce-ebay-integration%2Fwoocommerce-ebay-integration.php","woocommerce-email-customizer%2Fwoocommerce-email-customizer.php","woocommerce-follow-up-emails%2Fwoocommerce-follow-up-emails.php","woocommerce-measurement-price-calculator%2Fwoocommerce-measurement-price-calculator.php","woocommerce-payment-discounts%2Fwoocommerce-payment-discounts.php","woocommerce-paypal-pro-payment-gateway%2Fwoo-paypal-pro.php","woocommerce-pdf-invoices%2Fbootstrap.php","woocommerce-stock-synchronization%2Fstock-synchronization.php","woocommerce%2Fwoocommerce.php","wordpress-seo%2Fwp-seo.php","wp-all-export-pro%2Fwp-all-export-pro.php","wp-fastest-cache-premium%2FwpFastestCachePremium.php","wp-fastest-cache%2FwpFastestCache.php"],"license_info":{"8f03001b6581e4ca5b368ffd4a41c8607e491a3d":{"plugin":"WooCommerce+Thank+You+Page+-+NextMove","product_version":"1.8.1","product_status":"active","license_expiry":"2019-04-06+23%3A59%3A59","product_file_path":"8f03001b6581e4ca5b368ffd4a41c8607e491a3d","existing_key":"6c313131a9ee000ef7769ab68f4db9e0"}},"theme_info":{"name":"Flatsome+Child","uri":"","version":"3.0","author":"UX+Themes","author_uri":""},"users_count":{"total":"174","administrator":"1","customer":"68","shop_manager":"3","wholesale":"22","wholesale_customer":"23","affiliate":"56","none":"0"},"locale":"en_GB","country":"GB","currency":"GBP","is_mu":"no","wp":"4.9.8","wc":"3.4.5","php":"7.0.32","mysql":"5.6.41","calc_taxes":"yes","guest_checkout":"yes","product_count":{"total":"457","external":"0","grouped":"0","simple":"457","variable":"0"},"order_count":{"wc-pending":"26","wc-processing":"1","wc-on-hold":"12","wc-completed":"528","wc-cancelled":"69","wc-refunded":"36","wc-failed":"0"},"xlcore_version":"5.2","notification_ref":"","wc_gateways":["paypalpro","paypal","coinpayments"],"date":"05.10.2018+07%3A58%3A57","admins":[{"user_email":"paulking76%40gmail.com","user_nicename":"admin66"}]}}';
    var posted_data = JSON.parse(re);
    _.reverse(posted_data);
    // console.log(posted_data);
    let parsed_data = {};
    if (ol(posted_data) > 0) {

        for (var i in posted_data) {
            if (posted_data['data'] != undefined) {
                var track = posted_data['data'];
                var c_url = clean_url__(urldecode(track['url']));
                var e_url = md5(c_url);
                // console.log(track['installed']);
                // console.log(JSON.stringify(track, undefined, 2));

                parsed_data[e_url] = {};
                parsed_data[e_url]['track'] = {};
                parsed_data[e_url]['track']['site_id'] = e_url;
                parsed_data[e_url]['track']['url'] = c_url;
                parsed_data[e_url]['track']['email'] = urldecode(track['email']);
                parsed_data[e_url]['track']['xlplugins'] = parse_array_4__(track['installed']);
                parsed_data[e_url]['track']['active_plugins'] = clear_arr__(track['active_plugins']);
                parsed_data[e_url]['track']['license_info'] = parse_array_3__(track['license_info']);
                parsed_data[e_url]['track']['theme_info'] = clear_arr_1__(track['theme_info']);
                parsed_data[e_url]['track']['users_count'] = clear_arr_1__(track['users_count']);
                parsed_data[e_url]['track']['admins'] = clear_admin_array__(track['admins']);
                parsed_data[e_url]['track']['wp'] = track['wp'];
                parsed_data[e_url]['track']['notification_ref'] = track['notification_ref'];
                parsed_data[e_url]['track']['wc_gateways'] = clear_arr__(track['wc_gateways']);
                parsed_data[e_url]['track']['locale'] = track['locale'];
                parsed_data[e_url]['track']['is_mu'] = track['is_mu'];
                parsed_data[e_url]['track']['php'] = track['php'];
                parsed_data[e_url]['track']['mysql'] = track['mysql'];
                parsed_data[e_url]['track']['calc_taxes'] = track['calc_taxes'];
                parsed_data[e_url]['track']['guest_checkout'] = track['guest_checkout'];
                parsed_data[e_url]['track']['product_count'] = clear_arr_1__(track['product_count']);
                parsed_data[e_url]['track']['order_count'] = clear_arr_1__(track['order_count']);
                parsed_data[e_url]['track']['xlcore_version'] = track['xlcore_version'];
                parsed_data[e_url]['track']['date'] = urldecode(track['date']);
            }

        }
    }
    var obj = {};
    // console.log(parsed_data);
    for (var j in parsed_data) {
        var site_data = parsed_data[j];
        for (var k in site_data) {
            var allsite_data = site_data[k];

            // let endpoint_url = 'https://xlplugins-live.firebaseapp.com/track';
            let endpoint_url = 'http://bakingcode.org/wc_test/lead_ab_data.php';
            let options = get_track_fb_option(endpoint_url, JSON.stringify(allsite_data));
            // console.log(allsite_data);
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                // console.log(body);

                if (response.statusCode == 200) {
                    console.log(JSON.stringify(body, undefined, 2));
                    fs.writeFile('test_response_data.json', body, function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                    });
                }
            });
        }
    }
    // console.log(JSON.stringify(parsed_data));

    // console.log(obj);
    // console.log(JSON.stringify(parsed_data));

    /*
    fs.writeFile('parsed_data.json', JSON.stringify(parsed_data), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    */
    // console.log(JSON.stringify(parsed_data, undefined, 2));
    console.log('---');
}


app.post('/', (req, res) => {
    let body = jsp(req.body);
    // console.log(body);
    // console.log('---');
    // var re = '{"edd_action":"get_tracking_data","data":{"url":"http%3A%2F%2Flocalhost%2Fwc_test","email":"prashant%40tact9.in","installed":[],"active_plugins":["query-monitor%2Fquery-monitor.php","automate-mautic%2Fautomate-mautic.php","enhanced-woocommerce-mautic-integration%2Fenhanced-woocommerce-mautic-integration.php","woo-thank-you-page-nextmove-lite%2Fthank-you-page-for-woocommerce-nextmove-lite.php","woocommerce%2Fwoocommerce.php","woofunnels-autobot-automations%2Fwoofunnels-autobot-automations.php","woofunnels-deadline-coupons%2Fwoofunnels-deadline-coupons.php","wp-crontrol%2Fwp-crontrol.php","wp-php-console-master%2Fwp-php-console.php"],"license_info":[],"theme_info":{"name":"Storefront","uri":"https%3A%2F%2Fwoocommerce.com%2Fstorefront%2F","version":"2.3.3","author":"Automattic","author_uri":"https%3A%2F%2Fwoocommerce.com%2F"},"users_count":{"total":"1","administrator":"1","none":"0"},"locale":"en_US","country":"US","currency":"USD","is_mu":"no","wp":"4.9.8","wc":"3.4.5","php":"7.2.10-1%2Bubuntu16.04.1%2Bdeb.sury.org%2B1","mysql":"5.5.5","calc_taxes":"no","guest_checkout":"yes","product_count":{"total":"18","external":"1","grouped":"1","simple":"14","variable":"2"},"order_count":{"wc-pending":"0","wc-processing":"4","wc-on-hold":"29","wc-completed":"1","wc-cancelled":"32","wc-refunded":"0","wc-failed":"0"},"xlcore_version":"5.0","notification_ref":"","wc_gateways":["cheque","cod"],"date":"04.10.2018+09%3A53%3A59","admins":[{"user_email":"prashant%2540tact9.in","user_nicename":"wc_test"}]}}';
    // var re = '{"edd_action":"get_tracking_data","data":{"url":"https%3A%2F%2Freload.global","email":"admin%40reload.global","installed":{"finale-woocommerce-sales-countdown-timer-discount\/finale-woocommerce-sales-countdown-timer-discount-plugin-lite.php":{"WC requires at least":"2.6.0","WC tested up to":"3.4.4","XL":"True","Name":"Finale+-+WooCommerce+Sales+Countdown+Timer+%26+Discount+Plugin+Lite","PluginURI":"https%3A%2F%2Fxlplugins.com%2Ffinale-woocommerce-sales-countdown-timer-discount-plugin%2F","Version":"2.5.1","Description":"Finale+lets+you+create+scheduled+one+time+or+recurring+campaigns.+It+induces+urgency+with+visual+elements+such+as+Countdown+Timer+and+Counter+Bar+to+motivate+users+to+place+an+order.","Author":"XLPlugins","AuthorURI":"https%3A%2F%2Fwww.xlplugins.com","TextDomain":"finale-woocommerce-sales-countdown-timer-discount","DomainPath":"%2Flanguages%2F","Network":"","Title":"Finale+-+WooCommerce+Sales+Countdown+Timer+%26+Discount+Plugin+Lite","AuthorName":"XLPlugins"}},"active_plugins":["worker%2Finit.php","admin-menu-editor%2Fmenu-editor.php","aftership-woocommerce-tracking%2Faftership.php","all-in-one-seo-pack%2Fall_in_one_seo_pack.php","autoptimize%2Fautoptimize.php","beeketing-for-woocommerce%2Fbeeketing-woocommerce.php","better-coupon-box%2Fbetter-coupon-box.php","coming-soon%2Fcoming-soon.php","contact-form-7%2Fwp-contact-form-7.php","cookie-notice%2Fcookie-notice.php","customer-reviews-woocommerce%2Fivole.php","ewww-image-optimizer%2Fewww-image-optimizer.php","finale-woocommerce-sales-countdown-timer-discount%2Ffinale-woocommerce-sales-countdown-timer-discount-plugin-lite.php","fusion-builder%2Ffusion-builder.php","fusion-core%2Ffusion-core.php","google-analytics-premium%2Fgoogleanalytics-premium.php","google-captcha%2Fgoogle-captcha.php","header-footer%2Fplugin.php","hide-plugins%2Fhide-plugins.php","instagram-feed%2Finstagram-feed.php","magic-password%2Fmagic-password.php","mailchimp-for-woocommerce%2Fmailchimp-woocommerce.php","mailchimp-forms-by-mailmunch%2Fmailchimp-mailmunch.php","master-slider%2Fmaster-slider.php","minify-html-markup%2Fminify-html.php","monsterinsights-eu-compliance%2Fmonsterinsights-eu-compliance.php","optin-forms%2Foptin-forms.php","redirection%2Fredirection.php","reid-plugins-curl-options%2Freid-plugins-curl-options.php","resize-image-after-upload%2Fresize-image-after-upload.php","revslider%2Frevslider.php","sg-cachepress%2Fsg-cachepress.php","updraftplus%2Fupdraftplus.php","user-role-editor%2Fuser-role-editor.php","woocommerce-delivery-notes%2Fwoocommerce-delivery-notes.php","woocommerce-gateway-paypal-express-checkout%2Fwoocommerce-gateway-paypal-express-checkout.php","woocommerce-google-analytics-integration%2Fwoocommerce-google-analytics-integration.php","woocommerce-pre-orders%2Fwoocommerce-pre-orders.php","woocommerce-product-bundles%2Fwoocommerce-product-bundles.php","woocommerce-upcoming-product%2Fwoocommerce-upcoming-product.php","woocommerce%2Fwoocommerce.php","wordfence%2Fwordfence.php","wp-smushit%2Fwp-smush.php"],"theme_info":{"name":"Avada","uri":"http%3A%2F%2Favada.theme-fusion.com%2F","version":"5.6.2","author":"ThemeFusion","author_uri":"http%3A%2F%2Fthemeforest.net%2Fuser%2FThemeFusion"},"users_count":{"total":"31","administrator":"2","customer":"27","editor":"1","subscriber":"1","none":"0"},"locale":"en_GB","country":"GB","currency":"GBP","is_mu":"no","wp":"4.9.8","wc":"3.4.5","php":"7.0.32","mysql":"5.6.40","calc_taxes":"no","guest_checkout":"yes","product_count":{"total":"36","bundle":"1","external":"0","grouped":"0","simple":"17","variable":"18"},"order_count":{"wc-pending":"0","wc-processing":"3","wc-on-hold":"0","wc-completed":"109","wc-cancelled":"5","wc-refunded":"1","wc-failed":"0","wc-pre-ordered":"0"},"xlcore_version":"5.1","notification_ref":"wc-settings","wc_gateways":["paypal","ppec_paypal","pre_orders_pay_later"],"date":"04.10.2018+13%3A15%3A12"}}';
    // var re = '{"edd_action":"get_tracking_data","data":{"url":"https%3A%2F%2Fwww.therealrugcompany.co.uk","email":"paulking76%40gmail.com","active_plugins":["accelerated-mobile-pages%2Faccelerated-moblie-pages.php","aelia-woocommerce-blacklister%2Fwoocommerce-blacklister.php","affiliates-manager%2Fboot-strap.php","akismet%2Fakismet.php","blogvault-real-time-backup%2Fblogvault.php","code-snippets%2Fcode-snippets.php","coinpayments-payment-gateway-for-woocommerce%2Fclass-wc-gateway-coinpayments.php","color-filters%2Fplugin.php","ecr-google-customer-reviews%2Fecr-google-customer-reviews.php","fraudlabs-pro-for-woocommerce%2Finit.php","ip-blacklist-cloud%2Fip_blacklist_cloud.php","loginpress%2Floginpress.php","mabel-woobought-rpn%2Fmabel-woobought-rpn.php","ni-woocommerce-cost-of-goods%2Fni-woocommerce-cost-of-goods.php","pc-robotstxt%2Fpc-robotstxt.php","pricing-deals-for-woocommerce%2Fvt-pricing-deals.php","pricing-deals-pro-for-woocommerce%2Fvt-pricing-deals-pro.php","product-csv-import-export-for-woocommerce%2Fproduct-csv-import-export.php","really-simple-ssl%2Frlrsssl-really-simple-ssl.php","regenerate-thumbnails%2Fregenerate-thumbnails.php","remove-google-fonts-references%2Fremove-google-fonts-references.php","tawkto-live-chat%2Ftawkto.php","thank-you-page-for-woocommerce-nextmove%2Fwoocommerce-thankyou-pages.php","wc-aelia-foundation-classes%2Fwc-aelia-foundation-classes.php","woo-order-export-lite%2Fwoo-order-export-lite.php","woocom-wholesale-ordering%2Fwoocom-wholesale-ordering.php","woocommerce-advanced-shipping%2Fwoocommerce-advanced-shipping.php","woocommerce-ebay-integration%2Fwoocommerce-ebay-integration.php","woocommerce-email-customizer%2Fwoocommerce-email-customizer.php","woocommerce-follow-up-emails%2Fwoocommerce-follow-up-emails.php","woocommerce-measurement-price-calculator%2Fwoocommerce-measurement-price-calculator.php","woocommerce-payment-discounts%2Fwoocommerce-payment-discounts.php","woocommerce-paypal-pro-payment-gateway%2Fwoo-paypal-pro.php","woocommerce-pdf-invoices%2Fbootstrap.php","woocommerce-stock-synchronization%2Fstock-synchronization.php","woocommerce%2Fwoocommerce.php","wordpress-seo%2Fwp-seo.php","wp-all-export-pro%2Fwp-all-export-pro.php","wp-fastest-cache-premium%2FwpFastestCachePremium.php","wp-fastest-cache%2FwpFastestCache.php"],"license_info":{"8f03001b6581e4ca5b368ffd4a41c8607e491a3d":{"plugin":"WooCommerce+Thank+You+Page+-+NextMove","product_version":"1.8.1","product_status":"active","license_expiry":"2019-04-06+23%3A59%3A59","product_file_path":"8f03001b6581e4ca5b368ffd4a41c8607e491a3d","existing_key":"6c313131a9ee000ef7769ab68f4db9e0"}},"theme_info":{"name":"Flatsome+Child","uri":"","version":"3.0","author":"UX+Themes","author_uri":""},"users_count":{"total":"174","administrator":"1","customer":"68","shop_manager":"3","wholesale":"22","wholesale_customer":"23","affiliate":"56","none":"0"},"locale":"en_GB","country":"GB","currency":"GBP","is_mu":"no","wp":"4.9.8","wc":"3.4.5","php":"7.0.32","mysql":"5.6.41","calc_taxes":"yes","guest_checkout":"yes","product_count":{"total":"457","external":"0","grouped":"0","simple":"457","variable":"0"},"order_count":{"wc-pending":"26","wc-processing":"1","wc-on-hold":"12","wc-completed":"528","wc-cancelled":"69","wc-refunded":"36","wc-failed":"0"},"xlcore_version":"5.2","notification_ref":"","wc_gateways":["paypalpro","paypal","coinpayments"],"date":"05.10.2018+07%3A58%3A57","admins":[{"user_email":"paulking76%40gmail.com","user_nicename":"admin66"}]}}';
    // var posted_data = JSON.parse(re);
    var posted_data = body;
    console.log('hi');
    // console.log(typeof body);
    // console.log(body);
    _.reverse(posted_data);
    // console.log(posted_data);
    let parsed_data = {};
    if (ol(posted_data) > 0) {

        // for (var i in posted_data) {
        if (posted_data['data'] != undefined) {
            var track = posted_data['data'];
            var c_url = clean_url__(urldecode(track['url']));
            var e_url = md5(c_url);
            parsed_data[e_url] = {};
            parsed_data[e_url]['track'] = {};
            parsed_data[e_url]['track']['site_id'] = e_url;
            parsed_data[e_url]['track']['url'] = c_url;
            parsed_data[e_url]['track']['email'] = urldecode(track['email']);
            parsed_data[e_url]['track']['xlplugins'] = parse_array_4__(track['installed']);
            parsed_data[e_url]['track']['active_plugins'] = clear_arr__(track['active_plugins']);
            parsed_data[e_url]['track']['license_info'] = parse_array_3__(track['license_info']);
            parsed_data[e_url]['track']['theme_info'] = clear_arr_1__(track['theme_info']);
            parsed_data[e_url]['track']['users_count'] = clear_arr_1__(track['users_count']);
            parsed_data[e_url]['track']['admins'] = clear_admin_array__(track['admins']);
            parsed_data[e_url]['track']['wp'] = track['wp'];
            parsed_data[e_url]['track']['notification_ref'] = track['notification_ref'];
            parsed_data[e_url]['track']['wc_gateways'] = clear_arr__(track['wc_gateways']);
            parsed_data[e_url]['track']['locale'] = track['locale'];
            parsed_data[e_url]['track']['is_mu'] = track['is_mu'];
            parsed_data[e_url]['track']['php'] = track['php'];
            parsed_data[e_url]['track']['mysql'] = track['mysql'];
            parsed_data[e_url]['track']['calc_taxes'] = track['calc_taxes'];
            parsed_data[e_url]['track']['guest_checkout'] = track['guest_checkout'];
            parsed_data[e_url]['track']['product_count'] = clear_arr_1__(track['product_count']);
            parsed_data[e_url]['track']['order_count'] = clear_arr_1__(track['order_count']);
            parsed_data[e_url]['track']['xlcore_version'] = track['xlcore_version'];
            parsed_data[e_url]['track']['date'] = urldecode(track['date']);
        }

        // }
    }
    console.log(parsed_data);
    if (ol(parsed_data) > 0) {
        for (var j in parsed_data) {
            var site_data = parsed_data[j];
            for (var k in site_data) {
                var allsite_data = site_data[k];

                // let endpoint_url = 'https://xlplugins-live.firebaseapp.com/track';
                let endpoint_url = 'http://bakingcode.org/wc_test/lead_ab_data.php';
                let options = get_track_fb_option(endpoint_url, JSON.stringify(allsite_data));
                request(options, function (error, response, body) {
                    if (error) throw new Error(error);

                    if (response.statusCode == 200) {
                        console.log('data_send');
                        // TODO implement
                        const response = {
                            statusCode: 200,
                            body: 1
                            // body: JSON.stringify(body, undefined, 2)

                        };
                        res.send(response);
                        /*
                        console.log(JSON.stringify(body, undefined, 2));
                            fs.writeFile('test_response_data.json', body, function (err) {
                                if (err) throw err;
                                console.log('Saved!');
                            });
                        */
                    }
                });
            }
        }
    }

    // console.log('---');





});

function get_track_fb_option(endpoint_url, allsite_data) {
    var options = {
        method: 'POST',
        url: endpoint_url,
        headers:
        {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
        },
        body: allsite_data
    };

    return options;
};


/**
 * urldecode
 * 
 */
function urldecode(str) {
    var uri_dec = decodeURIComponent(str);
    return uri_dec;
}

function clear_arr__(array) {
    if (ol(array) > 0) {
        var result1 = {};
        for (var i in array) {
            var pl_name = urldecode(array[i]).split('/');
            pl_name = trim11(pl_name);
            pl_name = sanitize_title(pl_name);
            if (pl_name != '') {
                result1[pl_name] = "true";
            }
        }
        return (result1);
    }
}
/**
 * Trim spaces from start and end of string
 */
function trim11(str) {
    str = str.toString();
    str = str.replace(/^\s+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}

function parse_array_4__(array) {
    if (ol(array) > 0) {
        var string = {};
        for (var i in array) {
            var pl_name = i.split('/');
            pl_name = _.replace(pl_name, '.php', '');
            pl_name = sanitize_title(pl_name);
            string[pl_name] = array[i]['Version'];
        }
        return string;
    }
}

function clear_admin_array__(array) {
    if (ol(array) > 0) {
        var result1 = {};
        var $h = 0;
        for (var i in array) {
            var inner_value = array[i];
            result1[$h] = {};
            result1[$h]['user_email'] = urldecode(inner_value['user_email']);
            result1[$h]['user_nicename'] = urldecode(inner_value['user_nicename']);
            $h++;
        }

        return (result1);
    }
}
function base64_decode(b64string) {
    var str;
    if (typeof Buffer.from === "function") {
        // Node 5.10+
        str = Buffer.from(b64string, 'base64'); // Ta-da
    } else {
        // older Node versions
        str = new Buffer(b64string, 'base64'); // Ta-da
    }
    return str;
}
function clear_arr_1__(array) {
    if (ol(array) > 0) {
        var result1 = {};
        for (var i in array) {
            var inner_value = array[i];
            result1[i] = urldecode(inner_value);
        }
        return (result1);
    }
}

function parse_array_3__(array) {
    if (ol(array) > 0) {
        var string = {};
        for (var i in array) {
            var value = array[i];
            var plugin = sanitize_title(urldecode(value['plugin']));
            string[plugin] = {};
            string[plugin]['product_version'] = urldecode(value['product_version']);
            string[plugin]['license_expiry'] = urldecode(value['license_expiry']);
            string[plugin]['product_file_path'] = (value['product_file_path']);
            string[plugin]['existing_key'] = (value['existing_key']);
        }
        return string;
    }
}
/**
 * slugify text
 * 
 * @param {string} text 
 */
function sanitize_title(text) {

    var slug = text.toString().toLowerCase()
        // .replace(/\-/g, '_')
        .replace(/\s+/g, '_')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '_')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    return slug;
}
/**
 * remove http, https from string
 * @param {string} str
 */
function clean_url__(str) {
    if (str.indexOf('http://') === 0) {
        str = _.replace(str, 'http://', '');
    }
    if (str.indexOf('https://') === 0) {
        str = _.replace(str, 'https://', '');
    }
    if (str.indexOf('www.') === 0) {
        str = _.replace(str, 'www.', '');
    }
    return str;
};



/**
 * Break association of object with parent
 * @param {Object} obj
 */
function jsp(obj) {
    if (typeof obj === 'object') {
        let doc = JSON.stringify(obj);
        doc = JSON.parse(doc);
        return doc;
    } else {
        return obj;
    }
};

/**
 * Get Length of Object
 * @param {Object} obj
 */
function ol(obj) {
    let c = 0;
    if (typeof obj === "object") {
        c = Object.keys(obj).length;
    }
    return c;
};

/**
 * Checking Property Exist in object
 * @param {Object} obj
 * @param {String} key
 */
function hp(obj, key) {
    let c = false;
    if (typeof obj === "object" && key !== undefined) {
        c = obj.hasOwnProperty(key);
    }
    return c;
};


app.listen(app.get('port'));
module.exports = app;
// module.exports = test();
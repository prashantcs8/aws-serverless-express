
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
    var re = '{"data":{"url":"example.com", "email":"test@gmail.com"}, "count":42}';
    var posted_data = JSON.parse(re);
    _.reverse(posted_data);
    // console.log(posted_data);
    let parsed_data = {};
    if (ol(posted_data) > 0) {

        for (var i in posted_data) {
            if (posted_data['data'] != undefined) {
                var trk = posted_data['data'];
                var c_url = clean_url__(urldecode(trk['url']));
                var en_url = md5(c_url);
                parsed_data[en_url] = {};
                parsed_data[en_url]['trk'] = {};
                parsed_data[en_url]['trk']['site_id'] = en_url;
                parsed_data[en_url]['trk']['url'] = c_url;
                parsed_data[en_url]['trk']['email'] = urldecode(trk['email']);
                parsed_data[en_url]['trk']['date'] = urldecode(trk['date']);
            }

        }
    }
    var obj = {};
    // console.log(parsed_data);
    for (var j in parsed_data) {
        var s_data = parsed_data[j];
        for (var k in s_data) {
            var all_data = s_data[k];

            let endpoint_url = 'http://testdomain.com/test_data.php';
            let options = get_trk_fb_option(endpoint_url, JSON.stringify(all_data));
            // console.log(all_data);
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
  
    // console.log(JSON.stringify(parsed_data, undefined, 2));
    console.log('---');
}


app.post('/', (req, res) => {
    let body = jsp(req.body);
    // console.log('---');
    // var re = '{"data":{"url":"example.com", "email":"test@gmail.com"}, "count":42}';
    var posted_data = body;
    _.reverse(posted_data);
    let parsed_data = {};
    if (ol(posted_data) > 0) {

        // for (var i in posted_data) {
        if (posted_data['data'] != undefined) {
            var trk = posted_data['data'];
            var c_url = clean_url__(urldecode(trk['url']));
            var en_url = md5(c_url);
            parsed_data[en_url] = {};
            parsed_data[en_url]['trk'] = {};
            parsed_data[en_url]['trk']['site_id'] = en_url;
            parsed_data[en_url]['trk']['url'] = c_url;
            parsed_data[en_url]['trk']['email'] = urldecode(trk['email']);
            parsed_data[en_url]['trk']['date'] = ymd();
        }

        // }
    }
    console.log(parsed_data);
    if (ol(parsed_data) > 0) {
        for (var j in parsed_data) {
            var s_data = parsed_data[j];
            for (var k in s_data) {
                var all_data = s_data[k];

                let endpoint_url = 'http://testdomain.com/test_data.php';
                let options = get_trk_fb_option(endpoint_url, JSON.stringify(all_data));
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
/**
    * Get Date Object
    */
function dt() {
    return new Date();
};
/**
    * Get Ymd date string
    */
function ymd() {
    let d = dt();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let day = d.getDate();
    month = ("0" + month).slice(-2);
    day = ("0" + day).slice(-2);
    return year + '-' + month + '-' + day;
};

function get_trk_fb_option(endpoint_url, all_data) {
    var options = {
        method: 'POST',
        url: endpoint_url,
        headers:
        {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
        },
        body: all_data
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
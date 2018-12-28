
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);


function stringToBase64encode(str, splitFlag)
{
    console.log('调用了 stringToBase64encode');
    return base64encode(hexToString(str, splitFlag));
}

function base64decodeToString(str)
{
    console.log('调用了 base64decodeToString');
    return CharToHex(base64decode(str));
}

function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if(i == len)
    {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
        out += "==";
        break;
    }
    c2 = str.charCodeAt(i++);
    if(i == len)
    {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt((c2 & 0xF) << 2);
        out += "=";
        break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
    /* c1 */
    do {
        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c1 == -1);
    if(c1 == -1)
        break;

    /* c2 */
    do {
        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c2 == -1);
    if(c2 == -1)
        break;

    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

    /* c3 */
    do {
        c3 = str.charCodeAt(i++) & 0xff;
        if(c3 == 61)
        return out;
        c3 = base64DecodeChars[c3];
    } while(i < len && c3 == -1);
    if(c3 == -1)
        break;

    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

    /* c4 */
    do {
        c4 = str.charCodeAt(i++) & 0xff;
        if(c4 == 61)
        return out;
        c4 = base64DecodeChars[c4];
    } while(i < len && c4 == -1);
    if(c4 == -1)
        break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

function  hexToString (str,splitFlag){
                var result = "";
                var arr = str.split(splitFlag);
                var temp_arr = [],numX;
                

                for(var i= 0,len = arr.length;i<len;i++){
                    if (arr[i].length == 1) {
                        arr[i] += '0';
                    }
                    numX = parseInt(arr[i], 16);//10进制；
                    result += String.fromCharCode(numX);
                }
                return result;
            }

function utf16to8(str) {
    var out, i, len, c;

    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
    } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
    } else {
        out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
    }
    }
    return out;
}

function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
    c = str.charCodeAt(i++);
    switch(c >> 4)
    { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += str.charAt(i-1);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x0F) << 12) |
                       ((char2 & 0x3F) << 6) |
                       ((char3 & 0x3F) << 0));
        break;
    }
    }

    return out;
}

function CharToHex(str) {
    var out, i, h;
    out = "";
    i = 0;
    while(i < str.length) 
    {
        h = str.charCodeAt(i++).toString(16);
        console.log('str.charCodeAt(i++) = ' +str.charCodeAt(i));
        console.log(i + '=' + h);
        if (h.length == 2) {
           out += h; 
        }
        else if(h.length == 1 && h == '0'){
            out += h + '0';
        }
        else if(h.length == 1 && h != '0'){
            out += '0' + h;
        }
        
    }

    return out;
}

function doEncode() {
    var src = document.getElementById('src').value;
    var opts = document.getElementById('opt1');
    document.getElementById('dest').value = opts.checked?CharToHex(base64encode(utf16to8(src))):base64encode(utf16to8(src));
}

function doDecode() {
    var src = document.getElementById('src').value;
    var opts = document.getElementById('opt2');
    document.getElementById('dest').value = opts.checked?CharToHex(base64decode(src)):utf8to16(base64decode(src));
}

// /** 
// * 
// *  Base64 encode / decode 
// * 
// *  @author haitao.tu 
// *  @date   2010-04-26 
// *  @email  tuhaitao@foxmail.com 
// * 
// */  
   
// function Base64() {  
   
//     // private property  
//     _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
   
//     // public method for encoding  
//     this.encode = function (input) {  
//         var output = "";  
//         var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
//         var i = 0;  
//         input = _utf8_encode(input);  
//         while (i < input.length) {  
//             chr1 = input.charCodeAt(i++);  
//             chr2 = input.charCodeAt(i++);  
//             chr3 = input.charCodeAt(i++);  
//             enc1 = chr1 >> 2;  
//             enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
//             enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
//             enc4 = chr3 & 63;  
//             if (isNaN(chr2)) {  
//                 enc3 = enc4 = 64;  
//             } else if (isNaN(chr3)) {  
//                 enc4 = 64;  
//             }  
//             output = output +  
//             _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
//             _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
//         }  
//         return output;  
//     }  
   
//     // public method for decoding  
//     this.decode = function (input) {  
//         var output = "";  
//         var chr1, chr2, chr3;  
//         var enc1, enc2, enc3, enc4;  
//         var i = 0;  
//         input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
//         while (i < input.length) {  
//             enc1 = _keyStr.indexOf(input.charAt(i++));  
//             enc2 = _keyStr.indexOf(input.charAt(i++));  
//             enc3 = _keyStr.indexOf(input.charAt(i++));  
//             enc4 = _keyStr.indexOf(input.charAt(i++));  
//             chr1 = (enc1 << 2) | (enc2 >> 4);  
//             chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
//             chr3 = ((enc3 & 3) << 6) | enc4;  
//             output = output + String.fromCharCode(chr1);  
//             if (enc3 != 64) {  
//                 output = output + String.fromCharCode(chr2);  
//             }  
//             if (enc4 != 64) {  
//                 output = output + String.fromCharCode(chr3);  
//             }  
//         }  
//         output = _utf8_decode(output);  
//         return output;  
//     }  
   
//     // private method for UTF-8 encoding  
//     _utf8_encode = function (string) {  
//         string = string.replace(/\r\n/g,"\n");  
//         var utftext = "";  
//         for (var n = 0; n < string.length; n++) {  
//             var c = string.charCodeAt(n);  
//             if (c < 128) {  
//                 utftext += String.fromCharCode(c);  
//             } else if((c > 127) && (c < 2048)) {  
//                 utftext += String.fromCharCode((c >> 6) | 192);  
//                 utftext += String.fromCharCode((c & 63) | 128);  
//             } else {  
//                 utftext += String.fromCharCode((c >> 12) | 224);  
//                 utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
//                 utftext += String.fromCharCode((c & 63) | 128);  
//             }  
   
//         }  
//         return utftext;  
//     }  
   
//     // private method for UTF-8 decoding  
//     _utf8_decode = function (utftext) {  
//         var string = "";  
//         var i = 0;  
//         var c = c1 = c2 = 0;  
//         while ( i < utftext.length ) {  
//             c = utftext.charCodeAt(i);  
//             if (c < 128) {  
//                 string += String.fromCharCode(c);  
//                 i++;  
//             } else if((c > 191) && (c < 224)) {  
//                 c2 = utftext.charCodeAt(i+1);  
//                 string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
//                 i += 2;  
//             } else {  
//                 c2 = utftext.charCodeAt(i+1);  
//                 c3 = utftext.charCodeAt(i+2);  
//                 string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
//                 i += 3;  
//             }  
//         }  
//         return string;  
//     }  
// }  
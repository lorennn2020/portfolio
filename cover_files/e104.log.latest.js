/**
 * 104I LOGSERVICE API
 * AUTHOR :     NCC.REX
 * VERSION :    1.0.3
 * CREATEDAY :  2013-02-06
 */

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function () {
                return this.valueOf();
            };
    }

    var cx,
        escapable,
        gap,
        indent,
        meta,
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {
        var i,
            k,
            v,
            length,
            mind = gap,
            partial,
            value = holder[key];

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':
            return isFinite(value) ? String(value) : 'null';

        case 'boolean':

        case 'null':
            return String(value);
        case 'object':
            if (!value) {
                return 'null';
            }

            gap += indent;
            partial = [];

            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

    if (typeof JSON.stringify !== 'function') {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            } else if (typeof space === 'string') {
                indent = space;
            }

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

            return str('', {'': value});
        };
    }

    if (typeof JSON.parse !== 'function') {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                j = eval('(' + text + ')');

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

            throw new SyntaxError('JSON.parse');
        };
    }
}());

(function(){
    var _logSetting = {
        DEBUG : false,
        SERVER_PATH : null,
        ID_CK : null,
        EPK : null,
        TRACK_ACTION : null,
        WEB_SOURCE : null,
        TIMEOUT : 1000
    };

    var updateViewCnt = true;

    var IE = document.all?true:false;

    var class2type = {};

    var _cookieName = null;

    var _type = function(obj){
        return obj == null ? String(obj) : class2type[Object.prototype.toString.call(obj)] || "object";
    };

    var _extend = function(target, options){
        if(_type(options) === 'object'){
            for(var key in options){
                if(_type(target[key]) !== undefined && _type(options[key]) !== undefined){
                    if(_type(target[key]) === 'object' && _type(options[key]) === 'object'){
                        _extend(target[key],options[key]);
                    }else{
                        if(options[key] !== null){
                            target[key] = options[key];
                        }
                    }
                }else if(_type(target[key]) === undefined && _type(options[key]) !== undefined){
                    target[key] = options[key];
                }
            }
        }

        return target;
    };

    var _trim = function(text){
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        return text === null ? "" : ( text + "" ).replace( rtrim, "" );
    };

    var _elogToClientInfo = function(options){
        var _clientInfo = {
            url : "",
            web : "",
            track : [],
            ext : {},
            trackMouse : false,
            callback : function(){}
        };

        _clientInfo = _extend(_clientInfo, options);
        _clientInfo.url = location.href;

        if(!_clientInfo.web){
            var websource = _logSetting.WEB_SOURCE.split(',');

            for(var j = 0; j < websource.length; j++){
                var patternAry = websource[j].split('=>');
                var testPattern = new RegExp(patternAry[1]);

                if(testPattern.test(_clientInfo.url)){
                    _clientInfo.web = patternAry[0];
                }
            }
        }

        return _clientInfo;
    };

    var _md5 = (function(){
        var hexcase=0;

        function md5(a){
            return rstr2hex(rstr_md5(str2rstr_utf8(a)));
        }

        function hex_hmac_md5(a,b){
            return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)));
        }

        function md5_vm_test(){
            return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72";
        }

        function rstr_md5(a){
            return binl2rstr(binl_md5(rstr2binl(a),a.length*8));
        }

        function rstr_hmac_md5(c,f){
            var e=rstr2binl(c);
            if(e.length>16){
                e=binl_md5(e,c.length*8);
            }

            var a=Array(16),d=Array(16);
            for(var b=0;b<16;b++){
                a[b]=e[b]^909522486;d[b]=e[b]^1549556828;
            }

            var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);

            return binl2rstr(binl_md5(d.concat(g),512+128));
        }

        function rstr2hex(c){
            try{
                hexcase;
            }catch(g){
                hexcase=0;
            }

            var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";
            var b="";
            var a;

            for(var d=0;d<c.length;d++){
                a=c.charCodeAt(d);
                b+=f.charAt((a>>>4)&15)+f.charAt(a&15);
            }

            return b;
        }

        function str2rstr_utf8(c){
            var b="";
            var d=-1;
            var a,e;

            while(++d<c.length){
                a=c.charCodeAt(d);
                e=d+1<c.length?c.charCodeAt(d+1):0;

                if(55296<=a&&a<=56319&&56320<=e&&e<=57343){
                    a=65536+((a&1023)<<10)+(e&1023);d++;
                }

                if(a<=127){
                    b+=String.fromCharCode(a);
                }else{
                    if(a<=2047){
                        b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63));
                    }else{
                        if(a<=65535){
                            b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63));
                        }else{
                            if(a<=2097151){
                                b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63));
                            }
                        }
                    }
                }
            }

            return b;
        }

        function rstr2binl(b){
            var c = 0;
            var a=Array(b.length>>2);

            for(c=0;c<a.length;c++){
                a[c]=0;
            }

            for(c=0;c<b.length*8;c+=8){
                a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32);
            }

            return a;
        }

        function binl2rstr(b){
            var a="";
            for(var c=0;c<b.length*32;c+=8){
                a+=String.fromCharCode((b[c>>5]>>>(c%32))&255);
            }

            return a;
        }

        function binl_md5(p,k){
            p[k>>5]|=128<<((k)%32);
            p[(((k+64)>>>9)<<4)+14]=k;

            var o=1732584193;
            var n=-271733879;
            var m=-1732584194;
            var l=271733878;

            for(var g=0;g<p.length;g+=16){
                var j=o;
                var h=n;
                var f=m;
                var e=l;

                o=md5_ff(o,n,m,l,p[g+0],7,-680876936);
                l=md5_ff(l,o,n,m,p[g+1],12,-389564586);
                m=md5_ff(m,l,o,n,p[g+2],17,606105819);
                n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);
                o=md5_ff(o,n,m,l,p[g+4],7,-176418897);
                l=md5_ff(l,o,n,m,p[g+5],12,1200080426);
                m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);
                n=md5_ff(n,m,l,o,p[g+7],22,-45705983);
                o=md5_ff(o,n,m,l,p[g+8],7,1770035416);
                l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);
                m=md5_ff(m,l,o,n,p[g+10],17,-42063);
                n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);
                o=md5_ff(o,n,m,l,p[g+12],7,1804603682);
                l=md5_ff(l,o,n,m,p[g+13],12,-40341101);
                m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);
                n=md5_ff(n,m,l,o,p[g+15],22,1236535329);
                o=md5_gg(o,n,m,l,p[g+1],5,-165796510);
                l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);
                m=md5_gg(m,l,o,n,p[g+11],14,643717713);
                n=md5_gg(n,m,l,o,p[g+0],20,-373897302);
                o=md5_gg(o,n,m,l,p[g+5],5,-701558691);
                l=md5_gg(l,o,n,m,p[g+10],9,38016083);
                m=md5_gg(m,l,o,n,p[g+15],14,-660478335);
                n=md5_gg(n,m,l,o,p[g+4],20,-405537848);
                o=md5_gg(o,n,m,l,p[g+9],5,568446438);
                l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);
                m=md5_gg(m,l,o,n,p[g+3],14,-187363961);
                n=md5_gg(n,m,l,o,p[g+8],20,1163531501);
                o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);
                l=md5_gg(l,o,n,m,p[g+2],9,-51403784);
                m=md5_gg(m,l,o,n,p[g+7],14,1735328473);
                n=md5_gg(n,m,l,o,p[g+12],20,-1926607734);
                o=md5_hh(o,n,m,l,p[g+5],4,-378558);
                l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);
                m=md5_hh(m,l,o,n,p[g+11],16,1839030562);
                n=md5_hh(n,m,l,o,p[g+14],23,-35309556);
                o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);
                l=md5_hh(l,o,n,m,p[g+4],11,1272893353);
                m=md5_hh(m,l,o,n,p[g+7],16,-155497632);
                n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);
                o=md5_hh(o,n,m,l,p[g+13],4,681279174);
                l=md5_hh(l,o,n,m,p[g+0],11,-358537222);
                m=md5_hh(m,l,o,n,p[g+3],16,-722521979);
                n=md5_hh(n,m,l,o,p[g+6],23,76029189);
                o=md5_hh(o,n,m,l,p[g+9],4,-640364487);
                l=md5_hh(l,o,n,m,p[g+12],11,-421815835);
                m=md5_hh(m,l,o,n,p[g+15],16,530742520);
                n=md5_hh(n,m,l,o,p[g+2],23,-995338651);
                o=md5_ii(o,n,m,l,p[g+0],6,-198630844);
                l=md5_ii(l,o,n,m,p[g+7],10,1126891415);
                m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);
                n=md5_ii(n,m,l,o,p[g+5],21,-57434055);
                o=md5_ii(o,n,m,l,p[g+12],6,1700485571);
                l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);
                m=md5_ii(m,l,o,n,p[g+10],15,-1051523);
                n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);
                o=md5_ii(o,n,m,l,p[g+8],6,1873313359);
                l=md5_ii(l,o,n,m,p[g+15],10,-30611744);
                m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);
                n=md5_ii(n,m,l,o,p[g+13],21,1309151649);
                o=md5_ii(o,n,m,l,p[g+4],6,-145523070);
                l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);
                m=md5_ii(m,l,o,n,p[g+2],15,718787259);
                n=md5_ii(n,m,l,o,p[g+9],21,-343485551);
                o=safe_add(o,j);
                n=safe_add(n,h);
                m=safe_add(m,f);
                l=safe_add(l,e);
            }

            return Array(o,n,m,l);
        }

        function md5_cmn(h,e,d,c,g,f){
            return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d);
        }

        function md5_ff(g,f,k,j,e,i,h){
            return md5_cmn((f&k)|((~f)&j),g,f,e,i,h);
        }

        function md5_gg(g,f,k,j,e,i,h){
            return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h);
        }

        function md5_hh(g,f,k,j,e,i,h){
            return md5_cmn(f^k^j,g,f,e,i,h);
        }

        function md5_ii(g,f,k,j,e,i,h){
            return md5_cmn(k^(f|(~j)),g,f,e,i,h);
        }

        function safe_add(a,d){
            var c=(a&65535)+(d&65535);
            var b=(a>>16)+(d>>16)+(c>>16);

            return(b<<16)|(c&65535);
        }

        function bit_rol(a,b){
            return(a<<b)|(a>>>(32-b));
        }

        return md5;
    })();

    var browserInfo = (function(){
        var ua = window.navigator.userAgent.toLowerCase(),
            rwebkit = /(webkit)[ \/]([\w.]+)/,
            ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            rmsie = /(msie) ([\w.]+)/,
            rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
            match = rwebkit.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [],
            _browser = {
                browser: match[1] || "",
                version: match[2] || "0"
            },
            self = function(){};

        self.prototype.getBrowser = function(){
            return _browser;
        }

        return new self();
    })();

    var _cookie = function(name, value, options){
        if (typeof value != 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain
                ? '; domain=' + (options.domain.replace(/.+[\.]*104(.*)(\.com\.tw)$/gm, '.104$1$2'))
                : '; domain=' + window.location.hostname.replace(/.+[\.]*104(.*)(\.com\.tw)$/gm, '.104$1$2');
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = _trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };

    var domain = (function(){
        var i=0,domain=document.domain,p=domain.split('.'),s='_gd'+(new Date()).getTime();
        while(i<(p.length-1) && document.cookie.indexOf(s+'='+s)==-1){
            domain = p.slice(-1-(++i)).join('.');
            document.cookie = s+"="+s+";domain="+domain+";";
        }
        document.cookie = s+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+domain+";";
        return domain;
    })();

    var EmptyState = (function(){
        var self = function(){};

        self.prototype.getState = function(ParamContent){
            var paramObj = ParamContent.getParamObj();
            if(!paramObj){
                return false;
            }else{
                ParamContent.setMyState(new LusState());
                return ParamContent.getState();
            }
        };

        return self;
    })();

    var LusState = (function(){
        /*jshint sub: true*/
        var self = function(){};

        self.prototype.getState = function(ParamContent){
            var paramObj = ParamContent.getParamObj();
            if(!paramObj['lus']){
                return false;
            }else{
                ParamContent.setMyState(new LucState());
                return ParamContent.getState();
            }
        };

        return self;
    })();

    var LucState = (function(){
        /*jshint sub: true*/
        var self = function(){};

        self.prototype.getState = function(ParamContent){
            var paramObj = ParamContent.getParamObj();
            if(!paramObj['luc']){
                return false;
            }else{
                ParamContent.setMyState(new LuauidState());
                return ParamContent.getState();
            }
        };

        return self;
    })();

    var LuauidState = (function(){
        /*jshint sub: true*/
        var self = function(){};

        self.prototype.getState = function(ParamContent){
            var paramObj = ParamContent.getParamObj();
            if(!paramObj['luauid']){
                return false;
            }else{
                ParamContent.setMyState(new LuaState());
                return ParamContent.getState();
            }
        };

        return self;
    })();

    var LuaState = (function(){
        /*jshint sub: true*/
        var self = function(){};

        self.prototype.getState = function(ParamContent){
            var paramObj = ParamContent.getParamObj();
            if(!paramObj['lua']){
                return false;
            }else{
                return true;
            }
        };

        return self;
    })();

    var ParamContent = (function(){
        var paramObj = null;
        var myState = null;

        var self = function(paramObj){
            var myself = this;

            myself.getParamObj = function(){
                return paramObj;
            };

            myself.setParamObj = function(paramObjTemp){
                paramObj = paramObj;
            };

            myself.getMyState = function(){
                return myState;
            };

            myself.setMyState = function(stateTemp){
                myState = stateTemp;
            };

            myself.getState = function(){
                return myself.getMyState().getState(myself);
            };

            function __construct(paramObj){
                myself.setParamObj(paramObj);
                myself.setMyState(new EmptyState());
            }

            __construct(paramObj);
        };

        return self;
    })();

    var CookieUtil = _extend({
        getCookieName : function(){
            return _cookieName;
        },
        setCookieName : function(cookieName){
            _cookieName = cookieName;
        },
        getValue : function(cookieName){
            var cookieValue = _cookie(cookieName);

            if(cookieValue !== null && cookieValue !== '""'  && cookieValue !== "''" && cookieValue !== '%22%22'){
                return cookieValue;
            }

            return null;
        },
        getCookie : function(cookieName){
            var resultCookie = {};

            if(cookieName !== undefined){
                resultCookie[cookieName] = CookieUtil.getValue(cookieName);
            }else{
                var cookieSetting = CookieUtil.getCookieName();

                if(cookieSetting !== null){
                    for(var i = 0; i < cookieSetting.length; i++){
                        var cookieNameItem = cookieSetting[i];
                        resultCookie[cookieNameItem] = CookieUtil.getValue(cookieNameItem);
                    }
                }
            }

            return resultCookie;
        },
        setCookie : function(cookieName,path,value,time){
            if (CookieUtil.getCookie(cookieName) !== null) {
                document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            }
            _cookie(cookieName, value, {path:'/',expires:720});
        }
    });

    var LupMaker = _extend({
        makeNewLup : function(logFormat){
            var newLup = [];

            CookieUtil.setCookieName(['luauid','lup','lunp']);
            var cookieArray = CookieUtil.getCookie();

            if(cookieArray['lup'] === null){
                cookieArray['lup'] = '...';
            }

            var lup = cookieArray['lup'].split('.');
            var luauid = cookieArray['luauid'];
            var lunp = cookieArray['lunp'];
            var url = (logFormat['lus'] !== undefined) && (logFormat['lus']['sourcepage'] !== undefined)?logFormat['lus']['sourcepage']:'';

            var urlAry = '';
            var host = '';
            var hostHash = 0;
            var subPath = '';
            var subPathHash = 0;

            if(url !== ''){
                urlAry = url.replace(/http\:\/\//,'').split('/');
                host = urlAry[0];
                hostHash = LupMaker.urlToHash(host);
                subPath = urlAry.slice(1,(urlAry.length-1)).join('');
                subPathHash = LupMaker.urlToHash(subPath);
            }

            var cookieTime = 60*60*24*365*2;

            //luauid
            if(lup[0] !== undefined && lup[0] !== ''){
                newLup[0] = lup[0];
            }else{
                if(luauid === null){
                    newLup[0] = Math.round(Math.random() * 2147483647);
                }else{
                    newLup[0] = luauid;
                }
            }

            //luc && lurrc
            if(lup[2] !== undefined && lup[2] !== '')
            {
                if(lup[2] == subPathHash)
                {
                    newLup[1] = lup[1];
                    newLup[2] = lup[2];
                    updateViewCnt = false;
                }
                else
                {
                    newLup[1] = lup[2];
                    newLup[2] = subPathHash;
                    updateViewCnt = true;
                }
            }
            else
            {
                if(lunp === null)
                {
                    newLup[1] = newLup[2] = subPathHash;
                    updateViewCnt = true;
                }
                else
                {
                    if(lunp == subPathHash)
                    {
                        newLup[1] = newLup[2] = subPathHash;
                        updateViewCnt = true;
                    }
                    else
                    {
                        newLup[1] = lunp;
                        newLup[2] = subPathHash;
                        updateViewCnt = false;
                    }
                }
            }

            //cnt
            if(lup[3] !== undefined && lup[3] !== '')
            {
                if(lup[2] == subPathHash)
                {
                    if(updateViewCnt === true){
                        var thisCnt = parseInt(lup[3]);
                        newLup[3] = thisCnt + 1;
                    }else{
                        var thisCnt = parseInt(lup[3]);
                        newLup[3] = thisCnt;
                    }
                }
                else
                {
                    newLup[3] = 1;
                }
            }
            else
            {
                newLup[3] = 1;
            }

            //host
            if(lup[4] !== undefined && lup[4] !== '')
            {
                newLup[4] = lup[4];
            }
            else
            {
                newLup[4] = hostHash;
            }

            var cookieStr = newLup.join('.');
            CookieUtil.setCookie('lup','/',cookieStr,cookieTime);
            CookieUtil.setCookie('luauid','/',newLup[0],cookieTime);
            CookieUtil.setCookie('lunp','/',newLup[2],cookieTime);

            return newLup;
        },
        urlToHash : function(str){
            var hash = 0;
            var val = _md5(str);

            for(var i = 0; i < val.length; i++){
                var word = val[i];

                if(typeof word === 'undefined'){
                    word = val.charAt(i);
                }

                hash += word.charCodeAt(0);
            }

            hash = hash*2147483647;

            return hash;
        }
    });

    var ParamUtil = _extend(LupMaker, {
        getUrlToLus : function(logFormat,param){

            var url = param["url"];

            if(url !== undefined){
                var lus = url.split('?');

                logFormat['lus'] = {
                    'sourcepage' : lus[0],
                    'querystring' : (lus[1] !== undefined)?lus[1]:''
                };
            }

            return logFormat;
        },
        getRefToLur : function(logFormat,param){

            var url = document.referrer;

            if(url !== undefined){
                var lur = url.split('?');

                logFormat['lur'] = {
                    'referrer' : lur[0],
                    'querystring' : (lur[1] !== undefined)?lur[1]:''
                };
            }

            return logFormat;
        },
        getActToLua : function(logFormat,param){
            if(param["web"] !== undefined && param["track"] !== undefined){
                var lua = param["track"];

                logFormat['lua'] = {
                    'track_action' : lua[0],
                    'websource' : param['web']
                };
            }

            return logFormat;
        },
        getExtToLue : function(logFormat,param){
            var lue = param["ext"];

            if(lue !== undefined){
                logFormat['lue'] = lue;
            }else{
                logFormat['lue'] = {};
            }

            logFormat['luf'] = 'js';
            logFormat['lue']['pkey'] = '';
            var keyAry = _logSetting.TRACK_ACTION.split(',');
            var track = param['track'];

            for(var i = 0; i < keyAry.length; i++)
            {
                var value = keyAry[i];
                if(track[0] === value && track[1] !== undefined && track[1] !== '')
                {
                    logFormat['lue']['pkey'] = track[1];
                }
            }

            return logFormat;
        },
        getIdckToLuidck : function(logFormat,param){
            var cookieArray = CookieUtil.getCookie(_logSetting.ID_CK);
            var idck = cookieArray[_logSetting.ID_CK];

            if(idck !== null){
                logFormat['luidck'] = idck;
            }else{
                logFormat['luidck'] = '';
            }

            return logFormat;
        },
        getGcidToLugcid : function(logFormat,param){
            var cookieArray = CookieUtil.getCookie('_ga');
            var gcid = cookieArray['_ga'];

            if(gcid !== null){
                logFormat['lugcid'] = gcid.replace(/^GA.+\.(\S+)\.(\S+)$/gm, '$1.$2');;
            }else{
                logFormat['lugcid'] = '';
            }

            return logFormat;
        },
        getEpkToLuepk : function(logFormat,param){
            var cookieArray = CookieUtil.getCookie(_logSetting.EPK);
            var epk = cookieArray[_logSetting.EPK];

            if(epk !== null){
                logFormat['luepk'] = epk;
            }else{
                logFormat['luepk'] = '';
            }

            return logFormat;
        },
        getEpkbToLuepkb : function(logFormat,param){
            var cookieArray = CookieUtil.getCookie(_logSetting.EPKB);
            var epkb = cookieArray[_logSetting.EPKB];

            if(epkb !== null){
                logFormat['luepkb'] = epkb;
            }else{
                logFormat['luepkb'] = '';
            }

            return logFormat;
        },
        getPathToLup : function(logFormat,param){
            var newLup = ParamUtil.makeNewLup(logFormat);
            logFormat['luauid'] = newLup[0];
            logFormat['lurrc'] = newLup[1];
            logFormat['luc'] = newLup[2];
            logFormat['luv'] = newLup[3];

            return logFormat;
        },
        getBrowserTypeToLub : function(logFormat){
            var _browserInfo = browserInfo.getBrowser();

            if(_browserInfo['browser']){
                logFormat['lub'] = _browserInfo['browser'] + "/" + _browserInfo['version'];
            }

            return logFormat;
        }
    });

    var LogService = _extend({
        encode : function(paramValue){
            if(_type(paramValue) !== "string"){
                var json = JSON.stringify(paramValue);
                return encodeURIComponent(json);
            }else{
                return paramValue;
            }
        },
        paramToLogFormat : function(param){
            var logFormat = {'lus':null,'lua':null,'lue':null};

            logFormat = ParamUtil.getUrlToLus(logFormat,param);
            logFormat = ParamUtil.getRefToLur(logFormat,param);
            logFormat = ParamUtil.getActToLua(logFormat,param);
            logFormat = ParamUtil.getExtToLue(logFormat,param);
            logFormat = ParamUtil.getIdckToLuidck(logFormat,param);
            logFormat = ParamUtil.getGcidToLugcid(logFormat,param);
            logFormat = ParamUtil.getEpkToLuepk(logFormat,param);
            logFormat = ParamUtil.getEpkbToLuepkb(logFormat,param);
            logFormat = ParamUtil.getPathToLup(logFormat,param);
            logFormat = ParamUtil.getBrowserTypeToLub(logFormat,param);

            return logFormat;
        },
        isParamObjLegitimacy : function(logFormat){
            var paramState = new ParamContent(logFormat);
            return paramState.getState();
        },
        logFormatToUrl : function(logFormat){
            var url = '';

            for(var key in logFormat){
                var paramValue = logFormat[key];
                var valueEncode = LogService.encode(paramValue);

                if(valueEncode !== ''){
                    url += (url?'&':'') + key + '=' + valueEncode;
                }
            }

            url += (url?'&':'') + 'lut=' + new Date().getTime()

            return url;
        },
        sendByTag : function(url,tag){
            if(tag === 'script'){
                var head = document.getElementsByTagName("head")[0];
                var script=document.createElement('script');
                script.id='log';
                script.type="text/javascript";
                script.src=url;
                script.onload=script.onreadystatechange=function(){if(this.readyState && this.readyState=="loading"){return;}else{head.removeChild(script);}};
                script.onerror=function(){head.removeChild(script);};
                head.appendChild(script);
            }else{
                var image = new Image();
                image.src = url;
            }
        },
        regInterval : function(callback){
            window.setInterval(function(){
                callback.call(this);
            },_logSetting.TIMEOUT);
        },
        regOnLoad : function(){
            if(window._elog && _type(_elog) === 'array' && _elog.length > 0){
                try{
                    var _clientInfo = _elogToClientInfo(_elog.shift());

                    LogService.log({
                        url : _clientInfo.url,
                        web : _clientInfo.web,
                        track : _clientInfo.track,
                        ext : _clientInfo.ext,
                        callback :  _clientInfo.callback
                    });
                }catch(e){}
            }
        },
        regOnUnload : function(callback){
            if (window.addEventListener){
                window.addEventListener('beforeunload', callback, false);
            }else if(window.attachEvent){
                window.attachEvent('onbeforeunload',callback);
            }
        },
        getQueueToLog : function(){
            if(window._elog && _type(_elog) === 'array' && _elog.length > 0){
                try{
                    for(var i = 0; i < _elog.length; i++){
                        var _clientInfo = _elogToClientInfo(_elog[i]);

                        LogService.log({
                            url : _clientInfo.url,
                            web : _clientInfo.web,
                            track : _clientInfo.track,
                            ext : _clientInfo.ext,
                            callback :  _clientInfo.callback
                        });
                    }
                }catch(e){}
            }
            window._elog = [];
        },
        log : function(paramAry){
            if(!paramAry){
                return false;
            }

            if(!paramAry.url){
                return false;
            }

            try{
                var logFormat = LogService.paramToLogFormat(paramAry);

                if(LogService.isParamObjLegitimacy(logFormat) === false){
                    throw ERROR;
                }

                var logFormatToUrl = LogService.logFormatToUrl(logFormat);
                var mainUrl = _logSetting.SERVER_PATH + '?' + logFormatToUrl;

                if(mainUrl !== undefined && mainUrl.length > 4000){
                    throw new Error('Data Too Large.');
                }

                LogService.sendByTag(mainUrl);

                if(paramAry.callback){
                    paramAry.callback();
                }

                return true;
            }catch(e){
                if(_logSetting.DEBUG){
                    console.log(e);
                }

                if(paramAry.callback){
                    paramAry.callback();
                }

                return false;
            }
        },
        init: function(setting){
            for(var i=0, typeAry = "Boolean Number String Function Array Date RegExp Object".split(" "); i < typeAry.length;i++){
                class2type["[object " + typeAry[i] + "]"] = typeAry[i].toLowerCase();
            }

            _extend(_logSetting,setting);

            LogService.regOnLoad();
            LogService.regInterval(LogService.getQueueToLog);
            LogService.regOnUnload(LogService.getQueueToLog);
        }
    });

    var logServerPath = (/(\.e104|\.s104|\.104\-dev|\.104dc\-dev)\.com\.tw|(localhost|^10\.102\.|^127\.0\.0\.1)/.test(location.host))
                            ? '//uts.104-dev.com.tw/log/send'
                            : ((/(\.104\-staging|\.104dc\-staging)\.com\.tw/.test(location.host))
                                ? '//uts.104-staging.com.tw/log/send'
                                : '//uts.104.com.tw/log/send'
                            );
    LogService.init({
        DEBUG : true,
        SERVER_PATH : logServerPath,
        ID_CK : 'ID_CK',
        EPK : 'EPK',
        EPKB : 'EPKB',
        TRACK_ACTION :
            'viewIndex,viewJoblist,viewJob,viewCustlist,viewCust,applyJob,saveJob,' +
            'viewActivityList,viewActivity',
        WEB_SOURCE :
            '104_i=>jb/104i,' +
            '104_bank=>jobbank'
    });
})();
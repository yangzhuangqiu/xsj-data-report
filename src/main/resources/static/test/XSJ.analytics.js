(function(win, doc){
	
	var debug = true;
	
	var log = function(obj){
		if(debug){
			console.log(obj);
		}
		
	};
	
	var O = win, M = doc;
	
	
	
	//====================================start by shadow_====================================
	
	
	//====================================配置项:start====================================
	var configName = "XSJAnalyticsConfig";
	var cookiePrefix = "XA1";
	//====================================配置项:end====================================
	
	
	
	
	
	//====================================辅助方法 start====================================
	
	//Ba
	var isForceSSL = !1;
	
	//Ud
	var isHttps = function() {
        return "https:" == M.location.protocol
    },
	//参数是否函数,ea
	isFunction = function(a) {
        return "function" == typeof a
    },
	//参数是否数组,ka
	isArray = function(a) {
        return "[object Array]" == Object.prototype.toString.call(Object(a))
    },
	//参数是否字符串,qa
    isString = function(a) {
        return void 0 != a && -1 < (a.constructor + "").indexOf("String")
    },
	//左右去空格,sa
	trim = function(a) {
        return a ? a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") : ""
    };
	
	//检验方法：
	var isNotValidateName = function(name) {
        return 0 <= name.indexOf(".") || 0 <= name.indexOf(":")
    };
	
	//生成参数对象//za函数:将创建参数整合成对象{name:"xx",trackingId:"",cookieDomain:""}
	var generateOptions = function(a, b) {
        if (1 == b.length && null != b[0] && "object" === typeof b[0]) return b[0];
        for (var c = {}, d = Math.min(a.length + 1, b.length), e = 0; e < d; e++) if ("object" === typeof b[e]) {
            for (var g in b[e]) b[e].hasOwnProperty(g) && (c[g] = b[e][g]);
            break
        } else e < a.length && (c[a[e]] = b[e]);
        return c
    };
	//ua
	var emptyFunc = function() {};
	
	//P->getStringProperty
	var getStringProperty = function(a, b) {
        var c = a.get(b);
        return void 0 == c ? "": "" + c
    },
	//R 
	getNumberProperty = function(a, b) {
        var c = a.get(b);
        return void 0 == c || "" === c ? 0 : 1 * c
    };
	
	//K
	var encURI = function(a) {
        if (encodeURIComponent instanceof Function) return encodeURIComponent(a);
        
        return a
    };
	//Ca
	var getCookie = function(a) {
        var b = [],
        c = doc.cookie.split(";");
        a = new RegExp("^\\s*" + a + "=\\s*(.*?)\\s*$");
        for (var d = 0; d < c.length; d++) {
            var e = c[d].match(a);
            e && b.push(e[1])
        }
        return b
    },
	//zc name, value, expires, path, domain, secure//确保写入->,没有写入返回0
	setCookie = function(name, value, path, domain, trackingId, expires) {
       
        value && 1200 < value.length && (value = value.substring(0, 1200));
        path = name + "=" + value + "; path=" + path + "; ";
        expires && (path += "expires=" + (new Date((new Date).getTime() + expires)).toGMTString() + "; ");
        domain && "none" != domain && (path += "domain=" + domain + ";");
        var d = doc.cookie;
        doc.cookie = path;
        if (! (d = d != doc.cookie)) tag: {
            name = getCookie(name);
            for (d = 0; d < name.length; d++) if (value == name[d]) {
                d = !0;
                break tag
            }
            d = !1
        }
        return d
    };
	
	//Cc
	var replaceParenthesis = function(a) {
        return encURI(a).replace(/\(/g, "%28").replace(/\)/g, "%29")
    };
	
	var La = function(a) {
        var b = 1,
        c, d;
        if (a) for (b = 0, d = a.length - 1; 0 <= d; d--) c = a.charCodeAt(d),
        b = (b << 6 & 268435455) + c + (c << 14),
        c = b & 266338304,
        b = 0 != c ? b ^ c >> 21 : b;
        return b
    };
	//hd
	var getRandomByMathRound = function() {
        return Math.round(2147483647 * Math.random())
    },
	//Bd
    getRandom = function() {
        try {
            var a = new Uint32Array(1);
            win.crypto.getRandomValues(a);
            return a[0] & 2147483647
        } catch(b) {
            return getRandomByMathRound()
        }
    };
	
	//lc
	var trimFirstDot = function(a) {
        return 0 == a.indexOf(".") ? a.substr(1) : a
    },
	//kc 确保格式为：/a/b/c
	getPath = function(a) {
        if (!a) return "/";
        1 < a.length && a.lastIndexOf("/") == a.length - 1 && (a = a.substr(0, a.length - 1));
        0 != a.indexOf("/") && (a = "/" + a);
        return a
    },
	//jc 获取路径深度：/a/b/c -> 4,/->1
	getDeepByPath = function(path) {
        path = getPath(path);
        return "/" == path ? 1 : path.split("/").length
    };
	//====================================辅助方法 end====================================
	
	
	
	
	
	//====================================数据收集方法:start====================================
	//xa
	var getHostName = function() {
        var a = "" + doc.location.hostname;
        return 0 == a.indexOf("www.") ? a.substring(4) : a
    },
	//ya
	getReferrer = function(a) {
        var b = M.referrer;
		
        if (/^https?:\/\//i.test(b)) {
            //if (a) return b;
            //a = "//" + M.location.hostname;
            //var c = b.indexOf(a);
            //if (5 == c || 6 == c) if (a = b.charAt(c + a.length), "/" == a || "?" == a || "" == a || ":" == a) return;
            return b;
        }
    },
	//fc
	getFlashVersion = function () {
        var a, b, c;
        if ((c = (c = O.navigator) ? c.plugins: null) && c.length) for (var d = 0; d < c.length && !b; d++) {
            var e = c[d]; - 1 < e.name.indexOf("Shockwave Flash") && (b = e.description)
        }
        if (!b) try {
            a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),
            b = a.GetVariable("$version")
        } catch(g) {}
        if (!b) try {
            a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),
            b = "WIN 6,0,21,0",
            a.AllowScriptAccess = "always",
            b = a.GetVariable("$version")
        } catch(g) {}
        if (!b) try {
            a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),
            b = a.GetVariable("$version")
        } catch(g) {}
        b && (a = b.match(/[\d]+/g)) && 3 <= a.length && (b = a[0] + "." + a[1] + " r" + a[2]);
        return b || void 0
    };
	//====================================数据收集方法:end====================================
	
	
	
	
	
	
	//====================================数据存储模型 start====================================
	
	//数据存储
	var dataStore = function() {
        this.keys = [];
        this.values = {};
        this.m = {}
    }; dataStore.prototype.set = function(key, value, c) {
        this.keys.push(key);
        c ? this.m[":" + key] = value: this.values[":" + key] = value
    }; dataStore.prototype.get = function(key) {
        return this.m.hasOwnProperty(":" + key) ? this.m[":" + key] : this.values[":" + key]
    }; dataStore.prototype.map = function(a) {//a为函数，将所有key-value交给函数a处理
        for (var i = 0; i < this.keys.length; i++) {
            var key = this.keys[i],
            fieldInstance = this.get(key);
            fieldInstance && a(key, fieldInstance);
        }
    };	
	
	//字段模型 bb(名字，别名，默认值，getFunction，setFunction)
	var fieldModel = function(_name, _alias, _defaultValue, _getFunc, _setFunc) {
        this.name = _name;
        this.alias = _alias;//F
		this.defaultValue = _defaultValue;
		this.getFunc = _getFunc;//Z
        this.setFunc = _setFunc;//o
    };
	
	//全局默认数据存储实例(字段名->字段模型) Qa
	var dataStoreInstance = new dataStore;
	//$a
	var getValueInDataStoreInstance = function(key) {
        var b = dataStoreInstance.get(key);
        return b
    };
	
	//ab
	var setToDataWrapper = function(dataWrapper, key, value, d) {
        var e = getValueInDataStoreInstance(key);
        e && e.setFunc ? e.setFunc(dataWrapper, key, value, d) : dataWrapper.data.set(key, value, d)
    };
	
	//Ya
	var DataWrapper = function() {
        this.data = new dataStore
    }; 
	DataWrapper.prototype.get = function(a) {
        var b = getValueInDataStoreInstance(a),
        c = this.data.get(a);
        b && void 0 == c && (c = isFunction(b.defaultValue) ? b.defaultValue() : b.defaultValue);
        return b && b.getFunc ? b.getFunc(this, a, c) : c
    };
    DataWrapper.prototype.set = function(key, value, c) {
        if (key) if ("object" == typeof key) for (var d in key) key.hasOwnProperty(d) && setToDataWrapper(this, d, key[d], c);
        else setToDataWrapper(this, key, value, c)
    };
	
	
	var Filters = function() {
        this.M = []
    }; Filters.prototype.add = function(a) {
        this.M.push(a)
    }; Filters.prototype.D = function(a) {
        try {
            for (var b = 0; b < this.M.length; b++) {
                var c = a.get(this.M[b]);
                c && isFunction(c) && c.call(win, a)
            }
        } catch(d) {}
        b = a.get(param_hitCallback);
        b != emptyFunc && isFunction(b) && (a.set(param_hitCallback, emptyFunc, !0), setTimeout(b, 10))
    };
	
	//====================================数据存储模型 end====================================
	

	
	//====================================校验方法 start====================================
	//TODO 理解优化
	var Ma = function (a) {
        //if (G(P(a, Na))) throw "abort";Na->param_trackingId
    },
	//cd
	previewTaskFunc = function () {
        if (win.navigator && "preview" == win.navigator.loadPurpose) throw "abort";
    },
	//Oa
	checkProtocolTaskFunc = function () {
        var a = doc.location.protocol;
        if ("http:" != a && "https:" != a) throw "abort";
    },
	//vb
	validationTaskFunc = function (a) {
		if (!a.get(param_appId)) throw "abort";
        if (!a.get(param_trackingId)) throw "abort";
    },
	
	
	//nd
	generateCookieValue = function(a) {
        var b = replaceParenthesis(getStringProperty(a, param_clientId)),
        c = trimFirstDot(getStringProperty(a, param_cookieDomain)).split(".").length;
        a = getDeepByPath(getStringProperty(a, param_cookiePath));
        1 < a && (c += "-" + a);
        return [cookiePrefix, c, b].join(".")
    };
	//setCookie = function(name, value, path, domain, trackingId, expires)
	//hc->hasSetTrackerCookieValue,mc->setTrackerCookieValue
	var hasSetTrackerCookieValue = !1, setTrackerCookieValue = function(a) {
        if ("cookie" == getStringProperty(a, param_storage)) {
            var name = getStringProperty(a, param_cookieName),
            value = generateCookieValue(a),
			
            path = getPath(getStringProperty(a, param_cookiePath)),
            domain = trimFirstDot(getStringProperty(a, param_cookieDomain)),
            expires = 1E3 * getNumberProperty(a, param_cookieExpires),
            trackingId = getStringProperty(a, param_trackingId);
            if ("auto" != domain) setCookie(name, value, path, domain, trackingId, expires) && (hasSetTrackerCookieValue = !0);
            else {
                
                var l;
                tag: {
                    value = [];
                    e = getHostName().split(".");
                    if (4 == e.length && (l = e[e.length - 1], parseInt(l, 10) == l)) {
                        l = ["none"];
                        break tag
                    }
                    for (l = e.length - 2; 0 <= l; l--) value.push(e.slice(l).join("."));
                    value.push("none");
                    l = value
                }
                for (var k = 0; k < l.length; k++) if (e = l[k], a.data.set(param_cookieDomain, e), value = generateCookieValue(a), setCookie(name, value, path, e, trackingId, expires)) {
                    hasSetTrackerCookieValue = !0;
                    return
                }
                a.data.set(param_cookieDomain, "auto")
            }
        }
    },
	//nc
	checkStorageTaskFunc = function(a) {
        if ("cookie" == getStringProperty(a, param_storage) && !hasSetTrackerCookieValue && (setTrackerCookieValue(a), !hasSetTrackerCookieValue)) throw "abort";
    };
	
	
	//oc->getReportUrl,r->report,c->collect/client
	var getReportUrl = function() {
		return "http://data.xoyo.com/r/c";
    };
	

	//Pa->buildHitTaskFunc
	var buildHitTaskFunc = function (a) {
        var b = [];
        dataStoreInstance.map(function(key, d) {
            if (d.alias) {
                var e = a.get(key);
                void 0 != e && e != d.defaultValue && ("boolean" == typeof e && (e *= 1), b.push(d.alias + "=" + encURI("" + e)))
            }
        });
        b.push("z=" + getRandom());
        a.set(param_hitPayload, b.join("&"), !0)
    },
	
	//Sa->sendHitTaskFunc
	sendHitTaskFunc = function (a) {
		//上报url
        var b = getStringProperty(a, param_transportUrl) || getReportUrl(),
        c = getStringProperty(a, param_transport); ! c && a.get(param_useBeacon) && (c = "beacon");
        if (c) {
            var d = getStringProperty(a, param_hitPayload),
            e = a.get(param_hitCallback),
            e = e || emptyFunc;//ua->emptyFunc
            "image" == c ? reportByImg(b, d, e) : "xhr" == c && reportByAjax(b, d, e) || "beacon" == c && reportByBeancon(b, d, e) || reportByAuto(b, d, e)
        } else {
			reportByAuto(b, getStringProperty(a, param_hitPayload), a.get(param_hitCallback));
		}

        a.set(param_hitCallback, emptyFunc, !0)
    },
	
	
	//ta
	createImgElement = function(a) {
        var b = M.createElement("img");
        b.width = 1;
        b.height = 1;
        b.src = a;
        return b
    },
	Da = function(a) {
        this.name = "len";
        this.message = a + "-8192"
    },
	//ba
    reportByAuto = function(a, b, c) {
        c = c || emptyFunc;
        if (2036 >= b.length) reportByImg(a, b, c);
        else if (8192 >= b.length) reportByBeancon(a, b, c) || reportByAjax(a, b, c) || reportByImg(a, b, c);
        else throw reportError("len", b.length),
        new Da(b.length);
    },
	//wc
    reportByImg = function(a, b, c) {
        var d = createImgElement(a + "?" + b);
        d.onload = d.onerror = function() {
            d.onload = null;
            d.onerror = null;
            c()
        }
    },
	//wd
    reportByAjax = function(a, b, c) {
        var d = O.XMLHttpRequest;
        if (!d) return ! 1;
        var e = new d;
        if (! ("withCredentials" in e)) return ! 1;
        e.open("POST", a, !0);
        e.withCredentials = !0;
        e.setRequestHeader("Content-Type", "text/plain");
        e.onreadystatechange = function() {
            4 == e.readyState && (c(), e = null)
        };
        e.send(b);
        return ! 0
    },
	//x
    reportByBeancon = function(a, b, c) {
        return O.navigator.sendBeacon ? O.navigator.sendBeacon(a, b) ? (c(), !0) : !1 : !1
    },
	//ge
    reportError = function(a, b, c) {
        //1 <= 100 * Math.random() || G("?") || (a = ["t=error", "_e=" + a, "_v=j47", "sr=1"], b && a.push("_f=" + b), c && a.push("_m=" + K(c.substring(0, 100))), a.push("aip=1"), a.push("z=" + hd()), wc(oc() + "/collect", a.join("&"), ua))
    };
	
	
	//TODO
	Fd = function(a) {
        
    };
	
	//Jc->setClientId,a是dataWarpper
	var setClientId = function(a, b) {
        if ("cookie" == getStringProperty(a, param_storage)) {
            hasSetTrackerCookieValue = !1;
			
			var d = getCookie(getStringProperty(a, param_cookieName));
			//有_ga的cookie值，提取clientId
			if(d && !(1 > d.length)){
				
				c = [];
				for (var e = 0; e < d.length; e++) {
					var g;
					g = d[e].split(".");
					var ca = g.shift();
					(cookiePrefix == ca) && 1 < g.length ? (ca = g.shift().split("-"), 1 == ca.length && (ca[1] = "1"), ca[0] *= 1, ca[1] *= 1, g = {
						H: ca,
						s: g.join(".")
					}) : g = void 0;
					g && c.push(g)
				}

				//if (1 == c.length) {
                //}
				
				c = c[0].s;
				c && (a.data.set(param_clientId, c), hasSetTrackerCookieValue = !0)
			}else{
				
				c = win.navigator.userAgent + (doc.cookie ? doc.cookie: "") + (doc.referrer ? doc.referrer: "");
				d = c.length;
				for (e = win.history.length; 0 < e;) c += e--^d++;
				a.data.set(param_clientId, [getRandomByMathRound() ^ La(c) & 2147483647, Math.round((new Date).getTime() / 1E3)].join("."))
			}
			
			setTrackerCookieValue(a);
		}
    },
	//Kc
    collect = function(a) {
        var b = win.navigator,
        c = win.screen,
        d = doc.location;
        a.set(param_referrer, getReferrer(a.get(param_alwaysSendReferrer)));
        if (d) {
            var e = d.pathname || "";
            "/" != e.charAt(0) && (e = "/" + e);
            a.set(param_location, d.protocol + "//" + d.hostname + e + d.search)
        }
        c && a.set(param_screenResolution, c.width + "x" + c.height);
        c && a.set(param_screenColors, c.colorDepth + "-bit");
        var c = M.documentElement,
        g = (e = M.body) && e.clientWidth && e.clientHeight,
        ca = [];
        c && c.clientWidth && c.clientHeight && ("CSS1Compat" === M.compatMode || !g) ? ca = [c.clientWidth, c.clientHeight] : g && (ca = [e.clientWidth, e.clientHeight]);
        c = 0 >= ca[0] || 0 >= ca[1] ? "": ca.join("x");
        a.set(param_viewportSize, c);
        a.set(param_flashVersion, getFlashVersion());
        a.set(param_encoding, M.characterSet || M.charset);
        a.set(param_javaEnabled, b && "function" === typeof b.javaEnabled && b.javaEnabled() || !1);
        a.set(param_language, (b && (b.language || b.browserLanguage) || "").toLowerCase());
        
    }; 
	
	//====================================校验方法 end====================================
	
	
	
	

	
	
	
	
	//====================================常量定义 start====================================
	
	var db = function() {};
	//由T,S定义的常量，存放在全局数据存储实例(dataStoreInstance)中
	//T函数
	var T = function(_name, _alias, _defaultValue) {
        return S(_name, _alias, _defaultValue, void 0, db)
    },
	
	//S函数
	S = function(_name, _alias, _defaultValue, _getFunc, _setFunc) {
        a = new fieldModel(_name, _alias, _defaultValue, _getFunc, _setFunc);
        dataStoreInstance.set(a.name, a);
        return a.name
    };
	
	var param_apiVersion = T("apiVersion", "v"), //hb->
	param_clientVersion = T("clientVersion", "_v");//ib->
	
	var param_adSenseId = S("adSenseId", "a"), //jb->
	param_hitType = S("hitType", "t"), //Va->
	param_hitCallback = S("hitCallback"), //Ia->
	param_hitPayload = S("hitPayload"); //Ra->
	
	//
	var param_location = S("location", "dl", ""), //kb->
	param_referrer = S("referrer", "dr"),//lb->
	param_page = S("page", "dp", ""); //mb->
	S("hostname", "dh", function(){return M.location.hostname});
	
	var param_language = S("language", "ul"), //nb->
	param_encoding = S("encoding", "de"); //ob->
	S("title", "dt",
    function() {
        return M.title || void 0
    });
	
	var param_screenColors = S("screenColors", "sd"), //pb->
	param_screenResolution = S("screenResolution", "sr"), //qb->
	param_viewportSize = S("viewportSize", "vp"), //rb->
	param_javaEnabled = S("javaEnabled", "je"), //sb->
	param_flashVersion = S("flashVersion", "fl"); //tb->
	
	var param__oot= T("_oot"), //Qb->
	param_previewTask = S("previewTask"), //dd->
	param_checkProtocolTask = S("checkProtocolTask"), //Rb->
	param_validationTask = S("validationTask"), //md->
	param_checkStorageTask = S("checkStorageTask"), //Sb->
	param_historyImportTask = S("historyImportTask"), //Uc->
	param_samplerTask = S("samplerTask"), //Tb->
	param__rlt = S("_rlt"), //Vb->
	param_buildHitTask = S("buildHitTask"), //Wb->
	param_sendHitTask = S("sendHitTask"), //Xb->
	param_ceTask = S("ceTask"), //Vc->
	param_devIdTask = S("devIdTask"), //zd->
	param_timingTask = S("timingTask"), //Cd->
	param_displayFeaturesTask = S("displayFeaturesTask"), //Ld->
	param_name = T("name"), //V->
	param_clientId = T("clientId", "cid"), //Q->
	param_clientIdTime = T("clientIdTime"), //n->
	param_userId = S("userId", "uid"), //Ad->
	param_appId = S("appId", "aid", ""),//
	param_trackingId = T("trackingId", "tid"), //Na->
	
	param_cookieName = T("cookieName", void 0, "_xa"), //U->
	param_cookieDomain = T("cookieDomain"), //W->
	param_cookiePath = T("cookiePath", void 0, "/"), //Yb->
	param_cookieExpires = T("cookieExpires", void 0, 63072E3), //Zb->
	param_legacyCookieDomain = T("legacyCookieDomain"), //$b->
	param_legacyHistoryImport = T("legacyHistoryImport", void 0, !0), //Wc->
	param_storage = T("storage", void 0, "cookie"), //ac->
	param_allowLinker = T("allowLinker", void 0, !1), //bc->
	param_allowAnchor = T("allowAnchor", void 0, !0), //cc->
	param_sampleRate = T("sampleRate", "sf", 100), //Ka->
	param_siteSpeedSampleRate = T("siteSpeedSampleRate", void 0, 1), //dc->
	param_alwaysSendReferrer = T("alwaysSendReferrer", void 0, !1), //ec->
	param_transportUrl = S("transportUrl"), //gd->
	param__r = S("_r", "_r");//Md->
	
	var param_useBeacon = S("useBeacon", void 0, !1), //Vd->
	param_transport = S("transport"); //fa->
	S("sessionControl", "sc", ""); 
	S("sessionGroup", "sg"); 
	S("queueTime", "qt");
	
	

	
	
	var param__s = S("_s", "_s");//Ac->
	
	
	
	
	
	
	
	var param_eventCategory = S("eventCategory", "ec"), //ub->
	param_eventAction = S("eventAction", "ea"), //xb->
	param_eventLabel = S("eventLabel", "el"), //yb->
	param_eventValue = S("eventValue", "ev"), //zb->
	param_socialNetwork = S("socialNetwork", "sn"), //Bb->
	param_socialAction = S("socialAction", "sa"), //Cb->
	param_socialTarget = S("socialTarget", "st"), //Db->
	param_timingCategory = S("timingCategory", "utc"), //Mb->
	param_timingVar = S("timingVar", "utv"), //Nb->
	param_timingLabel = S("timingLabel", "utl"), //Ob->
	param_timingValue = S("timingValue", "utt");//Pb->
	//====================================常量定义 end====================================
	
	
	
	
	
	
	
	//====================================跟踪器对象 start====================================
	
	var wb = /^(UA|YT|MO|GP)-(\d+)-(\d+)$/,
	//pc
	Tracker = function(options) {
        function setData(key, value) {
            d.dataWrapper.data.set(key, value)
        }
        function addFilter(key, value) {
            setData(key, value);
            d.filters.add(key)
        }
        var d = this;
        this.dataWrapper = new DataWrapper;
        this.filters = new Filters;
        setData(param_name, options[param_name]);
        setData(param_appId, trim(options[param_appId]));
		setData(param_trackingId, trim(options[param_trackingId]));
        setData(param_cookieName, options[param_cookieName]);
        setData(param_cookieDomain, options[param_cookieDomain] || "auto");//getHostName());
        setData(param_cookiePath, options[param_cookiePath]);
        setData(param_cookieExpires, options[param_cookieExpires]);
        setData(param_legacyCookieDomain, options[param_legacyCookieDomain]);
        setData(param_legacyHistoryImport, options[param_legacyHistoryImport]);
        setData(param_allowLinker, options[param_allowLinker]);
        setData(param_allowAnchor, options[param_allowAnchor]);
        setData(param_sampleRate, options[param_sampleRate]);
        setData(param_siteSpeedSampleRate, options[param_siteSpeedSampleRate]);
        setData(param_alwaysSendReferrer, options[param_alwaysSendReferrer]);
        setData(param_storage, options[param_storage]);
        setData(param_userId, options[param_userId]);
        setData(param_clientIdTime, options[param_clientIdTime]);
		setData(param_apiVersion, 1);
        setData(param_clientVersion, "j47");
        //addFilter(param__oot, Ma);
        addFilter(param_previewTask, previewTaskFunc);
        addFilter(param_checkProtocolTask, checkProtocolTaskFunc);
        addFilter(param_validationTask, validationTaskFunc);
        addFilter(param_checkStorageTask, checkStorageTaskFunc);
        //addFilter(param_historyImportTask, Yc);
        //addFilter(param_samplerTask, Ja);
        //addFilter(param__rlt, Ta);
        //addFilter(param_ceTask, Hc);
        //addFilter(param_devIdTask, yd);
        //addFilter(param_displayFeaturesTask, Sd);
        addFilter(param_buildHitTask, buildHitTaskFunc);
        addFilter(param_sendHitTask, sendHitTaskFunc);
        addFilter(param_timingTask, Fd(this));
        setClientId(this.dataWrapper, options[param_clientId]);
        collect(this.dataWrapper);
        //this.dataWrapper.set(jb, Lc());
        //bd(this.b.get(Na), this.b.get(W), this.b.get(Yb))
    };Tracker.prototype.get = function(a) {
        return this.b.get(a)
    };
    Tracker.prototype.set = function(a, b) {
        this.b.set(a, b)
    };
	//qc->sendType
	var sendType = {
        pageview: [param_page],//mb
        event: [param_eventCategory, param_eventAction, param_eventLabel, param_eventValue],
        social: [param_socialNetwork, param_socialAction, param_socialTarget],
        timing: [param_timingCategory, param_timingVar, param_timingValue, param_timingLabel]
    };
	
	Tracker.prototype.send = function(a) {
        if (! (1 > arguments.length)) {
            var b, c;
            "string" === typeof arguments[0] ? (b = arguments[0], c = [].slice.call(arguments, 1)) : (b = arguments[0] && arguments[0][param_hitType], c = arguments);
            b && (c = generateOptions(sendType[b] || [], c), c[param_hitType] = b, this.dataWrapper.set(c, void 0, !0), this.filters.D(this.dataWrapper), this.dataWrapper.data.m = {})
        }
    };
	//ma
    Tracker.prototype.requireSync = function(a, b) {
        
    };
	//====================================跟踪器对象 end====================================
	
	
	//====================================执行引擎 start====================================
	
	//获取执行队列
	var xaObjName = win[configName] || "xa";
	
	//定义好engine
	var engine = function(){
		
		Z.D.apply(Z, [arguments])
		
	};
	
	engine.trackerMap = {}; //h
	engine.trackerArray = []; //P
	engine.time = 0; 
	engine.answer = 42;
	//createParams = [param_trackingId, param_cookieDomain, param_name]; //
    var createParams = [param_appId, param_trackingId, param_name]; engine.create = function(a) {
        var b = generateOptions(createParams, [].slice.call(arguments));
        b[param_name] || (b[param_name] = "t0");
        var c = "" + b[param_name];
        if (engine.trackerMap[c]) return engine.trackerMap[c];
        b = new Tracker(b);
        engine.trackerMap[c] = b;
        engine.trackerArray.push(b);
        return b
    }; engine.remove = function(a) {
        for (var b = 0; b < engine.trackerArray.length; b++) if (engine.trackerArray[b].get(param_name) == a) {
            engine.trackerArray.splice(b, 1);
            engine.trackerMap[a] = null;
            break
        }
    }; engine.getByName = function(a) {
        return engine.trackerMap[a]
    }; engine.getAll = function() {
        return engine.trackerArray.slice(0)
    };
    engine.start = function() {
        var a = win[xaObjName];
        if (!a || 42 != a.answer) {
            engine.time = a && a.l;
            engine.loaded = !0;
            var b = win[xaObjName] = engine;
            X("create", b, b.create);
            X("remove", b, b.remove);
            X("getByName", b, b.getByName, 5);
            X("getAll", b, b.getAll, 6);
            b = Tracker.prototype;
            X("get", b, b.get, 7);
            X("set", b, b.set, 4);
            X("send", b, b.send);
            X("requireSync", b, b.requireSync);
            b = DataWrapper.prototype;
            X("get", b, b.get);
            X("set", b, b.set);
            

            a = a && a.q;
            isArray(a) ? Z.D.apply(engine, a) : console.log("queue is empty!");
        }
    }; engine.da = function() {
        for (var a = engine.getAll(), b = 0; b < a.length; b++) a[b].get(param_name)
    };
	
	
	//预加载
	var prepareLoad = function(callback) {
        if (isPrerender(callback)) {//预渲染状态添加监听器，状态改则执行回调函数且删除监听器
            
            var b = false,
            c = function() {
                if (!b && !isPrerender(callback)) {
                    b = true;
                    var d = c;
                    doc.removeEventListener ? doc.removeEventListener("visibilitychange", d, !1) : doc.detachEvent && doc.detachEvent("onvisibilitychange", d)
                }
            };
            L(doc, "visibilitychange", c)
        }
    },
	
	//是否预渲染状态：非预渲染状态会执行回调函数
	isPrerender = function(callback) {
        if ("prerender" == doc.visibilityState){
			return true;
		}
        callback();
        return false;
    },
	
	addListener = function(a, b, c, d) {
        try {
            a.addEventListener ? a.addEventListener(b, c, !!d) : a.attachEvent && a.attachEvent("on" + b, c)
        } catch(e) {
            
        }
    };
	
	
	//xa函数参数解析器，用来截取跟踪器及方法
	var xaReg = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/, paramsParser = function(a) {
        if (isFunction(a[0])){
			this.func = a[0];//u
		} else {
            var b = xaReg.exec(a[0]);
            null != b && 4 == b.length && 
			(this.trackerName = b[1] || "t0", //c,跟踪器
			this.pluginName = b[2] || "", //K,插件
			this.methodName = b[3], //C,方法名
			this.params = [].slice.call(a, 1), //a,其它参数构成的数组
			this.pluginName || 
			(this.isCreate = "create" == this.methodName, //A->isCreate
			this.isRequire = "require" == this.methodName, //i->isRequire
			this.isProvide = "provide" == this.methodName, //g->isProvide
			this.isRemove = "remove" == this.methodName), //ba->isRemove
			this.isRequire && 
			(3 <= this.params.length ? (this.X = this.params[1], this.W = this.params[2]) : this.params[1] && (isString(this.params[1]) ? this.X = this.params[1] : this.W = this.params[1])));
            b = a[1];
            a = a[2];
            if (!this.methodName) throw "abort";
            if (this.isRequire && (!isString(b) || "" == b)) throw "abort";
            if (this.isProvide && (!isString(b) || "" == b || !isFunction(a))) throw "abort";
            if (isNotValidateName(this.trackerName) || isNotValidateName(this.pluginName)) throw "abort";
            if (this.isProvide && "t0" != this.trackerName) throw "abort";
        }
    };
	
	
	//神奇Z函数
	var Z = {
        ga: function() {
            Z.f = []
        }
    }; Z.ga(); Z.D = function(a) {
        var b = Z.J.apply(Z, arguments),
        b = Z.f.concat(b);
        for (Z.f = []; 0 < b.length && !Z.v(b[0]) && !(b.shift(), 0 < Z.f.length););
        Z.f = Z.f.concat(b)
    }; Z.J = function(a) {
        for (var b = [], c = 0; c < arguments.length; c++) try {
			//sc构造方法
            var pp = new paramsParser(arguments[c]);
            pp.isProvide ? doProvide(pp.params[0], pp.params[1]) : (pp.isRequire && (pp.ha = doRequire(pp.trackerName, pp.params[0], pp.X, pp.W)), b.push(pp))
        } catch(e) {}
        return b
    };
    Z.v = function(pp) {
        try {
            if (pp.func) {
				pp.func.call(win, engine.getByName("t0"));
			}else {
                var b = pp.trackerName == xaObjName ? engine : engine.getByName(pp.trackerName);
                if (pp.isCreate) {
					"t0" != pp.trackerName || engine.create.apply(engine, pp.params);
				}else if (pp.isRemove){
					engine.remove(pp.trackerName);
				} 
                else if (b) {
					if (pp.isRequire) {
						//TODO
					} else if (pp.pluginName) {
						//TODO
					} else {
						b[pp.methodName].apply(b, pp.params)
					}
					
				}
            }
        } catch(g) {}
    };
	
	var X = function (a, b, c, d) {
        b[a] = function() {
            try {
                return c.apply(this, arguments);//d && J(d),
            } catch(e) {
                //throw ge("exc", a, e && e.name),
                //e;
            }
        }
    };
	
	//TODO:对应C
	var doProvide = function(a, b){
		
	},
	//TODO:对应y
	doRequire = function(a, b, c, d, e){
		
		
	};
	
	//====================================执行引擎 end====================================
	
	
	
	//执行
	var E = engine.start, I = win[xaObjName]; I && I.q ? E() : prepareLoad(E); prepareLoad(function() {
        //Z.D(["provide", "render", ua])
    });
	
	
	
	
	
	
	
	
})(window, document)
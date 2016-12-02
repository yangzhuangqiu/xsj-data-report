(function(win, doc){
	
	var debug = true;
	
	var log = function(obj){
		if(debug){
			console.log(obj);
		}
		
	};
	
	//跟踪器
	var defaultTrackerName = "t0";
	var tracker = function(options){
		
		if (typeof options !== 'object') {
            throw('AV.analytics need a argument at least.');
        }
        else if (!options.appId) {
            throw('Options must have appId.');
        }
        else if (!options.trackingId) {
            throw('Options must have trackingId.');
        }
		
		var data = {};
		data.keys=["name","appId","trackingId"];
		data.values={};
		
		data.values.name = options.name || defaultTrackerName;
		data.values.appId = options.appId;
		data.values.trackingId = options.trackingId
		
		var collect = function(){
			
			
		}
		
		
		var send = function(options){
			log("send");
		}
		
	}
	
	
	
	

	//跟踪器持有者
	var trackerHolder = {
		
		keys : [],
		
		values : {},
		
		add : function(trackerObject){
			var name = trackerObject.data.values.name;
			this.keys[this.keys.length] = name;
			this.values[name] = trackerObject;
			
		},
		
		get : function(name){
			return this.values[name];
		},
		
		getOnlyOne : function(){
			if(this.keys.length == 1){
				return this.values[this.keys[0]];
			}
			return null;
		},
		
		getAll : function(){
			return this.values;//应该返回对象的副本
		}
	}
	
	
	//win[win["XSJAnalyticsConfig"]].q
	
	//用来替换xa的函数
	var localxa = function(cmd, options){
		
		if(1==arguments.length && typeof cmd === "function"){
			cmd(trackerHolder.getOnlyOne());
		}else if(arguments.length == 2 && typeof cmd === "string" && typeof options === 'object'){
			var cmds = cmd.split(".");
			var t = defaultTrackerName;
			if(cmds.length == 2){
				cmd = cmds[1];
				t = cmds[0];
			}
			if("create" == cmd){
				trackerObject = new tracker(options);
				trackerHolder.add(trackerObject);
			}else if("send" == cmd){
				trackerHolder.get(t) && trackerHolder.get(t).send(options);
			}
			
		}

	}
	
	//xa扩展方法
	localxa.prototype.getAll = trackerHolder.getAll;
	
	//执行xa命令
	var xa = win["XSJAnalyticsConfig"] || "xa";
	var queue = win[xa].q;
	
	var notCreateQueue = [];

	//创建跟踪器
	for(x in queue){
		var o = queue[x];
		if(o.length == 2 && "create" == o[0]){
			localxa(o[0], o[1]);
		}else{
			notCreateQueue.push(o);
		}
	}
	log(queue)
	log(notCreateQueue)
	//替换xa
	win.xa = localxa
	
	
	for(x in notCreateQueue){
		var o = notCreateQueue[x];
		if(o.length == 2){
			win.xa(o[0], o[1]);
		}else{
			win.xa(o[0]);
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	//Ya
	var Ya = function() {
        this.data = new ee
    },
	
	//bc构造函数（即跟踪器构造函数）
	var wb = /^(UA|YT|MO|GP)-(\d+)-(\d+)$/, pc = function(a) {
        function b(a, b) {
            d.b.data.set(a, b)
        }
        function c(a, c) {
            b(a, c);
            d.filters.add(a)
        }
        var d = this;
        this.b = new Ya;
        this.filters = new Ha;
        b(V, a[V]);
        b(Na, sa(a[Na]));
        b(U, a[U]);
        b(W, a[W] || xa());
        b(Yb, a[Yb]);
        b(Zb, a[Zb]);
        b(legacyCookieDomain, a[legacyCookieDomain]);
        b(Wc, a[Wc]);
        b(bc, a[bc]);
        b(cc, a[cc]);
        b(Ka, a[Ka]);
        b(dc, a[dc]);
        b(ec, a[ec]);
        b(ac, a[ac]);
        b(Ad, a[Ad]);
        b(n, a[n]);
        b(hb, 1);
        b(ib, "j47");
        c(Qb, Ma);
        c(dd, cd);
        c(Rb, Oa);
        c(md, vb);
        c(Sb, nc);
        c(Uc, Yc);
        c(Tb, Ja);
        c(Vb, Ta);
        c(Vc, Hc);
        c(zd, yd);
        c(Ld, Sd);
        c(Wb, Pa);
        c(Xb, Sa);
        c(Cd, Fd(this));
        Jc(this.b, a[Q]);
        Kc(this.b);
        this.b.set(jb, Lc());
        bd(this.b.get(Na), this.b.get(W), this.b.get(Yb))
    },
	
	
	
	
	
	//Na对象
	var Qb = T("_oot"), dd = S("previewTask"), Rb = S("checkProtocolTask"), md = S("validationTask"), Sb = S("checkStorageTask"), Uc = S("historyImportTask"), Tb = S("samplerTask"), Vb = S("_rlt"), Wb = S("buildHitTask"), Xb = S("sendHitTask"), Vc = S("ceTask"), zd = S("devIdTask"), Cd = S("timingTask"), Ld = S("displayFeaturesTask"), 
	V = T("name"), Q = T("clientId", "cid"), n = T("clientIdTime"), Ad = S("userId", "uid"), 
	Na = T("trackingId", "tid"), U = T("cookieName", void 0, "_ga"), 
	W = T("cookieDomain"), Yb = T("cookiePath", void 0, "/"), Zb = T("cookieExpires", void 0, 63072E3), legacyCookieDomain = T("legacyCookieDomain"), Wc = T("legacyHistoryImport", void 0, !0), ac = T("storage", void 0, "cookie"), bc = T("allowLinker", void 0, !1), cc = T("allowAnchor", void 0, !0), Ka = T("sampleRate", "sf", 100), dc = T("siteSpeedSampleRate", void 0, 1), ec = T("alwaysSendReferrer", void 0, !1), gd = S("transportUrl"), Md = S("_r", "_r");
	//za函数:将创建参数整合成对象{name:"xx",trackingId:"",cookieDomain:""}
	za = function(a, b) {
        if (1 == b.length && null != b[0] && "object" === typeof b[0]) return b[0];
        for (var c = {}, d = Math.min(a.length + 1, b.length), e = 0; e < d; e++) if ("object" === typeof b[e]) {
            for (var g in b[e]) b[e].hasOwnProperty(g) && (c[g] = b[e][g]);
            break
        } else e < a.length && (c[a[e]] = b[e]);
        return c
    };
	
	var N = function(a) {
        J(1);
        Z.D.apply(Z, [arguments])
    }; N.h = {}; N.P = []; N.L = 0; N.answer = 42;
	var uc = [Na, W, V]; N.create = function(a) {
        var b = za(uc, [].slice.call(arguments));
        b[V] || (b[V] = "t0");
        var c = "" + b[V];
        if (N.h[c]) return N.h[c];
        b = new pc(b);
        N.h[c] = b;
        N.P.push(b);
        return b
    }; N.remove = function(a) {
        for (var b = 0; b < N.P.length; b++) if (N.P[b].get(V) == a) {
            N.P.splice(b, 1);
            N.h[a] = null;
            break
        }
    }; N.j = function(a) {
        return N.h[a]
    }; N.getAll = function() {
        return N.P.slice(0)
    };
	
	//T函数
	T = function(a, b, c) {
        return S(a, b, c, void 0, db)
    },
	//bd对象
	var ad, bd = function(a, b, c) {
        if (!ad) {
            var d;
            d = M.location.hash;
            var e = O.name,
            g = /^#?gaso=([^&]*)/;
            if (e = (d = (d = d && d.match(g) || e && e.match(g)) ? d[1] : Ca("GASO")[0] || "") && d.match(/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i)) zc("GASO", "" + d, c, b, a, 0),
            window._udo || (window._udo = b),
            window._utcp || (window._utcp = c),
            a = e[1],
            wa("https://www.google.com/analytics/web/inpage/pub/inpage.js?" + (a ? "prefix=" + a + "&": "") + hd(), "_gasojs");
            ad = !0
        }
    };
	
	//S函数
	S = function(a, b, c, d, e) {
        a = new bb(a, b, c, d, e);
        Qa.set(a.name, a);
        return a.name
    }
	//bb构造函数
	bb = function(a, b, c, d, e) {
        this.name = a;
        this.F = b;
        this.Z = d;
        this.o = e;
        this.defaultValue = c
    },
	//Qa对象
	var ee = function() {
        this.keys = [];
        this.values = {};
        this.m = {}
    }; ee.prototype.set = function(a, b, c) {
        this.keys.push(a);
        c ? this.m[":" + a] = b: this.values[":" + a] = b
    }; ee.prototype.get = function(a) {
        return this.m.hasOwnProperty(":" + a) ? this.m[":" + a] : this.values[":" + a]
    }; ee.prototype.map = function(a) {
        for (var b = 0; b < this.keys.length; b++) {
            var c = this.keys[b],
            d = this.get(c);
            d && a(c, d)
        }
    };
	Qa = new ee
	var O = window, M = document;
	
	//截取跟踪器及方法
	var td = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/, sc = function(a) {
		//
		
        if (ea(a[0])) this.u = a[0];//u为函数
        else {
            var b = td.exec(a[0]);
            null != b && 4 == b.length && 
			//c是跟踪器，C是方法，a是参数，
			(this.c = b[1] || "t0", this.K = b[2] || "", this.C = b[3], this.a = [].slice.call(a, 1), 
			//A ->isCreate,i ->isRequire,g -> isProvide, ba -> isRemove
			this.K || (this.A = "create" == this.C, this.i = "require" == this.C, this.g = "provide" == this.C, this.ba = "remove" == this.C), 
			this.i && (3 <= this.a.length ? (this.X = this.a[1], this.W = this.a[2]) : this.a[1] && (qa(this.a[1]) ? this.X = this.a[1] : this.W = this.a[1])));
            b = a[1];
            a = a[2];
            if (!this.C) throw "abort";
            if (this.i && (!qa(b) || "" == b)) throw "abort";
            if (this.g && (!qa(b) || "" == b || !ea(a))) throw "abort";
            if (ud(this.c) || ud(this.K)) throw "abort";
            if (this.g && "t0" != this.c) throw "abort";
        }
    };
	
	
	
	//============================================start:shadow_===============================================================
	
	var configName = "XSJAnalyticsConfig"
	
	//====================================辅助方法 start====================================
	//参数是否函数,ea
	var isFunction = function(a) {
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
	function isNotValidateName(a) {
        return 0 <= a.indexOf(".") || 0 <= a.indexOf(":")
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
	var emptyFunction = function() {};
	
	//P
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
	encURI = function(a) {
        if (encodeURIComponent instanceof Function) return encodeURIComponent(a);
        
        return a
    },
	
	var Ca = function(a) {
        var b = [],
        c = doc.cookie.split(";");
        a = new RegExp("^\\s*" + a + "=\\s*(.*?)\\s*$");
        for (var d = 0; d < c.length; d++) {
            var e = c[d].match(a);
            e && b.push(e[1])
        }
        return b
    },
	zc = function(cookieName, clientId, c, d, trackingId, g) {
       
        clientId && 1200 < clientId.length && (clientId = clientId.substring(0, 1200));
        c = cookieName + "=" + clientId + "; path=" + c + "; ";
        g && (c += "expires=" + (new Date((new Date).getTime() + g)).toGMTString() + "; ");
        d && "none" != d && (c += "domain=" + d + ";");
        d = doc.cookie;
        doc.cookie = c;
        if (! (d = d != doc.cookie)) cookieName: {
            cookieName = Ca(cookieName);
            for (d = 0; d < cookieName.length; d++) if (clientId == cookieName[d]) {
                d = !0;
                break cookieName
            }
            d = !1
        }
        return d
    },
	
	//Cc
	replaceParenthesis = function(a) {
        return encURI(a).replace(/\(/g, "%28").replace(/\)/g, "%29")
    },
	
	//hd
	var getRandomByMathRound = function() {
        return Math.round(2147483647 * Math.random())
    },
	//Bd
    getRandom = function() {
        try {
            var a = new Uint32Array(1);
            O.crypto.getRandomValues(a);
            return a[0] & 2147483647
        } catch(b) {
            return getRandomByMathRound()
        }
    };
	
	lc = function(a) {
        return 0 == a.indexOf(".") ? a.substr(1) : a
    };
	
	kc = function(a) {
        if (!a) return "/";
        1 < a.length && a.lastIndexOf("/") == a.length - 1 && (a = a.substr(0, a.length - 1));
        0 != a.indexOf("/") && (a = "/" + a);
        return a
    },
	jc = function(a) {
        a = kc(a);
        return "/" == a ? 1 : a.split("/").length
    };
	//====================================辅助方法 end====================================
	
	//====================================校验方法 start====================================
	//TODO 理解优化
	function Ma(a) {
        //if (G(P(a, Na))) throw "abort";Na->param_trackingId
    }
	
	function cd() {
        if (win.navigator && "preview" == win.navigator.loadPurpose) throw "abort";
    }
	
	function Oa() {
        var a = doc.location.protocol;
        if ("http:" != a && "https:" != a) throw "abort";
    }
	
	function vb(a) {
        if (!a.get(param_trackingId)) throw "abort";
    }
	
	
	
	nd = function(a) {
        var b = replaceParenthesis(getStringProperty(a, param_clientId)),
        c = lc(getStringProperty(a, param_cookieDomain)).split(".").length;
        a = jc(getStringProperty(a, param_cookiePath));
        1 < a && (c += "-" + a);
        return ["GA1", c, b].join(".")
    },
	
	var hc = !1, mc = function(a) {
        if ("cookie" == getStringProperty(a, param_storage)) {
            var b = getStringProperty(a, param_cookieName),
            c = nd(a),
            d = kc(getStringProperty(a, param_cookiePath)),
            e = lc(getStringProperty(a, param_cookieDomain)),
            g = 1E3 * getNumberProperty(a, param_cookieExpires),
            ca = getStringProperty(a, param_trackingId);
            if ("auto" != e) zc(b, c, d, e, ca, g) && (hc = !0);
            else {
                J(32);
                var l;
                a: {
                    c = [];
                    e = xa().split(".");
                    if (4 == e.length && (l = e[e.length - 1], parseInt(l, 10) == l)) {
                        l = ["none"];
                        break a
                    }
                    for (l = e.length - 2; 0 <= l; l--) c.push(e.slice(l).join("."));
                    c.push("none");
                    l = c
                }
                for (var k = 0; k < l.length; k++) if (e = l[k], a.data.set(W, e), c = nd(a), zc(b, c, d, e, ca, g)) {
                    hc = !0;
                    return
                }
                a.data.set(W, "auto")
            }
        }
    },
	nc = function(a) {
        //if ("cookie" == P(a, ac) && !hc && (mc(a), !hc)) throw "abort";
    },
	//TODO
	Yc = function(a) {
        
    },
	function Ja(a) {
        //if (100 != a.get(Ka) && La(P(a, Q)) % 1E4 >= 100 * R(a, Ka)) throw "abort";
    },
	
	
	
	
	function Ta(a) {
        
    };
	
	function Hc(a) { 
	
    }
	
	function yd(a) {
        var b = win.gaDevIds;
        isArray(b) && 0 != b.length && a.set("&did", b.join(","), !0)
    }
	//Ba
	var isForceSSL = !1;
	
	//Ud
	isHttps = function() {
        return "https:" == M.location.protocol
    },
	
	var oc = function() {
		//return "http://www.noshadow.me";
        return (isForceSSL || isHttps() ? "https:": "http:") + "//www.google-analytics.com"
    },
	//可能很重要,设置上报接口地址
	var Sd = function(a) {
        if (!a.get("dcLoaded") && "cookie" == a.get(param_storage)) {
            //Nd(a, 51);
            //var b = new Jd(a);
            //Pd(b, a);
            //Qd(b, a);
            //a.get(b.U) && (a.set(Md, 1, !0), a.set(param_transportUrl, oc() + "/r/collect", !0))
        }
    };
	
	
	
	
	
	function Pa(a) {
        try {
            win.navigator.sendBeacon ? 1 : win.XMLHttpRequest && "withCredentials" in new win.XMLHttpRequest && 1
        } catch(c) {}
        //a.set(ld, Td(a), !0);TODO UNKNOWN
        a.set(param__s, getNumberProperty(a, param__s) + 1);
        var b = [];
        dataStoreInstance.map(function(c, d) {
            if (d.F) {
                var e = a.get(c);
                void 0 != e && e != d.defaultValue && ("boolean" == typeof e && (e *= 1), b.push(d.F + "=" + encURI("" + e)))
            }
        });
        b.push("z=" + getRandom());
        a.set(param_hitPayload, b.join("&"), !0)
    }
	
	//TODO
	function Sa(a) {
        
    }
	//TODO
	Fd = function(a) {
        
    };
	
	//====================================校验方法 end====================================
	
	
	
	
	
	
	//====================================数据收集方法 start====================================
	var getHostName = function() {
        var a = "" + doc.location.hostname;
        return 0 == a.indexOf("www.") ? a.substring(4) : a
    },
	//====================================数据收集方法 end====================================
	
	
	
	
	
	
	
	
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
    }; dataStore.prototype.map = function(a) {
        for (var b = 0; b < this.keys.length; b++) {
            var c = this.keys[b],
            d = this.get(c);
            d && a(c, d)
        }
    };
	//数据存储实例 Qa
	var dataStoreInstance = new dataStore;
	
	//字段模型 bb(名字，别名，默认值，getFunction，setFunction)
	var fieldModel = function(a, b, c, d, e) {
        this.name = a;
        this.F = b;
		this.defaultValue = c;
		this.getFunc = d;//Z
        this.setFunc = e;//o
    };
	
	
	//$a
	getValueInDataStoreInstance = function(key) {
        var b = dataStoreInstance.get(key);
        if (!b) for (var c = 0; c < Za.length; c++) {
            var d = Za[c],
            e = d[0].exec(key);
            if (e) {
                b = d[1](e);
                dataStoreInstance.set(b.name, b);
                break
            }
        }
        return b
    };
	
	//ab
	var setToDataWrapper = function(dataWrapper, key, value, d) {
        if (void 0 != value) switch (key) {
        case param_trackingId:
            wb.test(value)
        }
        var e = getValueInDataStoreInstance(key);
        e && e.setFunc ? e.setFunc(dataWrapper, key, value, d) : dataWrapper.data.set(key, value, d)
    },
	
	//Ya
	var DataWrapper = function() {
        this.data = new dataStore
    }, Za = []; 
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
        b != emptyFunction && isFunction(b) && (a.set(param_hitCallback, emptyFunction, !0), setTimeout(b, 10))
    };
	
	//====================================数据存储模型 end====================================
	
	
	//====================================常量定义 start====================================
	
	db = function() {};
	//由T,S定义的常量，存放在全局数据存储实例(dataStoreInstance)中
	//T函数
	var T = function(a, b, c) {
        return S(a, b, c, void 0, db)
    },
	
	//S函数
	S = function(a, b, c, d, e) {
        a = new fieldModel(a, b, c, d, e);
        dataStoreInstance.set(a.name, a);
        return a.name
    };
	
	
	var param__oot= T("_oot"), //Qb
	param_previewTask = S("previewTask"), //dd
	param_checkProtocolTask = S("checkProtocolTask"), //Rb
	param_validationTask = S("validationTask"), //md
	param_checkStorageTask = S("checkStorageTask"), //Sb
	param_historyImportTask = S("historyImportTask"), //Uc
	param_samplerTask = S("samplerTask"), //Tb
	param__rlt = S("_rlt"), //Vb
	param_buildHitTask = S("buildHitTask"), //Wb
	param_sendHitTask = S("sendHitTask"), //Xb
	param_ceTask = S("ceTask"), //Vc
	param_devIdTask = S("devIdTask"), //zd
	param_timingTask = S("timingTask"), //Cd
	param_displayFeaturesTask = S("displayFeaturesTask"), //Ld
	param_name = T("name"), //V
	param_clientId = T("clientId", "cid"), //Q
	param_clientIdTime = T("clientIdTime"), //n
	param_userId = S("userId", "uid"), //Ad
	param_trackingId = T("trackingId", "tid"), //Na
	param_cookieName = T("cookieName", void 0, "_ga"), //U
	param_cookieDomain = T("cookieDomain"), //W
	param_cookiePath = T("cookiePath", void 0, "/"), //Yb
	param_cookieExpires = T("cookieExpires", void 0, 63072E3), //Zb
	param_legacyCookieDomain = T("legacyCookieDomain"), //$b
	param_legacyHistoryImport = T("legacyHistoryImport", void 0, !0), //Wc
	param_storage = T("storage", void 0, "cookie"), //ac
	param_allowLinker = T("allowLinker", void 0, !1), //bc
	param_allowAnchor = T("allowAnchor", void 0, !0), //cc
	param_sampleRate = T("sampleRate", "sf", 100), //Ka
	param_siteSpeedSampleRate = T("siteSpeedSampleRate", void 0, 1), //dc
	param_alwaysSendReferrer = T("alwaysSendReferrer", void 0, !1), //ec
	param_transportUrl = S("transportUrl"), //gd
	param__r = S("_r", "_r");//Md
	
	var param_adSenseId = S("adSenseId", "a"), //jb
	param_hitType = S("hitType", "t"), //Va
	param_hitCallback = S("hitCallback"), //Ia
	param_hitPayload = S("hitPayload"); //Ra

	var param_apiVersion = T("apiVersion", "v"), //hb
	param_clientVersion = T("clientVersion", "_v");//ib
	
	var param__s = S("_s", "_s");//Ac
	
	
	
	//====================================常量定义 end====================================
	
	var wb = /^(UA|YT|MO|GP)-(\d+)-(\d+)$/, Tracker = function(options) {//pc
        function setData(key, value) {
            d.b.data.set(key, value)
        }
        function addFilter(key, value) {
            setData(key, value);
            d.filters.add(key)
        }
        var d = this;
        this.b = new DataWrapper;
        this.filters = new Filters;
        setData(param_name, options[param_name]);
        setData(param_trackingId, trim(options[param_trackingId]));
        setData(param_cookieName, options[param_cookieName]);
        setData(param_cookieDomain, options[param_cookieDomain] || getHostName());
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
        addFilter(param__oot, Ma);
        addFilter(param_previewTask, cd);
        addFilter(param_checkProtocolTask, Oa);
        addFilter(param_validationTask, vb);
        addFilter(param_checkStorageTask, nc);
        addFilter(param_historyImportTask, Yc);
        addFilter(param_samplerTask, Ja);
        addFilter(param__rlt, Ta);
        addFilter(param_ceTask, Hc);
        addFilter(param_devIdTask, yd);
        addFilter(param_displayFeaturesTask, Sd);
        addFilter(param_buildHitTask, Pa);
        addFilter(param_sendHitTask, Sa);
        addFilter(param_timingTask, Fd(this));
        Jc(this.b, options[param_clientId]);
        Kc(this.b);
        this.b.set(jb, Lc());
        bd(this.b.get(Na), this.b.get(W), this.b.get(Yb))
    },
	
	
	//定义好engine
	var engine = function(){
		
		Z.D.apply(Z, [arguments])
		
	};
	
	engine.trackerMap = {}; //h
	engine.trackerArray = []; //P
	engine.L = 0; 
	engine.answer = 42;
    var createParams = [param_trackingId, param_cookieDomain, param_name]; engine.create = function(a) {
        var b = generateOptions(createParams, [].slice.call(arguments));
        b[param_name] || (b[param_name] = "t0");
        var c = "" + b[param_name];
        if (engine.trackerMap[c]) return engine.trackerMap[c];
        b = new pc(b);
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
    engine.N = function() {
        "ga" != gb && J(49);
        var a = O[gb];
        if (!a || 42 != a.answer) {
            N.L = a && a.l;
            N.loaded = !0;
            var b = O[gb] = N;
            X("create", b, b.create);
            X("remove", b, b.remove);
            X("getByName", b, b.j, 5);
            X("getAll", b, b.getAll, 6);
            b = pc.prototype;
            X("get", b, b.get, 7);
            X("set", b, b.set, 4);
            X("send", b, b.send);
            X("requireSync", b, b.ma);
            b = Ya.prototype;
            X("get", b, b.get);
            X("set", b, b.set);
            if (!Ud() && !Ba) {
                a: {
                    for (var b = M.getElementsByTagName("script"), c = 0; c < b.length && 100 > c; c++) {
                        var d = b[c].src;
                        if (d && 0 == d.indexOf("https://www.google-analytics.com/analytics")) {
                            J(33);
                            b = !0;
                            break a
                        }
                    }
                    b = !1
                }
                b && (Ba = !0)
            }
            Ud() || Ba || !Ed(new Od(1E4)) || (J(36), Ba = !0);
            (O.gaplugins = O.gaplugins || {}).Linker = Dc;
            b = Dc.prototype;
            C("linker", Dc);
            X("decorate", b, b.ca, 20);
            X("autoLink", b, b.S, 25);
            C("displayfeatures", fd);
            C("adfeatures", fd);
            a = a && a.q;
            ka(a) ? Z.D.apply(N, a) : J(50)
        }
    }; N.da = function() {
        for (var a = N.getAll(), b = 0; b < a.length; b++) a[b].get(V)
    };
	
	
	
	
	
	
	
	
	//获取执行队列
	var xa = win[configName] || "xa";
	
	var E = engine, I = win[xa]; I && I.q ? E() : prepareLoad(E); prepareLoad(function() {
        //Z.D(["provide", "render", ua])
    });
	
	//预加载
	var prepareLoad = function(callback) {
        if (isPrerender(callback)) {//预渲染状态添加监听器，状态改则执行回调函数且删除监听器
            
            var b = false,
            c = function() {
                if (!b && !isPrerender(callback)) {
                    b = true;
                    var d = c,
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
    },
	
	
	
	
	
	
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
                var b = pp.trackerName == gb ? engine: engine.getByName(pp.trackerName);
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
	
	
	//TODO:对应C
	var doProvide = function(a, b){
		
	},
	//TODO:对应y
	doRequire = function(a, b, c, d, e){
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})(window, document)
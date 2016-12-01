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
	
	
	//数据存储
	var dataStore = function() {
        this.keys = [];
        this.values = {};
        this.m = {}
    }; dataStore.prototype.set = function(a, b, c) {
        this.keys.push(a);
        c ? this.m[":" + a] = b: this.values[":" + a] = b
    }; dataStore.prototype.get = function(a) {
        return this.m.hasOwnProperty(":" + a) ? this.m[":" + a] : this.values[":" + a]
    }; dataStore.prototype.map = function(a) {
        for (var b = 0; b < this.keys.length; b++) {
            var c = this.keys[b],
            d = this.get(c);
            d && a(c, d)
        }
    };
	//数据存储实例
	var dataStoreInstance = new dataStore;
	
	//字段模型
	var fieldModel = function(a, b, c, d) {
        this.name = a;
        this.F = b;
		this.defaultValue = c;
        this.o = d;
    },
	
	//bd对象 TODO 理解优化
	var ad, bd = function(a, b, c) {
        
    };
	
	//T函数
	T = function(a, b, c) {
        return S(a, b, c, db)
    },
	
	//S函数
	S = function(a, b, c, d, e) {
        a = new fieldModel(a, b, c, d, e);
        dataStoreInstance.set(a.name, a);
        return a.name
    }
	
	//定义好engine
	var engine = function(){
		
		Z.D.apply(Z, [arguments])
		
	};
	
	engine.h = {}; engine.P = []; engine.L = 0; engine.answer = 42;
    var uc = [Na, W, V]; engine.create = function(a) {
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
    }; N.getByName = function(a) {
        return N.h[a]
    }; N.getAll = function() {
        return N.P.slice(0)
    };
    N.N = function() {
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
        Z.D(["provide", "render", ua])
    });
	
	//预加载
	var prepareLoad = function(a) {
        if (isPrerender(a)) {//预渲染状态添加监听器，状态改则执行回调函数且删除监听器
            
            var b = false,
            c = function() {
                if (!b && !isPrerender(a)) {
                    b = true;
                    var d = c,
                    doc.removeEventListener ? doc.removeEventListener("visibilitychange", d, !1) : doc.detachEvent && doc.detachEvent("onvisibilitychange", d)
                }
            };
            L(doc, "visibilitychange", c)
        }
    },
	
	//是否预渲染状态：非预渲染状态会执行回调函数
	isPrerender = function(a) {
        if ("prerender" == doc.visibilityState){
			return true;
		}
        a();
        return false;
    },
	
	addListener = function(a, b, c, d) {
        try {
            a.addEventListener ? a.addEventListener(b, c, !!d) : a.attachEvent && a.attachEvent("on" + b, c)
        } catch(e) {
            
        }
    },
	
	
	//参数是否函数
	var isFunction = function(a) {
        return "function" == typeof a
    },
	isArray = function(a) {
        return "[object Array]" == Object.prototype.toString.call(Object(a))
    },
    isString = function(a) {
        return void 0 != a && -1 < (a.constructor + "").indexOf("String")
    };
	
	//检验方法：
	function ud(a) {
        return 0 <= a.indexOf(".") || 0 <= a.indexOf(":")
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
            if (ud(this.trackerName) || ud(this.pluginName)) throw "abort";
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
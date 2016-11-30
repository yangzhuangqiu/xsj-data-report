(function(win){
	
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
		
		this.data = {};
		this.data.keys=["name","appId","trackingId"];
		this.data.values={};
		
		this.data.values.name = options.name || defaultTrackerName;
		this.data.values.appId = options.appId;
		this.data.values.trackingId = options.trackingId
		
	}
	
	//跟踪器方法
	tracker.prototype.send = function(options){
		
		log("send:")
		
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
		
		
		//alert(arguments);
	}
	
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
	//xa扩展方法
	win.xa.prototype.getAll = trackerHolder.getAll;
	
	for(x in notCreateQueue){
		var o = notCreateQueue[x];
		if(o.length == 2){
			win.xa(o[0], o[1]);
		}else{
			win.xa(o[0]);
		}
	}
	
	
	
})(window)
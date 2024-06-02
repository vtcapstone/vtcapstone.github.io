function countdown(duration,increment){
	
	var self = this;
	
	self.max = duration;
	self.inc = increment;
	self.run = false;
	
	self.time;
	self.timer;
	
	self.onUpdate = function(){};
	self.onZero = function(){};
	
	self.reset = function(){
		self.stop();
		self.time = self.max;
	};
	
	self.start = function(){
		if(!run){
			self.timer = setInterval(self.update,self.inc);
			run = true;
		}
	};
	
	self.stop = function(){
		clearInterval(self.timer);
		run = false;
	};
	
	self.update = function(){
		self.time = Math.max(self.time-self.inc,0);
		self.onUpdate();
		if(self.time==0){
			self.stop();
			self.onZero();
		}
	};
	
	self.getTime = function(){
		return new Date(this.time);
	}
	
	self.reset();
}

$(document).ready(function(){

	$phrase = $("#phrase");
	$form = $("form");
	$input = $("input");
	$timer = $("#timer");
 
	cnt = new countdown(COUNTDOWN_TIME,10);
	
	reset = function(){
		step = 0;
		$phrase.text(phrases[step]);
		$timer.css('visibility', 'hidden');
		$input.val("");
		cnt.reset();
		$input.focus();
	};
	
	cnt.onUpdate = function(){
		var t = cnt.getTime();
		var m = t.getMinutes();
		var s = t.getSeconds();
		var d = t.getMilliseconds()/10;
		$timer.text((m<10?"0":"")+m+":"+(s<10?"0":"")+s+":"+(d<10?"0":"")+d);
	};
		
	cnt.onZero = reset;
 
	$input.keypress(function(){
		cnt.start();
		$timer.css('visibility', 'visible');
	});
	
	$form.submit(function(event){
		event.preventDefault();
		if($input.val()==reponses[step]){
			step++;
			$phrase.text(phrases[step]);
			if(step==reponses.length){
				cnt.stop();
				$form.css('visibility', 'hidden');
			}
		}else{
			$input.effect("shake","fast");
		}
		if(strval($input,reponses[step])){
			$input.val("");
		}
	});
 
	reset();
	
	$input.focusout(function(){
		$input.focus();
	});
	
	$(document).click(function(){
		$input.focus();
	});
	
});
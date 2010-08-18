(function($){
     var settings = {'msie':    'flash',
		     'mozilla': 'video',
		     'safari':  'video',
		     'opera':   'video'
		    };

     $.fn.video = function(videoBaseName, callerSettings) {
	 settings = $.extend(settings, callerSettings||{});
	 settings['video'] = videoBaseName;
	 this.html('here is the video: '+settings['video']);
	 return this;
     };
})(jQuery);
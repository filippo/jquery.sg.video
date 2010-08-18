(function($){
     var settings = {'preferredTag':    'video',
		     'extensions': {'ogg':   '.ogg',
				    'h264':  '.avi',
				    'webm':  '.wbm',
				    'flash': '.swf'
				   }
		    };

     // check for video support in the browser and
     // extends the $.support to add video informations
     var video = 'video';
     var canPlayType = 'canPlayType';
     var doc = window.document;
     var elem = doc.createElement(video);
     var bool = !!elem[canPlayType];
     var videoSupport;

     // check browser support
     if (bool){
	 videoSupport = {};
	 videoSupport['ogg']  = elem[canPlayType]('video/ogg; codecs="theora"');
         videoSupport['h264'] = elem[canPlayType]('video/mp4; codecs="avc1.42E01E"');
         videoSupport['webm'] = elem[canPlayType]('video/webm; codecs="vp8, vorbis"');
     }
     // extend $.support with video informations
     $.extend($.support, {'video': videoSupport});

     // put the video object inside the the wrapped set
     $.fn.video = function(videoBaseName, callerSettings) {
	 settings = $.extend(settings, callerSettings||{});
	 settings['video'] = videoBaseName;
	 this.html('here is the video: '+settings['video']);
	 return this;
     };
})(jQuery);
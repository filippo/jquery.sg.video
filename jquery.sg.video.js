(function($){
     var settings = {'preferredTag':    'video',
		     'autoplay': false,
		     'controls': true,
		     'extensions': {'ogg':   '.ogv',
				    'h264':  '.mp4',
				    'webm':  '.webm',
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

     var videoTag = function(src, options) {
	 var str = "<video src=\""+src;
	 if ($.support['video']['webm'] !== '') {
	     str += options['extensions']['webm'];
	 } else if ($.support['video']['h264'] !== '') {
	     str += options['extensions']['h264'];
	 } else {
	     str += options['extensions']['ogg'];
	 }
	 str += '" ';
	 if (options['controls']) {
	     str += 'controls="controls" ';
	 }
	 if (options['autoplay']) {
	     str += 'autoplay="autoplay" ';
	 }
	 str += '>your browser does not support the video tag</video>';
	 return str;
     };

     // put the video object inside the the wrapped set
     $.fn.video = function(videoBaseName, callerSettings) {
	 settings = $.extend(settings, callerSettings||{});
	 settings['video'] = videoBaseName;
	 if (settings['preferredTag'] == 'video' && videoSupport) {
	     this.html(videoTag(videoBaseName, settings));
	 }
	 return this;
     };
})(jQuery);
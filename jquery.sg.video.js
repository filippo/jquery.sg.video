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
	 var newEl = $('<video>');
	 var attrs = {};
	 if (options['controls']) {
	     attrs['controls'] = 'controls';
	 }
	 if (options['autoplay']) {
	     attrs['autoplay'] = 'autoplay';
	 }
	 if (options['width']) {
	     attrs['width'] = options['width'];
	 }
	 if (options['height']) {
	     attrs['height'] = options['height'];
	 }
	 if (options['poster']) {
	     attrs['poster'] = options['poster'];
	 }
	 newEl = newEl.attr(attrs);
	 if ($.support['video']['webm'] !== '') {
	     newEl = newEl.append($('source').attr({'src': src+options['extensions']['webm'],
						    'type': 'video/webm'}));
	 } 
	 if ($.support['video']['h264'] !== '') {
	     newEl = newEl.append($('source').attr({'src': src+options['extensions']['h264'],
						    'type': 'video/mp4'}));
	 } 
	 if ($.support['video']['ogg'] !== '') {
	     newEl = newEl.append($('source').attr({'src': src+options['extensions']['ogg'],
						    'type': 'video/ogg'}));
	 }
	 // FIXME: add swf
	 return newEl;
     };

     // put the video object inside the the wrapped set
     $.fn.video = function(videoBaseName, callerSettings) {
	 settings = $.extend(settings, callerSettings||{});
	 settings['video'] = videoBaseName;
	 if (settings['preferredTag'] == 'video' && videoSupport) {
	     this.append(videoTag(videoBaseName, settings));
	 }
	 return this;
     };
})(jQuery);
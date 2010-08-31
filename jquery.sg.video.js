(function($){

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
	 videoSupport['ogg']  = elem[canPlayType]('video/ogg; codecs="theora, vorbis"');
         videoSupport['h264'] = elem[canPlayType]('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
         videoSupport['webm'] = elem[canPlayType]('video/webm; codecs="vp8, vorbis"');
     }
     // extend $.support with video informations
     $.extend($.support, {'video': videoSupport});

     var objTag = function(src, options) {
	 var newEl = $('<object>');
	 var attrs = {};
	 if (options['width']) {
	     attrs['width'] = options['width'];
	 }
	 if (options['height']) {
	     attrs['height'] = options['height'];
	 }
	 newEl = newEl.attr(attrs);
	 //newEl = newEl.attr('data', src+options['extensions']['flash']);
	 newEl = newEl.append($('<param name="movie">').attr('value', src+options['extensions']['flash']));
	 // embed element
	 
	 newEl = newEl.append($('<embed type="application/x-shockwave-flash">').attr(attrs)
			      .attr({'src': src+options['extensions']['flash']}));
	 return newEl.append($('<a>').attr('href', src+options['extensions']['h264']).text('Download the video'));
     };

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
	     newEl = newEl.append($('<source>').attr({'src': src+options['extensions']['webm'],
						      'type': 'video/webm; codecs="vp8, vorbis"'}));
	 } 
	 if ($.support['video']['h264'] !== '') {
	     newEl = newEl.append($('<source>').attr({'src': src+options['extensions']['h264'],
						      'type': 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'}));
	 } 
	 if ($.support['video']['ogg'] !== '') {
	     newEl = newEl.append($('<source>').attr({'src': src+options['extensions']['ogg'],
						      'type': 'video/ogg; codecs="theora, vorbis"'}));
	 }
	 // add swf video
	 newEl = newEl.append(objTag(src, options));
	 return newEl;
     };

     // put the video object inside the the wrapped set
     $.fn.video = function(videoBaseName, callerSettings) {
	 var settings = {'preferredTag': 'video',
			 'autoplay': false,
			 'controls': true,
			 'extensions': {'ogg':   '.ogv',
					'h264':  '.mp4',
					'webm':  '.webm',
					'flash': '.swf'
				       }
			};
	 settings = $.extend(settings, callerSettings||{});
	 settings['video'] = videoBaseName;
	 if (settings['preferredTag'] == 'video' && videoSupport) {
	     return this.append(videoTag(videoBaseName, settings));
	 } else {
	     return this.append(objTag(videoBaseName, settings));
	 }
     };
})(jQuery);
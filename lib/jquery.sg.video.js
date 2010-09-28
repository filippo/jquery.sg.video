/***********************************
File:    jquery.sg.video.js
Author  : filippo pacini <filippo.pacini@gmail.com>
License :
The contents of this file are subject to the Mozilla Public
License Version 1.1 (the "License"); you may not use this file
except in compliance with the License. You may obtain a copy of
the License at http://www.mozilla.org/MPL/

Software distributed under the License is distributed on an "AS IS"
basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See
the License for the specific language governing rights and
limitations under the License.
The Initial Developer of the Original Code is S.G. Consulting
srl. Portions created by S.G. Consulting s.r.l. are Copyright (C)
2008-2010 S.G. Consulting srl. All Rights Reserved.

************************************/
(function($){

     // check for video support in the browser and
     // extends the $.support to add video informations
     var video = 'video';
     var canPlayType = 'canPlayType';
     var doc = window.document;
     var elem = doc.createElement(video);
     var bool = !!elem[canPlayType];
     var videoSupport = {};

     // check browser support
     if (bool){
	 videoSupport['ogg']  = elem[canPlayType]('video/ogg; codecs="theora, vorbis"');
         videoSupport['h264'] = elem[canPlayType]('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
         videoSupport['webm'] = elem[canPlayType]('video/webm; codecs="vp8, vorbis"');
     }
     // extend $.support with video informations
     $.extend($.support, {'video': videoSupport});

     var objTag = function(src, options) {
	 var newHTML = '<object';
	 if (options['width']) {
	     newHTML += ' width="'+options['width']+'"';
	 }
	 if (options['height']) {
	     newHTML += ' height="'+options['height']+'"';
	 }
	 newHTML += ">\n";
	 newHTML += '<param name="movie" value="'+src+options['extensions']['flash']+'"';
	 if (options.xhtmlStyleTag) {
	     newHTML += "/>";	     
	 } else {
	     newHTML += ">";
	 }
	 newHTML += '\n';
	 // embed element: must be present for firefox
	 newHTML += '<embed type="application/x-shockwave-flash"';
	 if (options['width']) {
	     newHTML += ' width="'+options['width']+'"';
	 }
	 if (options['height']) {
	     newHTML += ' height="'+options['height']+'"';
	 }
	 newHTML += ' src="'+src+options['extensions']['flash']+'"></embed>';
	 newHTML += '<a href="'+src+options['extensions']['h264']+'">Download the video</a>\n';
	 newHTML += "</object>";
	 return newHTML;
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
	 /* With poster enabled Opera stops working
	 if (options['poster'] !== false) {
	     attrs['poster'] = options['poster'];
	 }
	  */
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
                         'xhtmlStyleTag': false,
			 'autoplay': false,
			 'controls': true,
			 'poster': false,
			 'extensions': {'ogg':   '.ogv',
					'h264':  '.mp4',
					'webm':  '.webm',
					'flash': '.swf'
				       }
			};
	 settings = $.extend(settings, callerSettings||{});
	 settings['video'] = videoBaseName;
	 if (settings['preferredTag'] == 'video' && $.support.video) {
	     return this.append(videoTag(videoBaseName, settings));
	 } else {
	     return this.append(objTag(videoBaseName, settings));
	 }
     };
})(jQuery);
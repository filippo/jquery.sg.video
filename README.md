jQuery plugin for HTML5 Video
=============================
HTML5 added the <video> tag to embed videos directly in html web pages.
However browser support has some gotchas: at the moment there isn't a video format that works in all browsers and 
in Internet Explorer up to Internet Explorer 8 you can use only videos in flash format.

This plugin uses video feature detection from [Modernizr](http://www.modernizr.com/) and generates html 
according to "Video for Everybody" by Kroc Camen.

For a detailed explanation of the video tag and "Video for Everybody" see 
[Dive into HTML5](http://diveintohtml5.org/video.html).

Getting Started
---------------

### 1. Add a div element to the page
Change sgVideo with whatever you want.

    <div id="sgVideo"></div>

### 2. Include jQuery and the plugin in your HTML5 page
Change the src to the appropriate location.

    <script src="jquery.js"></script>
    <script src="jquery.sg.video.js"></script>

### 3. Call the plugin
Call the plugin passing the path to the video source files on disk.

To instantiate the video DOM elements you have to pass to the plugin 
the path to the video files in the different formats and optionally some options :-).

Eg.
     <script>
     var myvideo = {'ogg': 'oggvideo.ogv', 
                    'h264': 'h264video.mp4', 
		    'webm': 'webmvideo.webm', 
		    'flash': 'swfvideo.swf'};
     $('#sgVideo').video(myvideo, options);
     </script>


If the videos have all the same common basename (eg. myvideo.ogv, myvideo.mp4, myvideo.webm, myvideo.swf)
you can simply write:

     <script>
     $('#sgVideo').video('myvideo', options);
     </script>

Options is an object containing the following attributes:
 * preferrendTag: string. Default value: video. If anything else is passed the generated html is for a flash only video.
 * xhtmlStyleTag: boolean. Default value: false. Tells wether the generated html is in xhtml style or not.
 * autoplay: boolean. Default value: false. If true adds the autoplay attribute to the video tag.
 * controls: boolean. Default value: true. Wether to display video controls or not.
 * poster: boolean or string. Default value: false. This option is not implemented yet since it breaks Opera.
 * width: integer. Video width in pixels.
 * height: integer. Video height in pixels.

Note: In order to have a nice fallback for Internet Explorer it's probably a good idea to always pass video width and heigth.
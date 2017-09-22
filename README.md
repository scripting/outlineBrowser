# outlineBrowser

JavaScript code to display JSON outlines.

#### What it does

It reads a JSON file that looks <a href="http://liveblog.co/users/davewiner/2015/05/13/appleWatchNotes.json">like this</a> and renders it as an expandable outline, <a href="http://fargo.io/code/browsers/outlinebrowserdemo.html">like this</a>.

#### What is a JSON outline?

1. It's a JSON object that contains a <i>text</i> value, any number of other scalar values, and an array named <i>subs.</i>  

2. Each object in <i>subs</i> conforms to rule 1. 

#### Where this code is used

I use this code in two places:

1. To render outlines for reading in liveblog.co. (<a href="http://liveblog.co/users/davewiner/2015/05/13/appleWatchNotes.html">Example</a>)

2. To render outlines in rivers, to view outlines included in news items. (<a href="http://radio3.io/rivers/demo1/index.html">Example</a>)

#### Demo app

Here's a link to the <a href="http://fargo.io/code/browsers/outlinebrowserdemo.html">demo app</a> on my server so you can see what <a href="https://github.com/scripting/outlineBrowser/blob/master/outlinebrowserdemo.html">outlinebrowserdemo.html</a> looks like.

#### Dependencies

### Updates

#### v0.5.0 -- 9/22/17 by DW

Saving and restoring expansion state. Two new <a href="https://github.com/scripting/outlineBrowser/blob/master/outlinebrowser.js#L17">routines</a>, getExpansionState and applyExpansionState. The demo has been <a href="https://github.com/scripting/outlineBrowser/blob/master/outlinebrowserdemo.html">updated</a> to support the feature. Here's the <a href="http://scripting.com/2017/09/22.html#a125135">writeup</a> on Scripting News.

1. jQuery

2. Font Awesome

3. Bootstrap Toolkit


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

As of the initial release, neither of these examples use this actual library, but the goal is to have them do so.

#### Demo app

Here's a link to the <a href="http://fargo.io/code/browsers/outlinebrowserdemo.html">demo app</a> on my server so you can see what <a href="https://github.com/scripting/outlineBrowser/blob/master/outlinebrowserdemo.html">outlinebrowserdemo.html</a> looks like.

#### Dependencies

1. jQuery

2. Font Awesome

3. Bootstrap Toolkit


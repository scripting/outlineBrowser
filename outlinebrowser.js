//code that displays an outline jstruct in javascript

var outlineBrowserData = {
	version: "0.41",
	serialNum: 0
	}

function ecOutline (idnum) { 
	var c = document.getElementById ("idOutlineWedge" + idnum), idUL = "#idOutlineLevel" + idnum;
	if (c.className == "fa fa-caret-down") {
		c.className = "fa fa-caret-right";
		c.style.color = "black";
		$(idUL).slideUp (75);
		}
	else {
		c.className = "fa fa-caret-down";
		c.style.color = "silver";
		$(idUL).slideDown (75);
		}
	}
function renderOutlineBrowser (outline, flMarkdown, urlPermalink, permalinkString, flExpanded) {
	function stringLower (s) {
		if (s === undefined) { //1/26/15 by DW
			return ("");
			}
		s = s.toString (); //1/26/15 by DW
		return (s.toLowerCase ());
		}
	function isAlpha (ch) {
		return (((ch >= 'a') && (ch <= 'z')) || ((ch >= 'A') && (ch <= 'Z')));
		}
	function isNumeric (ch) {
		return ((ch >= '0') && (ch <= '9'));
		}
	function stripMarkup (s) { //5/24/14 by DW
		if ((s === undefined) || (s == null) || (s.length == 0)) {
			return ("");
			}
		return (s.replace (/(<([^>]+)>)/ig, ""));
		}
	function innerCaseName (text) { //8/12/14 by DW
		var s = "", ch, flNextUpper = false;
		text = stripMarkup (text); 
		for (var i = 0; i < text.length; i++) {
			ch = text [i];
			if (isAlpha (ch) || isNumeric (ch)) { 
				if (flNextUpper) {
					ch = ch.toUpperCase ();
					flNextUpper = false;
					}
				else {
					ch = ch.toLowerCase ();
					}
				s += ch;
				}
			else {
				if (ch == ' ') { 
					flNextUpper = true;
					}
				}
			}
		return (s);
		}
	function filledString (ch, ct) { //6/4/14 by DW
		var s = "";
		for (var i = 0; i < ct; i++) {
			s += ch;
			}
		return (s);
		}
	function getBoolean (val) { //12/5/13 by DW
		switch (typeof (val)) {
			case "string":
				if (val.toLowerCase () == "true") {
					return (true);
					}
				break;
			case "boolean":
				return (val);
			case "number":
				if (val == 1) {
					return (true);
					}
				break;
			}
		return (false);
		}
	function beginsWith (s, possibleBeginning, flUnicase) { 
		if (s.length == 0) { //1/1/14 by DW
			return (false);
			}
		if (flUnicase === undefined) {
			flUnicase = true;
			}
		if (flUnicase) {
			for (var i = 0; i < possibleBeginning.length; i++) {
				if (stringLower (s [i]) != stringLower (possibleBeginning [i])) {
					return (false);
					}
				}
			}
		else {
			for (var i = 0; i < possibleBeginning.length; i++) {
				if (s [i] != possibleBeginning [i]) {
					return (false);
					}
				}
			}
		return (true);
		}
	function debugNode (theNode) {
		var attstext = "";
		for (var x in theNode) {
			if ((x != "subs") && (x != "parent") && (x != "created")) {
				if (attstext.length > 0) {
					attstext +=  ", ";
					}
				attstext += x + "=" + theNode [x];
				}
			}
		return (attstext);
		}
	function getNodeType (theNode) {
		if (theNode.type == "include") {
			return (theNode.includetype); //this allows include nodes to have types
			}
		else {
			return (theNode.type);
			}
		}
	function getNameAtt (theNode) {
		var nameatt = theNode.name;
		if (nameatt === undefined) {
			nameatt = innerCaseName (theNode.text);
			}
		return (nameatt);
		}
	function typeIsDoc (theNode) {
		var type = getNodeType (theNode);
		return ((type !== undefined) && (type != "include") && (type != "link") && (type != "tweet"));
		}
	function getIcon (idnum, flcollapsed) {
		var wedgedir, color;
		if (flcollapsed) {
			wedgedir = "right";
			color = "black";
			}
		else {
			wedgedir = "down";
			color = "silver";
			}
		
		var clickscript = "onclick=\"ecOutline (" + idnum + ")\" ";
		var icon = "<span class=\"spOutlineIcon\"><a class=\"aOutlineWedgeLink\" " + clickscript + "><i class=\"fa fa-caret-" + wedgedir + "\" style=\"color: " + color + ";\" id=\"idOutlineWedge" + idnum + "\"></i></a></span>";
		return (icon);
		}
	function riverGetPermalinkString (urlPermalink, permalinkString) {
		if (urlPermalink == undefined) {
			return ("");
			}
		if (permalinkString == undefined) { 
			permalinkString = "#";
			}
		return ("<div class=\"divOutlinePermalink\"><a href=\"" + urlPermalink + "\">" + permalinkString + "</a></div>");
		}
	function expandableTextLink (theText, idLevel) {
		return ("<a class=\"aOutlineTextLink\" onclick=\"ecOutline (" + idLevel + ")\">" + theText + "</a>");
		}
	var htmltext = "", indentlevel = 0, permalink = riverGetPermalinkString (urlPermalink, permalinkString), outlinelevel = 0;
	if (flMarkdown === undefined) {
		flMarkdown = false;
		}
	if (flExpanded === undefined) { //10/23/14 by DW
		flExpanded = riverConfig.flOutlinesExpandedByDefault; //4/16/15 by DW
		}
	function add (s) {
		htmltext += filledString ("\t", indentlevel) + s + "\r\n";
		}
	function getHotText (outline) {
		var origtext = outline.text;
		return (expandableTextLink (origtext, outlineBrowserData.serialNum)); //5/7/15 by DW
		}
	function hasSubs (outline) {
		return (outline.subs != undefined) && (outline.subs.length > 0);
		}
	function getImgHtml (imgatt) { //4/28/15 by DW
		if (imgatt === undefined) {
			return ("");
			}
		else {
			return ("<img style=\"float: right; margin-left: 24px; margin-top: 14px; margin-right: 14px; margin-bottom: 14px;\" src=\"" + imgatt +"\">");
			}
		}
	function gatherStylesFromOutline (outline) { //11/5/14 by DW
		var atts = new Object (), styles = new Object ();
		for (var x in outline) {
			switch (x) {
				case "color":
				case "direction":
				case "font-family":
				case "font-size":
				case "font-weight":
				case "letter-spacing":
				case "line-height":
				case "margin-left":
				case "text-decoration":
				case "text-shadow":
				case "text-transform":
				case "white-space":
				case "word-spacing":
					styles [x] = outline [x];
					break;
				}
			}
		return (styles);
		}
	function getStylesString (outline, flcollapsed) { //11/7/14 by DW
		var styles = gatherStylesFromOutline (outline), style = "";
		if (flcollapsed) {
			styles.display = "none";
			}
		for (var x in styles) {
			style += x + ": " + styles [x] + "; ";
			}
		if (style.length > 0) {
			style = " style=\"" + style + "\"";
			}
		return (style);
		}
	function getSubsMarkdownText (outline) {
		var s = "", style = getStylesString (outline, false);
		for (var i = 0; i < outline.subs.length; i++) {
			var child = outline.subs [i], img = "", imgatt = $(child).attr ("img");
			
			if (!getBoolean (child.isComment)) { //5/2/15 by DW
				s += getImgHtml (imgatt) + child.text + "\r\r";
				if (hasSubs (child)) {
					s += getSubsMarkdownText (child);
					}
				}
			
			}
		return (s);
		}
	function addChildlessSub (theNode, path) { //5/20/15 by DW
		if (typeIsDoc (theNode)) {
			add ("<li><div class=\"divOutlineText\"><a href=\"" + path + "\">" + theNode.text + "</a></div></li>");
			}
		else {
			var type = getNodeType (theNode);
			switch (type) {
				case "link":
					add ("<li><div class=\"divOutlineText\"><a href=\"" + theNode.url + "\">" + theNode.text + "</a></div></li>");
					break;
				default:
					add ("<li><div class=\"divOutlineText\">" + theNode.text + "</div></li>");
					break;
				}
			}
		}
	function addSubs (outline, flcollapsed, path) {
		if (hasSubs (outline)) {
			var style = getStylesString (outline, flcollapsed);
			add ("<ul class=\"ulOutlineList ulLevel" + outlinelevel + "\" id=\"idOutlineLevel" + outlineBrowserData.serialNum++ + "\"" + style + ">"); indentlevel++; outlinelevel++;
			for (var i = 0; i < outline.subs.length; i++) {
				var child = outline.subs [i], flchildcollapsed = getBoolean (child.collapse), img = getImgHtml (child.img);
				if (!beginsWith (child.text, "<rule")) { //5/28/15 by DW
					if (!getBoolean (child.isComment)) { //5/2/15 by DW
						var childpath = path + getNameAtt (child); //5/20/15 by DW
						if (hasSubs (child)) {
							add ("<li>"); indentlevel++;
							add ("<div class=\"divOutlineText\">" + getIcon (outlineBrowserData.serialNum, flchildcollapsed) + img + getHotText (child) + "</div>");
							addSubs (child, flchildcollapsed, childpath + "/");
							add ("</li>"); indentlevel--;
							}
						else {
							addChildlessSub (child, childpath);
							}
						}
					}
				}
			add ("</ul>"); indentlevel--; outlinelevel--;
			}
		}
	
	
	if (hasSubs (outline)) { //9/22/14 by DW
		var flTopLevelCollapsed = !flExpanded, theText = getHotText (outline);
		add ("<div class=\"divRenderedOutline\">"); indentlevel++;
		add ("<div class=\"divItemHeader divOutlineHead divOutlineHeadHasSubs\">" + getIcon (outlineBrowserData.serialNum, flTopLevelCollapsed) + theText + permalink + "</div>");
		
		if (flMarkdown) {
			var markdowntext = getSubsMarkdownText (outline), style = "";
			if (flTopLevelCollapsed) { //10/23/14 by DW
				style = " style=\"display: none;\"";
				}
			var opendiv = "<div class=\"divMarkdownSubs\" id=\"idOutlineLevel" + outlineBrowserData.serialNum++ + "\" " + style + ">";
			add (opendiv + marked (markdowntext) + "</div>");
			}
		else {
			add ("<div class=\"divOutlineSubs\">"); indentlevel++;
			addSubs (outline, flTopLevelCollapsed, "");
			add ("</div>"); indentlevel--;
			}
		
		add ("</div>"); indentlevel--;
		
		outlineBrowserData.serialNum++; //9/22/14 by DW
		}
	else {
		add ("<div class=\"divRenderedOutline\">"); indentlevel++;
		add ("<div class=\"divItemHeader divOutlineHead\">" + hotUpText (outline.text, outline.url) + permalink + "</div>");
		add ("</div>"); indentlevel--;
		}
	
	return (htmltext);
	}

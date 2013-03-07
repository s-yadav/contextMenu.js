contextMenu.js
==============

<p>contextMenu.js is a   plugin to create windows like context menu with keyboard ineteraction, different  type of inputs ,trigger events and much more.<br />
  Why contextMenu.js ?:</p>
<ul>
  <li>Light weight.</li>
  <li>Use as simple popup or as a context menu.(Two mode plugin)</li>
  <li>Adjust position and size to fit in viewport.</li>
  <li>Keyboard interaction.</li>
  <li>Support different type of inputs (json, UL list)  .</li>
  <li>Trigger Context menu with right-click, left-click, hover or other mouse events.</li>
  <li>Css outside of javascript so you can edit the  look of menu.</li>
  <li>Enable/disable options.</li>
  <li>Optional icons for commands.</li>
  <li>Configurable options.</li>
  <li>Submenus</li>
</ul>

<h3>Options</h3>
<table width="100%" border="1">
  <tr>
    <td width="16%">Option</td>
    <td width="20%">Default</td>
    <td width="37%">Allowed</td>
    <td width="27%">Description</td>
  </tr>
  <tr>
    <td>triggerOn</td>
    <td>click</td>
    <td>click,hover, mousemove, dblclick and all mouse events</td>
    <td>Event in which context menu is binded with a trigger.</td>
  </tr>
  <tr>
    <td>displayAround</td>
    <td>cursor</td>
    <td>cursor&nbsp;, trigger (button)</td>
    <td>Display context menu around cursor position or trigger position</td>
  </tr>
  <tr>
    <td>mouseClick</td>
    <td>left</td>
    <td>left,right</td>
    <td>which mouse button to trigger context menu if trigger event is mouse click or mouse up event.</td>
  </tr>
  <tr>
    <td>verAdjust</td>
    <td>0</td>
    <td>Numeric value </td>
    <td>Adjusting the vertical distance from its original pixel.</td>
  </tr>
  <tr>
    <td>horAdjust</td>
    <td>0</td>
    <td>Numeric value </td>
    <td>Adjusting the horizontal distance from its original pixel.</td>
  </tr>
  <tr>
    <td>sizeStyle</td>
    <td>auto</td>
    <td>auto, content</td>
    <td>If&nbsp;auto, size of context menu depends on browser size and options you selected. If content size depends on content width and height.</td>
  </tr>
  <tr>
    <td>position</td>
    <td>auto</td>
    <td>auto,left,right,top,bottom</td>
    <td>Context menu adjust according to viewport. If other than auto is given it ill force contenxt menu to be on that position.</td>
  </tr>
</table>
<br />
<br />
<h3>Callback</h3>
<table width="100%" border="1">
  <tr>
    <td width="23%">Callback</td>
    <td width="77%">Description</td>
  </tr>
  <tr>
    <td>onOpen</td>
    <td>This is called just before context menu opens.</td>
  </tr>
  <tr>
    <td>onClose</td>
    <td>This is called just after context menu is closed.</td>
  </tr>
</table>
<br />
<h3>Method</h3>
<table width="100%" border="1">
  <tr>
    <td width="23%">Method</td>
    <td width="77%">Description</td>
  </tr>
  <tr>
    <td>menu</td>
    <td>This mode is used to show menu. Keyboard interaction and sub menus are activated in this mode.</td>
  </tr>
  <tr>
    <td>popup</td>
    <td>If you just want to display an popup window at your trigger point popup mode serve best. This will just show element defined in selector while adjusting it according to view port.</td>
  </tr>
  <tr>
    <td>update</td>
    <td>This mode is used to update the menu items and option(like enabling, disabling, icon change etc.)</td>
  </tr>
  <tr>
    <td>refresh</td>
    <td>If new trigger with specific selector is added, this method is used to initialize context menu on those newly added elements.</td>
  </tr>
  <tr>
    <td>destroy</td>
    <td>Remove context menu instance for that trigger completly</td>
  </tr>
</table>
<p>

Usage
=====
<pre><code>
$('.triiger).contextMenu(method,selector,options);
</code></pre>

1. method tells what operation to trigger . By default it is popup if selector is string type (selector notation),document object or jquery object and menu if selector is json object.
2. selector can be document object , jQuery object ,selector string or JSON object.
3. There are different options to change the behaviour of context menu. This parameter is optional where all options contain some default value.

For menu mode input can be given in two way.<br />
<strong>Ul list.</strong><br />
Example for the list
<pre><code>
&lt;ul class=&quot;contextMenu&quot;&gt;
    &lt;li title=&quot;create button&quot; onclick=&quot;doCreate()&quot;&gt;Create&lt;/li&gt;
    &lt;li title=&quot;update button&quot; onclick=&quot;doUpdate()&quot;&gt;Update
        &lt;ul&gt;
            &lt;li onclick=&quot;doMerge()&quot;&gt;Merge&lt;/li&gt;
            &lt;li&gt;Replace
                &lt;ul&gt;
                    &lt;li&gt;Replace Top 100&lt;/li&gt;
                    &lt;li&gt;Replace All&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/li&gt;
        &lt;/ul&gt;
    &lt;/li&gt;
    &lt;li onclick=&quot;doDelete()&quot;&gt;Delete
        &lt;ul&gt;
            &lt;li&gt;Soft Delete&lt;/li&gt;
            &lt;li&gt;Hard Delete&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/li&gt;
    &lt;li class=&quot;m-disable&quot;&gt;Disabled&lt;/li&gt;
&lt;/ul&gt;
</code></pre>
  
<strong>JSON object.</strong><br />
<pre><code>
    var menu = [{
  	    name: 'create',
  	    img: 'images/create.png',
  	    title: 'create button',
  	    fun: function () {
  	        say('i am add button')
  	    }
  	}, {
  	    name: 'update',
  	    img: 'images/update.png',
  	    title: 'update button',
  	    fun: function () {
  	        say('i am update button')
  	    },
  	    subMenu: [{
  	        name: 'merge',
  	        title: 'It will merge row',
  	        fun: function () {
  	            say('It will merge row')
  	        }
  	    }, {
  	        name: 'replace',
  	        subMenu: [{
  	            name: 'replace top 100'
  	        }, {
  	            name: 'replace all'
  	        }]
  	    }]
  	}, {
  	    name: 'delete',
  	    img: 'images/create.png',
  	    title: 'create button',
  	    fun: function () {
  	        say('i am add button')
  	    },
  	    submenu: [{
  	        'name': 'soft delete',
  	    }, {
  	        'name': 'hard delete'
  	    }]

  	}];
</code></pre>

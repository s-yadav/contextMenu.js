contextMenu.js
==============
<p>contextMenu.js is a   plugin to create windows like context menu with keyboard interaction, different  type of inputs ,trigger events and much more.<br />
  Why contextMenu.js ?:</p>
<ul>
  <li>Use as simple popup or as a context menu. With some twick can be used for multi purpose.</li>
  <li>Adjust position and size to fit in viewport.</li>
  <li>Keyboard interaction.</li>
  <li>Support different type of inputs (structure object, UL list)  .</li>
  <li>Trigger Context menu with right-click, left-click,hover or any other mouse events.</li>
  <li>Css outside of javascript so you can edit the  look of menu.</li>
  <li>Enable/disable options.</li>
  <li>Optional icons for commands.</li>
  <li>Lot of configurable options.</li>
  <li>Submenus</li>
</ul>
<strong>See demo on http://ignitersworld.com/lab/contextMenu.html#demo</strong>

<h3>Latest Update (v 1.2.0)</h3>
<ol>
  <li>Added a "closeOnClick" option to close contentext menu on click of any item.</li>
  <li>Added a className key when generating context menu through object to give style on specific item of menu.</li>
  <li>Fixed keybord event.</li>
</ol>

<h3 id="optionDoc">Options</h3>
<table width="100%" border="1">
  <tr>
    <td width="15%">Option</td>
    <td width="10%">Default</td>
    <td width="30%">Allowed</td>
    <td width="45%">Description</td>
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
    <td>top</td>
    <td>auto</td>
    <td>auto,top position in px&nbsp;or %</td>
    <td>Defines the exact top position relative to the containment where menu to be shown.</td>
  </tr>
  <tr>
    <td>left</td>
    <td>auto</td>
    <td>auto,top position in px&nbsp;or %</td>
    <td>Defines the exact left position relative to the containment where menu to be shown.</td>
  </tr>
  <tr>
    <td>containment</td>
    <td>window</td>
    <td>window, any selector,jquery object, document object</td>
    <td>Define the container inside which context menu will be contained.</td>
  </tr>
  <tr>
    <td>winEventClose</td>
    <td>true</td>
    <td>true,false</td>
    <td>If true close the context menu on window scroll and resize event.</td>
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
    <td>Context menu adjust according to viewport. If other than auto is given it ill force contenxt menu to be on that position. It is considered only when displayAround is set to trigger.</td>
  </tr>
</table>
<br />
<br />
<h3 id="callbackDoc">Callback</h3>
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
    <td>afterOpen</td>
    <td>This is called after context menu opens.</td>
  </tr>
  <tr>
    <td>onClose</td>
    <td>This is called just after context menu is closed.</td>
  </tr>
</table>
Callback accept two argument. <br />
<strong>1. data :</strong> Which containg refrence to trigger and menu.<br />
You can get trigger and menu using data.trigger and data.menu.<br />
<strong>2. event :</strong> A event object which is binded with trigger to open context menu.</p>
Inside callback this refers to trigger element.
<br />
<h3 id="methodDoc">Method</h3>
<table width="100%" border="1">
  <tr>
    <td width="23%">Method</td>
    <td width="77%">Description</td>
  </tr>
  <tr>
    <td>menu</td>
    <td>This mode is used to show context menu. Keyboard interaction and sub menus are activated in this mode.</td>
  </tr>
  <tr>
    <td>popup</td>
    <td>If you just want to display an popup window at your trigger point popup mode serve best. This will just show element defined in selector while adjusting it according to view port.</td>
  </tr>
  <tr>
    <td>update</td>
    <td>This mode is used to update the menu items (like enabling, disabling, icon change and function) and configuration option.</td>
  </tr>
  <tr>
    <td>refresh</td>
    <td>If new&nbsp;trigger with specific selector is added, this method is used to initialize context menu on those newly added elements.</td>
  </tr>
  <tr>
    <td>destroy</td>
    <td>Remove context menu instance for that trigger completely.</td>
  </tr>
  <tr>
    <td>close</td>
    <td>To manually close context menu.</td>
  </tr>
</table>
Popup method is default when selector type is selector string , jquery object, DOM object. Menu method is default when selector type is structure object.
<h3 id="menuParameterDoc">Context menu parameters</h3>
Context menu accept three parameters.</p>
<pre><code>$('.trigger).contextMenu(method,selector,options)</code></pre>
<strong>1. method</strong> tells what operation to trigger . By default it is popup if selector is string type (selector notation) and menu if&nbsp;selector is structure object.<br>
<strong>2. selector</strong> can be document object , jQuery object ,selector string or structure object.<br />
<strong>3. option</strong>, there are different options to change the behaviour of context menu. This parameter is optional where all options contain some default value.
    .
<h3 id="inputFormatDoc">Input format </h3>
If defined in menu mode you can provide input in two way.<br>
1. By passing selector of ul list.<br>
2. By passing a array of objects containg menu defination.<br>
<br>
<strong>1. UL List format</strong><br>
<pre><code>
&lt;ul class=&quot;contextMenu&quot;&gt;
    &lt;li title=&quot;create button&quot; onclick=&quot;doCreate()&quot;&gt;
        &lt;img src=&quot;images/create.png&quot; class=&quot;iw-mIcon&quot; /&gt;Create&lt;/li&gt;
    &lt;li title=&quot;update button&quot; onclick=&quot;doUpdate()&quot;&gt;
        &lt;img src=&quot;images/update.png&quot; class=&quot;iw-mIcon&quot; /&gt;Update
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
    &lt;li onclick=&quot;doDelete()&quot;&gt;
        &lt;img src=&quot;images/delete.png&quot; class=&quot;iw-mIcon&quot; /&gt;Delete
        &lt;ul&gt;
            &lt;li&gt;Soft Delete&lt;/li&gt;
            &lt;li&gt;Hard Delete&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/li&gt;
    &lt;li class=&quot;iw-mDisable&quot;&gt;Disabled&lt;/li&gt;
&lt;/ul&gt;
  </code></pre>
  **Note** <br>
  1. To disable any option add "iw-mDisable" class in the option.<br>
  2. Submenu are ul list inside a option li.<br/>
  3. Option icon have class "iw-mIcon".
  
<br>
<br>
<strong>Structure object format </strong>
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
        disable:true,
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
Keys :<br>
<strong>1. name</strong> : name of the option.<br>
<strong>2. img</strong> :option icon image.<br>
<strong>3. title</strong> : tiltes for the options.<br>
<strong>4. disable</strong> : A boolean to tell weather that option is disabled or not. If true option is disabled.<br>
<strong>5. fun</strong> :Function that will be executed on click of option.<br>
<strong>6. submenu</strong> : A submenu defination which has all options available as we are giving for parent menu. Submenus can bgo to any level.


<h3 id="keyInterationDoc">Key board interaction.</h3>
<table width="800" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="223">Key</td>
    <td width="577">Operation</td>
  </tr>
  <tr>
    <td>Up arrow</td>
    <td>Go to previous option in menu.<br /></td>
  </tr>
  <tr>
    <td>Down arrow</td>
    <td>Go to next option in menu.</td>
  </tr>
  <tr>
    <td height="20">Left arrow</td>
    <td>Go to parent menu.</td>
  </tr>
  <tr>
    <td>Right arrow</td>
    <td>Go to sub(child) menu.</td>
  </tr>
  <tr>
    <td>Page up</td>
    <td>Go to first option.</td>
  </tr>
  <tr>
    <td>Page down</td>
    <td>Go to last option.</td>
  </tr>
  <tr>
    <td>Esc key</td>
    <td>Close context menu.</td>
  </tr>
  <tr>
    <td>Enter Key</td>
    <td>Trigger the function associated with option.</td>
  </tr>
</table>
<br>
<h3 id="closingMenuDoc">Closing of menu</h3>
Menus are closed in following actions of user.<br>
1. On esc key press.<br>
2. On clicking outside of window.<br>
3. Window scroll or resize events(If winEventClose not set to false).

<h3 id="updatingMenuDoc">Updating menu</h3><br>
A menu configuration options and image icon, disabling, title and  function can be changed dynamically. If you want to change the structure, you need to destroy menu and create again.<br>
You also can't change the option name, as it its part of structure.
To update a menu you can pass update structure and configuration option.<br><br>
Update structure object is similiar to input sturcture object but in this you need to only pass those key which you want to update.
Ex.<br>
<pre>
<code>
var updateObj = [{
    name: 'create',
    disable: 'true',
}, {
    name: 'update',
    subMenu: [{
        name: 'replace',
        disable: 'true',
    }]
}];

$('.trigger').contextMenu('update', updateObj, {
    'displayAround': 'trigger',
    'containment': '#contaienr'
});
</code></pre><br>

You can also directly change on html dom.<br>
If you know the selector of menu its great or else you can get menu object by.<br>
<pre><code> var menu=$('.trigger').contextMenu('value','menu'); </code></pre>
<br>
Now you can update it however you want.After that call update method( with configuration option, if you want to change it).<br>
<pre><code>
$('.trigger').contextMenu('update',updateObj,{
    'displayAround':'trigger',
    'containment':'#container'
});
</code></pre>
For enabling/disabling a menu option just add "iw-mDisable" class if you are changing in html dom.<br>
Else if you are updating using structure object add disable key with value of true(to disable) or false(to enable) in object.

<h3 id="refreshTriggerListDoc">Refreshing trigger list</h3>
If you working on dynamic content you may require to add newly added element in trigger list.<br>
You can refresh the trigger list using <br>
<pre><code>$('.trigger').contextMenu('refresh');</code></pre>

Note : Refresh method work only when contextMenu is already initialized to any one of element which belongs to that selector. 

<h3 id="destroyMenuDoc">Destroying a context menu</h3>
This method will destroy context menu binded with trigger element. To call destroy method.<br>
<pre><code>$('.trigger').contextMenu('destroy');</code></pre>
<br>

<h3 id="gettingValueDoc">Getting values associated with context menu.</h3>
value method return value associated with key passed as second argument.<br>
ex :
<pre><code>$('.trigger').contextMenu('value',key);</code></pre>

Here key are 'menu','menuId' and any configuration options.

<h3 id="cssDoc">CSS Class</h3>
Following classes are associated with context menu.
<table width="100%%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td>Class</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>iw-contextMenu</td>
    <td>All context menu get this class on initializing context menu</td>
  </tr>
  <tr>
    <td>iw-cm-menu</td>
    <td>This class is added on those which are activated in menu mode.</td>
  </tr>
  <tr>
    <td>iw-mOverlay</td>
    <td>This class is applied on overlay which come inside menu option when we disable that option</td>
  </tr>
  <tr>
    <td>iw-mDisable</td>
    <td>This class is added on menu options which are disabled.</td>
  </tr>
  <tr>
    <td>iw-mSelected</td>
    <td>This class is added on menu option which is currently focused.</td>
  </tr>
  <tr>
    <td>iw-cm-arrow-right</td>
    <td>If any menu option have submenu a arrow sign is added with this class to show it has submenu.</td>
  </tr>
  <tr>
    <td>iw-mTrigger</td>
    <td>This class is added on all triggers and also on menu option which have submenus.</td>
  </tr>
  <tr>
    <td>iw-mIcon</td>
    <td>This class is added on icon images used for menu options.</td>
  </tr>
</table>

/*
contextMenu.js v 1.0.0 Beta
Author: Sudhanshu Yadav
s-yadav.github.com
Copyright (c) 2013 Sudhanshu Yadav.
Dual licensed under the MIT and GPL licenses
*/
;(function ($, window, document, undefined) {
    $.fn.contextMenu = function (method, selector, option) {
        "use strict";
        //parameter fix
        if (!methods[method]) {
            option = selector;
            selector = method;
            method = 'popup';
        }


        //need to check for array object
        else if (selector != null) {
            if (!((selector instanceof Array) || (typeof selector === 'string') || (selector.nodeType) || (selector.jquery))) {
                option = selector;
                selector = null;
            }
        }

        if ((selector instanceof Array) && (method != 'update')) {
            method = 'menu'
        }

        var myoptions = option;
        if (method != 'update') {
            option = internalMethods.optionOtimizer(method, option);
            var myoptions = $.extend({}, $.fn.contextMenu.defaults, option);
            if (!myoptions.baseTrigger) {
                myoptions.baseTrigger = this;
            }
        }
        methods[method].call(this, selector, myoptions);
        return this;
    };
    $.fn.contextMenu.defaults = {
        triggerOn: 'click', //avaliable options are all event related mouse plus enter option
        displayAround: 'cursor', // cursor or trigger
        mouseClick: 'left',
        verAdjust: 0,
        horAdjust: 0,
        sizeStyle: 'auto', //allowed values are auto and content (popup size will be according content size)
        position: 'auto', //allowed values are top, left, bottom and right
        //callback
        onOpen: function (data, event) {},
        onClose: function (data, event) {},
    }

    var methods = {
        menu: function (selector, option) {
            var trigger = $(this);
            selector = internalMethods.createMenuList(trigger, selector, option);
            internalMethods.contextMenuBind.call(this, selector, option, 'menu');
        },
        popup: function (selector, option) {
            $(selector).addClass('iw-contextMenu');
            internalMethods.contextMenuBind.call(this, selector, option, 'popup');
        },
        update: function (selector, option) {
            this.each(function () {
                var trgr = $(this),
                    menuData = trgr.data('iw-menuData'),
                    menu = menuData.menu;
                if (typeof selector === 'object') {

                    for (var i = 0; i < selector.length; i++) {
                        var name = selector[i].name,
                            disable = selector[i].disable,
                            elm = menu.find('li').filter(function () {
                                return $(this).text() == name;
                            }),
                            subMenu = selector[i].subMenu;

                        if (disable == 'true') {
                            elm.addClass('m-disable');
                        } else {
                            elm.removeClass('m-disable');
                        }

                        //to change submenus
                        if (subMenu) {
                            elm.contextMenu('update', subMenu);
                        }
                    }

                    internalMethods.onOff(menu);
                }

                menuData.option = $.extend({}, menuData.option, option);
                trgr.data('iw-menuData', menuData)
            });
        },
        refresh: function () {
            var menuData = this.filter(function () {
                return $(this).data('iw-menuData') != null;
            }).data('iw-menuData'),
                newElm = this.filter(function () {
                    return $(this).data('iw-menuData') == null;
                })
                internalMethods.contextMenuBind.call(newElm, menuData.menuSelector, menuData.option);
        },
        destroy: function () {
            this.each(function () {
                var trgr = $(this),
                    menuId = trgr.data('iw-menuData').menuId,
                    menu = $('.iw-contextMenu[menuId=' + menuId + ']');
                trgr.unbind('.contextMenu');
                $('#contextMenuTempTextBox').remove();
                for (var i = 0; i < menu.length; i++) {
                    var cur = $(menu[i]),
                        menuData = cur.data('iw-menuData');

                    if (menuData.noTrigger == 1) {

                        if (cur.hasClass('iw-created')) {
                            cur.remove();
                            break;
                        } else {
                            cur.removeClass('iw-contextMenu ' + cur.attr['menuId'])
                                .removeAttr('menuId').removeData('iw-menuData');
                        }
                    } else {
                        menuData.noTrigger--;
                        cur.data('iw-menuData', menuData);
                    }
                }
                trgr.removeData('iw-menuData');
            });
        }
    };
    var internalMethods = {
        contextMenuBind: function (selector, option, method) {
            var trigger = this,
                menu = $(selector),
                menuData = menu.data('iw-menuData');

            //fallback
            if (menu.length == 0) {
                menu = trigger.find(selector);
                if (menu.length == 0) {
                    return;
                }
            }

            if (method == 'menu') {
                internalMethods.menuHover(menu);
            }
            //get base trigger
            var baseTrigger = option.baseTrigger;

            //to add current menu.
            if (baseTrigger.index(trigger) != -1) {
                menu.addClass('iw-curMenu');
            }


            if (!menuData) {
                var menuId;
                if (!baseTrigger.data('iw-menuData')) {
                    menuId = Math.ceil(Math.random() * 100000);
                    baseTrigger.data('iw-menuData', {
                        'menuId': menuId
                    });
                } else {
                    menuId = baseTrigger.data('iw-menuData').menuId;
                }
                //create clone menu to calculate exact height and width.
                var cloneMenu = menu.clone();
                cloneMenu.appendTo('body');

                menuData = {
                    'menuId': menuId,
                    'menuWidth': cloneMenu.outerWidth(true),
                    'menuHeight': cloneMenu.outerHeight(true),
                    'noTrigger': 1,
                    'trigger': trigger
                };


                //to set data on selector
                menu.data('iw-menuData', menuData).attr('menuId', menuId);
                //remove clone menu
                cloneMenu.remove();
            } else {
                menuData.noTrigger++;
                menu.data('iw-menuData', menuData);
            }

            //to set data on trigger
            trigger.data('iw-menuData', {
                'menuId': menuData.menuId,
                'option': option,
                'menu': menu,
                'menuSelector': selector,
                'method': method
            });

            //hover fix
            if (option.triggerOn == 'hover') {
                var eventType = 'mouseenter';
                //hover out if display is of context menu is on hover
                if (baseTrigger.index(trigger) != -1) {
                    baseTrigger.add(menu).bind('mouseleave.contextMenu', function (e) {
                        if ($(e.relatedTarget).closest('.iw-contextMenu').length == 0) {
                            $('.iw-contextMenu[menuId="' + menuData.menuId + '"]').hide(100);
                        }
                    });
                }

            } else {
                var eventType = option.triggerOn;
            }


            //to add temprory textbox
            internalMethods.tempTextBox();

            //to bind event		
            trigger.bind(eventType + '.contextMenu', internalMethods.eventHandler);

            //to stop bubbling in menu
            menu.bind('click mouseenter mouseleave', function () {
                return false;
            });
        },
        eventHandler: function (e) {
            e.preventDefault();
            var trigger = $(this),
                trgrData = trigger.data('iw-menuData'),
                menu = trgrData.menu,
                menuData = menu.data('iw-menuData'),
                option = trgrData.option;

            //call open callback
            option.onOpen.call(this, {
                trigger: trigger,
                menu: menu
            }, e);

            var windowHeight = $(window).height(),
                windowWidth = $(window).width(),
                menuHeight = menuData.menuHeight,
                menuWidth = menuData.menuWidth,
                verAdjust = parseInt(option.verAdjust),
                horAdjust = parseInt(option.horAdjust);

            if (option.sizeStyle == 'auto') {
                menuHeight = Math.min(menuHeight, (windowHeight));
                menuWidth = Math.min(menuWidth, (windowWidth));
            }
            if (option.displayAround == 'cursor') {
                var left = e.pageX - $(window).scrollLeft(),
                    top = e.pageY - $(window).scrollTop();
                var bottomMenu = top + menuHeight,
                    rightMenu = left + menuWidth;
                //max height and width of context menu
                if (bottomMenu > windowHeight) {
                    if ((top - menuHeight) < 0) {
                        if ((bottomMenu - windowHeight) < (menuHeight - top)) {
                            top = windowHeight - menuHeight;
                            verAdjust = -1 * verAdjust;
                        } else {
                            top = 0;
                            verAdjust = 0;
                        }
                    } else {
                        top = top - menuHeight;
                        verAdjust = -1 * verAdjust;
                    }
                }
                if (rightMenu > windowWidth) {
                    if ((left - menuWidth) < 0) {
                        if ((rightMenu - windowWidth) < (menuWidth - left)) {
                            left = windowWidth - menuWidth;
                            horAdjust = -1 * horAdjust;
                        } else {
                            left = 0;
                            horAdjust = 0;
                        }
                    } else {
                        left = left - menuWidth;
                        horAdjust = -1 * horAdjust;
                    }
                }
            } else if (option.displayAround == 'trigger') {
                var triggerHeight = trigger.outerHeight(true),
                    triggerWidth = trigger.outerWidth(true),
                    triggerLeft = trigger.offset().left - $(window).scrollLeft(),
                    triggerTop = trigger.offset().top - $(window).scrollTop(),
                    left = triggerLeft + triggerWidth,
                    top = triggerTop,
                    leftShift = triggerWidth;



                var bottomMenu = top + menuHeight,
                    rightMenu = left + menuWidth;
                //max height and width of context menu
                if (bottomMenu > windowHeight) {
                    if ((top - menuHeight) < 0) {
                        if ((bottomMenu - windowHeight) < (menuHeight - top)) {
                            top = windowHeight - menuHeight;
                            verAdjust = -1 * verAdjust;
                        } else {
                            top = 0;
                            verAdjust = 0;
                        }
                    } else {
                        top = top - menuHeight + triggerHeight;
                        verAdjust = -1 * verAdjust;
                    }
                }
                if (rightMenu > windowWidth) {
                    if ((left - menuWidth) < 0) {
                        if ((rightMenu - windowWidth) < (menuWidth - left)) {
                            left = windowWidth - menuWidth;
                            horAdjust = -1 * horAdjust;
                            leftShift = -triggerWidth;
                        } else {
                            left = 0;
                            horAdjust = 0;
                            leftShift = 0;
                        }
                    } else {
                        left = left - menuWidth - triggerWidth;
                        horAdjust = -1 * horAdjust;
                        leftShift = -triggerWidth;
                    }
                }
                //test end
                if (option.position == 'top') {
                    menuHeight = Math.min(menuData.menuHeight, triggerTop);
                    top = triggerTop - menuHeight;
                    verAdjust = parseInt(option.verAdjust);
                    left = left - leftShift;
                } else if (option.position == 'left') {
                    menuWidth = Math.min(menuData.menuWidth, triggerLeft);
                    left = triggerLeft - menuWidth;
                    horAdjust = parseInt(option.horAdjust);
                } else if (option.position == 'bottom') {
                    menuHeight = Math.min(menuData.menuHeight, (windowHeight - triggerTop - triggerHeight));
                    top = triggerTop + triggerHeight;
                    verAdjust = parseInt(option.verAdjust);
                    left = left - leftShift;
                } else if (option.position == 'right') {
                    menuWidth = Math.min(menuData.menuWidth, (windowWidth - triggerLeft - triggerWidth));
                    left = triggerLeft + triggerWidth;
                    horAdjust = parseInt(option.horAdjust);
                }
            }
            //to draw contextMenu
            var outerLeftRight = menu.outerWidth(true) - menu.width(),
                outerTopBottom = menu.outerHeight(true) - menu.height();


            //applying css property
            var cssObj = {
                'display': 'inline-block',
                'top': top + verAdjust + 'px',
                'height': '',
                'width': '',
                'overflow-y': menuHeight != menuData.menuHeight ? 'auto' : 'hidden',
                'overflow-x': menuWidth != menuData.menuWidth ? 'auto' : 'hidden'
            };

            if (option.sizeStyle == 'auto') {
                cssObj.height = menuHeight - outerTopBottom + 'px';
                cssObj.width = menuWidth - outerLeftRight + 20 + 'px';
                left = left + (20 * (option.horAdjust == horAdjust ? 0 : -1));
            }
            cssObj.left = left + horAdjust + 'px';

            menu.css(cssObj);

            //to assign event
            $('#iw-tempTxt').focus();

            //to add current menu class
            if (trigger.closest('.iw-contextMenu').length == 0) {
                $('.iw-curMenu').removeClass('iw-curMenu');
                menu.addClass('iw-curMenu');
            }

            $(document.documentElement).unbind('keyup', internalMethods.keyEvent);
            $('body').unbind('click', internalMethods.clickEvent);
            var dataParm = {
                trigger: trigger,
                menu: menu,
                option: option,
                method: trgrData.method
            }
            $('body').click(dataParm, internalMethods.clickEvent);
            $(document.documentElement).keyup(dataParm, internalMethods.keyEvent);
            $(window).bind('scroll resize', dataParm, internalMethods.scrollEvent);
        },

        scrollEvent: function (e) {
            internalMethods.closeContextMenu(e.data.option, e.data.trigger, e.data.menu, e);
        },

        clickEvent: function (e) {
            var button = e.data.trigger.get(0);

            if ((button !== e.target) && ($(e.target).closest('.iw-contextMenu').length == 0)) {
                internalMethods.closeContextMenu(e.data.option, e.data.trigger, e.data.menu, e);
            }
        },
        closeContextMenu: function (option, trigger, menu, e) {

            //unbind all events from top DOM
            $(document.documentElement).unbind('keyup', internalMethods.keyEvent);
            $('body').unbind('click', internalMethods.clickEvent);
            $(window).unbind('scroll resize', internalMethods.scrollEvent);
            $('.iw-contextMenu').hide();
            $(document).focus();

            //call close function
            option.onClose.call(this, {
                trigger: trigger,
                menu: menu
            }, e);
        },
        keyEvent: function (e) {
            var menu = e.data.menu,
                option = e.data.option,
                keyCode = e.keyCode;
            // handle cursor keys
            if (keyCode == 27) {
                internalMethods.closeContextMenu(option, e.data.trigger, menu, e);
            }
            if (e.data.method == 'menu') {
                var curMenu = $('.iw-curMenu'),
                    optList = curMenu.children('li:not(.m-disable)');
                selected = optList.filter('.iw-selectedMenu'),
                index = optList.index(selected),
                focusOn = function (elm) {
                    selected.removeClass('iw-selectedMenu')
                    elm.addClass('iw-selectedMenu');
                },
                first = function () {
                    focusOn(optList.filter(':first'))
                },
                last = function () {
                    focusOn(optList.filter(':last'))
                },
                next = function () {
                    focusOn(optList.filter(':eq(' + (index + 1) + ')'))
                },
                prev = function () {
                    focusOn(optList.filter(':eq(' + (index - 1) + ')'))
                },
                subMenu = function () {
                    var menuData = selected.data('iw-menuData');
                    if (menuData) {
                        selected.triggerHandler('mouseenter.contextMenu');
                        var selector = menuData.menu;
                        curMenu.removeClass('iw-curMenu');
                        curMenu = selector;
                        selector.addClass('iw-curMenu');
                        first();
                    }
                },
                parMenu = function () {
                    var selector = curMenu.data('iw-menuData').trigger;
                    var parMenu = selector.closest('.iw-contextMenu');
                    if (parMenu.length != 0) {
                        curMenu.removeClass('iw-curMenu').css('display', 'none');
                        parMenu.addClass('iw-curMenu');
                    }
                };
                switch (keyCode) {
                    case 13:
                        selected.click();
                        break;
                    case 40:
                        selected.length == 0 ? first() : next();
                        break;
                    case 38:
                        selected.length == 0 ? last() : prev();
                        break;
                    case 33:
                        first();
                        break;
                    case 34:
                        last();
                        break;
                    case 37:
                        parMenu();
                        break;
                    case 39:
                        subMenu();
                        break;
                }
            }
        },
        menuHover: function (menu) {
            menu.children('li').bind('mouseenter', function (e) {
                //to make curmenu
                $('.iw-curMenu').removeClass('iw-curMenu');
                menu.addClass('iw-curMenu');
                //to select the list
                var selected = menu.find('li.iw-selectedMenu'),
                    submenu = selected.find('.iw-contextMenu');
                if ((submenu.length != 0) && (selected[0] != this)) {
                    submenu.hide(100);
                }
                selected.removeClass('iw-selectedMenu');
                $(this).addClass('iw-selectedMenu');
            });
        },
        createMenuList: function (trgr, selector, option) {
            var baseTrigger = option.baseTrigger,
                randomNum = Math.floor(Math.random() * 10000);
            if ((typeof selector == 'object') && (!selector.nodeType) && (!selector.jquery)) {
                var menuList = $('<ul class="iw-contextMenu iw-created" id="iw-contextMenu' + randomNum + '"></ul>');
                for (var i = 0; i < selector.length; i++) {
                    var name = selector[i].name,
                        fun = selector[i].fun,
                        subMenu = selector[i].subMenu,
                        img = selector[i].img || '',
                        title = selector[i].title || name,
                        disable = selector[i].disable,
                        list = $('<li title="' + title + '">' + name + '</li>');
                    if ((img != null) && (img != '')) {
                        list.prepend('<img src="' + img + '" align="absmiddle" style="width:20px; height:20px; margin-right:10px" />');
                    }

                    //to add disable
                    if (disable == 'true') {
                        list.addClass('m-disable');
                    }

                    list.bind('click', fun);

                    //to create sub menu
                    menuList.append(list);
                    if (subMenu) {
                        list.append('<div class="iw-arrow-right" />');
                        internalMethods.subMenu(list, subMenu, baseTrigger);
                    }
                }
                if (baseTrigger.index(trgr[0]) == -1) {
                    trgr.append(menuList)
                } else {
                    $('body').append(menuList);
                }

                internalMethods.onOff($('#iw-contextMenu' + randomNum));
                return '#iw-contextMenu' + randomNum;
            } else if ($(selector).length != 0) {
                var element = $(selector);
                element.removeClass('iw-contextMenuCurrent')
                    .addClass('iw-contextMenu iw-contextMenu' + randomNum)
                    .attr('menuId', 'iw-contextMenu' + randomNum)
                    .css('display', 'none');

                //to create subMenu
                element.find('ul').each(function (index, element) {
                    var subMenu = $(this),
                        parent = subMenu.parent('li');
                    parent.append('<div class="iw-arrow-right" />');
                    subMenu.addClass('iw-contextMenuCurrent');
                    internalMethods.subMenu(parent, '.iw-contextMenuCurrent', baseTrigger);
                });
                internalMethods.onOff($('.iw-contextMenu' + randomNum));
                return '.iw-contextMenu' + randomNum;
            }
        },
        subMenu: function (trigger, selector, baseTrigger) {
            trigger.contextMenu('menu', selector, {
                triggerOn: 'hover',
                displayAround: 'trigger',
                position: 'auto',
                baseTrigger: baseTrigger
            });
        },
        onOff: function (menu) {

            menu.find('.iw-overlay').remove();
            menu.find('.m-disable').each(function () {
                var list = $(this);
                list.append('<div class="iw-overlay"/>');
                list.find('.iw-overlay').bind('click mouseenter', function (event) {
                    event.stopPropagation();
                });

            });

        },
        tempTextBox: function () {
            //to add a temproryTextBox
            var textBox = $('#iw-tempTxt');
            if (textBox.length == 0) {
                $('body').append('<input type="text" id="iw-tempTxt" />');
                $('#iw-tempTxt').css({
                    'position': 'fixed',
                    'bottom': '1px',
                    'left': '1px',
                    'width': '0px',
                    'border': 'none',
                });
            }

        },
        optionOtimizer: function (method, option) {
            if (!option) {
                return;
            }
            if (method == 'menu') {
                if (!option.mouseClick) {
                    option.mouseClick = 'right';
                }
            }
            if ((option.mouseClick == 'right') && (option.triggerOn == 'click')) {
                option.triggerOn = 'contextmenu';
            }
            if ((option.triggerOn != 'click') && (option.triggerOn != 'mousemove')) {
                if (!option.displayAround) {
                    option.displayAround = 'trigger';
                }
            }

            if (['hover', 'mouseenter', 'mouseover', 'mouseleave', 'mouseout'].indexOf(option.triggerOn) != -1) {
                option.displayAround = 'trigger';
            }
            return option;
        },
    }
})(jQuery, window, document);
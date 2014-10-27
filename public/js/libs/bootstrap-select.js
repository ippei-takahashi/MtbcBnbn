! function($) {
    var Selectpicker = function(element, options, e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.$element = $(element);
        this.$newElement = null;
        this.button = null;

        this.options = $.extend({}, $.fn.selectpicker.defaults, this.$element.data(), typeof options == 'object' && options);

        if (this.options.title == null)
            this.options.title = this.$element.attr('title');

        this.val = Selectpicker.prototype.val;
        this.render = Selectpicker.prototype.render;
        this.init();
    };

    Selectpicker.prototype = {

        constructor: Selectpicker,

        init: function(e) {
            var _this = this;
            this.$element.hide();
            this.multiple = this.$element.prop('multiple');


            var classList = this.$element.attr('class') !== undefined ? this.$element.attr('class').split(/\s+/) : '';
            var id = this.$element.attr('id');
            this.$element.after(this.createView());
            this.$newElement = this.$element.next('.select');
            var select = this.$newElement;
            var menu = this.$newElement.find('.dropdown-menu');
            this.$menu = menu;
            var menuArrow = this.$newElement.find('.dropdown-arrow');
            this.$menuArrow = menuArrow;
            var menuA = menu.find('li > a');
            var liHeight = select.addClass('open').find('.dropdown-menu li > a').outerHeight();
            select.removeClass('open');
            var divHeight = menu.find('li .divider').outerHeight(true);
            var selectOffset_top = this.$newElement.offset().top;
            var size = 0;
            var menuHeight = 0;
            var selectHeight = this.$newElement.outerHeight();
            this.button = this.$newElement.find('> button');
            if (id !== undefined) {
                this.button.attr('id', id);
                $('label[for="' + id + '"]').click(function() {
                    select.find('button#' + id).focus();
                })
            }
            for (var i = 0; i < classList.length; i++) {
                if (classList[i] != 'selectpicker') {
                    this.$newElement.addClass(classList[i]);
                }
            }
            if (this.multiple) {
                this.$newElement.addClass('select-multiple');
            }

            this.button.addClass(this.options.style);

            this.$newElement.hide();

            menu.addClass(this.options.menuStyle);
            menuArrow.addClass(function() {
                if (_this.options.menuStyle) {
                    return _this.options.menuStyle.replace('dropdown-', 'dropdown-arrow-');
                }
            });
            this.checkDisabled();
            this.checkTabIndex();
            this.clickListener();
            var menuPadding = parseInt(menu.css('padding-top')) + parseInt(menu.css('padding-bottom')) + parseInt(menu.css('border-top-width')) + parseInt(menu.css('border-bottom-width'));
            if (this.options.size == 'auto') {
                function getSize() {
                    var selectOffset_top_scroll = selectOffset_top - $(window).scrollTop();
                    var windowHeight = $(window).innerHeight();
                    var menuExtras = menuPadding + parseInt(menu.css('margin-top')) + parseInt(menu.css('margin-bottom')) + 2;
                    var selectOffset_bot = windowHeight - selectOffset_top_scroll - selectHeight - menuExtras;
                    menuHeight = selectOffset_bot;
                    if (select.hasClass('dropup')) {
                        menuHeight = selectOffset_top_scroll - menuExtras;
                    }
                    menu.css({
                        'max-height': menuHeight + 'px',
                        'overflow-y': 'auto',
                        'min-height': liHeight * 3 + 'px'
                    });
                }
                getSize();
                $(window).resize(getSize);
                $(window).scroll(getSize);
                this.$element.bind('DOMNodeInserted', getSize);
            } else if (this.options.size && this.options.size != 'auto' && menu.find('li').length > this.options.size) {
                var optIndex = menu.find("li > *").filter(':not(.divider)').slice(0, this.options.size).last().parent().index();
                var divLength = menu.find("li").slice(0, optIndex + 1).find('.divider').length;
                menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding;
                menu.css({
                    'max-height': menuHeight + 'px',
                    'overflow-y': 'scroll'
                });
            }

            this.$element.bind('DOMNodeInserted', $.proxy(this.reloadLi, this));

            this.$newElement.css("display", "");

            this.render();
            if (this.options.container) this.selectPosition();
        },

        createDropdown: function() {
            var drop =
                "<div class='btn-group select'>" +
                "<button class='btn dropdown-toggle clearfix' data-toggle='dropdown'>" +
                "<span class='filter-option pull-left'></span>&nbsp;" +
                "<span class='caret'></span>" +
                "</button>" +
                "<span class='dropdown-arrow'></span>" +
                "<ul class='dropdown-menu' role='menu'>" +
                "</ul>" +
                "</div>";

            return $(drop);
        },


        createView: function() {
            var $drop = this.createDropdown();
            var $li = this.createLi();
            $drop.find('ul').append($li);
            return $drop;
        },

        reloadLi: function() {
            this.destroyLi();

            $li = this.createLi();
            this.$newElement.find('ul').append($li);

            this.render();
        },

        destroyLi: function() {
            this.$newElement.find('li').remove();
        },

        createLi: function() {

            var _this = this;
            var _li = [];
            var _liA = [];
            var _liHtml = '';

            this.$element.find('option').each(function() {
                _li.push($(this).text());
            });

            this.$element.find('option').each(function(index) {
                var optionClass = $(this).attr("class") !== undefined ? $(this).attr("class") : '';
                var text = $(this).text();
                var subtext = $(this).data('subtext') !== undefined ? '<small class="muted">' + $(this).data('subtext') + '</small>' : '';

                text += subtext;

                if ($(this).parent().is('optgroup') && $(this).data('divider') != true) {
                    if ($(this).index() == 0) {
                        var label = $(this).parent().attr('label');
                        var labelSubtext = $(this).parent().data('subtext') !== undefined ? '<small class="muted">' + $(this).parent().data('subtext') + '</small>' : '';
                        label += labelSubtext;

                        if ($(this)[0].index != 0) {
                            _liA.push(
                                '<div class="divider"></div>' +
                                '<dt>' + label + '</dt>' +
                                _this.createA(text, "opt " + optionClass)
                            );
                        } else {
                            _liA.push(
                                '<dt>' + label + '</dt>' +
                                _this.createA(text, "opt " + optionClass));
                        }
                    } else {
                        _liA.push(_this.createA(text, "opt " + optionClass));
                    }
                } else if ($(this).data('divider') == true) {
                    _liA.push('<div class="divider"></div>');
                } else if ($(this).data('hidden') == true) {
                    _liA.push('');
                } else {
                    _liA.push(_this.createA(text, optionClass));
                }
            });

            if (_li.length > 0) {
                for (var i = 0; i < _li.length; i++) {
                    var $option = this.$element.find('option').eq(i);
                    _liHtml += "<li rel=" + i + ">" + _liA[i] + "</li>";
                }
            }

            if (this.$element.find('option:selected').length == 0 && !_this.options.title) {
                this.$element.find('option').eq(0).prop('selected', true).attr('selected', 'selected');
            }

            return $(_liHtml);
        },

        createA: function(test, classes) {
            return '<a tabindex="-1" href="#" class="' + classes + '">' +
                '<span class="pull-left">' + test + '</span>' +
                '</a>';

        },

        reload: function() {
            this.$newElement.remove();
            this.$drop && this.$drop.remove();
            this.init();
        },

        render: function() {
            var _this = this;

            if (this.options.width == 'auto') {
                var ulWidth = this.$newElement.find('.dropdown-menu').css('width');
                this.$newElement.css('width', ulWidth);
            } else if (this.options.width && this.options.width != 'auto') {
                this.$newElement.css('width', this.options.width);
            }

            this.$element.find('option').each(function(index) {
                _this.setDisabled(index, $(this).is(':disabled') || $(this).parent().is(':disabled'));
                _this.setSelected(index, $(this).is(':selected'));
            });



            var selectedItems = this.$element.find('option:selected').map(function(index, value) {
                if ($(this).attr('title') != undefined) {
                    return $(this).attr('title');
                } else {
                    return $(this).text();
                }
            }).toArray();

            var title = selectedItems.join(", ");

            if (_this.multiple && _this.options.selectedTextFormat.indexOf('count') > -1) {
                var max = _this.options.selectedTextFormat.split(">");
                if ((max.length > 1 && selectedItems.length > max[1]) || (max.length == 1 && selectedItems.length >= 2)) {
                    title = selectedItems.length + ' of ' + this.$element.find('option').length + ' selected';
                }
            }

            if (!title) {
                title = _this.options.title != undefined ? _this.options.title : _this.options.noneSelectedText;
            }

            this.$element.next('.select').find('.filter-option').html(title);
        },



        setSelected: function(index, selected) {
            if (selected) {
                this.$menu.find('li').eq(index).addClass('selected');
            } else {
                this.$menu.find('li').eq(index).removeClass('selected');
            }
        },

        selectPosition: function() {
            var that = this,
                drop = '<div />',
                $container = $(that.options.container),
                pos,
                containerPos,
                actualHeight,
                getPlacement = function($element) {
                    that.$drop.addClass($element.attr('class').replace(/form-control/gi, '')).toggleClass('dropup', $element.hasClass('dropup'));
                    pos = $element.offset();
                    containerPos = $container.offset();
                    actualHeight = $element.hasClass('dropup') ? 0 : $element[0].offsetHeight;
                    that.$drop.css({
                        'top': pos.top - containerPos.top + actualHeight,
                        'left': pos.left - containerPos.left,
                        'width': $element[0].offsetWidth,
                        'position': 'absolute'
                    });
                };

            this.$drop = $(drop);

            this.$newElement.on('click', function() {
                getPlacement($(this));
                that.$drop.appendTo(that.options.container);
                that.$drop.toggleClass('open', !$(this).hasClass('open'));
                that.$drop.append(that.$menuArrow);
                that.$drop.append(that.$menu);
            });
            $(window).resize(function() {
                getPlacement(that.$newElement);
            });
            $(window).on('scroll', function() {
                getPlacement(that.$newElement);
            });
            $('html').on('click', function(e) {
                if ($(e.target).closest(that.$newElement).length < 1) {
                    that.$drop.removeClass('open');
                }
            });
        },

        setDisabled: function(index, disabled) {
            if (disabled) {
                this.$newElement.find('li').eq(index).addClass('disabled');
            } else {
                this.$newElement.find('li').eq(index).removeClass('disabled');
            }
        },

        checkDisabled: function() {
            if (this.$element.is(':disabled')) {
                this.button.addClass('disabled');
                this.button.click(function(e) {
                    e.preventDefault();
                });
            }
        },

        checkTabIndex: function() {
            if (this.$element.is('[tabindex]')) {
                var tabindex = this.$element.attr("tabindex");
                this.button.attr('tabindex', tabindex);
            }
        },

        clickListener: function() {
            var _this = this;

            $('body').on('touchstart.dropdown', '.dropdown-menu', function(e) {
                e.stopPropagation();
            });



            this.$menu.on('click', 'li a', function(e) {
                var clickedIndex = $(this).parent().index(),
                    $this = $(this).parent(),
                    $select = _this.$newElement;

                if (_this.multiple) {
                    e.stopPropagation();
                }

                e.preventDefault();

                if ($select.prev('select').not(':disabled') && !$(this).parent().hasClass('disabled')) {
                    if (!_this.multiple) {
                        $select.prev('select').find('option').removeAttr('selected');
                        $select.prev('select').find('option').eq(clickedIndex).prop('selected', true).attr('selected', 'selected');
                    } else {
                        var selected = $select.prev('select').find('option').eq(clickedIndex).prop('selected');

                        if (selected) {
                            $select.prev('select').find('option').eq(clickedIndex).removeAttr('selected');
                        } else {
                            $select.prev('select').find('option').eq(clickedIndex).prop('selected', true).attr('selected', 'selected');
                        }
                    }


                    $select.find('.filter-option').html($this.text());
                    $select.find('button').focus();

                    $select.prev('select').trigger('change');
                }

            });

            this.$menu.on('click', 'li.disabled a, li dt, li .divider', function(e) {
                e.preventDefault();
                e.stopPropagation();
                $select = _this.$newElement;
                $select.find('button').focus();
            });

            this.$element.on('change', function(e) {
                _this.render();
            });
        },

        val: function(value) {

            if (value != undefined) {
                this.$element.val(value);

                this.$element.trigger('change');
                return this.$element;
            } else {
                return this.$element.val();
            }
        }

    };

    $.fn.selectpicker = function(option, event) {
        var args = arguments;
        var value;
        var chain = this.each(function() {
            var $this = $(this),
                data = $this.data('selectpicker'),
                options = typeof option == 'object' && option;

            if (!data) {
                $this.data('selectpicker', (data = new Selectpicker(this, options, event)));
            } else {
                for (var i in option) {
                    data[i] = option[i];
                }
            }

            if (typeof option == 'string') {
                property = option;
                if (data[property] instanceof Function) {
                    [].shift.apply(args);
                    value = data[property].apply(data, args);
                } else {
                    value = data[property];
                }
            }
        });

        if (value != undefined) {
            return value;
        } else {
            return chain;
        }
    };

    $.fn.selectpicker.defaults = {
        container: false,
        style: null,
        size: 'auto',
        title: null,
        selectedTextFormat: 'values',
        noneSelectedText: 'Nothing selected',
        width: null,
        menuStyle: null,
        toggleSize: null
    }

}(window.jQuery);
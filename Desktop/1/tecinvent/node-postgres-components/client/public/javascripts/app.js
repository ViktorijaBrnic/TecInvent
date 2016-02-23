/*angular.module('nodeTodo', [])

    .controller('mainController', function($scope, $http) {

        $scope.formData = {};
        $scope.todoData = {};

        // Get all components
        $http.get('/api/v1/components')
            .success(function(data) {
                $scope.todoData = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });

        // Create a new component
        $scope.createTodo = function(todoID) {
            $http.post('/api/v1/components', $scope.formData)
                .success(function(data) {
                    $scope.formData = {};
                    $scope.todoData = data;
                    console.log(data);
                })
                .error(function(error) {
                    console.log('Error: ' + error);

                });
        };

        // Delete a todo
        $scope.deleteTodo = function(todoID) {
            $http.delete('/api/v1/components/' + todoID)
                .success(function(data) {
                    $scope.todoData = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

    });
    */


function availableFamilies(){
    $.getJSON("/api/v1/families.json", function(response){
        var items = [];

        items.push("<option value = \"0\">Select family...</option>");

        $.each(response, function(key, val) {
            items.push ("<option value = \"" + val.id + "\">" + val.name + "</option>");
        });

        $("#families").empty().append(items);
    });
};

$(document).ready(availableFamilies);



function availableSymbols(){
    $.getJSON("/api/v1/symbols.json", function(response){
        var items = [];

        items.push("<option value = \"0\">Select symbol...</option>");

        $.each(response, function(key, val) {
            items.push ("<option value = \"" + val.id + "\">" + val.name + "</option>");
        });

        $("#symbols").empty().append(items);
    });
};

$(document).ready(availableSymbols);



function availableFootprints(){
    $.getJSON("/api/v1/footprints.json", function(response){
        var items = [];

        items.push("<option value = \"0\">Select footprint...</option>");

        $.each(response, function(key, val) {
            items.push ("<option value = \"" + val.id + "\">" + val.name + "</option>");
        });

        $("#footprints").empty().append(items);
    });
};

$(document).ready(availableFootprints);



function availableSuppliers(){
    $.getJSON("/api/v1/suppliers.json", function(response){
        var items = [];

        items.push("<option value = \"0\">Select supplier...</option>");

        $.each(response, function(key, val) {
            items.push ("<option value = \"" + val.id + "\">" + val.name + "</option>");
        });

        $("#supplier_1").empty().append(items);
        $("#supplier_2").empty().append(items);
        $("#supplier_3").empty().append(items);
        $("#supplier_4").empty().append(items);

    });
};

$(document).ready(availableSuppliers);


/*
//----------------------------------- for suppliers.html -------------------------------------//
function tableContentSuppliers(){
    $.getJSON("/api/v1/suppliers.json", function(response){
        var items = '<table>';

        $.each(response, function(key, val) {
            items.push ("<tr><td>"+val.id+"</td><td>"+val.name+"</td><td>"+val.address+"</td><td>"+val.city+ "</td><td>"+val.zip_code+"</td><td>"+val.country+"</td><td>"+val.created+"</td><td>"+val.last_modified+"</td>");
        });

        items.push("</table>");

        $("#tableOfSuppliers").empty().append(items);

    });
};

$(document).ready(tableContentSuppliers);
*/


//----------------------------------- for footprints.html -------------------------------------//


//----------------------------------- for symbols.html -------------------------------------//



//------------------------------------------//
(function( $ ) {
    $.widget( "custom.combobox", {
        _create: function() {
            this.wrapper = $( "<span>" )
                .addClass( "custom-combobox" )
                .insertAfter( this.element );

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },

        _createAutocomplete: function() {
            var selected = this.element.children( ":selected" ),
                value = selected.val() ? selected.text() : "";

            this.input = $( "<input>" )
                .appendTo( this.wrapper )
                .val( value )
                .attr( "title", "" )
                .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: $.proxy( this, "_source" )
                })
                .tooltip({
                    tooltipClass: "ui-state-highlight"
                });

            this._on( this.input, {
                autocompleteselect: function( event, ui ) {
                    ui.item.option.selected = true;
                    this._trigger( "select", event, {
                        item: ui.item.option
                    });
                },

                autocompletechange: "_removeIfInvalid"
            });
        },

        _createShowAllButton: function() {
            var input = this.input,
                wasOpen = false;

            $( "<a>" )
                .attr( "tabIndex", -1 )
                .attr( "title", "Show All Items" )
                .tooltip()
                .appendTo( this.wrapper )
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass( "ui-corner-all" )
                .addClass( "custom-combobox-toggle ui-corner-right" )
                .mousedown(function() {
                    wasOpen = input.autocomplete( "widget" ).is( ":visible" );
                })
                .click(function() {
                    input.focus();

                    // Close if already visible
                    if ( wasOpen ) {
                        return;
                    }

                    // Pass empty string as value to search for, displaying all results
                    input.autocomplete( "search", "" );
                });
        },

        _source: function( request, response ) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            response( this.element.children( "option" ).map(function() {
                var text = $( this ).text();
                if ( this.value && ( !request.term || matcher.test(text) ) )
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }) );
        },

        _removeIfInvalid: function( event, ui ) {

            // Selected an item, nothing to do
            if ( ui.item ) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
                valueLowerCase = value.toLowerCase(),
                valid = false;
            this.element.children( "option" ).each(function() {
                if ( $( this ).text().toLowerCase() === valueLowerCase ) {
                    this.selected = valid = true;
                    return false;
                }
            });

            // Found a match, nothing to do
            if ( valid ) {
                return;
            }

            // Remove invalid value
            this.input
                .val( "" )
                .attr( "title", value + " didn't match any item" )
                .tooltip( "open" );
            this.element.val( "" );
            this._delay(function() {
                this.input.tooltip( "close" ).attr( "title", "" );
            }, 2500 );
            this.input.autocomplete( "instance" ).term = "";
        },

        _destroy: function() {
            this.wrapper.remove();
            this.element.show();
        }
    });
})( jQuery );



$(function() {

    $( "#families" ).combobox();
    $( "#toggle" ).click(function() {
        $( "#families" ).toggle();
    });
    $( "#symbols" ).combobox();
    $( "#toggle" ).click(function() {
        $( "#symbols" ).toggle();
    });
    $( "#footprints" ).combobox();
    $( "#toggle" ).click(function() {
        $( "#footprints" ).toggle();
    });
    $( "#supplier_1" ).combobox();
    $( "#toggle" ).click(function() {
        $( "#supplier_1" ).toggle();
    });
    $( "#supplier_2" ).combobox();
    $( "#toggle" ).click(function() {
        $( "#supplier_2" ).toggle();
    });
    $( "#supplier_3" ).combobox();
    $( "#toggle" ).click(function() {
        $( "#supplier_3" ).toggle();
    });
    $( "#supplier_4" ).combobox();
    $( "#toggle" ).click(function() {
        $( "#supplier_4" ).toggle();
    });
});





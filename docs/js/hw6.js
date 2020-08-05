$(document).ready( function() {
    $.validator.setDefaults({
        errorClass: "help-block",
        highlight: function(element) {
            $(element)
                .closest(".form-group")
                .addClass("has-error")
                .focus("input")
        },
        unhighlight: function(element) {
            $(element)
                .closest(".form-group")
                .removeClass("has-error")
        },
    })

    $('#tableForm').validate({
        rules: {
            hMin : {
                required: true,
                number: true
            },
            hMax : {
                required: true,
                number: true
            },
            vMin : {
                required: true,
                number: true
            },
            vMax : {
                required: true,
                number: true
            }
        },
        messages : {
            hMin : {
                required: "The horizontal bound value is required.",
                number: "Please enter a valid number."
            },
            hMax : {
                required: "The horizontal bound value is required.",
                number: "Please enter a valid number."
            },
            vMin : {
                required: "The vertical bound value is required.",
                number: "Please enter a valid number."
            },
            vMax : {
                required: "The vertical bound value is required.",
                number: "Please enter a valid number."
            }
        },
        errorPlacement : function(error, element){
            $(error).appendTo( element.parent("div"));
        }

    })
});

function generateTable() {
      document.getElementById('placeholder').innerHTML = "";

      var h1 = document.getElementById("hMin").value;
      var h2 = document.getElementById("hMax").value;
      var v1 = document.getElementById("vMin").value;
      var v2 = document.getElementById("vMax").value;

    if (+h1 > +h2) {
        var htemp = h1;
        h1 = h2;
        h2 = htemp;
    }

    if (+v1 > +v2) {
        var vtemp = v1;
        v1 = v2;
        v2 = vtemp;
    }

    var rows = (v2 - v1) + 2;
    var columns = (h2 - h1) + 2;

    // get the reference for the body
    var placeholder = document.getElementById('placeholder');

    // creates a <table> element
    var table = document.createElement("table");

    // creating rows
    for (var r = v1-1; r <= v2; r++) {
        //create a row of table
        var row = document.createElement("tr");
        // create cells in row
        for (var c = h1-1; c <= h2; c++) {
            //create a cell in the row
            var cell = document.createElement("td");
            //top row
            if (r == v1-1) {
                if (c == h1-1){
                    //top left corner
                    var cellText = document.createTextNode(" ");
                } else {
                    //horizontal bound labels
                    var cellText = document.createTextNode(c);
                }
            } else {
                if (c == h1-1) {
                    //vertical bound labels
                    var cellText = document.createTextNode(r);
                } else {
                    //product cells
                    var cellText = document.createTextNode(c*r);
                }
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    placeholder.appendChild(table);
};

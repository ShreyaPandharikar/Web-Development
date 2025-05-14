$(document).ready(function () {
    // Focus/blur opacity effect
    $("input").on("focus", function () {
        $(this).css("opacity", 1);
    }).on("blur", function () {
        $(this).css("opacity", 0.2);
    });

    // Add book to the table
    $("#add").click(function (e) {
        e.preventDefault();

        const book_name = $("#bookName").val().trim();
        const book_author = $("#authorName").val().trim();
        const book_publisher = $("#publisherName").val().trim();
        const book_number = $("#numberPage").val().trim();
        const book_serial = $("#serialNumber").val().trim();

        // Validate input fields
        if (!book_name || !book_author || !book_publisher || !book_number || !book_serial) {
            alert("Please fill all the fields.");
            return;
        }

        // Create new table row with delete button
        const newRow = `<tr>
            <td>${book_name}</td>
            <td>${book_author}</td>
            <td>${book_publisher}</td>
            <td>${book_number}</td>
            <td>${book_serial}</td>
            <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
        </tr>`;

        // Append row to the table body
        $("#bookTableBody").append(newRow);

        // Reset inputs
        $("input").val("").css("opacity", 0.2);
    });

    // Delete row on delete button click
    $("#bookTableBody").on("click", ".delete-btn", function () {
        $(this).closest("tr").remove();
    });
});

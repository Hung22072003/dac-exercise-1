let globalData = []
let table;
$(document).ready(function () {
  table = intitialDataTable([])
  $.get("/data.json", function (data) {
    globalData = [...data]
    // table = intitialDataTable(globalData)
    updateTable()
  });

  $("#selectAll").on("click", function () {
    let isChecked = $(this).is(":checked");
    $(".selectRow").prop("checked", isChecked);
  });

  handleUpdateItem()
});

const intitialDataTable = function (data) {
  return $("#studentTable").DataTable({
    order: [],
    info: false,
    searching: false,
    paging: false,
    data: data,
    columns: [
      {
        data: null,
        render: function (data, type, row) {
          return (
            '<input type="checkbox" class="selectRow" data-id="' +
            row.id +
            '">'
          );
        },
        orderable: false,
      },
      { data: "id" },
      { data: "name" },
      { data: "birthday" },
      { data: "gender" },
      { data: "address" },
      { data: "phone" },
      { data: "faculty" },
      { data: "major" },
      {
        data: null,
        render: function (data, type, row) {
          return (
            `<span style = "color: #337ab7; cursor:pointer" class="glyphicon glyphicon-pencil edit" data-id=${row.id}></span>`
          );
        },
        orderable: false,
      },
      {
        data: null,
        render: function (data, type, row) {
          return (
            `<span style = "color: #337ab7; cursor:pointer" class="glyphicon glyphicon-trash" onClick="handleRemoveItem(${row.id})"></span>`
          );
        },
        orderable: false,
      },
    ],

    columnDefs: [
      {
        targets: [0, 9, 10],
        className: "dt-center",
      },
      {
        targets: [1, 2, 3, 4, 5, 6, 7, 8],
        className: "dt-head-center dt-body-left",
      },
    ]
  });
}
const updateTable = () => {
  table.clear(); // Clear the current table data
  table.rows.add(globalData); // Add the updated data
  table.draw();
}

const handleRemoveItem = function (id) {
  globalData = globalData.filter((item) => item.id != id)
  updateTable()
}

const handleUpdateItem = function () {
  $('#studentTable tbody').on('click', '.edit', function(e) {
    e.preventDefault();
    let id = $(this).data('id');
    alert('Chỉnh sửa sinh viên với ID: ' + id);
  });
}

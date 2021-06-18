var mSortingString = [];
var disableSortingColumn = 2;
mSortingString.push({ "bSortable": false, "aTargets": [disableSortingColumn] });

tableSinhVien = ()=> {
    let table = $('.table-sinhvien').dataTable({
        "language": {
            "sSearch": "Tìm kiếm:",
            "lengthMenu":     "Hiển Thị _MENU_ bảng ghi",
            "info":           "Hiển Thị _START_ đến _END_ của _TOTAL_ bảng ghi",
            "zeroRecords": "Không tìm thấy bảng ghi",
            "paginate": {
                "first":      "Trang Đầu",
                "last":       "Trang Cuối",
                "next":       "Chuyển",
                "previous":   "Trước"
            },
            "infoEmpty":      "Hiển Thị 0 đến 0 của 0 bảng ghi",
            "infoFiltered":   "(lọc từ _MAX_  bảng ghi)",
        },
        "paging": true,
        "ordering": true,
        "info": true,
        "aaSorting": [],
        "orderMulti": true,
        "aoColumnDefs": mSortingString
    });
}
tableMonHoc =  ()=> {
    var table =  $('.table-monhoc').dataTable({
        "language": {
            "sSearch": "Tìm kiếm:",
            "lengthMenu":     "Hiển Thị _MENU_ bảng ghi",
            "info":           "Hiển Thị _START_ đến _END_ của _TOTAL_ bảng ghi",
            "zeroRecords": "Không tìm thấy bảng ghi",
            "paginate": {
                "first":      "Trang Đầu",
                "last":       "Trang Cuối",
                "next":       "Chuyển",
                "previous":   "Trước"
            },
            "infoEmpty":      "Hiển Thị 0 đến 0 của 0 bảng ghi",
            "infoFiltered":   "(lọc từ _MAX_  bảng ghi)",
        },
        "paging": true,
        "ordering": true,
        "info": true,
        "aaSorting": [],
        "orderMulti": true,
        "aoColumnDefs": mSortingString
    });
}
tableLop =  ()=> {
    var table =  $('.table-lop').dataTable({
        "language": {
            "sSearch": "Tìm kiếm:",
            "lengthMenu":     "Hiển Thị _MENU_ bảng ghi",
            "info":           "Hiển Thị _START_ đến _END_ của _TOTAL_ bảng ghi",
            "zeroRecords": "Không tìm thấy bảng ghi",
            "paginate": {
                "first":      "Trang Đầu",
                "last":       "Trang Cuối",
                "next":       "Chuyển",
                "previous":   "Trước"
            },
            "infoEmpty":      "Hiển Thị 0 đến 0 của 0 bảng ghi",
            "infoFiltered":   "(lọc từ _MAX_  bảng ghi)",
        },
        "paging": true,
        "ordering": true,
        "info": true,
        "aaSorting": [],
        "orderMulti": true,
        "aoColumnDefs": mSortingString
    });
}
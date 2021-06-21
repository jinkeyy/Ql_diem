let controller = {

}
controller.getSv = (kw = "1") => {
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/getSinhVien.php',
        data: {
            key: kw,
        },
        success: (data) => {
            const list = JSON.parse(data);
            if (list[0].notification) {
                alert("Không có bản ghi nào")
            } else {
                let htmlRaw = ""
                let stt = 1
                for (let item of list) {
                    htmlRaw = htmlRaw + `
                   <tr>
                        <td>${stt++}</td>
                        <td>${item.idSinhVien}</td>
                        <td>${item.tenSinhVien}</td>
                        <td>${item.khoa}</td>
                        <td>${item.ngaySinh}</td>
                        <td>${item.diaChi}</td>
                   </tr> 
                   `
                }
                document.querySelector(".list-sinhvien").innerHTML = htmlRaw
                tableSinhVien()

            }

        }
    });

}
controller.addSv = () => {
    if (document.getElementsByName("maSv")[0].value == "" || document.getElementsByName("maSv")[0].value == "" || document.getElementsByName("matKhauSv")[0].value == "") {
        alert("Chưa điềm đủ thông tin cần thiết")
    } else if (document.getElementsByName("matKhauSv")[0].value != document.getElementsByName("rmatKhauSv")[0].value) {
        alert("Mật khẩu không trùng nhau")
    } else {
        const sv = {
            maSv: document.getElementsByName("maSv")[0].value,
            tenSv: document.getElementsByName("tenSv")[0].value,
            diaChiSv: document.getElementsByName("diaChiSv")[0].value,
            ngaySinhSv: document.getElementsByName("ngaySinhSv")[0].value,
            khoaSv: document.getElementsByName("khoaSv")[0].value,
            matKhauSv: document.getElementsByName("matKhauSv")[0].value,
        }
        $.ajax({
            type: "POST",
            url: 'http://localhost/Ql_diem/assets/model/taoSinhVien.php',
            data: sv,
            success: (data) => {
                if (JSON.parse(data)[0].notification == "true") {
                    alert("Tạo sinh viên thành công");
                    $('#form-tao-sv').modal('hide');
                } else if (JSON.parse(data)[0].notification == "trung") {
                    alert("Mã đã tồn tại")
                } else {
                    alert("Lỗi")
                }
                document.querySelector(".main-content").innerHTML = components.mainContentSv()
                controller.getSv()
            }
        });

    }
}
controller.getMh = (kw = "1") => {
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/getMonHoc.php',
        data: {
            key: kw,
        },
        success: (data) => {
            const list = JSON.parse(data);
            if (list[0].notification) {

            } else {
                let htmlRaw = ""
                let stt = 1
                for (let item of list) {
                    htmlRaw = htmlRaw + `
                   <tr> <td>${stt++}</td>
                        <td>${item.maMonHoc}</td>
                        <td>${item.tenMonHoc}</td>
                        <td>${item.soTinChi}</td>
                   </tr> 
                   `
                }
                document.querySelector(".list-monhoc").innerHTML = htmlRaw
                tableMonHoc()
            }

        }
    });
}
controller.addMh = () => {

    if (document.getElementsByName("maMh")[0].value == "" || document.getElementsByName("tenMh")[0].value == "") {
        alert("Chưa điền đủ thông tin")
    }
    else {
        const mh = {
            maMh: document.getElementsByName("maMh")[0].value,
            tenMh: document.getElementsByName("tenMh")[0].value,
            tinChi: document.getElementsByName("tinChi")[0].value,
        }
        $.ajax({
            type: "POST",
            url: 'http://localhost/Ql_diem/assets/model/taoMonHoc.php',
            data: mh,
            success: (data) => {
                if (JSON.parse(data)[0].notification == "true") {
                    alert("Tạo môn học thành công");
                    $('#form-tao-mh').modal('hide');
                } else if (JSON.parse(data)[0].notification == "trung") {
                    alert("Mã đã tồn tại")
                } else {
                    alert("Lỗi")
                }
                document.querySelector(".main-content").innerHTML = components.mainContentMh()
                controller.getMh()
            }
        });
    }

}
controller.getDSSVL = (idLop) => {
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/getDSSVL.php',
        data: {
            maLop: idLop,
        },
        success: (data) => {
            const list = JSON.parse(data);
            if (list[0].notification) {
                let htmlRaw = `
                <tr>
                <td colspan="6">không có bản ghi nào</td>
            </tr>
            <tr colspan="6">
            <td><button class="btn btn-primary" data-toggle="modal" data-target="#form-tao-sv-vao-lop" type="button">Thêm sinh viên vào lớp</button></td> 
            </tr>
                   `
                document.querySelector(".list-danhsachsinhvienlop").innerHTML = htmlRaw

            } else {
                let htmlRaw = ""
                let stt = 1
                for (let item of list) {
                    htmlRaw = htmlRaw + `
                    <tr>
                    <td>${stt++}</td>
                    <td>${item.maSinhVien}</td>
                    <td>${item.tenSinhVien}</td>
                    <td>${item.ngaySinh}</td>
                    <td>${item.khoa}</td>
                    <td><a href="#" idSVLop="${item.idSVLop}" class="xoaSVLop">Xóa</a></td>
                    </tr>
                   `
                }
                htmlRaw = htmlRaw + `<tr colspan="6">
               <td><button class="btn btn-primary" data-toggle="modal" data-target="#form-tao-sv-vao-lop" type="button">Thêm sinh viên vào lớp</button></td> 
               </tr>`
                document.querySelector(".list-danhsachsinhvienlop").innerHTML = htmlRaw
                let listXoa = document.getElementsByClassName("xoaSVLop")
                for (let item of listXoa) {
                    item.addEventListener("click", () => {
                        if ((confirm('Bạn có chắc xóa sinh viên ra khỏi lớp'))) {
                            $.ajax({
                                type: "POST",
                                url: 'http://localhost/Ql_diem/assets/model/xoaSinhVienLop.php',
                                data: {
                                    idSVLop: item.getAttribute("idSVLop"),
                                },
                                success: (data) => {
                                    const list = JSON.parse(data);
                                    if (list[0].notification == "true") {
                                        alert("Xóa thành công")
                                        controller.getDSSVL(idLop)
                                    } else {
                                        alert("Hiện tại sinh viên đã có điểm tại lớp không thể xóa")
                                    }

                                }
                            });
                        }
                    })
                }
            }
        }
    });
}
controller.getDsl = (idLop, maMon) => {
    console.log("Danh sách sv")
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/getSinhVien.php',
        data: {
            key: 1,
        },
        success: (data) => {
            const list = JSON.parse(data);
            if (list[0].notification) {

            } else {
                let htmlRaw = `<label>Sinh viên:</label>
               <select class="selectpicker" data-live-search="true" name="selectSvLop">
                `
                for (let item of list) {
                    htmlRaw = htmlRaw + `
                   <option data-tokens="${item.idSinhVien}" value="${item.idSinhVien}" idLop="${idLop}" maMon="${maMon}">${item.idSinhVien}- ${item.tenSinhVien}</option> 
                   `
                }
                htmlRaw = htmlRaw + `</select>`
                document.querySelector(".select-sv-lop").innerHTML = htmlRaw
                $('.selectpicker').selectpicker();
            }

        }
    });

    controller.getDSSVL(idLop)

}
document.querySelector(".btn-tao-sv-lop").addEventListener("click", () => {
    const sv = {
        maLop: document.getElementsByName("selectSvLop")[0].options[document.getElementsByName("selectSvLop")[0].selectedIndex].getAttribute("idLop"),
        maSinhVien: document.getElementsByName("selectSvLop")[0].value,
        maMonHoc: document.getElementsByName("selectSvLop")[0].options[document.getElementsByName("selectSvLop")[0].selectedIndex].getAttribute("maMon"),
    }
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/taoSinhVienLop.php',
        data: sv,
        success: (data) => {
            if (JSON.parse(data)[0].notification == "true") {
                $('#form-tao-sv-vao-lop').modal('hide');
                alert("Thêm sinh viên vào lớp thành công");
            } else if (JSON.parse(data)[0].notification == "trung") {
                alert("Sinh viên đã ở trong lớp này hoặc đã học môn này")
                $('#form-tao-sv-vao-lop').modal('hide');
            } else {
                alert("Lỗi")
            }
            controller.getDSSVL(sv.maLop)
        }
    });

})
controller.getLop = () => {
    $.ajax({
        type: "GET",
        url: 'http://localhost/Ql_diem/assets/model/getHocKy.php',
        success: (data) => {
            const list = JSON.parse(data);
            if (list[0].notification) {
                alert("Không có bản ghi nào")
            } else {
                let htmlRaw = ""
                let stt = 1
                for (let item of list) {
                    htmlRaw = htmlRaw + `
                   <option value="${item.idHocKy}" selected="">${item.tenHocKy}</option>
                   `
                }
                document.querySelector(".select-lop-hocky").innerHTML = htmlRaw
            }

        }
    });
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/getMonHoc.php',
        data: {
            key: 1,
        },
        success: (data) => {
            const list = JSON.parse(data);
            if (list[0].notification) {

            } else {
                let htmlRaw = ""
                let stt = 1
                for (let item of list) {
                    htmlRaw = htmlRaw + `
                   <option value="${item.maMonHoc}" selected="">${item.tenMonHoc}( ${item.soTinChi} tín chỉ)</option>
                   `
                }
                document.querySelector(".select-lop-monhoc").innerHTML = htmlRaw
            }

        }
    });
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/getLop.php',
        success: (data) => {
            const list = JSON.parse(data);
            if (list[0].notification) {

            } else {
                let htmlRaw = ""
                let stt = 1
                for (let item of list) {
                    htmlRaw = htmlRaw + `
                   <tr> <td>${stt++}</td>
                        <td>${item.idLop}</td>
                        <td class="monhoc">${item.tenMonHoc}</td>
                        <td class="hocky">${item.tenHocKy}</td>
                        <td><a class="item-lop" maLop="${item.idLop}" maMon="${item.maMonHoc}" >Xem danh sách lớp chi tiết</a></td>
                   </tr> 
                   `
                }
                document.querySelector(".list-lop").innerHTML = htmlRaw
                tableLop()
                let listLop = document.getElementsByClassName("item-lop")
                for (let item of listLop) {
                    item.addEventListener("click", () => {
                        document.querySelector(".table-content").innerHTML = components.tableDsl(item.getAttribute("maLop"), item.parentElement.parentElement.querySelector(".monhoc").textContent, item.parentElement.parentElement.querySelector(".hocky").textContent)
                        controller.getDsl(item.getAttribute("maLop"), item.getAttribute("maMon"))
                    })
                }
            }

        }
    });
}
controller.addLop = () => {
    const lop = {
        maLop: document.getElementsByName("maLop")[0].value,
        maMh: document.getElementsByName("select-mh")[0].value,
        maHk: document.getElementsByName("select-hk")[0].value,
        tenGv: document.getElementsByName("tenGv")[0].value,
    }
    if (document.getElementsByName("maLop")[0].value == "") {
        alert("Chưa điền mã lớp")
    } else {
        $.ajax({
            type: "POST",
            url: 'http://localhost/Ql_diem/assets/model/taoLop.php',
            data: lop,
            success: (data) => {
                if (JSON.parse(data)[0].notification == "true") {
                    alert("Tạo lớp thành công");
                    $('#form-tao-lop').modal('hide');
                } else if (JSON.parse(data)[0].notification == "trung") {
                    alert("Mã đã tồn tại")
                } else {
                    alert("Lỗi")
                }
                document.querySelector(".main-content").innerHTML = components.mainContentLop()
                controller.getLop()
            }
        });
    }
}



controller.loadNhapDiem = () => {
    document.querySelector(".main-content").innerHTML = `
    <div>
        <div style="padding: 30px;">
            <label>Chọn Lớp:</label>
            <select class="selectpicker1" data-live-search="true" name="selectLopDiem">
                <option data-tokens="1">123</option>
            </select> 
            <button class="btn btn-primary btn-search-lop" type="button">Tìm</button>
        </div>
    </div>
    <div class="table-content">
        <div style="padding: 30px;">
            <h4>Chọn Danh Sách Lớp Cần Nhập Điểm</h4>
        </div>
    </div>
    `
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/getLop.php',
        success: (data) => {
            const list = JSON.parse(data);
            if (list[0].notification) {

            } else {
                let htmlRaw = ""
                for (let item of list) {
                    htmlRaw = htmlRaw + `
                   <option data-tokens="${item.idLop}" value="${item.idLop}">${item.tenMonHoc}-Lớp ${item.idLop}-${item.tenHocKy}</option> 
                   `
                }
                document.getElementsByName("selectLopDiem")[0].innerHTML = htmlRaw
                $('.selectpicker1').selectpicker();
            }

        }
    });
    document.querySelector(".btn-search-lop").addEventListener("click", () => {
        let t = document.getElementsByName("selectLopDiem")[0]
        let text = t.options[t.selectedIndex].text
        document.querySelector(".table-content").innerHTML = components.mainContentNhapDiem(text)
        $.ajax({
            type: "POST",
            url: 'http://localhost/Ql_diem/assets/model/getDSSVL.php',
            data: {
                maLop: t.value,
            },
            success: (data) => {
                const list = JSON.parse(data);
                if (list[0].notification) {

                } else {
                    let htmlRaw = ""
                    let stt = 1
                    for (let item of list) {
                        htmlRaw = htmlRaw + `
                        <tr>
                        <td>${stt++}</td>
                        <td>${item.maSinhVien}</td>
                        <td>${item.tenSinhVien}</td>
                        <td>${item.ngaySinh}</td>
                        <td>${item.khoa}</td>
                        <td><a href="#" idSVLop="${item.idSVLop}" tenSinhVien="${item.tenSinhVien}-${item.maSinhVien}" lop="${text}"  class="nhapDiemSv" data-toggle="modal" data-target="#form-nhap-diem">Nhập điểm</a></td>
                        </tr>
                       `
                    }
                    document.querySelector(".list-danhsachsinhvienlop").innerHTML = htmlRaw
                    let listXoa = document.getElementsByClassName("nhapDiemSv")
                    for (let item of listXoa) {
                        item.addEventListener("click", () => {
                            const req = {
                                idSVLop: item.getAttribute("idSVLop"),
                                tenSinhVien: item.getAttribute("tenSinhVien"),
                                lop: item.getAttribute("lop"),
                            }

                            controller.nhapDiem(req)
                        })
                    }
                }
            }
        });
    })
}
controller.nhapDiem = (req) => {
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/checkNhapDiem.php',
        data: {
            idSVLop: req.idSVLop
        },
        success: (data) => {
            const list = JSON.parse(data);
            if (list[0].notification == "true") {
                document.querySelector(".body-nhapdiem").innerHTML = `
                <div class="form-group"><label>Tên Sinh Viên:</label><input type="text" class="form-control"
                readonly  value="${req.tenSinhVien}"></div>
                <div class="form-group"><label>Lớp:</label><input type="text" class="form-control"
                  readonly value="${req.lop}"></div>
                  <div class="form-group"><label>Điểm Chuyên Cần:</label><input type="number" class="form-control"  name="diemCC"
                    ></div>
                    <div class="form-group"><label>Điểm Giữa Kỳ:</label><input type="number" class="form-control"  name="diemGK"
                      ></div>
                      <div class="form-group"><label>Điểm Cuối Kỳ :</label><input type="number" class="form-control"
                    name="diemCK"></div>
                <div class="form-group d-flex justify-content-center"><button class="btn btn-primary btn-nhap-diem" type="button">Xác nhận</button></div>
                `
                document.querySelector(".btn-nhap-diem").addEventListener("click", () => {
                    const diemCC = document.getElementsByName("diemCC")[0].value
                    const diemGK = document.getElementsByName("diemGK")[0].value
                    const diemCK = document.getElementsByName("diemCK")[0].value
                    const diem = {
                        maSVLop: req.idSVLop,
                        diemCC: diemCC,
                        diemGK: diemGK,
                        diemCK: diemCK,
                    }
                    if (diemCC >= 0 && diemCC <= 10 && diemGK >= 0 && diemGK <= 10 && diemCK >= 0 && diemCK <= 10 || diemCC == "" || diemCK == "" || diemGK == "") {
                        $.ajax({
                            type: "POST",
                            url: 'http://localhost/Ql_diem/assets/model/nhapDiem.php',
                            data: diem,
                            success: (data) => {
                                if (JSON.parse(data)[0].notification == "true") {
                                    alert("Nhập điểm thành công");
                                    $('#form-nhap-diem').modal('hide');
                                } else if (JSON.parse(data)[0].notification == "trung") {
                                    alert("Lỗi")
                                } else {
                                    alert("Lỗi")
                                }
                            }
                        });
                    } else {
                        alert("Nhập điểm không hợp")
                    }
                })
            } else {
                //Đã nhập điểm
                $.ajax({
                    type: "POST",
                    url: 'http://localhost/Ql_diem/assets/model/getDiemSvLop.php',
                    data: {
                        maSVLop: req.idSVLop,
                    },
                    success: (data) => {
                        const list = JSON.parse(data);
                        if (list[0].notification) {

                        } else {
                            let htmlRaw = `
                                        <div class="form-group"><label>Tên Sinh Viên:</label><input type="text" class="form-control"
                            readonly  value="${req.tenSinhVien}"></div>
                            <div class="form-group"><label>Lớp:</label><input type="text" class="form-control"
                            readonly value="${req.lop}"></div>`
                            if (list[0].diemCC == null) {
                                htmlRaw = htmlRaw + `<div class="form-group"><label>Điểm Chuyên Cần:</label><input type="number" class="form-control"  name="diemCC"
                                ></div>`
                            } else {
                                htmlRaw = htmlRaw + `<div class="form-group"><label>Điểm Chuyên Cần:</label><input type="number" class="form-control"  name="diemCC"
                                value="${list[0].diemCC}" readonly></div>`
                            }
                            if (list[0].diemGK == null) {
                                htmlRaw = htmlRaw + `<div class="form-group"><label>Điểm Giữa Kỳ:</label><input type="number" class="form-control"  name="diemGK"
                                ></div>`
                            } else {
                                htmlRaw = htmlRaw + `<div class="form-group"><label>Điểm Giữa Kỳ:</label><input type="number" class="form-control"  name="diemGK"
                                value="${list[0].diemGK}" readonly></div>`
                            }
                            if (list[0].diemCK == null) {
                                htmlRaw = htmlRaw + `<div class="form-group"><label>Điểm Cuối Kỳ:</label><input type="number" class="form-control"  name="diemCK"
                                ></div>`
                            } else {
                                htmlRaw = htmlRaw + `<div class="form-group"><label>Điểm Cuối Kỳ:</label><input type="number" class="form-control"  name="diemCK"
                                value="${list[0].diemCK}" readonly></div>`
                            }
                            if (list[0].diemCC == null || list[0].diemGK == null || list[0].diemCK == null) {
                                htmlRaw = htmlRaw + `<div class="form-group d-flex justify-content-center"><button class="btn btn-primary btn-nhap-diem" type="button">Xác nhận</button></div>`
                            } else {
                                htmlRaw = htmlRaw + `<div class="form-group d-flex justify-content-center"><button class="btn btn-primary btn-nhap-diem" type="button" style="display:none">Xác nhận</button></div>`
                            }

                            document.querySelector(".body-nhapdiem").innerHTML = htmlRaw
                            document.querySelector(".btn-nhap-diem").addEventListener("click", () => {
                                const diemCC = document.getElementsByName("diemCC")[0].value
                                const diemGK = document.getElementsByName("diemGK")[0].value
                                const diemCK = document.getElementsByName("diemCK")[0].value
                                const diem = {
                                    maSVLop: req.idSVLop,
                                    diemCC: diemCC,
                                    diemGK: diemGK,
                                    diemCK: diemCK,
                                }
                                if (diemCC >= 0 && diemCC <= 10 && diemGK >= 0 && diemGK <= 10 && diemCK >= 0 && diemCK <= 10 || diemCC == "" || diemCK == "" || diemGK == "") {
                                    $.ajax({
                                        type: "POST",
                                        url: 'http://localhost/Ql_diem/assets/model/suaDiem.php',
                                        data: diem,
                                        success: (data) => {
                                            const list = JSON.parse(data);
                                            if (list[0].notification == "true") {
                                                alert("Nhập điểm thành công")
                                                $('#form-nhap-diem').modal('hide');
                                            } else {
                                                alert("Lỗi")
                                            }
                                        }
                                    })
                                } else {
                                    alert("Nhập điểm không hợp")
                                }
                            })
                        }
                    }
                });
            }
        }
    });
}
controller.loadSuaDiem = () => {
    document.querySelector(".main-content").innerHTML = `
    <div>
        <div style="padding: 30px;">
            <label>Chọn Sinh Viên Cần Sửa:</label>
            <select class="selectpicker2" data-live-search="true" name="selectSvDiem">
                <option data-tokens="1">123</option>
            </select> 
            <button class="btn btn-primary btn-sua-diem" type="button" data-toggle="modal" data-target="#form-nhap-diem">Sửa Điểm</button>
        </div>
    </div>
    <div class="table-content">
        <div style="padding: 30px;">
        
        </div>
    </div>
    `
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/getDiemSv.php',
        success: (data) => {
            const list = JSON.parse(data);
            if (list[0].notification) {

            } else {
                let htmlRaw = ""
                for (let item of list) {
                    htmlRaw = htmlRaw + `
                   <option data-tokens="${item.idLop}" value="${item.maSVLop}" tenSinhVien="${item.tenSinhVien}" tenLop="Lớp ${item.idLop}( ${item.maMonHoc})">${item.tenSinhVien}( ${item.maSinhVien})-Lớp ${item.idLop}( ${item.maMonHoc})</option> 
                   `
                }
                document.getElementsByName("selectSvDiem")[0].innerHTML = htmlRaw
                $('.selectpicker2').selectpicker();
            }
        }
    });

    document.querySelector(".btn-sua-diem").addEventListener("click", () => {
        let t = document.getElementsByName("selectSvDiem")[0]
        let tenSinhVien = t.options[t.selectedIndex].getAttribute("tenSinhVien")
        let tenLop = t.options[t.selectedIndex].getAttribute("tenLop")
        $.ajax({
            type: "POST",
            url: 'http://localhost/Ql_diem/assets/model/getDiemSvLop.php',
            data: {
                maSVLop: t.value,
            },
            success: (data) => {
                const list = JSON.parse(data);
                if (list[0].notification) {

                } else {
                    document.querySelector(".modal-title-form-nhap").innerHTML = "Sửa điểm"
                    let htmlRaw = `
                    <div class="form-group"><label>Tên Sinh Viên:</label><input type="text" class="form-control"
                    readonly  value="${tenSinhVien}"></div>
                    <div class="form-group"><label>Lớp:</label><input type="text" class="form-control"
                    readonly value="${tenLop}"></div>`

                    htmlRaw = htmlRaw + `<div class="form-group"><label>Điểm Chuyên Cần:</label><input type="number" class="form-control"  name="diemCC"
                        value="${list[0].diemCC}" ></div>`

                    htmlRaw = htmlRaw + `<div class="form-group"><label>Điểm Giữa Kỳ:</label><input type="number" class="form-control"  name="diemGK"
                        value="${list[0].diemGK}" ></div>`

                    htmlRaw = htmlRaw + `<div class="form-group"><label>Điểm Cuối Kỳ:</label><input type="number" class="form-control"  name="diemCK"
                        value="${list[0].diemCK}" ></div>`

                    htmlRaw = htmlRaw + `<div class="form-group d-flex justify-content-center"><button class="btn btn-primary btn-nhap-diem" type="button">Xác nhận</button></div>`
                    document.querySelector(".body-nhapdiem").innerHTML = htmlRaw
                    document.querySelector(".btn-nhap-diem").addEventListener("click", () => {
                        const diemCC = document.getElementsByName("diemCC")[0].value
                        const diemGK = document.getElementsByName("diemGK")[0].value
                        const diemCK = document.getElementsByName("diemCK")[0].value
                        const diem = {
                            maSVLop: list[0].maSVLop,
                            diemCC: diemCC,
                            diemGK: diemGK,
                            diemCK: diemCK,
                        }
                        if (diemCC >= 0 && diemCC <= 10 && diemGK >= 0 && diemGK <= 10 && diemCK >= 0 && diemCK <= 10 || diemCC == "" || diemCK == "" || diemGK == "") {
                            $.ajax({
                                type: "POST",
                                url: 'http://localhost/Ql_diem/assets/model/suaDiem.php',
                                data: diem,
                                success: (data) => {
                                    const list = JSON.parse(data);
                                    if (list[0].notification == "true") {
                                        alert("Sửa điểm thành công")
                                        $('#form-nhap-diem').modal('hide');
                                    } else {
                                        alert("Lỗi")
                                    }
                                }
                            })
                        } else {
                            alert("Nhập điểm không hợp")
                        }
                    })
                }
            }
        });

    })
}



function getLopSv() {
    return new Promise(res=>{
        $.ajax({
            type: "GET",
            url: 'http://localhost/Ql_diem/assets/model/getLopSv.php',
            success: (data) => {
                res(JSON.parse(data))
            }
        });
    });
}



controller.loadHocBong = () => {
    document.querySelector(".main-content").innerHTML = `
    <div>
        <div style="padding: 30px;">
            <label>Xem danh sách sinh viên học bổng học kỳ:</label>
            <select class="selectpicker4" data-live-search="true" name="selectHocBong">
                
            </select> 
            <button class="btn btn-primary btn-hocbong" type="button" >Xác nhận</button>
        </div>
    </div>
    <div class="in-wrapper"><div style="padding: 30px; display:none" ><button class="btn btn-primary" type="button" >In danh sách</button></div></div>
    <div class="table-content">
        <div style="padding: 30px;">
        
        </div>
    </div>
    `
    $.ajax({
        type: "GET",
        url: 'http://localhost/Ql_diem/assets/model/getHocKy.php',
        data: {
            key: 1,
        },
        success: (data) => {
            const list = JSON.parse(data);

            if (list[0].notification) {

            } else {
                for(let item of list){
                document.getElementsByName("selectHocBong")[0].insertAdjacentHTML("beforeend",`<option data-tokens="" value="${item.idHocKy}"> ${item.tenHocKy}</option>`)
                }
            }
            $('.selectpicker4').selectpicker();
        }
    });
    document.querySelector(".btn-hocbong").addEventListener("click",()=>{
        
        document.querySelector(".table-content").innerHTML =  components.mainContentHocBong( document.getElementsByName("selectHocBong")[0].options[document.getElementsByName("selectHocBong")[0].selectedIndex].text)
        $.ajax({
            type: "POST",
            url: 'http://localhost/Ql_diem/assets/model/getSinhVien.php',
            data: {
                key: 1,
            },
            success: (data) => {
                const list = JSON.parse(data);
                if (list[0].notification) {
                        document.querySelector(".list-danhsachsinhvien").innerHTML = `<tr>
                        <td colspan="7">Không có bản ghi nào</td>
                        </tr>`
                }else{
                    let stt =1
                    document.querySelector(".list-danhsachsinhvien").innerHTML = `<tr>
                    <td colspan="7" class="no">Không có bản ghi nào</td>
                    </tr>`
                    for(let sv of list){
                        $.ajax({
                            type: "GET",
                            url: 'http://localhost/Ql_diem/assets/model/getDiembyHocKy.php',
                            data: {
                                maSinhVien:sv.idSinhVien,
                                maHocKy:document.getElementsByName("selectHocBong")[0].value 
                            },
                            success: async (data) => {
                                const res = JSON.parse(data);
                                const lopSv = await getLopSv()

                                getSoTinChi =  (maLop) => {
                                    for (let item of lopSv) {
                                        if (item["idLop"] == maLop) {
                                            return {
                                                tenMonHoc: item["tenMonHoc"],
                                                tenHocKy: item["tenHocKy"],
                                                soTinChi: item["soTinChi"],
                                            }
                                        }
                                    }
                                }
                  
                                let tongTinChi = 0
                                if (res[0].notification) {
                                }else{
                                    for(let item of res){
                                        if (item.diemCC == null || item.diemGK == null || item.diemCK == null) {
                                        }else{
                                            tongTinChi=tongTinChi+Number(getSoTinChi(item.idLop).soTinChi)
                                        }
                                    }
                                   
                                }

                                if(tongTinChi>5){
                                    let diemTb = 0
                                    for(let item of res){
                                        if (item.diemCC == null || item.diemGK == null || item.diemCK == null) {
                                        }else{
                                             diemTb = diemTb + (( Number(item.diemCC)*0.2 +  Number(item.diemGK)*0.2 +  Number(item.diemCK)*0.6))
                                        }
                                    }
                                    if(diemTb/res.length>=8.5){
                                        document.querySelector(".no").style = "display:none"
                                        temp = 1
                                        document.querySelector(".list-danhsachsinhvien").insertAdjacentHTML("beforeend",`
                                        <tr>
                                            <th>${stt++}</th>
                                            <th>${sv.idSinhVien}</th>
                                            <th>${sv.tenSinhVien}</th>
                                            <th>${sv.ngaySinh}</th>
                                            <th>${sv.khoa}</th>
                                            <th>${diemTb/res.length}</th>
                                            <th>Giỏi</th>
                                        </tr>
                                        `)
                                    }
                                }
       
                            }
                        })
                    }
                }
            }
        })
    })
 }

controller.loadNoMon = () => {
    document.querySelector(".main-content").innerHTML = `
    <div>
        <div style="padding: 30px;">
            <label>Xem danh sách sinh viên nợ môn:</label>
            <select class="selectpicker3" data-live-search="true" name="selectNoMon">
                
            </select> 
            <button class="btn btn-primary btn-nomon" type="button" >Xác nhận</button>
        </div>
    </div>
   
    <div class="table-content">
        <div style="padding: 30px;">
        
        </div>
    </div>
    `
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/getMonHoc.php',
        data: {
            key: 1,
        },
        success: (data) => {
            const list = JSON.parse(data);

            if (list[0].notification) {

            } else {
                for(let item of list){
                document.getElementsByName("selectNoMon")[0].insertAdjacentHTML("beforeend",`<option data-tokens="" value="${item.maMonHoc}"> ${item.tenMonHoc}-${item.maMonHoc}</option>`)
                }
            }
            $('.selectpicker3').selectpicker();
        }
    });
    document.querySelector(".btn-nomon").addEventListener("click",()=>{
    
        document.querySelector(".table-content").innerHTML =  components.mainContentNoMon( document.getElementsByName("selectNoMon")[0].options[document.getElementsByName("selectNoMon")[0].selectedIndex].text)
        document.querySelector(".list-danhsachsinhvien").innerHTML = ""
        $.ajax({
            type: "GET",
            url: 'http://localhost/Ql_diem/assets/model/getDiembyMonHoc.php',
            data: {
                maMonHoc: document.getElementsByName("selectNoMon")[0].value 
            },
            success: (data) => {
                const list=JSON.parse(data);
                if (list[0].notification) {       
                    document.querySelector(".list-danhsachsinhvien").innerHTML = `<tr>
                    <td colspan="10">Không có bản ghi nào</td>
                    </tr>`
               }else{
                    let temp = 0
                    let stt = 1
                    for(let item of list){
                        if (item.diemCC == null || item.diemGK == null || item.diemCK == null) {
                        }
                        else{
                            let diemTB = (Number( Number(item.diemCC)*0.2 +  Number(item.diemGK)*0.2 +  Number(item.diemCK)*0.6)).toFixed(1)
                            if(diemTB<4){
                                temp = 1
                                document.querySelector(".list-danhsachsinhvien").insertAdjacentHTML("beforeend",`
                                <tr>
                                    <th>${stt++}</th>
                                    <th>${item.maSinhVien}</th>
                                    <th>${item.tenSinhVien}</th>
                                    <th>${item.ngaySinh}</th>
                                    <th>${item.khoa}</th>
                                    <th>${item.diemCC}</th>
                                    <th>${item.diemGK}</th>
                                    <th>${item.diemCK}</th>
                                    <th>${diemTB}</th>
                                    <th>Học Lại</th>
                                </tr>
                                `)
                            }
                        }
                    }
                    if(temp==0){
                        document.querySelector(".list-danhsachsinhvien").innerHTML = `<tr>
                        <td colspan="10">Không có bản ghi nào</td>
                        </tr>`
                    }
               }
            }
        })
    })
  
}

controller.inBangDiem = () => {
    document.querySelector(".main-content").innerHTML = `
    <div>
        <div style="padding: 30px;">
            <label>Chọn sinh viên:</label>
            <select class="selectpicker5" data-live-search="true" name="selectBangDiem">
                
            </select> 
            <button class="btn btn-primary btn-inbangdiem" type="button" >Xác nhận</button>
        </div>
    </div>
  
    <div class="table-content">
        <div style="padding: 30px;">
        
        </div>
    </div>
    <div class="in-wrapper"><div style="padding: 30px;" ><button class="btn btn-primary btn-in" type="button" >In bảng điểm</button></div></div>
    `
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/getSinhVien.php',
        data: {
            key: 1,
        },
        success: (data) => {
            const list = JSON.parse(data);

            if (list[0].notification) {

            } else {
                for(let item of list){
                document.getElementsByName("selectBangDiem")[0].insertAdjacentHTML("beforeend",`<option data-tokens="" ten="${item.tenSinhVien}" value="${item.idSinhVien}" khoa="${item.khoa}"> ${item.tenSinhVien}-${item.idSinhVien}</option>`)
                }
            }
            $('.selectpicker5').selectpicker();
        }
    });
    document.querySelector(".btn-inbangdiem").addEventListener("click",()=>{
        document.querySelector(".table-content").innerHTML = `<div style="padding: 30px;">
        <div style="margin: 15px 0px;">
            <h5 style="color: var(--pink);">BẢNG ĐIỂM CHI TIẾT: ${ document.getElementsByName("selectBangDiem")[0].options[document.getElementsByName("selectBangDiem")[0].selectedIndex].text}</h5>
        </div>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Học Kỳ</th>
                        <th>Mã Môn Học</th>
                        <th>Tên Mồn Học</th>
                        <th>Số Tín Chỉ</th>
                        <th>Điểm Chuyên Cần</th>
                        <th>Điểm Giữa Kỳ</th>
                        <th>Điểm Cuối Kỳ</th>
                        <th>Điểm Trung Bình</th>
                        <th>Điểm Thang 4</th>
                        <th>Xếp Loại</th>
                        <th>Đánh Giá</th>
                    </tr>
                </thead>
                <tbody class="list-diem-by-sinhvien">
                 </tbody>
            </table>
            <table class=" bangDiemIn" style="display:none;">
                <tr>
                    <td colspan="2" >Mã Sinh Viên:</td>
                    <td colspan="2" class="in-ma">${document.getElementsByName("selectBangDiem")[0].value}</td>
                    <td colspan="8"></td>
                </tr>
                <tr>
                    <td colspan="2" >Tên Sinh Viên:</td>
                    <td colspan="2" class="in-ten">${document.getElementsByName("selectBangDiem")[0].options[document.getElementsByName("selectBangDiem")[0].selectedIndex].getAttribute("ten")}</td>
                    <td colspan="8"></td>
                 </tr>
                <tr>
                    <td colspan="2">Khóa:</td>
                    <td colspan="2" class="in-khoa">${document.getElementsByName("selectBangDiem")[0].options[document.getElementsByName("selectBangDiem")[0].selectedIndex].getAttribute("khoa")}</td>
                    <td colspan="8"></td>
                </tr>
                <tr>
                    <td colspan="12"></td>
                </tr>
                <tr>
                <td colspan="12"></td>
            </tr>
            <tr>
            <td colspan="12"></td>
        </tr>
        <tr>
        <td colspan="12">Bảng điểm chi tiết</td>
    </tr>
                <tr>
                    <td>STT</td>
                    <td>Học Kỳ</td>
                    <td>Mã Môn Học</td>
                    <td>Tên Mồn Học</td>
                    <td>Số Tín Chỉ</td>
                    <td>Điểm Chuyên Cần</td>
                    <td>Điểm Giữa Kỳ</td>
                    <td>Điểm Cuối Kỳ</td>
                    <td>Điểm Trung Bình</td>
                    <td>Điểm Thang 4</td>
                    <td>Xếp Loại</td>
                    <td>Đánh Giá</td>
                </tr>
            <tbody class="list-diem-by-sinhvien-in">
                    <tr></tr>
             </tbody>
        </table>
        </div>
      </div>`
        controller.getDiem(document.getElementsByName("selectBangDiem")[0].value)
    })
}
controller.getDiem = (idSinhVien,maHocKy = "all") => {
    $.ajax({
        type: "GET",
        url: 'http://localhost/Ql_diem/assets/model/getLopSv.php',
        success: (data) => {
            const lop = JSON.parse(data);
            if (lop[0].notification) {
                alert("Không có bản ghi nào")
            } else {
                getMonHoc = (maLop) => {
                    for (let item of lop) {
                        if (item["idLop"] == maLop) {
                            return {
                                tenMonHoc: item["tenMonHoc"],
                                tenHocKy: item["tenHocKy"],
                                soTinChi: item["soTinChi"],
                            }
                        }
                    }
                }

                $.ajax({
                    type: "GET",
                    url: 'http://localhost/Ql_diem/assets/model/getDiembySv.php',
                    data: {
                        maHocKy: maHocKy,
                        maSinhVien: idSinhVien
                    },
                    success: (data) => {
                        const diem = JSON.parse(data);
                        if (diem[0].notification) {
                
                             document.querySelector(".list-diem-by-sinhvien").innerHTML = `<tr>
                             <td colspan="12">Không có bản ghi nào</td>
                             </tr>`
                        } else {
                            let htmlRaw = ""
                            let stt = 1
                            for (let item of diem) {
                                soTinChi = getMonHoc(item.maLop).soTinChi
                                let diem4 = 0;
                                let diemTB = ""
                                let danhGia = ""
                                let xepLoai = ""
                                if (item.diemCC == null || item.diemGK == null || item.diemCK == null) {
                                    
                                } else {
                                    diemTB = (Number( Number(item.diemCC)*0.2 +  Number(item.diemGK)*0.2 +  Number(item.diemCK)*0.6)).toFixed(1)
                                    if (diemTB >= 4) {
                                        danhGia = "ĐẠT"
                                    } else {
                                        danhGia = "HỌC LẠI"
                                    }
                                    
                                    if(diemTB<4){
                                        diem4 = 0*soTinChi/soTinChi
                                        xepLoai = "F"
                                    }else if(diemTB>=4 && diemTB <=5.4){
                                        diem4 = 1*soTinChi/soTinChi
                                        xepLoai = "D"
                                    }else if(diemTB >= 5.5 && diemTB <= 6.9){
                                        diem4 = 2*soTinChi/soTinChi
                                        xepLoai = "C"
                                    }
                                    else if(diemTB >= 7 && diemTB <= 8.4){
                                        diem4 = 3*soTinChi/soTinChi
                                        xepLoai = "B"
                                    }
                                    else if(diemTB >= 8.5){
                                        diem4 = 4*soTinChi/soTinChi
                                        xepLoai = "A"
                                    }


                                }
                                tenMonHoc = getMonHoc(item.maLop).tenMonHoc
                                tenHocKy= getMonHoc(item.maLop).tenHocKy
   
                                htmlRaw = htmlRaw + `
                                <tr>
                                    <td>${stt++}</td>
                                    <td>${tenHocKy}</td>
                                    <td>${item.maMonHoc}</td>
                                    <td>${tenMonHoc}</td>
                                    <td>${soTinChi}</td>
                                    <td>${item.diemCC}</td>
                                    <td>${item.diemGK}</td>
                                    <td>${item.diemCK}</td>
                                    <td>${diemTB}</td>
                                    <td>${diem4}</td>
                                    <td>${xepLoai}</td>
                                    <td>${danhGia}</td>
                                </tr>
                                `
                            }
                            document.querySelector(".list-diem-by-sinhvien").innerHTML = htmlRaw
                            document.querySelector(".list-diem-by-sinhvien-in").innerHTML =htmlRaw
                            $(".btn-in").click(function(){
                                $(".bangDiemIn").table2excel({
                                  // exclude CSS class
                                  exclude: ".noExl",
                                  name: "Worksheet Name",
                                  filename: "Bảng điểm" //do not include extension
                                }); 
                              });
                        }
                    }
                });
            }
        }
    });
}
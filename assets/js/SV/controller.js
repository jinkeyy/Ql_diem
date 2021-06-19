let controller = {}
controller.loadDiem = (idSinhVien) => {
    console.log("load " + idSinhVien)
    tableDiem()
    $.ajax({
        type: "GET",
        url: 'http://localhost/Ql_diem/assets/model/getHocKy.php',
        success: (data) => {
            const list = JSON.parse(data);
            if (list[0].notification) {
                alert("Không có bản ghi nào")
            } else {
                let htmlRaw = `<option value="all" selected>Toàn Khóa</option>`
                let htmlRaw1 = ""
                let stt = 1
                for (let i = 0; i < (66 - localStorage.getItem('khoa')) * 2; i++) {
                    let maHk = list[i].idHocKy
                    let tenHk = list[i].tenHocKy
                    htmlRaw = htmlRaw + `
                   <option value="${maHk}" >${tenHk}</option>
                   `
                    htmlRaw1 = htmlRaw1 +`
                        <tr>
                        <td>${list[i].tenHocKy}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>
                    `
                }
                htmlRaw1 = htmlRaw1+`<tr>
                <td>Toàn Khóa</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                </tr>`
                document.querySelector(".list-tongdiem").innerHTML = htmlRaw1
                document.getElementsByName("select-hocky")[0].innerHTML = htmlRaw
            }

        }
    });
    document.getElementsByName("select-hocky")[0].addEventListener("change", () => {
        console.log(document.getElementsByName("select-hocky")[0].value)
        controller.getDiem(localStorage.getItem('userSv'),document.getElementsByName("select-hocky")[0].value)
    })
    controller.getDiem(localStorage.getItem('userSv'))

}
controller.getDiem = (idSinhVien, maHocKy = "all") => {
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
                             <td colspan="9">Không có bản ghi nào</td>
                             </tr>`
                        } else {
                            let htmlRaw = ""
                            let stt = 1
                            for (let item of diem) {
                                let diemTB = ""
                                let danhGia = ""
                                if (item.diemCC == null || item.diemGK == null || item.diemCK == null) {
                                    
                                } else {
                                    diemTB = (Number( Number(item.diemCC) +  Number(item.diemGK) +  Number(item.diemCK)) / 3).toFixed(1)
                                    if (diemTB >= 4) {
                                        danhGia = "ĐẠT"
                                    } else {
                                        danhGia = "HỌC LẠI"
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
                                    <td>${item.diemCC}</td>
                                    <td>${item.diemGK}</td>
                                    <td>${item.diemCK}</td>
                                    <td>${diemTB}</td>
                                    <td>${danhGia}</td>
                                </tr>
                                `
                            }
                            document.querySelector(".list-diem-by-sinhvien").innerHTML = htmlRaw
                        
                        }
                    }
                });
            }
        }
    });
}

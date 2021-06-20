let controller = {}


function getDiem(maHk,idSinhVien) {
    return new Promise(res=>{
        $.ajax({
            type: "GET",
            url: 'http://localhost/Ql_diem/assets/model/getDiembySv.php',
            data: {
                maHocKy: maHk,
                maSinhVien: idSinhVien
            },
            success: (data) => {
                res(JSON.parse(data))
            }
        });
    });
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
controller.loadDiem   =   (idSinhVien)  =>  {
    console.log("load " + idSinhVien)
    tableDiem()
     $.ajax({
        type: "GET",
        url: 'http://localhost/Ql_diem/assets/model/getHocKy.php',
        success: async (data) => {
            const list = JSON.parse(data);
            if (list[0].notification) {
                alert("Không có bản ghi nào")
            } else {
                let htmlRaw = `<option value="all" selected>Toàn Khóa</option>`
                let stt = 1
                let diem = []
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
                let tongSoTinChi=0;
                let tongDiem=0;
                let tongDiem4=0;
                let tongMon = 0;
                for (let i = 0; i < (66 - localStorage.getItem('khoa')) * 2; i++) {
                    let maHk = list[i].idHocKy
                    let tenHk = list[i].tenHocKy
                    let tongdiemTb = 0;
                    let tongdiemTb4 = 0
                    let soTinChi= 0;

                    let dataDiem = await getDiem(maHk,idSinhVien)
                    // $.ajax({
                    //     type: "GET",
                    //     url: 'http://localhost/Ql_diem/assets/model/getDiembySv.php',
                    //     data: {
                    //         maHocKy: maHk,
                    //         maSinhVien: idSinhVien
                    //     },
                    //     success: (data) => {
                    //         const diem = JSON.parse(data);
                    //         if (diem[0].notification) {

                    //         } else {
                    //             console.log(diem)
                    //         }
                    //     }
                    // });
                    for(let diem of dataDiem){
                        if (diem.diemCC == null || diem.diemGK == null || diem.diemCK == null) {
                        
                        } else{
                            tongMon = tongMon+1
                            const diemMon = (( Number(diem.diemCC) +  Number(diem.diemGK) +  Number(diem.diemCK)) / 3)
                            tongdiemTb = Number(tongdiemTb) +diemMon
                            tongDiem= tongDiem+diemMon
                            soTinChi = Number(soTinChi) + Number(getSoTinChi(diem.maLop).soTinChi)
                            if(diemMon<4){
                                tongdiemTb4 =  Number(tongdiemTb4) + Number(getSoTinChi(diem.maLop).soTinChi*0)
                                tongDiem4 = tongDiem4 + Number(getSoTinChi(diem.maLop).soTinChi*0)
                            }else if(diemMon>=4 && diemMon <=5.4){
                                tongdiemTb4 =  Number(tongdiemTb4) + Number(getSoTinChi(diem.maLop).soTinChi*1)
                                tongDiem4 = tongDiem4 + Number(getSoTinChi(diem.maLop).soTinChi*1)
                            }else if(diemMon >= 5.5 && diemMon <= 6.9){
                                tongdiemTb4 =  Number(tongdiemTb4) + Number(getSoTinChi(diem.maLop).soTinChi*2)
                                tongDiem4 = tongDiem4 + Number(getSoTinChi(diem.maLop).soTinChi*2)
                            }
                            else if(diemMon >= 7 && diemMon <= 8.4){
                                tongdiemTb4 = Number(tongdiemTb4) + Number(getSoTinChi(diem.maLop).soTinChi*3)
                                tongDiem4 = tongDiem4 + Number(getSoTinChi(diem.maLop).soTinChi*3)
                            }
                            else if(diemMon >= 8.5){
                                tongdiemTb4 = Number(tongdiemTb4) + Number(getSoTinChi(diem.maLop).soTinChi*4)
                                tongDiem4 = tongDiem4 + Number(getSoTinChi(diem.maLop).soTinChi*4)
                            }
                        }
                    }
                    let diem4 = Number(tongdiemTb4)/Number(soTinChi)
                    if(isNaN(diem4)){
                        diem4 = 0
                    }
                    
                    document.querySelector(".list-tongdiem").insertAdjacentHTML("beforebegin",`<tr>
                    <td>${tenHk}</td>
                    <td>${Number(soTinChi)}</td>
                    <td>${(Number(tongdiemTb)/dataDiem.length).toFixed(1)}</td>
                    <td>${diem4}</td>
                    </tr>`) 
                    htmlRaw = htmlRaw + `<option value="${maHk}" >${tenHk}</option>`
                    tongSoTinChi=tongSoTinChi+Number(soTinChi)
                }
                document.querySelector(".list-tongdiem").insertAdjacentHTML("beforebegin",`<tr>
                <td>Toàn Khóa</td>
                <td>${tongSoTinChi}</td>
                <td>${Number(tongDiem/tongMon).toFixed(1)}</td>
                <td>${(tongDiem4/tongSoTinChi).toFixed(1)}</td>
                </tr>`) 
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
                                    diemTB = (Number( Number(item.diemCC) +  Number(item.diemGK) +  Number(item.diemCK)) / 3).toFixed(1)
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
                        
                        }
                    }
                });
            }
        }
    });
}

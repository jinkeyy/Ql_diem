let controller = {

}
controller.getSv = (kw = "1")=>{
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/getSinhVien.php',
        data:{
            key:kw,
        },
        success: (data) => {
            const list=JSON.parse(data);
            if(list[0].notification){
                alert("Không có bản ghi nào")
            }else{
               let htmlRaw  = ""
               let stt =1
               for(let item of list){
                   htmlRaw = htmlRaw +  `
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
controller.addSv = ()=>{
    if(document.getElementsByName("maSv")[0].value=="" || document.getElementsByName("maSv")[0].value == "" || document.getElementsByName("matKhauSv")[0].value == ""){
        alert("Chưa điềm đủ thông tin cần thiết")
    }else if(document.getElementsByName("matKhauSv")[0].value != document.getElementsByName("rmatKhauSv")[0].value){
        alert("Mật khẩu không trùng nhau")
    }else{
        const sv = {
            maSv:document.getElementsByName("maSv")[0].value,
            tenSv:document.getElementsByName("tenSv")[0].value,
            diaChiSv:document.getElementsByName("diaChiSv")[0].value,
            ngaySinhSv:document.getElementsByName("ngaySinhSv")[0].value,
            khoaSv:document.getElementsByName("khoaSv")[0].value,
            matKhauSv:document.getElementsByName("matKhauSv")[0].value,
        }
        $.ajax({
            type: "POST",
            url: 'http://localhost/Ql_diem/assets/model/taoSinhVien.php',
            data: sv,
            success: (data) => {
                if(JSON.parse(data)[0].notification == "true"){
                    alert("Tạo sinh viên thành công");
                    $('#form-tao-sv').modal('hide');
                }else if(JSON.parse(data)[0].notification == "trung"){
                    alert("Mã đã tồn tại")
                }else{
                    alert("Lỗi")
                }
                document.querySelector(".main-content").innerHTML = components.mainContentSv()
                controller.getSv()
            }
        });
        
    }
}
controller.getMh = (kw= "1")=>{
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/getMonHoc.php',
        data:{
            key:kw,
        },
        success: (data) => {
            const list=JSON.parse(data);
            if(list[0].notification){
                
            }else{
               let htmlRaw  = ""
               let stt = 1
               for(let item of list){
                   htmlRaw = htmlRaw +  `
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
controller.addMh = ()=>{
    
    if( document.getElementsByName("maMh")[0].value=="" || document.getElementsByName("tenMh")[0].value =="" ){
        alert("Chưa điền đủ thông tin")
    }
    else{
        const mh = {
            maMh:document.getElementsByName("maMh")[0].value,
            tenMh:document.getElementsByName("tenMh")[0].value,
            tinChi:document.getElementsByName("tinChi")[0].value,
        }
        $.ajax({
            type: "POST",
            url: 'http://localhost/Ql_diem/assets/model/taoMonHoc.php',
            data: mh,
            success: (data) => {
                if(JSON.parse(data)[0].notification == "true"){
                    alert("Tạo môn học thành công");
                    $('#form-tao-mh').modal('hide');
                }else if(JSON.parse(data)[0].notification == "trung"){
                    alert("Mã đã tồn tại")
                }else{
                    alert("Lỗi")
                }
                document.querySelector(".main-content").innerHTML = components.mainContentMh()
                controller.getMh()
            }
        });
    }

}
controller.getDSSVL = (idLop)=>{
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/getDSSVL.php',
        data:{
            maLop:idLop,
        },
        success: (data) => {
            const list=JSON.parse(data);
            if(list[0].notification){
                let htmlRaw = `
                <tr>
                <td colspan="6">không có bản ghi nào</td>
            </tr>
            <tr colspan="6">
            <td><button class="btn btn-primary" data-toggle="modal" data-target="#form-tao-sv-vao-lop" type="button">Thêm sinh viên vào lớp</button></td> 
            </tr>
                   `
                   document.querySelector(".list-danhsachsinhvienlop").innerHTML = htmlRaw

            }else{
               let htmlRaw  = ""
               let stt =1
               for(let item of list){
                   htmlRaw = htmlRaw +  `
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
               htmlRaw=htmlRaw+`<tr colspan="6">
               <td><button class="btn btn-primary" data-toggle="modal" data-target="#form-tao-sv-vao-lop" type="button">Thêm sinh viên vào lớp</button></td> 
               </tr>`
               document.querySelector(".list-danhsachsinhvienlop").innerHTML = htmlRaw
               let listXoa = document.getElementsByClassName("xoaSVLop")
               for(let item of listXoa){
                   item.addEventListener("click",()=>{
                    if((confirm('Bạn có chắc xóa sinh viên ra khỏi lớp'))){
                        $.ajax({
                            type: "POST",
                            url: 'http://localhost/Ql_diem/assets/model/xoaSinhVienLop.php',
                            data:{
                                idSVLop:item.getAttribute("idSVLop"),
                            },
                            success: (data) => {
                                const list=JSON.parse(data);
                                if(list[0].notification =="true"){
                                    alert("Xóa thành công")
                                    controller.getDSSVL(idLop)
                                }else{
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
controller.getDsl = (idLop,maMon)=>{
    console.log("Danh sách sv")
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/getSinhVien.php',
        data:{
            key:1,
        },
        success: (data) => {
            const list=JSON.parse(data);
            if(list[0].notification){
                
            }else{
               let htmlRaw  = `<label>Sinh viên:</label>
               <select class="selectpicker" data-live-search="true" name="selectSvLop">
                `
               for(let item of list){
                   htmlRaw = htmlRaw +  `
                   <option data-tokens="${item.idSinhVien}" value="${item.idSinhVien}" idLop="${idLop}" maMon="${maMon}">${item.idSinhVien}- ${item.tenSinhVien}</option> 
                   `
               }
               htmlRaw =htmlRaw+ `</select>`
               document.querySelector(".select-sv-lop").innerHTML = htmlRaw
               $('.selectpicker').selectpicker();
            }

        }
      });

    controller.getDSSVL(idLop)
   
}
document.querySelector(".btn-tao-sv-lop").addEventListener("click",()=>{
    const sv = {
        maLop:document.getElementsByName("selectSvLop")[0].options[document.getElementsByName("selectSvLop")[0].selectedIndex].getAttribute("idLop"),
        maSinhVien:document.getElementsByName("selectSvLop")[0].value,
        maMonHoc:document.getElementsByName("selectSvLop")[0].options[document.getElementsByName("selectSvLop")[0].selectedIndex].getAttribute("maMon"),
    }
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/taoSinhVienLop.php',
        data: sv,
        success: (data) => {   
            if(JSON.parse(data)[0].notification == "true"){
                $('#form-tao-sv-vao-lop').modal('hide');
                alert("Thêm sinh viên vào lớp thành công");
            }else if(JSON.parse(data)[0].notification == "trung"){
                alert("Sinh viên đã ở trong lớp này hoặc đã học môn này")
                $('#form-tao-sv-vao-lop').modal('hide');
            }else{
                alert("Lỗi")
            }
            controller.getDSSVL(sv.maLop)
        }
    });
    
})
controller.getLop = ()=>{
    $.ajax({
        type: "GET",
        url: 'http://localhost/Ql_diem/assets/model/getHocKy.php',
        success: (data) => {
            const list=JSON.parse(data);
            if(list[0].notification){
                alert("Không có bản ghi nào")
            }else{
               let htmlRaw  = ""
               let stt =1
               for(let item of list){
                   htmlRaw = htmlRaw +  `
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
        data:{
            key:1,
        },
        success: (data) => {
            const list=JSON.parse(data);
            if(list[0].notification){
                
            }else{
               let htmlRaw  = ""
               let stt = 1
               for(let item of list){
                   htmlRaw = htmlRaw +  `
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
            const list=JSON.parse(data);
            if(list[0].notification){
                
            }else{
               let htmlRaw  = ""
               let stt = 1
               for(let item of list){
                   htmlRaw = htmlRaw +  `
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
               for(let item of listLop){
                   item.addEventListener("click",()=>{
                    document.querySelector(".table-content").innerHTML = components.tableDsl(item.getAttribute("maLop"),item.parentElement.parentElement.querySelector(".monhoc").textContent,item.parentElement.parentElement.querySelector(".hocky").textContent)
                    controller.getDsl(item.getAttribute("maLop"),item.getAttribute("maMon"))
                   })
               }
            }

        }
      });
}
controller.addLop = ()=>{
    const lop = {
        maLop:document.getElementsByName("maLop")[0].value,
        maMh:document.getElementsByName("select-mh")[0].value,
        maHk:document.getElementsByName("select-hk")[0].value,
        tenGv:document.getElementsByName("tenGv")[0].value,
    }
    if(document.getElementsByName("maLop")[0].value == ""){
        alert("Chưa điền mã lớp")
    }else{
        $.ajax({
            type: "POST",
            url: 'http://localhost/Ql_diem/assets/model/taoLop.php',
            data: lop,
            success: (data) => {
                if(JSON.parse(data)[0].notification == "true"){
                    alert("Tạo lớp thành công");
                    $('#form-tao-lop').modal('hide');
                }else if(JSON.parse(data)[0].notification == "trung"){
                    alert("Mã đã tồn tại")
                }else{
                    alert("Lỗi")
                }
                document.querySelector(".main-content").innerHTML = components.mainContentLop()
                controller.getLop()
            }
        });
    }
}



controller.loadNhapDiem = ()=>{
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
            const list=JSON.parse(data);
            if(list[0].notification){
                
            }else{
               let htmlRaw  = ""
               for(let item of list){
                   htmlRaw = htmlRaw +  `
                   <option data-tokens="${item.idLop}" value="${item.idLop}">${item.tenMonHoc}-Lớp ${item.idLop}-${item.tenHocKy}</option> 
                   `
               }
               document.getElementsByName("selectLopDiem")[0].innerHTML = htmlRaw
               $('.selectpicker1').selectpicker();
            }

        }
     });
     document.querySelector(".btn-search-lop").addEventListener("click",()=>{
        let t = document.getElementsByName("selectLopDiem")[0]
        let text = t.options[t.selectedIndex].text
        document.querySelector(".table-content").innerHTML = components.mainContentNhapDiem(text)
        $.ajax({
            type: "POST",
            url: 'http://localhost/Ql_diem/assets/model/getDSSVL.php',
            data:{
                maLop:t.value,
            },
            success: (data) => {
                const list=JSON.parse(data);
                if(list[0].notification){
                   
                }else{
                   let htmlRaw  = ""
                   let stt =1
                   for(let item of list){
                       htmlRaw = htmlRaw +  `
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
                   for(let item of listXoa){
                       item.addEventListener("click",()=>{
                           const req = {
                               idSVLop:item.getAttribute("idSVLop"),
                               tenSinhVien:item.getAttribute("tenSinhVien"),
                               lop:item.getAttribute("lop"),
                           }
    
                           controller.nhapDiem(req)
                       })
                   }
                }
            }
        });
     })
}
controller.nhapDiem = (req)=>{
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/checkNhapDiem.php',
        data:{
            idSVLop:req.idSVLop
        },
        success: (data) => {
            const list = JSON.parse(data);
            if(list[0].notification=="true"){
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
                document.querySelector(".btn-nhap-diem").addEventListener("click",()=>{
                    const diemCC = document.getElementsByName("diemCC")[0].value
                    const diemGK = document.getElementsByName("diemGK")[0].value
                    const diemCK = document.getElementsByName("diemCK")[0].value
                    const diem = {
                        maSVLop:req.idSVLop,
                        diemCC:diemCC,
                        diemGK:diemGK,
                        diemCK:diemCK,
                    }
                    if(diemCC >= 0 && diemCC <= 10 && diemGK >= 0 && diemGK <= 10 && diemCK >= 0 && diemCK <= 10 || diemCC =="" || diemCK =="" || diemGK==""){
                        $.ajax({
                            type: "POST",
                            url: 'http://localhost/Ql_diem/assets/model/nhapDiem.php',
                            data: diem,
                            success: (data) => {
                                if(JSON.parse(data)[0].notification == "true"){
                                    alert("Nhập điểm thành công");
                                    $('#form-nhap-diem').modal('hide');
                                }else if(JSON.parse(data)[0].notification == "trung"){
                                    alert("Lỗi")
                                }else{
                                    alert("Lỗi")
                                }
                            }
                        });
                    }else{
                        alert("Nhập điểm không hợp")
                    }
                })
            }else{
                //Đã nhập điểm
                $.ajax({
                    type: "POST",
                    url: 'http://localhost/Ql_diem/assets/model/getDiemSvLop.php',
                    data:{
                        maSVLop:req.idSVLop,
                    },
                    success: (data) => {
                        const list=JSON.parse(data);
                        if(list[0].notification){
                            
                        }else{
                            let htmlRaw = `
                                        <div class="form-group"><label>Tên Sinh Viên:</label><input type="text" class="form-control"
                            readonly  value="${req.tenSinhVien}"></div>
                            <div class="form-group"><label>Lớp:</label><input type="text" class="form-control"
                            readonly value="${req.lop}"></div>`
                            if(list[0].diemCC == null){
                                htmlRaw=htmlRaw+`<div class="form-group"><label>Điểm Chuyên Cần:</label><input type="number" class="form-control"  name="diemCC"
                                ></div>`
                            }else{
                                htmlRaw=htmlRaw+`<div class="form-group"><label>Điểm Chuyên Cần:</label><input type="number" class="form-control"  name="diemCC"
                                value="${list[0].diemCC}" readonly></div>`
                            }
                            if(list[0].diemGK == null){
                                htmlRaw=htmlRaw+`<div class="form-group"><label>Điểm Giữa Kỳ:</label><input type="number" class="form-control"  name="diemGK"
                                ></div>`
                            }else{
                                htmlRaw=htmlRaw+`<div class="form-group"><label>Điểm Giữa Kỳ:</label><input type="number" class="form-control"  name="diemGK"
                                value="${list[0].diemGK}" readonly></div>`
                            }
                            if(list[0].diemCK == null){
                                htmlRaw=htmlRaw+`<div class="form-group"><label>Điểm Cuối Kỳ:</label><input type="number" class="form-control"  name="diemCK"
                                ></div>`
                            }else{
                                htmlRaw=htmlRaw+`<div class="form-group"><label>Điểm Cuối Kỳ:</label><input type="number" class="form-control"  name="diemCK"
                                value="${list[0].diemCK}" readonly></div>`
                            }
                            if(list[0].diemCC == null || list[0].diemGK == null || list[0].diemCK == null){
                                htmlRaw=htmlRaw+`<div class="form-group d-flex justify-content-center"><button class="btn btn-primary btn-nhap-diem" type="button">Xác nhận</button></div>`
                            }else{
                                htmlRaw=htmlRaw+`<div class="form-group d-flex justify-content-center"><button class="btn btn-primary btn-nhap-diem" type="button" style="display:none">Xác nhận</button></div>`
                            }
                            
                            document.querySelector(".body-nhapdiem").innerHTML = htmlRaw
                            document.querySelector(".btn-nhap-diem").addEventListener("click",()=>{
                                const diemCC = document.getElementsByName("diemCC")[0].value
                                const diemGK = document.getElementsByName("diemGK")[0].value
                                const diemCK = document.getElementsByName("diemCK")[0].value
                                const diem = {
                                    maSVLop:req.idSVLop,
                                    diemCC:diemCC,
                                    diemGK:diemGK,
                                    diemCK:diemCK,
                                }
                                if(diemCC >= 0 && diemCC <= 10 && diemGK >= 0 && diemGK <= 10 && diemCK >= 0 && diemCK <= 10 || diemCC =="" || diemCK =="" || diemGK==""){
                                    $.ajax({
                                        type: "POST",
                                        url: 'http://localhost/Ql_diem/assets/model/suaDiem.php',
                                        data:diem,
                                        success: (data) => {
                                            const list=JSON.parse(data);
                                            if(list[0].notification=="true"){
                                                alert("Nhập điểm thành công")
                                                $('#form-nhap-diem').modal('hide');
                                            }else{
                                                alert("Lỗi")
                                            }
                                        }
                                    })
                                }else{
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
controller.loadSuaDiem = ()=>{
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
            const list=JSON.parse(data);
            if(list[0].notification){
                
            }else{
               let htmlRaw  = ""
               for(let item of list){
                   htmlRaw = htmlRaw +  `
                   <option data-tokens="${item.idLop}" value="${item.maSVLop}" tenSinhVien="${item.tenSinhVien}" tenLop="Lớp ${item.idLop}( ${item.maMonHoc})">${item.tenSinhVien}( ${item.maSinhVien})-Lớp ${item.idLop}( ${item.maMonHoc})</option> 
                   `
               }
               document.getElementsByName("selectSvDiem")[0].innerHTML = htmlRaw
               $('.selectpicker2').selectpicker();
            }
        }
     });

     document.querySelector(".btn-sua-diem").addEventListener("click",()=>{
            let t = document.getElementsByName("selectSvDiem")[0]
            let tenSinhVien = t.options[t.selectedIndex].getAttribute("tenSinhVien")
            let tenLop = t.options[t.selectedIndex].getAttribute("tenLop")
         $.ajax({
            type: "POST",
            url: 'http://localhost/Ql_diem/assets/model/getDiemSvLop.php',
            data:{
                maSVLop:t.value,
            },
            success: (data) => {
                const list=JSON.parse(data);
                if(list[0].notification){
                    
                }else{
                    document.querySelector(".modal-title-form-nhap").innerHTML= "Sửa điểm"
                    let htmlRaw = `
                    <div class="form-group"><label>Tên Sinh Viên:</label><input type="text" class="form-control"
                    readonly  value="${tenSinhVien}"></div>
                    <div class="form-group"><label>Lớp:</label><input type="text" class="form-control"
                    readonly value="${tenLop}"></div>`

                        htmlRaw=htmlRaw+`<div class="form-group"><label>Điểm Chuyên Cần:</label><input type="number" class="form-control"  name="diemCC"
                        value="${list[0].diemCC}" ></div>`

                        htmlRaw=htmlRaw+`<div class="form-group"><label>Điểm Giữa Kỳ:</label><input type="number" class="form-control"  name="diemGK"
                        value="${list[0].diemGK}" ></div>`
                
                        htmlRaw=htmlRaw+`<div class="form-group"><label>Điểm Cuối Kỳ:</label><input type="number" class="form-control"  name="diemCK"
                        value="${list[0].diemCK}" ></div>`
                
                    htmlRaw=htmlRaw+`<div class="form-group d-flex justify-content-center"><button class="btn btn-primary btn-nhap-diem" type="button">Xác nhận</button></div>`
                    document.querySelector(".body-nhapdiem").innerHTML = htmlRaw
                    document.querySelector(".btn-nhap-diem").addEventListener("click",()=>{
                        const diemCC = document.getElementsByName("diemCC")[0].value
                        const diemGK = document.getElementsByName("diemGK")[0].value
                        const diemCK = document.getElementsByName("diemCK")[0].value
                        const diem = {
                            maSVLop:list[0].maSVLop,
                            diemCC:diemCC,
                            diemGK:diemGK,
                            diemCK:diemCK,
                        }
                        if(diemCC >= 0 && diemCC <= 10 && diemGK >= 0 && diemGK <= 10 && diemCK >= 0 && diemCK <= 10 || diemCC =="" || diemCK =="" || diemGK==""){
                            $.ajax({
                                type: "POST",
                                url: 'http://localhost/Ql_diem/assets/model/suaDiem.php',
                                data:diem,
                                success: (data) => {
                                    const list=JSON.parse(data);
                                    if(list[0].notification=="true"){
                                        alert("Sửa điểm thành công")
                                        $('#form-nhap-diem').modal('hide');
                                    }else{
                                        alert("Lỗi")
                                    }
                                }
                            })
                        }else{
                            alert("Nhập điểm không hợp")
                        }
                    })
                }
            }
          });

     })
}
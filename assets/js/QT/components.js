let components = {}
components.mainSV = ()=>{
    
}
components.logined = (user)=>{
    return `
    <div class="container"><a class="navbar-brand" href="#" style="color: var(--light);">Hệ Thống Quản Lý
    Điểm</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span
      class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
  <div class="collapse navbar-collapse" id="navcol-1">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item"></li>
      <li class="nav-item"></li>
    </ul>
    <div class="dropdown"><a class="dropdown-toggle" aria-expanded="false" data-toggle="dropdown" href="#"
        style="color: var(--light);">Tài khoản ( ${user})</a>
      <div class="dropdown-menu"><a class="dropdown-item" href="#">Thông Tin Tài Khoản</a><a class="dropdown-item btn-logout"
          href="#">Đăng Xuất</a></div>
    </div>
  </div>
</div>`
}
components.notLogined = ()=>{
    return `
    <div class="container"><a class="navbar-brand" href="#" style="color: var(--light);">Hệ Thống Quản Lý
    Điểm</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span
      class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
  <div class="collapse navbar-collapse" id="navcol-1">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item"></li>
      <li class="nav-item"></li>
    </ul>
    </div><span class="navbar-text actions"> <a class="btn btn-light action-button" role="button" href="#"
        data-toggle="modal" data-target="#form-login">Đăng nhập ngay</a></span>
  </div>
    </div>
    `
}
components.mainNotLogined = ()=>{
    return ``
}
components.mainLogined = ()=>{
    return `<div class="col-xl-2" style="border-right: 3px solid var(--gray);padding: 0px;">
    <div>
      <ul class="list-unstyled" style="padding: 3px;">
        <li class="d-flex justify-content-center align-items-center item item-active"
          style="color: var(--gray-dark);background: rgb(255,255,255);height: 40px;" get="1"><strong>Trang Chủ</strong></li>
        <li class="d-flex justify-content-center align-items-center item "
          style="color: var(--gray-dark);background: rgb(255,255,255);height: 40px;" get="2"><strong>Sinh Viên</strong></li>
        <li class="d-flex justify-content-center align-items-center item"
          style="color: var(--gray-dark);background: rgb(255,255,255);height: 40px;" get="3"><strong>Môn Học</strong></li>
        <li class="d-flex justify-content-center align-items-center item"
          style="color: var(--gray-dark);background: rgb(255,255,255);height: 40px;" get="4"><strong>Lớp Học Phần</strong>
        </li>
        <li class="d-flex justify-content-center align-items-center item"
          style="color: var(--gray-dark);background: rgb(255,255,255);height: 40px;" get="5"><strong>Quản Lý Điểm</strong>
        </li>
        <li class="d-flex justify-content-center align-items-center item"
          style="color: var(--gray-dark);background: rgb(255,255,255);height: 40px;" get="6"><strong>Thống Kê</strong></li>
      </ul>
    </div>
  </div>
  <div class="col main-content" style="padding: 0px;">

  </div>`
}
components.mainContentSv = ()=>{
    return `<div>
    <div>
      <div class="d-flex justify-content-end align-items-center" style="padding: 10px;"><button
          class="btn btn-primary btn-lg" type="button" data-toggle="modal" data-target="#form-tao-sv">Tạo Sinh Viên
          Mới</button></div>
    </div>
    <div>
      <div>
        <div>
          <div class="bootstrap_datatables">
            <div class="container-fluid py-5">
              <header class="text-center text-black">
                <h1 class="display-6">Danh sách sinh viên</h1>
              </header>
              <div class="row py-5">
                <div class="col-lg-12 mx-auto">
                  <div class="card rounded shadow border-0">
                    <div class="card-body p-5 bg-white rounded">
                      <div class="table-responsive">
                        <table  style="width:100%" class="table table-bordered table-sinhvien">
                          <thead>
                            <tr>
                                <th>STT</th>
                              <th>Mã sinh viên</th>
                              <th>Họ tên</th>
                              <th>Khoa</th>
                              <th>Ngày sinh</th>
                              <th>Địa chỉ</th>
                            </tr>
                          </thead>
                          <tbody class="list-sinhvien">
                            <tr>
                            <td colspan="6">Không có bản ghi nào</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
}
components.mainContentMh = ()=>{
    return `<div>
    <div>
      <div class="d-flex justify-content-end align-items-center" style="padding: 10px;"><button
          class="btn btn-primary btn-lg" type="button" data-toggle="modal" data-target="#form-tao-mh">Tạo Môn Học</button></div>
    </div>
    <div>
      <div>
        <div>
          <div class="bootstrap_datatables">
            <div class="container-fluid py-5">
              <header class="text-center text-black">
                <h1 class="display-6">Danh sách môn học</h1>
              </header>
              <div class="row py-5">
                <div class="col-lg-12 mx-auto">
                  <div class="card rounded shadow border-0">
                    <div class="card-body p-5 bg-white rounded">
                      <div class="table-responsive">
                        <table  style="width:100%" class="table table-bordered table-monhoc">
                          <thead>
                            <tr>
                                <th>STT</th> 
                              <th>Mã môn học</th>
                              <th>Tên môn học</th>
                              <th>Tín chỉ</th>
                            </tr>
                          </thead>
                          <tbody class="list-monhoc">
                            <tr>
                              <td colspan="4">Không có bản ghi nào</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
}
components.mainContentLop = ()=>{
    return `<div>
    <div>
        <div style="padding: 10px;">
        <div class="d-flex justify-content-end align-items-center" "><button class="btn btn-primary btn-lg " data-toggle="modal" data-target="#form-tao-lop" type="button">Tạo Lớp Mới</button></div>
        </div>
    </div>
    <div class="table-content">
      <div>
        <div>
          <div class="bootstrap_datatables">
            <div class="container-fluid py-5">
              <header class="text-center text-black">
                <h1 class="display-6">Danh sách lớp</h1>
              </header>
              <div class="row py-5">
                <div class="col-lg-12 mx-auto">
                  <div class="card rounded shadow border-0">
                    <div class="card-body p-5 bg-white rounded">
                      <div class="table-responsive">
                        <table  style="width:100%" class="table table-bordered table-lop">
                          <thead>
                            <tr>
                                <th>STT</th> 
                              <th>Mã Lớp</th>
                              <th>Tên môn học</th>
                              <th>Học Kỳ</th>
                              <th>Danh sách lớp</th>

                            </tr>
                          </thead>
                          <tbody class="list-lop">
                            <tr>
                              <td colspan="5">Không có bản ghi nào</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
}
components.tableDsl = (lop,monHoc,hocKy)=>{
    return `
    <div style="padding: 30px;">
        <div style="margin: 15px 0px;">
            <h5 style="color: var(--pink);">Danh sách sinh viên lớp:&nbsp;<span style="color: var(--gray-dark);">${lop}( ${monHoc}- ${hocKy})</span></h5>
        </div>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Mã sinh viên</th>
                        <th>Họ tên sinh viên</th>
                        <th>Ngày sinh</th>
                        <th>Khóa</th>
                        <th>Xóa sinh viên khỏi lớp</th>
                    </tr>
                </thead>
                <tbody class="list-danhsachsinhvienlop">
                    <tr>
                        <td colspan="6">không có bản ghi nào</td>
                    </tr>
                    <tr colspan="6">
                    <td><button class="btn btn-primary" data-toggle="modal" data-target="#form-tao-sv-vao-lop" type="button">Thêm sinh viên vào lớp</button></td> 
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-end"><button class="btn btn-primary" type="button">In danh sách sinh viên lớp</button></div>
    </div>
    `
}

components.mainContentDiem = ()=>{
  return `
  <div class="row" style="margin: 0px;height: 300px;">
    <div class="col d-flex justify-content-center align-items-center">
        <div class="d-flex justify-content-center align-items-center btn-nhap-diem" style="width: 50%;height: 200px;background: linear-gradient(-82deg, var(--blue) 4%, var(--info) 97%), var(--red);box-shadow: 0px 0px 10px var(--gray-dark);">
            <h3 style="color: var(--light);font-size: 100%;" >Nhập điểm</h3>
        </div>
    </div>
    <div class="col d-flex justify-content-center align-items-center">
        <div class="d-flex justify-content-center align-items-center btn-sua-diem" style="width: 50%;background: linear-gradient(66deg, var(--pink), var(--danger)), var(--info);color: var(--pink);height: 200px;box-shadow: 0px 0px 10px 0px #465765;">
            <h3 style="color: var(--light);font-size: 100%;">Sửa điểm</h3>
        </div>
    </div>
  </div>`
}
components.mainContentNhapDiem = (text)=>{
  return `
  <div style="padding: 30px;">
  <div style="margin: 15px 0px;">
      <h5 style="color: var(--pink);">Nhập điểm danh sách sinh viên lớp:&nbsp;<span style="color: var(--gray-dark);">${text}</span></h5>
  </div>
  <div class="table-responsive">
      <table class="table table-hover">
          <thead class="thead-dark">
              <tr>
                  <th>STT</th>
                  <th>Mã sinh viên</th>
                  <th>Họ tên sinh viên</th>
                  <th>Ngày sinh</th>
                  <th>Khóa</th>
                  <th>Nhập điểm</th>
              </tr>
          </thead>
          <tbody class="list-danhsachsinhvienlop">
              <tr>
              <tr>
              <td colspan="6">không có bản ghi nào</td>
               </tr>
              </tr>
          </tbody>
      </table>
  </div>
</div>`
}
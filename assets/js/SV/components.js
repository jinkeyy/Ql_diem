let components = {

}
components.logined = (userSv,tenSv)=>{
    return `
    <div class="container"><a class="navbar-brand" href="#" style="color: var(--light);  font-size: 1vw !important;">Hệ Thống Quản Lý
    Điểm Dành Cho Sinh Viên</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span
      class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
  <div class="collapse navbar-collapse" id="navcol-1">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item"></li>
      <li class="nav-item"></li>
    </ul>
    <div class="dropdown"><a class="dropdown-toggle" aria-expanded="false" data-toggle="dropdown" href="#"
        style="color: var(--light);">${tenSv}( ${userSv})</a>
      <div class="dropdown-menu"><a class="dropdown-item" href="#">Thông Tin Tài Khoản</a><a class="dropdown-item btn-logout"
          href="#">Đăng Xuất</a></div>
    </div>
  </div>
</div>`
}
components.notLogined = ()=>{
    return `
    <div class="container"><a class="navbar-brand" href="#" style="color: var(--light); font-size: 1vw !important;">Hệ Thống Quản Lý
    Điểm Dành Cho Sinh Viên</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span
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
    return `
    <div class="col-xl-2" style="border-right: 3px solid var(--gray);padding: 0px;">
    <div>
      <ul class="list-unstyled" style="padding: 3px;">
        <li class="d-flex justify-content-center align-items-center item item-active "
          style="color: var(--gray-dark);background: rgb(255,255,255);height: 40px;"><strong>Trang Chủ</strong></li>
        <li class="d-flex justify-content-center align-items-center item "
          style="color: var(--gray-dark);background: rgb(255,255,255);height: 40px;"><strong>Tra Cứu Điểm</strong>
        </li>
      </ul>
    </div>
  </div>
  <div class="col main-content" style="padding: 0px;">
  </div>`
}
components.mainContentDiem = (userSv,tenSv)=>{
  return`
  <div>
  <div class="row" style="margin: 0px;padding: 40px;">
    <div class="col">
      <div>
        <h6 style="color: var(--pink);height: 65px;margin: 10px 0px;">Mã sinh viên:&nbsp;<span
            style="color: rgb(0,0,0);">${userSv}</span></h6>
      </div>
      <div>
        <h6 style="color: var(--pink);">Họ Tên:&nbsp;<span style="color: rgb(0,0,0);">${tenSv}</span></h6>
      </div>
    </div>
    <div class="col" style="padding: 0px;">
      <div style="margin: 10px 0px;">
        <h6 style="color: var(--pink);">Chọn học kỳ:</h6><select class="form-control" name="select-hocky">
            <option value="12" selected="">Học Kỳ 2 2020-2021</option>
            <option value="13">This is item 2</option>
            <option value="14">This is item 3</option>
        </select>
      </div>
      <div></div>
    </div>
  </div>
</div>
<div>
  <div style="padding: 30px;">
    <div style="margin: 15px 0px;">
        <h5 style="color: var(--pink);">BẢNG ĐIỂM TRUNG BÌNH HỌC TẬP NĂM HỌC, HỌC KỲ, TOÀN KHÓA</h5>
    </div>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead class="thead-dark ">
                <tr >
                    <th>Học Kỳ</th>
                    <th>Tổng Số Tín Chỉ</th>
                    <th>Điểm Trung Bình</th>
                    <th>Điểm Trung Bình Hệ Số 4</th>
                </tr>
            </thead>
            <tbody class="list-tongdiem">
                <tr>
                  <td colspan="4">không có bản ghi nào</td>
                </tr>
                <tr>
                  <td>Toàn Khóa</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
  <div style="padding: 30px;">
  <div style="margin: 15px 0px;">
      <h5 style="color: var(--pink);">BẢNG ĐIỂM CHI TIẾT</h5>
  </div>
  <div class="table-responsive">
      <table class="table table-hover">
          <thead class="thead-dark">
              <tr>
                  <th>STT</th>
                  <th>Học Kỳ</th>
                  <th>Mã Môn Học</th>
                  <th>Tên Mồn Học</th>
                  <th>Điểm Chuyên Cần</th>
                  <th>Điểm Giữa Kỳ</th>
                  <th>Điểm Cuối Kỳ</th>
                  <th>Điểm Trung Bình</th>
                  <th>Đánh Giá</th>
              </tr>
          </thead>
          <tbody class="list-diem-by-sinhvien">
          <tr>
            <td colspan="9">Không có bản ghi nào</td>
         </tr>
          </tbody>
      </table>
  </div>
</div>
</div>
  `
}
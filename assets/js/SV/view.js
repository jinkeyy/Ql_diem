let view = {}
view.setScreen = (className,component)=>{
    document.querySelector("."+className).innerHTML = component
}
view.logined =()=>{
    const userSv = localStorage.getItem('userSv');
    const tenSv = localStorage.getItem('tenSv');
    view.setScreen("header",components.logined(userSv,tenSv))
    view.setScreen("main",components.mainLogined())


    let listItem = document.getElementsByClassName("item")
    resetItem = ()=>{
        for(let item of listItem){
            item.classList.remove("item-active")
        }
    }
    for(let item of listItem){
        item.addEventListener("click",()=>{
            resetItem()
            item.classList.add("item-active")
            switch(item.firstChild.textContent) {
                case "Trang Chủ":
                    console.log(item.firstChild.textContent)
                    view.onloadSV()
                    break;
                case "Tra Cứu Điểm":
                    console.log(item.firstChild.textContent)
                    view.setScreen("main-content",components.mainContentDiem(userSv,tenSv))
                    controller.loadDiem(userSv)
                    break;
                default:
                    alert("Lỗi")
            }
        })
    }


    document.querySelector(".btn-logout").addEventListener("click",()=>{
        localStorage.removeItem('userSv');
        localStorage.removeItem('tenSV');
        view.onloadSV()
    })
}
view.notLogged = ()=>{
    view.setScreen("header",components.notLogined())
    view.setScreen("main",components.mainNotLogined())
}
view.onloadSV = ()=>{
    if(localStorage.getItem('userSv')){
        view.logined()
    }else{
        view.notLogged()
    }
}
view.login = ()=>{
    const user = {
        userSv:document.getElementsByName("maSv")[0].value,
        matKhauSv:document.getElementsByName("matKhauSv")[0].value,
    }
    $.ajax({
        type: "POST",
        url: 'http://localhost/Ql_diem/assets/model/dangNhapSv.php',
        data: user,
        success: (data) => {

            const list=JSON.parse(data);
            if(list[0].notification){
                alert("Tài khoản mật khẩu sai")
                document.getElementsByName("matKhauSv")[0].value= ""
            }else{
                $('#form-login').modal('hide');
                localStorage.setItem('userSv',list[0].idSinhVien)
                localStorage.setItem('tenSv',list[0].tenSinhVien)
                localStorage.setItem('khoa',list[0].khoa.split("k")[1])
                view.onloadSV()
            }
        }
    });
}
window.onload = ()=>{
    view.onloadSV()

    /////////// nút đăng nhập
    document.querySelector(".btn-login").addEventListener("click",(e)=>{
        e.preventDefault()
        view.login()
    })

    /// nút đăng xuất

}
let view = {}
    view.setScreen = (className,component)=>{
        document.querySelector("."+className).innerHTML = component
    }

    view.Login = ()=>{
        document.querySelector(".btn-login").addEventListener("click",(e)=>{
            e.preventDefault()
            const user = document.getElementsByName("user")[0].value
            const password = document.getElementsByName("password")[0].value
            if(password=="1" && user=="admin"){
                localStorage.setItem('user',user)
                view.logined()
                $('#form-login').modal('hide')
            }else{
                alert("Tài Khoản Hoặc Mật Khẩu Sai!!!")
                document.getElementsByName("password")[0].value = ""
            }
        })
    }
    view.Logout = ()=>{
        document.querySelector(".btn-logout").addEventListener("click",()=>{
            localStorage.removeItem('user');
            view.onloadQT()
        })
    }
    view.logined = ()=>{
        console.log("đã đăng nhập")
        const user = localStorage.getItem('user');
        view.setScreen("header",components.logined(user))
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
                switch(item.getAttribute("get")) {
                    case "1":
                        view.onloadQT()
                        break;
                    case "2":
                        view.setScreen("main-content",components.mainContentSv())
                        controller.getSv()

                        break;
                    case "3":
                        view.setScreen("main-content",components.mainContentMh())
                        controller.getMh()
                        break; 
                    case '4':
                        view.setScreen("main-content",components.mainContentLop())
                        controller.getLop()

                        break;
                    case '5':
                        view.setScreen("main-content",components.mainContentDiem())
                        document.querySelector(".btn-nhap-diem").addEventListener("click",()=>{
                            controller.loadNhapDiem()

                        })
                        document.querySelector(".btn-sua-diem").addEventListener("click",()=>{
                            controller.loadSuaDiem()
                        })
                        break;
                    case '6':
                        view.setScreen("main-content",components.mainContentThongKe())
                        document.querySelector(".btn-thongkehocbong").addEventListener("click",()=>{
                            controller.loadHocBong()

                        })
                        document.querySelector(".btn-thongkenomon").addEventListener("click",()=>{
                            controller.loadNoMon()
                        })

                        break;
                    case '7':
                        controller.inBangDiem()
                        break;
                    default:
                        alert("Lỗi")
                }
            })
        }
        view.Logout()
    }
    view.notLogged = ()=>{
        console.log("chưa đăng nhập")
        view.setScreen("header",components.notLogined())
        view.setScreen("main",components.mainNotLogined())
        view.Login()
    }
    view.onloadQT = ()=>{
        if(localStorage.getItem('user')){
            view.logined()
        }else{
            view.notLogged()
        }
    }
window.onload =()=>{
    
    view.onloadQT()
    document.querySelector(".btn-tao-sv").addEventListener("click",()=>{
        controller.addSv()
    })
    document.querySelector(".btn-tao-mh").addEventListener("click",()=>{
        console.log("tạo")
        controller.addMh()
    })
    document.querySelector(".btn-tao-lop").addEventListener("click",()=>{
        controller.addLop()
    })
}

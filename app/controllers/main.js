var service = new Services();
var validation = new Valid();

// var user = new User(id, account, password, name, email, language, staff);

// Get ID
function getID(id) {
    return document.getElementById(id);
}

// Lấy dữ liệu từ file json 
function getData() {
    service
        .getDataApi()
        .then(function (result) {
            // Xuất dữ liệu từ API hiển thị lên màn hình 
            renderListUser(result.data);
            // console.log(result.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Call function to get Data from API
getData()


// Display user's info on web page
function renderListUser(data) {
    var content = "";

    data.forEach(function (user, index) {
        content += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editUser(${user.id})">Sửa</button>
                <button class="btn btn-danger" onclick="deleteUser(${user.id})">Xoá</button>
            </td> 
        </tr>
        `;
    });

    getID("tblDanhSachNguoiDung").innerHTML = content;
}



// Get value from input
function getInfoUser(isAdd) {
    var taiKhoan = getID("TaiKhoan").value;
    var matKhau = getID("MatKhau").value;
    var hoTen = getID("HoTen").value;
    var email = getID("Email").value;
    var loaiND = getID("loaiNguoiDung").value;
    var ngonNgu = getID("loaiNgonNgu").value;
    var moTa = getID("MoTa").value;
    var hinhAnh = getID("HinhAnh").value;

    //flag (cờ) - isValid la true hợp lệ / false: k hợp lệ
    var isValid = true;


    // Check validation
    // Account
    if (isAdd) {
        isValid &= 
            validation.kiemTraRong(taiKhoan, "tbAccount", " (*) Vui lòng nhập tài khoản" ) 
            // && 
            // validation.kiemTraTonTai(
            //     taiKhoan,
            //     "tbAccount",
            //     "(*) Tên tài khoản đã tồn tại",
            //     service.getDataApi()
            // )
    }


    // Password
    isValid &=
        validation.kiemTraRong(matKhau, "tbPass", "(*) Vui lòng nhập mật khẩu") &&
        validation.kiemTraDoDaiKiTu(matKhau, "tbPass", 6, 8, "(*) Vui lòng nhập từ 6 - 8 ký tự") && 
        validation.kiemTraMatKhau(matKhau, "tbPass", "Mật khẩu chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt")


    // Name
    isValid &=
        validation.kiemTraRong(hoTen, "tbName", "(*) Vui lòng nhập họ tên") &&
        validation.kiemChuoiKyTu(hoTen, "tbName", "(*) Vui lòng nhập chuỗi ký tự");

    
    // Email
    isValid &=
        validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập email") &&
        validation.kiemTraEmail(email, "tbEmail", "(*) Vui lòng nhập đúng form abc@gmail.com")


    // Type of user
    isValid &= validation.kiemTraOption(
        "loaiNguoiDung",
        "tbUser",
        "(*) Vui lòng chọn đúng người dùng",
    )


    // Language
    isValid &= validation.kiemTraOption(
        "loaiNgonNgu",
        "tbLang",
        "(*) Vui lòng chọn đúng ngôn ngữ",
    )


    // Description
    isValid &= 
        validation.kiemTraRong(moTa, "tbDesc", "(*) Vui lòng nhập mô tả") 
        // &&
        // validation.kiemTraDoDaiText(
        //     moTa,
        //     "tbDesc",
        //     "(*) Nhập tối đa 60 ký tự",
        //     60
        // )



    // Check isValid
    if (!isValid) return;

    var user = new User (
        taiKhoan,
        hoTen,
        matKhau,
        email,
        loaiND,
        ngonNgu,
        moTa,
        hinhAnh,
    )

    return user;
}



// Add button "ADD"
getID("btnThemNguoiDung").onclick = function () {
    // Change title add user
    document.getElementsByClassName("modal-title")[0].innerHTML = "ADD USER";

    // Adding button "ADD"
    var footer = `<button class="btn btn-success" onclick="addUser()">ADD</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
}


// Add user
function addUser() {
    var user = getInfoUser(true);

    
    if (user) {
        // var user = new User("", taiKhoan, matKhau, hoTen, email, ngonNgu, loaiND);
    
        service
            .addUserApi(user)
            .then(function () {
                getData();
                document.getElementsByClassName("close")[0].click();
            })
            .catch(function (error) {
                console.log(error)
            })
    }
}


// Delete user
function deleteUser(id) {
    service
        .deleteUserApi(id)
        .then(function (result) {
            getData();
        })
        .catch(function (error) {
            console.log(error);
        })
}



// Edit user
function editUser(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "EDIT USER";

    var footer = `<button class="btn btn-success" onclick="updateUser(${id})">UPDATE</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

    service
        .getUserById(id)
        .then(function (result) {
            getID("TaiKhoan").value = result.data.taiKhoan;
            getID("MatKhau").value = result.data.matKhau;
            getID("HoTen").value = result.data.hoTen;
            getID("Email").value = result.data.email;
            getID("loaiNgonNgu").value = result.data.ngonNgu;
            getID("loaiNguoiDung").value = result.data.loaiND;
        })
        .catch(function (error) {
            console.log(error);
        })
}



// Update user

function updateUser(id) {
    var taiKhoan = getID("TaiKhoan").value;
    var matKhau = getID("MatKhau").value;
    var hoTen = getID("HoTen").value;
    var email = getID("Email").value;
    var loaiND = getID("loaiNguoiDung").value;
    var ngonNgu = getID("loaiNgonNgu").value;


    var user = new User(id, taiKhoan, matKhau, hoTen, email, ngonNgu, loaiND);

    service
        .updateUserApi(user)
        .then(function () {
            getData();
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            console.log(error);
        })
}





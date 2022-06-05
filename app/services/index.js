function Services() {
    // hiện danh sách, thêm, xóa, cập nhật người dùng
    // Get data fromapi
    this.getDataApi = function () {
        return axios({
            url: "https://6290babf27f4ba1c65c05bfd.mockapi.io/ManageUser",
            method: "GET",
        })
    }


    // Add user
    this.addUserApi = function (user) {
        return axios ({
            url: "https://6290babf27f4ba1c65c05bfd.mockapi.io/ManageUser",
            method: "POST",
            data: user,
        })
    }

    // Edit user
    this.editUserApi = function (user) {
        return axios ({
            url: `https://6290babf27f4ba1c65c05bfd.mockapi.io/ManageUser/${id}`,
            method: "POST",
            data: user
        })
    }

    // Get data user api by id
    this.getUserById = function (id) {
        return axios({
            url: `https://6290babf27f4ba1c65c05bfd.mockapi.io/ManageUser/${id}`,
            method: "GET"
        })
    }

    // Update user
    this.updateUserApi = function (user) {
        return axios ({
            url: `https://6290babf27f4ba1c65c05bfd.mockapi.io/ManageUser/${user.id}`,
            method: "PUT",
            data: user,
        })
    }

    // Delete user
    this.deleteUserApi = function (id) {
        return axios({
            url: `https://6290babf27f4ba1c65c05bfd.mockapi.io/ManageUser/${id}`,
            method: "DELETE",
        })
    }
}
function Services() {
    
    this.getDataApi = function () {
        /*
            Promise
                -   Thời gian chờ (Pendding)
                -   Thành công (Resolve)
                -   Không thành công (Reject)
        */
        return axios({
            url: "https://6290babf27f4ba1c65c05bfd.mockapi.io/ManageUser",
            method: "GET",
        });

        // return promise
        
    };
}
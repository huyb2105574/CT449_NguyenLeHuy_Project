import createApiClient from "./apifile.service";

class BookService {
    constructor(baseUrl = "/api/book") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        try {
            const response = await this.api.post("/", data);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu tạo sách:", error.response || error);
            throw error; 
        }
    }

    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new BookService();

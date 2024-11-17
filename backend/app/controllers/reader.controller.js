const ReaderService = require("../services/reader.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Tên người đọc không được để trống"));
    }
    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.error("Error creating reader:", error);  
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo người đọc")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const readerService = new ReaderService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await readerService.findByName(name);
        } else {
            documents = await readerService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi lấy danh sách người đọc")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy người đọc"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi khi truy xuất người đọc với id=${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu để cập nhật không được để trống"));
    }

    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy người đọc"));
        }
        return res.send({ message: "Cập nhật người đọc thành công" });
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi khi cập nhật người đọc với id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy người đọc"));
        }
        return res.send({ message: "Xóa người đọc thành công" });
    } catch (error) {
        return next(
            new ApiError(500, `Không thể xóa người đọc với id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const deleteCount = await readerService.deleteAll();
        return res.send({ message: `${deleteCount} người đọc đã được xóa thành công` });
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả người đọc")
        );
    }
};
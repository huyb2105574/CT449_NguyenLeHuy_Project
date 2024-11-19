const EmployeeService = require("../services/employee.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.create = async (req, res, next) => {
    if (!req.body?.name || !req.body?.username || !req.body?.password) {
        return next(new ApiError(400, "Tên, tên đăng nhập, và mật khẩu không được để trống"));
    }

    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const existingEmployee = await employeeService.findByUsername(req.body.username);
        if (existingEmployee) {
            return next(new ApiError(400, "Tên đăng nhập đã tồn tại"));
        }
        
        req.body.password = await bcrypt.hash(req.body.password, 10);

        const document = await employeeService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi tạo nhân viên"));
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await employeeService.findByName(name);
        } else {
            documents = await employeeService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi lấy danh sách nhân viên")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy nhân viên"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi khi truy xuất nhân viên với id=${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu để cập nhật không được để trống"));
    }

    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy nhân viên"));
        }
        return res.send({ message: "Cập nhật nhân viên thành công" });
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi khi cập nhật nhân viên với id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy nhân viên"));
        }
        return res.send({ message: "Xóa nhân viên thành công" });
    } catch (error) {
        return next(
            new ApiError(500, `Không thể xóa nhân viên với id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const deleteCount = await employeeService.deleteAll();
        return res.send({ message: `${deleteCount} nhân viên đã được xóa thành công` });
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả nhân viên")
        );
    }
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new ApiError(400, "Tên đăng nhập và mật khẩu không được để trống"));
    }

    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const employee = await employeeService.findByUsername(username);

        if (!employee) {
            return next(new ApiError(401, "Tài khoản không tồn tại"));
        }

        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            return next(new ApiError(401, "Mật khẩu không đúng"));
        }

        const token = jwt.sign(
            { id: employee._id, username: employee.username },
            "secret_key", 
            { expiresIn: "1h" }
        );

        res.send({ token, employee: { id: employee._id, name: employee.name, position: employee.position } });
    } catch (error) {
        return next(new ApiError(500, "Lỗi khi đăng nhập"));
    }
};


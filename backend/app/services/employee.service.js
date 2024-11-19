const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

class EmployeeService {
    constructor(client) {
        this.Employee = client.db().collection("employee");
    }

    extractEmployeeData(payload) {
        const employee = {
            name: payload.name,
            username: payload.username,
            password: payload.password,
            position: payload.position,
            address: payload.address,
            phone_number: payload.phone_number,
        };
        Object.keys(employee).forEach(
            (key) => employee[key] === undefined && delete employee[key]
        );
        return employee;
    }

    async create(payload) {
        const employee = this.extractEmployeeData(payload);
        const result = await this.Employee.insertOne(employee);
        return result;
    }

    async find(filter) {
        const cursor = await this.Employee.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Employee.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findByUsername(username) {
        return await this.Employee.findOne({ username });
    }



    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const existingEmployee = await this.Employee.findOne(filter);
        if (!existingEmployee) {
            throw new Error("Employee not found");
        }

        if (payload.password && payload.password !== existingEmployee.password) {
            payload.password = await bcrypt.hash(payload.password, 10);
        } else {
        
            payload.password = existingEmployee.password;
        }

        const update = this.extractEmployeeData(payload);

        const result = await this.Employee.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result;
    }


    async delete(id) {
        const result = await this.Employee.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Employee.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = EmployeeService;

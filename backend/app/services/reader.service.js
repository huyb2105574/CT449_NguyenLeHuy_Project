const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

class ReaderService {
    constructor(client) {
        this.Reader = client.db().collection("reader");
    }

    extractReaderData(payload) {
        const reader = {
            name: payload.name,
            username: payload.username,
            password: payload.password,
            birth: payload.birth,
            sex: payload.sex,
            address: payload.address,
            phone_number: payload.phone_number,
        };
        Object.keys(reader).forEach(
            (key) => reader[key] === undefined && delete reader[key]
        );
        return reader;
    }

    async create(payload) {
        const reader = this.extractReaderData(payload);
        const result = await this.Reader.insertOne(reader);
        return result;
    }

    async find(filter) {
        const cursor = await this.Reader.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findByUsername(username) {
        return await this.Reader.findOne({ username });
    }

    async findById(id) {
        return await this.Reader.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

 

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const existingReader = await this.Reader.findOne(filter);
        if (!existingReader) {
            throw new Error("Reader not found");
        }

        if (payload.password && payload.password !== existingReader.password) {
    
            payload.password = await bcrypt.hash(payload.password, 10);
        } else {
            payload.password = existingReader.password;
        }

        const update = this.extractReaderData(payload);

        const result = await this.Reader.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result;
    }


    async delete(id) {
        const result = await this.Reader.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Reader.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = ReaderService;

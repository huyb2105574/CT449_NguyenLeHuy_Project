const { ObjectId } = require("mongodb");

class BookBorrowingTrackingService {
    constructor(client) {
        this.BookBorrowingTracking = client.db().collection("bookborrowingtracking");
    }

    extractBookBorrowingTrackingData(payload) {
        const record = {
            book_id: payload.book_id,
            employee_id: payload.employee_id,
            reader_id: payload.reader_id,
            borrow_date: payload.borrow_date,
            return_date: payload.return_date,
        };
        Object.keys(record).forEach(
            (key) => record[key] === undefined && delete record[key]
        );
        return record;
    }

    async create(payload) {
        const record = this.extractBookBorrowingTrackingData(payload);
        const result = await this.BookBorrowingTracking.insertOne(record);
        return result;
    }

    async find(filter) {
        const cursor = await this.BookBorrowingTracking.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.BookBorrowingTracking.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractBookBorrowingTrackingData(payload);
        const result = await this.BookBorrowingTracking.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.BookBorrowingTracking.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.BookBorrowingTracking.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = BookBorrowingTrackingService;

const { ObjectId } = require("mongodb");
const multer = require("multer");
const path = require("path");

class BookService {
    constructor(client) {
        this.Book = client.db().collection("book");
    }

    static imageStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./uploads/books");
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    });

    static uploadImage = multer({ storage: BookService.imageStorage });

    extractBookData(payload, image_url) {
        const book = {
            title: payload.title,
            price: payload.price,
            quantity: payload.quantity,
            publish_year: payload.publish_year,
            publisher_id: payload.publisher_id,
            author: payload.author,
            image: image_url,
        };
        Object.keys(book).forEach(
            (key) => book[key] === undefined && delete book[key]
        );
        return book;
    }

    async create(payload, image_url) {
        const book = this.extractBookData(payload, image_url);
        const result = await this.Book.insertOne(book);
        return result;
    }

    async find(filter) {
        const cursor = await this.Book.find(filter);
        return await cursor.toArray();
    }

    async findByName(title) {
        return await this.find({
            title: { $regex: new RegExp(title), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Book.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractBookData(payload);
        const result = await this.Book.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Book.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = { 
    BookService,  
    uploadImage: BookService.uploadImage  
};

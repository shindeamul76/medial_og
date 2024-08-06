"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
mongoose_1.default.connect("mongodb+srv://Amul:AbS$7625@nodeexpressproject.wzpj8q2.mongodb.net/newSearch?retryWrites=true&w=majority&appName=NodeExpressProject");
const ItemSchema = new mongoose_1.default.Schema({
    name: {
        type: String, require: true,
    },
    description: {
        type: String,
    }
});
const Item = mongoose_1.default.model('Item', ItemSchema);
app.get('/', (_req, res) => {
    res.status(200).json({ message: "Hello Bluetoon" });
});
const Items = [
    { name: "product1", description: "product buy one" },
    { name: "product2", description: "product buy two" },
    { name: "product3", description: "product buy three" },
    { name: "product4", description: "product buy four" },
    { name: "product5", description: "product buy five" },
];
app.post('/product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const newProduct = yield Item.insertMany(Items);
        res.status(201).json({ data: newProduct });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
app.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, searchField, page = 1, limit = 2 } = req.query;
    if (!query) {
        return res.status(400).json({ message: 'query parameter is requrire' });
    }
    if (typeof query !== 'string') {
        return res.status(400).json({ message: 'query parameter must be s' });
    }
    let searchConditions = [];
    try {
        const regex = new RegExp(query, 'i');
        if (!searchField) {
            searchConditions = [
                { name: { $regex: regex } },
                { description: { $regex: regex } },
            ];
        }
        else {
            const fields = searchField.split(',');
            fields.forEach((field) => {
                switch (field.trim()) {
                    case 'name':
                        searchConditions.push({ name: { $regex: regex } });
                        break;
                    case 'description':
                        searchConditions.push({ description: { $regex: regex } });
                        break;
                    default:
                        break;
                }
            });
        }
        const skip = (Number(page) - 1) * (Number(limit));
        const result = yield Item.find({
            $or: searchConditions.length > 0 ? searchConditions : [{ name: '', description: '' }]
        })
            .skip(skip)
            .limit(Number(limit));
        res.status(200).json({ message: result });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
app.get("/go", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "Welcome to the NodeJs, Nice to meet you golang" });
}));
app.post("/post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body || {
        "name": "Amul",
        "age": 23
    };
    res.status(200).json({ data: body });
}));
app.get("/psotForm", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(JSON.stringify(req.body));
}));
app.listen(3000, () => console.log(`server is running on port 3000`));

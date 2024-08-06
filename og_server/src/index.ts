import express, { Request, Response } from 'express'
import mongoose from 'mongoose'; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://Amul:AbS$7625@nodeexpressproject.wzpj8q2.mongodb.net/newSearch?retryWrites=true&w=majority&appName=NodeExpressProject");

const ItemSchema = new mongoose.Schema({
    name: {
        type: String, require: true,
    },
    description: {
        type: String, 
    }
})

const Item = mongoose.model('Item', ItemSchema);

app.get('/', (_req: Request, res: Response) =>{
    res.status(200).json({message: "Hello Bluetoon"})
})

const Items = [
    {name: "product1", description: "product buy one"},
    {name: "product2", description: "product buy two"},
    {name: "product3", description: "product buy three"},
    {name: "product4", description: "product buy four"},
    {name: "product5", description: "product buy five"},
]

app.post('/product', async (req: Request, res: Response) => {
   try {
    const data = req.body;
    const newProduct = await Item.insertMany(Items);
    res.status(201).json({data: newProduct});
   } catch (error: any) {
    res.status(500).json({message: error.message})
   }
});

app.get('/search', async ( req: Request, res: Response) => {
    const { query, searchField, page=1, limit=2 } = req.query;

    if (!query ) {
        return res.status(400).json({message:'query parameter is requrire'});
    }

    if ( typeof query !== 'string') {
        return res.status(400).json({message:'query parameter must be s'});
    }
    
    let searchConditions: any[] = [];

    try {
        const regex = new RegExp(query, 'i');

        if(!searchField) {
            searchConditions = [
                {name: { $regex: regex } },
                {description: { $regex: regex } },
            ]
        }else {

            const fields = ( searchField as string).split(',');

            fields.forEach((field) => {
                switch (field.trim()) {
                    case 'name':
                        searchConditions.push({name: {$regex: regex }});
                        break;
                    case 'description':
                        searchConditions.push({description: {$regex: regex }});
                        break;
                    default:
                        break;
                }
        })
        }

        const skip = (Number(page) - 1) * (Number(limit));

       const result = await Item.find({
        $or: searchConditions.length > 0 ? searchConditions : [{name: '', description: ''}]
       })
       .skip(skip)
       .limit(Number(limit));

        res.status(200).json({message: result});

    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
})

app.get("/go", async (req: Request, res: Response) => {
    res.status(200).json({message: "Welcome to the NodeJs, Nice to meet you golang"})
})
app.post("/post", async (req: Request, res: Response) => {
    const body = req.body || {
        "name":"Amul",
        "age": 23
    }

    res.status(200).json({data: body})
})
app.get("/psotForm", async (req: Request, res: Response) => {
    res.status(200).json(JSON.stringify(req.body))
})



app.listen(3000, () => console.log(`server is running on port 3000`));


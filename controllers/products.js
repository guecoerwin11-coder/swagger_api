const Product = require('../models/products')

const getProducts = async (req, res) => {
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page - 1 ) * limit;
        const search = req.query.search || '';
        const catetgory = req.query.catetgory || '';

        const filter = {};
        if(search) filter.name = {$regex: search, $options: 'i'};
        if(category) filter.category = category;

        const [products, total] = await Promis.all([
            Product.find(filter).skip(skip).limit(limit).sort({ createdAt: -1}),
            Product.countDocuments(filter)
        ])

        res.status(200).json({
            data: products,
            pagination: {
                page, limit, total, totalPage: Math.ceil(total/limit)
            }
        })

    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const getProduct = async (req, res)=> {
    try{
        const Product = await Product.findById( req.params.id );
        if(!product){
            return res.status(404).json({ message: 'product not found'})
        }

        res.status(200).json(product)

    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const addProduct = async (req, res) => {
    try{
        const product = await Product.create(req.body)

        res.status(201).json({message: 'product is added'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const updateProduct = async (req, res) => {
    try{

        const Product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if(!product){
            return res.status(404).json({message: 'product is not found'})
        }

        res.status(200).json({message: 'product updated successful'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const deleteProduct = async (req, res) => {
    try{

        const product = await Product.findByIdAndDelete(req.params.id)

        if(!product){
            return res.status(404).json({message: 'product not found'})
        }

        res.status(200).json({message: 'message deleted'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    getProducts, getProduct, addProduct, updateProduct, deleteProduct
}

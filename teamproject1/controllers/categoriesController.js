const categoriesService = require('../services/categoriesService');

const getCategoryListByType = async (req, res) => {
    const { typeId } = req.params;
    const query = req.query;
    const products = await categoriesService.searchByType(typeId, query);
    return res.status(200).json({ products: products });
}

const getCategoryListByColor = async (req, res) => {
    const { colorId } = req.params;
    const query = req.query;
    const products = await categoriesService.searchByColor(colorId, query);
    return res.status(200).json({ products: products });
}

module.exports = {
    getCategoryListByType,
    getCategoryListByColor
}
import { prisma } from "../config/client"

const uploadProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

export {
    uploadProducts
}
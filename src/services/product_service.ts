import { prisma } from "../config/client"

const uploadProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

const getProductById = async (id: number) => {
    return await prisma.product.findUnique({
        where: { id }
    })
}

const UpdateProductByID = async (
    id: string,
    name: string,
    brand: string,
    quantity: number,
    condition: string,
    price: number,
    shortDesc: string,
    detailDesc: string,
    image?: string
) => {
    const data: any = {
        name,
        brand,
        quantity: +quantity,
        condition,
        price: +price,
        shortDesc,
        detailDesc
    };

    if (image) {
        data.image = image;
    }

    return prisma.product.update({
        where: { id: +id },
        data
    });
};


export {
    uploadProducts, getProductById, UpdateProductByID
}
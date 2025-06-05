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

const addProductToCart = async (quantity: number, productId: number, userId: number) => {
    let cart = await prisma.cart.findUnique({
        where: { userId },
        include: { cartDetails: true },
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: {
                userId,
                sum: 0,
                totalQuantity: 0,
            },
            include: { cartDetails: true },
        });
    }

    const existingCartItem = await prisma.cartDetail.findFirst({
        where: {
            cartId: cart.id,
            productId,
        },
    });

    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!product) throw new Error('Product not found');

    const productPrice = Number(product.price);

    if (existingCartItem) {
        await prisma.cartDetail.update({
            where: { id: existingCartItem.id },
            data: {
                quantity: existingCartItem.quantity + quantity,
                price: productPrice,
            },
        });
    } else {
        await prisma.cartDetail.create({
            data: {
                cartId: cart.id,
                productId,
                quantity,
                price: productPrice,
                userId: userId,
            },
        });
    }

    const updatedCartItems = await prisma.cartDetail.findMany({
        where: { cartId: cart.id },
    });

    const newSum = updatedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalQuantity = updatedCartItems.reduce((acc, item) => acc + item.quantity, 0);

    await prisma.cart.update({
        where: { id: cart.id },
        data: {
            sum: newSum,
            totalQuantity: totalQuantity,
        },
    });
};

const updateCartDetailBeforeCheckout = async (data: { id: string; quantity: string }[]) => {
    for (let i = 0; i < data.length; i++) {
        await prisma.cartDetail.update({
            where: {
                id: +(data[i].id)
            },
            data: {
                quantity: +(data[i].quantity)
            }
        })
    }
}

export {
    uploadProducts, getProductById, UpdateProductByID, addProductToCart, updateCartDetailBeforeCheckout
}
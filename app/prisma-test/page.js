import prisma from "@/lib/prisma";
 
export default async function PrismaTest() {
 
    const products =
        await prisma.products.findMany();
 
    return (
        <div className="container mt-5">
 
            <h1>Prisma Test</h1>
 
            {products.map((product) => (
 
                <p key={product.id}>
                    {product.name}
                </p>
 
            ))}
 
        </div>
    );
}


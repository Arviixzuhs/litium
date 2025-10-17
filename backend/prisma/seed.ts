import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Iniciando seeder...')

    // ========================
    // CATEGORÍAS
    // ========================
    const categoriesData = [
        { name: 'Tecnología' },
        { name: 'Hogar' },
        { name: 'Ropa' },
        { name: 'Juguetes' },
        { name: 'Deportes' },
    ]
    await prisma.category.createMany({ data: categoriesData, skipDuplicates: true })
    const allCategories = await prisma.category.findMany()
    console.log(`✅ Categorías cargadas: ${allCategories.length}`)

    // ========================
    // CATÁLOGOS
    // ========================
    const catalogsData = [
        { name: 'Catálogo Principal', description: 'Catálogo general de productos' },
        { name: 'Ofertas', description: 'Productos en descuento' },
        { name: 'Novedades', description: 'Últimos lanzamientos' },
    ]
    await prisma.catalog.createMany({ data: catalogsData, skipDuplicates: true })
    const allCatalogs = await prisma.catalog.findMany()
    console.log(`✅ Catálogos cargados: ${allCatalogs.length}`)

    // ========================
    // PRODUCTOS
    // ========================
    const productsData = [
        { name: 'Smartphone Galaxy S24', description: 'Teléfono de última generación con cámara avanzada', price: 999.99, stock: 50, show: 'public', image: 'https://via.placeholder.com/400x400?text=Producto' },
        { name: 'Notebook ASUS Zenbook', description: 'Ultrabook liviana con pantalla OLED', price: 1299.99, stock: 25, show: 'public', image: 'https://via.placeholder.com/400x400?text=Producto' },
        { name: 'Zapatillas Nike Air', description: 'Zapatillas cómodas y ligeras para deporte', price: 149.99, stock: 100, show: 'public', image: 'https://via.placeholder.com/400x400?text=Producto' },
        { name: 'Sofá Reclinable', description: 'Sofá de cuero de 3 cuerpos reclinable', price: 899.99, stock: 10, show: 'public', image: 'https://via.placeholder.com/400x400?text=Producto' },
        { name: 'Lego Star Wars', description: 'Set coleccionable con 1500 piezas', price: 199.99, stock: 30, show: 'public', image: 'https://via.placeholder.com/400x400?text=Producto' },
    ]
    await prisma.product.createMany({ data: productsData, skipDuplicates: true })
    const allProducts = await prisma.product.findMany()
    console.log(`✅ Productos cargados: ${allProducts.length}`)

    // ========================
    // PROVEEDORES
    // ========================
    const suppliersData = [
        { name: 'Proveedor Tech', email: 'tech@example.com', phone: '1234567890', address: 'Calle Tecnología 123' },
        { name: 'Proveedor Hogar', email: 'hogar@example.com', phone: '0987654321', address: 'Av. Hogar 456' },
        { name: 'Proveedor Deportes', email: 'deportes@example.com', phone: '1122334455', address: 'Calle Deportes 789' },
    ]
    await prisma.supplier.createMany({ data: suppliersData, skipDuplicates: true })
    const allSuppliers = await prisma.supplier.findMany()
    console.log(`✅ Proveedores cargados: ${allSuppliers.length}`)

    // ========================
    // RELACIONES PRODUCTO–CATEGORÍA
    // ========================
    const relationsPC = [
        { product: 'Smartphone Galaxy S24', category: 'Tecnología' },
        { product: 'Notebook ASUS Zenbook', category: 'Tecnología' },
        { product: 'Zapatillas Nike Air', category: 'Deportes' },
        { product: 'Sofá Reclinable', category: 'Hogar' },
        { product: 'Lego Star Wars', category: 'Juguetes' },
    ]
    for (const rel of relationsPC) {
        const product = allProducts.find(p => p.name === rel.product)
        const category = allCategories.find(c => c.name === rel.category)
        if (product && category) {
            await prisma.product_x_Category.create({ data: { productId: product.id, categoryId: category.id } })
        }
    }
    console.log('✅ Relaciones producto–categoría creadas')

    // ========================
    // RELACIONES PRODUCTO–CATÁLOGO
    // ========================
    const relationsPCL = [
        { product: 'Smartphone Galaxy S24', catalog: 'Catálogo Principal' },
        { product: 'Notebook ASUS Zenbook', catalog: 'Catálogo Principal' },
        { product: 'Notebook ASUS Zenbook', catalog: 'Novedades' },
        { product: 'Zapatillas Nike Air', catalog: 'Ofertas' },
        { product: 'Sofá Reclinable', catalog: 'Catálogo Principal' },
        { product: 'Lego Star Wars', catalog: 'Novedades' },
    ]
    for (const rel of relationsPCL) {
        const product = allProducts.find(p => p.name === rel.product)
        const catalog = allCatalogs.find(c => c.name === rel.catalog)
        if (product && catalog) {
            await prisma.product_x_Catalog.create({ data: { productId: product.id, catalogId: catalog.id } })
        }
    }
    console.log('✅ Relaciones producto–catálogo creadas')

    // ========================
    // RELACIONES PRODUCTO–PROVEEDOR
    // ========================
    const productSupplierRelations = [
        { product: 'Smartphone Galaxy S24', supplier: 'Proveedor Tech' },
        { product: 'Notebook ASUS Zenbook', supplier: 'Proveedor Tech' },
        { product: 'Zapatillas Nike Air', supplier: 'Proveedor Deportes' },
        { product: 'Sofá Reclinable', supplier: 'Proveedor Hogar' },
        { product: 'Lego Star Wars', supplier: 'Proveedor Hogar' },
    ]
    for (const rel of productSupplierRelations) {
        const product = allProducts.find(p => p.name === rel.product)
        const supplier = allSuppliers.find(s => s.name === rel.supplier)
        if (product && supplier) {
            await prisma.product_x_Supplier.create({ data: { productId: product.id, supplierId: supplier.id } })
        }
    }
    console.log('✅ Relaciones producto–proveedor creadas')

    console.log('🌱 Seed completado con éxito.')
}

main()
    .catch(e => {
        console.error('❌ Error en seed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

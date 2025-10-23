import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { perm } from '../src/common/decorators/permissions.decorator'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seeder...')

  // ========================
  // ROLES Y PERMISOS (ADMIN)
  // ========================
  console.log('📦 Creando rol y permisos de administrador...')

  // 1️⃣ Crear el rol admin (si no existe)
  let adminRole = await prisma.role.findFirst({ where: { name: 'admin' } })
  if (!adminRole) {
    adminRole = await prisma.role.create({ data: { name: 'admin' } })
    console.log('✅ Rol admin creado')
  } else {
    console.log('ℹ️ Rol admin ya existía')
  }

  // 2️⃣ Obtener todos los permisos de perm.advanced (o ajusta según tu estructura)
  const permissions = Object.values(perm.advanced)

  // 3️⃣ Crear los permisos si no existen
  for (const permission of permissions) {
    const existing = await prisma.rolePermission.findFirst({
      where: { roleId: adminRole.id, name: permission },
    })
    if (!existing) {
      await prisma.rolePermission.create({
        data: { roleId: adminRole.id, name: permission },
      })
    }
  }
  console.log(`✅ Permisos cargados para admin: ${permissions.length}`)

  // ========================
  // USUARIO ADMIN
  // ========================
  console.log('👤 Creando usuario admin...')

  const adminEmail = 'owner1@gmail.com'
  const adminPassword = 'owner123*'
  const hashedPassword = await bcrypt.hash(adminPassword, 10)
  let adminUser = await prisma.user.findFirst({ where: { email: adminEmail } })
  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        name: 'Admin',
        lastName: 'Root',
        email: adminEmail,
        password: hashedPassword,
      },
    })
    console.log('✅ Usuario admin creado')
  } else {
    console.log('ℹ️ Usuario admin ya existía')
  }

  // 4️⃣ Asignar el rol admin al usuario si no lo tiene
  const hasRole = await prisma.roleUser.findFirst({
    where: { userId: adminUser.id, roleId: adminRole.id },
  })
  if (!hasRole) {
    await prisma.roleUser.create({
      data: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    })
    console.log('✅ Rol admin asignado al usuario')
  } else {
    console.log('ℹ️ Usuario admin ya tenía el rol asignado')
  }

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
    {
      name: 'Smartphone Galaxy S24',
      description: 'Teléfono de última generación con cámara avanzada',
      price: 999.99,
      stock: 50,
      show: 'public',
      image: 'https://via.placeholder.com/400x400?text=Producto',
    },
    {
      name: 'Notebook ASUS Zenbook',
      description: 'Ultrabook liviana con pantalla OLED',
      price: 1299.99,
      stock: 25,
      show: 'public',
      image: 'https://via.placeholder.com/400x400?text=Producto',
    },
    {
      name: 'Zapatillas Nike Air',
      description: 'Zapatillas cómodas y ligeras para deporte',
      price: 149.99,
      stock: 100,
      show: 'public',
      image: 'https://via.placeholder.com/400x400?text=Producto',
    },
    {
      name: 'Sofá Reclinable',
      description: 'Sofá de cuero de 3 cuerpos reclinable',
      price: 899.99,
      stock: 10,
      show: 'public',
      image: 'https://via.placeholder.com/400x400?text=Producto',
    },
    {
      name: 'Lego Star Wars',
      description: 'Set coleccionable con 1500 piezas',
      price: 199.99,
      stock: 30,
      show: 'public',
      image: 'https://via.placeholder.com/400x400?text=Producto',
    },
  ]
  await prisma.product.createMany({ data: productsData, skipDuplicates: true })
  const allProducts = await prisma.product.findMany()
  console.log(`✅ Productos cargados: ${allProducts.length}`)

  // ========================
  // PROVEEDORES
  // ========================
  const suppliersData = [
    {
      name: 'Proveedor Tech',
      email: 'tech@example.com',
      phone: '1234567890',
      address: 'Calle Tecnología 123',
    },
    {
      name: 'Proveedor Hogar',
      email: 'hogar@example.com',
      phone: '0987654321',
      address: 'Av. Hogar 456',
    },
    {
      name: 'Proveedor Deportes',
      email: 'deportes@example.com',
      phone: '1122334455',
      address: 'Calle Deportes 789',
    },
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
    const product = allProducts.find((p) => p.name === rel.product)
    const category = allCategories.find((c) => c.name === rel.category)
    if (product && category) {
      await prisma.product_x_Category.create({
        data: { productId: product.id, categoryId: category.id },
      })
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
    const product = allProducts.find((p) => p.name === rel.product)
    const catalog = allCatalogs.find((c) => c.name === rel.catalog)
    if (product && catalog) {
      await prisma.product_x_Catalog.create({
        data: { productId: product.id, catalogId: catalog.id },
      })
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
    const product = allProducts.find((p) => p.name === rel.product)
    const supplier = allSuppliers.find((s) => s.name === rel.supplier)
    if (product && supplier) {
      await prisma.product_x_Supplier.create({
        data: { productId: product.id, supplierId: supplier.id },
      })
    }
  }
  console.log('✅ Relaciones producto–proveedor creadas')

  console.log('🌱 Seed completado con éxito.')
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

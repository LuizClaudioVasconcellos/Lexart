import { QueryInterface } from 'sequelize';

export async function seedProducts(queryInterface: QueryInterface) {
  const products = [];

  for (let i = 1; i <= 50; i++) {
    products.push({
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 1000),
      description: `Description ${i}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await queryInterface.bulkInsert('products', products, {});
}

export async function undoSeedProducts(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('products', {}, {});
}

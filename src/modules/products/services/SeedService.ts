// import sequelize from '@shared/http/server';
import sequelize from '../../../shared/http/server';
// import {
//   seedProducts,
//   undoSeedProducts,
// } from '@shared/sequelize/seeds/20240710184730-demo-products';
import {
  seedProducts,
  undoSeedProducts,
} from '../../../shared/sequelize/seeds/20240710184730-demo-products';

export class SeedService {
  async execute(): Promise<void> {
    try {
      await seedProducts(sequelize.getQueryInterface());

      console.log('Database seeded successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
      throw new Error('Error seeding database');
    }
  }

  async undo(): Promise<void> {
    try {
      await undoSeedProducts(sequelize.getQueryInterface());

      console.log('Database seed undone successfully');
    } catch (error) {
      console.error('Error undoing seed database:', error);
      throw new Error('Error undoing seed database');
    }
  }
}

import CategoryFactory from 'factories/category';
import { CategoryModel, Category, CategoryDocument } from 'src/topics';
import databaseSetup from 'test/utils/database';

describe('Category', () => {
  let category: Category;
  databaseSetup();

  it('Creates sucessfuly', async () => {
    const categoryDoc = new CategoryModel(CategoryFactory.build());

    expect(await categoryDoc.save()).toBe(categoryDoc);
  });

  describe('Attributes', () => {
    let doc: CategoryDocument;
    beforeEach(async () => {
      category = CategoryFactory.build();
      doc = await CategoryModel.create(category);
    });

    it('Have name attribute', () => {
      expect(doc).toHaveProperty('name', category.name);
    });

    it('Have backgroundColor', () => {
      expect(doc).toHaveProperty('backgroundColor', category.backgroundColor);
    });
  });

  describe('Validations', () => {
    describe('.name', () => {
      it('Has required field', async () => {
        const doc = new CategoryModel(CategoryFactory.build());
        expect(doc).toHaveRequired('name');
      });
    });

    describe('.backgroundcolor', () => {
      it('Returns hex color value', () => {
        const doc = new CategoryModel(
          CategoryFactory.build({ backgroundColor: 0xf })
        );

        const hexColor = doc.backgroundColor;
        expect(hexColor).toBe('#00000f');
      });

      it('Returns 0x0 when no value is provided', async () => {
        const doc = await CategoryModel.create(
          CategoryFactory.build({ backgroundColor: undefined })
        );

        expect(doc.backgroundColor).toBe('#000000');
      });

      it('be trimmed', async () => {
        const name = ' some category ';
        await expect(
          CategoryModel.create(CategoryFactory.build({ name }))
        ).resolves.toBeTrimmed('name', name);
      });
    });
  });
});

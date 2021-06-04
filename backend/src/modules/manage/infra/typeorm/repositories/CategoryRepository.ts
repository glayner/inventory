import ICreateCategoryDTO from '@modules/manage/dtos/ICreateCategoryDTO';
import ICategoryRepository from '@modules/manage/repositories/ICategoryRepository';
import { getRepository, Repository } from 'typeorm';
import Category from '../entities/Category';

class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async list(): Promise<Category[]> {
    const categories = await this.ormRepository.find();
    return categories;
  }

  public async findByDescription(
    description: string,
  ): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ description });
    return category;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ id });
    return category;
  }

  public async findByIdWithProducts(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    return category;
  }

  public async create({ description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({ description });

    await this.ormRepository.save(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    await this.ormRepository.save(category);
    return category;
  }

  public async delete(category: Category): Promise<void> {
    await this.ormRepository.remove(category);
  }
}
export default CategoryRepository;

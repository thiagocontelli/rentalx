import { parse } from 'csv-parse';
import fs from 'fs';
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

interface IImportCategories {
	name: string;
	description: string;
}

class ImportCategoryUseCase {
	constructor(private categoriesRepository: CategoriesRepository) {}

	loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path);

			const categories: IImportCategories[] = [];

			const parseFile = parse();

			stream.pipe(parseFile);

			parseFile
				.on('data', async line => {
					const [name, description] = line;
					categories.push({
						name,
						description,
					});
				})
				.on('end', () => {
					resolve(categories);
				})
				.on('error', error => {
					reject(error);
				});
		});
	}

	async execute(file: Express.Multer.File): Promise<void> {
		const categories = await this.loadCategories(file);
		console.log(categories);
	}
}

export { ImportCategoryUseCase };

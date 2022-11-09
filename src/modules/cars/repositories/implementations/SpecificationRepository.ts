import { Specification } from '../../model/Specification';
import {
	ICreateSpecificationDTO,
	ISpecificationRepository,
} from '../ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {
	private specifications: Specification[];

	constructor() {
		this.specifications = [];
	}

	create({ description, name }: ICreateSpecificationDTO): void {
		const specification = new Specification();

		Object.assign(specification, {
			name,
			description,
			created_at: new Date().getTime(),
		});

		this.specifications.push(specification);
	}

	list(): Specification[] {
		return this.specifications;
	}

	findByName(name: string): Specification {
		const specification = this.specifications.find(
			specification => specification.name === name
		);
		return specification;
	}
}

export { SpecificationRepository };

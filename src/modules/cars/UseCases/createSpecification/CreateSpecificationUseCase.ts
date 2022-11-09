import { SpecificationRepository } from '../../repositories/implementations/SpecificationRepository';

interface IRequest {
	name: string;
	description: string;
}

class CreateSpecificationUseCase {
	constructor(private specificationRepository: SpecificationRepository) {}

	execute({ description, name }: IRequest) {
		const specificationAlreadyExists =
			this.specificationRepository.findByName(name);

		if (specificationAlreadyExists) {
			throw new Error('Specification already exists!');
		}

		this.specificationRepository.create({
			name,
			description,
		});
	}
}

export { CreateSpecificationUseCase };

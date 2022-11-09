import { Router } from 'express';

import { SpecificationRepository } from '../modules/cars/repositories/implementations/SpecificationRepository';
import { createSpecificationController } from '../modules/cars/UseCases/createSpecification';

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationRepository();

specificationsRoutes.post('/', (request, response) => {
	createSpecificationController.handle(request, response);
});

specificationsRoutes.get('/', (request, response) => {
	const all = specificationsRepository.list();

	response.json(all);
});

export { specificationsRoutes };

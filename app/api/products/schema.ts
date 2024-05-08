import { z } from 'zod';

const schema = z.object({
	name: z.string().min(3).max(40).trim(),
	price: z.number().positive().min(0.01),
});

export default schema;

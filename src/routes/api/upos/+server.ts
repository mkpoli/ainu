import { error, json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// Hugging Face Inference API; the model is served through the router endpoint.
const MODEL_URL =
	'https://router.huggingface.co/hf-inference/models/KoichiYasuoka/deberta-base-ainu-upos';

export const POST: RequestHandler = async ({ request }) => {
	const token = env.HUGGINGFACE_INFERENCE_API_TOKEN;
	if (!token) {
		error(503, 'UPOS tagging is not configured');
	}
	const inputText = await request.text();
	const response = await fetch(MODEL_URL, {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
		body: JSON.stringify({ inputs: inputText })
	});
	if (!response.ok) {
		error(502, `Inference API responded ${response.status}`);
	}
	return json(await response.json());
};

import { json, type RequestHandler } from '@sveltejs/kit';
import { HUGGINGFACE_INFERENCE_API_TOKEN } from '$env/static/private';

async function query(data: string) {
	const response = await fetch(
		'https://api-inference.huggingface.co/models/KoichiYasuoka/deberta-base-ainu-upos',
		{
			headers: { Authorization: `Bearer ${HUGGINGFACE_INFERENCE_API_TOKEN}` },
			method: 'POST',
			body: JSON.stringify({ inputs: data })
		}
	);
	const result = await response.json();
	return result;
}

export const POST: RequestHandler = async ({ request }) => {
	const inputText = await request.text();
	const result = await query(inputText);
	return json(result);
};

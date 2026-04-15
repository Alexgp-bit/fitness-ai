import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    const { data } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({
        result:
          'Falta OPENAI_API_KEY. Añádela en .env.local para activar el análisis real con IA.',
      });
    }

    const prompt = `
Actúa como un entrenador personal prudente y útil. El usuario quiere recomendaciones prácticas en español.

Analiza los últimos registros de salud y entrenamiento que vienen a continuación.

Quiero exactamente estos apartados:
1. Resumen ejecutivo
2. Qué está mejorando
3. Posibles señales de fatiga o mala recuperación
4. Recomendación para mañana
5. Una pregunta útil para seguir analizando

Evita lenguaje médico. Sé claro, breve y accionable.

Datos:
${JSON.stringify(data, null, 2)}
`;

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt,
    });

    return Response.json({ result: response.output_text || 'No se pudo generar el análisis.' });
  } catch {
    return Response.json({ error: 'Error al analizar los datos.' }, { status: 500 });
  }
}

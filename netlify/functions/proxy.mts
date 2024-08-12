import axios from 'axios';

export default async function (req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  if (!req.body) {
    return new Response('Bad Request', { status: 400 });
  }
  const body = await req.body.getReader().read();
  const { sign, language } = JSON.parse(body.toString());

  try {
    const response = await axios.post(
      'http://5.35.90.171:61011/get_horoscope/',
      {
        sign: sign.toLowerCase(),
        language: language,
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response.status || 500,
      body: JSON.stringify({
        message: 'Failed to fetch horoscope',
        error: error.message,
      }),
    };
  }
}

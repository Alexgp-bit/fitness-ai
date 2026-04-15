import { prisma } from '@/lib/prisma';

function isAuthorized(request: Request) {
  const expected = process.env.APP_API_TOKEN;
  if (!expected) return true;
  return request.headers.get('authorization') === `Bearer ${expected}`;
}

function startOfDay(dateLike: string | Date) {
  const date = new Date(dateLike);
  date.setHours(0, 0, 0, 0);
  return date;
}

export async function GET() {
  const data = await prisma.healthRecord.findMany({ orderBy: { date: 'asc' } });
  return Response.json(data);
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const body = await request.json();
  if (!body?.date) {
    return Response.json({ error: 'Falta date.' }, { status: 400 });
  }

  const normalizedDate = startOfDay(body.date);
  const steps = Number(body.steps || 0);
  const workouts = Number(body.workouts || 0);
  const caloriesActive = Number(body.caloriesActive || 0);
  const trainingLoad = Number(body.trainingLoad || workouts * 35 + Math.round(steps / 400));

  const record = await prisma.healthRecord.upsert({
    where: { date: normalizedDate },
    update: {
      steps,
      restingHeartRate: body.restingHeartRate != null ? Number(body.restingHeartRate) : null,
      heartRateAverage: body.heartRateAverage != null ? Number(body.heartRateAverage) : null,
      sleepHours: body.sleepHours != null ? Number(body.sleepHours) : null,
      workouts,
      caloriesActive,
      trainingLoad,
      notes: body.notes ? String(body.notes) : null,
    },
    create: {
      date: normalizedDate,
      steps,
      restingHeartRate: body.restingHeartRate != null ? Number(body.restingHeartRate) : null,
      heartRateAverage: body.heartRateAverage != null ? Number(body.heartRateAverage) : null,
      sleepHours: body.sleepHours != null ? Number(body.sleepHours) : null,
      workouts,
      caloriesActive,
      trainingLoad,
      notes: body.notes ? String(body.notes) : null,
    },
  });

  return Response.json({ ok: true, record });
}

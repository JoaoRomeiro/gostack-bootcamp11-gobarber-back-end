import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointment = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointment.all();

  return response.status(200).json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parseDate = startOfHour(parseISO(date));

  const findAppoitmentSameDate = appointment.findByDate(parseDate);

  if (findAppoitmentSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  appointment.create({ provider, date: parseDate });

  return response.json(appointment);
});

export default appointmentsRouter;

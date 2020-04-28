import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmensRepository from '../repositories/AppointmentsRepository';

interface Request {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  // eslint-disable-next-line class-methods-use-this
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmensRepository = getCustomRepository(AppointmensRepository);

    const appointmentDate = startOfHour(date);

    const findAppoitmentSameDate = await appointmensRepository.findByDate(
      appointmentDate,
    );

    if (findAppoitmentSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmensRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmensRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;

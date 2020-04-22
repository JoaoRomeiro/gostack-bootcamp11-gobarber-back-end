import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmensRepository from '../repositories/AppointmentsRepository';

interface Request {
  date: Date;
  provider: string;
}

/**
 * [x] Recebimento das informações
 * [ ] Tratativa de erros e excessões
 * [ ] Acesso ao repositório
 */

class CreateAppointmentService {
  private appointmensRepository: AppointmensRepository;

  public constructor(appointmensRepository: AppointmensRepository) {
    this.appointmensRepository = appointmensRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppoitmentSameDate = this.appointmensRepository.findByDate(
      appointmentDate,
    );

    if (findAppoitmentSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmensRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;

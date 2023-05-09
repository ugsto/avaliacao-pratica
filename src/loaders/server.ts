import {Student} from '@/models/student/entity';
import express from 'express';

const server = express();

server.use(express.json());

server.get('/api/v1/students', async (request, res) => {
  try {
    const students = await Student.find();

    const marshalledStudents = students.map(student => ({
      _id: student._id,
      nome: student.name,
      sobrenome: student.surname,
      'e-mail': student.email,
      datanascimento: student.birthDate,
      matricula: student.registrationNumber,
    }));

    res.json(marshalledStudents);
  } catch {
    res.status(500).json({message: 'Internal server error'});
  }
});

server.post('/api/v1/student', async (request, res) => {
  try {
    const student = new Student();

    const unmarshalledStudent = {
      name: request.body.nome,
      surname: request.body.sobrenome,
      email: request.body['e-mail'],
      birthDate: new Date(request.body.datanascimento),
      registrationNumber: request.body.matricula,
    };

    Object.assign(student, unmarshalledStudent);

    await student.save();

    res.json(unmarshalledStudent);
  } catch {
    res.status(500).json({message: 'Internal server error'});
  }
});

export {server};

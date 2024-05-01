import { v4 as uuidv4 } from 'uuid';

export const DummyContacts = [
  {
    id: uuidv4(),
    fullName: 'Yuriy Nedilsky',
    phoneNumber: '380732281943',
    emailAddress: 'yuriy.nedilsky@gmail.com',
    birthDate: new Date('2001-08-11'),
    location: 'Lviv'
  },
  {
    id: uuidv4(),
    fullName: 'John Doe',
    phoneNumber: '123456789021',
    emailAddress: 'john@example.com',
    birthDate: new Date('1990-01-01'),
    location: 'New York'
  },
  {
    id: uuidv4(),
    fullName: 'Jane Smith',
    phoneNumber: '987654321022',
    emailAddress: 'jane@example.com',
    birthDate: new Date('1985-05-15'),
    location: 'Los Angeles'
  },
  {
    id: uuidv4(),
    fullName: 'Alice Johnson',
    phoneNumber: '555123456731',
    emailAddress: 'alice@example.com',
    birthDate: new Date('1982-09-30'),
    location: 'Chicago'
  },
  {
    id: uuidv4(),
    fullName: 'Bob Brown',
    phoneNumber: '987654321032',
    emailAddress: 'bob@example.com',
    birthDate: new Date('1978-03-20'),
    location: 'Houston'
  }
]

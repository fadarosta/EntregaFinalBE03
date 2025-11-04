import { expect } from 'chai';
import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../src/app.js';
import PetModel from '../src/dao/models/Pet.js';
import UserModel from '../src/dao/models/User.js';
import AdoptionModel from '../src/dao/models/Adoption.js';

const requester = supertest(app);

describe('Adoption Functional Tests', () => {
  before(async () => {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('¡Los tests deben ejecutarse con NODE_ENV=test!');
    }
    await mongoose.connect('mongodb://localhost:27017/petadoption_test');
  });

  beforeEach(async () => {
    await PetModel.deleteMany({});
    await UserModel.deleteMany({});
    await AdoptionModel.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('GET /api/adoptions debe devolver 200 y un array vacío al inicio', async () => {
    const response = await requester.get('/api/adoptions');
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.payload).to.be.an('array').that.is.empty;
  });

  it('POST /api/adoptions/:uid/:pid crea adopción correctamente', async () => {
    const user = await UserModel.create({
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      password: '123456',
    });
    const pet = await PetModel.create({
      name: 'Max',
      specie: 'Dog',
    });

    const response = await requester
      .post(`/api/adoptions/${user._id}/${pet._id}`)
      .send();

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');

    const updatedPet = await PetModel.findById(pet._id);
    expect(updatedPet.adopted).to.be.true;
    expect(updatedPet.owner.toString()).to.equal(user._id.toString());
  });

  it('POST con usuario inexistente devuelve 404', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const pet = await PetModel.create({ name: 'Luna', specie: 'Cat' });
    const response = await requester.post(`/api/adoptions/${fakeId}/${pet._id}`);
    expect(response.status).to.equal(404);
    expect(response.body.error).to.equal('user Not found');
  });

  it('POST con mascota inexistente devuelve 404', async () => {
    const user = await UserModel.create({
      first_name: 'Test',
      last_name: 'User',
      email: 'test2@example.com',
      password: '123456',
    });
    const fakeId = new mongoose.Types.ObjectId();
    const response = await requester.post(`/api/adoptions/${user._id}/${fakeId}`);
    expect(response.status).to.equal(404);
    expect(response.body.error).to.equal('Pet not found');
  });

  it('POST con mascota ya adoptada devuelve 400', async () => {
    const user1 = await UserModel.create({ first_name: 'A', last_name: 'B', email: 'a@b.com', password: '123' });
    const user2 = await UserModel.create({ first_name: 'C', last_name: 'D', email: 'c@d.com', password: '123' });
    const pet = await PetModel.create({ name: 'Rocky', specie: 'Dog' });

    await requester.post(`/api/adoptions/${user1._id}/${pet._id}`);
    const response = await requester.post(`/api/adoptions/${user2._id}/${pet._id}`);
    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal('Pet is already adopted');
  });

  it('GET /api/adoptions/:aid con ID inválido (no ObjectId) devuelve 404', async () => {
    const response = await requester.get('/api/adoptions/123');
    expect(response.status).to.equal(404);
  });

  it('GET /api/adoptions/:aid con ID válido devuelve la adopción', async () => {
    const user = await UserModel.create({ first_name: 'X', last_name: 'Y', email: 'x@y.com', password: '123' });
    const pet = await PetModel.create({ name: 'Buddy', specie: 'Dog' });
    const adoption = await AdoptionModel.create({ owner: user._id, pet: pet._id });

    const response = await requester.get(`/api/adoptions/${adoption._id}`);
    expect(response.status).to.equal(200);
    expect(response.body.payload._id).to.equal(adoption._id.toString());
  });
});
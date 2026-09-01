import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  it('/api (GET)', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          name: 'VitaForge API',
          version: '0.6.0',
          status: 'running',
        });
      });
  });

  it('supports user CRUD operations', async () => {
    const email = `e2e-${Date.now()}@example.com`;
    let userId: string;

    const created = await request(app.getHttpServer())
      .post('/api/users')
      .send({ email, name: 'E2E User' })
      .expect(201);

    userId = created.body.id;
    expect(created.body.email).toBe(email);
    expect(created.body.name).toBe('E2E User');

    await request(app.getHttpServer())
      .get(`/api/users/${userId}`)
      .expect(200)
      .expect((res) => expect(res.body.id).toBe(userId));

    await request(app.getHttpServer())
      .patch(`/api/users/${userId}`)
      .send({ name: 'Updated E2E User' })
      .expect(200)
      .expect((res) => expect(res.body.name).toBe('Updated E2E User'));

    await request(app.getHttpServer())
      .delete(`/api/users/${userId}`)
      .expect(200)
      .expect((res) => expect(res.body.id).toBe(userId));

    await request(app.getHttpServer())
      .get(`/api/users/${userId}`)
      .expect(404);
  });

  afterEach(async () => {
    await app?.close();
  });
});

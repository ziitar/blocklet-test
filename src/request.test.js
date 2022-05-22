import createTestServer from 'create-test-server';
import request from './request';

const writeData = (data, res) => {
  res.setHeader('access-control-allow-origin', '*');
  res.send(data);
};

describe('test request', () => {
  let server;
  beforeAll(async () => {
    server = await createTestServer({
      certificate: false,
    });
  });
  const prefix = (api) => `${server.url}${api}`;

  it('request url format', async () => {
    server.get('/test/fetch', (req, res) => {
      setTimeout(() => {
        writeData(JSON.stringify({ data: 'ok' }), res);
      }, 1000);
    });
    const urlPrefix = prefix('/test/fetch');
    const res = await request({
      url: urlPrefix,
      data: { x: 1, y: 2 },
    });
    expect(res).toEqual({ data: 'ok' });
  });

  afterAll(async () => {
    await server.close();
  });
});

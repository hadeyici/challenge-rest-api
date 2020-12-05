import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.should();
chai.use(chaiHttp);

const REQUEST_PATH = '/';

describe('/POST', async () => {
  describe('#Records', async () => {
    let record;
    before(async () => {
      record = {
        startDate: '2016-01-26',
        endDate: '2018-02-02',
        minCount: 2700,
        maxCount: 3000,
      };
    });
    it('it should get records response get by filters', async () => {
      const getRequest = await chai.request(server).post(REQUEST_PATH).send(record);
      getRequest.should.have.status(200);
      getRequest.body.should.be.a('object');
      getRequest.body.should.have.property('code').eql(0);
      getRequest.body.should.have.property('msg').eql('Success');
      getRequest.body.should.have.property('records').to.be.an.instanceof(Array);
    });
    it('it should be return false when filters is null', async () => {
      const getRequest = await chai.request(server).post(REQUEST_PATH).send();
      getRequest.body.should.have.property('code').eql(1);
      getRequest.body.should.have.property('msg').eql(['`startDate` is required', '`endDate` is required', '`minCount` is required', '`maxCount` is required']);
      getRequest.body.should.have.property('records').length.least(0);
    });
    it('it should be return false when startDate is null', async () => {
      const mutateRecords = { ...record, startDate: null };
      const getRequest = await chai.request(server).post(REQUEST_PATH).send(mutateRecords);
      getRequest.should.have.status(200);
      getRequest.body.should.be.a('object');
      getRequest.body.should.have.property('code').eql(1);
      getRequest.body.should.have.property('msg').eql(['`startDate` is required']);
      getRequest.body.should.have.property('records').to.be.an.instanceof(Array);
      getRequest.body.should.have.property('records').length.least(0);
    });
    it('it should be return false when endDate is null', async () => {
      const mutateRecords = { ...record, endDate: null };
      const getRequest = await chai.request(server).post(REQUEST_PATH).send(mutateRecords);
      getRequest.should.have.status(200);
      getRequest.body.should.be.a('object');
      getRequest.body.should.have.property('code').eql(1);
      getRequest.body.should.have.property('msg').eql(['`endDate` is required']);
      getRequest.body.should.have.property('records').to.be.an.instanceof(Array);
      getRequest.body.should.have.property('records').length.least(0);
    });
    it('it should be return false when minCount is null', async () => {
      const mutateRecords = { ...record, minCount: null };
      const getRequest = await chai.request(server).post(REQUEST_PATH).send(mutateRecords);
      getRequest.should.have.status(200);
      getRequest.body.should.be.a('object');
      getRequest.body.should.have.property('code').eql(1);
      getRequest.body.should.have.property('msg').eql(['`minCount` is required']);
      getRequest.body.should.have.property('records').to.be.an.instanceof(Array);
      getRequest.body.should.have.property('records').length.least(0);
    });
    it('it should be return false when maxCount is null', async () => {
      const mutateRecords = { ...record, maxCount: null };
      const getRequest = await chai.request(server).post(REQUEST_PATH).send(mutateRecords);
      getRequest.should.have.status(200);
      getRequest.body.should.be.a('object');
      getRequest.body.should.have.property('code').eql(1);
      getRequest.body.should.have.property('msg').eql(['`maxCount` is required']);
      getRequest.body.should.have.property('records').to.be.an.instanceof(Array);
      getRequest.body.should.have.property('records').length.least(0);
    });
    it('it should be return records between filters', async () => {
      const getRequest = await chai.request(server).post(REQUEST_PATH).send(record);
      getRequest.should.have.status(200);
      getRequest.body.records[0].should.have.property('key').to.be.a('string');
      getRequest.body.records[0].should.have.property('createdAt').to.be.a('string');
      getRequest.body.records[0].should.have.property('totalCount').to.be.a('number');
      getRequest.body.records[0].should.have.property('totalCount').to.be.gt(record.minCount);
      getRequest.body.records[0].should.have.property('totalCount').to.be.lt(record.maxCount);
      getRequest.body.records[0].should.not.have.property('_id');
      getRequest.body.records[0].should.not.have.property('value');
      getRequest.body.records[0].should.not.have.property('counts');
    });
  });
});

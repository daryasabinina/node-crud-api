import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../build/server.js';
const should = chai.should();

chai.use(chaiHttp);
// Our main block
describe('Products', () => {
    // Consts
    const user1 = {
        username: 'dasha',
        age: 18,
        hobbies: []
    };
    const user2 = {
        username: 'sasha',
        age: 20,
        hobbies: ['sport']
    };
    const userNotValid = {
        username: 'dasha',
        age: '18',
        hobbies: []
    }

    let id = '';
    /*
    * Test for /GET
    */
    describe('/GET users', () => {
        it('it should GET empty array on first run', done => {
            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST user', () => {
        it('it should create new user', done => {
            chai.request(server)
                .post('/api/users')
                .send(user1)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('username');
                    res.body.username.should.be.equal(user1.username)
                    res.body.should.have.property('age');
                    res.body.age.should.be.equal(user1.age)
                    res.body.should.have.property('hobbies');
                    res.body.should.have.property('id');
                    id = res.body.id;
                    done();
                });
        });
        it('it should not create not valid user', done => {
            chai.request(server)
                .post('/api/users')
                .send(userNotValid)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('/GET users', () => {
        it('it should GET array of users', done => {
            chai.request(server)
                .post('/api/users')
                .send(user2)
                .end()
            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                    done();
                });
        });
    });

    describe('/GET user', () => {
        it('it should GET user by id', done => {
            chai.request(server)
                .get(`/api/users/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.username.should.be.equal(user1.username)
                    done();
                });
        });
    });

    describe('/PUT user', () => {
        it('it should PUT to user updated values', done => {
            chai.request(server)
                .put(`/api/users/${id}`)
                .send({age: 33})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.username.should.be.equal(user1.username)
                    done();
                });
        });
    });

    it('it should GET updated list of users', done => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                done();
            });
    });

    describe('/DELETE user', () => {
        it('it should DELETE user', done => {
            chai.request(server)
                .delete(`/api/users/${id}`)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });

    describe('/GET ', () => {
        it('it should not GET deleted user', done => {
            chai.request(server)
                .get(`/api/users/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should GET updated list of users', done => {
            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

});
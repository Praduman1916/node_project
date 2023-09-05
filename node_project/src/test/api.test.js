const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const app = require('../../server')
describe('Test ALL API', () => {
    let createdItemId;
    it('Return all items without filters', (done) => {
        chai
            .request(app)
            .get('/items')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('totalItems');
                expect(res.body).to.have.property('items').to.be.an('array');
                done();
            });
    });

    it('Return paginated items', (done) => {
        chai
            .request(app)
            .get('/items?page=2&limit=5')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('totalItems');
                expect(res.body).to.have.property('items').to.be.an('array');
                expect(res.body.items).to.have.lengthOf(5); // Ensure pagination limit is respected
                done();
            });
    });

    it('Filter items by name', (done) => {
        chai
            .request(app)
            .get('/items?name=Item 1')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('totalItems');
                expect(res.body).to.have.property('items').to.be.an('array');
                done();
            });
    });

    it('Filter items by category', (done) => {
        chai
            .request(app)
            .get('/items?category=Category A')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('totalItems');
                expect(res.body).to.have.property('items').to.be.an('array');
                done();
            });
    });
    it('Sort items by name in ascending order', (done) => {
        chai
            .request(app)
            .get('/items?sort=name-asc')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('totalItems');
                expect(res.body).to.have.property('items').to.be.an('array');
                done();
            });
    });
    it('Sort items by name in descending order', (done) => {
        chai
            .request(app)
            .get('/items?sort=name-desc')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('totalItems');
                expect(res.body).to.have.property('items').to.be.an('array');
                done();
            });
    });
    it('Create a new item', (done) => {
        chai
            .request(app)
            .post('/items/createitem')
            .send({ name: 'New Item', category: 'New Category' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id');
                createdItemId = res.body.id;
                done();
            });
    });
    it('Get an item by ID', (done) => {
        chai
            .request(app)
            .get(`/items/getitembyid/${createdItemId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id', createdItemId);
                done();
            });
    });
    it('Update an item by ID', (done) => {
        chai
            .request(app)
            .put(`/items/updateitem/${createdItemId}`)
            .send({ name: 'Updated Item', category: 'Updated Category' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name', 'Updated Item');
                expect(res.body).to.have.property('category', 'Updated Category');
                done();
            });
    });
    it('Delete an item', (done) => {
        chai
            .request(app)
            .delete(`/items/deleteitem/${createdItemId}`)
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            });
    });
});

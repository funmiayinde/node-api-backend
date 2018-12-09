import {User} from '../../../src/api/user/user.model';

import chai from 'chai';
import supertest from 'supertest';
import app from '../../../src/app';
import {getUserObject} from "../../_seeds/user.seed";
import {after, before, describe} from 'mocha';
import {AUTH_URL} from "../routes";
import {HTTP_BAD_REQUEST, HTTP_OK} from "../../../src/utils/status-codes";

let should = chai.should();
let server;

describe('Set For Login Test', () => {
	before(async () => {
		server = supertest(await app);
		await User.remove({});
		await (new User(getUserObject()).save());
	});

	after(async () => {
		await User.remove({});
	});

	describe('Auth Endpoint Test ' + AUTH_URL, () => {
		it('Should test login a user that does not exist or not registered ', async () => {
			const response = await server.post(AUTH_URL)
				.send({username: "test@gmail.com", password: 'fakepassword'})
				.expect('Content-type', 'application/json; charset=utf-8')
				.expect(HTTP_BAD_REQUEST);

			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('_meta');
			response.body._meta.should.have.property('status_code');
			response.body._meta.should.have.property('error');
			response.body._meta.error.should.have.property('code');
		});

		it('Should login an existing user with valid details', async () => {
			const response = await server.post(AUTH_URL)
				.send({username: getUserObject().username, password: getUserObject().password})
				.expect('Content-type', 'application/json; charset=utf-8')
				.expect(HTTP_OK);

			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('_meta');
			response.body._meta.should.have.property('status_code');
			response.body._meta.should.have.property('success');
			response.body.should.have.property('data');
		})
	});


});


import chai from 'chai';
import supertest from 'supertest';
import app from '../../../src/app';
import { before, describe} from 'mocha';
import {JSON_PATCH_URL} from "../routes";
import { HTTP_OK, HTTP_UNAUTHORIZED} from "../../../src/utils/status-codes";
import {getDocument, getPatchDocument} from "../../_seeds/json-patch.seed";
import {token} from "../_constant";

let should = chai.should();
let server;
let document;
let patch;

describe('Set For Json Patch Test', () => {
	before(async () => {
		server = supertest(await app);
		document = getDocument();
		patch = getPatchDocument();
	});

	describe('JSON Patch Endpoint Test ' + JSON_PATCH_URL, () => {
		it('Should test Json Patch without authorization ', async () => {

			const response = await server.post(JSON_PATCH_URL)
				.send({document: document, patch: patch})
				.expect('Content-type', 'application/json; charset=utf-8')
				.expect(HTTP_UNAUTHORIZED);

			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('_meta');
			response.body._meta.should.have.property('status_code');
			response.body._meta.should.have.property('error');
			response.body._meta.error.should.have.property('code');
		});

		it('Should return the json patch', async () => {
			const response = await server.post(JSON_PATCH_URL)
				.send({document: document, patch: patch})
				.set("authorization", token)
				.expect('Content-type', 'application/json; charset=utf-8')
				.expect(HTTP_OK);

			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('document');
		})
	});


});


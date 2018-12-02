import express from 'express';
import logger from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import SetUpSeeders from "../core/seeders/setup";
import AppLogger from "../core/api/app.logger";

const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());
app.get('/seeds/setups', (req, res, next) => {
	(async () => {
		AppLogger.logger("info").info("seed");
		const seed = new SetUpSeeders();
		await seed.seedUser();
		return res.send('Setup Seeded!');
	})();
});

export default app;


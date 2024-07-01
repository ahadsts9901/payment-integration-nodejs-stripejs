import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import paymentRoute from './payment.mjs';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', paymentRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.info(`server is running on port ${PORT}`);
});

export default app;
import * as os from 'os';
import './common/env';
import l from './common/logger';
import app from './app';

const port = process.env.PORT;

app.listen(port, () => {
  l.info(
    `up and running in ${
      process.env.NODE_ENV || 'development'
    } @: ${os.hostname()} on port: ${port}}`
  );
});

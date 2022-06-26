import config from "./config/Config.js";
import app from './routes/TodoRoutes.js';

app.listen(config.port, () => {
    console.log(`App listening on port ${config.port}`);
});
# Fawkes.js - Client,
The client is responsible for handling events received from the gateway, and providing an abstraction layer for the user to respond to these events. It uses a syntax and design heavily based off **discord.js** and aims to be easily understandable and modular.

## Dependencies,
- **@fawkes.js/api-types,** provides typings for both gateway related items as well as other components of Fawkes.
- **@fawkes.js/rest,** handles HTTP requests made to discord's REST API.
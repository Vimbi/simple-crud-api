const personController = require('../controllers/personController');
const {
  RESPONSE_MESSAGES,
  STATUS_CODES
} = require('../../data/constants');
const createResponse = require('../createResponse/createResponse');

const personRouter = async (req, res) => {

  switch (req.url) {
    case '/person':
    case '/person/':
      try {
        if (req.method === 'GET') {
          const persons = await personController.getAll();
          createResponse(res, STATUS_CODES.OK, persons);
        } else if (req.method === 'POST') {
          let person = '';
          req
            .on('data', async (data) => {
              person = await personController.addPerson(JSON.parse(data));
            })
            .on('end', async () => {
              if (person) {
                createResponse(res, STATUS_CODES.CREATED, person);
              } else {
                createResponse(res, STATUS_CODES.BAD_REQUEST, {
                  message: RESPONSE_MESSAGES.BAD_REQUEST
                })
              }
            })
        } else {
          createResponse(res, STATUS_CODES.NOT_FOUND, {
            message: RESPONSE_MESSAGES.NOT_FOUND
          });
        }
      } catch (error) { // TODO need to catch Syntax Error
        console.log(error.name);
        createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, {
          message: RESPONSE_MESSAGES.BAD_REQUEST
        });
      }
      break;

    default:
      createResponse(res, STATUS_CODES.NOT_FOUND, {
        message: RESPONSE_MESSAGES.NOT_FOUND
      });
      break;
  }
}

module.exports = personRouter;
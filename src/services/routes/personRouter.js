const personController = require('../controllers/personController');
const {
  RESPONSE_MESSAGES,
  STATUS_CODES
} = require('../../data/constants');
const createResponse = require('../createResponse/createResponse');
const safelyParseJSON = require('../../utils/safelyParseJSON');

const personRouter = async (req, res) => {
  const urlSplit = req.url.split('/');
  console.log(urlSplit);

  if (urlSplit[1] !== 'person' || urlSplit.length > 4 || urlSplit.length < 2) {
    createResponse(res, STATUS_CODES.NOT_FOUND, {
      message: RESPONSE_MESSAGES.NOT_FOUND
    });
  } else if (req.url === '/person' || req.url === '/person/') {
    try {
      let persons;
      let person;
      switch (req.method) {
        case 'GET':
          persons = await personController.getAll();
          createResponse(res, STATUS_CODES.OK, persons);
          break;
        case 'POST':
          req
            .on('data', async (data) => {
              person = await personController.addPerson(safelyParseJSON(data));
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
          break;
        default:
          createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, {
            message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
          });
          break;
      }
    } catch (error) {
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, {
        message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  } else {
    switch (req.method) {
      case 'GET':
        break;
      case 'PUT':
        break;
      case 'DELETE':
        break;
      default:
        createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, {
          message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
        });
        break;
    }
  }
}

module.exports = personRouter;
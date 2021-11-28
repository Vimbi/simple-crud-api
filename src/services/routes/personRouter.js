const {
  validate
} = require('uuid');
const personController = require('../controllers/personController');
const {
  RESPONSE_MESSAGES,
  STATUS_CODES
} = require('../../data/constants');
const createResponse = require('../createResponse/createResponse');
const safelyParseJSON = require('../../utils/safelyParseJSON');

// eslint-disable-next-line consistent-return
const personRouter = async (req, res) => {
  const urlSplit = req.url.split('/');

  if (urlSplit[1] !== 'person' || urlSplit.length > 4 || urlSplit.length < 2) {
    return createResponse(res, STATUS_CODES.NOT_FOUND, {
      message: RESPONSE_MESSAGES.NOT_FOUND
    });
  };

  if (req.url === '/person' || req.url === '/person/') {
    try {
      let persons;
      let person;
      switch (req.method) {
        case 'GET':
          persons = await personController.getAll();
          return createResponse(res, STATUS_CODES.OK, persons);
        case 'POST':
          req
            .on('data', async (data) => {
              person = safelyParseJSON(data);
            })
            .on('end', async () => {
              if (!person) {
                return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, {
                  message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
                });
              }
              person = await personController.addPerson(person);
              if (person) {
                return createResponse(res, STATUS_CODES.CREATED, person);
              }
              return createResponse(res, STATUS_CODES.BAD_REQUEST, {
                message: RESPONSE_MESSAGES.BAD_REQUEST
              })
            })
          break;
        default:
          return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, {
            message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
          });
      }
    } catch (error) {
      return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, {
        message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  } else {
    try {
      let person;
      const personId = urlSplit[2];

      if (!validate(personId)) {
        return createResponse(res, STATUS_CODES.BAD_REQUEST, {
          message: RESPONSE_MESSAGES.BAD_REQUEST
        });
      }
      switch (req.method) {
        case 'GET':
          person = await personController.getPerson(personId);
          if (person) {
            return createResponse(res, STATUS_CODES.OK, person);
          }
          return createResponse(res, STATUS_CODES.NOT_FOUND, {
            message: RESPONSE_MESSAGES.NOT_FOUND
          });
        case 'PUT':
          req
            .on('data', async (data) => {
              person = safelyParseJSON(data);
            })
            .on('end', async () => {
              if (!person) {
                return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, {
                  message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
                });
              }
              person = await personController.updatePerson(personId, person);
              if (person) {
                return createResponse(res, STATUS_CODES.OK, person);
              }
              return createResponse(res, STATUS_CODES.NOT_FOUND, {
                message: RESPONSE_MESSAGES.NOT_FOUND
              })
            })
          break;
        case 'DELETE':
          person = await personController.deletePerson(personId);
          if (person) {
            return createResponse(res, STATUS_CODES.NO_CONTENT);
          }
          return createResponse(res, STATUS_CODES.NOT_FOUND, {
            message: RESPONSE_MESSAGES.NOT_FOUND
          })
        default:
          return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, {
            message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
          });
      }
    } catch (error) {
      return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, {
        message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  }
}

module.exports = personRouter;
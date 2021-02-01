import StatusCodes from 'http-status-codes';
import Recipient from '../models/Recipient';
import recipientStoreSchema from '../validations/recipientStoreSchema';
import recipientUpdateSchema from '../validations/recipientUpdateSchema';

class RecipientController {
  async store(req, res) {
    try {
      await recipientStoreSchema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Validation fails',
        messages: err.errors,
      });
    }

    try {
      const { id, name, address } = await Recipient.create(req.body);

      return res.json({
        id,
        name,
        address,
      });
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ erro: err.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      await recipientUpdateSchema.validate(
        { id, ...req.body },
        { abortEarly: false }
      );
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Validation fails',
        messages: err.errors,
      });
    }

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Recipient not found.' });
    }

    const { name, address } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      address,
    });
  }
}

export default new RecipientController();

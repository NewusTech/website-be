const { MessageHistory } = require("../models/index");

class MessageHistoryController {
  static async messageHistoryLists(req, res, next) {
    try {
      const messages = await MessageHistory.findAll();

      res.status(200).json({
        message: "success get message history",
        data: messages,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async messageHistoryDetails(req, res, next) {
    try {
      const { id } = req.params;

      const message = await MessageHistory.findByPk(id);

      if (!message) throw { name: "InvalidId" };

      res.status(200).json({
        message: "success get message histor detail",
        data: message,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createMessageHistory(req, res, next) {
    try {
      const { name, lastname, email, message, subject, phoneNumber } = req.body;

      const newMessage = await MessageHistory.create({
        name,
        lastname,
        email,
        message,
        subject,
        phoneNumber,
      });

      res.status(201).json({
        message: "success create message history",
        data: newMessage,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteMessageHistory(req, res, next) {
    try {
      const { id } = req.params;

      const message = await MessageHistory.findByPk(id);

      if (!message) throw { name: "InvalidId" };

      await message.destroy();

      res.status(200).json({
        message: "success delete message history",
        data: message,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateMessageHistory(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, message, subject, phoneNumber } = req.body;

      const updateMessage = await MessageHistory.findByPk(id);

      if (!message) throw { name: "InvalidId" };

      await message.update({
        name,
        email,
        message,
        subject,
        phoneNumber,
      });

      res.status(200).json({
        message: "success update message history",
        data: updateMessage,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = MessageHistoryController;

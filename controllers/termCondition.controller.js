const { TermCondition } = require("../models/index");
const { response } = require('../helpers/response.formatter');


class TermConditionController {
  static async termconditionLists(req, res, next) {
    try {
      const tnc = await TermCondition.findAll({
      });

      res.status(200).json({
        message: "Success get tnc",
        data: tnc,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async termconditionDetails(req, res, next) {
    try {
      const { id } = req.params;

      const tnc = await TermCondition.findByPk(id, {
      });

      if (!tnc) throw { name: "InvalidId" };

      res.status(200).json({
        message: "Success get tnc detail",
        data: tnc,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async newTermCondition(req, res, next) {
    try {
      const { content } = req.body;

      const dataCreate = {
        content: content,
        image: req.file ? imageKey : undefined
      }

      const createTermCondition = await TermCondition.create(dataCreate);

      res.status(201).json(response(201, 'success create tnc', createTermCondition));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }

  static async deleteTermCondition(req, res, next) {
    try {
      const { id } = req.params;

      const tnc = await TermCondition.findByPk(id);

      if (!tnc) throw { name: "InvalidId" };

      await tnc.destroy();

      res.status(200).json({
        message: "Success delete tnc",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateTermCondition(req, res, next) {
    try {
      const { id } = req.params;
      const { content } = req.body;
  
      const tnc = await TermCondition.findByPk(id);
  
      if (!tnc) throw { name: "InvalidId" };
  
      const dataUpdate = {
        content: content
      };
  
      // Add where clause to specify which client to update
      await TermCondition.update(dataUpdate, {
        where: { id: id }
      });
  
      const updatedTermCondition = await TermCondition.findByPk(id); // Fetch the updated client data
  
      res.status(200).json(response(200, 'success update tnc', updatedTermCondition));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }
}

module.exports = TermConditionController;

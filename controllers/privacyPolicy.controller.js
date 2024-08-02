const { PrivacyPolicy } = require("../models/index");
const { response } = require('../helpers/response.formatter');


class PrivacyPolicyController {
  static async privacypolicyLists(req, res, next) {
    try {
      const privacypolicy = await PrivacyPolicy.findAll({
      });

      res.status(200).json({
        message: "Success get privacy policy",
        data: privacypolicy,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async privacypolicyDetails(req, res, next) {
    try {
      const { id } = req.params;

      const privacypolicy = await PrivacyPolicy.findByPk(id, {
      });

      if (!privacypolicy) throw { name: "InvalidId" };

      res.status(200).json({
        message: "Success get privacypolicy detail",
        data: privacypolicy,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async newPrivacyPolicy(req, res, next) {
    try {
      const { content } = req.body;

      const dataCreate = {
        content: content
      }

      const createPrivacyPolicy = await PrivacyPolicy.create(dataCreate);

      res.status(201).json(response(201, 'success create privacy policy', createPrivacyPolicy));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }

  static async deletePrivacyPolicy(req, res, next) {
    try {
      const { id } = req.params;

      const privacypolicy = await PrivacyPolicy.findByPk(id);

      if (!privacypolicy) throw { name: "InvalidId" };

      await privacypolicy.destroy();

      res.status(200).json({
        message: "Success delete privacy policy",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updatePrivacyPolicy(req, res, next) {
    try {
      const { id } = req.params;
      const { content } = req.body;
  
      const privacypolicy = await PrivacyPolicy.findByPk(id);
  
      if (!privacypolicy) throw { name: "InvalidId" };
  
      const dataUpdate = {
        content: content
      };
  
      // Add where clause to specify which client to update
      await PrivacyPolicy.update(dataUpdate, {
        where: { id: id }
      });
  
      const updatedPrivacyPolicy = await PrivacyPolicy.findByPk(id); // Fetch the updated client data
  
      res.status(200).json(response(200, 'success update privacy policy', updatedPrivacyPolicy));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }
}

module.exports = PrivacyPolicyController;

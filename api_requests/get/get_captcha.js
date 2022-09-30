const { createCanvas, loadImage } = require("canvas");
var randomId = require("random-id");

let captcha = require('../../db/captcha')

module.exports = {
  path: "/api/v1/captcha/:id",
  method: "get",
  run: async (req, res) => {
    let data = await captcha.findOne({ id: req.params.id });
    if (!data)
      return res
        .status(403)
        .json({ errors: ["data"], message: "I Can't find this data" });

    res.status(200).json(data);
  },
};

const { body } = require('express-validator');

const blogCreateSchema = [
    body("number")
    .isNumeric()
    .withMessage("Please write 2D Number what you like!!"),
    body("amount")
    .isNumeric()
    .withMessage("Please fill your amount"),
    // body("screenShots").exists({checkFile : true}).withMessage("Please upload your Ss!!"),
];

module.exports = blogCreateSchema;
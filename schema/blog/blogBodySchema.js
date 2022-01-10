const { body } = require('express-validator');

const blogCreateSchema = [
    body("Number")
    .isNumeric("2")
    .withMessage("Please write 2D Number what you like!!"),
    body("Amount")
    .isNumeric()
    .withMessage("Please fill your amount"),
    body("ScreenShots").exists({checkFalsy : true}).withMessage("Please upload your Ss!!"),
    body("Public")
    .exists({checkFalsy : true})
    .withMessage("Please fill your post type")
];

module.exports = blogCreateSchema;
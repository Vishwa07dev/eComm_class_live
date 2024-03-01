const category_model = require("../models/category.model");

/**
 * Controller for creating the category
 * 
 *   POST localhost:8080/ecomm/api/v1/categories
 * 
 *   {
       "name" : "Household",
        "description" : "This will have all the household items "
     }
 */
exports.createNewCategory = async (req, res) => {
  //Read the req body
  //Create the category object
  const cat_data = {
    name: req.body.name,
    description: req.body.description,
  };
  try {
    // Check category is already present or not
    const isCategoryPresent = await category_model.findOne({
      name: cat_data.name,
    });
    if (isCategoryPresent) {
      return res.status(401).send({
        success: false,
        message: `Failed ! ${cat_data.name} is already present`,
      });
    }
    //Insert into mongodb
    const category = await category_model.create(cat_data);
    return res.status(201).send(category);
  } catch (err) {
    console.log("Error while creating the category", err);
    return res.status(500).send({
      message: "Error while creating the category",
    });
  }

  //return the response of the created category
};

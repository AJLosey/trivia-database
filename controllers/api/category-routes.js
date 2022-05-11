const router = require('express').Router();
const { Category } = require('../../models');

// Author: Mayur
// Purpose: Get route to fetch list of all categories order by category_name from database
router.get('/', async (req, res) => {    
    try {
        const categoryData = await Category.findAll({     
          order: 
            ['category_name'],   
          attributes: ['id','category_name']   
        });
        const categories = categoryData.map((category) => {return category.get({ plain: true})});        
        res.status(200).json(categories);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }   
});


module.exports = router;

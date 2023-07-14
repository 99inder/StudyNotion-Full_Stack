const { mongoose } = require("mongoose");
const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}


//create category handler
exports.createCategory = async (req, res) => {
    try {

        //get the category name from the request body
        const { name, description } = req.body;

        //              Validation
        if (!name || !description) {
            return res.status(401).json({
                success: false,
                message: "Required fields must be filled."
            });
        }

        //check if category already exists, return response
        const categoryExist = await Category.findOne({ name: name });
        if (categoryExist) {
            return res.status(400).json({
                success: false,
                message: "A category with this name already exists."
            });
        }

        //category is not present, then create the entry in DB
        const categoryDetails = await Category.create({
            name,
            description,
        })


        //return response
        return res.status(200).json({
            success: true,
            message: "Category created successfully.",
            category: categoryDetails,
        })

    } catch (error) {
        console.log("Error Occured while creating new category.")
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create Category. Please try again."
        })
    }
}


//getAllCategories handler
exports.showAllCategories = async (req, res) => {
    try {

        //fetch all categories from DB
        const allCategories = await Category.find({}, { name: true, description: true });

        //return response
        return res.status(200).json({
            success: true,
            message: "All categories fetched successfully.",
            allCategories,
        })

    } catch (error) {
        console.log("Error Occured while fetching all categories.")
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch all categories. Please try again."
        });
    };
};

//categoryPageDetails
exports.categoryPageDetails = async (req, res) => {
    try {
        //get categoryId
        const { categoryId } = req.body;

        if (!categoryId)
            return res.status(404).json({
                success: false,
                message: "Category ID not received"
            })

        //get courses for specified category id
        const selectedCategory = await Category.findById(categoryId).populate({
            path: "courses",
            match: { status: "Published" },
            populate: "ratingAndReviews"
        }).exec();

        //validation
        if (!selectedCategory) {
            return res.status(400).json({
                success: false,
                message: "Category not found."
            })
        };

        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.");
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            });
        }

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })
        let differentCategory = await Category.findById(categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id)
            .populate({
                path: "courses",
                match: { status: "Published" },
            })
            .exec()
        //console.log("Different COURSE", differentCategory)
        // Get top-selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec()
        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)
        // console.log("mostSellingCourses COURSE", mostSellingCourses)
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = (sequelize, DataTypes) => {
    const ProductCategory = sequelize.define("product_category",{
        product_id: {
            type: DataTypes.BIGINT,
            references: {
                model: "Products",
                key: "id"
            }
        },
        category_id: {
            type: DataTypes.BIGINT,
            references: {
                model: "Categories",
                key: "id"
            }
        },
    },{
        tableName: "product_category",
        timestamps: false
    });

    ProductCategory.associate = (models) => {
        ProductCategory.belongsTo(models.Products, {
            as: "products",
            foreignKey: "product_id"
        });
        ProductCategory.belongsTo(models.Categories, {
            as: "categories",
            foreignKey: "category_id"
        });
    }

    return ProductCategory;
}
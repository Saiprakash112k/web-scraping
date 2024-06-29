'use strict';

import {
  Model
} from 'sequelize';

interface ProductAttributes {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    brand: string;
    rating: string;
    stock: string;
    url: Text;
    productId:string;
  }

module.exports = (sequelize: any, DataTypes: any) => {
  class Product extends Model<ProductAttributes> 
    implements ProductAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public id!: number;
    public name!: string;
    public price!: number;
    public description!: string;
    public imageUrl!: string;
    public brand!: string;
    public rating!: string;
    public stock!: string;
    public url!: Text;
    public productId!: string;

    static associate(models: any) {
      // define association here
    }
  };
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    productId:{
      type:DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    brand: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.TEXT('long')
    },
  },{
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
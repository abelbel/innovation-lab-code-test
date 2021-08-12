const { DataTypes, Model } = require("sequelize");

import DogSchema from "../schema/dog";
import { sequelize } from "./connection";

class Dog extends Model {}

Dog.init(
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Dog",
    freezeTableName: true,
  }
);

export const getDogs = async () => {
  await sequelize.sync();
  const dogs = await Dog.findAll();
  return dogs as DogSchema[];
};

export const addDog = async (data: DogSchema) => {
  await sequelize.sync();
  const dog = await Dog.create(data);
  return dog as DogSchema;
};

export default Dog;

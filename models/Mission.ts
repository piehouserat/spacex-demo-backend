import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  type ForeignKey,
} from 'sequelize';
import { Ship } from './Ship';

type OmitTypes = '';

class Mission extends Model<
  InferAttributes<
    Mission,
    {
      omit: OmitTypes;
    }
  >,
  InferCreationAttributes<
    Mission,
    {
      omit: OmitTypes;
    }
  >
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description?: string | null;
  declare ShipId: ForeignKey<Ship['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize) {
    Mission.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      },
      {
        sequelize,
      },
    );

    return Mission;
  }
  public static associate = ({ Ship }) => {
    Mission.belongsTo(Ship);
  };
}

export { Mission, Mission as MissionAttributes };

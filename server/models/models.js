const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Contacts = sequelize.define('contacts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    link: { type: DataTypes.STRING, allowNull: false },
    imageSrc: { type: DataTypes.STRING, allowNull: false },
}, {
    freezeTableName: true,
    timestamps: false 
})

const Advantages = sequelize.define('advantages', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: false, unique: true },
    iconSrс: { type: DataTypes.STRING, allowNull: false },
    imageSrc: { type: DataTypes.STRING, allowNull: false },
}, {
    freezeTableName: true,
    timestamps: false 
})

const WorkSchedule = sequelize.define('work_schedule', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    shortName: { type: DataTypes.STRING, allowNull: false, unique: true },
    value: { type: DataTypes.STRING, allowNull: true },
}, {
    freezeTableName: true,
    timestamps: false 
})

const MainSettings = sequelize.define('main_settings', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    key: { type: DataTypes.STRING, allowNull: false, unique: true },
    value: { type: DataTypes.TEXT, allowNull: true },
}, {
    freezeTableName: true
})


const Services = sequelize.define('services', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    time: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: true },
    price: { type: DataTypes.FLOAT, defaultValue: 0, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: false },
}, {
    freezeTableName: true,
    timestamps: false 
})

const WorkTypes = sequelize.define('work_types', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
    freezeTableName: true,
    timestamps: false 
})

const Works = sequelize.define('works', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    imageAfterSrc: { type: DataTypes.STRING, allowNull: true },
    imageBeforeSrc: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: false },

}, {
    freezeTableName: true
})

const SharedImages = sequelize.define('shared_images', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true },
    imageSrc: { type: DataTypes.STRING, allowNull: false },
}, {
    freezeTableName: true
})

const OfficeImages = sequelize.define('office_images', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    imageSrc: { type: DataTypes.STRING, allowNull: false },
}, {
    freezeTableName: true,
    timestamps: false 
})


const homeSlider = sequelize.define('home_slider', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    imageSrc: { type: DataTypes.STRING, allowNull: false },
}, {
    freezeTableName: true,
    timestamps: false 
})

const Reviews = sequelize.define('reviews', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    comment: { type: DataTypes.TEXT, allowNull: true },
    rating: {
        type: DataTypes.INTEGER, defaultValue: 1, allowNull: false, validate: {
            isInt: true,
            min: 1,
            max: 5
        }
    },
}, {
    freezeTableName: true
})

const Users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true },
    imageSrc: { type: DataTypes.STRING, allowNull: true },
    visitsNumber: { type: DataTypes.INTEGER, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    activateCode: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'ANON' },
}, {
    freezeTableName: true
})



const AuthValues = sequelize.define('auth_values', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    password: { type: DataTypes.STRING, allowNull: false },
}, {
    freezeTableName: true
})

const RefreshTokens = sequelize.define('refresh_tokens', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    token: { type: DataTypes.STRING, allowNull: false },
}, {
    freezeTableName: true
})

const ReviewsImages = sequelize.define('reviews_images', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
}, {
    freezeTableName: true
})

const WorksImages = sequelize.define('works_images', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
}, {
    freezeTableName: true
})



WorkTypes.hasMany(Works, {
    foreignKey: {
        name: 'typeId',
        allowNull: true
    }
});
Works.belongsTo(WorkTypes, {
    foreignKey: {
        name: 'typeId', 
        allowNull: true
    }
});

Works.belongsToMany(SharedImages, { through: WorksImages })
SharedImages.belongsToMany(Works, { through: WorksImages })

Reviews.belongsToMany(SharedImages, { through: ReviewsImages })
SharedImages.belongsToMany(Reviews, { through: ReviewsImages })

Users.hasOne(Reviews, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    },
    onDelete: 'CASCADE',
})
Reviews.belongsTo(Users)

Users.hasOne(AuthValues, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    },
    onDelete: 'CASCADE',
})
AuthValues.belongsTo(Users)


Users.hasOne(RefreshTokens, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    },
    onDelete: 'CASCADE',
})
RefreshTokens.belongsTo(Users)



module.exports = {
    Contacts,
    Advantages,
    WorkSchedule,
    MainSettings,
    Services,
    WorkTypes,
    Works,
    SharedImages,
    OfficeImages,
    homeSlider,
    Reviews,
    Users,
    AuthValues,
    RefreshTokens,
    ReviewsImages
}
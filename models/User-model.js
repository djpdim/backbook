const { Schema, model } = require("mongoose")
const ThoughtSchema = require("./Thoughts-model.js")

const UserSchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/],
        },
        thoughts: [ThoughtSchema],

        friends: [UserSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

UserSchema.virtual("friendCount").get(function () {
    return this.friends.length()
})

const User = model("User", UserSchema)

module.exports = User

const { Schema, model } = require("mongoose")
// const dateFormat = require("../utils/dateFormat")
const ReactionSchema = require("./Reaction-model")

const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: createdAtVal => dateFormat(createdAtVal),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false,
    }
)

// get total count of comments and replies on retrieval
ThoughtsSchema.virtual("reactionCount").get(function () {
    return this.reactions.length()
})

const Thoughts = model("Thoughts", ThoughtsSchema)

module.exports = Thoughts

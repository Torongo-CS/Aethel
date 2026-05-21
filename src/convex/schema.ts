import { defineSchema, defineTable} from "convex/server"
import { v } from "convex/values"


export default defineSchema({
    users : defineTable({
        name : v.string(),
        email : v.string(),
        passwordhash : v.string(),
        role : v.union(v.literal("admin"),v.literal("user")),
        status : v.union(v.literal("pending"),v.literal("approved"),v.literal("rejected")),
        otp : v.optional(v.string()),
        otpExpiry : v.optional(v.number()),
    }).index("by_email",["email"]),

    posts : defineTable({
        userId : v.id("users"),
        title : v.string(),
        content : v.string(),
        category : v.union(v.literal("achivement"),v.literal("thoughts"),v.literal("video"),v.literal("research-paper"),v.literal("documenation")),
        url : v.optional(v.string()),
        createdAt : v.number(),
    }).index("by_category",["category"]),


    files : defineTable({
        userId : v.id("users"),
        name : v.string(),
        type : v.union(v.literal("folder"),v.literal("notebook"),v.literal("file")),
        parentId : v.union(v.id("files"),v.literal("root")),
        content : v.optional(v.string()),
        createdAt : v.number(),
    }).index("by_user_parent",["userId","parentId"]),

    learningResources : defineTable({
        sharedBy : v.id("users"),
        title : v.string(),
        category : v.union(v.literal("research-paper"),v.literal("video"),v.literal("documentation")),
        url : v.string(),
        description : v.string(),
        createdAt : v.number(),
    }),

    userProgress : defineTable({
        userId : v.id("users"),
        resourceId : v.id("learningResources"),
        isCompleted : v.boolean(),
        notes : v.optional(v.string()),
    }).index("by_user_resource",["userId","resourceId"]),


    todos : defineTable({
        userId : v.id("users"),
        text : v.string(),
        isCompleted : v.boolean(),
        createdAt : v.number(),
    }).index("by_user",["userId"]),

    timelogs : defineTable({
        userId : v.id("users"),
        durationMinutes : v.number(),
        date : v.string(),
        createdAt : v.number(),
    }).index("by_user_date",["userId","date"]),

});
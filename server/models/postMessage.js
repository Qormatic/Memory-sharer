import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: String,
    message: String,
	name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
	comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = mongoose.model('PostMessage', postSchema);

// export mongoose model from postmessage file and then on that model we will be able to run commands such as find, create, delete
export default PostMessage
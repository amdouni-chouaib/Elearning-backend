const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    description: String,
    alternatives: [
        {
            text: {
                type: String,
                required: true
                },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ],
    formation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Formation',
        required: true
    }
})

module.exports = mongoose.model('Question', QuestionSchema)
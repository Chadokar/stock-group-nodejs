// const axios = require('axios');
const mongoose = require("mongoose");

// const apiKey = 'YOUR_API_KEY';
// const symbol = 'AAPL';

// axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`)
//   .then(response => {
//     const data = response.data['Global Quote'];
//     console.log(`Symbol: ${data['01. symbol']}`);
//     console.log(`Price: ${data['05. price']}`);
//     console.log(`Change: ${data['09. change']}`);
//     console.log(`Percent change: ${data['10. change percent']}`);
//   })
//   .catch(error => {
//     console.error(error);
//   });

const groupSchema = new mongoose.Schema(
  {
    groupDetails: {
      groupName: { type: String, default: "GroupName" },
      groupMembers: [
        {
          memberId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          memberName: { type: String },
        },
      ],
      groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      groupImage: {
        type: String,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
    },
    messages: [
      {
        text: { type: String },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        isLiked: { type: Boolean, default: false },
        likes: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const Group = mongoose.model("group", groupSchema);
module.exports = Group;

const {User} = require("../Models")
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_DB || 'mongodb://localhost/book_mania')
const data = [{
    _id: "619eb197c5e49eb08ad4265a",
    firstName: 'Ben',
    lastName: 'Hopkins',
    email: 'bjhops17@gmail.com',
    passiwrd: "test",
    pendingconnection: [],
    connection: [
      {
        _id: "619eb63cc5e49eb08ad4265e",
        firstName: 'Smokey',
        lastName: 'HOPKINS',
        email: 'smokey17@gmail.com',
      
        pendingconnection: [Array],
        connection: [Array],
        recommended: [Array],
        readingList: [],
        __v: 0,
        usercurrent: [Object]
      }
    ],
    recommended: [
      {
        title: 'Twin Towers part 2',
        description: 'Frodo andaaa the ring.',
        thumbnail: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/39/uktv-it-crowd-finale-moss.jpg?resize=480:*',
        recommended: [Object],
        _id: "619eb8668b8c109220c42b47",
        comments: []
      },
      {
        title: 'Twin Towers part 2',
        description: 'Frodo andaaa the ring.',
        thumbnail: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/39/uktv-it-crowd-finale-moss.jpg?resize=480:*',
        recommended: [Object],
        _id: "619ec2d0b4321aa122ee6b3f",
        comments: []
      },
      {
        title: 'Twin Towers part 2',
        description: 'Frodo andaaa the ring.',
        thumbnail: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/39/uktv-it-crowd-finale-moss.jpg?resize=480:*',
        recommended: [Object],
        _id: "619ec2d1b4321aa122ee6b44",
        comments: []
      },
      {
        title: 'Twin Towers part 2',
        description: 'Frodo andaaa the ring.',
        thumbnail: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/39/uktv-it-crowd-finale-moss.jpg?resize=480:*',
        recommended: [Object],
        _id: "619ec2d2b4321aa122ee6b4a",
        comments: []
      },
      {
        title: 'Twin Towers part 2',
        description: 'Frodo andaaa the ring.',
        thumbnail: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/39/uktv-it-crowd-finale-moss.jpg?resize=480:*',
        recommended: [Object],
        _id: "619ec2d2b4321aa122ee6b51",
        comments: []
      },
      {
        title: 'Return of the Ging',
        description: 'The mountain of fire.',
        thumbnail: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/39/uktv-it-crowd-finale-moss.jpg?resize=480:*',
        recommended: [Object],
        _id: "619ec2f2b4321aa122ee6b61",
        comments: []
      },
      {
        title: 'Return of the Ging',
        description: 'The mountain of fire, in the pit of zoom htlkasjkdflakdsjfhahsdfoasdfuioqew quwh efioqawheodfjasdpfnasjdncanouiiehnfoanconaondsocnajsdmcn,masdc kaedsicbjwksD clasndcl asdmc as,DM clasmndlfjansdcna soND clsMNDcs zCKSKDJcbsKDJLnfbclasndflansdc S<.',
        thumbnail: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/39/uktv-it-crowd-finale-moss.jpg?resize=480:*',
        recommended: [Object],
        _id: "619ec5feb6534e655e5e9d37",
        comments: []
      }
    ]}
    ,{
        _id: "619eb197c5e49eb08ad4265a",
        firstName: 'Smokey',
        lastName: 'Littlecat',
        email: 'smokey17@gmail.com',
        password: "test",
        pendingconnection: [],
        connection: [
          {
            _id: "619eb63cc5e49eb08ad4265e",
            firstName: 'Ben',
            lastName: 'HOPKINS',
            email: 'bjhops17@gmail.com',
            password: 'test',
            pendingconnection: [Array],
            connection: [Array],
            recommended: [Array],
            readingList: [],
            __v: 0,
            usercurrent: [Object]
          }
        ],
        recommended: [
          {
            title: 'Twin Towers part 2',
            description: 'Frodo andaaa the ring.',
            thumbnail: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/39/uktv-it-crowd-finale-moss.jpg?resize=480:*',
            recommended: [Object],
            _id: "619eb8668b8c109220c42b47",
            comments: []
          },
          {
            title: 'Twin Towers part 2',
            description: 'Frodo andaaa the ring.',
            thumbnail: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/39/uktv-it-crowd-finale-moss.jpg?resize=480:*',
            recommended: [Object],
            _id: "619ec2d0b4321aa122ee6b3f",
            comments: []
          },
          {
            title: 'Twin Towers part 2',
            description: 'Frodo andaaa the ring.',
            thumbnail: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/39/uktv-it-crowd-finale-moss.jpg?resize=480:*',
            recommended: [Object],
            _id: "619ec2d1b4321aa122ee6b44",
            comments: []
          },
          {
            title: 'Twin Towers part 2',
            description: 'Frodo andaaa the ring.',
            thumbnail: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/39/uktv-it-crowd-finale-moss.jpg?resize=480:*',
            recommended: [Object],
            _id: "619ec2d2b4321aa122ee6b4a",
            comments: []
          },
          {
            title: 'Twin Towers part 2',
            description: 'Frodo andaaa the ring.',
            thumbnail: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/39/uktv-it-crowd-finale-moss.jpg?resize=480:*',
            recommended: [Object],
            _id: "619ec2d2b4321aa122ee6b51",
            comments: []
          },
          {
            title: 'Return of the Ging',
            description: 'The mountain of fire.',
            thumbnail: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/39/uktv-it-crowd-finale-moss.jpg?resize=480:*',
            recommended: [Object],
            _id: "619ec2f2b4321aa122ee6b61",
            comments: []
          },
          {
            title: 'Return of the Ging',
            description: 'The mountain of fire, in the pit of zoom htlkasjkdflakdsjfhahsdfoasdfuioqew quwh efioqawheodfjasdpfnasjdncanouiiehnfoanconaondsocnajsdmcn,masdc kaedsicbjwksD clasndcl asdmc as,DM clasmndlfjansdcna soND clsMNDcs zCKSKDJcbsKDJLnfbclasndflansdc S<.',
            thumbnail: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/39/uktv-it-crowd-finale-moss.jpg?resize=480:*',
            recommended: [Object],
            _id: "619ec5feb6534e655e5e9d37",
            comments: []
          }
        ]}]
try{
    User.create(data)
}catch(err){
    console.log(err)
}
        
const graphql = require('graphql');
const User = require('../models/userModel');
const Job = require('../models/jobModel');
const Contact = require('../models/contactModel');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// user
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    phonenumber: { type: GraphQLInt },
    jobs: { 
      type: new GraphQLList(JobType),
      resolve(parent, args) {
        // postgres query
        return Job.find()
      }
    }
  })
});

// jobs
const JobType = new GraphQLObjectType({
  name: 'Job',
  fields: () => ({
    id: { type: GraphQLString },
    companyname: { type: GraphQLString },
    title: { type: GraphQLString },
    dateapplied: { type: GraphQLString },
    linktojobs: { type: GraphQLString },
    description: { type: GraphQLString },
    notes: { type: GraphQLString },
    status: { type: GraphQLString },
    notifications: { type: GraphQLString }
  })
});

// contact
const ContactType = new GraphQLObjectType({
  name: 'Contact',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    compnay: { type: GraphQLString },
    email: { type: GraphQLString },
    phonenumber: { type: GraphQLInt },
    jobs: {
      type: new GraphQLList(JobType),
      resolve(parent, args) {
        // postgres query
        return Job.find()
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { UserId: { type: GraphQLString } },
      resolve(parent, args) {
        // postgres query
        return User.findById(args.UserId);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phonenumber: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        // postgres save user query
        let newUser = new User({
          username: args.username,
          password: args.password,
          email: args.email,
          phonenumber: args.phonenumber
        })
        return newUser.save();
      }
    },
    addJob: {
      type: JobType,
      args: {
        companyname: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        dateapplied: { type: new GraphQLNonNull(GraphQLString) },
        linktojobs: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        notes: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) },
        notifications: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parents, args) {
        // postgres save Job query
        let newJob = new Job({
          companyname: args.companyname,
          title: args.title,
          dateapplied: args.dateapplied,
          linktojobs: args.linktojobs,
          description: args.description,
          notes: args.notes,
          status: args.status,
          notifications: args.notifications
        })
        return newJob.save()
      }
    },
    addContact: {
      type: ContactType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        company: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phonenumber: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        // postgres save contact query
        let newContact = new Contact({
          name: args.name,
          company: args.company,
          email: args.email,
          phonenumber: args.phonenumber
        })
        return newContact.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
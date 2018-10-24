const graphql = require('graphql');
const User = require('../models/userModel');
const Job = require('../models/jobModel');
const Contact = require('../models/contactModel');
const connectionString = process.env.DB_URL;
const pgp = require('pg-promise')();
const db = {}
db.conn = pgp(connectionString);

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
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
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
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLInt },
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
      args: { UserId: { type: GraphQLID } },
      resolve(parent, args) {
        // postgres query
        query = `SELECT * FROM "public"."users" WHERE id=${args.UserId}`;
        return db.conn.one(query)
      }
    },
    allUsers: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        query = `SELECT * FROM "public"."users"`;
        return db.conn.many(query)
      }
    },
    allContacts: {
      type: new GraphQLList(ContactType),
      resolve(parent, args) {
        const query = `SELECT * FROM "public"."Contacts"`;
        return db.conn.many(query)
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
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        query = `INSERT INTO "public"."users" ("firstName", "lastName", "createdAt", "updatedAt") VALUES ('${args.firstName}', '${args.lastName}', '2018-10-23 01:09:38 +0000', '2018-10-23 01:09:38 +0000')`;
        return db.conn.one(query);
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
const graphql = require('graphql');
const User = require('../models/userModel');
const Application = require('../models/applicationModel');
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
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLInt },
    applications: { 
      type: ApplicationsType,
      resolve(parent, args) {
        // postgres query
        console.log(parent.id)
        applicationQuery = `SELECT * FROM "public"."Applications" WHERE "UserId"=${parent.id}`
        return db.conn.one(applicationQuery)
      }
    }
  })
});

// applications
const ApplicationsType = new GraphQLObjectType({
  name: 'Application',
  fields: () => ({
    id: { type: GraphQLString },
    companyName: { type: GraphQLString },
    title: { type: GraphQLString },
    dateApplied: { type: GraphQLString },
    link: { type: GraphQLString },
    description: { type: GraphQLString },
    notes: { type: GraphQLString },
    status: { type: GraphQLString },
    notification: { type: GraphQLString },
    contactId: { type: GraphQLString },
    UserId: { type: GraphQLString },
    contact: { 
      type: ContactType,
      resolve(parent, args) {
        // postgres query
        console.log(parent.id)
        applicationQuery = `SELECT * FROM "public"."Contacts" WHERE id=${parent.contactId}`
        return db.conn.one(applicationQuery)
      }
    }
  })
});

// contact
const ContactType = new GraphQLObjectType({
  name: 'Contact',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLInt },
    applications: {
      type: new GraphQLList(ApplicationsType),
      resolve(parent, args) {
        // postgres query
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { UserName: { type: GraphQLString } },
      resolve(parent, args) {
        // postgres query
        query = `SELECT * FROM "public"."Users" WHERE "firstName"='${args.UserName}'`;
        return db.conn.one(query)
      }
    },
    allUsers: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        query = `SELECT * FROM "public"."Users"`;
        return db.conn.many(query)
      }
    },
    conatact: {
      type: ContactType,
      args: { ContactId: {type: GraphQLID} },
      resolve(parent, args) {
        query = `SELECT * FROM "public"."Contacts" WHERE id=${args.ContactId}`;
        return db.conn.one(query);
      }
    },
    allContacts: {
      type: new GraphQLList(ContactType),
      resolve(parent, args) {
        const query = `SELECT * FROM "public"."Contacts"`;
        return db.conn.many(query)
      }
    },
    application: {
      type: ApplicationsType,
      args: { ApplicationsId: {type: GraphQLID} },
      resolve(parent, args) {
        query = `SELECT * FROM "public"."Applications" WHERE id=${args.ApplicationsId}`;
        return db.conn.one(query);
      }
    },
    allApplications: {
      type: new GraphQLList(ApplicationsType),
      resolve(parent, args) {
        query = `SELECT * FROM "public"."Applications"`
        return db.conn.many(query);
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
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        query = `INSERT INTO "public"."Users" ("firstName", "lastName", "password", "email", "phone", "createdAt", "updatedAt") VALUES ('${args.firstName}', '${args.lastName}', '${args.password}', '${args.email}', '${args.phone}', '2018-10-23 01:09:38 +0000', '2018-10-23 01:09:38 +0000')`;
        return db.conn.one(query);
      }
    },
    addApplication: {
      type: ApplicationsType,
      args: {
        companyName: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        dateApplied: { type: new GraphQLNonNull(GraphQLString) },
        link: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        notes: { type: new GraphQLNonNull(GraphQLString) },
        contact: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parents, args) {
        query = `INSERT INTO "public"."Applications" ("companyName", "title", "dateApplied", "link", "description", "notes", "contact", "createdAt", "updatedAt") VALUES ('${args.companyName}', '${args.title}', '${args.dateApplied}', '${args.link}', '${args.description}', '${args.notes}', '${args.contact}' , '2018-10-23 01:09:38 +0000', '2018-10-23 01:09:38 +0000')`;
        return db.conn.one(query);
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
import { gql } from 'graphql-tag';


export const CONTRIBUTORS = gql`
         # github graphql query to get more details
         query getRepoContributors(
           $repoowner: String!
           $reponame: String!
           $first: Int
           $after: String
         ) {
           repository(owner: $repoowner, name: $reponame) {
             nameWithOwner

             # get the repo collaborators

             collaborators(first: $first, after: $after) {
               edges {
                 node {
                   avatarUrl
                   email
                   name
                   bio
                   company
                 }
               }
               pageInfo {
                 endCursor
                 hasNextPage
                 hasPreviousPage
                 startCursor
               }
               totalCount
             }
             # end of collaborators
           }
         }
       `;

export const VUNERABILITIES = gql`
         # github graphql query to get more details
         query getRepoVunerabilities(
           $repoowner: String!
           $reponame: String!
           $first: Int
           $after: String
         ) {
           repository(owner: $repoowner, name: $reponame) {
             nameWithOwner

             # gets the repo vunerabilities

             vulnerabilityAlerts(first: $first, after: $after) {
               edges {
                 node {
                   createdAt
                   securityAdvisory {
                     classification
                     description
                     vulnerabilities(first: $first, after: $after) {
                       edges {
                         node {
                           severity
                           package {
                             name
                             ecosystem
                           }
                         }
                       }
                       pageInfo {
                         endCursor
                         hasNextPage
                         hasPreviousPage
                         startCursor
                       }
                       totalCount
                     }
                   }
                 }
               }
             }
             #   end of vunerabilities block
           }
         }
       `;

export const REPOREFS = gql`
         # github graphql query to get more details
         query getRepoRefs(
           $repoowner: String!
           $reponame: String!
           $first: Int
           $after: String
           $firstcommits: Int
           $$aftercommits: String
         ) {
           repository(owner: $repoowner, name: $reponame) {
             nameWithOwner

             #refs: get branches and all the recent commits to it

             refs(
               refPrefix: "refs/heads/"
               orderBy: { direction: DESC, field: TAG_COMMIT_DATE }
               first: $first
               after: $after
             ) {
               edges {
                 node {
                   name
                   id
                   target {
                     ... on Commit {
                       history(first: $firstcommits, after: $aftercommits) {
                         edges {
                           node {
                             committedDate
                             author {
                               name
                               email
                             }
                             message
                             url
                             pushedDate
                             authoredDate
                             committedDate
                           }
                         }
                       }
                     }
                   }
                 }
               }
               pageInfo {
                 endCursor
                 hasNextPage
                 hasPreviousPage
                 startCursor
               }
               totalCount
             }

             # end of refs block
           }
         }
       `;

export const PULLREQUESTS = gql`
         # github graphql query to get more details
         query getRepoPullRequests(
           $repoowner: String!
           $reponame: String!
           $first: Int
           $after: String
           $firstpulls: Int
           $afterpulls: String
         ) {
           repository(owner: $repoowner, name: $reponame) {
             nameWithOwner

             #refs: get branches and all the recent PRs to it

             refs(
               refPrefix: "refs/heads/"
               orderBy: { direction: DESC, field: TAG_COMMIT_DATE }
               first: $first
               after: $after
             ) {
               nodes {
                 associatedPullRequests(first: $firstpulls, after: $$afterpulls) {
                   nodes {
                     baseRefName
                     headRef {
                       name
                       repository {
                         name
                       }
                     }
                     author {
                       login
                     }
                     body
                   }
                   pageInfo {
                     endCursor
                     hasNextPage
                     hasPreviousPage
                     startCursor
                   }
                   totalCount
                 }
               }
             }

             # end of PRs block
           }
         }
       `;

export const LANGUAGES = gql`
         # github graphql query to get more details
         query getRepoLanguages(
           $repoowner: String!
           $reponame: String!
           $first: Int
           $after: String
         ) {
           repository(owner: $repoowner, name: $reponame) {
             nameWithOwner

             # languages block
             languages(first: $first, after: $after) {
               edges {
                 node {
                   id
                   color
                   name
                 }
               }
               pageInfo {
                 endCursor
                 hasNextPage
                 hasPreviousPage
                 startCursor
               }
               totalCount
             }

             # end of languages block
           }
         }
       `;

export const FORKS = gql`
         # github graphql query to get more details
         query getRepoForks(
           $repoowner: String!
           $reponame: String!
           $first: Int
           $after: String
         ) {
           repository(owner: $repoowner, name: $reponame) {
             nameWithOwner

             #fork block
             forkCount
             forks(first: $first, after: $after) {
               edges {
                 node {
                   createdAt
                   nameWithOwner
                   description
                   url
                   owner {
                     login
                     url
                   }
                   parent {
                     url
                     owner {
                       login
                       url
                     }
                   }
                 }
               }
               pageInfo {
                 endCursor
                 hasNextPage
                 hasPreviousPage
                 startCursor
               }
               totalCount
             }
             # end of fork block
           }
         }
       `;

export const STARGAZERS = gql`
         # github graphql query to get more details
         query getRepoStars(
           $repoowner: String!
           $reponame: String!
           $first: Int
           $after: String
         ) {
           repository(owner: $repoowner, name: $reponame) {
             nameWithOwner

             # star block
             stargazers(first: $first, after: $after) {
               edges {
                 node {
                   login
                   url
                 }
               }
               pageInfo {
                 endCursor
                 hasNextPage
                 hasPreviousPage
                 startCursor
               }
               totalCount
             }
             #end of star block
           }
         }
       `;

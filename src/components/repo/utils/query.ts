import gql from "graphql-tag";


export const REPOSWITHOUTRECENTCOMMIT = gql`
         query getRepos($name: String!, $first: Int, $after: String) {
           user(login: $name) {
             login
             repositories(
               after: $after
               first: $first
               orderBy: { field: PUSHED_AT, direction: DESC }
             ) {
               edges {
                 node {
                   id
                   name
                   description
                   pushedAt
                   diskUsage
                   url
                   visibility
                   forkCount

                   languages(first: $first) {
                     edges {
                       node {
                         id
                         color
                         name
                       }
                     }
                   }
                 }
                 cursor
               }
               totalCount
               pageInfo {
                 startCursor
                 endCursor
                 hasNextPage
                 hasPreviousPage
               }
             }
           }
         }
       `;


const RECENTREPOCOMMIT = gql`
  query getRepoRecentCommit {
    repository(owner: "tigawanna", name: "gitpals") {
      defaultBranchRef {
        name
        target {
          ... on Commit {
            history(first: 1) {
              edges {
                node {
                  committedDate
                  author {
                    name
                  }
                  message
                }
              }
            }
          }
        }
      }
    }
  }
`;


export const REPOS = gql`
         query getRepos($name: String!, $first: Int, $after: String) {
           user(login: $name) {
             login
             repositories(
               after: $after
               first: $first
               orderBy: { field: PUSHED_AT, direction: DESC }
             ) {
               edges {
                 node {
                   id,
                   name,
                   description,
                   pushedAt,
                   diskUsage,
                   url,
                   visibility,
                   forkCount,
                   stargazers(first: $first) {
                   totalCount
                   },
                   refs(
                     refPrefix: "refs/heads/"
                     orderBy: { direction: DESC, field: TAG_COMMIT_DATE }
                     first: 2
                   ) {
                     edges {
                       node {
                         name
                         id
                         target {
                           ... on Commit {
                             history(first: 1) {
                               edges {
                                 node {
                                   committedDate
                                   author {
                                     name
                                   }
                                   message
                                 }
                               }
                             }
                           }
                         }
                       }
                     }
                   }

                   languages(first: $first) {
                     edges {
                       node {
                         id
                         color
                         name
                       }
                     }
                   }
                 }
                 cursor
               }
               totalCount
               pageInfo {
                 startCursor
                 endCursor
                 hasNextPage
                 hasPreviousPage
               }
             }
           }
         }
       `;




const FULLREPO = gql`
# github graphql query to get more details  
  query getRepoDetails(
    $repoowner: String!,
    $reponame: String!,
    $first: Int,
    $after: String,
  ) {
    repository(owner: $repoowner, name: $reponame) {
    nameWithOwner,

      # get the repo collaborators

      collaborators(first: $first, after: $after) {
        edges {
          node {
            avatarUrl,
            email,
            name,
            bio,
            company
          },
        },
        pageInfo {
          endCursor,
          hasNextPage,
          hasPreviousPage,
          startCursor
        },
        totalCount
      }
      # end of collaborators

      # gets the repo vunerabilities

      vulnerabilityAlerts(first: $first, after: $after) {
        edges {
          node {
            createdAt,
            securityAdvisory {
              classification,
              description,
              vulnerabilities(first: $first, after: $after) {
                edges {
                  node {
                    severity,
                    package {
                      name,
                      ecosystem
                    }
                  }
                },
                pageInfo {
                  endCursor
                  hasNextPage
                  hasPreviousPage
                  startCursor
                },
                totalCount
              }
            }
          }
        }
      },
      #   end of vunerabilities block

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
                history(first: $first, after: $after) {
                  edges {
                    node {
                      committedDate,
                      author {
                        name,
                        email
                      },
                      message,
                      url,
                      pushedDate,
                      authoredDate,
                      committedDate
                    }
                  }
                }
              }
            }
          }
        },
        pageInfo {
          endCursor,
          hasNextPage,
          hasPreviousPage,
          startCursor,
        },
        totalCount
        nodes {
          associatedPullRequests(first: $first, after: $after) {
            pageInfo {
              endCursor,
              hasNextPage,
              hasPreviousPage,
              startCursor,
            },
            totalCount
          }
        }
      }

      # end of refs block
      # languages
      languages(first: $first, after: $after) {
        edges {
          node {
            id,
            color,
            name
          }
        },
        pageInfo {
          endCursor,
          hasNextPage,
          hasPreviousPage,
          startCursor
        },
        totalCount
      }

      # end of languages block
      forkCount
      #fork block
      forks(first: $first, after: $after) {
        edges {
          node {
            createdAt,
            nameWithOwner,
            description,
            url,
            owner {
              login,
              url
            },
            parent {
              url,
              owner {
                login,
                url
              }
            }
          }
        }
        pageInfo {
          endCursor,
          hasNextPage,
          hasPreviousPage,
          startCursor,
        },
        totalCount
      }
      # end of fork block

      # star block
      stargazers(first: $first, after: $after) {
        edges {
          node {
            login,
            url
          }
        }
        pageInfo {
          endCursor,
          hasNextPage,
          hasPreviousPage,
          startCursor
        }
        totalCount
      }
      #end of star block
    }
  }
`;

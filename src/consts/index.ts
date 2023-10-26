export const URL = 'https://vortex.korabli.su/api/graphql/glossary/';
export const QUERY = `
          query {
            vehicles {
              id
              title
              type {
                name
                title
                icons {
                  default
                }
              }
              nation {
                name
                title
                color
                icons {
                  small
                }
              }
              level
              description
              icons {
                medium
              }
            }
          }
      `;

export const URL = 'https://vortex.korabli.su/api/graphql/glossary/';
export const QUERY = `
          query {
            vehicles {
              name
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

export const DEFAULT_MIN_STATE = 1;
export const DEFAULT_MAX_STATE = 5;

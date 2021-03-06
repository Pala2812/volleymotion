import { Player, Tag, Team } from "@volleymotion/models";
import { firestore } from "firebase-admin";

export const getTagsAudit = (team: Team, player: Player, values: Tag[], fieldValue: firestore.FieldValue) => {
    let result = {};
    values.forEach((tag) => {
      result = {
        [team?.division]: {
          [team?.sportType]: {
            [team?.teamType]: {
              [player?.position]: {
                [tag.id]: {
                  name: tag?.name,
                  counter: fieldValue
                }
              }
            }
          }
        },
  
        [team?.division]: {
          [team?.teamType]: {
            [team?.sportType]: {
              [player?.position]: {
                [tag.id]: {
                  name: tag?.name,
                  counter: fieldValue
                }
              }
            }
          }
        },
  
        [team?.sportType]: {
          [team?.division]: {
            [team?.teamType]: {
              [player?.position]: {
                [tag.id]: {
                  name: tag?.name,
                  counter: fieldValue
                }
              }
            }
          }
        },
  
        [team?.sportType]: {
          [team?.teamType]: {
            [team?.division]: {
              [player?.position]: {
                [tag.id]: {
                  name: tag?.name,
                  counter: fieldValue
                }
              }
            }
          }
        },
  
        [team?.teamType]: {
          [team?.division]: {
            [team?.sportType]: {
              [player?.position]: {
                [tag.id]: {
                  name: tag?.name,
                  counter: fieldValue
                }
              }
            }
          }
        },
  
        [team?.teamType]: {
          [team?.sportType]: {
            [team?.division]: {
              [player?.position]: {
                [tag.id]: {
                  name: tag?.name,
                  counter: fieldValue
                }
              }
            }
          }
        },
  
        sum: {
          [tag?.id]: {
            name: tag?.name,
            counter: fieldValue,
          }
        }
      };
    });
    return result;
  }
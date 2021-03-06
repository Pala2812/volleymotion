import { Player, Tag, Team } from "@volleymotion/models";
import { firestore } from "firebase-admin";

export const getTagsAudit = (team: Team, player: Player, values: Tag[], fieldValue: firestore.FieldValue) => {
    let result = {};
    values.forEach((tag) => {
        result = {
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
export const DBConfig = {
  name: "hockeySchema",
  version: 1,
  objectStoresMeta: [
    {
      store: "clubTeams",
      storeConfig: { keyPath: "id", autoIncrement: false },
      storeSchema: [
        { name: "id", keypath: "id", options: { unique: true } },
        { name: "name", keypath: "name", options: { unique: false } },
        { name: "type", keypath: "type", options: { unique: false } },
        // [],
      ],
    },
    {
      store: "matches",
      storeConfig: { keyPath: "id", autoIncrement: false },
      storeSchema: [
        { name: "id", keypath: "id", options: { unique: true } },
        { name: "datetime", keypath: "datetime", options: { unique: false } },
        { name: "field", keypath: "field", options: { unique: false } },
        {
          name: "home_team_id",
          keypath: "home_team_id",
          options: { unique: false },
        },
        {
          name: "home_team_name",
          keypath: "home_team_name",
          options: { unique: false },
        },
        {
          name: "home_team_logo",
          keypath: "home_team_logo",
          options: { unique: false },
        },
        {
          name: "home_team_score",
          keypath: "home_team_score",
          options: { unique: false },
        },
        {
          name: "away_team_id",
          keypath: "away_team_id",
          options: { unique: false },
        },
        {
          name: "away_team_name",
          keypath: "away_team_name",
          options: { unique: false },
        },
        {
          name: "away_team_logo",
          keypath: "away_team_logo",
          options: { unique: false },
        },
        {
          name: "away_team_score",
          keypath: "away_team_score",
          options: { unique: false },
        },
        // [],
      ],
    },
  ],
};

export default DBConfig;

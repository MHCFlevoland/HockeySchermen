export const DBConfig = {
  name: "hockeySchema",
  version: 3,
  objectStoresMeta: [
    {
      store: "matches",
      storeConfig: { keyPath: "id", autoIncrement: false },
      storeSchema: [
        { name: "id", keypath: "id", options: { unique: true } },
        { name: "datetime", keypath: "datetime", options: { unique: false } },
        { name: "field", keypath: "field", options: { unique: false } },
        { name: "status", keypath: "status", options: { unique: false } },
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
          name: "away_team_name",
          keypath: "away_team_name",
          options: { unique: false },
        },
        {
          name: "away_team_logo",
          keypath: "away_team_logo",
          options: { unique: false },
        },
      ],
    },
  ],
};

export default DBConfig;

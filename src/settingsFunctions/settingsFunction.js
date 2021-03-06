import {
  salvarConfigs,
  updateConfigs,
  getConfigs,
} from "../database/stylesSettingsOnFirebase";

let userConfigurationInformation = {};

const saveConfigs = async () => {
  if (userConfigurationInformation.id === undefined) {
    await salvarConfigs(userConfigurationInformation);

    userConfigurationInformation = await getConfigs(
      userConfigurationInformation.user
    );
  } else {
    updateConfigs(userConfigurationInformation);
  }
};

export const organizeByScheme = (data, scheme, userConfiguration) => {
  userConfigurationInformation.theme = userConfiguration.theme;
  userConfigurationInformation.organization = userConfiguration.organization;
  userConfigurationInformation.user = userConfiguration.user;

  if (userConfiguration.id) {
    userConfigurationInformation.id = userConfiguration.id;
  }

  applyTheme(userConfiguration.theme, userConfiguration);

  saveConfigs();

  switch (scheme) {
    case "byTitle":
      return organizeByTitle(data);
    case "byChecks":
      return organizeByChecks(data);
    case "byDate":
      return organizedByDate(data);
    default:
      return data;
  }
};

const organizeByTitle = (data) => {
  const dataOrganizedByTitle = data.sort((element1, element2) => {
    return element1.title.localeCompare(element2.title);
  });

  const newArray = dataOrganizedByTitle.map((dataItem) => dataItem);

  return newArray;
};

const organizeByChecks = (data) => {
  const dataOrganizedByChecks = data.sort(
    (elemento1, elemento2) =>
      elemento1.checkList.length - elemento2.checkList.length
  );

  const newArray = dataOrganizedByChecks.map((dataItem) => dataItem);

  return newArray;
};

const organizedByDate = (data) => {
  data.sort(function (a, b) {
    const convertDate = (d) =>
      d ? new Date(d.split("-").reverse().join(",")) : new Date();

    return convertDate(a.date).getTime() - convertDate(b.date).getTime();
  });

  return data.map((element) => element);
};

//theme

export const applyTheme = (theme, userConfiguration) => {
  userConfigurationInformation.theme = userConfiguration.theme;
  userConfigurationInformation.organization = userConfiguration.organization;
  userConfigurationInformation.user = userConfiguration.user;

  saveConfigs();

  const themeStyle = document.documentElement.style;

  if (theme === "dark") {
    themeStyle.setProperty("--colorBackground", "#222");
    themeStyle.setProperty("--colorBackgroundCard", "#333");
    themeStyle.setProperty("--colorFontPrimary", "chartreuse");
    themeStyle.setProperty("--colorFontSecondary", "#fff");
    themeStyle.setProperty("--colorAddMoreCheck", "#666");
    themeStyle.setProperty("--colorBackgroundLine", "#444");
    themeStyle.setProperty("--colorFontDisabled", "#777");
  } else if (theme === "clear") {
    themeStyle.setProperty("--colorBackground", "rgb(220, 220, 220)");
    themeStyle.setProperty("--colorBackgroundCard", "rgb(250, 250, 250)");
    themeStyle.setProperty("--colorFontPrimary", "rgb(46, 93, 50)");
    themeStyle.setProperty("--colorFontSecondary", "#000");
    themeStyle.setProperty("--colorAddMoreCheck", "#666");
    themeStyle.setProperty("--colorBackgroundLine", "rgb(220, 240, 240)");
    themeStyle.setProperty("--colorFontDisabled", "#999");
  } else if (theme === "darkPink") {
    themeStyle.setProperty("--colorBackground", "#BB7395");
    themeStyle.setProperty("--colorBackgroundCard", "#d4b2d8");
    themeStyle.setProperty("--colorFontPrimary", "#190e4f");
    themeStyle.setProperty("--colorFontSecondary", "#826cf");
    themeStyle.setProperty("--colorAddMoreCheck", "#666");
    themeStyle.setProperty("--colorBackgroundLine", "#A88FAC");
    themeStyle.setProperty("--colorFontDisabled", "#777");
  }
};

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styles from "./styles/InputTabs.module.css";
import { QuoteRequestState } from "./QuoteInterface";
import { DesignTypes } from "./DesignTypes";
import { QuantityFields } from "./QuantityFields";
import { ScreenPrintOptions } from "./ScreenPrintOptions";
import { EmbroideryOptions } from "./EmbroideryOptions";
import { DyeSubOptions } from "./DyeSubOptions";

type InputTabsProps = {
  state: QuoteRequestState;
  setState: (newState: QuoteRequestState) => void;
  anyError: boolean;
};

export function InputTabs({ state, setState, anyError }: InputTabsProps) {
  const { designType } = state;
  const optionsAvailable = designType !== "DTF" && !anyError;

  return (
    //? May need to provide Tabs with a reference to the iframe?
    <Tabs
      className={styles["main"]}
      selectedTabClassName={styles["selected-tab"]}
      disabledTabClassName={styles["disabled-tab"]}
      selectedTabPanelClassName={styles["selected-tab-panel"]}
    >
      <TabList className={styles["tab-list"]}>
        <Tab className={styles["tab"]}>Decoration Type</Tab>
        <Tab className={styles["tab"]}>Quantities</Tab>
        <Tab className={styles["tab"]} disabled={!optionsAvailable}>
          Options
        </Tab>
      </TabList>

      <TabPanel className={styles["tab-panel"]}>
        <DesignTypes state={state} setState={setState} />
      </TabPanel>
      <TabPanel className={styles["tab-panel"]}>
        <QuantityFields state={state} setState={setState} />
      </TabPanel>
      <TabPanel className={styles["tab-panel"]}>
        {designType === "Screen Print" && (
          <ScreenPrintOptions state={state} setState={setState} />
        )}
        {designType === "Embroidery" && (
          <EmbroideryOptions state={state} setState={setState} />
        )}
        {designType === "Dye Sublimation" && (
          <DyeSubOptions state={state} setState={setState} />
        )}
      </TabPanel>
    </Tabs>
  );
}

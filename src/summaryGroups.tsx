import { SummaryOperand } from "igniteui-react-core";
import {
  IgrColumnGroupDescription,
  IgrColumnSummaryDescription
} from "igniteui-react-grids";

export const summaryGroup = (): any => {
  const developerGroup = new IgrColumnGroupDescription();
  developerGroup.field = "trigrammeDev";
  developerGroup.displayName = "Developer";

  const peopleCount = new IgrColumnSummaryDescription();
  peopleCount.field = "trigrammeDev";
  peopleCount.operand = SummaryOperand.Count;

  const consomeParDevSum = new IgrColumnSummaryDescription();
  consomeParDevSum.field = "consomeParDev";
  consomeParDevSum.operand = SummaryOperand.Sum;

  const consomeParAutreSum = new IgrColumnSummaryDescription();
  consomeParAutreSum.field = "consomeParAutre";
  consomeParAutreSum.operand = SummaryOperand.Sum;

  const consomeTotalSum = new IgrColumnSummaryDescription();
  consomeTotalSum.field = "consomeTotal";
  consomeTotalSum.operand = SummaryOperand.Sum;

  const ratioAnoDevAvg = new IgrColumnSummaryDescription();
  ratioAnoDevAvg.field = "ratioAnoDev";
  ratioAnoDevAvg.operand = SummaryOperand.Average;
  ratioAnoDevAvg.maxFractionDigits = 2;

  const deriveAvg = new IgrColumnSummaryDescription();
  deriveAvg.field = "derive";
  deriveAvg.operand = SummaryOperand.Average;
  deriveAvg.maxFractionDigits = 2;

  const summaryGroup: any = {
    developerGroup,
    peopleCount,
    consomeParDevSum,
    consomeParAutreSum,
    consomeTotalSum,
    ratioAnoDevAvg,
    deriveAvg
  };
  return (summaryGroup);
};
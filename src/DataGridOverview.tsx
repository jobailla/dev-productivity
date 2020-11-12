import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { IgrSparklineModule } from "igniteui-react-charts";
import {
    IgrDataGrid,
    IgrDataGridModule,
    IgrDataGridToolbar,
    IgrDataGridToolbarModule,
    IgrGridColumnOptionsModule,
    IgrTemplateColumn,
    IgrTextColumn
} from "igniteui-react-grids";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import DataGridSharedData from "./DataGridSharedData";
import "./DataGridStyles.css";
import {
    getConsomeParAutre,
    getConsomeParDev,
    getConsomeTotal,
    getDerive,
    getEntreprise,
    getRatioAnoDev,
    getVersion
} from "./getColumns";
import { summaryGroup } from "./summaryGroups";

IgrDataGridModule.register();
IgrDataGridToolbarModule.register();
IgrGridColumnOptionsModule.register();
IgrSparklineModule.register();

export default function DataGridOverview(): ReactElement {
    const [state, setState] = useState({
        merge: true,
    });
    const [data, setData] = useState(DataGridSharedData(state.merge));
    let mainGrid: IgrDataGrid;
    let mainToolbar: IgrDataGridToolbar;
    const onGridRef = (grid: IgrDataGrid) => {
        if (!grid) { return; }

        mainGrid = grid;
        mainGrid.actualDataSource.isSectionExpandedDefault = true;

        if (mainToolbar !== null) {
            mainToolbar.targetGrid = mainGrid;
        }
    };

    const onToolbarRef = (toolbar: IgrDataGridToolbar) => {
        mainToolbar = toolbar;
        if (mainToolbar !== null) {
            mainToolbar.targetGrid = mainGrid;
        }
    };

    const handleChange = (event: any) => {
        setState({ ...state, merge: event.target.checked });
    };

    const createSummaryGroup = (): void => {
        const {
            developerGroup,
            peopleCount,
            consomeParDevSum,
            consomeParAutreSum,
            consomeTotalSum,
            ratioAnoDevAvg,
            deriveAvg
        } = summaryGroup();
        const { summaryDescriptions, groupDescriptions } = mainGrid;

        summaryDescriptions.add(deriveAvg);
        summaryDescriptions.add(ratioAnoDevAvg);
        summaryDescriptions.add(consomeTotalSum);
        summaryDescriptions.add(consomeParAutreSum);
        summaryDescriptions.add(consomeParDevSum);
        summaryDescriptions.add(peopleCount);
        if (!(state.merge)) {
            groupDescriptions.add(developerGroup);
        }
    };

    const usePrevious = (value: any): undefined => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };

    const prevState: any = usePrevious({ state });

    useEffect((): void => {
        if (prevState !== state.merge) {
            setData(DataGridSharedData(state.merge));
        }
        if (state.merge) {
            mainGrid.groupDescriptions.clear();
        }
        createSummaryGroup();
    }, [state]);

    return (
        <>
            <div className="igContainer">
                <IgrDataGridToolbar
                    ref={onToolbarRef}
                    toolbarTitle="Dev productivité"
                    columnChooser="true"
                    columnPinning="true"
                />
                <FormControlLabel
                    className="mergeSwitch"
                    control={<Switch color="primary" checked={state.merge} onChange={handleChange} />}
                    label="merge"
                />
                <IgrDataGrid
                    ref={onGridRef}
                    height="calc(100% - 2.75rem)"
                    width="100%"
                    rowHeight="25"
                    autoGenerateColumns="false"
                    dataSource={data}
                    defaultColumnMinWidth="100"
                    summaryScope="Root"
                    isColumnOptionsEnabled="true"
                    isGroupExpandedDefault="true"
                    isGroupCollapsable="true"
                    groupHeaderDisplayMode="Combined"
                    groupSummaryDisplayMode="RowBottom"
                    columnMovingMode="Deferred"
                    columnMovingAnimationMode="SlideOver"
                    columnMovingSeparatorWidth="2"
                    columnShowingAnimationMode="None"
                    columnHidingAnimationMode="None"
                    selectionMode="SingleRow"
                    cornerRadiusTopLeft="0"
                    cornerRadiusTopRight="0"
                    headerTextColor="#757ce8">

                    <IgrTextColumn field="trigrammeDev" width="*>100" />

                    <IgrTemplateColumn field="entreprise" headerText="enteprise"
                        horizontalAlignment="left" width="*>100"
                        template={getEntreprise} />

                    <IgrTemplateColumn field="version"
                        horizontalAlignment="left" width="*>100"
                        template={getVersion}
                        isHidden={state.merge}
                    />

                    <IgrTemplateColumn field="consomeParDev"
                        horizontalAlignment="left" width="*>100"
                        template={getConsomeParDev} />

                    <IgrTemplateColumn field="consomeParAutre"
                        horizontalAlignment="left" width="*>100"
                        template={getConsomeParAutre} />

                    <IgrTemplateColumn field="consomeTotal"
                        horizontalAlignment="left" width="*>100"
                        template={getConsomeTotal} />

                    <IgrTemplateColumn field="ratioAnoDev"
                        horizontalAlignment="left" width="*>100"
                        template={getRatioAnoDev} />

                    <IgrTemplateColumn field="derive"
                        horizontalAlignment="left" width="*>100"
                        template={getDerive} />

                </IgrDataGrid>
            </div>
        </>
    );
}
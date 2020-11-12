import {
  IgrTemplateCellInfo,
  IgrTemplateCellUpdatingEventArgs,
  IIgrCellTemplateProps
} from "igniteui-react-grids";
import React from "react";

export const getEntreprise = (props: IIgrCellTemplateProps, e: IgrTemplateCellUpdatingEventArgs): any => {
  const info = props.dataContext as IgrTemplateCellInfo;
  return (
    <div>
      {
        info.rowItem.logo ?
          <div style={{ paddingTop: "0px" }}>
            <img width="50px" src={info.rowItem.logo} alt={info.rowItem.entreprise} />
          </div>
          :
          <div>
            {info.rowItem.entreprise}
          </div>
      }
    </div>
  );
};

export const getVersion = (props: IIgrCellTemplateProps, e: IgrTemplateCellUpdatingEventArgs): any => {
  const info = props.dataContext as IgrTemplateCellInfo;

  const { version } = info.rowItem;
  return (
    <div style={{ fontFamily: "Verdana", fontSize: "12px" }}>
      {version}
    </div>
  );
};

export const getConsomeParDev = (props: IIgrCellTemplateProps, e: IgrTemplateCellUpdatingEventArgs): any => {
  const info = props.dataContext as IgrTemplateCellInfo;

  const { consomeParDev } = info.rowItem;
  return (
    <div style={{ fontFamily: "Verdana", fontSize: "12px" }}>
      {consomeParDev?.toFixed(2)} {consomeParDev > 1 ? " jours" : " jour"}
    </div>
  );
};

export const getConsomeParAutre = (props: IIgrCellTemplateProps, e: IgrTemplateCellUpdatingEventArgs): any => {
  const info = props.dataContext as IgrTemplateCellInfo;
  const { consomeParAutre, consomeParDev } = info.rowItem;
  return (
    <div style={{ color: consomeParAutre >= consomeParDev ? "red" : "green", fontFamily: "Verdana", fontSize: "12px" }}>
      {consomeParAutre?.toFixed(2)} {consomeParAutre > 1 ? " jours" : " jour"}
    </div>
  );
};

export const getConsomeTotal = (props: IIgrCellTemplateProps, e: IgrTemplateCellUpdatingEventArgs): any => {
  const info = props.dataContext as IgrTemplateCellInfo;
  const { consomeTotal } = info.rowItem;
  return (
    <div style={{ fontFamily: "Verdana", fontSize: "12px" }}>
      {consomeTotal?.toFixed(2)} {consomeTotal > 1 ? " jours" : " jour"}
    </div>
  );
};

export const getRatioAnoDev = (props: IIgrCellTemplateProps, e: IgrTemplateCellUpdatingEventArgs): any => {
  const info = props.dataContext as IgrTemplateCellInfo;
  const { ratioAnoDev, avgRatioAnoDev } = info.rowItem;
  return (
    <div style={{ color: ratioAnoDev >= avgRatioAnoDev ? "red" : "green", fontFamily: "Verdana", fontSize: "12px" }}>
      {ratioAnoDev?.toFixed(2) + " %"}
    </div>
  );
};

export const getDerive = (props: IIgrCellTemplateProps, e: IgrTemplateCellUpdatingEventArgs): any => {
  const info = props.dataContext as IgrTemplateCellInfo;
  const { derive } = info.rowItem;
  return (
    <div style={{ color: derive >= 0 ? "red" : "green", fontFamily: "Verdana", fontSize: "12px" }}>
      {derive?.toFixed(2)} {derive > 1 || derive < -1 ? "jours" : " jour"}
    </div>
  );
};
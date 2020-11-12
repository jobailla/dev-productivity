import data from "./data/DEV003-Productivite_dev.json";

interface Data {
  trigrammeDev: string;
  entreprise: string;
  version: string;
  "Tide-Data": [
    {
      "1-consommeParDev": number;
      "2-consommeParAutre": number;
      "3-consommeTotal": number;
      "4-consommeAno": number;
      "5-ratioAnoDev": number;
      "6-derive": number;
    }
  ];
}

interface Person {
  trigrammeDev: string;
  entreprise: string;
  logo: string;
  version: string;
  consomeParDev: number;
  consomeParAutre: number;
  consomeTotal: number;
  consomeAno: number;
  avgRatioAnoDev: number;
  ratioAnoDev: number;
  derive: number;
}

function haveLogo(entreprise: string): 1 | 0 {
  const entrepriseHaveLogo: string[] | undefined 
  = process.env.REACT_APP_ENTREPRISE?.split(" ");
  return entrepriseHaveLogo?.includes(entreprise) ? 1 : 0;
}

function getLogoUrl(entreprise: any): any {
  return haveLogo(entreprise)
    ? "./logos/" + entreprise.toUpperCase().replace(/\s/g, "") + ".png"
    : null;
}

function getPerson(data: Data, i: number): Person {
  const consomeParDev = data["Tide-Data"][0]["1-consommeParDev"];
  const consomeParAutre = data["Tide-Data"][0]["2-consommeParAutre"];
  const consomeTotal = data["Tide-Data"][0]["3-consommeTotal"];
  const consomeAno = data["Tide-Data"][0]["4-consommeAno"];
  const ratioAnoDev = data["Tide-Data"][0]["5-ratioAnoDev"] * 100;
  const derive = data["Tide-Data"][0]["6-derive"];
  let sum = 0;

  sum += ratioAnoDev;

  const avgRatioAnoDev = sum / (i + 1);
  const person: Person = {
    trigrammeDev: data.trigrammeDev,
    entreprise: data.entreprise.replace(/\ /g, "-"),
    logo: getLogoUrl(data.entreprise),
    version: data.version.toLocaleUpperCase().replace(/_/g, " "),
    consomeParDev,
    consomeParAutre,
    consomeTotal,
    consomeAno,
    avgRatioAnoDev,
    ratioAnoDev,
    derive,
  };
  return person;
}

function mergeEmployees(employees: Person | any): Person[] {
  const mergeEmployees: Person[] = [];
  const reducer = (res: Person | any, value: Person): Person => {
    if (!(res[value.trigrammeDev])) {
      res[value.trigrammeDev] = {
        count: 1,
        trigrammeDev: value.trigrammeDev,
        entreprise: value.entreprise,
        logo: getLogoUrl(value.entreprise),
        consomeParDev: value.consomeParDev,
        consomeParAutre: value.consomeParAutre,
        consomeTotal: value.consomeTotal,
        derive: value.derive,
        totalRatioAnoDev: value.ratioAnoDev,
      };
      mergeEmployees.push(res[value.trigrammeDev]);
    } else {
      res[value.trigrammeDev].consomeParDev += value.consomeParDev;
      res[value.trigrammeDev].consomeParAutre += value.consomeParAutre;
      res[value.trigrammeDev].consomeTotal += value.consomeTotal;
      res[value.trigrammeDev].totalRatioAnoDev += value.ratioAnoDev;
      res[value.trigrammeDev].derive += value.derive;
      res[value.trigrammeDev].count++;
    }
    return res;
  };
  employees.reduce(reducer, {});
  return mergeEmployees;
}

function getEmployeesRaw(data: any): Person[] {
  const employees: Person[] = [];
  data.map((data: any, i: number) => {
    const person: Person = getPerson(data, i);
    employees.push(person);
    return employees;
  });
  return employees;
}

function getEmployeesMerged(employees: Person[]): any[] {
  const merged: any[] = mergeEmployees(employees);
  const avgAnoDev: number[] = [];

  merged.map((res, i) => {
    avgAnoDev[i] = res.totalRatioAnoDev / res.count;
    res.ratioAnoDev = avgAnoDev[i];
  });
  return merged;
}

export default function DataGridSharedData(merge: boolean): Person[] {
  const employees: Person[] = getEmployeesRaw(data);
  return (merge ? getEmployeesMerged(employees) : employees);
}

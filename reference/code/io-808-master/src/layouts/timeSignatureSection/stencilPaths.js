import Path from "paths-js/path";

export const quarterViewBox = "0 0 5 10";
export const quarterNotePath =
  "M3.70172187,0 L3.70172191,5.88079115 C3.70172191,5.88079115 0.971353216,5.94053841 0.313165875,8.38810558 C-0.0662483221,9.7990135 0.753797172,10.1109552 2.03593281,9.9687327 C3.31806844,9.82651024 4.55285673,8.85538253 4.66999971,7.91684005 C4.66999971,5.98330802 4.66999981,0 4.66999981,0 L3.70172187,0 Z";

export const eightViewBox = "0 0 6 10";
export const eighthNotePath =
  "M3.33279571,0 L3.33279574,5.88079115 C3.33279574,5.88079115 0.719215051,5.94053841 0.0891808261,8.38810558 C-0.274004418,9.7990135 0.510964687,10.1109552 1.73825862,9.9687327 C2.96555255,9.82651024 4.14752437,8.85538253 4.25965671,7.91684005 C4.25965671,6.87224382 4.25965676,2.81905859 4.25965676,2.81905859 C4.25965676,2.81905859 5.79835291,2.48992438 5.38227777,6.22932854 C7.54538886,1.24261305 3.33279571,0 3.33279571,0 Z";

const lineY1 = 9;
export const noteLinePath = (x1, x2, arc) =>
  Path()
    .moveto(x1, lineY1)
    .arc(arc, 1, 0, 0, 1, x2, lineY1)
    .print();

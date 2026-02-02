import $ from 'jquery';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import * as XLSX from 'xlsx';
import 'tabulator-tables/dist/css/tabulator_semantic-ui.min.css';
import '../css/dashboard.css';

window.XLSX = XLSX;
window.Tabulator = Tabulator;

function capitalizeFirstLetter(a){return a.charAt(0).toUpperCase()+a.slice(1)}var table=new Tabulator("#example-table",{layout:"fitData",placeholder:"Loading",selectable:1});
document.getElementById("download-csv").addEventListener("click",function(){table.download("csv","results.csv");const b=table.getRows().length;console.log(`download ${b} emails.`);});

document.getElementById("download-xlsx").addEventListener("click",function(){table.download("xlsx","results.xlsx",{sheetName:"My Data"});const b=table.getRows().length;console.log(`download ${b} emails.`);});

function flattenObject(a,c=""){const d={};for(const [b,e]of Object.entries(a))a=c?`${c}_${b}`:b,"object"===typeof e&&null!==e?Object.assign(d,flattenObject(e,a)):d[a]=e;return d}
function generateColumns(a){const c=new Set("name phone email website address instagram facebook twitter linkedin yelp youtube placeID cID category reviewCount averageRating latitude longitude".split(" "));var d=[];c.forEach(b=>{d.push({title:capitalizeFirstLetter(b),field:b,width:300,resizable:!0})});Array.from(a).sort().forEach(b=>{c.has(b)||d.push({title:capitalizeFirstLetter(b),field:b,width:300,resizable:!0})});table.setColumns(d)}
function showData(){chrome.storage.local.get(null,function(a){a=a.leads||[];for(var c=new Set,d=[],b=0;b<a.length;++b){const e=flattenObject(a[b]);d.push(e);Object.keys(e).forEach(f=>c.add(f))}generateColumns(c);table.setData(d)})}function normalizeProfileId(a){return a.replace("@","").trim().toLowerCase()}$(document).ready(function(){showData();});


import $ from 'jquery';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import * as XLSX from 'xlsx';
import 'tabulator-tables/dist/css/tabulator_semanticui.min.css';
import '../css/dashboard.css';

// Ensure XLSX is available globally for Tabulator
window.XLSX = XLSX.default || XLSX;
window.Tabulator = Tabulator;

document.addEventListener('DOMContentLoaded', () => {
    var table = new Tabulator("#example-table", {
        layout: "fitData",
        placeholder: "Loading",
        selectable: 1
    });

    const downloadCsvBtn = document.getElementById("download-csv");
    if (downloadCsvBtn) {
        downloadCsvBtn.addEventListener("click", function() {
            console.log("Downloading CSV...");
            table.download("csv", "results.csv");
            const b = table.getRows().length;
            console.log(`download ${b} emails.`);
        });
    } else {
        console.error("Download CSV button not found");
    }

    const downloadXlsxBtn = document.getElementById("download-xlsx");
    if (downloadXlsxBtn) {
        downloadXlsxBtn.addEventListener("click", function() {
             console.log("Downloading XLSX...");
            table.download("xlsx", "results.xlsx", {sheetName: "My Data"});
            const b = table.getRows().length;
            console.log(`download ${b} emails.`);
        });
    } else {
        console.error("Download XLSX button not found");
    }

    function flattenObject(a, c = "") {
        const d = {};
        for (const [b, e] of Object.entries(a)) a = c ? `${c}_${b}` : b, "object" === typeof e && null !== e ? Object.assign(d, flattenObject(e, a)) : d[a] = e;
        return d
    }

    function generateColumns(a) {
        const c = new Set("name phone email website address instagram facebook twitter linkedin yelp youtube placeID cID category reviewCount averageRating latitude longitude".split(" "));
        var d = [];
        c.forEach(b => {
            d.push({
                title: capitalizeFirstLetter(b),
                field: b,
                width: 300,
                resizable: !0
            })
        });
        Array.from(a).sort().forEach(b => {
            c.has(b) || d.push({
                title: capitalizeFirstLetter(b),
                field: b,
                width: 300,
                resizable: !0
            })
        });
        table.setColumns(d)
    }

    function showData() {
        chrome.storage.local.get(null, function(a) {
            a = a.leads || [];
            console.log("Loaded leads:", a.length);
            for (var c = new Set, d = [], b = 0; b < a.length; ++b) {
                const e = flattenObject(a[b]);
                d.push(e);
                Object.keys(e).forEach(f => c.add(f))
            }
            generateColumns(c);
            table.setData(d)
        })
    }
    
    showData();
});

function capitalizeFirstLetter(a){return a.charAt(0).toUpperCase()+a.slice(1)}


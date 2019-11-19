import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TestExceltoJson';
  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;

  onFileChange(ev) {
    //console.log(ev);
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();

    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      //讀excel檔
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      this.setDownload(dataString);
    };
    reader.readAsBinaryString(file);
  }
  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", "xlsxtojson.json");
    }, 1000);
  }
}


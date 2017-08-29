import { Component, OnInit } from '@angular/core';
import { IMyOptions, IMyDateModel} from 'mydatepicker';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '../../../services/sales.service';
import { VisitService } from '../../../services/visit.service';
import { Sales } from '../../../models/sales';
import { Visit } from '../../../models/visit';

@Component({
  selector: 'app-visit-sales',
  templateUrl: './visit-sales.component.html',
  styles: []
})
export class VisitSalesComponent implements OnInit {
  sales: Sales;
  date = new Date();
  tanggal: string;
  errorMessage: string;
  errorMessageSales: string;
  loadingSales = false;
  loadingVisit = false;
  linkExport = 'http://npsalesmanagement.co.id/export-sales/visit/visit_by_uid';

  myDatePickerOptions: IMyOptions = {
        showClearDateBtn: false,
        minYear: 2017,
        width: '252px',
        editableDateField: false,
        dateFormat: 'dd - mm - yyyy',
  };

  model = { date: {
      year: this.date.getFullYear(),
      month: this.date.getMonth() + 1,
      day: this.date.getDate()
    }
  };

  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'Kode Visit', name: 'kode_visit', className: ['text-center']},
    {title: 'Selfie', name: 'selfie_masuk', className: ['text-center']},
    {title: 'Tanggal', name: 'tanggal', className: ['text-center']},
    {title: 'Nama Toko', name: 'nama_toko', className: ['text-center']},
    {title: 'Lokasi', name: 'lokasi_masuk', className: ['text-center']},
    {title: 'Jam Masuk', name: 'jam_masuk', className: ['text-center']},
    {title: 'Jam Pulang', name: 'jam_pulang', className: ['text-center']},
    {title: 'Selisih (Menit)', name: 'selisih', className: ['text-center']},
  ];
  public page = 1;
  public itemsPerPage = 10;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public config: any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data: Array<Visit> = [];

  constructor(
    private route: ActivatedRoute,
    private salesService: SalesService,
    private visitService: VisitService
  ) { this.length = this.data.length; }

  ngOnInit() {
    this.getSales();
    this.tanggal = `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`;
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    const columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    const tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    const filteredData = this.changeFilter(this.data, this.config);
    const sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }

  getSales() {
    this.loadingSales = true;
    const kode_sales = this.route.snapshot.params['kode_sales'];
    this.salesService.getSales(kode_sales)
      .subscribe(
        sales => {
          this.sales = sales;
          this.loadingSales = false;
        }, error => {
           this.errorMessageSales = error;
           this.loadingSales = false;
        }
      );
  }

  search() {
    this.data = [];
    this.length = this.data.length; // this is for pagination
    this.onChangeTable(this.config);
    this.loadingVisit = true;
    this.visitService.getSalesVisit(this.sales.kode_sales, this.tanggal)
      .subscribe(
        vst => {
          this.data = vst;
          this.length = this.data.length; // this is for pagination
          this.onChangeTable(this.config);
          this.loadingVisit = false;
          this.errorMessage = '';
        }, error => {
            this.errorMessage = error;
            this.length = this.data.length; // this is for pagination
            this.onChangeTable(this.config);
            this.loadingVisit = false;
        }
      );
  }

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    this.tanggal = `${event.date.year}-${event.date.month}-${event.date.day}`;
    this.search();
  }

}

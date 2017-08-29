import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '../../../services/sales.service';
import { CrmService } from '../../../services/crm.service';
import { Sales } from '../../../models/sales';

@Component({
  selector: 'app-crm-sales',
  templateUrl: './crm-sales.component.html',
  styles: []
})
export class CrmSalesComponent implements OnInit {

  sales: Sales;
  errorMessage: string;
  errorMessageSales: string;
  loadingSales = false;
  loadingCrm = false;
  linkExport = 'http://npspgmanagement.co.id/export-sales/crm/crm_by_uid';

  mm = 0;
  months = [
    { val: 1,  name: 'Januari' },
    { val: 2,  name: 'February' },
    { val: 3,  name: 'Maret' },
    { val: 4,  name: 'April' },
    { val: 5,  name: 'Mei' },
    { val: 6,  name: 'Juni' },
    { val: 7,  name: 'Juli' },
    { val: 8,  name: 'Agustus' },
    { val: 9,  name: 'September' },
    { val: 10,  name: 'Oktober' },
    { val: 11,  name: 'November' },
    { val: 12,  name: 'Desember' }
  ];
  years: number[] = [];
  yy: number;

  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'Kode CRM', name: 'kode_crm', className: ['text-center']},
    {title: 'Tanggal', name: 'tgl',	className: ['text-center']},
    {title: 'Nama Toko', name: 'nama_toko', className: ['text-center']},
    {title: 'Kode SAP', name: 'kode_sap', className: ['text-center']},
    {title: 'Nama Pemilik', name: 'nama_pemilik', className: ['text-center']},
    {title: 'Alamat', name: 'alamat', className: ['text-center']},
    {title: 'MESIN NIPPON PAINT', name: 'MESIN_NIPPON_PAINT', className: ['text-center']},
    {title: 'OMSET NIPPON PAINT', name: 'OMSET_NIPPON_PAINT', className: ['text-center']},
    {title: 'MESIN DULUX', name: 'MESIN_DULUX', className: ['text-center']},
    {title: 'OMSET DULUX', name: 'OMSET_DULUX', className: ['text-center']},
    {title: 'MESIN AVIAN', name: 'MESIN_AVIAN', className: ['text-center']},
    {title: 'OMSET AVIAN', name: 'OMSET_AVIAN', className: ['text-center']},
    {title: 'MESIN PROPAN', name: 'MESIN_PROPAN', className: ['text-center']},
    {title: 'OMSET PROPAN', name: 'OMSET_PROPAN', className: ['text-center']},
    {title: 'MESIN MOWILEX', name: 'MESIN_MOWILEX', className: ['text-center']},
    {title: 'OMSET MOWILEX', name: 'OMSET_MOWILEX', className: ['text-center']},
    {title: 'MESIN DANAPAINT', name: 'MESIN_DANAPAINT', className: ['text-center']},
    {title: 'OMSET DANAPAINT', name: 'OMSET_DANAPAINT', className: ['text-center']},
    {title: 'MESIN JOTUN', name: 'MESIN_JOTUN', className: ['text-center']},
    {title: 'OMSET JOTUN', name: 'OMSET_JOTUN', className: ['text-center']},
    {title: 'MESIN KANSAI', name: 'MESIN_KANSAI', className: ['text-center']},
    {title: 'OMSET KANSAI', name: 'OMSET_KANSAI', className: ['text-center']},
    {title: 'MESIN SANCENTIA', name: 'MESIN_SANCENTIA', className: ['text-center']},
    {title: 'OMSET SANCENTIA', name: 'OMSET_SANCENTIA', className: ['text-center']},
    {title: 'MESIN PACIFIC PAINT', name: 'MESIN_PACIFIC_PAINT', className: ['text-center']},
    {title: 'OMSET PACIFIC PAINT', name: 'OMSET_PACIFIC_PAINT',	className: ['text-center']},
    {title: 'MESIN WARNA AGUNG', name: 'MESIN_WARNA_AGUNG', className: ['text-center']},
    {title: 'OMSET WARNA AGUNG', name: 'OMSET_WARNA_AGUNG', className: ['text-center']},
    {title: 'MESIN RAJAWALI', name: 'MESIN_RAJAWALI', className: ['text-center']},
    {title: 'OMSET RAJAWALI', name: 'OMSET_RAJAWALI', className: ['text-center']},
    {title: 'MESIN TUNGGAL JAYA', name: 'MESIN_TUNGGAL_JAYA', className: ['text-center']},
    {title: 'OMSET TUNGGAL JAYA', name: 'OMSET_TUNGGAL_JAYA', className: ['text-center']}
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

  private data: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private salesService: SalesService,
    private cemService: CrmService
  ) {
    this.length = this.data.length;
  }

  ngOnInit() {
    this.getMonthYear();
    this.getSales();
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

  getMonthYear() {
    const today = new Date();
    this.mm = today.getMonth() + 1;
    this.yy = today.getFullYear();
    for (let i = (this.yy - 10); i <= this.yy; i++) {
      this.years.push(i);
    }
  }

  search() {
    this.data = [];
    this.length = this.data.length; // this is for pagination
    this.onChangeTable(this.config);
    this.loadingCrm = true;
    this.cemService.getSalesCRM(this.sales.kode_sales, this.mm, this.yy)
      .subscribe(
        crm => {
          this.data = crm;
          this.length = this.data.length; // this is for pagination
          this.onChangeTable(this.config);
          this.loadingCrm = false;
          this.errorMessage = '';
        }, error => {
            this.errorMessage = error;
            this.length = this.data.length; // this is for pagination
            this.onChangeTable(this.config);
            this.loadingCrm = false;
        }
      );
  }

}

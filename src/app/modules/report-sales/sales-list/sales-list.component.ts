import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../../../services/sales.service';
import { Sales } from '../../../models/sales';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styles: []
})
export class SalesListComponent implements OnInit {
  loading = false;
  errorMessage = '';

  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'Kode Sales', name: 'kode_sales', className: ['text-center']},
    {title: 'Nama sales', name: 'nama_sales', className: ['text-center']},
    {title: 'Depot', name: 'depot', className: ['text-center']},
    {title: 'Report', name: 'actionSimple', className: ['text-center col-md-1'],
      classNameTd: ['text-center'], actions: {type: 'simple',
        buttons: [{
          name: 'visit',
          title: 'Visit',
          styleClass: 'btn btn-info',
          styleIcon: 'glyphicon glyphicon-search',
          action: 'onVisit'
        }]
      }
    }
    /*{
      title: 'Report',
      name: 'actionGroup',
      className: ['text-center col-md-2-5'],
      classNameTd: ['text-center'],
      actions: {
        type: 'group',
        buttons: [
          {
            name: 'absen',
            title: 'Absen',
            styleClass: 'btn btn-info',
            action: 'onAbsen'
          },
          {
            name: 'product',
            title: 'Product',
            styleClass: 'btn btn-warning',
            action: 'onProduct'
          },
          {
            name: 'focus',
            title: 'Focus',
            styleClass: 'btn btn-success',
            action: 'onFocus'
          }
        ]
      }
    }*/
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
    className: ['table-striped', 'table-bordered'],
    api: {
      onVisit: this.onVisit.bind(this)
      /*onAbsen: this.onAbsen.bind(this),
      onProduct: this.onProduct.bind(this),
      onFocus: this.onFocus.bind(this)*/
    }
  };

  private data: Array<Sales> = [];

  constructor(private salesService: SalesService, private router: Router) {
    this.length = this.data.length;
  }

  ngOnInit() {
    this.getSales();
  }

  public onVisit(data: any): void {
    console.log('edit', data.row.kode_sales);
    this.router.navigate(['/report-sales', 'visit', data.row.kode_sales]);
  }

  /*public onAbsen(data: any):void {
    console.log('view', data.row.kode_sales);
    this.router.navigate(['/report-sales','absen',data.row.kode_sales]);
  }

  public onProduct(data: any):void {
    console.log('view', data.row.kode_sales);
    this.router.navigate(['/report-sales','product',data.row.kode_sales]);
  }

  public onFocus(data: any):void {
    console.log('view', data.row.kode_sales);
    this.router.navigate(['/report-sales','focus',data.row.kode_sales]);
  }*/

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
        if ( item[column.name] &&
             item[column.name].toString().match(this.config.filtering.filterString)) {
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
    this.loading = true;
    this.salesService.getAllSales()
      .subscribe(users => {
        console.log(users);
         this.data = users;
         this.length = this.data.length; // this is for pagination
         this.onChangeTable(this.config);
         this.loading = false;
      },
      error => {
        this.errorMessage = error;
        console.error(error);
        this.loading = false;
      }
      );
  }

}

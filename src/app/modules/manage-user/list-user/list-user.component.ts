import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styles: []
})
export class ListUserComponent implements OnInit {
  loading = false;
  errorMessage = '';

  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'Kode Sales', name: 'kode_sales', className: ['text-center']},
    {title: 'Kode SAP', name: 'kode_sap', className: ['text-center']},
    {title: 'Nama Sales', name: 'nama_sales', className: ['text-center']},
    {title: 'Depot', name: 'depot', className: ['text-center']},
    {title: 'Status', name: 'status', className: ['text-center col-md-1']},
    {title: 'Action', name: 'actionSimple', className: ['text-center col-md-1'],
      classNameTd: ['text-center'], actions: {type: 'simple',
        buttons: [{
          name: 'edit',
          title: 'Edit',
          styleClass: 'btn btn-warning',
          styleIcon: 'glyphicon glyphicon-pencil',
          action: 'onEdit'
        }]
      }
    },
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
    api: {onEdit: this.onEdit.bind(this)}
  };

  private data: Array<User> = [];

  constructor(private userService: UserService, private router: Router) {
    this.length = this.data.length;
  }

  ngOnInit() {
    this.getUser();
  }

  public onEdit(data: any): void {
    console.log('edit', data.row.kode_sales);
    this.router.navigate(['/manage-user', 'edit-user', data.row.kode_sales]);
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

  getUser() {
    this.loading = true;
    this.userService.getAllUsers()
      .subscribe(users => {
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

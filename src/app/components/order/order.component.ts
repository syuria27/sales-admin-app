import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'angular2-modal';
import { IMyOptions, IMyDateModel} from 'mydatepicker';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  errorMessage: string;
  loading = false;
  date = new Date();

  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'Kode Order', name: 'kode_order', className: ['text-center']},
    {title: 'Kode SAP', name: 'kode_sap', className: ['text-center']},
    {title: 'Nama Sales', name: 'nama_sales', className: ['text-center']},
    {title: 'Depot', name: 'depot', className: ['text-center']},
    {title: 'Action', name: 'actionSimple', className: ['text-center col-md-1'],
      classNameTd: ['text-center'], actions: {type: 'simple',
        buttons: [{
          name: 'detail',
          title: 'Detail',
          styleClass: 'btn btn-warning',
          styleIcon: 'glyphicon glyphicon-search',
          action: 'onDetail'
        }]
      }
    }
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
    api: {onDetail: this.onDetail.bind(this)}
  };


  private data: Array<Order> = [];

  myDatePickerOptions: IMyOptions = {
        showClearDateBtn: false,
        minYear: 2016,
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

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    this.refresh();
    this.orderService.getDailyOrder(`${event.date.year}-${event.date.month}-${event.date.day}`)
      .subscribe(
        order => {
          this.data = order;
          this.length = this.data.length; // this is for pagination
          this.onChangeTable(this.config);
          this.loading = false;
          this.errorMessage = '';
        }, error => {
            this.errorMessage = error;
            this.length = this.data.length; // this is for pagination
            this.onChangeTable(this.config);
            this.loading = false;
        }
      );
  }

  refresh(): void {
    this.data = [];
    this.length = this.data.length; // this is for pagination
    this.onChangeTable(this.config);
    this.loading = true;
  }

  constructor(private overlay: Overlay, private  vcRef: ViewContainerRef,
    private orderService: OrderService, private modal: Modal) {
    this.length = this.data.length;
    overlay.defaultViewContainer = vcRef;
  }

  public onDetail(data: any): void {
    this.loading = true;
    this.orderService.getOrderDetail(data.row.kode_order)
    .subscribe(
      order => {
        this.loading = false;
        const odr = order;
        this.modal.alert()
        .size('lg')
        .showClose(true)
        .title(data.row.kode_order)
        .body(`<table>
                <tr>
                    <td width="100 px">Tanggal</td>
                    <td width="10 px"> : </td>
                    <td>${order.tanggal}</td>
                </tr>
                <tr>
                    <td>Requestor</td>
                    <td> : </td>
                    <td>${data.row.nama_sales}</td>
                </tr>
                <tr>
                    <td>Depot</td>
                    <td> : </td>
                    <td>${data.row.depot}</td>
                </tr>
                <tr>
                    <td>Kode Sales</td>
                    <td> : </td>
                    <td>${data.row.kode_sap}</td>
                </tr>
                <tr>
                    <td>Nama Toko</td>
                    <td> : </td>
                    <td>${order.nama_toko}</td>
                </tr>
                <tr>
                    <td>Kode SAP</td>
                    <td> : </td>
                    <td>${order.kode_sap}</td>
                </tr>
            </table>
            <br>
            <p>Message (Order) :</p>
            ${order.message}`)
        .open();
      }, error => {
        this.loading = false;
        this.modal.alert()
          .size('sm')
          .showClose(true)
          .title('Alert..!!')
          .body(error)
          .bodyClass('alert alert-danger')
          .open();
        }
    );
  }


  ngOnInit() {
    this.refresh();
    this.orderService.getDailyOrder(`${this.model.date.year}-${this.model.date.month}-${this.model.date.day}`)
      .subscribe(
        order => {
          this.data = order;
          this.length = this.data.length; // this is for pagination
          this.onChangeTable(this.config);
          this.loading = false;
          this.errorMessage = '';
        }, error => {
            this.errorMessage = error;
            this.length = this.data.length; // this is for pagination
            this.onChangeTable(this.config);
            this.loading = false;
        }
      );
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
}

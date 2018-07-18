import { Component, OnInit } from '@angular/core';
import { GridData, getBasicData } from './grid-data';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent implements OnInit {
  // public rows: Array<any> = [];
  // public columns: Array<any> = [
  //   { title: 'Name', name: 'name' },
  //   { title: 'Position', name: 'position', sort: false },
  //   { title: 'Office', name: 'office', sort: 'asc' },
  //   { title: 'Extn.', name: 'ext', sort: '' },
  //   { title: 'Start date', name: 'startDate' },
  //   { title: 'Salary ($)', name: 'salary' }
  // ];
  // public page = 1;
  // public itemsPerPage = 10;
  // public maxSize = 5;
  // public numPages = 1;
  // public length = 0;

  // public config: any = {
  //   paging: true,
  //   sorting: { columns: this.columns },
  //   filtering: { filterString: '', columnName: 'position' }
  // };

  // data: Array<any> = GridData;
  constructor() { }

  ngOnInit() {
    // this.onChangeTable(this.config);
  }

  // onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
  //   if (config.filtering) {
  //     Object.assign(this.config.filtering, config.filtering);
  //   }
  //   if (config.sorting) {
  //     Object.assign(this.config.sorting, config.sorting);
  //   }

  //   const filteredData = this.changeFilter(this.data, this.config);
  //   const sortedData = this.changeSort(filteredData, this.config);
  //   this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
  //   this.length = sortedData.length;
  // }

  // changeFilter(data: any, config: any): any {
  //   if (!config.filtering) {
  //     return data;
  //   }

  //   const filteredData: Array<any> = data.filter((item: any) =>
  //     item[config.filtering.columnName].match(this.config.filtering.filterString));

  //   return filteredData;
  // }

  // changePage(page: any, data: Array<any> = this.data): Array<any> {
  //   console.log(page);
  //   const start = (page.page - 1) * page.itemsPerPage;
  //   const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
  //   return data.slice(start, end);
  // }

  // changeSort(data: any, config: any): any {
  //   if (!config.sorting) {
  //     return data;
  //   }

  //   const columns = this.config.sorting.columns || [];
  //   let columnName: string = void 0;
  //   let sort: string = void 0;

  //   for (let i = 0; i < columns.length; i++) {
  //     if (columns[i].sort !== '') {
  //       columnName = columns[i].name;
  //       sort = columns[i].sort;
  //     }
  //   }

  //   if (!columnName) {
  //     return data;
  //   }

  //   // simple sorting
  //   return data.sort((previous: any, current: any) => {
  //     if (previous[columnName] > current[columnName]) {
  //       return sort === 'desc' ? -1 : 1;
  //     } else if (previous[columnName] < current[columnName]) {
  //       return sort === 'asc' ? -1 : 1;
  //     }
  //     return 0;
  //   });
  // }

  // tslint:disable-next-line:member-ordering
  private data: any[] = getBasicData(10);
  // tslint:disable-next-line:member-ordering
  private colHeaders: string[] = ['ID', 'First Name', 'Last Name', 'Address',
    'Favorite food', 'Price', 'Is active'];
  // tslint:disable-next-line:member-ordering
  private columns: any[] = [
    {
      data: 'id'
    },
    {
      data: 'name.first',
      renderer: 'text',
      readOnly: true
    },
    {
      data: 'name.last',
      readOnly: true
    },
    {
      data: 'address'
    },
    {
      data: 'product.description',
      renderer: 'text'
    },
    {
      data: 'price',
      type: 'numeric',
      numericFormat: { pattern: '$0,0.00', culture: 'en-US' }
    },
    {
      data: 'isActive',
      type: 'checkbox',
      checkedTemplate: 'Yes',
      uncheckedTemplate: 'No'
    }
  ];
  // tslint:disable-next-line:member-ordering
  private colWidths: number[] = [null, null, null, null, null, null, 30];
  // tslint:disable-next-line:member-ordering
  private options: any = {
    stretchH: 'all',
    columnSorting: true,
    contextMenu: [
      'row_above', 'row_below', 'remove_row'
    ]
  };

  private afterChange(e: any) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }

  private afterOnCellMouseDown(e: any) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }
}

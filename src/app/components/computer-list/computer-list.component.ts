import { Component,AfterViewInit, ViewChild } from '@angular/core';
import { ComputerService } from 'src/app/services/computer.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { IComputer } from 'src/app/models/IComputer';

export interface IPagination {
  page: number;
  limit: number;
  totalPages: number;
}
@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.css']
})
export class ComputerListComponent implements AfterViewInit {
  limits = [5, 10, 25, 100];
  pagination:IPagination = {
    page: 1,
    limit: 5,
    totalPages: 2
  }

  computers:IComputer[] = [];
  displayedColumns: string[] = ['_id', 'procesador', 'pantalla', 'ram', 'rom', 'anio_lanzamiento', 'acciones'];



  dataSource: any = new MatTableDataSource([]);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private computerService: ComputerService) {
    this.getComputers();
   }

   ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getComputers() {
    this.computerService.getComputers(this.pagination).subscribe(
      res => {
        this.computers = res.content.docs;
        this.dataSource.data = this.computers;
        this.pagination.totalPages = res.content.totalPages;
        this.pagination.page = res.content.page;
        this.pagination.limit = res.content.limit;
      },
      err => console.log(err)
    );
  }
  deleteComputer(id: string) {
    this.computerService.deleteComputer(id).subscribe(
      res => {
        console.log(res);
        this.getComputers();
      }
    );
  }
  goNext(){
    this.pagination.page++;
    this.getComputers();
  }
  goPrevius(){
    this.pagination.page--;
    this.getComputers();
  }
}
